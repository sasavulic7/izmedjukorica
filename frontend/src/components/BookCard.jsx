import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="bg-[#fff3dd] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
      {book.image && (
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {book.title}
        </h2>
        <p className="text-gray-700 font-medium mb-2">Autor: {book.author}</p>
        <p className="text-gray-600 mb-4 line-clamp-3">{book.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {book.reviews?.length || 0} komantar
          </span>
          <Link
            to={`/books/${book._id}`}
            className="bg-[#8B5E3C] text-white py-2 px-4 rounded-lg hover:bg-[#6E442A] transition"
          >
            Detaljnije
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
