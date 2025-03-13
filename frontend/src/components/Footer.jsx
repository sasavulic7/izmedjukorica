import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-0">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo i opis */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-white">Između Korica</h2>
          <p className="text-sm mt-2 max-w-xs">
            Mesto gde ljubitelji knjiga dele recenzije, preporuke i priče o
            književnosti.
          </p>
        </div>

        {/* Linkovi */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link to="/about" className="hover:text-white">
            O nama
          </Link>
          <Link to="/contact" className="hover:text-white">
            Kontakt
          </Link>
          <Link to="/privacy" className="hover:text-white">
            Pravila privatnosti
          </Link>
        </div>

        {/* Društvene mreže */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-white">
            <Instagram size={20} />
          </a>
          <a href="#" className="hover:text-white">
            <Twitter size={20} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm border-t border-gray-700 mt-6 pt-4">
        &copy; {new Date().getFullYear()} Između Korica - Sva prava zadržana.
      </div>
    </footer>
  );
};

export default Footer;
