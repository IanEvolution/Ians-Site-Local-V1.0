const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const axePath = require.resolve('axe-core');

const urls = fs.readFileSync(path.join(__dirname, 'urls.txt'), 'utf-8')
  .split('\n')
  .map(line => line.trim())
  .filter(line => line && !line.startsWith('#'));

test.describe('Accessibility checks', () => {
  let allViolations = [];
  let summaryLog = '';

  for (const url of urls) {
    test(`Accessibility check for ${url}`, async ({ page }) => {
      try {
        await page.goto(url, { timeout: 30000 });
        try {
          await page.addScriptTag({ path: axePath });
        } catch (e) {
          summaryLog += `URL: ${url}\n`;
          summaryLog += `  ERROR: Could not inject axe-core (site may block script injection): ${e.message}\n\n`;
          return;
        }
        const results = await page.evaluate(async () => await window.axe.run());
        // Save report
        const reportsDir = path.join(__dirname, 'reports');
        if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
        const reportPath = path.join(reportsDir, encodeURIComponent(url) + '.json');
        fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
        // Log violations for summary
        summaryLog += `URL: ${url}\n`;
        summaryLog += `  Violations: ${results.violations.length}\n`;
        results.violations.forEach(v => {
          summaryLog += `    [${v.id}] ${v.help}: ${v.nodes.length} occurrence(s)\n`;
        });
        if (results.violations.length === 0) {
          summaryLog += '    No accessibility violations found.\n';
        }
        summaryLog += '\n';
        allViolations.push(...results.violations.map(v => v.id));
        // Do not fail the test on violations
      } catch (err) {
        // If timeout, log as a fail with a clear message
        if (err.message && err.message.includes('Timeout')) {
          summaryLog += `URL: ${url}\n  ERROR: Timed out loading page (marked as FAIL).\n\n`;
        } else {
          summaryLog += `URL: ${url}\n  ERROR: ${err.message}\n\n`;
        }
      }
    });
  }

  test.afterAll(async () => {
    // Output summary of most common issues
    const summary = {};
    allViolations.forEach(id => { summary[id] = (summary[id] || 0) + 1; });
    summaryLog += '=== Accessibility Issue Summary Across All URLs ===\n';
    Object.entries(summary)
      .sort((a, b) => b[1] - a[1])
      .forEach(([id, count]) => {
        summaryLog += `${id}: ${count} occurrence(s)\n`;
      });
    fs.writeFileSync(path.join(__dirname, 'accessibility-log.txt'), summaryLog);
  });
});