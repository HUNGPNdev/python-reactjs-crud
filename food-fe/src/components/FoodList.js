import React from "react";
import "./FoodList.css";

function FoodList({ foods, loading, onEdit, onDelete }) {
  if (loading) {
    return <div className="loading">Loading foods...</div>;
  }

  if (foods.length === 0) {
    return (
      <div className="empty-state">
        <p>No foods found. Add your first food!</p>
      </div>
    );
  }

  return (
    <div className="food-list">
      <h2>Food Items ({foods.length})</h2>
      <div className="food-grid">
        {foods.map((food) => (
          <div key={food.id} className="food-card">
            <div className="food-card-header">
              <h3>{food.name}</h3>
              <span className="food-price">${food.price.toFixed(2)}</span>
            </div>

            {food.category && (
              <div className="food-category">{food.category}</div>
            )}

            {food.description && (
              <p className="food-description">{food.description}</p>
            )}

            {food.calories && (
              <div className="food-calories">🔥 {food.calories} cal</div>
            )}

            <div className="food-card-actions">
              <button
                className="btn btn-edit btn-sm"
                onClick={() => onEdit(food)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(food.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodList;
