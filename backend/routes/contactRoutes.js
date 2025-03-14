const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const dotenv = require("dotenv").config();

router.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res
            .status(400)
            .json({ success: false, message: "Sva polja su obavezna." });
    }

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER,
            subject: `Poruka sa kontakt forme od ${name}`,
            text: `Ime: ${name}\nEmail: ${email}\nPoruka: ${message}`,
        });

        res.json({ success: true, message: "Poruka je uspešno poslata." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Greška pri slanju poruke." });
    }
});

module.exports = router;
