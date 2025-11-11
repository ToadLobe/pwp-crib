/**
 * PWP Assessment Tool - Medication Data
 * Centralized medication information and options
 */

/**
 * Mental health medication database
 * Contains name, clinical role, and standard dosage information
 */
const medications = [
    { name: "None", role: "", dosage: "" },
    // SSRIs
    { name: "Sertraline", role: "SSRI antidepressant", dosage: "50-200mg daily" },
    { name: "Citalopram", role: "SSRI antidepressant", dosage: "20-40mg daily" },
    { name: "Fluoxetine", role: "SSRI antidepressant", dosage: "20-80mg daily" },
    { name: "Escitalopram", role: "SSRI antidepressant", dosage: "10-20mg daily" },
    { name: "Paroxetine", role: "SSRI antidepressant", dosage: "20-50mg daily" },
    // SNRIs
    { name: "Venlafaxine", role: "SNRI antidepressant", dosage: "75-225mg daily" },
    { name: "Duloxetine", role: "SNRI antidepressant", dosage: "60-120mg daily" },
    // Other antidepressants
    { name: "Mirtazapine", role: "Atypical antidepressant", dosage: "15-45mg nightly" },
    { name: "Amitriptyline", role: "Tricyclic antidepressant", dosage: "50-200mg daily" },
    // Anxiety medications
    { name: "Propranolol", role: "Beta-blocker for anxiety", dosage: "40-160mg daily" },
    { name: "Diazepam", role: "Benzodiazepine for anxiety", dosage: "2-10mg as needed" },
    { name: "Lorazepam", role: "Benzodiazepine for anxiety", dosage: "0.5-2mg as needed" },
    // Antipsychotics
    { name: "Quetiapine", role: "Atypical antipsychotic", dosage: "25-300mg daily" },
    { name: "Olanzapine", role: "Atypical antipsychotic", dosage: "5-20mg daily" },
    // Other
    { name: "Other", role: "", dosage: "" }
];

/**
 * Get medication by name
 * @param {string} name - The medication name
 * @returns {Object|null} Medication object or null if not found
 */
function getMedicationByName(name) {
    return medications.find(med => med.name === name) || null;
}

/**
 * Check if a medication has detailed information (role/dosage)
 * @param {string} name - The medication name
 * @returns {boolean} True if medication has info to display
 */
function hasMedicationInfo(name) {
    const med = getMedicationByName(name);
    return med && (med.role || med.dosage);
}

/**
 * Get all medication options for search dropdown
 * @returns {Array} Array of medication objects
 */
function getMedicationOptions() {
    return medications;
}
