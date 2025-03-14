import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { addReview } from "../api/books";

const ReviewForm = ({ bookId, onReviewAdded }) => {
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Dodato stanje za uspesnu poruku
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            setError("Komentar je obavezan");
            return;
        }

        setIsSubmitting(true);
        setError("");
        setSuccessMessage(""); // Resetuj poruku o uspehu

        try {
            const reviewData = {
                content,
                rating: Number(rating),
            };

            await addReview(bookId, reviewData);
            setContent("");
            setRating(5);
            setSuccessMessage("Recenzija je uspešno dodata!"); // Postavi poruku o uspehu
            if (onReviewAdded) onReviewAdded();
        } catch (error) {
            console.error("Greška prilikom dodavanja recenzije:", error);
            setError("Nije moguće dodati recenziju. Pokušajte ponovo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h3 className="text-2xl font-semibold mb-4">Dodaj komentar</h3>
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
            )}
            {successMessage && (
                <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Ocena:</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Ocena"
                    >
                        <option value="5">⭐️⭐️⭐️⭐️⭐️ - Odlično</option>
                        <option value="4">⭐️⭐️⭐️⭐️ - Vrlo dobro</option>
                        <option value="3">⭐️⭐️⭐️ - Dobro</option>
                        <option value="2">⭐️⭐️ - Loše</option>
                        <option value="1">⭐️ - Veoma loše</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Komentar:
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        rows="4"
                        placeholder="Napišite svoju recenziju ovde..."
                        required
                        aria-label="Komentar"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#6b4226] text-white py-3 rounded-lg text-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50 cursor-pointer "
                >
                    {isSubmitting ? "Slanje..." : "Objavi komentar"}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
