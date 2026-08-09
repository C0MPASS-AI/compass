from sqlalchemy.orm import Session
from app.models.trip import Trip
from app.schemas.trip import TripCreate


def create_trip(db: Session, trip_data: TripCreate, user_id: int | None = None) -> Trip:
    trip = Trip(
        user_id=user_id,
        destination=trip_data.destination,
        start_date=trip_data.start_date,
        end_date=trip_data.end_date,
        budget=trip_data.budget,
    )
    db.add(trip)
    db.commit()
    db.refresh(trip)
    return trip


def get_trip(db: Session, trip_id: int) -> Trip | None:
    return db.query(Trip).filter(Trip.id == trip_id).first()