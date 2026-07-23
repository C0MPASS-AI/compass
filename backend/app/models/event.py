from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.database import Base


class Event(Base):

    __tablename__ = "events"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    trip_id = Column(
        Integer,
        ForeignKey("trips.id")
    )

    name = Column(
        String,
        nullable=False
    )

    location = Column(
        String
    )

    date = Column(
        String
    )