const haversineDistance = require('../utils/distance');
const selectBestTransport = require('../utils/selectBestTransport');
const transportSpeed = require('../utils/transportspeed');
const calculateFinalRisk = require('../utils/finalRisk');
const countryCoordinates = require('../utils/locationMap');

async function run() {
  const shipment = {
    supplierName: 'XYZ Freight',
    origin: 'India',
    destination: 'UK',
    transportMode: 'Air'
  };

  const originCoords = countryCoordinates[shipment.origin];
  const destinationCoords = countryCoordinates[shipment.destination];

  if (!originCoords || !destinationCoords) {
    console.error('Invalid origin/destination');
    process.exit(1);
  }

  const distanceKm = haversineDistance(originCoords, destinationCoords);
  const weatherSeverity = 0.3; // use default/fallback for deterministic test

  // simulate analyzeRisk heuristic
  const riskResult = {
    riskLevel: (() => {
      const score = (0.6 + 0.4 + weatherSeverity) / 3;
      if (score > 0.7) return 'High';
      if (score > 0.4) return 'Medium';
      return 'Low';
    })(),
    delayProbability: Number(((0.6 + 0.4 + weatherSeverity) / 3).toFixed(2))
  };

  const bestOption = selectBestTransport(distanceKm, riskResult.riskLevel, transportSpeed);
  const finalRisk = calculateFinalRisk({
    weatherRisk: weatherSeverity,
    distanceKm,
    transportMode: bestOption.mode,
    baseDays: bestOption.baseDays,
    delayDays: bestOption.delayDays
  });

  const update = {
    supplierName: shipment.supplierName,
    origin: shipment.origin,
    destination: shipment.destination,
    distanceKm: Number(distanceKm.toFixed(2)),
    transportMode: bestOption.mode,
    estimatedDays: Number(bestOption.baseDays.toFixed(2)),
    delayDays: Number(bestOption.delayDays.toFixed(2)),
    totalETA: Number(bestOption.totalDays.toFixed(2)),
    riskScore: finalRisk.riskScore,
    riskLevel: finalRisk.riskLevel,
    delayProbability: Number((bestOption.delayDays / bestOption.totalDays).toFixed(2))
  };

  console.log('Computed update payload:');
  console.log(JSON.stringify(update, null, 2));
}

run().catch(err => console.error(err));
