print("Starting test...")

from app.services.ollama_service import generate_itinerary
print("Imported service.")

print("Sending request to Ollama...")

result = generate_itinerary(
    "Plan a 3-day trip to Paris with a budget of $1000."
)

print("Received response:")
print(result)