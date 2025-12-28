const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
  {
    supplierName: {
      type: String,
      required: true
    },

    origin: {
      type: String,
      required: true
    },

    destination: {
      type: String,
      required: true
    },

    transportMode: {
      type: String,
      required: true
    },

    status: {
      type: String,
      default: "In Transit"
    },

    distanceKm: {
      type: Number
    },

    estimatedDays: {
      type: Number
    },

    delayDays: {
      type: Number
    },

    totalETA: {
      type: Number
    },

    // --- Risk analytics ---
    riskScore: {
      type: Number
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"]
    },

    delayProbability: {
      type: Number
    },

    originCoords: {
      lat: Number,
      lon: Number
    },

    destinationCoords: {
      lat: Number,
      lon: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Shipment", shipmentSchema);