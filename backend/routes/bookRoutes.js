const express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/Book");
const router = express.Router();
const Review = require("../models/Review");
const auth = require("../middleware/auth"); // Ovo ćemo napraviti kasnije

// POST /api/books - Kreiraj knjigu - dodajemo auth middleware
router.post("/", auth, async (req, res) => {
  try {
    const { title, author, description } = req.body;

    // Provera obaveznih polja
    if (!title || !author) {
      return res.status(400).json({ message: "Naslov i autor su obavezni" });
    }

    const newBook = new Book({
      title,
      author,
      description: description || "",
      user: req.userId, // Koristimo ID korisnika iz auth middlewarea
      reviews: []
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Greška pri kreiranju knjige", error: error.message });
  }
});

// GET /api/books - Sve knjige
router.get("/", async (req, res) => {
  try {
    const books = await Book.find()
      .populate("reviews.user", "username")
      .populate("user", "username") // Dodajemo informacije o korisniku
      .sort({ createdAt: -1 });

    res.json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Greška pri dohvatanju knjiga", error: error.message });
  }
});

// GET /api/books/:id - Jedna knjiga
router.get("/:id", async (req, res) => {
  try {
    console.log("Primljen zahtev za knjigu sa ID-em:", req.params.id);

    // Provera validnosti ID-a
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log("ID nije validan MongoDB ObjectId");
      return res.status(400).json({ message: "Nevažeći ID format" });
    }

    const book = await Book.findById(req.params.id)
      .populate({
        path: "reviews",
        model: "Review",
        populate: {
          path: "user",
          select: "username"
        }
      })
      .populate("user", "username"); // Dodajemo informacije o korisniku koji je kreirao knjigu

    console.log(
      "Rezultat pretrage:",
      book ? "Knjiga pronađena" : "Knjiga nije pronađena"
    );

    if (!book)
      return res.status(404).json({ message: "Knjiga nije pronađena" });

    res.json(book);
  } catch (error) {
    console.error("Greška prilikom traženja knjige:", error);
    res
      .status(500)
      .json({ message: "Greška na serveru", error: error.message });
  }
});

// POST /api/books/:id/review - Dodaj recenziju
router.post("/:id/review", auth, async (req, res) => {
  try {
    const { content, rating } = req.body;
    const userId = req.userId; // Iz auth middlewarea

    // Validacija podataka
    if (!content || !rating) {
      return res.status(400).json({ message: "Sadržaj i ocena su obavezni" });
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Knjiga nije pronađena" });
    }

    // Kreiraj novu recenziju kao zaseban dokument
    const newReview = new Review({
      book: req.params.id,
      user: userId,
      content,
      rating
    });

    const savedReview = await newReview.save();

    // Dodaj referencu na recenziju u knjigu
    book.reviews.push(savedReview._id);
    await book.save();

    // Vrati ažuriranu knjigu s recenzijama
    const updatedBook = await Book.findById(req.params.id)
      .populate({
        path: "reviews",
        model: "Review",
        populate: {
          path: "user",
          select: "username"
        }
      })
      .populate("user", "username");

    res.status(201).json(updatedBook);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Greška", error: error.message });
  }
});

// GET /api/books/user/:userId - Dobavi knjige korisnika
router.get("/user/profile", auth, async (req, res) => {
  try {
    const books = await Book.find({ user: req.userId })
      .populate({
        path: "reviews",
        model: "Review",
        populate: {
          path: "user",
          select: "username"
        }
      })
      .sort({ createdAt: -1 });

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: "Greška pri dohvatanju knjiga korisnika",
      error: error.message
    });
  }
});

// DELETE /api/books/:id - Obriši knjigu
router.delete("/:id", auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Knjiga nije pronađena" });
    }

    // Provera da li je trenutni korisnik vlasnik knjige
    if (book.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Nemate dozvolu za brisanje ove knjige" });
    }

    // Brisanje svih recenzija povezanih s knjigom
    await Review.deleteMany({ book: req.params.id });

    // Brisanje knjige
    await Book.findByIdAndDelete(req.params.id);

    res.json({ message: "Knjiga uspešno obrisana" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Greška pri brisanju knjige", error: error.message });
  }
});

// DELETE /api/books/review/:reviewId - Obriši recenziju
router.delete("/review/:reviewId", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: "Recenzija nije pronađena" });
    }

    // Provera da li je trenutni korisnik autor recenzije
    if (review.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Nemate dozvolu za brisanje ove recenzije" });
    }

    // Pronađi knjigu i ukloni referencu na recenziju
    const book = await Book.findById(review.book);
    if (book) {
      book.reviews = book.reviews.filter(
        (reviewId) => reviewId.toString() !== req.params.reviewId
      );
      await book.save();
    }

    // Obriši recenziju
    await Review.findByIdAndDelete(req.params.reviewId);

    res.json({ message: "Recenzija uspešno obrisana" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Greška pri brisanju recenzije", error: error.message });
  }
});

module.exports = router;
