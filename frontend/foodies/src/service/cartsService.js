import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/cart";

export const addToCart = async (foodId, token) => {
  try {
    await axios.post(
      API_URL,
      { foodId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    handleAuthError(error);
    console.error("Error while adding to cart", error);
  }
};

export const removeQtyFromCart = async (foodId, token) => {
  try {
    await axios.post(
      `${API_URL}/remove`,
      { foodId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    handleAuthError(error);
    console.error("Error while removing from cart", error);
  }
};

export const getCartData = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data?.items || {};
  } catch (error) {
    handleAuthError(error);
    console.error("Error while fetching cart data", error);
    return {};
  }
};

const handleAuthError = (error) => {
  if (error.response?.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
  }
};
