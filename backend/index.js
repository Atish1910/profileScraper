require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/profiles", profileRoutes);

try {
  connectDB();
  app.listen(5000, () => console.log("Server running on port 5000"));
} catch (error) {
  console.log("Error To Connect with mongoDB.. ", error);
}
