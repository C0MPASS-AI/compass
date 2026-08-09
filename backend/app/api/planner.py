import logging
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.trip import TripCreate
from app.core.exceptions import AppException
from app.core.responses import success_response
from app.crud.trip import create_trip
from app.crud.itinerary import create_itinerary_entries
from app.services.planner_service import generate_itinerary, PlannerServiceError

router = APIRouter(tags=["Planner"])
logger = logging.getLogger(__name__)


@router.post("/planner")
def plan_trip(request: TripCreate, db: Session = Depends(get_db)):
    logger.info(f"Planner request received for destination={request.destination}")

    # 1. Save trip details
    trip = create_trip(db, request)
    logger.debug(f"Trip saved with id={trip.id}")

    # 2. Generate itinerary (delegated to PlannerService)
    num_days = (request.end_date - request.start_date).days + 1
    try:
        days = generate_itinerary(
            destination=request.destination,
            num_days=num_days,
            budget=request.budget,
            interests=request.interests,
            travel_style=request.travel_style,
        )
    except PlannerServiceError as e:
        logger.error(f"Planner service failed for trip_id={trip.id}: {e.message}")
        raise AppException(message=e.message, status_code=502)

    # 3. Save itinerary
    itinerary_entries = create_itinerary_entries(db, trip.id, days)
    logger.debug(f"Saved {len(itinerary_entries)} itinerary entries for trip_id={trip.id}")

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