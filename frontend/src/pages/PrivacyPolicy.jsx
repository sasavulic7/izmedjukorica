import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#f5e6ca] min-h-screen py-12 px-6 flex items-center justify-center">
      <div className="max-w-3xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-[#6b4226] mb-6 text-center">
          Pravila Privatnosti
        </h1>
        <p className="text-gray-700 mb-4">
          Vaša privatnost nam je važna. Ova pravila privatnosti objašnjavaju
          kako prikupljamo, koristimo i štitimo vaše podatke.
        </p>
        <h2 className="text-2xl font-semibold text-[#6b4226] mt-6 mb-3">
          Prikupljanje podataka
        </h2>
        <p className="text-gray-700 mb-4">
          Prikupljamo samo neophodne podatke kako bismo poboljšali vaše
          korisničko iskustvo, uključujući vaše ime, e-mail adresu i aktivnosti
          na sajtu.
        </p>
        <h2 className="text-2xl font-semibold text-[#6b4226] mt-6 mb-3">
          Upotreba podataka
        </h2>
        <p className="text-gray-700 mb-4">
          Vaši podaci se koriste isključivo za personalizaciju sadržaja,
          poboljšanje usluga i komunikaciju sa vama u vezi sa platformom.
        </p>
        <h2 className="text-2xl font-semibold text-[#6b4226] mt-6 mb-3">
          Sigurnost podataka
        </h2>
        <p className="text-gray-700 mb-4">
          Preduzimamo odgovarajuće mere kako bismo zaštitili vaše podatke od
          neovlašćenog pristupa i zloupotrebe.
        </p>
        <h2 className="text-2xl font-semibold text-[#6b4226] mt-6 mb-3">
          Prava korisnika
        </h2>
        <p className="text-gray-700 mb-4">
          U svakom trenutku možete tražiti uvid, ispravku ili brisanje vaših
          podataka.
        </p>
        <h2 className="text-2xl font-semibold text-[#6b4226] mt-6 mb-3">
          Važno!
        </h2>
        <p className="text-gray-700 mb-4">
          Pri registraciji ne morate koristiti Vašu pravu mail adresu, možete
          osmisliti novu namenjenu samo za ovaj blog. To može biti mač sa dve
          oštrice, ne ostavljate pravu adresu na kojoj su vam svi podaci, što
          znači da ste zaštićeni maksimalno, ali ukoliko zaboravite šifru svog
          naloga nemamo mogućnost da Vam je resetujemo.
        </p>
        <p className="text-gray-700 mt-6 text-sm text-center">
          Poslednje ažuriranje: {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
