# Food CRUD Monorepo

A full-stack Food CRUD application built with FastAPI (Python) backend and React frontend.

## 📁 Project Structure

```
food/
├── food-be/          # Backend service (FastAPI + PostgreSQL)
└── food-fe/          # Frontend service (React)
```

## 🛠 Tech Stack

### Backend (food-be)

- **Python 3.9+**
- **FastAPI** - Modern web framework for building APIs
- **SQLAlchemy** - ORM for database operations
- **PostgreSQL** - Relational database
- **Pydantic** - Data validation and settings management
- **Uvicorn** - ASGI server

### Frontend (food-fe)

- **React 18** - UI library
- **React Hooks** - State management
- **Axios** - HTTP client
- **CSS3** - Styling

## 🚀 Getting Started

### Prerequisites

- Python 3.9 or higher
- Node.js 16 or higher
- PostgreSQL 12 or higher

### Database Setup

1. Ensure PostgreSQL is running on `localhost:5432`
2. Database credentials (default):
   - Username: `postgres`
   - Password: `postgres`
   - Database: `postgres`

The backend will automatically create the necessary tables on startup.

### Backend Setup

```bash
cd food-be

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn main:app --reload
```

The backend API will be available at: `http://localhost:8000`

- API Documentation (Swagger): `http://localhost:8000/docs`
- Alternative API Docs (ReDoc): `http://localhost:8000/redoc`

### Frontend Setup

```bash
cd food-fe

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will be available at: `http://localhost:3000`

## 📚 API Endpoints

### Food CRUD Operations

| Method | Endpoint          | Description               |
| ------ | ----------------- | ------------------------- |
| GET    | `/api/foods`      | Get all foods             |
| GET    | `/api/foods/{id}` | Get a specific food by ID |
| POST   | `/api/foods`      | Create a new food         |
| PUT    | `/api/foods/{id}` | Update an existing food   |
| DELETE | `/api/foods/{id}` | Delete a food             |

### Request/Response Examples

**Create Food (POST /api/foods)**

```json
{
  "name": "Margherita Pizza",
  "description": "Classic Italian pizza with tomato and mozzarella",
  "category": "Main Course",
  "price": 12.99,
  "calories": 800
}
```

**Response**

```json
{
  "id": 1,
  "name": "Margherita Pizza",
  "description": "Classic Italian pizza with tomato and mozzarella",
  "category": "Main Course",
  "price": 12.99,
  "calories": 800
}
```

## 🎯 Features

- ✅ Full CRUD operations for Food items
- ✅ RESTful API design
- ✅ Clean architecture with separation of concerns
- ✅ Input validation (Pydantic schemas)
- ✅ Responsive UI
- ✅ Real-time updates
- ✅ Error handling and user feedback
- ✅ CORS enabled for local development

## 📂 Backend Structure

```
food-be/
├── main.py              # FastAPI application entry point
├── config.py            # Application configuration
├── database.py          # Database connection and session
├── requirements.txt     # Python dependencies
├── models/
│   ├── __init__.py
│   └── food.py         # SQLAlchemy Food model
├── schemas/
│   ├── __init__.py
│   └── food.py         # Pydantic schemas for validation
└── routers/
    ├── __init__.py
    └── food.py         # Food API endpoints
```

## 📂 Frontend Structure

```
food-fe/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── FoodList.js      # Display list of foods
│   │   ├── FoodList.css
│   │   ├── FoodForm.js      # Create/Edit food form
│   │   └── FoodForm.css
│   ├── services/
│   │   └── api.js           # API service layer
│   ├── App.js               # Main application component
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## 🔧 Configuration

### Backend Configuration

Edit `food-be/.env` to customize database connection:

```env
DATABASE_URL=postgresql://username:password@host:port/database
```

### Frontend Configuration

Edit `food-fe/src/services/api.js` to change the API URL:

```javascript
const API_BASE_URL = "http://localhost:8000/api/foods";
```

## 🧪 Development Tips

### Testing the Backend

```bash
# Access interactive API documentation
# Open browser: http://localhost:8000/docs

# Test endpoints directly from Swagger UI
```

### Backend Hot Reload

The `--reload` flag in uvicorn enables automatic reload on code changes:

```bash
uvicorn main:app --reload
```

### Frontend Hot Reload

React development server automatically reloads on code changes.

## 🐛 Troubleshooting

### Backend won't start

- Verify PostgreSQL is running and accessible
- Check database credentials in `.env`
- Ensure virtual environment is activated
- Verify all dependencies are installed

### Frontend can't connect to backend

- Verify backend is running on port 8000
- Check CORS settings in `food-be/main.py`
- Verify API_BASE_URL in `food-fe/src/services/api.js`

### Database connection errors

- Confirm PostgreSQL service is running
- Verify database credentials
- Check if database `postgres` exists

## 📝 License

This is a pet project for learning purposes.

## 👤 Author

Built as a demonstration of full-stack development with Python FastAPI and React.
