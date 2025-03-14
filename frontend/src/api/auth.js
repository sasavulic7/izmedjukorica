import api from "./api-config";

// Funkcije za autentikaciju
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const getUserBooks = async () => {
  try {
    const response = await api.get("/user/books");
    return response.data;
  } catch (error) {
    console.error("Error fetching user books:", error);
    throw error;
  }
};

export const getUserReviews = async () => {
  try {
    const response = await api.get("/user/reviews");
    return response.data;
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    throw error;
  }
};

export const deleteAccount = async () => {
  try {
    const response = await api.delete("/user/account");
    return response.data;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
};
