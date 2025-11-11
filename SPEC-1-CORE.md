# PWP Assessment Tool - Core Specification

## Purpose
Interactive web app for conducting PWP (mental health) assessments. Single-page application for desktop use only.

## Tech Stack
- Vanilla JavaScript (ES6+)
- HTML5
- CSS3
- Tabler Icons (CDN)
- No frameworks, no build tools

## Browser Storage
- Use `localStorage` to persist entire session state
- Auto-save on every input change
- Restore session on page load

## Architecture

### File Structure
```
index.html          # Main HTML shell
styles.css          # All styles
app.js              # Main app initialization
state.js            # State management
components.js       # Reusable UI components
cards.js            # Card definitions and logic
utils.js            # Helper functions
```

### Key Behaviors

**Card Completion Logic:**
- Cards with only Direction/Verbatim: click to toggle complete
- Cards with Input/Search: auto-complete when ≥1 entry added
- All cards can be un-completed by clicking again

**Section Progress Tracking:**
- Sections marked complete when all child cards complete
- Sidebar updates in real-time (blue → grey, add checkmark)

**Conditional Rendering:**
- Cards can be hidden/shown based on state values
- Examples: safety plan, ROM score feedback, treatment type
- Use `showIf` property in card definitions

**Input Types:**
1. **Text/Number Input** - Single field with "Add" button, creates chip list below
2. **Search** - Filterable dropdown, select creates chip
3. Chips have hover-triggered delete icon

**Variable Interpolation:**
- Use `${variableName}` in verbatim/direction text
- Replace with actual values from state at render time

## Visual Style

**Dark, minimal aesthetic:**
- Background: `#1a1a1a`
- Cards: `#2a2a2a`
- Text: `#e0e0e0`
- Accent blue: `#4a9eff`
- Accent grey: `#666`
- Accent red: `#ff4444`
- Border radius: `8px`
- Padding: `16px`
- Gap between cards: `12px`
- Font: System sans-serif

**Icons:**
- Only on buttons (start, pause, reset, add, delete)
- Use Tabler Icons CDN
- Size: 18px

## Layout

```
┌─────────────────────────────────────────────────┐
│ Header (stopwatch | controls | patient name)    │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│ Sidebar  │  Main View                           │
│          │  (scrolling cards)                   │
│ -Section1│                                      │
│ ✓Section2│                                      │
│          │                                      │
└──────────┴──────────────────────────────────────┘
```

**Header** (fixed top):
- Left: Stopwatch display + start/pause button + reset button
- Right: Patient name (or "New Patient")
- Stopwatch turns red at 45+ minutes

**Sidebar** (fixed left, ~200px):
- List of section names
- Click scrolls main view to section
- Blue text = incomplete, Grey text + ✓ = complete

**Main View** (scrollable):
- Vertical list of cards
- Each card = white bordered box on dark background
- Cards grouped visually by section

## Next Steps
After implementing this core structure, proceed to:
- SPEC-2-DATA.md for state/data structures
- SPEC-3-COMPONENTS.md for component specs
- SPEC-4-CARDS.md for assessment content
