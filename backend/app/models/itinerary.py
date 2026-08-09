from sqlalchemy import Column, Integer, ForeignKey, JSON, Float, DateTime
from sqlalchemy.sql import func
from app.database.database import Base


class Itinerary(Base):
    __tablename__ = "itineraries"

    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"))
    day_number = Column(Integer, nullable=False)
    activities = Column(JSON, nullable=False)
    estimated_cost = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())