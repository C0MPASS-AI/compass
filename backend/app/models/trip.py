from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.database.database import Base


class Trip(Base):

    __tablename__ = "trips"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    destination = Column(
        String,
        nullable=False
    )

    start_date = Column(
        Date
    )

    end_date = Column(
        Date
    )

    budget = Column(
        Integer
    )