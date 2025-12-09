
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Passport config
require("./config/passport")(passport);

const app = express();

// -----------------------------
// CONNECT MONGODB
// -----------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// -----------------------------
// CORS (FULL FIX)
// -----------------------------
app.use(
  cors({
    origin: "http://localhost:3008",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3008");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.sendStatus(200);
});

// -----------------------------
app.use(express.json());
app.use(passport.initialize());

// -----------------------------
// ROUTES
// -----------------------------
app.use("/auth", require("./routes/auth"));
app.use("/jobs", require("./routes/jobs"));
app.use("/favorites", require("./routes/favorites"));

// -----------------------------
// JWT VALIDATION
// -----------------------------
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) return res.sendStatus(401);

  const token = bearerHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// -----------------------------
// CURRENT USER
// -----------------------------
app.get("/api/current_user", verifyToken, async (req, res) => {
  const User = require("./models/User");
  const fullUser = await User.findById(req.user.id);
  res.json(fullUser);
});

// -----------------------------
// START SERVER
// -----------------------------
const PORT = process.env.PORT || 4003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
