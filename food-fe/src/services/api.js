import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/foods";

export const foodApi = {
  // Get all foods
  getAllFoods: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  // Get a single food by ID
  getFood: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  // Create a new food
  createFood: async (foodData) => {
    const response = await axios.post(API_BASE_URL, foodData);
    return response.data;
  },

  // Update a food
  updateFood: async (id, foodData) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, foodData);
    return response.data;
  },

  // Delete a food
  deleteFood: async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  },
};
