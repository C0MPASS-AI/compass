from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from app.core.middleware import RequestLoggingMiddleware

from app.api import test, auth, trips, planner
from app.core.logging_config import setup_logging
from app.core.exceptions import (
    AppException,
    app_exception_handler,
    validation_exception_handler,
    http_exception_handler,
    unhandled_exception_handler,
)

setup_logging()

app = FastAPI(
    title="TravelPilot AI Backend",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(AppException, app_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)

app.include_router(test.router)
app.include_router(auth.router)
app.include_router(trips.router)
app.include_router(planner.router)

app.add_middleware(RequestLoggingMiddleware)


@app.get("/")
def home():
    return {"message": "TravelPilot AI Backend is running!"}