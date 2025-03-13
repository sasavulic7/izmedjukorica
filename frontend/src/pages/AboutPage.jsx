import React from "react";
import aboutImage from "../assets/images/aboutImage.jpg";

const AboutPage = () => {
  return (
    <div className="bg-[#f5e6ca] min-h-screen">
      {/* Hero sekcija */}
      <section className="relative h-[400px] flex items-center justify-center text-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${aboutImage})` }}
        ></div>
        <div className=" backgroundImage: `url(${aboutImage})`absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 px-6">
          <h1 className="text-5xl font-bold mb-4">O nama</h1>
          <p className="text-xl mb-6">
            Mesto gde ljubitelji knjiga dele recenzije, preporuke i priče o
            književnosti.
          </p>
        </div>
      </section>

      {/* Sadržaj */}
      <section className="py-12 container mx-auto px-4 text-[#6b4226]">
        <h2 className="text-3xl font-bold mb-6">Naša priča</h2>
        <p className="text-lg mb-6">
          KnjigoBlog je nastao iz ljubavi prema knjigama i želje da spojimo sve
          knjigoljupce na jednom mestu. Ovde možete otkriti nove knjige,
          pročitati recenzije i podeliti svoje mišljenje.
        </p>
        <h2 className="text-3xl font-bold mb-6">Naša misija</h2>
        <p className="text-lg mb-6">
          Verujemo da svaka knjiga nosi priču vrednu deljenja. Naš cilj je da
          inspirišemo i podstaknemo diskusiju o književnosti kroz zajednicu
          ljubitelja knjiga.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
