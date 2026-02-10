import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/foods";
const BASE_URL = "http://localhost:8000";

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

  // Register a new user
  registerUser: async (userData) => {
    // userData: { username, email, password }
    const response = await axios.post(
      `${BASE_URL}/api/auth/register`,
      userData,
    );
    return response.data;
  },

  // Login user
  loginUser: async ({ username, password }) => {
    // Uses OAuth2 form data
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    const response = await axios.post(`${BASE_URL}/api/auth/login`, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response.data;
  },
};
