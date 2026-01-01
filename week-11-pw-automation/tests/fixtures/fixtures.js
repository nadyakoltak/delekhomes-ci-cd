const { test: base, request: playwrightRequest } = require("@playwright/test");
const UserApi = require("../../api/userApi");
const ListingApi = require("../../api/listing.api");
const userCredentials = require("../../testData/userCredentials.json");

const test = base.extend({
  authenticatedPage: async ({ page, request, context }, use) => {
    const userApi = new UserApi(request);

    const accessToken = await userApi.login(
      userCredentials.admin.email,
      userCredentials.admin.password
    );

    await page.addInitScript((token) => {
      window.localStorage.setItem("accessToken", token);
    }, accessToken);

    await use(page);
  },

  createdListing: [
    async ({}, use) => {
      const apiContext = await playwrightRequest.newContext({
        baseURL: "https://dev.delekhomes.com",
      });

      const userApi = new UserApi(apiContext);
      const accessToken = await userApi.login(
        userCredentials.realtor.email,
        userCredentials.realtor.password
      );

      const listingApi = new ListingApi(apiContext, accessToken);

      const listing = await listingApi.createListing(); 

      await use(listing);

      await listingApi.deleteListing(listing.id);
      await apiContext.dispose();
    },
    { scope: "worker" },
  ],
});

module.exports = { test };





