import React, { useState } from "react";
import api from "../api/api-config";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await api.post("/contact", formData);
      if (response.data.success) {
        setStatus("Uspešno poslato!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Greška pri slanju, pokušajte ponovo.");
      }
    } catch (error) {
      setStatus("Greška pri slanju, pokušajte ponovo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f5e6ca] min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-[#6b4226] text-center mb-6">
          Kontaktirajte nas
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Vaše ime"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b4226]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Vaš email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b4226]"
            required
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Vaša poruka"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b4226]"
            required
          ></textarea>
          <button
            type="submit"
            className="cursor-pointer w-full bg-[#6b4226] text-white py-3 rounded-lg hover:bg-[#4e2f1f] transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Šalje se..." : "Pošalji"}
          </button>
          {status && (
            <p className="text-center text-[#6b4226] mt-4">{status}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
