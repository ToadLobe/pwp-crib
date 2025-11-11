# PWP Assessment Tool - Component Specifications

## Component Architecture

All components are pure functions that return HTML strings or DOM elements.

## Header Component

```javascript
function renderHeader(state) {
  // Returns: <header> element
  // Contains:
  // - Left side: formatTime(state.elapsedTime), play/pause button, reset button
  // - Right side: state.patientName || "New Patient"
  // - Timer text red if elapsedTime > 2700000 (45 min)
}
```

**Layout:**
- Fixed position top
- Flex: space-between
- Height: 60px
- Background: #2a2a2a
- Padding: 0 24px

**Timer display:**
- Format: MM:SS
- Font size: 24px
- Color: #e0e0e0 (red if >45min)

**Buttons:**
- Icon only (Tabler icons)
- Play: "player-play", Pause: "player-pause", Reset: "refresh"
- Size: 36px × 36px
- Background: transparent, hover: #3a3a3a

## Sidebar Component

```javascript
function renderSidebar(sections, state) {
  // Returns: <aside> element
  // sections: [{id, name, complete}, ...]
  // Each section is clickable, scrolls to section
  // Incomplete: blue (#4a9eff), Complete: grey (#666) + checkmark
}
```

**Layout:**
- Fixed position left
- Width: 200px
- Top: 60px (below header)
- Background: #1a1a1a
- Padding: 16px

**Section item:**
- Display: flex, align-items: center
- Padding: 8px
- Cursor: pointer
- Hover: background #2a2a2a
- Text: 14px
- Checkmark icon: "check" (only if complete)

## Card Component

```javascript
function renderCard(cardDef, state) {
  // Returns: <div class="card"> element
  // cardDef: card definition object
  // state: current app state

  // Click behavior:
  // - If has inputs: no click action
  // - If no inputs: toggle completion

  // Visual indication:
  // - Completed: green left border (4px, #4a9eff)
  // - Incomplete: grey left border (4px, #3a3a3a)
}
```

**Layout:**
- Background: #2a2a2a
- Border-radius: 8px
- Padding: 16px
- Margin-bottom: 12px
- Border-left: 4px solid
- Cursor: pointer (if no inputs)

## Card Item Components

### Direction Item
```javascript
function renderDirection(item, state) {
  // Returns: <div class="direction">
  // Grey background (#333)
  // Padding: 12px
  // Border-radius: 4px
  // Icon: "info-circle"
  // Interpolate variables in content
}
```

### Verbatim Item
```javascript
function renderVerbatim(item, state) {
  // Returns: <div class="verbatim">
  // Blue-tinted background (#1a2a3a)
  // Padding: 12px
  // Border-radius: 4px
  // Icon: "quote"
  // Interpolate variables in content
}
```

### Input Item
```javascript
function renderInput(item, state) {
  // Returns: <div class="input-group">
  // Contains:
  // - Label
  // - Input field (text or number)
  // - "Add" button with "plus" icon
  // - Chip list below (if state.inputs[stateKey] has values)
}
```

**Input field:**
- Width: 100%
- Height: 36px
- Background: #1a1a1a
- Border: 1px solid #3a3a3a
- Border-radius: 4px
- Padding: 0 12px
- Color: #e0e0e0

**Add button:**
- Height: 36px
- Padding: 0 16px
- Background: #4a9eff
- Border: none
- Border-radius: 4px
- Icon: "plus"
- Hover: #3a8eee

### Search Item
```javascript
function renderSearch(item, state) {
  // Returns: <div class="search-group">
  // Contains:
  // - Label
  // - Searchable dropdown (datalist or custom)
  // - Selected chips below

  // Behavior:
  // - Type to filter options
  // - Select adds chip
  // - Clear input after selection
}
```

**Dropdown:**
- Similar styling to input
- Filter options as user types
- Show max 10 results at once

### Chip List
```javascript
function renderChips(stateKey, values, onDelete) {
  // Returns: <div class="chip-list">
  // values: array of strings/numbers
  // Each chip has hover delete button
}
```

**Chip:**
- Display: inline-flex
- Background: #3a3a3a
- Padding: 6px 12px
- Border-radius: 16px
- Margin: 4px
- Font-size: 14px

**Delete button:**
- Icon: "x"
- Size: 16px
- Opacity: 0 (visible on chip hover)
- Cursor: pointer
- Color: #ff4444

## Section Header Component

```javascript
function renderSectionHeader(sectionName) {
  // Returns: <h2 class="section-header">
  // Text-transform: uppercase
  // Font-size: 18px
  // Font-weight: 600
  // Margin: 32px 0 16px 0
  // Color: #4a9eff
  // Has id="section-{id}" for scrolling
}
```

## Special Components

### ROM Feedback Card
```javascript
function renderROMFeedback(state) {
  // Dynamically generates verbatim based on:
  // - phqScore: state.inputs["phq9-score"][0]
  // - gadScore: state.inputs["gad7-score"][0]

  // Score ranges:
  // 0-4: subclinical, 5-9: mild, 10-14: moderate, 15+: severe
}
```

### Diagnosis Info Card
```javascript
function renderDiagnosisInfo(state) {
  // Shows normalizing + description for selected diagnosis
  // Data from diagnosis table (line 307-319 in README)
  // Format: paragraph with prevalence, then symptoms
}
```

### Treatment Recommendation Card
```javascript
function renderTreatmentRec(state) {
  // Shows verbatim based on treatment selection
  // LiCBT: guided self-help text (line 363)
  // HiCBT: high-intensity therapy text (line 365)
}
```

### Problem Statement Summary
```javascript
function renderProblemSummary(state) {
  // Embeds readonly summary of:
  // - Core problem, category, 3Ws, triggers
  // - Symptoms (sensations, behaviours, thoughts)
  // - Impacts (work, home, hobbies, social, relationships)
  // - Goals
  // Shows in grey boxes, not editable
}
```

## Utility Functions

```javascript
function interpolate(text, state) {
  // Replace ${varName} with actual values
  // Use getVariable(name) from state.js
}

function scrollToSection(sectionId) {
  // Smooth scroll to element with id
}

function formatTime(milliseconds) {
  // Convert to MM:SS format
}
```
