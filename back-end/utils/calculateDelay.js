function calculateDelay(baseDays, riskLevel) {
  if (riskLevel === "High") return baseDays * 0.4;
  if (riskLevel === "Medium") return baseDays * 0.2;
  return baseDays * 0.05;
}

module.exports = calculateDelay;