import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { deleteReview } from "../api/books";

const ReviewItem = ({ review, onReviewDeleted }) => {
  const { user } = useContext(AuthContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const handleDelete = async () => {
    if (window.confirm("Da li ste sigurni da želite obrisati ovu recenziju?")) {
      setIsDeleting(true);
      try {
        await deleteReview(review._id);
        if (onReviewDeleted) onReviewDeleted();
      } catch (error) {
        console.error("Greška prilikom brisanja recenzije:", error);
        alert("Nije moguće obrisati recenziju. Pokušajte ponovo.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const isReviewOwner = user && review.user && user.id === review.user._id;

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between mb-2">
        <div className="font-medium text-gray-800">
          {review.user ? review.user.username : "Korisnik"}
        </div>
        <div className="text-yellow-500">{renderStars(review.rating)}</div>
      </div>
      <p className="text-gray-700">{review.content}</p>

      {isReviewOwner && (
        <div className="mt-3 text-right">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer"
          >
            {isDeleting ? "Brisanje..." : "Obriši komentar"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
