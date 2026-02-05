# Food Frontend - Agent Skills

## Overview

React-based frontend application for managing Food CRUD operations with a clean, responsive UI.

## Tech Stack

- **React**: 18.2.0
- **React Hooks**: useState, useEffect
- **Axios**: 1.6.5 for HTTP requests
- **CSS3**: Custom styling

## Architecture

### Component Structure

```
src/
├── App.js              # Main application container
├── App.css             # Global styles and button styles
├── components/
│   ├── FoodList.js     # Display grid of food cards
│   ├── FoodList.css
│   ├── FoodForm.js     # Create/edit form
│   └── FoodForm.css
├── services/
│   └── api.js          # API service layer
├── index.js            # React entry point
└── index.css           # Global CSS reset
```

### State Management

#### App.js State

```javascript
- foods: []               // List of all food items
- editingFood: null       // Food being edited
- showForm: false         // Toggle between list and form
- loading: false          // Loading state
- error: null             // Error messages
```

## Components

### App Component

**Purpose**: Main application container and state manager

**Key Functions**:

- `loadFoods()` - Fetch all foods from API
- `handleCreate(foodData)` - Create new food
- `handleUpdate(id, foodData)` - Update existing food
- `handleDelete(id)` - Delete food with confirmation
- `handleEdit(food)` - Switch to edit mode
- `handleAddNew()` - Switch to create mode
- `handleCancel()` - Return to list view

**Features**:

- Global error handling
- Loading states
- Confirmation dialogs for delete
- Automatic data refresh after operations

### FoodList Component

**Props**:

```javascript
{
  foods: Array,
  loading: Boolean,
  onEdit: Function,
  onDelete: Function
}
```

**Features**:

- Grid layout (responsive)
- Food cards with:
  - Name and price
  - Category badge
  - Description
  - Calorie count
  - Edit/Delete buttons
- Empty state handling
- Loading indicator

### FoodForm Component

**Props**:

```javascript
{
  food: Object | null,    // null for create, object for edit
  onSubmit: Function,
  onCancel: Function
}
```

**Form Fields**:

- `name` - Text (required)
- `category` - Text (optional)
- `description` - Textarea (optional)
- `price` - Number (required, > 0)
- `calories` - Number (optional, >= 0)

**Features**:

- Client-side validation
- Error messages per field
- Disabled state during submission
- Pre-populated for editing
- Cancel functionality

## API Service Layer

### api.js Functions

```javascript
// Get all foods
getAllFoods() -> Promise<Array>

// Get single food
getFood(id) -> Promise<Object>

// Create food
createFood(foodData) -> Promise<Object>

// Update food
updateFood(id, foodData) -> Promise<Object>

// Delete food
deleteFood(id) -> Promise<void>
```

### Configuration

```javascript
const API_BASE_URL = "http://localhost:8000/api/foods";
```

## How to Run

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm start
```

Application opens at: `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

## Styling

### Design System

**Colors**:

- Primary: `#007bff` (Blue)
- Success: `#28a745` (Green)
- Warning: `#ffc107` (Yellow)
- Danger: `#dc3545` (Red)
- Secondary: `#6c757d` (Gray)

**Button Classes**:

- `.btn` - Base button styles
- `.btn-primary` - Primary actions
- `.btn-success` - Create/Update
- `.btn-danger` - Delete
- `.btn-edit` - Edit action
- `.btn-secondary` - Cancel
- `.btn-sm` - Smaller buttons

**Layout**:

- Max width: 1200px (centered)
- Grid: Auto-fill, min 300px columns
- Responsive: Adapts to screen size

### Responsive Design

- Desktop: Multi-column grid
- Tablet: 2-column grid
- Mobile: Single column, stacked form fields

## User Interactions

### View Foods

1. App loads → `loadFoods()` called
2. Display food grid or empty state
3. Each card shows food details + actions

### Create Food

1. Click "Add New Food"
2. Form appears with empty fields
3. Fill required fields (name, price)
4. Submit → API call → Reload list
5. Return to list view

### Edit Food

1. Click "Edit" on food card
2. Form appears pre-filled with food data
3. Modify fields
4. Submit → API call → Reload list
5. Return to list view

### Delete Food

1. Click "Delete" on food card
2. Confirmation dialog appears
3. Confirm → API call → Reload list
4. Food removed from view

## Error Handling

### Display Errors

```javascript
{
  error && <div className="error-message">{error}</div>;
}
```

### Common Errors

- **Backend not running**: "Failed to load foods. Make sure the backend is running."
- **Create failed**: "Failed to create food."
- **Update failed**: "Failed to update food."
- **Delete failed**: "Failed to delete food."

### Form Validation Errors

- Name required
- Price must be > 0
- Calories cannot be negative

## Development

### Adding New Fields

1. **Update API service** (`api.js`) - usually no change needed
2. **Update FoodForm state**:

```javascript
const [formData, setFormData] = useState({
  // ... existing fields
  newField: "",
});
```

3. **Add form field**:

```jsx
<div className="form-group">
  <label htmlFor="newField">New Field</label>
  <input
    type="text"
    id="newField"
    name="newField"
    value={formData.newField}
    onChange={handleChange}
  />
</div>
```

4. **Update FoodList display**:

```jsx
{
  food.newField && <div className="food-new-field">{food.newField}</div>;
}
```

### Adding Validation

In `FoodForm.js` `validate()` function:

```javascript
if (!formData.newField.trim()) {
  newErrors.newField = "New field is required";
}
```

## Best Practices

1. **Always handle loading states** - Show user feedback
2. **Validate before submission** - Prevent invalid API calls
3. **Confirm destructive actions** - Use `window.confirm()` for deletes
4. **Clear errors on input** - Remove error when user starts typing
5. **Use controlled components** - React-managed form state
6. **Separate concerns** - Components, services, styles
7. **Error boundaries** - Graceful error handling
8. **Accessibility** - Use semantic HTML, labels, and ARIA

## Testing

### Manual Testing Checklist

- [ ] Load application - foods display
- [ ] Create new food - appears in list
- [ ] Edit food - changes saved
- [ ] Delete food - removed from list
- [ ] Form validation - errors show
- [ ] Cancel operations - no changes made
- [ ] Backend offline - error message displays
- [ ] Responsive design - works on mobile

## Production Considerations

1. **Environment Variables**: Use `.env` for API URLs
2. **Error Boundaries**: Wrap app in error boundary
3. **Loading Skeletons**: Better loading UX
4. **Debouncing**: For search/filter features
5. **Pagination**: For large datasets
6. **Confirmation Modals**: Replace `window.confirm()`
7. **Toast Notifications**: Better user feedback
8. **Form Libraries**: Consider Formik/React Hook Form
9. **State Management**: Consider Context API or Redux for complex state
10. **Build Optimization**: Code splitting, lazy loading

## Common Issues

### CORS Errors

- Ensure backend allows origin `http://localhost:3000`
- Check `food-be/main.py` CORS configuration

### API Connection Failed

- Verify backend is running on port 8000
- Check `API_BASE_URL` in `services/api.js`

### Form Not Submitting

- Check browser console for validation errors
- Verify required fields are filled
- Check network tab for API errors

### Styles Not Applying

- Clear browser cache
- Check CSS file imports
- Inspect elements for class names
