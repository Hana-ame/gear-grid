# Gear Grid · 2D Cosmic Shifter

A two-dimensional gear selector — a "shifter" with **luna / terra / sol / astra** on the X-axis and **low / medium / high** on the Y-axis. 12 distinct gear positions (4 × 3 grid), selectable by click, drag, or keyboard.

## Live Demo

[Try it → hana-ame.github.io/gear-grid](https://hana-ame.github.io/gear-grid/)

## Gear Table

|            | LUNA          | TERRA         | SOL          | ASTRA         |
|------------|---------------|---------------|--------------|---------------|
| **LOW**    | Lunar Dim     | Earth Shield  | Solar Dawn   | Star Drift    |
| **MEDIUM** | Lunar Glow    | Earth Anchor  | Solar Flare  | Star Warden   |
| **HIGH**   | Lunar Bloom   | Earth Fury    | Solar Impact | Star Nova     |

## Controls

| Action          | Input                                             |
|-----------------|---------------------------------------------------|
| Select a gear   | Click any cell                                    |
| Drag-shift      | Click & drag across cells — the stick follows     |
| Keyboard nav    | `←` `→` `↑` `↓` to move (auto-engages selection) |

## Features

- **12 gear combinations** — 4 cosmic elements × 3 intensity levels
- **Cosmic theme** — each element has its own color and glyph (☾ ⊕ ☉ ✦)
- **Shifter stick** — a glowing indicator that animates between cells
- **Drag interaction** — pointer follows during drag, snaps to cell on release
- **Keyboard navigation** — full arrow-key control with auto-engagement
- **Responsive** — works on mobile and desktop
- **Pure frontend** — HTML + CSS + JS, zero dependencies, zero backend

## Files

```
gear-grid/
├── index.html    # Page structure
├── style.css     # Cosmic theme, grid layout, animations
├── app.js        # Data, selection, keyboard, drag, stars
└── README.md     # This file
```

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JavaScript (ES2022)
- No frameworks, no build step, no dependencies
- CSS Grid for layout, CSS custom properties for theming
- CSS animations for stars, stick pulse, and readout flash
- Pointer Events API for unified mouse / touch / pen drag
- ARIA grid roles for accessibility

## Deploy

Hosted on [GitHub Pages](https://pages.github.com/) via legacy deployment (main branch → root).

---

Built by [Hana-ame](https://github.com/Hana-ame) · MIT License
