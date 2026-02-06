import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { foodApi } from "./services/api";
import FoodList from "./components/FoodList";
import FoodForm from "./components/FoodForm";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function MainApp({
  foods,
  loading,
  error,
  showForm,
  editingFood,
  handleAddNew,
  handleEdit,
  handleDelete,
  handleUpdate,
  handleCreate,
  handleCancel,
}) {
  return (
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
  );
}

// Wrapper to redirect unauthenticated users.
function RequireAuth({ authToken, children }) {
  const location = useLocation();
  if (!authToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

function App() {
  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("token"),
  );

  // Refresh food list only when authenticated
  useEffect(() => {
    if (authToken) {
      loadFoods();
    }
  }, [authToken]);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setFoods([]);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>🍔 Food Manager</h1>
          {authToken ? (
            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
              Log Out
            </button>
          ) : null}
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth authToken={authToken}>
                <MainApp
                  foods={foods}
                  loading={loading}
                  error={error}
                  showForm={showForm}
                  editingFood={editingFood}
                  handleAddNew={handleAddNew}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                  handleCreate={handleCreate}
                  handleCancel={handleCancel}
                />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={<Login setAuthToken={setAuthToken} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
