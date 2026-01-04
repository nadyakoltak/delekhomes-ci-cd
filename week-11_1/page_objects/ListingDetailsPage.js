class ListingDetailsPage {
  constructor(page) {
    this.page = page;

    // select the container holding all info blocks
    this.details = page.locator("div.MuiGrid-root.MuiGrid-container");
  }

  async getDetails() {

    const text = await this.details.nth(0).innerText();

    return {
      sqft: text.match(/Square Feet:\s*(\d+)/)?.[1],
      garage: text.match(/Garage:\s*(\d+)/)?.[1],
      bedrooms: text.match(/Bedrooms:\s*(\d+)/)?.[1],
      bathrooms: text.match(/Bathrooms:\s*(\d+)/)?.[1],
      state: text.match(/State:\s*([A-Z]+)/)?.[1],
      zip: text.match(/Zip\/Code:\s*(\d+)/)?.[1],
    };
  }
}

module.exports = ListingDetailsPage;
