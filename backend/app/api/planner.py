import json
import logging
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.trip import TripCreate
from app.core.exceptions import AppException
from app.core.responses import success_response
from app.crud.trip import create_trip
from app.crud.itinerary import create_itinerary_entries
from app.agents.planner import planner

router = APIRouter(tags=["Planner"])
logger = logging.getLogger(__name__)


@router.post("/planner")
def plan_trip(request: TripCreate, db: Session = Depends(get_db)):
    logger.info(f"Planner request received for destination={request.destination}")

    # 1. Save trip details
    trip = create_trip(db, request)

    # 2. Generate itinerary via AI agent
    num_days = (request.end_date - request.start_date).days + 1
    prompt = f"""
    Plan a {num_days}-day trip to {request.destination}.
    Budget: ${request.budget}
    Interests: {", ".join(request.interests)}
    Travel style: {request.travel_style}

    Respond with ONLY valid JSON (no markdown, no commentary) in this exact shape:
    {{
      "days": [
        {{"day_number": 1, "activities": ["...", "..."], "estimated_cost": 120.0}}
      ]
    }}
    """

    result = planner.invoke({"request": prompt, "response": ""})
    raw_response = result.get("response", "")

    try:
        parsed = json.loads(raw_response)
        days = parsed["days"]
    except (json.JSONDecodeError, KeyError, TypeError) as e:
        logger.error(f"Failed to parse AI itinerary response: {e}")
        raise AppException(
            message="Failed to generate itinerary. Please try again.",
            status_code=502,
            errors=[str(e)],
        )

    # 3. Save itinerary
    itinerary_entries = create_itinerary_entries(db, trip.id, days)

    # 4. Return response
    return success_response(
        message="Trip planned successfully",
        data={
            "trip": {
                "id": trip.id,
                "destination": trip.destination,
                "start_date": str(trip.start_date),
                "end_date": str(trip.end_date),
                "budget": trip.budget,
            },
            "itinerary": [
                {
                    "id": e.id,
                    "day_number": e.day_number,
                    "activities": e.activities,
                    "estimated_cost": e.estimated_cost,
                }
                for e in itinerary_entries
            ],
        },
    )