require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// Routes (ONLY ONCE)
app.use("/api/shipments", require("./routes/shipmentRoutes"));
app.use("/api/risk", require("./routes/riskRoutes"));

// Health check (important for Render + debugging)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Port binding for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);