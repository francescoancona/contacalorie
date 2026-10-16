import { getAllDates, getDayTotal } from '../storage/storage.js';
import { CONFIG } from '../config.js';

const DAY_LABELS_IT = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const key = `${y}-${m}-${day}`;
    const label = DAY_LABELS_IT[d.getDay()];
    days.push({ key, label, dayNum: d.getDate() });
  }
  return days;
}

function drawChart(canvas, days, goal) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  const cssW = canvas.clientWidth;
  const cssH = canvas.clientHeight;
  canvas.width = cssW * dpr;
  canvas.height = cssH * dpr;
  ctx.scale(dpr, dpr);

  const W = cssW;
  const H = cssH;
  const padLeft = 50;
  const padRight = 12;
  const padTop = 32;
  const padBottom = 50;
  const chartW = W - padLeft - padRight;
  const chartH = H - padTop - padBottom;

  const maxVal = Math.max(goal * 1.25, ...days.map(d => d.total), 100);

  function toY(val) {
    return padTop + chartH - (val / maxVal) * chartH;
  }

  ctx.clearRect(0, 0, W, H);

  // Background grid lines
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;
  const gridLines = [0, 500, 1000, 1500, 2000, 2500].filter(v => v <= maxVal * 1.05);
  gridLines.forEach(v => {
    const y = toY(v);
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(W - padRight, y);
    ctx.stroke();
    // Y label
    ctx.fillStyle = '#999';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'right';
    ctx.fillText(v === 0 ? '0' : `${v}`, padLeft - 4, y + 4);
  });

  // Goal line (dashed)
  const goalY = toY(goal);
  ctx.strokeStyle = '#f57c00';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(padLeft, goalY);
  ctx.lineTo(W - padRight, goalY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#f57c00';
  ctx.font = 'bold 10px system-ui';
  ctx.textAlign = 'left';
  ctx.fillText(`Obiettivo ${goal}`, padLeft + 4, goalY - 4);

  // Bars
  const barCount = days.length;
  const groupW = chartW / barCount;
  const barW = Math.min(groupW * 0.55, 36);

  days.forEach((day, i) => {
    const x = padLeft + i * groupW + groupW / 2;
    const barH = (day.total / maxVal) * chartH;
    const barY = padTop + chartH - barH;
    const color = day.total > goal ? '#f57c00' : '#2e7d32';

    // Bar
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect
      ? ctx.roundRect(x - barW / 2, barY, barW, barH, [4, 4, 0, 0])
      : ctx.rect(x - barW / 2, barY, barW, barH);
    ctx.fill();

    // Value label on top
    if (day.total > 0) {
      ctx.fillStyle = color;
      ctx.font = 'bold 10px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(day.total, x, barY - 4);
    }

    // X axis label (day name + day number)
    ctx.fillStyle = '#444';
    ctx.font = '11px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(day.label, x, padTop + chartH + 18);
    ctx.fillStyle = '#999';
    ctx.font = '10px system-ui';
    ctx.fillText(day.dayNum, x, padTop + chartH + 32);
  });
}

export function renderTrends(container) {
  const days = getLast7Days().map(d => ({
    ...d,
    total: getDayTotal(d.key),
  }));

  const goal = CONFIG.app.dailyGoalKcal;
  const weekTotal = days.reduce((s, d) => s + d.total, 0);
  const avg = Math.round(weekTotal / 7);

  container.innerHTML = `
    <div class="header">
      <div class="header-title">Trend calorie</div>
      <div class="header-date">Ultimi 7 giorni</div>
    </div>
    <div class="trends-stats">
      <div class="stat-card">
        <div class="stat-value">${weekTotal}</div>
        <div class="stat-label">kcal settimana</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${avg}</div>
        <div class="stat-label">kcal media/giorno</div>
      </div>
    </div>
    <div class="chart-card">
      <canvas id="trend-canvas" style="width:100%;height:240px;display:block;"></canvas>
    </div>
    <div class="legend">
      <span class="legend-item"><span class="legend-dot" style="background:#2e7d32;"></span>Sotto obiettivo</span>
      <span class="legend-item"><span class="legend-dot" style="background:#f57c00;"></span>Sopra obiettivo</span>
    </div>
  `;

  const canvas = container.querySelector('#trend-canvas');

  function redraw() {
    drawChart(canvas, days, goal);
  }

  // Draw after layout
  requestAnimationFrame(redraw);

  // Responsive redraw
  const ro = new ResizeObserver(redraw);
  ro.observe(canvas);
}
