import api from "./api-config";

// Funkcije za operacije sa knjigama
export const getAllBooks = async () => {
  try {
    const response = await api.get("/books");
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book ${id}:`, error);
    throw error;
  }
};

export const createBook = async (bookData) => {
  try {
    const response = await api.post("/books", bookData);
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting book ${id}:`, error);
    throw error;
  }
};

export const addReview = async (bookId, reviewData) => {
  try {
    const response = await api.post(`/books/${bookId}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error(`Error adding review to book ${bookId}:`, error);
    throw error;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting review ${reviewId}:`, error);
    throw error;
  }
};
