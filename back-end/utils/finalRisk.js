function calculateFinalRisk({
  weatherRisk,
  distanceKm,
  transportMode,
  baseDays,
  delayDays
}) {
  const distanceRisk = Math.min(distanceKm / 7000, 1);

  const delayRisk = Math.min((delayDays / baseDays) * 2, 1);

  const transportRiskMap = {
    Air: 0.25,
    Road: 0.55,
    Sea: 0.9
  };

  const transportRisk = transportRiskMap[transportMode] || 0.55;

  const riskScore =
    0.25 * weatherRisk +
    0.25 * distanceRisk +
    0.2 * transportRisk +
    0.3 * delayRisk;

  let riskLevel = "Low";
  if (riskScore >= 0.65) riskLevel = "High";
  else if (riskScore >= 0.35) riskLevel = "Medium";

  return {
    riskScore: Number(riskScore.toFixed(2)),
    riskLevel
  };
}

module.exports = calculateFinalRisk;