from app.agents.planner import planner


result = planner.invoke(
    {
        "request": "Plan my Paris trip",
        "response": ""
    }
)


print(result)