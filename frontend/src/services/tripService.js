import api from './api';

export async function planTrip(payload) {
  const response = await api.post('/planner', payload);
  return response.data; // { success, message, data: { trip, itinerary } }
}