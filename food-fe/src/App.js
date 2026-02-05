import React, { useState, useEffect } from "react";
import { foodApi } from "./services/api";
import FoodList from "./components/FoodList";
import FoodForm from "./components/FoodForm";
import "./App.css";

function App() {
  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load foods on mount
  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await foodApi.getAllFoods();
      setFoods(data);
    } catch (err) {
      setError("Failed to load foods. Make sure the backend is running.");
      console.error("Error loading foods:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (foodData) => {
    try {
      setError(null);
      await foodApi.createFood(foodData);
      await loadFoods();
      setShowForm(false);
    } catch (err) {
      setError("Failed to create food.");
      console.error("Error creating food:", err);
      throw err;
    }
  };

  const handleUpdate = async (id, foodData) => {
    try {
      setError(null);
      await foodApi.updateFood(id, foodData);
      await loadFoods();
      setEditingFood(null);
      setShowForm(false);
    } catch (err) {
      setError("Failed to update food.");
      console.error("Error updating food:", err);
      throw err;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food?")) {
      return;
    }
    try {
      setError(null);
      await foodApi.deleteFood(id);
      await loadFoods();
    } catch (err) {
      setError("Failed to delete food.");
      console.error("Error deleting food:", err);
    }
  };

  const handleEdit = (food) => {
    setEditingFood(food);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingFood(null);
    setShowForm(false);
  };

  const handleAddNew = () => {
    setEditingFood(null);
    setShowForm(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🍔 Food Manager</h1>
      </header>

      <main className="App-main">
        {error && <div className="error-message">{error}</div>}

        {!showForm ? (
          <>
            <div className="action-bar">
              <button className="btn btn-primary" onClick={handleAddNew}>
                + Add New Food
              </button>
            </div>

            <FoodList
              foods={foods}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        ) : (
          <FoodForm
            food={editingFood}
            onSubmit={editingFood ? handleUpdate : handleCreate}
            onCancel={handleCancel}
          />
        )}
      </main>
    </div>
  );
}

export default App;
