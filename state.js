/**
 * PWP Assessment Tool - State Management
 * Handles application state, localStorage persistence, and timer management
 */

// Global state object
let state = null;

// LocalStorage key
const STORAGE_KEY = 'pwp-assessment-state';

/**
 * Generate a unique session ID
 * @returns {string} UUID-like string
 */
function generateSessionId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Get default state structure
 * @returns {Object} Default state object
 */
function getDefaultState() {
    return {
        // Session meta
        sessionId: generateSessionId(),
        startTime: null,      // timestamp when timer was last started
        elapsedTime: 0,       // total milliseconds elapsed
        isRunning: false,     // timer running state

        // Patient info
        patientName: "",

        // Tracked inputs (key = cardId, value = array of entries)
        inputs: {},

        // Card completion status (key = cardId, value = boolean)
        completed: {},

        // Section completion (calculated, not persisted directly)
        sections: {}
    };
}

/**
 * Load state from localStorage or return default state
 */
function loadState() {
    try {
        const savedState = localStorage.getItem(STORAGE_KEY);

        if (savedState) {
            const parsed = JSON.parse(savedState);

            // Merge with defaults to ensure all fields exist
            state = {
                ...getDefaultState(),
                ...parsed,
                // Preserve elapsed time, but reset running state
                // (timer pauses on reload, but elapsed time persists)
                isRunning: false,
                startTime: null
            };

            console.log('State loaded from localStorage');
        } else {
            // No saved state, use defaults
            state = getDefaultState();
            console.log('Using default state');
        }
    } catch (error) {
        console.error('Error loading state from localStorage:', error);
        state = getDefaultState();
    }

    // Calculate section completion
    updateAllSectionCompletion();

    return state;
}

/**
 * Save state to localStorage
 */
function saveState() {
    try {
        // Update section completion before saving
        updateAllSectionCompletion();

        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        console.log('State saved to localStorage');
    } catch (error) {
        console.error('Error saving state to localStorage:', error);
    }
}

/**
 * Update the timer elapsed time (called every 100ms)
 */
function updateTimer() {
    if (!state || !state.isRunning || !state.startTime) {
        return;
    }

    // Calculate elapsed time
    const now = Date.now();
    const sessionElapsed = now - state.startTime;
    state.elapsedTime += sessionElapsed;
    state.startTime = now;
}

/**
 * Toggle timer between running and paused
 */
function toggleTimer() {
    if (!state) return;

    if (state.isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

/**
 * Start the timer
 */
function startTimer() {
    if (!state) return;

    state.isRunning = true;
    state.startTime = Date.now();
    saveState();
    console.log('Timer started');
}

/**
 * Pause the timer
 */
function pauseTimer() {
    if (!state) return;

    // Update elapsed time one last time before pausing
    if (state.startTime) {
        const now = Date.now();
        const sessionElapsed = now - state.startTime;
        state.elapsedTime += sessionElapsed;
    }

    state.isRunning = false;
    state.startTime = null;
    saveState();
    console.log('Timer paused');
}

/**
 * Reset the timer to 00:00
 */
function resetTimer() {
    if (!state) return;

    state.elapsedTime = 0;
    state.startTime = state.isRunning ? Date.now() : null;
    saveState();
    console.log('Timer reset');
}

/**
 * Reset all state including timer, inputs, and completion status
 */
function resetAll() {
    if (!state) return;

    // Reset to default state but keep the session ID
    const sessionId = state.sessionId;
    state = getDefaultState();
    state.sessionId = sessionId;

    saveState();
    console.log('All state reset (timer, inputs, completion)');
}

/**
 * Toggle card completion status
 * @param {string} cardId - The card ID to toggle
 */
function toggleCardComplete(cardId) {
    if (!state || !cardId) return;

    state.completed[cardId] = !state.completed[cardId];

    // Update section completion
    updateAllSectionCompletion();

    saveState();
    console.log(`Card ${cardId} completion toggled to ${state.completed[cardId]}`);
}

/**
 * Add an input entry to a card
 * @param {string} cardId - The card ID (stateKey)
 * @param {*} value - The value to add
 * @param {boolean} singleValue - If true, replaces existing value instead of adding
 */
function addEntry(cardId, value, singleValue = false) {
    if (!state || !cardId || value === null || value === undefined || value === '') {
        return;
    }

    // Initialize array if it doesn't exist
    if (!state.inputs[cardId]) {
        state.inputs[cardId] = [];
    }

    // For single value fields, replace the entire array
    if (singleValue) {
        state.inputs[cardId] = [value];
    } else {
        // Add the value
        state.inputs[cardId].push(value);
    }

    // Update patient name if this is the patient-name input
    if (cardId === 'patient-name' && value) {
        state.patientName = value;
    }

    saveState();
    console.log(`${singleValue ? 'Set' : 'Added'} entry to ${cardId}:`, value);
}

/**
 * Add a search entry (alias for addEntry for clarity)
 * @param {string} cardId - The card ID (stateKey)
 * @param {*} value - The value to add
 * @param {boolean} singleValue - If true, replaces existing value instead of adding
 */
function addSearchEntry(cardId, value, singleValue = false) {
    addEntry(cardId, value, singleValue);
}

/**
 * Update input (alias for addEntry, following spec)
 * @param {string} cardId - The card ID (stateKey)
 * @param {*} value - The value to add
 */
function updateInput(cardId, value) {
    addEntry(cardId, value);
}

/**
 * Remove an entry from a card's inputs
 * @param {string} cardId - The card ID (stateKey)
 * @param {number} index - The index of the entry to remove
 */
function removeEntry(cardId, index) {
    if (!state || !cardId || !state.inputs[cardId]) {
        return;
    }

    if (index >= 0 && index < state.inputs[cardId].length) {
        state.inputs[cardId].splice(index, 1);

        // Update patient name if this was the patient-name input
        if (cardId === 'patient-name') {
            state.patientName = state.inputs[cardId][0] || '';
        }

        saveState();
        console.log(`Removed entry at index ${index} from ${cardId}`);
    }
}

/**
 * Remove input (alias for removeEntry, following spec)
 * @param {string} cardId - The card ID (stateKey)
 * @param {number} index - The index of the entry to remove
 */
function removeInput(cardId, index) {
    removeEntry(cardId, index);
}

/**
 * Toggle completion status (alias for toggleCardComplete, following spec)
 * @param {string} cardId - The card ID to toggle
 */
function toggleComplete(cardId) {
    toggleCardComplete(cardId);
}

/**
 * Check if a section is complete based on its cards
 * @param {string} sectionId - The section ID to check
 * @returns {boolean} True if all cards in section are completed
 */
function isSectionComplete(sectionId) {
    if (!state) return false;

    // This will be properly calculated when cards.js is loaded
    // For now, return the cached value from state.sections
    return state.sections[sectionId] || false;
}

/**
 * Check and update section completion (will be enhanced when cards.js is loaded)
 * @param {string} sectionId - The section ID to check
 * @returns {boolean} True if all cards in section are completed
 */
function checkSectionComplete(sectionId) {
    if (!state) return false;

    // This function will be properly implemented once cards.js is loaded
    // with the actual card definitions
    // For now, return the current state
    return state.sections[sectionId] || false;
}

/**
 * Update section completion status for all sections
 * Uses updateSectionCompletion from cards.js when available
 */
function updateAllSectionCompletion() {
    if (!state) return;

    // Initialize sections object if it doesn't exist
    if (!state.sections) {
        state.sections = {};
    }

    // Call updateSectionCompletion from cards.js if available
    if (typeof updateSectionCompletion === 'function') {
        updateSectionCompletion();
    }
}

/**
 * Get a variable value for interpolation
 * @param {string} name - The variable name (e.g., "name", "phqScore")
 * @returns {string} The variable value or fallback
 */
function getVariable(name) {
    if (!state) return '';

    switch (name) {
        case 'name':
            return state.inputs['patient-name']?.[0] || 'the patient';

        case 'phqScore':
            return state.inputs['phq9-score']?.[0] || '';

        case 'gadScore':
            return state.inputs['gad7-score']?.[0] || '';

        case 'phq9q9score':
            return state.inputs['phq9-q9']?.[0] || '';

        case 'diagnosis':
            return state.inputs['diagnosis']?.[0] || '';

        case 'treatment':
            return state.inputs['treatment']?.[0] || '';

        default:
            // Try to find the variable in inputs
            return state.inputs[name]?.[0] || '';
    }
}

/**
 * Get current state (for external access)
 * @returns {Object} Current state object
 */
function getState() {
    return state;
}

/**
 * Set state (for external access, use with caution)
 * @param {Object} newState - New state object
 */
function setState(newState) {
    state = newState;
    saveState();
}

// Export state for debugging in console
if (typeof window !== 'undefined') {
    window.getState = getState;
}
