/**
 * PWP Assessment Tool - Main Application
 * Initializes the app, manages timer, and handles user interactions
 */

// Global timer interval reference
let timerInterval = null;

/**
 * Initialize the application
 */
function initApp() {
    // Load state from localStorage (state.js will define loadState)
    if (typeof loadState === 'function') {
        loadState();
    }

    // Render initial UI components
    renderHeader();
    renderSidebar();
    renderMainView();

    // Start timer interval (100ms for smooth updates)
    startTimerInterval();

    // Set up event delegation for user interactions
    setupEventListeners();

    console.log('PWP Assessment Tool initialized');
}

/**
 * Render the header component
 */
function renderHeader() {
    const stopwatchDisplay = document.getElementById('stopwatch-display');
    const timerToggle = document.getElementById('timer-toggle');
    const patientName = document.getElementById('patient-name');

    // Update stopwatch display (will be updated by timer interval)
    if (typeof state !== 'undefined' && state.timer !== undefined) {
        updateStopwatch();
    }

    // Update patient name
    if (typeof state !== 'undefined' && state.patientName) {
        patientName.textContent = state.patientName;
    }
}

/**
 * Render the sidebar navigation
 */
function renderSidebar() {
    const sidebarNav = document.getElementById('sidebar-nav');

    // Clear existing content
    sidebarNav.innerHTML = '';

    // Check if sections are defined (from cards.js)
    if (typeof getSections === 'function') {
        const sections = getSections();

        sections.forEach(section => {
            const item = document.createElement('div');
            item.className = 'sidebar-item';
            item.dataset.sectionId = section.id;

            // Check if section is completed (from state.js)
            const isCompleted = typeof isSectionComplete === 'function'
                ? isSectionComplete(section.id)
                : false;

            if (isCompleted) {
                item.classList.add('completed');
                item.innerHTML = `<span class="checkmark">✓</span><span>${section.name}</span>`;
            } else {
                item.textContent = section.name;
            }

            sidebarNav.appendChild(item);
        });
    } else {
        // Placeholder when cards.js isn't loaded yet
        sidebarNav.innerHTML = '<div class="sidebar-item">Loading sections...</div>';
    }
}

/**
 * Render the main view with all cards
 */
function renderMainView() {
    const cardsContainer = document.getElementById('cards-container');

    // Clear existing content
    cardsContainer.innerHTML = '';

    // Check if renderCards is defined (from components.js)
    if (typeof renderCards === 'function') {
        renderCards(cardsContainer);
    } else {
        // Placeholder when components.js isn't loaded yet
        cardsContainer.innerHTML = '<p style="color: var(--text-secondary);">Loading cards...</p>';
    }
}

/**
 * Update the stopwatch display
 */
function updateStopwatch() {
    const stopwatchDisplay = document.getElementById('stopwatch-display');

    if (typeof state !== 'undefined' && state.timer !== undefined) {
        const formattedTime = formatTime(state.timer.elapsed);
        stopwatchDisplay.textContent = formattedTime;

        // Add overtime class if over 45 minutes
        if (isOvertime(state.timer.elapsed)) {
            stopwatchDisplay.classList.add('overtime');
        } else {
            stopwatchDisplay.classList.remove('overtime');
        }
    }
}

/**
 * Update the timer toggle button icon
 */
function updateTimerToggleButton() {
    const timerToggle = document.getElementById('timer-toggle');
    const icon = timerToggle.querySelector('i');

    if (typeof state !== 'undefined' && state.timer) {
        if (state.timer.running) {
            icon.className = 'ti ti-player-pause';
            timerToggle.setAttribute('aria-label', 'Pause timer');
        } else {
            icon.className = 'ti ti-player-play';
            timerToggle.setAttribute('aria-label', 'Start timer');
        }
    }
}

/**
 * Start the timer interval
 */
function startTimerInterval() {
    // Clear any existing interval
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Update every 100ms for smooth display
    timerInterval = setInterval(() => {
        if (typeof updateTimer === 'function') {
            updateTimer(); // Defined in state.js
        }
        updateStopwatch();
    }, 100);
}

/**
 * Set up event listeners using event delegation
 */
function setupEventListeners() {
    // Header event listeners
    document.getElementById('timer-toggle').addEventListener('click', handleTimerToggle);
    document.getElementById('timer-reset').addEventListener('click', handleTimerReset);

    // Sidebar click delegation
    document.getElementById('sidebar-nav').addEventListener('click', handleSidebarClick);

    // Main view click delegation (for cards, buttons, chips, etc.)
    document.getElementById('cards-container').addEventListener('click', handleMainViewClick);

    // Input event delegation for auto-save
    document.getElementById('cards-container').addEventListener('input', handleInputChange);

    // Search input handling
    document.getElementById('cards-container').addEventListener('focus', handleInputFocus, true);
    document.getElementById('cards-container').addEventListener('blur', handleInputBlur, true);
}

/**
 * Handle timer toggle (play/pause)
 */
function handleTimerToggle() {
    if (typeof toggleTimer === 'function') {
        toggleTimer(); // Defined in state.js
        updateTimerToggleButton();
    }
}

/**
 * Handle timer reset
 */
function handleTimerReset() {
    if (typeof resetTimer === 'function') {
        const confirmed = confirm('Reset timer to 00:00?');
        if (confirmed) {
            resetTimer(); // Defined in state.js
            updateStopwatch();
        }
    }
}

/**
 * Handle sidebar navigation clicks
 */
function handleSidebarClick(event) {
    const item = event.target.closest('.sidebar-item');
    if (item && item.dataset.sectionId) {
        scrollToSection(item.dataset.sectionId);
    }
}

/**
 * Handle clicks in the main view (cards, buttons, chips)
 */
function handleMainViewClick(event) {
    // Handle card completion toggle
    const card = event.target.closest('article.clickable');
    if (card && !event.target.closest('.btn, .btn-add, .chip-delete, input')) {
        handleCardClick(card);
        return;
    }

    // Handle add button clicks
    const addButton = event.target.closest('.btn-add');
    if (addButton) {
        handleAddButtonClick(addButton);
        return;
    }

    // Handle chip delete clicks
    const chipDelete = event.target.closest('.chip-delete');
    if (chipDelete) {
        handleChipDelete(chipDelete);
        return;
    }

    // Handle search option clicks
    const searchOption = event.target.closest('.search-option');
    if (searchOption && !searchOption.classList.contains('no-results')) {
        handleSearchOptionClick(searchOption);
        return;
    }
}

/**
 * Handle card click for completion toggle
 */
function handleCardClick(cardElement) {
    const cardId = cardElement.dataset.cardId;
    if (cardId && typeof toggleCardComplete === 'function') {
        toggleCardComplete(cardId); // Defined in state.js
        renderMainView();
        renderSidebar();
    }
}

/**
 * Handle add button clicks
 */
function handleAddButtonClick(button) {
    const cardId = button.dataset.cardId;
    const inputType = button.dataset.inputType;

    if (typeof handleAddEntry === 'function') {
        handleAddEntry(cardId, inputType); // Defined in components.js or state.js
        renderMainView();
        renderSidebar();
    }
}

/**
 * Handle chip delete clicks
 */
function handleChipDelete(deleteButton) {
    const cardId = deleteButton.dataset.cardId;
    const entryIndex = parseInt(deleteButton.dataset.index);

    if (typeof removeEntry === 'function') {
        removeEntry(cardId, entryIndex); // Defined in state.js
        renderMainView();
        renderSidebar();
    }
}

/**
 * Handle search option selection
 */
function handleSearchOptionClick(option) {
    const cardId = option.dataset.cardId;
    const value = option.dataset.value;

    if (typeof addSearchEntry === 'function') {
        addSearchEntry(cardId, value); // Defined in state.js
        renderMainView();
        renderSidebar();
    }
}

/**
 * Handle input changes (auto-save)
 */
function handleInputChange(event) {
    // Debounced save to localStorage
    if (typeof saveState === 'function') {
        debounce(() => {
            saveState(); // Defined in state.js
        }, 300)();
    }

    // Handle search input filtering
    if (event.target.classList.contains('search-input')) {
        handleSearchInput(event.target);
    }
}

/**
 * Handle search input filtering
 */
function handleSearchInput(input) {
    const query = input.value.toLowerCase();
    const dropdown = input.parentElement.querySelector('.search-dropdown');

    if (dropdown && typeof filterSearchOptions === 'function') {
        filterSearchOptions(dropdown, query); // Defined in components.js
    }
}

/**
 * Handle input focus (for search dropdowns)
 */
function handleInputFocus(event) {
    if (event.target.classList.contains('search-input')) {
        const dropdown = event.target.parentElement.querySelector('.search-dropdown');
        if (dropdown) {
            dropdown.classList.add('active');
        }
    }
}

/**
 * Handle input blur (for search dropdowns)
 */
function handleInputBlur(event) {
    if (event.target.classList.contains('search-input')) {
        // Delay to allow click events on dropdown to fire first
        setTimeout(() => {
            const dropdown = event.target.parentElement.querySelector('.search-dropdown');
            if (dropdown) {
                dropdown.classList.remove('active');
            }
        }, 200);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
