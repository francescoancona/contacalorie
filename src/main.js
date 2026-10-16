import './style.css';
import { CONFIG } from './config.js';
import { SpeechRecognizer } from './voice/speech.js';
import { parseFoods, detectMealType } from './parser/food-parser.js';
import { addMeal, getTodayKey } from './storage/storage.js';
import { MockProvider } from './ai/mock-provider.js';
import { GeminiProvider } from './ai/gemini-provider.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderTrends } from './pages/trends.js';

// ── AI Provider factory ──────────────────────────────────────────────────────
function createAIProvider() {
  if (CONFIG.ai.provider === 'gemini' && CONFIG.ai.apiKey) {
    return new GeminiProvider(CONFIG.ai.apiKey, CONFIG.ai.model);
  }
  return new MockProvider();
}
const aiProvider = createAIProvider();

// ── Speech ───────────────────────────────────────────────────────────────────
const recognizer = new SpeechRecognizer(CONFIG.app.language);

// ── DOM refs ─────────────────────────────────────────────────────────────────
const dashboardContent = document.getElementById('dashboard-content');
const trendsContent = document.getElementById('trends-content');
const overlay = document.getElementById('overlay');
const bottomSheet = document.getElementById('bottom-sheet');
const sheetContent = document.getElementById('sheet-content');
const fabMic = document.getElementById('fab-mic');
const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

// ── Meal type auto-detect ─────────────────────────────────────────────────────
const MEAL_SCHEDULE = [
  { from: 5 * 60, to: 10 * 60 + 30, type: 'breakfast' },
  { from: 10 * 60 + 30, to: 12 * 60, type: 'snack' },
  { from: 12 * 60, to: 15 * 60, type: 'lunch' },
  { from: 15 * 60, to: 18 * 60 + 30, type: 'snack' },
  { from: 18 * 60 + 30, to: 23 * 60, type: 'dinner' },
];

function getMealByTime() {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  for (const s of MEAL_SCHEDULE) {
    if (mins >= s.from && mins < s.to) return s.type;
  }
  return 'snack';
}

const MEAL_META = {
  breakfast: { label: 'Colazione', icon: '🌅' },
  snack: { label: 'Spuntino', icon: '🍎' },
  lunch: { label: 'Pranzo', icon: '🍝' },
  dinner: { label: 'Cena', icon: '🌙' },
};

// ── Navigation ────────────────────────────────────────────────────────────────
function showPage(name) {
  pages.forEach(p => p.classList.toggle('active', p.id === `page-${name}`));
  navBtns.forEach(b => b.classList.toggle('active', b.dataset.page === name));
  if (name === 'trends') renderTrends(trendsContent);
}

navBtns.forEach(btn => {
  btn.addEventListener('click', () => showPage(btn.dataset.page));
});

// ── Bottom sheet ──────────────────────────────────────────────────────────────
function openSheet() {
  overlay.classList.remove('hidden');
  bottomSheet.classList.add('open');
}

function closeSheet() {
  overlay.classList.add('hidden');
  bottomSheet.classList.remove('open');
}

overlay.addEventListener('click', closeSheet);

// ── Sheet step 1: meal type selection ─────────────────────────────────────────
function showMealTypeStep(preselect) {
  const suggested = preselect || getMealByTime();
  sheetContent.innerHTML = `
    <div class="sheet-title">Che pasto è?</div>
    <div class="meal-type-grid">
      ${Object.entries(MEAL_META).map(([type, { label, icon }]) => `
        <button class="meal-type-btn ${type === suggested ? 'selected' : ''}" data-type="${type}">
          <span class="meal-type-icon">${icon}</span>
          <span class="meal-type-label">${label}</span>
        </button>
      `).join('')}
    </div>
    <button class="sheet-cancel" id="cancel-btn">Annulla</button>
  `;
  document.getElementById('cancel-btn').addEventListener('click', closeSheet);
  sheetContent.querySelectorAll('.meal-type-btn').forEach(btn => {
    btn.addEventListener('click', () => showListeningStep(btn.dataset.type));
  });
}

// ── Sheet step 2: listening ───────────────────────────────────────────────────
function showListeningStep(mealType) {
  const { label, icon } = MEAL_META[mealType];
  sheetContent.innerHTML = `
    <div class="sheet-title">${icon} ${label}</div>
    <div class="listening-state">
      <div class="mic-pulse">🎤</div>
      <div class="listening-text">Sto ascoltando…</div>
      <div class="listening-hint">Dì gli alimenti con i grammi<br><em>es. "pasta 80 grammi, insalata 100g"</em></div>
    </div>
    <button class="sheet-cancel" id="cancel-btn">Annulla</button>
  `;
  document.getElementById('cancel-btn').addEventListener('click', closeSheet);

  if (!recognizer.isSupported()) {
    sheetContent.querySelector('.listening-text').textContent = 'Microfono non supportato da questo browser';
    return;
  }

  recognizer.listen()
    .then(transcript => showResultsStep(mealType, transcript))
    .catch(err => showErrorStep(mealType, err.message));
}

// ── Sheet step 3: results ─────────────────────────────────────────────────────
async function showResultsStep(mealType, transcript) {
  sheetContent.innerHTML = `
    <div class="sheet-title">Ho capito…</div>
    <div class="transcript-box">"${transcript}"</div>
    <div class="parsing-spinner">⏳ Analisi in corso…</div>
  `;

  // Try AI first, fall back to local parser
  let items = null;
  try {
    const aiResult = await aiProvider.parseFoods(transcript);
    if (aiResult && aiResult.length > 0) {
      // AI returned raw {food, grams} — enrich with calories from local DB
      const { searchFood, DEFAULT_PORTIONS } = await import('./db/foods.js');
      items = aiResult.map(({ food, grams }) => {
        const found = searchFood(food);
        const g = grams != null ? grams : (DEFAULT_PORTIONS[found ? found.name : food] || null);
        const cal = found && g != null ? Math.round((found.caloriesPer100g * g) / 100) : 0;
        return {
          raw: `${food}${grams != null ? ` ${grams}g` : ''}`,
          food: found ? found.name : food,
          grams: g,
          caloriesPer100g: found ? found.caloriesPer100g : null,
          calories: cal,
          found: !!found,
        };
      });
    }
  } catch { /* fall through */ }

  if (!items) {
    items = parseFoods(transcript);
  }

  if (items.length === 0) {
    showErrorStep(mealType, 'Nessun alimento riconosciuto. Riprova.');
    return;
  }

  const sessionTotal = items.reduce((s, i) => s + i.calories, 0);
  const { label, icon } = MEAL_META[mealType];

  sheetContent.innerHTML = `
    <div class="sheet-title">${icon} ${label}</div>
    <ul class="results-list">
      ${items.map((item, i) => `
        <li class="result-item ${item.found ? 'item-found' : 'item-not-found'}">
          <span class="result-icon">${item.found ? '✅' : '⚠️'}</span>
          <div class="result-info">
            <span class="result-food">${item.food}</span>
            <span class="result-detail">
              ${item.grams != null ? `${item.grams}g` : 'porzione non specificata'}
              ${item.found ? `· ${item.caloriesPer100g} kcal/100g` : '· non trovato nel DB'}
            </span>
          </div>
          <span class="result-kcal">${item.found && item.grams != null ? `${item.calories} kcal` : '—'}</span>
        </li>
      `).join('')}
    </ul>
    <div class="session-total">Totale sessione: <strong>${sessionTotal} kcal</strong></div>
    <div class="sheet-actions">
      <button id="retry-btn" class="btn-secondary">🔄 Riprova</button>
      <button id="confirm-btn" class="btn-primary">✅ Conferma</button>
    </div>
  `;

  document.getElementById('retry-btn').addEventListener('click', () => showListeningStep(mealType));
  document.getElementById('confirm-btn').addEventListener('click', () => {
    const validItems = items.filter(i => i.found && i.grams != null);
    if (validItems.length > 0) {
      addMeal(getTodayKey(), mealType, validItems);
    }
    closeSheet();
    renderDashboardPage();
  });
}

function showErrorStep(mealType, message) {
  sheetContent.innerHTML = `
    <div class="sheet-title">Errore</div>
    <div class="error-msg">⚠️ ${message}</div>
    <div class="sheet-actions">
      <button id="retry-btn" class="btn-secondary">🔄 Riprova</button>
      <button id="cancel-btn2" class="btn-secondary">Annulla</button>
    </div>
  `;
  document.getElementById('retry-btn').addEventListener('click', () => showListeningStep(mealType));
  document.getElementById('cancel-btn2').addEventListener('click', closeSheet);
}

// ── FAB ───────────────────────────────────────────────────────────────────────
fabMic.addEventListener('click', () => {
  openSheet();
  showMealTypeStep(null);
});

// ── Dashboard render ──────────────────────────────────────────────────────────
function renderDashboardPage() {
  renderDashboard(dashboardContent, {
    onAddMeal: (mealType) => {
      openSheet();
      showListeningStep(mealType);
    },
    onDeleteItem: () => renderDashboardPage(),
  });
}

// ── Service Worker ────────────────────────────────────────────────────────────
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('/ContaCalorie/sw.js').catch(() => {});
}

// ── Init ──────────────────────────────────────────────────────────────────────
renderDashboardPage();
showPage('dashboard');
