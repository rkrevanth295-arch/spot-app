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

export const LEVELS = [
  { name: 'Explorer', emoji: '🌱', min: 0, max: 500 },
  { name: 'Scout', emoji: '🧭', min: 500, max: 2000 },
  { name: 'Local Legend', emoji: '⭐', min: 2000, max: 5000 },
  { name: 'City Master', emoji: '👑', min: 5000, max: 12000 },
  { name: 'Globe Trotter', emoji: '🌍', min: 12000, max: Infinity },
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
