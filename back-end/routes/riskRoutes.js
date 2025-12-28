const express = require("express");
const Shipment = require("../models/Shipment");

const analyzeRisk = require("../services/openaiService");
const getWeatherSeverity = require("../services/weatherService");
const geocodeLocation = require("../services/geocodeService");

const haversineDistance = require("../utils/distance");
const transportSpeed = require("../utils/transportspeed");
const calculateDelay = require("../utils/calculateDelay");
const calculateFinalRisk = require("../utils/finalRisk");

const router = express.Router();

router.post("/:id", async (req, res) => {
  try {
    // 1️⃣ Fetch shipment
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }

    // 2️⃣ Resolve coordinates
    let originCoords, destinationCoords;
    try {
      originCoords = await geocodeLocation(shipment.origin);
      destinationCoords = await geocodeLocation(shipment.destination);
    } catch (err) {
      return res.status(400).json({
        error: "Unable to resolve origin or destination coordinates"
      });
    }

    // 3️⃣ Calculate distance
    const distanceKm = haversineDistance(originCoords, destinationCoords);

    // 4️⃣ Weather severity
    const weatherSeverity = await getWeatherSeverity(
      originCoords.lat,
      originCoords.lon
    );

    // 5️⃣ Initial risk (contextual)
    const riskContext = await analyzeRisk({
      originRisk: 0.6,
      destinationRisk: 0.4,
      weatherSeverity,
      transportMode: shipment.transportMode
    });

    // 6️⃣ Use USER-SELECTED transport (IMPORTANT)
    const transportMode = shipment.transportMode;
    const speed = transportSpeed[transportMode];

    if (!speed) {
      return res.status(400).json({ error: "Invalid transport mode" });
    }

    const baseDays = distanceKm / (speed * 24);
    const delayDays = calculateDelay(baseDays, riskContext.riskLevel);
    const totalETA = baseDays + delayDays;

    // 7️⃣ Final risk calculation
    const finalRisk = calculateFinalRisk({
      weatherRisk: weatherSeverity,
      distanceKm,
      transportMode,
      baseDays,
      delayDays
    });

    // 8️⃣ Persist EVERYTHING in MongoDB
    shipment.originCoords = originCoords;
    shipment.destinationCoords = destinationCoords;

    shipment.distanceKm = Number(distanceKm.toFixed(2));
    shipment.estimatedDays = Number(baseDays.toFixed(2));
    shipment.delayDays = Number(delayDays.toFixed(2));
    shipment.totalETA = Number(totalETA.toFixed(2));

    shipment.riskScore = finalRisk.riskScore;
    shipment.riskLevel = finalRisk.riskLevel;
    shipment.delayProbability = Number(
      (delayDays / totalETA).toFixed(2)
    );

    await shipment.save();

    // 9️⃣ Respond with updated shipment
    res.json(shipment);

  } catch (err) {
    console.error("Risk route error:", err);
    res.status(500).json({ error: "Risk analysis failed" });
  }
});

module.exports = router;