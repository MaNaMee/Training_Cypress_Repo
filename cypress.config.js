// npx cypress run --record --key 86c44907-cfd3-48bb-b704-7be82ca63df9
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "372u8v",
  experimentalStudio: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
