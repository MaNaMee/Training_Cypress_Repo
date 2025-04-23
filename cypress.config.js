// npx cypress run --record --key 86c44907-cfd3-48bb-b704-7be82ca63df9
const { defineConfig } = require("cypress");
const dotenv = require("dotenv");
require("dotenv").config();

module.exports = defineConfig({
  retries: 3, 
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

  env: {
    projectName: process.env.PROJECT_NAME || "Cypress Test Automation",
    environment: process.env.ENVIRONMENT || "QA",
    API_KEY: process.env.API_KEY,
    API_BASE_URL: process.env.API_BASE_URL || 'https://petstore.swagger.io/v2',

    
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: process.env.API_BASE_URL || 'https://petstore.swagger.io/v2',
  },
});


