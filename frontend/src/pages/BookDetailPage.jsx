import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, deleteBook } from "../api/books";
import { AuthContext } from "../context/AuthContext";
import ReviewItem from "../components/ReviewItem";
import ReviewForm from "../components/ReviewForm";

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (error) {
        console.error("Greška pri učitavanju knjige:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookData();
  }, [id]);

  const handleReviewUpdate = () => {
    setIsLoading(true);
    getBookById(id).then((data) => {
      setBook(data);
      setIsLoading(false);
    });
  };

  const handleDeleteBook = async () => {
    if (window.confirm("Da li ste sigurni da želite obrisati ovu knjigu?")) {
      setIsDeleting(true);
      try {
        await deleteBook(id);
        navigate("/");
      } catch (error) {
        console.error("Greška prilikom brisanja knjige:", error);
        alert("Nije moguće obrisati knjigu. Pokušajte ponovo.");
        setIsDeleting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Knjiga nije pronađena</h2>
        <p className="text-gray-600">Možda je obrisana ili ne postoji.</p>
      </div>
    );
  }

  const averageRating =
    book.reviews?.length > 0
      ? book.reviews.reduce((sum, r) => sum + r.rating, 0) / book.reviews.length
      : 0;

  const isBookOwner = user && book.user && user.id === book.user._id;

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="bg-[#fff4df] rounded-xl shadow-lg p-8 mb-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-3">{book.title}</h1>
            <p className="text-lg text-gray-600 mb-1">Autor: {book.author}</p>
            {book.user && book.user.username && (
              <p className="text-sm text-gray-500">
                Objavio: {book.user.username}
              </p>
            )}
          </div>
          {isBookOwner && (
            <button
              onClick={handleDeleteBook}
              disabled={isDeleting}
              className="bg-red-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
            >
              {isDeleting ? "Brisanje..." : "Obriši knjigu"}
            </button>
          )}
        </div>

        <div className="flex items-center mt-4">
          <span className="text-yellow-500 text-lg font-bold mr-2">
            {averageRating.toFixed(1)} ★
          </span>
          <span className="text-gray-500">
            ({book.reviews?.length || 0} komentar)
          </span>
        </div>

        <div className="mt-6 border-t pt-4">
          <h2 className="text-2xl font-semibold mb-2">Opis</h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {book.description}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-4xl font-bold mb-4 text-center">Komentari</h2>
        {isAuthenticated && (
          <ReviewForm bookId={id} onReviewAdded={handleReviewUpdate} />
        )}
        <div className="mt-6">
          {book.reviews?.length > 0 ? (
            book.reviews.map((review) => (
              <ReviewItem
                key={review._id}
                review={review}
                onReviewDeleted={handleReviewUpdate}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center py-4">
              Nema komentara za ovu knjigu.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
