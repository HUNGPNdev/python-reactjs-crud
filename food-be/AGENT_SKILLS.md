# Food Backend - Agent Skills

## Overview

Backend service for Food CRUD application built with FastAPI, SQLAlchemy, and PostgreSQL.

## Tech Stack

- **Framework**: FastAPI 0.109.0
- **ORM**: SQLAlchemy 2.0.25
- **Database**: PostgreSQL
- **Validation**: Pydantic 2.5.3
- **Server**: Uvicorn 0.27.0

## Architecture

### Clean Structure

- **models/**: SQLAlchemy database models
- **schemas/**: Pydantic schemas for request/response validation
- **routers/**: API endpoint handlers
- **database.py**: Database connection and session management
- **config.py**: Application settings and configuration
- **main.py**: FastAPI application initialization

### Database Model (Food)

```python
- id: Integer (Primary Key)
- name: String(100) - Required
- description: Text - Optional
- category: String(50) - Optional
- price: Float - Required
- calories: Integer - Optional
```

### API Endpoints

#### Get All Foods

```
GET /api/foods
Response: List[FoodResponse]
```

#### Get Food by ID

```
GET /api/foods/{food_id}
Response: FoodResponse
Status: 200 OK | 404 Not Found
```

#### Create Food

```
POST /api/foods
Body: FoodCreate
Response: FoodResponse
Status: 201 Created
```

#### Update Food

```
PUT /api/foods/{food_id}
Body: FoodUpdate (all fields optional)
Response: FoodResponse
Status: 200 OK | 404 Not Found
```

#### Delete Food

```
DELETE /api/foods/{food_id}
Status: 204 No Content | 404 Not Found
```

## How to Run

### 1. Setup Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Database

Create `.env` file (or use existing):

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
```

### 4. Run Server

```bash
uvicorn main:app --reload
```

Server starts at: `http://localhost:8000`

### 5. Access API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Development

### Adding New Fields to Food Model

1. Update `models/food.py`:

```python
new_field = Column(String(50), nullable=True)
```

2. Update `schemas/food.py`:

```python
class FoodBase(BaseModel):
    # ... existing fields
    new_field: Optional[str] = None
```

3. Recreate database or use Alembic for migrations

### Adding New Endpoints

Create router in `routers/` and include in `main.py`:

```python
app.include_router(new_router, prefix="/api/resource", tags=["resource"])
```

## Database Operations

### Session Management

```python
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### Query Examples

```python
# Get all
db.query(Food).all()

# Get by ID
db.query(Food).filter(Food.id == id).first()

# Create
db.add(food_instance)
db.commit()
db.refresh(food_instance)

# Update
setattr(food_instance, field, value)
db.commit()

# Delete
db.delete(food_instance)
db.commit()
```

## Error Handling

### 404 Not Found

```python
if not food:
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Food with id {food_id} not found"
    )
```

### Validation Errors

Pydantic automatically validates request bodies and returns 422 Unprocessable Entity.

## CORS Configuration

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Dependencies

- **fastapi**: Web framework
- **uvicorn**: ASGI server with standard extras
- **sqlalchemy**: ORM for database operations
- **psycopg2-binary**: PostgreSQL adapter
- **pydantic**: Data validation
- **pydantic-settings**: Settings management
- **python-dotenv**: Environment variable loading

## Testing

### Manual Testing

Use Swagger UI at `/docs` to test all endpoints interactively.

### Testing with curl

```bash
# Get all foods
curl http://localhost:8000/api/foods

# Create food
curl -X POST http://localhost:8000/api/foods \
  -H "Content-Type: application/json" \
  -d '{"name":"Burger","price":9.99,"category":"Fast Food"}'

# Update food
curl -X PUT http://localhost:8000/api/foods/1 \
  -H "Content-Type: application/json" \
  -d '{"price":10.99}'

# Delete food
curl -X DELETE http://localhost:8000/api/foods/1
```

## Best Practices

1. **Always use dependency injection** for database sessions
2. **Use Pydantic schemas** for validation and serialization
3. **Handle errors explicitly** with appropriate HTTP status codes
4. **Keep routers focused** - one resource per router file
5. **Use type hints** throughout the codebase
6. **Environment variables** for configuration
7. **Auto-generated docs** via FastAPI

## Production Considerations

1. **Database Migrations**: Use Alembic for schema changes
2. **Environment Variables**: Use proper secrets management
3. **CORS**: Restrict origins to actual frontend domain
4. **Logging**: Add structured logging
5. **Testing**: Add pytest-based tests
6. **Docker**: Containerize the application
7. **Health Checks**: Add `/health` endpoint
8. **Rate Limiting**: Implement rate limiting middleware
