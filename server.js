const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Express server is running!');
});

app.post('/run-playwright', (req, res) => {
  const urls = req.body.urls;
  if (!Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: 'No URLs provided' });
  }

  // Write URLs to urls.txt
  const urlsPath = path.join(__dirname, 'automation', 'urls.txt');
  fs.writeFileSync(urlsPath, urls.join('\n'));

  // Run the Playwright script
  exec('npx playwright test automation/playwright-ui-script.spec.js', { cwd: __dirname }, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr || error.message });
    }
    // Read the test-log.txt file and send it back
    const logPath = path.join(__dirname, 'test-log.txt'); // <-- fixed path
    // Wait for file to exist (in case of slow write)
    let attempts = 0;
    function sendLog() {
      if (fs.existsSync(logPath)) {
        const log = fs.readFileSync(logPath, 'utf-8');
        res.json({ log, stdout });
      } else if (attempts < 10) {
        attempts++;
        setTimeout(sendLog, 200); // try again in 200ms
      } else {
        res.json({ log: 'No log found after running Playwright.' });
      }
    }
    sendLog();
  });
});

app.post('/run-accessibility', (req, res) => {
  const urls = req.body.urls;
  if (!Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: 'No URLs provided' });
  }

  // Write URLs to urls.txt
  const urlsPath = path.join(__dirname, 'automation', 'urls.txt');
  fs.writeFileSync(urlsPath, urls.join('\n'));

  // Run the Playwright accessibility script
  exec('npx playwright test automation/Accessability-Test.spec.js || exit 0', { cwd: __dirname }, (error, stdout, stderr) => {
    // Always try to return the log, even if error is set
    const logPath = path.join(__dirname, 'automation', 'accessibility-log.txt');
    let attempts = 0;
    function sendLog() {
      if (fs.existsSync(logPath)) {
        const log = fs.readFileSync(logPath, 'utf-8');
        res.json({ log, stdout, stderr });
      } else if (attempts < 10) {
        attempts++;
        setTimeout(sendLog, 200);
      } else {
        res.json({ log: 'No accessibility log found after running Playwright.' });
      }
    }
    sendLog();
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});