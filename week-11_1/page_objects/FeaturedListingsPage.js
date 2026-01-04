class FeaturedListingsPage {
  constructor(page) {
    this.page = page;

    this.featuredNavLink = page.getByRole("link", {
      name: "Featured Listings",
    });

    this.searchInput = page.getByRole("textbox", { name: "Search" });
    this.startSearchBtn = page.getByRole("button", { name: "Start Search" });

    this.bedroomsDropdown = page.getByRole("button", { name: "Bedrooms" });
    this.stateDropdown = page.getByRole("button", { name: "State" });
    this.cityInput = page.getByRole("textbox", { name: "City" });

    this.priceLeftHandle = page.locator('input[data-index="0"]');
    this.priceRightHandle = page.locator('input[data-index="1"]');

    this.clearFiltersButton = page.getByRole("button", {
      name: "Clear Filters",
    });
  }

  async open() {
    await this.featuredNavLink.click();
  }

  async searchByTitle(title) {
    await this.searchInput.fill(title);
    await this.startSearchBtn.click();
  }

  async setBedrooms(value) {
    await this.bedroomsDropdown.click();
    await this.page.getByRole("option", { name: String(value) }).click();
  }

  async setState(stateName) {
    await this.stateDropdown.click();
    await this.page.getByRole("option", { name: stateName }).click();
  }
  async clearCity() {
    const clearButton = this.page.locator('button[aria-label="Clear"]');
    if (await clearButton.isVisible()) {
      await clearButton.click();
    }
  }

  async setCity(cityName) {
    await this.clearCity();
    await this.cityInput.fill(cityName);
  }

  async setPriceRange(minPrice, maxPrice) {
  const leftHandle = this.page.locator('input[data-index="0"]');
  const rightHandle = this.page.locator('input[data-index="1"]');

  const leftSteps = Math.floor(minPrice / 100000);
  const rightSteps = Math.floor((20000001 - maxPrice) / 100000);

  await leftHandle.click({ force: true });
  for (let i = 0; i < leftSteps; i++) {
    await this.page.keyboard.press("ArrowRight");
  }

  await rightHandle.click({ force: true });
  for (let i = 0; i < rightSteps; i++) {
    await this.page.keyboard.press("ArrowLeft");
  }
}

  async performSearch() {
    await this.startSearchBtn.click();
  }

  async clearFiltersIfVisible() {
    if (await this.clearFiltersButton.isVisible()) {
      await this.clearFiltersButton.click();
    }
  }
}
module.exports = FeaturedListingsPage;
