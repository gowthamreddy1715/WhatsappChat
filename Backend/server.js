const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

console.log(" Running correct server.js from:", __dirname);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Routes
console.log("Loading Auth Routes...");
app.use("/", authRoutes);

// 🔧 Basic test route to confirm server is working
app.post("/login-test", (req, res) => {
  res.json({ message: "Login test route hit " });
});

// 🔧 Root test route (for browser)
app.get("/", (req, res) => {
  res.send(" Server is UP and running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
