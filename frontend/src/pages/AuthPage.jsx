import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import authImage from "../assets/images/auth-bg.jpg";

const AuthPage = () => {
  const location = useLocation();
  const isRegister = location.pathname === "/register";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [privacyError, setPrivacyError] = useState("");

  const { loginUser, registerUser, error, isAuthenticated } =
    useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister && !privacyChecked) {
      setPrivacyError("Morate pročitati i prihvatiti pravila privatnosti.");
      return;
    }

    setPrivacyError("");
    setIsSubmitting(true);
    try {
      let success;

      if (isRegister) {
        success = await registerUser(username, email, password);
        if (success) {
          const isLoggedIn = await loginUser(email, password);
          if (isLoggedIn) {
            navigate("/");
          }
        }
      } else {
        success = await loginUser(email, password);
        if (success) {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Greška pri autentifikaciji:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5e6ca] p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden flex">
        <div className="hidden md:block w-1/2">
          <img
            src={authImage}
            alt="Auth"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {isRegister ? "Registracija" : "Prijava"}
          </h1>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          {privacyError && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {privacyError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Korisničko ime:
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Lozinka:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {isRegister && (
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="privacyCheck"
                  checked={privacyChecked}
                  onChange={() => setPrivacyChecked(!privacyChecked)}
                  className="mr-2"
                />
                <label htmlFor="privacyCheck" className="text-gray-700">
                  Pročitao/la sam i prihvatam
                  <a
                    href="/privacy"
                    className="text-primary hover:underline ml-1"
                  >
                    pravila privatnosti
                  </a>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition disabled:opacity-50"
            >
              {isSubmitting
                ? "Procesiranje..."
                : isRegister
                ? "Registruj se"
                : "Prijavi se"}
            </button>
          </form>

          <div className="mt-4 text-center">
            {isRegister ? (
              <p>
                Već imate nalog?{" "}
                <a href="/login" className="text-primary hover:underline">
                  Prijavite se
                </a>
              </p>
            ) : (
              <p>
                Nemate nalog?{" "}
                <a href="/register" className="text-primary hover:underline">
                  Registrujte se
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
