# Gear Grid · 2D Cosmic Shifter

An **embeddable 2D gear selector** — a bottom-right FAB button opens a popover dialog with a 4×3 grid. Select both **intensity** (low/medium/high) and **model** (luna/terra/sol/astra) simultaneously.

## Live Demo

[Try it → hana-ame.github.io/gear-grid](https://hana-ame.github.io/gear-grid/)

## How It Works

1. A **pill-shaped button** sits in the bottom-right corner, showing the current gear (e.g. `☉ Solar Flare ●●●`)
2. **Click the button** → a dialog pops up with the 2D grid selector
3. **Select a gear** by click, drag, or keyboard
4. **Close** via ×, outside click, or `Esc` → the button updates

## Gear Table

|            | LUNA          | TERRA         | SOL          | ASTRA         |
|------------|---------------|---------------|--------------|---------------|
| **LOW**    | Lunar Dim     | Earth Shield  | Solar Dawn   | Star Drift    |
| **MEDIUM** | Lunar Glow    | Earth Anchor  | Solar Flare  | Star Warden   |
| **HIGH**   | Lunar Bloom   | Earth Fury    | Solar Impact | Star Nova     |

## Controls (inside dialog)

| Action          | Input                                             |
|-----------------|---------------------------------------------------|
| Select a gear   | Click any cell                                    |
| Drag-shift      | Click & drag across cells — stick follows pointer |
| Keyboard nav    | `←` `→` `↑` `↓` to move, auto-engages selection |
| Close dialog    | `Esc` / click outside / click ×                   |

## Features

- **FAB trigger** — compact pill button showing current gear with glyph, name, and level dots
- **Dialog popover** — centered modal with backdrop blur, spring-open animation
- **12 gear combinations** — 4 cosmic elements × 3 intensity levels
- **Cosmic theme** — each element has its own color and glyph (☾ ⊕ ☉ ✦)
- **Shifter stick** — glowing indicator that animates between cells
- **Drag interaction** — pointer follows during drag, snaps to cell on release
- **Keyboard navigation** — full arrow-key control, only active when dialog is open
- **Responsive** — works on mobile and desktop
- **Pure frontend** — HTML + CSS + JS, zero dependencies, zero backend

## Embedding

Copy the three files into your project:

```bash
cp index.html style.css app.js /path/to/your/project/
```

Then add to your page:

```html
<!-- Link CSS (in <head>) -->
<link rel="stylesheet" href="style.css">

<!-- Add to <body> (after your content) -->
<div class="stars" id="stars" aria-hidden="true"></div>
<button class="fab" id="fab" aria-haspopup="dialog" aria-expanded="false">
  <span class="fab-glyph" id="fab-glyph">☉</span>
  <span class="fab-name" id="fab-name">Solar Flare</span>
  <span class="fab-dots" id="fab-dots"></span>
</button>
<div class="dialog-overlay" id="dialog-overlay">
  <div class="dialog" role="dialog" aria-labelledby="dialog-title" aria-modal="true">
    <div class="dialog-header">
      <h2 class="dialog-title" id="dialog-title">SELECT GEAR</h2>
      <button class="close-btn" id="close-btn" aria-label="Close dialog">×</button>
    </div>
    <p class="dialog-subtitle">luna / terra / sol / astra × low / medium / high</p>
    <div class="shifter" id="shifter" role="grid" aria-label="2D gear selector">
      <div class="stick" id="stick" aria-hidden="true"></div>
    </div>
    <div class="readout">
      <div class="readout-gear" id="readout-gear">—</div>
      <div class="readout-name" id="readout-name">—</div>
    </div>
    <div class="legend">
      <span><kbd>←</kbd><kbd>→</kbd><kbd>↑</kbd><kbd>↓</kbd> shift</span>
      <span>click · drag</span>
      <span><kbd>Esc</kbd> close</span>
    </div>
  </div>
</div>

<!-- Load JS (before </body>) -->
<script src="app.js"></script>
```

> **Note:** The component uses CSS custom properties (`--luna`, `--terra`, `--sol`, `--astra`, `--accent`, etc.) for theming. Override them in your own CSS to match your design.

## Files

```
gear-grid/
├── index.html    # Demo page with FAB + dialog
├── style.css     # All styles: stars, FAB, dialog, grid, cells, stick
├── app.js        # Data, grid build, selection, dialog, keyboard, drag
├── README.md     # This file
└── LICENSE       # MIT
```

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JavaScript (ES2022)
- No frameworks, no build step, no dependencies
- CSS Grid for layout, CSS custom properties for theming
- CSS animations for stars, stick pulse, flash, dialog spring-open
- Pointer Events API for unified mouse / touch / pen drag
- ARIA dialog + grid roles for accessibility

## Slim Version

A zero-comment, data-driven single-file version: [slim.html](https://hana-ame.github.io/gear-grid/slim.html)

Configure the grid with two arrays — the cartesian product auto-generates all cells:

```js
const COLUMNS = ['luna', 'terra', 'sol', 'astra'];  // x-axis
const ROWS    = ['high', 'medium', 'low'];           // y-axis (first = top)
```

Each cell displays `col·row` (e.g. `sol·medium`) when selected. No hardcoded names, no GEAR_NAMES/GEAR_DESC — just axes.

### Axes reference

| `COLUMNS` | `ROWS` | Cell display |
|-----------|--------|--------------|
| `luna` | `high` | `luna·high` |
| `sol` | `medium` | `sol·medium` |
| `astra` | `low` | `astra·low` |

### Colors

Colors are auto-assigned per column from `COLORS[]`. Dots per row: `ROWS.length - index` (first row = max dots).

### File size

`slim.html` is a single self-contained file (~5 KB) with inline CSS + JS. No external dependencies, zero build step.

## React Version

[react.html](https://hana-ame.github.io/gear-grid/react.html) — React 18 via CDN, hooks-based (useState/useRef/useEffect), single self-contained HTML file.

## Vue Version

[vue.html](https://hana-ame.github.io/gear-grid/vue.html) — Vue 3 via CDN, reactive setup, single self-contained HTML file.

## Deploy

Hosted on [GitHub Pages](https://pages.github.com/) via legacy deployment (main branch → root).

---

Built by [Hana-ame](https://github.com/Hana-ame) · MIT License
