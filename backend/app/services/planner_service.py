import logging

from app.agents.planner import planner


logger = logging.getLogger(__name__)


class PlannerServiceError(Exception):
    """Raised when itinerary generation fails."""

    def __init__(self, message: str):
        self.message = message
        super().__init__(message)


def generate_itinerary(
    destination: str,
    num_days: int,
    budget: int,
    interests: list[str],
    travel_style: str,
    transportation: str = "Public Transit",
    pace: str = "Balanced",
) -> list[dict]:

    try:
        result = planner.invoke(
            {
                "destination": destination,
                "days": num_days,
                "budget": budget,
                "interests": interests,
                "travel_style": travel_style,
                "transportation": transportation,
                "pace": pace,
                "itinerary": {},
            }
        )

        itinerary = result["itinerary"]
        generated_days = itinerary["days"]

    except Exception as e:
        logger.error(f"AI planner call failed: {e}")
        raise PlannerServiceError(
            "AI service failed to generate itinerary"
        ) from e

    days = []

    for day in generated_days:
        activities = day["activities"]

        estimated_cost = sum(
            activity.get("estimated_cost", 0)
            for activity in activities
        )

        days.append(
            {
                "day_number": day["day"],
                "activities": activities,
                "estimated_cost": estimated_cost,
            }
        )

    return days