from fastapi import FastAPI

from app.api import test
from app.api import auth
from app.api import trips


app = FastAPI(
    title="TravelPilot AI Backend",
    version="1.0.0"
)


app.include_router(test.router)
app.include_router(auth.router)
app.include_router(trips.router)


@app.get("/")
def home():
    return {
        "message": "TravelPilot AI Backend is running!"
    }