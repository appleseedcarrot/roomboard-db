const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
const corsOptions = {
  origin: "https://activity-4-disc.vercel.app",  // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE",  // Allowed methods
  allowedHeaders: "Content-Type,Authorization",  // Allowed headers
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

require("dotenv").config();

// Default response
app.get("/", (req, res) => {
  res.json({ message: "Serving is running" });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;