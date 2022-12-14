const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "cypress/cucumber-json",
  reportPath: "./reports/cucumber-htmlreport.html",
  metadata: {
    browser: {
      name: "chrome",
      version: "103",
    },
    device: "Acer Aspire 7",
    platform: {
      name: "Windows",
      version: "11",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Cypress Assessment" },
      //   { label: "Release", value: "1.2.3" },
      //   { label: "Cycle", value: "B11221.34321" },
      //   { label: "Execution Start Time", value: "Nov 19th 2017, 02:31 PM EST" },
      //   { label: "Execution End Time", value: "Nov 19th 2017, 02:56 PM EST" },
    ],
  },
});
