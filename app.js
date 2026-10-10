/* ============ Data ============ */
const ELEMENTS = [
  { key: 'luna',  name: 'Luna',  glyph: '\u263E', color: '#9fb4d4' },
  { key: 'terra', name: 'Terra', glyph: '\u2295', color: '#7fb07a' },
  { key: 'sol',   name: 'Sol',   glyph: '\u2609', color: '#f0a040' },
  { key: 'astra', name: 'Astra', glyph: '\u2726', color: '#b48ce0' },
];

const LEVELS = [
  { key: 'low',    name: 'Low',    dots: 1 },
  { key: 'medium', name: 'Medium', dots: 2 },
  { key: 'high',   name: 'High',   dots: 3 },
];

const GEAR_NAMES = {
  'luna-low':    'Lunar Dim',
  'luna-medium': 'Lunar Glow',
  'luna-high':   'Lunar Bloom',
  'terra-low':   'Earth Shield',
  'terra-medium':'Earth Anchor',
  'terra-high':  'Earth Fury',
  'sol-low':     'Solar Dawn',
  'sol-medium':  'Solar Flare',
  'sol-high':    'Solar Impact',
  'astra-low':   'Star Drift',
  'astra-medium':'Star Warden',
  'astra-high':  'Star Nova',
};

/* ============ State ============ */
let current = { element: 'sol', level: 'medium' };

/* ============ DOM ============ */
const fab           = document.getElementById('fab');
const fabGlyph      = document.getElementById('fab-glyph');
const fabName       = document.getElementById('fab-name');
const fabDots       = document.getElementById('fab-dots');
const dialog        = document.getElementById('dialog');
const shifter       = document.getElementById('shifter');
const stick         = document.getElementById('stick');
const readoutGear   = document.getElementById('readout-gear');
const readoutName   = document.getElementById('readout-name');

/* ============ Build Shifter Grid ============ */
// Corner (empty cell for grid alignment)
const corner = document.createElement('div');
corner.className = 'corner';
shifter.appendChild(corner);

// X-axis labels (column headers) — elements
ELEMENTS.forEach(elem => {
  const label = document.createElement('div');
  label.className = 'axis-label';
  label.setAttribute('role', 'columnheader');
  label.textContent = elem.name.toUpperCase();
  shifter.appendChild(label);
});

// Y-axis labels + cells — levels as rows, elements as columns
LEVELS.forEach(level => {
  const yLabel = document.createElement('div');
  yLabel.className = 'axis-label y-label';
  yLabel.setAttribute('role', 'rowheader');
  yLabel.textContent = level.name.toUpperCase();
  shifter.appendChild(yLabel);

  ELEMENTS.forEach(elem => {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'cell';
    cell.dataset.element = elem.key;
    cell.dataset.level = level.key;
    cell.setAttribute('role', 'gridcell');
    cell.setAttribute('aria-label', GEAR_NAMES[`${elem.key}-${level.key}`]);
    cell.setAttribute('aria-selected', 'false');

    const glyph = document.createElement('div');
    glyph.className = 'glyph';
    glyph.textContent = elem.glyph;

    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = GEAR_NAMES[`${elem.key}-${level.key}`];

    const dots = document.createElement('div');
    dots.className = 'level-dots';
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('span');
      if (i < level.dots) dot.classList.add('on');
      dots.appendChild(dot);
    }

    cell.append(glyph, name, dots);
    shifter.appendChild(cell);
  });
});

/* ============ Selection ============ */
function select(element, level, fromDrag = false) {
  if (current.element === element && current.level === level) return;
  current = { element, level };
  updateCells();
  updateReadout();
  if (!fromDrag) updateStick();
}

function updateCells() {
  shifter.querySelectorAll('.cell').forEach(cell => {
    const isSel =
      cell.dataset.element === current.element &&
      cell.dataset.level === current.level;
    cell.classList.toggle('selected', isSel);
    cell.setAttribute('aria-selected', isSel);
  });
}

function updateReadout() {
  const key = `${current.element}-${current.level}`;
  const gearName = GEAR_NAMES[key];
  const elem  = ELEMENTS.find(e => e.key === current.element);
  const level = LEVELS.find(l  => l.key === current.level);
  readoutGear.textContent = `${elem.glyph}  ${gearName}`;
  readoutGear.style.color = elem.color;
  readoutName.textContent = `${elem.name} \u00B7 ${level.name}`;
  readoutGear.classList.remove('flash');
  void readoutGear.offsetHeight;
  readoutGear.classList.add('flash');
}

function updateStick() {
  const selCell = shifter.querySelector('.cell.selected');
  if (!selCell) return;
  const sRect = shifter.getBoundingClientRect();
  const cRect = selCell.getBoundingClientRect();
  stick.style.left = (cRect.left - sRect.left + cRect.width  / 2) + 'px';
  stick.style.top  = (cRect.top  - sRect.top  + cRect.height / 2) + 'px';
}

/* ============ FAB Button ============ */
function updateFab() {
  const key = `${current.element}-${current.level}`;
  const elem  = ELEMENTS.find(e => e.key === current.element);
  const level = LEVELS.find(l  => l.key === current.level);
  const gearName = GEAR_NAMES[key];

  fabGlyph.textContent = elem.glyph;
  fabGlyph.style.color = elem.color;
  fabName.textContent = gearName;

  fabDots.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i < level.dots ? ' on' : '');
    fabDots.appendChild(dot);
  }

  fab.style.borderColor = elem.color + '60';
}

/* ============ Dialog (click-to-open, focusout-to-close) ============ */
function openDialog() {
  dialog.classList.add('open');
  fab.setAttribute('aria-expanded', 'true');
  requestAnimationFrame(() => {
    shifter.querySelector('.cell.selected')?.focus();
  });
}

function closeDialog() {
  dialog.classList.remove('open');
  fab.setAttribute('aria-expanded', 'false');
  updateFab();
  fab.focus();
}

// Click FAB to open (Enter/Space on FAB also triggers click)
fab.addEventListener('click', openDialog);

// Focus leaves dialog → close
dialog.addEventListener('focusout', e => {
  if (!dialog.contains(e.relatedTarget)) {
    closeDialog();
  }
});

// Escape to close
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && dialog.classList.contains('open')) {
    closeDialog();
  }
});

/* ============ Click (grid cells) ============ */
shifter.addEventListener('click', e => {
  const cell = e.target.closest('.cell');
  if (!cell) return;
  select(cell.dataset.element, cell.dataset.level);
});

/* ============ Drag (pointer events) ============ */
let isDragging   = false;
let lastDragCell = null;

shifter.addEventListener('pointerdown', e => {
  const cell = e.target.closest('.cell');
  if (!cell) return;
  isDragging   = true;
  lastDragCell = cell;
  stick.classList.add('dragging');
  try { shifter.setPointerCapture(e.pointerId); } catch (_) {}
  select(cell.dataset.element, cell.dataset.level, true);
  moveStickToPointer(e);
});

shifter.addEventListener('pointermove', e => {
  if (!isDragging) return;
  const el   = document.elementFromPoint(e.clientX, e.clientY);
  const cell = el && el.closest('.cell');
  if (cell && cell !== lastDragCell) {
    lastDragCell = cell;
    select(cell.dataset.element, cell.dataset.level, true);
  }
  moveStickToPointer(e);
});

function endDrag() {
  if (!isDragging) return;
  isDragging   = false;
  lastDragCell = null;
  stick.classList.remove('dragging');
  updateStick();
}

document.addEventListener('pointerup', endDrag);
document.addEventListener('pointercancel', endDrag);

function moveStickToPointer(e) {
  const sRect = shifter.getBoundingClientRect();
  stick.style.left = (e.clientX - sRect.left) + 'px';
  stick.style.top  = (e.clientY - sRect.top)  + 'px';
}

/* ============ Keyboard (grid navigation, only when dialog open) ============ */
document.addEventListener('keydown', e => {
  if (!dialog.classList.contains('open')) return;

  const col = ELEMENTS.findIndex(el => el.key === current.element);
  const row = LEVELS.findIndex(l  => l.key  === current.level);

  let newCol = col, newRow = row;

  switch (e.key) {
    case 'ArrowLeft':  newCol = Math.max(0, col - 1);                        break;
    case 'ArrowRight': newCol = Math.min(ELEMENTS.length - 1, col + 1);      break;
    case 'ArrowUp':    newRow = Math.max(0, row - 1);                        break;
    case 'ArrowDown':  newRow = Math.min(LEVELS.length - 1, row + 1);        break;
    default: return;
  }

  if (newCol !== col || newRow !== row) {
    e.preventDefault();
    select(ELEMENTS[newCol].key, LEVELS[newRow].key);
  }
});

/* ============ Stars ============ */
const starsEl = document.getElementById('stars');
for (let i = 0; i < 100; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = Math.random() * 2 + 0.5;
  s.style.width  = size + 'px';
  s.style.height = size + 'px';
  s.style.left   = Math.random() * 100 + '%';
  s.style.top    = Math.random() * 100 + '%';
  s.style.animationDelay    = Math.random() * 4 + 's';
  s.style.animationDuration = (2 + Math.random() * 4) + 's';
  starsEl.appendChild(s);
}

/* ============ Resize ============ */
window.addEventListener('resize', () => {
  requestAnimationFrame(updateStick);
});

/* ============ Init ============ */
function init() {
  updateCells();
  updateReadout();
  updateFab();
  // Position stick without animation on first load
  stick.style.transition = 'none';
  updateStick();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      stick.style.transition = '';
    });
  });
}

init();
