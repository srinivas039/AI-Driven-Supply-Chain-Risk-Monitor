const express = require("express");
const Shipment = require("../models/Shipment");

const analyzeRisk = require("../services/openaiService");
const getWeatherSeverity = require("../services/weatherService");
const geocodeLocation = require("../services/geocodeService");

const haversineDistance = require("../utils/distance");
const transportSpeed = require("../utils/transportspeed");
const calculateDelay = require("../utils/calculateDelay");
const calculateFinalRisk = require("../utils/finalRisk");
const countryCoordinates = require("../utils/locationMap");

const router = express.Router();

router.post("/:id", async (req, res) => {
  try {
    // 1️⃣ Fetch shipment
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }

    /* ===== DEBUG START ===== */
    console.log("RAW ORIGIN:", shipment.origin);
    console.log("RAW DESTINATION:", shipment.destination);
    console.log("RAW TRANSPORT:", shipment.transportMode);
    /* ===== DEBUG END ===== */

    // 2️⃣ Resolve coordinates with fallback
    let originCoords, destinationCoords;

    try {
      originCoords = await geocodeLocation(shipment.origin);
    } catch {
      originCoords = countryCoordinates[shipment.origin];
    }

    try {
      destinationCoords = await geocodeLocation(shipment.destination);
    } catch {
      destinationCoords = countryCoordinates[shipment.destination];
    }

    /* ===== DEBUG START ===== */
    console.log("ORIGIN COORDS:", originCoords);
    console.log("DESTINATION COORDS:", destinationCoords);
    /* ===== DEBUG END ===== */

    if (!originCoords || !destinationCoords) {
      console.error("❌ Coordinate resolution failed");
      return res.status(400).json({
        error: "Unable to resolve coordinates for shipment"
      });
    }

    // 3️⃣ Distance calculation
    const distanceKm = haversineDistance(originCoords, destinationCoords);

    /* ===== DEBUG ===== */
    console.log("DISTANCE (km):", distanceKm);

    // 4️⃣ Weather severity
    const weatherSeverity = await getWeatherSeverity(
      originCoords.lat,
      originCoords.lon
    );

    /* ===== DEBUG ===== */
    console.log("WEATHER SEVERITY:", weatherSeverity);

    // 5️⃣ Initial contextual risk
    const riskContext = await analyzeRisk({
      originRisk: 0.6,
      destinationRisk: 0.4,
      weatherSeverity,
      transportMode: shipment.transportMode
    });

    /* ===== DEBUG ===== */
    console.log("RISK CONTEXT:", riskContext);

    // 6️⃣ Respect USER-selected transport
    const transportMode = shipment.transportMode.charAt(0).toUpperCase() + shipment.transportMode.slice(1).toLowerCase();
    const speed = transportSpeed[transportMode];

    /* ===== DEBUG ===== */
    console.log("TRANSPORT MODE USED:", transportMode);
    console.log("TRANSPORT SPEED:", speed);

    if (!speed) {
      console.error("❌ Invalid transport mode");
      return res.status(400).json({ error: "Invalid transport mode" });
    }

    const baseDays = distanceKm / (speed * 24);
    const delayDays = calculateDelay(baseDays, riskContext.riskLevel);
    const totalETA = baseDays + delayDays;

    /* ===== DEBUG ===== */
    console.log("BASE DAYS:", baseDays);
    console.log("DELAY DAYS:", delayDays);
    console.log("TOTAL ETA:", totalETA);

    // 7️⃣ Final risk score
    const finalRisk = calculateFinalRisk({
      weatherRisk: weatherSeverity,
      distanceKm,
      transportMode,
      baseDays,
      delayDays
    });

    /* ===== DEBUG ===== */
    console.log("FINAL RISK:", finalRisk);

    // 8️⃣ Persist to MongoDB
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

    console.log("Shipment updated successfully");

    // 9️⃣ Respond
    res.json(shipment);

  } catch (err) {
    console.error("❌ Risk route fatal error:", err);
    res.status(500).json({ error: "Risk analysis failed" });
  }
});

module.exports = router;