const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space/',
    defaultCommandTimeout: 8000,
    video: false,
    allowCypressEnv: true
  },

  env: {
    userEmail: 'yevhenii.krutsiak+test-mail-qauto2@gmail.com',
    userPassword: 'Password1'
  }

});
