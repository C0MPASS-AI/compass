from datetime import date
from pydantic import BaseModel, field_validator, model_validator


class TripCreate(BaseModel):
    destination: str
    start_date: date
    end_date: date
    budget: int
    interests: list[str]
    travel_style: str

    @field_validator("destination")
    @classmethod
    def destination_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError("Destination cannot be empty")
        return v.strip()

    @field_validator("budget")
    @classmethod
    def budget_positive(cls, v):
        if v <= 0:
            raise ValueError("Budget must be greater than 0")
        return v

    @field_validator("interests")
    @classmethod
    def interests_not_empty(cls, v):
        if not v or len(v) == 0:
            raise ValueError("At least one interest must be provided")
        return v

    @model_validator(mode="after")
    def check_dates(self):
        if self.start_date >= self.end_date:
            raise ValueError("start_date must be before end_date")
        return self
    @field_validator("interests")
    @classmethod
    def sanitize_interests(cls, v):
        cleaned = [item.strip() for item in v if item and item.strip()]
        if not cleaned:
            raise ValueError("At least one interest must be provided")
        return cleaned

    @field_validator("travel_style")
    @classmethod
    def sanitize_travel_style(cls, v):
        if not v or not v.strip():
            raise ValueError("Travel style cannot be empty")
        return v.strip()


class TripResponse(BaseModel):
    id: int
    destination: str
    start_date: date
    end_date: date
    budget: int

    class Config:
        from_attributes = True


class ItineraryDayResponse(BaseModel):
    id: int
    trip_id: int
    day_number: int
    activities: list
    estimated_cost: float | None = None

    class Config:
        from_attributes = True


class PlannerResponse(BaseModel):
    trip: TripResponse
    itinerary: list[ItineraryDayResponse]