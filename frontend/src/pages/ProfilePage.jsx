import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getUserBooks, getUserReviews, deleteAccount } from "../api/auth";
import { deleteBook, deleteReview } from "../api/books";
import { FaTrash, FaSignOutAlt, FaBook, FaStar } from "react-icons/fa";

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userBooks, setUserBooks] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setUserBooks(await getUserBooks());
        setUserReviews(await getUserReviews());
      } catch (error) {
        console.error("Greška pri dohvatanju podataka:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleDeleteBook = async (bookId) => {
    if (window.confirm("Obrisati knjigu i sve njene recenzije?")) {
      try {
        await deleteBook(bookId);
        setUserBooks(userBooks.filter((book) => book._id !== bookId));
        setUserReviews(
          userReviews.filter((review) => review.book._id !== bookId)
        );
      } catch (error) {
        alert("Nije moguće obrisati knjigu.");
      }
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Obrisati ovu recenziju?")) {
      try {
        await deleteReview(reviewId);
        setUserReviews(userReviews.filter((review) => review._id !== reviewId));
      } catch (error) {
        alert("Nije moguće obrisati recenziju.");
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Ova akcija je nepovratna. Obriši nalog?")) {
      setIsDeleting(true);
      try {
        await deleteAccount();
        logout();
        navigate("/");
      } catch (error) {
        alert("Greška pri brisanju naloga.");
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex border-b">
          {[
            { id: "profile", label: "Profil" },
            { id: "books", label: "Moje objave" },
            { id: "reviews", label: "Moji komentari" }
          ].map(({ id, label }) => (
            <button
              key={id}
              className={`cursor-pointer py-3 px-6 flex-1 font-medium text-center transition-all ${
                activeTab === id
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "profile" && (
            <div className="space-y-4 text-center">
              <p className="text-gray-500 text-sm">Korisničko ime</p>
              <h1 className="text-3xl font-bold">{user.username}</h1>
              <p className="text-gray-500 text-sm">Mail adresa</p>
              <p className="text-gray-600">{user.email}</p>

              <div className="flex justify-center space-x-4 pt-6">
                <button
                  onClick={logout}
                  className="flex items-center bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition cursor-pointer"
                >
                  <FaSignOutAlt className="mr-2" /> Odjavi se
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex items-center bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
                >
                  <FaTrash className="mr-2" />{" "}
                  {isDeleting ? "Brisanje..." : "Obriši nalog"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "books" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Moje knjige</h1>
              <div className="space-y-4">
                {userBooks.map((book) => (
                  <div
                    key={book._id}
                    className="border rounded-lg p-4 flex justify-between items-center"
                  >
                    <Link
                      to={`/books/${book._id}`}
                      className="text-xl text-primary hover:underline"
                    >
                      <FaBook className="inline mr-2" /> {book.title}
                    </Link>
                    <button
                      onClick={() => handleDeleteBook(book._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Moji komentari</h1>
              <div className="space-y-4">
                {userReviews.map((review) => (
                  <div
                    key={review._id}
                    className="border rounded-lg p-4 flex justify-between items-center"
                  >
                    <Link
                      to={`/books/${review.book._id}`}
                      className="text-lg text-primary hover:underline"
                    >
                      <FaStar className="inline text-yellow-500 mr-1" />{" "}
                      {review.book.title}
                    </Link>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
