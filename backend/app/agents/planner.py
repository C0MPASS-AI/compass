from typing import TypedDict
from langgraph.graph import StateGraph

from app.services.ollama_service import generate_itinerary


class AgentState(TypedDict):
    request: str
    response: str


def planner_agent(state: AgentState):

    itinerary = generate_itinerary(
        state["request"]
    )

    return {
        "response": itinerary
    }


graph = StateGraph(AgentState)


graph.add_node(
    "planner",
    planner_agent
)


graph.set_entry_point("planner")

graph.set_finish_point("planner")


planner = graph.compile()