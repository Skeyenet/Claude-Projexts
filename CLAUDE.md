# CLAUDE.md — Claude-Projexts

## Repository Overview

This repo contains **Stillwater**, a React mobile-first UI prototype for a mindful notification/focus management app. The entire app lives in a single self-contained file.

## File Structure

```
Claude-Projexts/
├── stillwater.jsx   # Complete React app (single file, ~1300 lines)
└── README.md        # Minimal placeholder
```

## What Stillwater Is

A mobile app prototype (max-width 390px) that helps users batch and schedule their notifications to protect focus time. Key concept: messages are held and delivered in configurable "batch windows" rather than interrupting the user in real time.

## Architecture

`stillwater.jsx` is structured in layers, top to bottom:

1. **`FONTS`** — Google Fonts import string (`Fraunces` serif + `DM Sans` sans-serif)
2. **`styles`** — Full CSS-in-JS string injected via `<style>` tag at render time. Uses CSS custom properties (`--stone`, `--bark`, `--moss`, etc.) for the color palette.
3. **Static data constants** — Mock data arrays and objects:
   - `TIMELINE_DATA` — daily schedule items (quiet blocks, batch windows)
   - `INBOX_DATA` — sample batched messages with priority levels
   - `PATTERN_DATA` — AI-inferred behavioral insights
   - `SETTINGS_DATA` — schedule, notification toggles, connected sources
4. **`Stillwater` component** — Default export; manages all state and renders 4 tab views + a bottom nav + DND modal sheet.

## Component State

| State variable | Type | Purpose |
|---|---|---|
| `tab` | string | Active view: `"home"`, `"inbox"`, `"learn"`, `"settings"` |
| `protectOn` | boolean | Whether focus protection is currently active |
| `showDND` | boolean | Controls the Do Not Disturb bottom sheet overlay |
| `selectedDuration` | number\|null | Index of selected DND duration option |
| `filterActive` | string | Active filter pill in inbox view |
| `ringAnimated` | boolean | Triggers CSS animation on the progress ring (delayed 400ms via `useEffect`) |
| `settingToggles` | object | Map of index → boolean for notification toggles in Settings |

## Views / Tabs

- **Home (`tab === "home"`)** — SVG progress ring showing % of day protected, protect toggle, today's schedule timeline, inbox preview
- **Inbox (`tab === "inbox"`)** — Full batched message queue with filter pills
- **Learn (`tab === "learn"`)** — Behavioral pattern stats grid + editable schedule preferences + AI insight
- **Settings (`tab === "settings"`)** — Schedule config, notification toggles, connected sources, philosophy blurb

## Color Palette (CSS custom properties)

```
--stone:  #f5f0ea  (background)
--bark:   #2c2419  (primary dark text)
--moss:   #4a5e3a  (primary green / active)
--sage:   #8fa67d  (muted green / labels)
--clay:   #c4855a  (warm orange / urgent)
--mist:   #d4cfc8  (borders / dividers)
--water:  #6b8fa3  (blue / batch)
--cream:  #faf7f2  (card/app background)
--ink:    #1a1510  (deepest text)
```

## Key Patterns & Conventions

### Styling
- All styles are defined in the `styles` string constant and injected as `<style>{FONTS}{styles}</style>` — no CSS modules, no styled-components, no Tailwind.
- BEM-style flat class names (`.inbox-card`, `.card-urgent`, `.timeline-dot`, `.dot-protect`).
- Modifier classes appended directly (e.g. `className={`protect-toggle ${protectOn ? "" : "off"}`}`).
- Animations use CSS keyframes defined in the styles string (`slideUp`, `pulse`, `fadeIn`, `slideSheet`).
- The `animate-in` class + `nth-child` delays creates staggered entrance animations.

### Data
- All data is static mock data defined as module-level constants (not fetched).
- No backend, no API calls, no routing library.

### React usage
- Only `useState`, `useEffect`, `useRef` imported from React (though `useRef` is imported but not used in the current code).
- Single component, no child components extracted.
- Conditional rendering via `{tab === "home" && (...)}` pattern for each view.

## Development Context

- **Framework**: React (JSX)
- **No build config present** — this file is likely used as a Claude artifact / dropped into a React sandbox (e.g. CodeSandbox, StackBlitz, or a Vite/CRA project)
- **No dependencies beyond React** — no router, no state management library, no UI component library
- **Mobile-first** — hard-coded `max-width: 390px`, designed for iPhone-sized viewport

## Git Branches

- `master` — main local branch
- `claude/add-claude-documentation-qP5x0` — feature branch for this documentation work
- `origin/main` — remote default branch

## Working on This Repo

When making changes to `stillwater.jsx`:
1. Styles go in the `styles` constant string, following existing BEM-like class naming
2. New data/mock content goes as module-level constants before the component
3. New views should follow the tab-conditional pattern and add a nav item to the bottom nav array
4. Maintain the color palette — use existing CSS custom properties rather than raw hex values in new code
5. Develop on the `claude/add-claude-documentation-qP5x0` branch and push with `git push -u origin <branch>`
