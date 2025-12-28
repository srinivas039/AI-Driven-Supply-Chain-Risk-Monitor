const OpenAI = require("openai");

let client = null;
if (process.env.OPENAI_API_KEY) {
  try {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  } catch (e) {
    console.warn("OpenAI client initialization failed:", e.message);
    client = null;
  }
} else {
  console.warn("OPENAI_API_KEY not set — using local risk heuristic");
}

async function analyzeRisk(input) {
  // The project currently uses a simple heuristic; keep it even if OpenAI client exists.
  const score = (input.originRisk + input.destinationRisk + input.weatherSeverity) / 3;

  let riskLevel = "Low";
  if (score > 0.7) riskLevel = "High";
  else if (score > 0.4) riskLevel = "Medium";

  return {
    riskLevel,
    delayProbability: Number(score.toFixed(2))
  };
}

module.exports = analyzeRisk;