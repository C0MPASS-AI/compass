from ollama import chat
from app.schemas.itinerary import Itinerary


def generate_itinerary(prompt: str) -> Itinerary:
    response = chat(
        model="llama3.1",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert travel planner. "
                    "Create a detailed day-by-day travel itinerary. "
                    "Return ONLY valid JSON. "
                    "Do not include markdown, explanations, or code fences."
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        format=Itinerary.model_json_schema(),
    )

    return Itinerary.model_validate_json(
        response["message"]["content"]
    )