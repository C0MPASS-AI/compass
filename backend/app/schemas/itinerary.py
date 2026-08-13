from pydantic import BaseModel, Field


class Activity(BaseModel):
    time: str = Field(min_length=1)
    title: str = Field(min_length=1)
    category: str = Field(min_length=1)
    estimated_cost: float = Field(ge=0)
    duration: str = Field(min_length=1)


class DayPlan(BaseModel):
    day: int = Field(ge=1)
    activities: list[Activity] = Field(min_length=1)


class Itinerary(BaseModel):
    days: list[DayPlan] = Field(min_length=1)