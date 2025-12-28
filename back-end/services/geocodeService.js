const axios = require("axios");

async function geocodeLocation(place) {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: place,
          format: "json",
          limit: 1
        },
        headers: {
          "User-Agent": "supply-chain-risk-monitor"
        }
      }
    );

    if (!response.data.length) {
      throw new Error("Location not found");
    }

    return {
      lat: parseFloat(response.data[0].lat),
      lon: parseFloat(response.data[0].lon)
    };
  } catch (err) {
    console.error("Geocoding failed for:", place);
    throw err;
  }
}

module.exports = geocodeLocation;