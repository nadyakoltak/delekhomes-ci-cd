const { test } = require("../fixtures/fixtures");
const { expect } = require("@playwright/test");
const HomePage = require("../../page_objects/HomePage");
const ListingsPage = require("../../page_objects/ListingsPage");

test.describe("HomePage Search (fixture-based)", () => {
  let home;
  let listings;

  test.beforeEach(async ({ authenticatedPage }) => {
    home = new HomePage(authenticatedPage);
    listings = new ListingsPage(authenticatedPage);

    await authenticatedPage.goto("/");
    await home.enableDarkMode();
  });

  test("Should search by title", async ({ createdListing }) => {
    await home.searchByTitle(createdListing.title);
    await expect(listings.listingTitles.first())
      .toContainText(createdListing.title);
  });

  test("Should search by bedrooms", async ({ createdListing }) => {
    await home.setBedrooms(createdListing.bedrooms);
    await home.performSearch();

    const bedrooms = await listings.getFirstListingBedrooms();
    expect(bedrooms).toBeGreaterThanOrEqual(createdListing.bedrooms);
  });

  test("Should search by city", async ({ createdListing }) => {
    await home.setCity(createdListing.city);
    await home.performSearch();

    const city = await listings.getFirstListingCity();
    expect(city).toContain(createdListing.city);
  });

  test("Should search by price", async ({ createdListing }) => {
    const min = createdListing.price - 500_000;
    const max = createdListing.price + 500_000;

    await home.setPriceRange(min, max);
    await home.performSearch();

    const price = await listings.getListingPriceByIndex(0);
    expect(price).toBeGreaterThanOrEqual(min);
    expect(price).toBeLessThanOrEqual(max);
  });
});

