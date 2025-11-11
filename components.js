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

    // Group cards by section and subsection
    sections.forEach(section => {
        // Filter cards for this section
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

        // If section has subsections, group cards by subsection
        if (section.subsections && section.subsections.length > 0) {
            section.subsections.forEach(subsection => {
                // Filter cards for this subsection
                const subsectionCards = sectionCards.filter(card => card.subsection === subsection.id);

                if (subsectionCards.length === 0) return;

                // Render subsection header
                const subsectionHeader = renderSectionHeader(subsection.name, subsection.id, true);
                container.appendChild(subsectionHeader);

                // Render each card in the subsection
                subsectionCards.forEach(card => {
                    const cardElement = renderCard(card, state);
                    if (cardElement) {
                        container.appendChild(cardElement);
                    }
                });
            });
        } else {
            // No subsections, render cards directly
            sectionCards.forEach(card => {
                const cardElement = renderCard(card, state);
                if (cardElement) {
                    container.appendChild(cardElement);
                }
            });
        }
    });
}

/**
 * Render a section header
 * @param {string} sectionName - The display name of the section
 * @param {string} sectionId - The ID of the section for scrolling
 * @param {boolean} isSubsection - Whether this is a subsection header
 * @returns {HTMLElement} Section header element
 */
function renderSectionHeader(sectionName, sectionId, isSubsection = false) {
    const header = document.createElement(isSubsection ? 'h3' : 'h2');
    header.className = isSubsection ? 'subsection-header' : 'section-header';
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
    const card = document.createElement('article');
    card.dataset.cardId = cardDef.id;

    // Check if card has any input items
    const hasInputs = cardDef.items.some(item =>
        item.type === 'input' || item.type === 'search'
    );

    // Determine if card is completed
    let isCompleted = false;

    if (hasInputs) {
        // Auto-complete if any input/search field has at least one entry
        isCompleted = cardDef.items.some(item => {
            if (item.type === 'input' || item.type === 'search') {
                const values = state.inputs[item.stateKey] || [];
                return values.length > 0;
            }
            return false;
        });

        // Update state to reflect auto-completion
        if (isCompleted && !state.completed[cardDef.id]) {
            state.completed[cardDef.id] = true;
        } else if (!isCompleted && state.completed[cardDef.id]) {
            state.completed[cardDef.id] = false;
        }
    } else {
        // Manual completion for cards without inputs
        isCompleted = state.completed[cardDef.id] || false;
    }

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
        case 'diagram-link':
            return renderDiagramLink(item, state);
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
    label.htmlFor = `input-${item.stateKey}`;
    group.appendChild(label);

    // Input row (input + button) with role="group"
    const inputRow = document.createElement('div');
    inputRow.className = 'input-row';
    inputRow.setAttribute('role', 'group');

    // Input field (or textarea for multiline)
    let input;
    if (item.multiline) {
        input = document.createElement('textarea');
        input.rows = 4;
    } else {
        input = document.createElement('input');
        input.type = item.inputType || 'text';
    }
    input.className = 'input-field';
    input.id = `input-${item.stateKey}`;
    input.placeholder = item.inputType === 'number' ? '0' : 'Type here...';

    // For single value fields, populate with existing value
    if (item.singleValue && state.inputs[item.stateKey] && state.inputs[item.stateKey].length > 0) {
        input.value = state.inputs[item.stateKey][0];
    }

    // Add/Save button
    const button = document.createElement('button');
    button.className = 'btn-add';
    if (item.singleValue) {
        button.innerHTML = '<i class="ti ti-device-floppy"></i> Save';
        button.dataset.singleValue = 'true';
    } else {
        button.innerHTML = '<i class="ti ti-plus"></i> Add';
    }
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
 * Render drug information for selected medications
 * @param {Array} selectedMeds - Array of selected medication names
 * @param {Array} options - Array of medication option objects
 * @returns {HTMLElement} Drug info container element
 */
function renderDrugInfo(selectedMeds, options) {
    const container = document.createElement('div');
    container.className = 'drug-info-container';

    selectedMeds.forEach(medName => {
        // Skip "None" and "Other" - they don't have drug info
        if (medName === 'None' || medName === 'Other') return;

        // Find the medication object from options
        const medOption = options.find(opt =>
            typeof opt === 'object' && opt.name === medName
        );

        if (medOption && (medOption.role || medOption.dosage)) {
            const infoBox = document.createElement('div');
            infoBox.className = 'drug-info-box';

            const medHeader = document.createElement('div');
            medHeader.className = 'drug-info-header';
            medHeader.textContent = medName;
            infoBox.appendChild(medHeader);

            if (medOption.role) {
                const roleText = document.createElement('div');
                roleText.className = 'drug-info-text';
                roleText.textContent = medOption.role;
                infoBox.appendChild(roleText);
            }

            if (medOption.dosage) {
                const dosageText = document.createElement('div');
                dosageText.className = 'drug-info-text';
                dosageText.textContent = `Standard dosage: ${medOption.dosage}`;
                infoBox.appendChild(dosageText);
            }

            container.appendChild(infoBox);
        }
    });

    return container;
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
    input.type = 'search';
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

        // Handle both string and object options
        if (typeof option === 'object' && option !== null) {
            optionElement.textContent = option.name;
            optionElement.dataset.value = option.name;
            optionElement.dataset.role = option.role || '';
            optionElement.dataset.dosage = option.dosage || '';
        } else {
            optionElement.textContent = option;
            optionElement.dataset.value = option;
        }

        optionElement.dataset.cardId = item.stateKey;
        if (item.singleValue) {
            optionElement.dataset.singleValue = 'true';
        }
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

    // Render drug information if medications are selected
    if (values.length > 0 && item.stateKey === 'mh-medication') {
        const drugInfo = renderDrugInfo(values, item.options);
        group.appendChild(drugInfo);
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
 * Render a diagram link (button that opens CBT diagram in new tab)
 * @param {Object} item - The diagram link item
 * @param {Object} state - The current application state
 * @returns {HTMLElement} Diagram link element
 */
function renderDiagramLink(item, state) {
    const div = document.createElement('div');
    div.className = 'direction';

    const button = document.createElement('button');
    button.className = 'btn';
    button.innerHTML = `<i class="ti ti-external-link"></i> ${item.label}`;
    button.onclick = () => openCBTDiagram(state);

    div.appendChild(button);
    return div;
}

/**
 * Open CBT cycle diagram in a new tab
 * @param {Object} state - The current application state
 */
function openCBTDiagram(state) {
    // Get patient symptoms
    const sensations = (state.inputs['sensations'] || []).join(', ') || 'Physical sensations';
    const behaviours = (state.inputs['behaviours'] || []).join(', ') || 'Behaviours';
    const thoughts = (state.inputs['thoughts'] || []).join(', ') || 'Thoughts';

    // Generate HTML for diagram
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CBT Cycle Diagram</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #1a1a1a;
            font-family: system-ui, -apple-system, sans-serif;
        }
        svg {
            max-width: 800px;
            width: 100%;
            height: auto;
        }
        text {
            font-family: system-ui, -apple-system, sans-serif;
        }
    </style>
</head>
<body>
    <svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
        <!-- Connection lines -->
        <line x1="400" y1="150" x2="250" y2="450" stroke="#888" stroke-width="2" />
        <line x1="550" y1="450" x2="250" y2="450" stroke="#888" stroke-width="2" />
        <line x1="400" y1="150" x2="550" y2="450" stroke="#888" stroke-width="2" />

        <!-- Thoughts circle (top) -->
        <circle cx="400" cy="150" r="120" fill="#2c3e50" stroke="#3498db" stroke-width="3" />
        <text x="400" y="130" text-anchor="middle" fill="#3498db" font-size="18" font-weight="bold">Thoughts</text>
        <text x="400" y="155" text-anchor="middle" fill="#fff" font-size="14" style="max-width: 200px;">
            <tspan x="400" dy="0">${thoughts.substring(0, 30)}</tspan>
            ${thoughts.length > 30 ? `<tspan x="400" dy="20">${thoughts.substring(30, 60)}</tspan>` : ''}
        </text>

        <!-- Sensations circle (bottom left) -->
        <circle cx="250" cy="450" r="120" fill="#2c3e50" stroke="#e74c3c" stroke-width="3" />
        <text x="250" y="430" text-anchor="middle" fill="#e74c3c" font-size="18" font-weight="bold">Sensations</text>
        <text x="250" y="455" text-anchor="middle" fill="#fff" font-size="14">
            <tspan x="250" dy="0">${sensations.substring(0, 30)}</tspan>
            ${sensations.length > 30 ? `<tspan x="250" dy="20">${sensations.substring(30, 60)}</tspan>` : ''}
        </text>

        <!-- Behaviours circle (bottom right) -->
        <circle cx="550" cy="450" r="120" fill="#2c3e50" stroke="#2ecc71" stroke-width="3" />
        <text x="550" y="430" text-anchor="middle" fill="#2ecc71" font-size="18" font-weight="bold">Behaviours</text>
        <text x="550" y="455" text-anchor="middle" fill="#fff" font-size="14">
            <tspan x="550" dy="0">${behaviours.substring(0, 30)}</tspan>
            ${behaviours.length > 30 ? `<tspan x="550" dy="20">${behaviours.substring(30, 60)}</tspan>` : ''}
        </text>

        <!-- Title -->
        <text x="400" y="630" text-anchor="middle" fill="#fff" font-size="24" font-weight="bold">CBT Cycle</text>
    </svg>
</body>
</html>
    `.trim();

    // Open in new tab
    const newTab = window.open();
    if (newTab) {
        newTab.document.write(html);
        newTab.document.close();
    } else {
        alert('Please allow popups to view the CBT diagram.');
    }
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
 * @param {boolean} singleValue - If true, replaces existing value instead of adding
 */
function handleAddEntry(cardId, inputType, singleValue = false) {
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
        addEntry(cardId, value, singleValue);
    }

    // Clear the input
    input.value = '';
}
