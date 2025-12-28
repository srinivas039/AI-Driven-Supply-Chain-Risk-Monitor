module.exports = function selectBestTransport(
  distanceKm,
  riskLevel,
  transportSpeed
) {
  let modes = ["Air", "Road", "Sea"];

  let best = null;

  modes.forEach((mode) => {
    const speed = transportSpeed[mode];
    if (!speed) return;

    const baseDays = distanceKm / (speed * 24);

    let delayMultiplier = 0.05;
    if (riskLevel === "Medium") delayMultiplier = 0.2;
    if (riskLevel === "High") delayMultiplier = 0.4;

    const delayDays = baseDays * delayMultiplier;
    const totalDays = baseDays + delayDays;

    if (!best || totalDays < best.totalDays) {
      best = {
        mode,
        baseDays,
        delayDays,
        totalDays
      };
    }
  });

  return best;
};