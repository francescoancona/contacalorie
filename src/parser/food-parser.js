import { searchFood, DEFAULT_PORTIONS } from '../db/foods.js';

const MEAL_KEYWORDS = {
  colazione: 'breakfast',
  pranzo: 'lunch',
  cena: 'dinner',
  spuntino: 'snack',
  merenda: 'snack',
  'prima colazione': 'breakfast',
};

const IT_NUMBERS = {
  'zero': 0, 'uno': 1, 'una': 1, 'due': 2, 'tre': 3, 'quattro': 4,
  'cinque': 5, 'sei': 6, 'sette': 7, 'otto': 8, 'nove': 9, 'dieci': 10,
  'undici': 11, 'dodici': 12, 'tredici': 13, 'quattordici': 14, 'quindici': 15,
  'sedici': 16, 'diciassette': 17, 'diciotto': 18, 'diciannove': 19,
  'venti': 20, 'trenta': 30, 'quaranta': 40, 'cinquanta': 50,
  'sessanta': 60, 'settanta': 70, 'ottanta': 80, 'novanta': 90,
  'cento': 100, 'centocinquanta': 150, 'duecento': 200,
  'duecentocinquanta': 250, 'trecento': 300, 'quattrocento': 400,
  'cinquecento': 500,
};

function resolveWordNumber(word) {
  return IT_NUMBERS[word.toLowerCase()] || null;
}

function replaceWordNumbers(text) {
  let result = text;
  // Sort by length descending to replace longer phrases first
  const sorted = Object.keys(IT_NUMBERS).sort((a, b) => b.length - a.length);
  for (const word of sorted) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    result = result.replace(regex, IT_NUMBERS[word].toString());
  }
  return result;
}

export function detectMealType(text) {
  const lower = text.toLowerCase();
  // Check longer phrases first
  const sorted = Object.keys(MEAL_KEYWORDS).sort((a, b) => b.length - a.length);
  for (const keyword of sorted) {
    if (lower.includes(keyword)) {
      return MEAL_KEYWORDS[keyword];
    }
  }
  return null;
}

function splitIntoSegments(text) {
  // Remove meal type keywords from text before parsing foods
  let clean = text.toLowerCase();
  for (const kw of Object.keys(MEAL_KEYWORDS)) {
    clean = clean.replace(new RegExp(`\\b${kw}\\b`, 'gi'), '');
  }
  // Remove leading connectors like "ho mangiato", "per", "a"
  clean = clean.replace(/\b(ho mangiato|ho bevuto|ho preso|per la|per il|per lo|a|con|durante)\b/gi, '');

  // Replace word numbers with digits
  clean = replaceWordNumbers(clean);

  // Split by common separators
  const segments = clean
    .split(/,|;\s*|\be\b|\bpoi\b|\banche\b|\boltre a\b/i)
    .map(s => s.trim())
    .filter(s => s.length > 1);

  return segments;
}

function parseSegment(segment) {
  const s = segment.trim();
  if (!s) return null;

  const gramPattern = /(?:grammi?|g\b|gr\b|ml\b)/i;

  // Pattern A: NUMBER grammi di FOOD  →  e.g. "80 grammi di pasta", "200g di latte"
  const patA = s.match(/^(\d+)\s*(?:grammi?|g\b|gr\b|ml\b)\s+di\s+(.+)/i);
  if (patA) {
    const grams = parseInt(patA[1], 10);
    const foodName = patA[2].trim();
    const found = searchFood(foodName);
    return buildItem(s, found, grams);
  }

  // Pattern B: FOOD NUMBER grammi  →  e.g. "pasta 80 grammi", "latte 200g"
  const patB = s.match(/^(.+?)\s+(\d+)\s*(?:grammi?|g\b|gr\b|ml\b)/i);
  if (patB) {
    const foodName = patB[1].trim();
    const grams = parseInt(patB[2], 10);
    const found = searchFood(foodName);
    return buildItem(s, found, grams);
  }

  // Pattern C: NUMBER di FOOD (without unit, assume grams)
  const patC = s.match(/^(\d+)\s+di\s+(.+)/i);
  if (patC) {
    const grams = parseInt(patC[1], 10);
    const foodName = patC[2].trim();
    const found = searchFood(foodName);
    return buildItem(s, found, grams);
  }

  // Pattern D: just food name (no grams), use DEFAULT_PORTIONS
  const found = searchFood(s);
  const defaultGrams = DEFAULT_PORTIONS[found ? found.name : s] || null;
  return buildItem(s, found, defaultGrams);
}

function buildItem(raw, foodResult, grams) {
  if (foodResult) {
    const calories = grams != null
      ? Math.round((foodResult.caloriesPer100g * grams) / 100)
      : 0;
    return {
      raw,
      food: foodResult.name,
      grams,
      caloriesPer100g: foodResult.caloriesPer100g,
      calories,
      found: true,
    };
  }
  return {
    raw,
    food: raw,
    grams,
    caloriesPer100g: null,
    calories: 0,
    found: false,
  };
}

export function parseFoods(text) {
  const segments = splitIntoSegments(text);
  const results = [];
  for (const seg of segments) {
    const item = parseSegment(seg);
    if (item) results.push(item);
  }
  return results;
}
