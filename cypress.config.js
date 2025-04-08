// npx cypress run --record --key 86c44907-cfd3-48bb-b704-7be82ca63df9
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "372u8v",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
