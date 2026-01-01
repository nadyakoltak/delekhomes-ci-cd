const fs = require("fs");
const path = require("path");
const { faker } = require("@faker-js/faker");

class ListingApi {
  constructor(request, accessToken) {
    this.request = request;
    this.accessToken = accessToken;
  }

  async createListing() {
    const title = `Auto_${faker.number.int({ min: 1000, max: 9999 })}`;

    const listingData = {
      images: fs.createReadStream(
        path.join(__dirname, "..", "data", "nadya-house.jpeg")
      ),

      lotSize: 4000,
      sqft: 8000,
      garage: 2,
      bathrooms: 4,
      bedrooms: 6,

      price: 9000000,
      zipCode: 33301,

      state: "FL",
      city: "Fort Lauderdale",

      address: "1040 Seminole Dr",
      title,
      description: "Automated test listing",
      isPublished: true,
    };

    const response = await this.request.post("/api/estate-objects", {
      multipart: listingData,
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    });

    const body = await response.json();

    return {
      id: body.id,
      title: title,

      sqft: listingData.sqft,
      garage: listingData.garage,
      bedrooms: listingData.bedrooms,
      bathrooms: listingData.bathrooms,
      city: listingData.city,
      state: listingData.state,
      zipCode: listingData.zipCode,
      price: listingData.price,
    };
  }

  async deleteListing(listingId) {
    await this.request.delete(`/api/estate-objects/${listingId}`, {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    });
  }
}

module.exports = ListingApi;
