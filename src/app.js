const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/v1/auth.routes");
const userRoutes = require("./routes/v1/user.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "VR Course Exploration Backend API is running 🚀",
  });
});

app.use("/api/v1/users", userRoutes);

module.exports = app;