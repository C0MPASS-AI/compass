from fastapi import APIRouter
from pydantic import BaseModel

from app.agents.planner import planner


router = APIRouter(
    prefix="/trips",
    tags=["Trips"]
)


class TripRequest(BaseModel):
    destination: str
    days: int
    budget: int
    interests: list[str]
    travel_style: str


@router.post("/generate")
def generate_trip(request: TripRequest):

    prompt = f"""
    Plan a {request.days}-day trip to {request.destination}.

    Budget: ${request.budget}

    Interests:
    {", ".join(request.interests)}

    Travel style:
    {request.travel_style}

    Create a detailed day-by-day itinerary.
    """

    result = planner.invoke(
        {
            "request": prompt,
            "response": ""
        }
    )

    return result