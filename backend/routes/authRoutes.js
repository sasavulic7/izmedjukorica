const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Book = require("../models/Book");
const Review = require("../models/Review");
const auth = require("../middleware/auth"); // Middleware za autentikaciju

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Provera da li korisnik već postoji
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email već postoji" });
      } else {
        return res.status(400).json({ message: "Korisničko ime već postoji" });
      }
    }

    // Hashovanje lozinke
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kreiranje novog korisnika
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Korisnik registrovan" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Greška na serveru", error: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Pronalaženje korisnika u bazi
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Neispravan email ili lozinka" });

    // Provera lozinke
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Neispravan email ili lozinka" });

    // Generisanje JWT tokena
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "tajni_kljuc",
      {
        expiresIn: "7d" // Produžili smo na 7 dana
      }
    );

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Greška na serveru", error: error.message });
  }
});

// GET /api/auth/profile - Profil korisnika
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res.status(404).json({ message: "Korisnik nije pronađen" });

    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Greška na serveru", error: error.message });
  }
});

// DELETE /api/auth/delete-account - Brisanje naloga
router.delete("/delete-account", auth, async (req, res) => {
  try {
    // Pronađi korisnika
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }

    // 1. Pronađi sve knjige korisnika
    const books = await Book.find({ user: req.userId });
    const bookIds = books.map((book) => book._id);

    // 2. Obriši sve recenzije na knjigama korisnika
    await Review.deleteMany({ book: { $in: bookIds } });

    // 3. Obriši sve recenzije koje je korisnik napravio
    await Review.deleteMany({ user: req.userId });

    // 4. Obriši sve knjige korisnika
    await Book.deleteMany({ user: req.userId });

    // 5. Obriši korisnika
    await User.findByIdAndDelete(req.userId);

    res.json({ message: "Nalog uspešno obrisan" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Greška pri brisanju naloga", error: error.message });
  }
});

// GET /api/auth/user-reviews - Recenzije korisnika
router.get("/user-reviews", auth, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.userId })
      .populate("book", "title author")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Greška pri dohvatanju recenzija korisnika",
      error: error.message
    });
  }
});

module.exports = router;
