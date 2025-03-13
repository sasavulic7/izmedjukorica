import API from "./index";

export const getAllBooks = async () => {
  const response = await API.get("/books");
  return response.data;
};

export const getBookById = async (id) => {
  const response = await API.get(`/books/${id}`);
  return response.data;
};

export const createBook = async (bookData) => {
  const token = localStorage.getItem("token");
  const response = await API.post("/books", bookData, {
    headers: {
      "x-auth-token": token
    }
  });
  return response.data;
};

export const deleteBook = async (bookId) => {
  const token = localStorage.getItem("token");
  const response = await API.delete(`/books/${bookId}`, {
    headers: {
      "x-auth-token": token
    }
  });
  return response.data;
};

export const addReview = async (bookId, reviewData) => {
  const token = localStorage.getItem("token");
  const response = await API.post(`/books/${bookId}/review`, reviewData, {
    headers: {
      "x-auth-token": token
    }
  });
  return response.data;
};

export const deleteReview = async (reviewId) => {
  const token = localStorage.getItem("token");
  const response = await API.delete(`/books/review/${reviewId}`, {
    headers: {
      "x-auth-token": token
    }
  });
  return response.data;
};
