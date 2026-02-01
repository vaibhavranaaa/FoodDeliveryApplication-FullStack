import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/foods`;

export const fetchFoodList = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching food list", error);
    throw error;
  }
};

export const fetchFoodDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching food details", error);
    throw error;
  }
};
