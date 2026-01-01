module.exports = {
  use: {
    baseURL: "https://dev.delekhomes.com",
    headless: !!process.env.CI,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    storageState: undefined,   
  },

  timeout: 15000,

  expect: {
    timeout: 5000,
  }
};
