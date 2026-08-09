from sqlalchemy.orm import Session
from app.models.itinerary import Itinerary


def create_itinerary_entries(db: Session, trip_id: int, days: list[dict]) -> list[Itinerary]:
    entries = []
    for day in days:
        entry = Itinerary(
            trip_id=trip_id,
            day_number=day["day_number"],
            activities=day["activities"],
            estimated_cost=day.get("estimated_cost"),
        )
        db.add(entry)
        entries.append(entry)
    db.commit()
    for entry in entries:
        db.refresh(entry)
    return entries


def get_itinerary_by_trip(db: Session, trip_id: int) -> list[Itinerary]:
    return (
        db.query(Itinerary)
        .filter(Itinerary.trip_id == trip_id)
        .order_by(Itinerary.day_number)
        .all()
    )