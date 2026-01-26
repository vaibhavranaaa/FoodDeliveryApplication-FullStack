import axios from "axios";

const API_URL = "http://localhost:8080/api/foods";

export const addFood = async (foodData, image) => {
  const formData = new FormData();
  formData.append("food", JSON.stringify(foodData));
  formData.append("file", image);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // FoodResponse
  } catch (error) {
    console.log("Error adding food", error);
    throw error;
  }
};

export const getFoodList = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // List<FoodResponse>
  } catch (error) {
    console.log("Error fetching food list", error);
    throw error;
  }
};

export const deleteFood = async (foodId) => {
  try {
    await axios.delete(`${API_URL}/${foodId}`);
    return true; // 204 No Content
  } catch (error) {
    console.log("Error while deleting the food", error);
    return false;
  }
};
