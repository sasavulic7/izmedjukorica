import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../api/books";

const AddBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !description.trim()) {
      setError("Sva polja su obavezna");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const bookData = { title, author, description };
      const newBook = await createBook(bookData);
      navigate(`/books/${newBook._id}`);
    } catch (error) {
      console.error("Greška pri dodavanju knjige:", error);
      setError(
        "Došlo je do greške prilikom dodavanja knjige. Pokušajte ponovo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f5e6ca] min-h-screen flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-[#6b4226] text-center mb-6">
          Dodaj novu knjigu
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#6b4226] font-medium mb-2">
              Naslov:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b4226]"
              required
            />
          </div>

          <div>
            <label className="block text-[#6b4226] font-medium mb-2">
              Autor:
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b4226]"
              required
            />
          </div>

          <div>
            <label className="block text-[#6b4226] font-medium mb-2">
              Opis:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b4226]"
              rows="6"
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="py-3 px-6 bg-white text-[#6b4226] border border-[#6b4226] rounded-lg hover:bg-[#e8d4b8] transition shadow-lg cursor-pointer"
            >
              Odustani
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-3 px-6 bg-[#6b4226] text-white rounded-lg hover:bg-[#4e2f1f] transition shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Dodavanje..." : "Dodaj knjigu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookPage;
