import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/foods`;

export const addFood = async (foodData, image) => {
  const formData = new FormData();

  formData.append("food", JSON.stringify(foodData));
  formData.append("file", image);

  const response = await axios.post(API_URL, formData);

  return response.data;
};

export const getFoodList = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteFood = async (foodId) => {
  await axios.delete(`${API_URL}/${foodId}`);
};