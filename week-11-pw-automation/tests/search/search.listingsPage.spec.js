const { test } = require("../fixtures/fixtures");
const { expect } = require("@playwright/test");
const HomePage = require("../../page_objects/HomePage");
const FeaturedListingsPage = require("../../page_objects/FeaturedListingsPage");
const ListingsPage = require("../../page_objects/ListingsPage");

test.describe("Featured Listings Page Search (fixture-based)", () => {
  let home;
  let featured;
  let listings;

  test.beforeEach(async ({ authenticatedPage }) => {
    home = new HomePage(authenticatedPage);
    featured = new FeaturedListingsPage(authenticatedPage);
    listings = new ListingsPage(authenticatedPage);

    await authenticatedPage.goto("/featured-listings");
    await home.enableDarkMode();

    await featured.clearFiltersIfVisible();
  });

  test("Should search by title", async ({ createdListing }) => {
    await featured.searchByTitle(createdListing.title);

    await expect(listings.listingTitles.first())
      .toContainText(createdListing.title);
  });

  test("Should search by bedrooms", async ({ createdListing }) => {
    await featured.setBedrooms(createdListing.bedrooms);
    await featured.performSearch();

    const bedrooms = await listings.getFirstListingBedrooms();
    expect(bedrooms).toBeGreaterThanOrEqual(createdListing.bedrooms);
  });

  test("Should search by city", async ({ createdListing }) => {
    await featured.setCity(createdListing.city);
    await featured.performSearch();

    const city = await listings.getFirstListingCity();
    expect(city).toContain(createdListing.city);
  });

  test("Should search by price", async ({ createdListing }) => {
    const min = createdListing.price - 500_000;
    const max = createdListing.price + 500_000;

    await featured.setPriceRange(min, max);
    await featured.performSearch();

    const price = await listings.getListingPriceByIndex(0);
    expect(price).toBeGreaterThanOrEqual(min);
    expect(price).toBeLessThanOrEqual(max);
  });
});

