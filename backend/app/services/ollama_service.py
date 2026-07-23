from ollama import chat


def generate_itinerary(prompt: str):
    response = chat(
        model="llama3.1",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a travel planner. "
                    "Create a day-by-day itinerary."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]
