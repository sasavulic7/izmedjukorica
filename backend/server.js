const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "https://izmedjukorica-blog-vte.vercel.app",
        credentials: true,
    })
);

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const contactRoutes = require("./routes/contactRoutes");

app.use(process.env.API_BASE_URL + "/auth", authRoutes);
app.use(process.env.API_BASE_URL + "/books", bookRoutes);
app.use(process.env.API_BASE_URL, contactRoutes);

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log(err));
