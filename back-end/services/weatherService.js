const { Point, Daily } = require("meteostat");

async function getWeatherSeverity(lat, lon) {
  try {
    const location = new Point(lat, lon);

    const start = new Date();
    start.setDate(start.getDate() - 3);
    const end = new Date();

    const data = await Daily.fetch(location, start, end);

    if (!data || data.length === 0) {
      return 0.3; // safe default
    }

    let severity = 0;

    data.forEach(day => {
      if (day.prcp && day.prcp > 20) severity += 0.3;
      if (day.wspd && day.wspd > 15) severity += 0.3;
      if (day.tmin !== null && day.tmin < 0) severity += 0.2;
      if (day.tmax !== null && day.tmax > 40) severity += 0.2;
    });

    return Math.min(severity, 1);
  } catch (err) {
    console.error("Weather API failed, using default severity");
    return 0.3; // fallback
  }
}

module.exports = getWeatherSeverity;