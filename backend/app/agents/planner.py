from app.agents.prompts import PLANNER_PROMPT
from typing import TypedDict

from langgraph.graph import StateGraph, START, END

from app.services.ollama_service import generate_itinerary


class AgentState(TypedDict):
    destination: str
    days: int
    budget: float
    interests: list[str]
    travel_style: str
    transportation: str
    pace: str
    itinerary: dict


def planner_agent(state: AgentState):
    prompt = PLANNER_PROMPT.format(
    destination=state["destination"],
    days=state["days"],
    budget=state["budget"],
    interests=", ".join(state["interests"]),
    travel_style=state["travel_style"],
    transportation=state["transportation"],
    pace=state["pace"],
)
    

    itinerary = generate_itinerary(prompt)

    return {
        "itinerary": itinerary.model_dump()
    }


graph = StateGraph(AgentState)

graph.add_node("planner", planner_agent)

graph.add_edge(START, "planner")
graph.add_edge("planner", END)

planner = graph.compile()