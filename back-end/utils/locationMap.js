/**
 * Centralized coordinate registry
 * Used as PRIMARY source before geocoding
 * Ensures demo reliability and prevents 400 errors
 */

const countryCoordinates = {
  // ---------- Countries ----------
  China: { lat: 35.8617, lon: 104.1954 },
  Germany: { lat: 51.1657, lon: 10.4515 },
  India: { lat: 20.5937, lon: 78.9629 },
  Bangladesh: { lat: 23.685, lon: 90.3563 },
  Netherlands: { lat: 52.1326, lon: 5.2913 },
  USA: { lat: 37.0902, lon: -95.7129 },
  France: { lat: 46.2276, lon: 2.2137 },
  UK: { lat: 55.3781, lon: -3.436 },
  Japan: { lat: 36.2048, lon: 138.2529 },
  Australia: { lat: -25.2744, lon: 133.7751 },
  Canada: { lat: 56.1304, lon: -106.3468 },
  Brazil: { lat: -14.2350, lon: -51.9253 },
  Russia: { lat: 61.5240, lon: 105.3188 },
  Singapore: { lat: 1.3521, lon: 103.8198 },
  UAE: { lat: 23.4241, lon: 53.8478 },

  // ---------- Major Cities ----------
  Shanghai: { lat: 31.2304, lon: 121.4737 },
  Beijing: { lat: 39.9042, lon: 116.4074 },
  Berlin: { lat: 52.5200, lon: 13.4050 },
  Paris: { lat: 48.8566, lon: 2.3522 },
  London: { lat: 51.5074, lon: -0.1278 },
  Amsterdam: { lat: 52.3676, lon: 4.9041 },
  NewYork: { lat: 40.7128, lon: -74.0060 },
  Washington: { lat: 38.9072, lon: -77.0369 },
  Tokyo: { lat: 35.6762, lon: 139.6503 },

  // ---------- Indian States ----------
  Kerala: { lat: 10.8505, lon: 76.2711 },
  Telangana: { lat: 18.1124, lon: 79.0193 },
  AndhraPradesh: { lat: 15.9129, lon: 79.7400 },
  TamilNadu: { lat: 11.1271, lon: 78.6569 },
  Karnataka: { lat: 15.3173, lon: 75.7139 },
  Maharashtra: { lat: 19.7515, lon: 75.7139 },

  // ---------- Indian Cities ----------
  Hyderabad: { lat: 17.3850, lon: 78.4867 },
  Guntur: { lat: 16.3067, lon: 80.4365 },
  Delhi: { lat: 28.6139, lon: 77.2090 },
  Mumbai: { lat: 19.0760, lon: 72.8777 },
  Chennai: { lat: 13.0827, lon: 80.2707 },
  Bengaluru: { lat: 12.9716, lon: 77.5946 },
  Kochi: { lat: 9.9312, lon: 76.2673 },

  // ---------- Special Demo Names ----------
  "Washington DC": { lat: 38.9072, lon: -77.0369 },
  "New York": { lat: 40.7128, lon: -74.0060 }
};

module.exports = countryCoordinates;