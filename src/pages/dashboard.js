import { getMeals, getDayTotal, getTodayKey, removeMealItem } from '../storage/storage.js';
import { CONFIG } from '../config.js';

const MEAL_LABELS = {
  breakfast: { label: 'Colazione', icon: '🌅' },
  snack: { label: 'Spuntino', icon: '🍎' },
  lunch: { label: 'Pranzo', icon: '🍝' },
  dinner: { label: 'Cena', icon: '🌙' },
};

const MEAL_ORDER = ['breakfast', 'snack', 'lunch', 'dinner'];

function formatDate(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function renderDashboard(container, { onAddMeal, onDeleteItem }) {
  const dateKey = getTodayKey();
  const meals = getMeals(dateKey);
  const total = getDayTotal(dateKey);
  const goal = CONFIG.app.dailyGoalKcal;
  const pct = Math.min(100, Math.round((total / goal) * 100));
  const barColor = total > goal ? '#f57c00' : '#2e7d32';

  let html = `
    <div class="header">
      <div class="header-title">ContaCalorie</div>
      <div class="header-date">${formatDate(dateKey)}</div>
    </div>

    <div class="progress-card">
      <div class="progress-totals">
        <span class="progress-kcal">${total} kcal</span>
        <span class="progress-goal">/ ${goal} kcal</span>
      </div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill" style="width:${pct}%; background:${barColor};"></div>
      </div>
      <div class="progress-pct">${pct}% dell'obiettivo giornaliero</div>
    </div>
  `;

  for (const mealType of MEAL_ORDER) {
    const { label, icon } = MEAL_LABELS[mealType];
    const items = meals[mealType] || [];
    const mealTotal = items.reduce((s, i) => s + (i.calories || 0), 0);

    html += `
      <div class="meal-section">
        <div class="meal-header">
          <div class="meal-title">
            <span class="meal-icon">${icon}</span>
            <span class="meal-label">${label}</span>
          </div>
          <div class="meal-right">
            <span class="meal-kcal">${mealTotal} kcal</span>
            <button class="add-meal-btn" data-meal="${mealType}" aria-label="Aggiungi a ${label}">+</button>
          </div>
        </div>
    `;

    if (items.length === 0) {
      html += `<div class="meal-empty">Nessun alimento registrato</div>`;
    } else {
      html += `<ul class="food-list">`;
      items.forEach((item, idx) => {
        const gramsText = item.grams != null ? `${item.grams}g` : '—';
        html += `
          <li class="food-item">
            <div class="food-info">
              <span class="food-name">${item.food}</span>
              <span class="food-grams">${gramsText}</span>
            </div>
            <div class="food-right">
              <span class="food-kcal">${item.calories} kcal</span>
              <button class="delete-btn" data-date="${dateKey}" data-meal="${mealType}" data-idx="${idx}" aria-label="Elimina">🗑</button>
            </div>
          </li>
        `;
      });
      html += `</ul>`;
    }

    html += `</div>`;
  }

  container.innerHTML = html;

  // Wire add-meal buttons
  container.querySelectorAll('.add-meal-btn').forEach(btn => {
    btn.addEventListener('click', () => onAddMeal(btn.dataset.meal));
  });

  // Wire delete buttons
  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const { date, meal, idx } = btn.dataset;
      removeMealItem(date, meal, parseInt(idx, 10));
      onDeleteItem();
    });
  });
}
