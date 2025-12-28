const { Point, Daily } = require("meteostat");

async function getWeatherSeverity(lat, lon) {
  try {
    const point = new Point(lat, lon);
    const start = new Date();
    start.setDate(start.getDate() - 3);
    const end = new Date();

    start.setDate(start.getDate() - 7);

    const data = await Daily.fetch(point, start, end);

    if (!data || data.length === 0) {
      throw new Error("No weather data");
    }

    // Use average temperature deviation as severity proxy
    const avgTemp =
      data.reduce((sum, d) => sum + (d.tavg || 0), 0) / data.length;

    // Normalize to 0–1 range
    const severity = Math.min(Math.abs(avgTemp) / 40, 1);

    return Number(severity.toFixed(2));
  } catch (err) {
    console.warn("Weather API failed, using fallback");
    return 0.3; // fallback severity
  }
}

module.exports = getWeatherSeverity;