const path = require('path');
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

const shipmentRoutes = require("./routes/shipmentRoutes");
app.use("/api/shipments", shipmentRoutes);
app.use("/api/shipments", require("./routes/shipmentRoutes"));
app.use("/api/risk", require("./routes/riskRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
