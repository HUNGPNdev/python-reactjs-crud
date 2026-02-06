# Food Management Application

This monorepo contains a full-stack web application for managing food items with user authentication.

## Project Structure

- **food-be/**: Python FastAPI backend with PostgreSQL database
- **food-fe/**: React frontend with responsive UI

## Tech Stack

### Backend

- FastAPI (web framework)
- SQLAlchemy (ORM)
- PostgreSQL (database)
- Pydantic (validation)
- JWT authentication

### Frontend

- React 18 (UI framework)
- Axios (HTTP client)
- Custom CSS (styling)

## Features

- User registration and login
- JWT-based authentication
- CRUD operations for food items (name, description, category, price, calories)
- Responsive web interface
- RESTful API with automatic documentation

## Quick Setup

### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL database

### Backend Setup

1. Navigate to `food-be/`
2. Create virtual environment: `python -m venv venv`
3. Activate: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Linux/Mac)
4. Install dependencies: `pip install -r requirements.txt`
5. Configure database in `.env` file (see `food-be/AGENT_SKILLS.md`)
6. Run server: `uvicorn main:app --reload`

### Frontend Setup

1. Navigate to `food-fe/`
2. Install dependencies: `npm install`
3. Start development server: `npm start`

## Usage

- Backend API: `http://localhost:8000` (docs at `/docs`)
- Frontend: `http://localhost:3000`
- Register a new user or login
- Add, view, edit, and delete food items

## Development

For detailed development instructions, see:

- `food-be/AGENT_SKILLS.md` for backend specifics
- `food-fe/AGENT_SKILLS.md` for frontend specifics
