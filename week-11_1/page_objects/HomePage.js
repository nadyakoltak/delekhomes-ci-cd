class HomePage {
  constructor(page) {
    this.page = page;

    this.loginLink = page.getByRole("link", { name: "Login" });
    this.registerLink = page.getByRole("link", { name: "Register" });

    this.searchInput = page.getByRole("textbox", { name: "Search" });
    this.startSearchBtn = page.getByRole("button", { name: "Start Search" });

    this.bedroomsDropdown = page.getByRole("button", { name: "Bedrooms" });
    this.stateDropdown = page.getByRole("button", { name: "State" });
    this.cityInput = page.getByRole("textbox", { name: "City" });

    this.priceLeftHandle = page.locator(".MuiSlider-thumb").first();
    this.priceRightHandle = page.locator(".MuiSlider-thumb").last();

    this.darkModeToggle = page.getByRole("checkbox").nth(0);
  }

  async clickLoginLink() {
    await this.loginLink.click();
  }

  async clickRegisterLink() {
    await this.registerLink.click();
  }

  async enableDarkMode() {
    if (!(await this.darkModeToggle.isChecked())) {
      await this.darkModeToggle.click();
      await this.page.waitForTimeout(300);
    }
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

  async setCity(cityName) {
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
}

module.exports = HomePage;
