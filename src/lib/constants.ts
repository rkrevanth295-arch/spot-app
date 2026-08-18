// SPOT — Constants, Badges, Levels, Reactions

export const CATEGORIES = [
  { id: 'sunset_points', label: 'Sunset Points', icon: '🌅', color: '#FF6B4A' },
  { id: 'late_night_runs', label: 'Late Night Runs', icon: '🌙', color: '#8A8F98' },
  { id: 'cheap_thrills', label: 'Cheap Thrills', icon: '☕', color: '#F5A623' },
  { id: 'aesthetic_af', label: 'Aesthetic AF', icon: '📸', color: '#9B6BFF' },
  { id: 'green_escape', label: 'Green Escape', icon: '🌳', color: '#4AE0C4' },
  { id: 'old_city_secrets', label: 'Old City Secrets', icon: '🏛️', color: '#FF6B9B' },
  { id: 'creative_corners', label: 'Creative Corners', icon: '🎨', color: '#6C63FF' },
  { id: 'bike_points', label: 'Bike Points', icon: '🏍️', color: '#FF6B4A' },
  { id: 'chill_study', label: 'Chill & Study', icon: '🎧', color: '#4AE0C4' },
  { id: 'underrated_af', label: 'Underrated AF', icon: '🔥', color: '#F5A623' },
  { id: 'group_hangout', label: 'Group Hangout', icon: '🎉', color: '#9B6BFF' },
  { id: 'monsoon_special', label: 'Monsoon Special', icon: '🌧️', color: '#6C63FF' },
  { id: 'local_bazaar', label: 'Local Bazaar', icon: '🛍️', color: '#FF6B9B' },
  { id: 'street_food_trail', label: 'Street Food Trail', icon: '🍜', color: '#FF6B4A' },
  { id: 'waterside', label: 'Waterside', icon: '🌊', color: '#4AE0C4' },
  { id: 'adrenaline_zone', label: 'Adrenaline Zone', icon: '🎢', color: '#F5A623' },
  { id: 'late_night_eats', label: 'Late Night Eats', icon: '🕯️', color: '#FF6B9B' },
  { id: 'culture_fix', label: 'Culture Fix', icon: '🎭', color: '#9B6BFF' },
  { id: 'city_lights', label: 'City Lights View', icon: '🌃', color: '#8A8F98' },
  { id: 'pet_friendly', label: 'Pet-Friendly', icon: '🐾', color: '#4AE0C4' },
  { id: 'gaming_zones', label: 'Gaming Zones', icon: '🎮', color: '#6C63FF' },
  { id: 'weekend_getaway', label: 'Weekend Getaway', icon: '🏕️', color: '#FF6B4A' },
  { id: 'peace_out', label: 'Peace Out', icon: '🧘', color: '#4AE0C4' },
  { id: 'drink_chill', label: 'Drink & Chill', icon: '🍺', color: '#F5A623' },
  { id: 'movie_nights', label: 'Movie Nights', icon: '🎬', color: '#FF6B9B' },
  { id: 'skate_spots', label: 'Skate Spots', icon: '🛹', color: '#6C63FF' },
  { id: 'instagram_bloom', label: 'Instagram Bloom', icon: '🌸', color: '#FF6B4A' },
  { id: 'hidden_ruins', label: 'Hidden Ruins', icon: '🗿', color: '#9B6BFF' },
  { id: 'first_date', label: 'First Date Spots', icon: '💕', color: '#FF6B9B' },
];

export const REACTIONS = [
  { id: 'ooh', emoji: '👀', label: 'Ooh Ooh', desc: 'I need to go here NOW' },
  { id: 'laugh', emoji: '😂', label: 'Laugh', desc: 'Quirky / hilarious spot' },
  { id: 'doubt', emoji: '🤨', label: 'Doubt', desc: 'Is this actually good?' },
  { id: 'vibe', emoji: '🔥', label: 'Vibe', desc: 'The vibes are immaculate' },
  { id: 'cozy', emoji: '🥺', label: 'Cozy', desc: 'So wholesome & aesthetic' },
  { id: 'foodgasm', emoji: '🤤', label: 'Foodgasm', desc: 'The food looks unreal' },
  { id: 'gem', emoji: '💎', label: 'Hidden Gem', desc: 'Truly underrated find' },
  { id: 'been_here', emoji: '✅', label: 'Been Here', desc: 'Confirmed, Ive visited' },
];

export const LEVELS = [
  { name: 'Explorer', emoji: '🌱', min: 0, max: 500 },
  { name: 'Scout', emoji: '🧭', min: 500, max: 2000 },
  { name: 'Local Legend', emoji: '⭐', min: 2000, max: 5000 },
  { name: 'City Master', emoji: '👑', min: 5000, max: 12000 },
  { name: 'Globe Trotter', emoji: '🌍', min: 12000, max: Infinity },
];

export const POINT_VALUES = {
  add_spot: 50,
  spot_approved: 100,
  check_in: 30,
  share: 10,
  spot_saves_10: 200,
  spot_trending: 300,
  first_city_spot: 150,
  challenge_complete: 500,
};

export const BADGES = [
  { id: 'first_spot', emoji: '📍', name: 'First Spot', desc: 'Add your 1st spot' },
  { id: 'sunset_hunter', emoji: '🌅', name: 'Sunset Hunter', desc: 'Visit 5 viewpoints' },
  { id: 'foodie', emoji: '🍜', name: 'Foodie', desc: 'Visit 10 food spots' },
  { id: 'explorer', emoji: '🗺️', name: 'Explorer', desc: 'Visit 25 spots' },
  { id: 'cafe_crawler', emoji: '☕', name: 'Cafe Crawler', desc: 'Visit 8 cafes' },
  { id: 'night_owl', emoji: '🌃', name: 'Night Owl', desc: '5 late-night check-ins' },
  { id: 'jet_setter', emoji: '✈️', name: 'Jet Setter', desc: 'Check in in 3 cities' },
  { id: 'trendsetter', emoji: '🔥', name: 'Trendsetter', desc: 'Spot hits trending' },
];

export function getLevel(points: number) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].min) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getLevelProgress(points: number) {
  const level = getLevel(points);
  if (level.max === Infinity) return 100;
  const range = level.max - level.min;
  return Math.min(100, Math.round(((points - level.min) / range) * 100));
}

export function getCategoryById(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}