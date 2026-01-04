require("dotenv").config();

module.exports = {
  use: {
    baseURL: process.env.BASE_URL,
    headless: !!process.env.CI,
    screenshot: "only-on-failure",
    trace: "on-first-retry",   
  },

  timeout: 15000,

  expect: {
    timeout: 5000,
  }
};
