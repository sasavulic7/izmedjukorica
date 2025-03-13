import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getAllBooks } from "../api/books";
import BookCard from "../components/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import homeImage from "../assets/images/homeImage.jpg";
import { AuthContext } from "../context/AuthContext"; // Uvoz AuthContext-a

console.log(homeImage);

const HomePage = () => {
  const [latestBooks, setLatestBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext); // Dobavljanje statusa autentifikacije

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getAllBooks();
        setLatestBooks(books.slice(0, 5)); // Uzmi 5 najnovijih knjiga za carousel
      } catch (error) {
        console.error("Greška pri učitavanju knjiga:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="bg-[#f5e6ca] min-h-screen">
      {/* Hero sekcija */}
      <section className="relative h-[500px] flex items-center justify-center text-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${homeImage})` }}
        ></div>
        <div className="absolute inset-0 backgroundImage: `url(${homeImage})` bg-opacity-50"></div>{" "}
        {/* Gradient overlay */}
        <div className="relative z-10 px-6">
          <h1 className="text-5xl font-bold mb-4">Dobrodošli na Knjige Blog</h1>
          <p className="text-xl mb-6">
            Otkrijte nove knjige i podelite svoje utiske sa zajednicom.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/books"
              className="bg-[#6b4226] text-white py-3 px-6 rounded-lg hover:bg-[#4e2f1f] transition shadow-lg"
            >
              Pregledaj knjige
            </Link>
            {/* Prikazi dugme "Pridruži se" samo ako korisnik nije prijavljen */}
            {!isAuthenticated && (
              <Link
                to="/register"
                className="bg-white text-[#6b4226] py-3 px-6 rounded-lg border border-[#6b4226] hover:bg-[#e8d4b8] transition shadow-lg"
              >
                Pridruži se
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Najnovije knjige - Carousel */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#6b4226] mb-6">
          Najnovije knjige
        </h2>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6b4226]"></div>
          </div>
        ) : (
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-8"
          >
            {latestBooks.map((book) => (
              <SwiperSlide key={book._id}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    </div>
  );
};

export default HomePage;
