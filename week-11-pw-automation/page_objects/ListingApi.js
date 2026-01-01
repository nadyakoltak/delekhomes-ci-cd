class ListingApi {
  constructor(request, accessToken) {
    this.request = request;
    this.accessToken = accessToken;
  }

  async createListing() {
    // TODO: call API to create a listing and return its data (id, title, etc.)
  }

  async deleteListing(listingId) {
    // TODO: call API to delete listing by ID
  }
}

module.exports = ListingApi;
