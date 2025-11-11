# PWP Assessment Tool - Data Structures

## State Object

All application state stored in single object, persisted to localStorage:

```javascript
const state = {
  // Session meta
  sessionId: "uuid-string",
  startTime: null,  // timestamp
  elapsedTime: 0,   // milliseconds
  isRunning: false,

  // Patient info
  patientName: "",

  // Tracked inputs (key = cardId)
  inputs: {
    "patient-name": ["John"],
    "category": ["Anxiety"],
    "where": ["At work", "In meetings"],
    "phq9-score": [12],
    "gad7-score": [15],
    // ... etc
  },

  // Card completion status
  completed: {
    "intro-card-1": true,
    "intro-card-2": false,
    // ... etc
  },

  // Section completion (calculated)
  sections: {
    "introduction": true,
    "information-gathering": false,
    // ... etc
  }
}
```

## Card Definition Structure

Each card is an object with:

```javascript
{
  id: "unique-id",
  section: "introduction",  // for grouping
  showIf: null,  // or function: (state) => boolean
  items: [
    {
      type: "direction",  // or "verbatim", "input", "search"
      content: "Text with ${variable} interpolation"
    },
    {
      type: "input",
      inputType: "text",  // or "number"
      label: "Patient's preferred name",
      stateKey: "patient-name"  // where to store in state.inputs
    },
    {
      type: "search",
      label: "Category",
      stateKey: "category",
      options: ["Anxiety", "Mood", "Pain", "Panic", "Stress", "Other"]
    }
  ]
}
```

## Item Types

**direction:**
- Grey background box
- Instruction text for assessor
- Can include variables

**verbatim:**
- Blue-tinted background box
- Text to read aloud
- Can include variables

**input:**
- Label + input field + "Add" button
- Creates chip list below
- `inputType`: "text" or "number"
- `stateKey`: where to save in state.inputs

**search:**
- Label + searchable dropdown
- Select creates chip
- `options`: array of strings
- `stateKey`: where to save in state.inputs

## Special Variables

Variables available for interpolation:

- `${name}` → `state.inputs["patient-name"][0]` or "the patient"
- `${phqScore}` → `state.inputs["phq9-score"][0]`
- `${gadScore}` → `state.inputs["gad7-score"][0]`
- `${phq9q9score}` → `state.inputs["phq9-q9"][0]`
- `${diagnosis}` → `state.inputs["diagnosis"][0]`
- `${treatment}` → `state.inputs["treatment"][0]`

## Conditional Rendering Examples

```javascript
// Safety plan card only shows if required
{
  id: "safety-plan-card",
  showIf: (state) => state.inputs["safety-plan-required"]?.[0] === "yes",
  items: [...]
}

// ROM feedback varies by score
{
  id: "phq-feedback",
  showIf: (state) => state.inputs["phq9-score"]?.[0] >= 0,
  items: [
    {
      type: "verbatim",
      content: (state) => {
        const score = state.inputs["phq9-score"][0];
        if (score < 5) return "Your score indicates sub-clinical symptoms...";
        if (score < 10) return "Your score indicates mild symptoms...";
        if (score < 15) return "Your score indicates moderate symptoms...";
        return "Your score indicates severe symptoms...";
      }
    }
  ]
}
```

## State Management Functions

**Required functions in state.js:**

- `loadState()` - Load from localStorage or return default
- `saveState()` - Persist to localStorage
- `updateInput(cardId, value)` - Add value to inputs[cardId]
- `removeInput(cardId, index)` - Remove chip at index
- `toggleComplete(cardId)` - Toggle completed status
- `checkSectionComplete(section)` - Calculate if section done
- `getVariable(name)` - Resolve variable for interpolation
- `startTimer()` - Begin stopwatch
- `pauseTimer()` - Pause stopwatch
- `resetTimer()` - Zero stopwatch
- `updateTimer()` - Increment elapsed time (called every 100ms)

## LocalStorage Key

Save entire state object as JSON:
```javascript
localStorage.setItem('pwp-assessment-state', JSON.stringify(state));
```
