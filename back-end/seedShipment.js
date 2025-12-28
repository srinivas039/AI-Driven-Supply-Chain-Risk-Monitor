const mongoose = require("mongoose");
const Shipment = require("./models/Shipment");
const shipmentsData = require("./data/shipments.json");

const MONGO_URI = "mongodb://127.0.0.1:27017/supplychain";

async function seedShipments() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // await Shipment.deleteMany();
    // console.log("Old shipments removed");

    await Shipment.insertMany(shipmentsData);
    console.log("New shipments inserted:", shipmentsData.length);

    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seedShipments();