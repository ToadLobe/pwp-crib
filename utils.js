/**
 * PWP Assessment Tool - Utility Functions
 * Helper functions for common operations
 */

/**
 * Format milliseconds into MM:SS format
 * @param {number} milliseconds - Time in milliseconds
 * @returns {string} Formatted time string (e.g., "03:45")
 */
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Pad with leading zeros
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
}

/**
 * Smooth scroll to a section in the main view
 * @param {string} sectionId - The ID of the section to scroll to
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Generate a unique ID for cards or elements
 * @param {string} prefix - Optional prefix for the ID
 * @returns {string} Unique identifier
 */
function generateId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Debounce function to limit how often a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Interpolate variables in a string template
 * Replaces ${variableName} with values from the state object
 * @param {string} template - The template string with ${} placeholders
 * @param {Object} state - The state object containing variable values
 * @returns {string} Interpolated string
 */
function interpolate(template, state) {
    if (!template) return '';

    return template.replace(/\$\{(\w+)\}/g, (match, variableName) => {
        // Look for the variable in state
        if (state && state.hasOwnProperty(variableName)) {
            return state[variableName];
        }
        // If not found, return the original placeholder
        return match;
    });
}

/**
 * Check if the timer has exceeded 45 minutes (2700000ms)
 * @param {number} milliseconds - Time in milliseconds
 * @returns {boolean} True if over 45 minutes
 */
function isOvertime(milliseconds) {
    return milliseconds > 2700000;
}
