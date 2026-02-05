import React, { useState, useEffect } from "react";
import "./FoodForm.css";

function FoodForm({ food, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    calories: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (food) {
      setFormData({
        name: food.name || "",
        description: food.description || "",
        category: food.category || "",
        price: food.price || "",
        calories: food.calories || "",
      });
    }
  }, [food]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (formData.calories && formData.calories < 0) {
      newErrors.calories = "Calories cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);
      const submitData = {
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        category: formData.category.trim() || null,
        price: parseFloat(formData.price),
        calories: formData.calories ? parseInt(formData.calories) : null,
      };

      if (food) {
        await onSubmit(food.id, submitData);
      } else {
        await onSubmit(submitData);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="food-form-container">
      <h2>{food ? "Edit Food" : "Add New Food"}</h2>

      <form onSubmit={handleSubmit} className="food-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
            disabled={submitting}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Appetizer, Main Course, Dessert"
            disabled={submitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            disabled={submitting}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price ($) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={errors.price ? "error" : ""}
              disabled={submitting}
            />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="calories">Calories</label>
            <input
              type="number"
              id="calories"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              min="0"
              className={errors.calories ? "error" : ""}
              disabled={submitting}
            />
            {errors.calories && (
              <span className="error-text">{errors.calories}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-success"
            disabled={submitting}
          >
            {submitting ? "Saving..." : food ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FoodForm;
