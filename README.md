# Ian's Local Playwright Automation & Accessibility Testing Site

## Overview
This project is a robust, local Node.js/Express web application for running Playwright-based automation and accessibility tests on any list of URLs. It features a modern, accessible frontend, unified styling, and a clean, local-only backend (no Docker or cloud dependencies). All test results and logs are returned as JSON and downloadable from the UI.

---

## Features
- **Run Playwright UI Automation**: Test multiple URLs for UI health using Playwright scripts.
- **Run Accessibility Audits**: Test multiple URLs for accessibility issues using Playwright and Axe.
- **Modern, Responsive UI**: Clean, accessible design with unified button styles and all CSS in `public/main.css`.
- **Downloadable Logs**: Download test and accessibility logs directly from the UI.
- **Local-Only**: No Docker, no cloud dependencies—runs entirely on your machine.
- **Easy to Extend**: Add your own Playwright scripts in the `automation/` folder.

---

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## Installation
1. **Clone the repository**
   ```powershell
   git clone https://github.com/IanEvolution/Ians-Site-Local-V1.0.git
   cd Ians-Site-Local-V1.0
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Install Playwright Browsers**
   ```powershell
   npx playwright install
   ```

---

## Usage
1. **Start the server**
   ```powershell
   node server.js
   ```
   The server will start on [http://localhost:3000](http://localhost:3000).

2. **Open the web UI**
   - Go to [http://localhost:3000](http://localhost:3000) in your browser.

3. **Run Automation or Accessibility Tests**
   - Enter one or more URLs (one per line) in the provided textarea.
   - Click the appropriate button to run UI automation or accessibility tests.
   - View results in the UI and download logs as needed.

---

## Project Structure
```
├── automation/
│   ├── Accessability-Test.spec.js      # Playwright accessibility test script
│   ├── playwright-ui-script.spec.js    # Playwright UI automation script
│   ├── urls.txt                        # (Ignored) Example input file for URLs
│   ├── test-log.txt                    # (Ignored) Automation log output
│   ├── accessibility-log.txt           # (Ignored) Accessibility log output
│   └── reports/                        # JSON reports for each tested URL
├── public/
│   ├── index.html                      # Main frontend UI
│   └── main.css                        # All CSS styles (unified, accessible)
├── server.js                           # Express backend, runs Playwright scripts
├── package.json                        # Project dependencies and scripts
├── .gitignore                          # Ignores node_modules, logs, etc.
└── README.md                           # This file
```

---

## How It Works
- **Frontend**: `public/index.html` provides a simple UI to input URLs and trigger tests. All styles are in `public/main.css`.
- **Backend**: `server.js` exposes two endpoints:
  - `POST /run-playwright` — Runs UI automation on provided URLs.
  - `POST /run-accessibility` — Runs accessibility audits on provided URLs.
- **Test Scripts**: Located in `automation/`. You can add or modify Playwright scripts as needed.
- **Reports**: JSON reports for each URL are saved in `automation/reports/`.

---

## Customization
- **Add More Playwright Tests**: Place new `.spec.js` files in `automation/` and update `server.js` to use them.
- **Change Port**: Edit the `PORT` variable in `server.js`.
- **Modify Styles**: Edit `public/main.css` for UI changes.

---

## Troubleshooting
- **Port in Use**: Change the port in `server.js` if 3000 is busy.
- **Playwright Errors**: Make sure browsers are installed (`npx playwright install`).
- **No Results/Logs**: Check the server console for errors. Ensure URLs are valid and accessible.
- **File Not Found**: Make sure you are running commands in the project root directory.

---

## Security & Privacy
- This app is designed for local use only. No data is sent to any external server.
- All logs and reports are stored locally and are ignored by `.gitignore`.

---

## Updating & Maintenance
- Pull the latest changes from your repository as needed.
- Update dependencies with `npm update`.
- To reset logs and reports, simply delete files in `automation/reports/` and the log files.

---

## License
MIT License. See [LICENSE](LICENSE) if present.

---

## Credits
- Built with [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), and [Playwright](https://playwright.dev/).
- Accessibility testing powered by [axe-core](https://github.com/dequelabs/axe-core).

---

## Contact
For questions or suggestions, open an issue or contact [IanEvolution](https://github.com/IanEvolution).
