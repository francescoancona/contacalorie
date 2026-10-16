const KEY = 'contacalorie_meals';

export function getTodayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function loadAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

function saveAll(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function emptyDay() {
  return { breakfast: [], lunch: [], dinner: [], snack: [] };
}

export function getMeals(dateKey) {
  const all = loadAll();
  return all[dateKey] || emptyDay();
}

export function addMeal(dateKey, mealType, items) {
  const all = loadAll();
  if (!all[dateKey]) all[dateKey] = emptyDay();
  if (!all[dateKey][mealType]) all[dateKey][mealType] = [];

  const toAdd = items.map(item => ({
    food: item.food,
    grams: item.grams,
    calories: item.calories,
    addedAt: new Date().toISOString(),
  }));

  all[dateKey][mealType].push(...toAdd);
  saveAll(all);
}

export function removeMealItem(dateKey, mealType, index) {
  const all = loadAll();
  if (!all[dateKey] || !all[dateKey][mealType]) return;
  all[dateKey][mealType].splice(index, 1);
  saveAll(all);
}

export function getAllDates() {
  const all = loadAll();
  const keys = Object.keys(all)
    .filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k))
    .sort((a, b) => b.localeCompare(a))
    .slice(0, 30);
  return keys;
}

export function getDayTotal(dateKey) {
  const meals = getMeals(dateKey);
  let total = 0;
  for (const items of Object.values(meals)) {
    for (const item of items) {
      total += item.calories || 0;
    }
  }
  return total;
}
