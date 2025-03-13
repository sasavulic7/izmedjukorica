const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Ispravljena CORS konfiguracija
app.use(
  cors({
    origin: "http://localhost:5173", // Vaš frontend origin
    credentials: true
  })
);

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

const contactRoutes = require("./routes/contactRoutes");
app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
