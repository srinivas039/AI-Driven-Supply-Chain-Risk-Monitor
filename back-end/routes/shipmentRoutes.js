const express = require("express");
const Shipment = require("../models/Shipment");

const router = express.Router();

// CREATE SHIPMENT
router.post("/", async (req, res) => {
  try {
    const { supplierName, origin, destination, transportMode } = req.body;

    if (!supplierName || !origin || !destination || !transportMode) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const shipment = new Shipment({
      supplierName,
      origin,
      destination,
      transportMode,
      status: "In Transit"
    });

    await shipment.save();

    res.status(201).json(shipment);
  } catch (err) {
    console.error("Create shipment error:", err);
    res.status(500).json({ error: "Failed to create shipment" });
  }
});

// GET ALL SHIPMENTS
router.get("/", async (req, res) => {
  try {
    const shipments = await Shipment.find().sort({ createdAt: -1 });
    res.json(shipments);
  } catch (err) {
    console.error("Fetch shipments error:", err);
    res.status(500).json({ error: "Failed to fetch shipments" });
  }
});


module.exports = router;