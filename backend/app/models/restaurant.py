from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.database import Base


class Restaurant(Base):

    __tablename__ = "restaurants"

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

    cuisine = Column(
        String
    )

    location = Column(
        String
    )