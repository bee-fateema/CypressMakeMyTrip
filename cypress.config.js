const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  projectId: "rvrp7f",
  reporter: "mochawesome",
  e2e: {
    setupNodeEvents(on, config) {
      // on("before:browser:launch", (browser = {}, launchOptions) => {
      //   if (browser.family === "chromium" && browser.name !== "electron") {
      //     launchOptions.args.push("--start-fullscreen");
      //     return launchOptions;
      //   }
      //   if (browser.name === "electron") {
      //     launchOptions.preferences.fullscreen = true;
      //     return launchOptions;
      //   }
      // });

      on("file:preprocessor", cucumber());
    },
    // specPattern: "cypress/integration/*.js",
    specPattern: "cypress/integration/BDD/*.feature",

    defaultCommandTimeout: 30000,
    env: {
      url: "https://www.makemytrip.com",
    },
    scrollBehavior: false,
  },
});
