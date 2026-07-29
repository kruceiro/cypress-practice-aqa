const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://example.cypress.io',
    defaultCommandTimeout: 8000,
    video: false
  },
});
