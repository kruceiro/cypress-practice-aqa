const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  reporter: 'cypress-mochawesome-reporter',

  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space/',
    defaultCommandTimeout: 8000,
    video: false,
    allowCypressEnv: true,

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    }
  },

  env: {
    userEmail: 'yevhenii.krutsiak+test-mail-qauto1@gmail.com',
    userPassword: 'Password1'
  }

});
