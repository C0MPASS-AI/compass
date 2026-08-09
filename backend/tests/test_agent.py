from app.agents.planner import planner


def test_planner_generates_itinerary():
    result = planner.invoke(
        {
            "destination": "Kyoto",
            "days": 3,
            "budget": 800,
            "interests": ["Food", "History"],
            "travel_style": "Cultural",
            "transportation": "Public Transit",
            "pace": "Balanced",
            "itinerary": {},
        }
    )

    assert "itinerary" in result
    assert "days" in result["itinerary"]

    days = result["itinerary"]["days"]

    assert len(days) == 3

    for day in days:
        assert day["day"] >= 1
        assert len(day["activities"]) > 0

        for activity in day["activities"]:
            assert activity["time"]
            assert activity["title"]
            assert activity["category"]
            assert activity["duration"]
            assert activity["estimated_cost"] >= 0