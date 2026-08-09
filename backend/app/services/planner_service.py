import json
import logging
from app.agents.planner import planner  # TODO(teammate): replace with PlannerAgent/OpenAI call

logger = logging.getLogger(__name__)


class PlannerServiceError(Exception):
    """Raised when itinerary generation fails (AI call, parsing, etc)."""
    def __init__(self, message: str):
        self.message = message


def generate_itinerary(destination: str, num_days: int, budget: int,
                        interests: list[str], travel_style: str) -> list[dict]:
    """
    Contract: given trip params, return a list of day dicts:
        [{"day_number": 1, "activities": [...], "estimated_cost": 120.0}, ...]
    Raises PlannerServiceError on any failure (AI call failed, bad JSON, etc).

    Teammate: swap the body of this function for the real PlannerAgent/OpenAI
    call. Keep the same input args and return shape so app/api/planner.py
    doesn't need to change.
    """
    prompt = f"""
    Plan a {num_days}-day trip to {destination}.
    Budget: ${budget}
    Interests: {", ".join(interests)}
    Travel style: {travel_style}

    Respond with ONLY valid JSON (no markdown, no commentary) in this exact shape:
    {{
      "days": [
        {{"day_number": 1, "activities": ["...", "..."], "estimated_cost": 120.0}}
      ]
    }}
    """

    try:
        result = planner.invoke({"request": prompt, "response": ""})
        raw_response = result.get("response", "")
    except Exception as e:
        logger.error(f"AI planner call failed: {e}")
        raise PlannerServiceError("AI service failed to respond") from e

    try:
        parsed = json.loads(raw_response)
        return parsed["days"]
    except (json.JSONDecodeError, KeyError, TypeError) as e:
        logger.error(f"Failed to parse AI itinerary response: {e}")
        raise PlannerServiceError("AI returned an unexpected response format") from e