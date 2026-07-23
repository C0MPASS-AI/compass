from app.database.database import engine
from app.database.database import Base

from app.models.user import User
from app.models.trip import Trip
from app.models.itinerary import Itinerary
from app.models.event import Event
from app.models.restaurant import Restaurant

print("Creating database tables...")

Base.metadata.create_all(bind=engine)

print("Tables created!")