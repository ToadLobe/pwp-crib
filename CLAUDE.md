# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PWP Assessment Tool is a vanilla JavaScript web application that provides an interactive crib sheet for Psychological Wellbeing Practitioners during mental health assessments. The app guides practitioners through a structured 45-minute PWP assessment with auto-saving, session timers, and conditional content rendering.

## Development Commands

This is a vanilla HTML/CSS/JavaScript project with no build system or tests.

- **Open the app**: Open `index.html` in a web browser
- **View source**: All code is in the project root directory as `.js` files with corresponding purpose
- **No build/test process**: Changes to files are immediately reflected in the browser with a refresh

## Architecture & Structure

### Module Loading Order
Files must load in this order (see `index.html`):
1. **state.js** - State management and localStorage persistence
2. **utils.js** - Utility functions (formatting, validation, debouncing)
3. **medications.js** - Medication database and helpers
4. **components.js** - UI rendering functions
5. **cards.js** - Card definitions and section logic
6. **app.js** - Application initialization and event handling

### Core Modules

**state.js** - State Management
- Global `state` object stores: patient name, inputs, card completion status, timer state
- Session data persists to localStorage with key `'pwp-assessment-state'`
- Key functions: `loadState()`, `saveState()`, `addEntry()`, `removeEntry()`, `toggleCardComplete()`
- Timer functions: `startTimer()`, `pauseTimer()`, `toggleTimer()`, `resetAll()`
- Variable interpolation via `getVariable(name)` - supports: 'name', 'phqScore', 'gadScore', 'phq9q9score', 'diagnosis', 'treatment', or direct stateKey lookup

**cards.js** - Card Definitions & Section Logic
- `sections` array defines the 5 main sections and subsections
- `cards` array contains all assessment cards with items (direction, verbatim, input, search, diagram)
- Each card has: `id`, `section`, optional `subsection`, `items` array
- Card items: `type` (direction/verbatim/input/search/diagram), and type-specific properties
- `showIf` function on cards enables conditional rendering (e.g., safety plan card only shows if safety plan is needed)
- `updateSectionCompletion()` calculates completion status; sections with subsections only complete when ALL subsections complete
- `getSections()` and `getCards()` are the public APIs

**components.js** - UI Rendering
- `renderCards()` renders all visible cards in sections/subsections
- `renderCard()` renders a single card with all its items
- Input rendering: single-value fields have 'Save' button; multi-value fields have 'Add' button with chip display
- Search fields render filterable dropdowns with real-time filtering
- Card completion: auto-completes when all inputs contain values; cards with only direction/verbatim text can be clicked to toggle completion
- `filterSearchOptions()` handles search dropdown filtering

**app.js** - Application & Event Management
- `initApp()` bootstraps the app, loads state, renders UI, sets up timer interval (100ms)
- `renderSidebar()` and `renderMainView()` handle main UI rendering
- Event delegation via `setupEventListeners()` on container elements (#sidebar-nav, #cards-container)
- Key handlers: card clicks, input changes (debounced 300ms), chip deletion, search selection, sidebar navigation
- Enter key in multi-value inputs triggers the 'Add' button; Enter in search inputs selects first visible option

**utils.js** - Helpers
- `formatTime()` converts milliseconds to MM:SS
- `isOvertime()` returns true if timer > 45 minutes (used to style stopwatch red)
- `interpolate()` replaces `${variableName}` placeholders with state values
- `validateInput()` enforces numeric ranges for PHQ-9, GAD-7, motivation scores
- `debounce()` and `generateId()` for common operations

**medications.js** - Data
- `medications` array contains name, clinical role, and standard dosage
- `getMedicationByName()` and `getMedicationOptions()` for search field integration
- Special entries: "None" and "Other" have empty role/dosage (not displayed in info boxes)

### UI Structure

- **Sidebar** (#app-sidebar): Fixed stopwatch + timer controls (play/pause, reset) + navigation list
- **Main View** (#app-main): Scrollable vertically, contains all cards grouped by section/subsection
- **Cards**: Semantic `<article>` elements with clickable completion toggle (if no inputs)
- **Search Dropdowns**: Hidden by default, shown on input focus, filtered in real-time
- **Input Chips**: Multi-value inputs display entries as dismissible chips below the input

### Data Flow & Persistence

1. User interacts with UI (clicks, types)
2. Event handler calls state function (e.g., `addEntry()`, `toggleCardComplete()`)
3. State updates and `saveState()` persists to localStorage
4. `renderMainView()` and `renderSidebar()` re-render affected UI
5. On page reload: `loadState()` restores saved state, timer pauses but elapsed time preserved

### Conditional Content

Cards can be hidden via `showIf` function. Example (safety plan card):
```javascript
showIf: (state) => state.inputs['safety-required']?.[0] === 'yes'
```

The README lists section completion logic: subsections only complete when all their cards complete; conditional cards hidden by `showIf` don't count toward completion.

## Key Technical Details

- **No framework**: Pure vanilla JS, ES6 syntax
- **Styling**: Pico CSS framework (dark theme) + custom `styles.css`
- **Icons**: Tabler icons via CDN (used only on buttons)
- **Mobile**: Not supported; desktop-first design
- **Validation**: `validateInput()` enforces min/max for score fields; see `fieldValidation` schema in utils.js
- **Variable Interpolation**: Uses `${variableName}` syntax; implemented in `interpolate()` and rendered via `getVariable()`
- **Timer**: Updates every 100ms when running; times out at 45 minutes (turns stopwatch red)

## Common Workflows

### Adding a New Card
1. Add entry to `cards` array in cards.js with unique `id`, `section`, optional `subsection`, and `items`
2. Use `type: 'input'` for text/number inputs; `stateKey` determines where data is stored
3. Use `type: 'search'` for dropdowns; provide `options` array or call a function to get options
4. Add `showIf` function if card should be conditionally hidden

### Adding a New Input Field
Example of single-value field (core problem):
```javascript
{ type: "input", inputType: "text", label: "Core problem", stateKey: "core-problem", singleValue: true }
```

Example of multi-value field (triggers):
```javascript
{ type: "input", inputType: "text", label: "Triggers", stateKey: "triggers" }
```

### Displaying Dynamic Content
Use `${variableName}` in verbatim text. The variable will be looked up via `getVariable()`:
```javascript
{ type: "verbatim", content: "So ${name}, could you tell me what's brought you here today?" }
```

### Conditional Cards
Use `showIf` to show/hide entire cards based on state:
```javascript
showIf: (state) => state.inputs['diagnosis']?.[0] === 'Depression'
```

## Modification Notes

- **Pico CSS**: Styles are minimal; most styling via Pico + `styles.css`. Colors, spacing, layout all there.
- **Script Order Matters**: state.js must load before cards.js because cards.js calls state functions during calculation
- **localStorage Key**: `'pwp-assessment-state'` — changing this will break session persistence for existing users
- **State Structure**: Keep `inputs` as object of arrays (even single values); `completed` as object of booleans
- **Re-rendering**: Always call both `renderMainView()` and `renderSidebar()` after state changes to keep UI in sync
