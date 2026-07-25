export const STEPS = [
  {
    key: 'dietary',
    title: 'What are you dietary preferences?',
    type: 'multi',
    options: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy Free', 'Pescetarian'],
  },
  {
    key: 'travelingWith',
    title: 'Who are you traveling with?',
    type: 'single',
    options: ['Solo traveler', 'Partner / Spouse', 'Friends', 'Family (with kids)', 'Group / Retreat'],
  },
  {
    key: 'tripLength',
    title: 'What is your ideal trip length?',
    type: 'single',
    options: [
      'Quick weekend getaway (2–3 days)',
      'Standard vacation (4–7 days)',
      'Extended trip (1–2 weeks)',
      'Long-term travel (2+ weeks)',
    ],
  },
  {
    key: 'budgetStyle',
    title: 'What is your budget style (per person, per day)?',
    type: 'single',
    options: [
      'Budget: Backpacker-friendly, hostels, street food',
      'Moderate: Mid-range hotels, balanced dining & activities',
      'Luxury: High-end resorts, fine dining, private tours',
    ],
  },
  {
    key: 'environment',
    title: 'What kind of environment are you craving?',
    type: 'single',
    options: [
      'Tropical / Beach & Coast',
      'Mountain / Nature & Wilderness',
      'Bustling City & Urban',
      'Historical / Countryside',
      'Snow / Cold Climate',
    ],
  },
  {
    key: 'tripGoal',
    title: 'What is the main goal of this trip?',
    type: 'single',
    options: [
      'Relaxation & Unwinding',
      'Adventure & Outdoor Thrills',
      'Culture, History & Art',
      'Food & Culinary Exploration',
      'Shopping & Nightlife',
    ],
  },
  {
    key: 'pace',
    title: 'What pace do you prefer for your daily itinerary?',
    type: 'single',
    options: [
      'Action-Packed: Packed schedule, see as much as possible!',
      'Balanced: A couple of main activities with downtime to explore.',
      'Slow Travel: Completely flexible, relaxed, and spontaneous.',
    ],
  },
  {
    key: 'mustHaveActivities',
    title: 'Which activities are must-haves for you?',
    subtitle: 'Select all that apply',
    type: 'multi',
    options: [
      'Hiking / Outdoor Sports',
      'Museums & Historical Landmarks',
      'Spa & Wellness',
      'Local Food Tours / Cooking Classes',
      'Shopping / Local Markets',
      'Theme Parks & Attractions',
    ],
  },
  {
    key: 'mealPlanning',
    title: 'How do you like to plan your meals?',
    type: 'single',
    options: [
      'High-end fine dining & Michelin-starred spots',
      'Local hidden gems & street food',
      'A mix of both',
      'Quick & convenient options on the go',
    ],
  },
];