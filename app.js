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
    renderSidebar();
    renderMainView();

    // Start timer interval (100ms for smooth updates)
    startTimerInterval();

    // Set up event delegation for user interactions
    setupEventListeners();

    console.log('PWP Assessment Tool initialized');
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

        // Create a <ul> for semantic navigation
        const ul = document.createElement('ul');

        sections.forEach(section => {
            // Render main section as <li>
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.dataset.sectionId = section.id;

            // Check if section is completed (from state.js)
            const isCompleted = typeof isSectionComplete === 'function'
                ? isSectionComplete(section.id)
                : false;

            if (isCompleted) {
                link.classList.add('secondary');
                link.innerHTML = `<span class="checkmark">✓ </span><span>${section.name}</span>`;
            } else {
                link.textContent = section.name;
            }

            li.appendChild(link);
            ul.appendChild(li);

            // Render subsections if they exist
            if (section.subsections && section.subsections.length > 0) {
                section.subsections.forEach(subsection => {
                    const subLi = document.createElement('li');
                    const subLink = document.createElement('a');
                    subLink.href = '#';
                    subLink.classList.add('sidebar-subitem');
                    subLink.dataset.sectionId = subsection.id;

                    // Check if subsection is completed
                    const subIsCompleted = typeof isSectionComplete === 'function'
                        ? isSectionComplete(subsection.id)
                        : false;

                    if (subIsCompleted) {
                        subLink.classList.add('secondary');
                        subLink.innerHTML = `<span class="checkmark">✓ </span><span>${subsection.name}</span>`;
                    } else {
                        subLink.textContent = subsection.name;
                    }

                    subLi.appendChild(subLink);
                    ul.appendChild(subLi);
                });
            }
        });

        sidebarNav.appendChild(ul);
    } else {
        // Placeholder when cards.js isn't loaded yet
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        li.textContent = 'Loading sections...';
        ul.appendChild(li);
        sidebarNav.appendChild(ul);
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

    if (typeof state !== 'undefined' && state.elapsedTime !== undefined) {
        const formattedTime = formatTime(state.elapsedTime);
        stopwatchDisplay.textContent = formattedTime;

        // Add overtime class if over 45 minutes
        if (isOvertime(state.elapsedTime)) {
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

    if (typeof state !== 'undefined' && state.isRunning !== undefined) {
        if (state.isRunning) {
            icon.className = 'ti ti-player-pause-filled';
            timerToggle.setAttribute('aria-label', 'Pause timer');
        } else {
            icon.className = 'ti ti-player-play-filled';
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

    // Enter key handling for input fields
    document.getElementById('cards-container').addEventListener('keydown', handleInputKeydown);
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
    if (typeof resetAll === 'function') {
        const confirmed = confirm('Reset everything (timer, inputs, and completion status)?');
        if (confirmed) {
            resetAll(); // Defined in state.js
            updateStopwatch();
            updateTimerToggleButton();
            renderMainView();
            renderSidebar();
        }
    }
}

/**
 * Handle sidebar navigation clicks
 */
function handleSidebarClick(event) {
    const link = event.target.closest('a[data-section-id]');
    if (link) {
        event.preventDefault();
        scrollToSection(link.dataset.sectionId);
    }
}

/**
 * Handle clicks in the main view (cards, buttons, chips)
 */
function handleMainViewClick(event) {
    // Handle card completion toggle
    const card = event.target.closest('article.clickable');
    if (card && !event.target.closest('button, .chip-delete, input')) {
        handleCardClick(card);
        return;
    }

    // Handle chip delete clicks (must come before add button handler to take priority)
    const chipDelete = event.target.closest('.chip-delete');
    if (chipDelete) {
        handleChipDelete(chipDelete);
        return;
    }

    // Handle add button clicks
    const addButton = event.target.closest('button[data-card-id]:not(.chip-delete)');
    if (addButton) {
        handleAddButtonClick(addButton);
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
    const singleValue = button.dataset.singleValue === 'true';

    if (typeof handleAddEntry === 'function') {
        handleAddEntry(cardId, inputType, singleValue); // Defined in components.js or state.js
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
    const singleValue = option.dataset.singleValue === 'true';

    if (typeof addEntry === 'function') {
        addEntry(cardId, value, singleValue); // Defined in state.js
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
    if (event.target.type === 'search') {
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
    if (event.target.type === 'search') {
        const searchContainer = event.target.closest('.search-container');
        if (searchContainer) {
            const dropdown = searchContainer.querySelector('.search-dropdown');
            if (dropdown) {
                dropdown.classList.add('active');
            }
        }
    }
}

/**
 * Handle input blur (for search dropdowns)
 */
function handleInputBlur(event) {
    if (event.target.type === 'search') {
        // Delay to allow click events on dropdown to fire first
        setTimeout(() => {
            const searchContainer = event.target.closest('.search-container');
            if (searchContainer) {
                const dropdown = searchContainer.querySelector('.search-dropdown');
                if (dropdown) {
                    dropdown.classList.remove('active');
                }
            }
        }, 200);
    }
}

/**
 * Handle keydown events on input fields (Enter key to submit)
 */
function handleInputKeydown(event) {
    // Check if Enter key was pressed
    if (event.key !== 'Enter') return;

    // Handle regular input/textarea fields (not search inputs)
    if (event.target.type !== 'search' && (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA')) {
        event.preventDefault();

        // Find the associated add button
        const inputRow = event.target.closest('div[role="group"]');
        if (inputRow) {
            const addButton = inputRow.querySelector('button[data-card-id]');
            if (addButton) {
                addButton.click();
            }
        }
    }

    // Handle search input fields
    if (event.target.type === 'search') {
        event.preventDefault();

        // Find the first visible search option and click it
        const searchContainer = event.target.closest('.search-container');
        if (searchContainer) {
            const dropdown = searchContainer.querySelector('.search-dropdown');
            if (dropdown) {
                const visibleOptions = Array.from(dropdown.querySelectorAll('.search-option'))
                    .filter(option =>
                        option.style.display !== 'none' &&
                        !option.classList.contains('no-results')
                    );

                if (visibleOptions.length > 0) {
                    visibleOptions[0].click();
                    // Clear the search input
                    event.target.value = '';
                }
            }
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
