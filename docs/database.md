# C0MPASS Database Design

## Overview

C0MPASS uses a database to store user information, travel preferences, generated itineraries, reservations, and AI memory.

The database allows AI agents to provide personalized recommendations.

---

# Database Technology

Primary Database:

- PostgreSQL

AI Memory Storage:

- Vector Database

---

# Database Entities

## 1. Users

Stores account information.

Fields:

| Field | Type | Description |
|---|---|---|
| user_id | UUID | Unique user identifier |
| name | String | User name |
| email | String | User email |
| password_hash | String | Encrypted password |
| created_at | DateTime | Account creation date |

---

# 2. User Preferences

Stores travel preferences.

Fields:

| Field | Type | Description |
|---|---|---|
| preference_id | UUID | Unique ID |
| user_id | UUID | Linked user |
| interests | Array | User interests |
| food_preferences | Array | Dietary preferences |
| travel_style | String | Adventure, luxury, budget |
| preferred_budget | Number | Spending limit |

Examples:

- Hiking
- Museums
- Vegetarian food
- Nightlife

---

# 3. Trips

Stores user travel plans.

Fields:

| Field | Type | Description |
|---|---|---|
| trip_id | UUID | Unique trip ID |
| user_id | UUID | Trip owner |
| destination | String | Location |
| start_date | Date | Trip start |
| end_date | Date | Trip end |
| budget | Number | Trip budget |

---

# 4. Itineraries

Stores generated schedules.

Fields:

| Field | Type |
|---|---|
| itinerary_id | UUID |
| trip_id | UUID |
| day | Integer |
| activity | String |
| location | String |
| time | Time |

Example:

Day 1:
- Visit museum
- Lunch
- Evening concert

---

# 5. Reservations

Stores bookings.

Fields:

| Field | Type |
|---|---|
| reservation_id | UUID |
| trip_id | UUID |
| type | String |
| booking_name | String |
| date | Date |
| confirmation_number | String |

Examples:

- Museum ticket
- Restaurant booking
- Event ticket

---

# 6. Expenses

Used by Budget Agent.

Fields:

| Field | Type |
|---|---|
| expense_id | UUID |
| trip_id | UUID |
| category | String |
| amount | Number |
| date | Date |

Categories:

- Food
- Hotel
- Transport
- Tickets

---

# 7. AI Memory

Stores information remembered by AI.

Fields:

| Field | Type |
|---|---|
| memory_id | UUID |
| user_id | UUID |
| information | Text |
| embedding | Vector |
| created_at | DateTime |

Examples:

"User prefers vegetarian restaurants"

"User likes historical locations"

---

# 8. Saved Recommendations

Stores AI suggestions.

Fields:

| Field | Type |
|---|---|
| recommendation_id | UUID |
| trip_id | UUID |
| agent_type | String |
| recommendation | Text |

Examples:

- Food Agent recommendation
- Event Agent recommendation
- Route Agent recommendation

---

# Agent Data Usage

| Agent | Uses Data |
|---|---|
| Planner Agent | Trips, Preferences |
| Food Agent | Preferences, Location |
| Events Agent | Dates, Interests |
| Budget Agent | Expenses, Budget |
| Weather Agent | Trip dates, Location |
| Reservation Agent | Trips, Bookings |
| Language Agent | Destination |
| Memory System | User history |

---

# Database Relationships

User
↓
Trips
↓
Itineraries
↓
Reservations
↓
Expenses


User
↓
Preferences
↓
AI Memory

---

# Future Database Improvements

- Real-time travel updates
- Collaborative trips
- Social recommendations
- More advanced AI memory
