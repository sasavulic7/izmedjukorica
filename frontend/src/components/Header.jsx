import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#6b4226] text-[#f5e6ca] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-semibold text-[#f5e6ca] hover:text-white"
        >
          Između Korica
        </Link>

        {/* Navigacija */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link
            to="/"
            className="text-[#f5e6ca] hover:text-white text-lg font-medium"
          >
            Početna
          </Link>
          <Link
            to="/books"
            className="text-[#f5e6ca] hover:text-white text-lg font-medium"
          >
            Knjige
          </Link>
          {isAuthenticated && (
            <Link
              to="/add-book"
              className="text-[#f5e6ca] hover:text-white text-lg font-medium"
            >
              Dodaj knjigu
            </Link>
          )}
        </nav>

        {/* Autentifikacija */}
        <div className="hidden md:flex items-center space-x-8">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="text-[#f5e6ca] hover:text-white text-lg font-medium"
              >
                {user?.username}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-[#f5e6ca] px-4 py-2 rounded-md text-lg font-medium transition duration-300"
              >
                Odjava
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#f5e6ca] hover:text-white text-lg font-medium"
              >
                Prijava
              </Link>
              <Link
                to="/register"
                className="bg-[#f5e6ca] hover:bg-[#e0c5a2] text-[#6b4226] px-4 py-2 rounded-md text-lg font-medium transition duration-300"
              >
                Registracija
              </Link>
            </>
          )}
        </div>

        {/* Hamburger meni za mobilne uređaje */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-[#f5e6ca] focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobilna navigacija */}
      {isMenuOpen && (
        <nav className="md:hidden bg-[#6b4226] text-[#f5e6ca] absolute top-full left-0 w-full p-4 flex flex-col space-y-6">
          <Link
            to="/"
            className="text-[#f5e6ca] hover:text-white text-xl font-medium"
            onClick={toggleMenu}
          >
            Početna
          </Link>
          <Link
            to="/books"
            className="text-[#f5e6ca] hover:text-white text-xl font-medium"
            onClick={toggleMenu}
          >
            Knjige
          </Link>
          {isAuthenticated && (
            <Link
              to="/add-book"
              className="text-[#f5e6ca] hover:text-white text-xl font-medium"
              onClick={toggleMenu}
            >
              Dodaj knjigu
            </Link>
          )}
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="text-[#f5e6ca] hover:text-white text-xl font-medium"
                onClick={toggleMenu}
              >
                Moj profil
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="bg-red-600 hover:bg-red-700 text-[#f5e6ca] px-4 py-2 rounded-md w-full text-left text-xl font-medium"
              >
                Odjava
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#f5e6ca] hover:text-white text-xl font-medium"
                onClick={toggleMenu}
              >
                Prijava
              </Link>
              <Link
                to="/register"
                className="bg-[#f5e6ca] hover:bg-[#e0c5a2] text-[#6b4226] px-4 py-2 rounded-md text-xl font-medium w-full text-center"
                onClick={toggleMenu}
              >
                Registracija
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
