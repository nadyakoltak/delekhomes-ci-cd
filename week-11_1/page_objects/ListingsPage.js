const { expect } = require("@playwright/test");

class ListingsPage {
  constructor(page) {
    this.page = page;
    this.listingCards = page.locator("div.MuiCardContent-root");
    this.listingTitles = this.listingCards.locator("h5.MuiTypography-root");
    this.bedroomsLine = this.listingCards.locator("div:has-text('Bedrooms:')");
    this.cityLine = this.listingCards.locator("div:has-text('City:')");
    this.priceBlocks = page.locator("div.MuiBox-root.css-79elbk");
    this.priceValue = this.priceBlocks.locator("div.MuiBox-root.css-6yrxxf");
    this.infoLine = this.listingCards.locator("div.MuiGrid-root");
    this.moreInfoBtn = this.listingCards.locator(
      "button:has-text('More info'), a:has-text('More info')"
    );
  }

  async getTotalListings() {
    return await this.priceBlocks.count();
  }

  async getListingPriceByIndex(index) {
    const raw = await this.priceValue.nth(index).innerText();
    return Number(raw.replace(/[^0-9]/g, ""));
  }

  async getFirstListingCity() {
    const raw = await this.cityLine.first().innerText();
    const match = raw.match(/City:\s*(.+)/);
    return match ? match[1].trim() : raw.trim();
  }

  async getFirstListingBedrooms() {
    const text = await this.bedroomsLine.first().innerText();
    const match = text.match(/Bedrooms:\s*(\d+)/);
    return match ? Number(match[1]) : null;
  }

  async getCardInfo(index = 0) {
    // 1️⃣ Extract the grid block (sqft, garage, bedrooms, etc.)
    const text = await this.infoLine.nth(index).innerText();

    // 2️⃣ Extract city from the real city line
    const cityRaw = await this.cityLine.nth(index).innerText();
    const city = cityRaw.replace("City:", "").trim();

    return {
      sqft: text.match(/Sqft:\s*(\d+)/)?.[1],
      garage: text.match(/Garage:\s*(\d+)/)?.[1],
      bedrooms: text.match(/Bedrooms:\s*(\d+)/)?.[1],
      bathrooms: text.match(/Bathrooms:\s*(\d+)/)?.[1],
      city: city, // ✔ REAL CITY
      state: text.match(/State:\s*([A-Z]+)/)?.[1],
      zip: text.match(/Zip\/Code:\s*(\d+)/)?.[1],
    };
  }

  async openMoreInfo(index = 0) {
    await this.moreInfoBtn.nth(index).click();
  }
}

module.exports = ListingsPage;
