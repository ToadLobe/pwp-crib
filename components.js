/**
 * PWP Assessment Tool - Component Rendering
 * Pure functions that render UI components as HTML strings or DOM elements
 */

/**
 * Render all cards in the main view
 * @param {HTMLElement} container - The container element to render cards into
 */
function renderCards(container) {
    if (!container || typeof getCards !== 'function') return;

    const allCards = getCards();
    const sections = getSections();

    container.innerHTML = '';

    // Group cards by section
    sections.forEach(section => {
        // Filter cards for this section that should be shown
        const sectionCards = allCards.filter(card => {
            if (card.section !== section.id) return false;

            // Check showIf condition
            if (card.showIf && typeof card.showIf === 'function') {
                return card.showIf(state);
            }

            return true;
        });

        if (sectionCards.length === 0) return;

        // Render section header
        const sectionHeader = renderSectionHeader(section.name, section.id);
        container.appendChild(sectionHeader);

        // Render each card in the section
        sectionCards.forEach(card => {
            const cardElement = renderCard(card, state);
            if (cardElement) {
                container.appendChild(cardElement);
            }
        });
    });
}

/**
 * Render a section header
 * @param {string} sectionName - The display name of the section
 * @param {string} sectionId - The ID of the section for scrolling
 * @returns {HTMLElement} Section header element
 */
function renderSectionHeader(sectionName, sectionId) {
    const header = document.createElement('h2');
    header.className = 'section-header';
    header.id = sectionId;
    header.textContent = sectionName;
    return header;
}

/**
 * Render a card component
 * @param {Object} cardDef - The card definition object
 * @param {Object} state - The current application state
 * @returns {HTMLElement} Card element
 */
function renderCard(cardDef, state) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.cardId = cardDef.id;

    // Check if card is completed
    const isCompleted = state.completed[cardDef.id] || false;

    // Check if card has any input items
    const hasInputs = cardDef.items.some(item =>
        item.type === 'input' || item.type === 'search'
    );

    // Add completed class if completed
    if (isCompleted) {
        card.classList.add('completed');
    }

    // Make card clickable only if it has no inputs
    if (!hasInputs) {
        card.classList.add('clickable');
    }

    // Render each item in the card
    cardDef.items.forEach(item => {
        const itemElement = renderCardItem(item, state);
        if (itemElement) {
            card.appendChild(itemElement);
        }
    });

    return card;
}

/**
 * Render a card item based on its type
 * @param {Object} item - The item definition
 * @param {Object} state - The current application state
 * @returns {HTMLElement} Item element
 */
function renderCardItem(item, state) {
    switch (item.type) {
        case 'direction':
            return renderDirection(item, state);
        case 'verbatim':
            return renderVerbatim(item, state);
        case 'input':
            return renderInput(item, state);
        case 'search':
            return renderSearch(item, state);
        default:
            console.warn('Unknown item type:', item.type);
            return null;
    }
}

/**
 * Render a direction item (grey instruction box)
 * @param {Object} item - The direction item
 * @param {Object} state - The current application state
 * @returns {HTMLElement} Direction element
 */
function renderDirection(item, state) {
    const div = document.createElement('div');
    div.className = 'direction';

    const content = document.createElement('div');
    content.className = 'direction-content';

    // Get the text content (may be a function)
    let text = typeof item.content === 'function'
        ? item.content(state)
        : item.content;

    // Interpolate variables
    text = interpolateContent(text, state);

    content.textContent = text;
    div.appendChild(content);

    return div;
}

/**
 * Render a verbatim item (blue-tinted box, read aloud)
 * @param {Object} item - The verbatim item
 * @param {Object} state - The current application state
 * @returns {HTMLElement} Verbatim element
 */
function renderVerbatim(item, state) {
    const div = document.createElement('div');
    div.className = 'verbatim';

    const content = document.createElement('div');
    content.className = 'verbatim-content';

    // Get the text content (may be a function)
    let text = typeof item.content === 'function'
        ? item.content(state)
        : item.content;

    // Interpolate variables
    text = interpolateContent(text, state);

    // Preserve line breaks for feedback text
    content.style.whiteSpace = 'pre-line';
    content.textContent = text;

    div.appendChild(content);

    return div;
}

/**
 * Render an input item (text or number input with chips)
 * @param {Object} item - The input item
 * @param {Object} state - The current application state
 * @returns {HTMLElement} Input group element
 */
function renderInput(item, state) {
    const group = document.createElement('div');
    group.className = 'input-group';

    // Label
    const label = document.createElement('label');
    label.className = 'input-label';
    label.textContent = item.label;
    group.appendChild(label);

    // Input row (input + button)
    const inputRow = document.createElement('div');
    inputRow.className = 'input-row';

    // Input field
    const input = document.createElement('input');
    input.type = item.inputType || 'text';
    input.className = 'input-field';
    input.id = `input-${item.stateKey}`;
    input.placeholder = item.inputType === 'number' ? '0' : 'Type here...';

    // Add button
    const button = document.createElement('button');
    button.className = 'btn-add';
    button.innerHTML = '<i class="ti ti-plus"></i> Add';
    button.dataset.cardId = item.stateKey;
    button.dataset.inputType = item.inputType || 'text';

    inputRow.appendChild(input);
    inputRow.appendChild(button);
    group.appendChild(inputRow);

    // Render chips if there are values
    const values = state.inputs[item.stateKey] || [];
    if (values.length > 0) {
        const chipList = renderChips(item.stateKey, values);
        group.appendChild(chipList);
    }

    return group;
}

/**
 * Render a search item (searchable dropdown with chips)
 * @param {Object} item - The search item
 * @param {Object} state - The current application state
 * @returns {HTMLElement} Search group element
 */
function renderSearch(item, state) {
    const group = document.createElement('div');
    group.className = 'search-group';

    // Label
    const label = document.createElement('label');
    label.className = 'search-label';
    label.textContent = item.label;
    group.appendChild(label);

    // Search input container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';

    // Search input
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'search-input';
    input.placeholder = 'Type to search...';
    input.autocomplete = 'off';

    // Dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown';

    // Populate dropdown with options
    item.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'search-option';
        optionElement.textContent = option;
        optionElement.dataset.value = option;
        optionElement.dataset.cardId = item.stateKey;
        dropdown.appendChild(optionElement);
    });

    searchContainer.appendChild(input);
    searchContainer.appendChild(dropdown);
    group.appendChild(searchContainer);

    // Render chips if there are values
    const values = state.inputs[item.stateKey] || [];
    if (values.length > 0) {
        const chipList = renderChips(item.stateKey, values);
        group.appendChild(chipList);
    }

    return group;
}

/**
 * Render a list of chips with delete buttons
 * @param {string} stateKey - The state key for these chips
 * @param {Array} values - The array of values to display as chips
 * @returns {HTMLElement} Chip list element
 */
function renderChips(stateKey, values) {
    const chipList = document.createElement('div');
    chipList.className = 'chip-list';

    values.forEach((value, index) => {
        const chip = document.createElement('div');
        chip.className = 'chip';

        const chipText = document.createElement('span');
        chipText.className = 'chip-text';
        chipText.textContent = value;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'chip-delete';
        deleteBtn.innerHTML = '<i class="ti ti-x"></i>';
        deleteBtn.dataset.cardId = stateKey;
        deleteBtn.dataset.index = index;
        deleteBtn.setAttribute('aria-label', 'Remove');

        chip.appendChild(chipText);
        chip.appendChild(deleteBtn);
        chipList.appendChild(chip);
    });

    return chipList;
}

/**
 * Interpolate variables in content text
 * @param {string} text - The text with ${variable} placeholders
 * @param {Object} state - The current application state
 * @returns {string} Interpolated text
 */
function interpolateContent(text, state) {
    if (!text || typeof text !== 'string') return text || '';

    return text.replace(/\$\{([\w-]+)\}/g, (match, varName) => {
        // Try getVariable first (for special variables like 'name')
        if (typeof getVariable === 'function') {
            const value = getVariable(varName);
            if (value) return value;
        }

        // Try direct state.inputs lookup with hyphenated key
        if (state.inputs[varName] && state.inputs[varName][0]) {
            return state.inputs[varName][0];
        }

        // Return original placeholder if not found
        return match;
    });
}

/**
 * Filter search dropdown options based on query
 * @param {HTMLElement} dropdown - The dropdown element
 * @param {string} query - The search query
 */
function filterSearchOptions(dropdown, query) {
    const options = dropdown.querySelectorAll('.search-option');
    const lowerQuery = query.toLowerCase();

    let visibleCount = 0;

    options.forEach(option => {
        const text = option.textContent.toLowerCase();

        if (text.includes(lowerQuery)) {
            option.style.display = 'block';
            visibleCount++;
        } else {
            option.style.display = 'none';
        }
    });

    // Show "no results" message if needed
    let noResults = dropdown.querySelector('.no-results');

    if (visibleCount === 0) {
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.className = 'search-option no-results';
            noResults.textContent = 'No results found';
            dropdown.appendChild(noResults);
        }
        noResults.style.display = 'block';
    } else if (noResults) {
        noResults.style.display = 'none';
    }
}

/**
 * Handle add entry from input field
 * @param {string} cardId - The card/state key
 * @param {string} inputType - The input type (text or number)
 */
function handleAddEntry(cardId, inputType) {
    const input = document.getElementById(`input-${cardId}`);
    if (!input) return;

    let value = input.value.trim();
    if (!value) return;

    // Convert to number if needed
    if (inputType === 'number') {
        value = parseFloat(value);
        if (isNaN(value)) return;
    }

    // Add the entry using state management function
    if (typeof addEntry === 'function') {
        addEntry(cardId, value);
    }

    // Clear the input
    input.value = '';
}
