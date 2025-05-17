# Ian Holt Evolution Portfolio

A modern, visually appealing portfolio website for Ian Holt, featuring a Playwright automation demo. This site is designed for recruiters, developers, and QA professionals to showcase automation skills and run real Playwright tests (including accessibility checks) on any URL.

## Features

- **About, Projects, and Contact**: Clean, recruiter-friendly portfolio sections.
- **Automation Demo**:  
  - Enter one or more URLs and trigger Playwright automation from the web UI.
  - Checks homepage title, clicks and validates up to 20 links per page.
  - Accessibility and error handling built in.
  - Results are color-coded, easy to read, and downloadable.
- **Backend**:  
  - Node.js + Express server.
  - Runs Playwright scripts on demand and returns results.
- **Frontend**:  
  - Responsive, dark-themed, and professional UI.
  - Modern CSS, smooth UX, and clear result formatting.

## Quick Start

1. **Install dependencies**  
   ```sh
   npm install
2. **Start the server**
   node server.js
   The site will be available at http://localhost:3000.
4. **Run an automation test**
   Enter one or more URLs (one per line) in the Automation Demo section.
   Click "Run Automation".
   View and download the results.

   ## Project Structure
   automation/
  playwright-ui-script.spec.js   # Playwright test script
  urls.txt                       # Input URLs (auto-managed)
  public/
  index.html                     # Portfolio site and UI
  server.js                      # Express backend
  test-log.txt                   # Automation results (auto-generated)
  test-results/                  # Playwright output (gitignored)
  .gitignore                     # Node/Playwright best practices
  package.json                   # Dependencies

## Version Control
All essential files are tracked in Git.
node_modules, logs, Playwright output, and local config are ignored via .gitignore.

## Contact
Email: ianholt839@gmail.com
LinkedIn: Ian Holt
