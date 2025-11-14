# README Accuracy Analysis

**Date**: 2025-11-12  
**Purpose**: Document discrepancies between README.md and the actual application implementation

---

## Executive Summary

A comprehensive review of the README.md documentation against the actual application code revealed **13 discrepancies**, including 3 major issues, 8 minor issues, and 2 typos. The most significant finding is that the application uses the Pico CSS framework, contrary to the README's statement about minimal custom styling.

---

## Discrepancies

### 1. CSS Framework Usage ⚠️ MAJOR

**README States** (Line 7):
> "Visually, the application should be barebones. No fancy CSS, just a simple dark aesthetic with minimal complexity and styling."

**Actual Implementation** (`index.html`, line 10):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
```

**Impact**: The README suggests building with minimal custom CSS, but the application actually uses the Pico CSS framework, which is a complete CSS library with extensive styling.

**Recommendation**: Update README line 7 to acknowledge the use of Pico CSS framework.

---

### 2. PHQ/GAD Score Interpretation Card ⚠️ MAJOR

**README States** (Lines 169-179):
> "The content of this card varies based on the value of `phqScore` and `gadScore`. The threshold scores for each battery are common knowledge."
>
> Includes detailed conditional verbatim for:
> - Sub-clinical scores
> - Mild scores  
> - Moderate scores
> - Severe scores

**Actual Implementation**: 
No card in `cards.js` implements this conditional score interpretation logic. The scores are collected but no feedback is automatically generated based on thresholds.

**Impact**: A key assessment feature described in the README is not implemented.

**Recommendation**: Either implement the score interpretation card or clarify in README that this is a planned feature.

---

### 3. Treatment-Specific Verbatim Scripts ⚠️ MAJOR

**README States** (Lines 391-393):
> "V for LiCBT: I think the treatment you would find most helpful is something called guided self-help, which is a form of CBT..."
>
> "V for HiCBT: I think the treatment you would find most helpful is something called High-Intensity Cognitive Behavioural Therapy..."

**Actual Implementation**: 
No conditional verbatim content based on treatment selection found in `cards.js`. The treatment selection exists but doesn't trigger different explanation scripts.

**Impact**: Treatment-specific explanations are not provided as described.

**Recommendation**: Implement conditional verbatim or clarify this is a planned feature.

---

### 4. Identity Question Wording

**README States** (Line 263):
> "I'd like to ask you about aspects of your identity that might be relevant to your presentation. This could include things like neurodivergence, ethnicity, faith, sexuality, or gender - whichever feels important to you."

**Actual Implementation** (`cards.js`, line 291):
> "Are there any aspects of your identity that might be relevant to your treatment? This could include things like neurodivergence, ethnicity, faith, sexuality..."

**Differences**:
- "presentation" → "treatment"
- "or gender - whichever feels important to you" omitted
- Added question mark

**Recommendation**: Sync wording between README and implementation.

---

### 5. Substance Use Section - Typo in README

**README States** (Line 308):
> "Caffiene consumption"

**Actual Implementation** (`cards.js`, line 356):
> "Caffeine consumption" ✓ Correct

**Impact**: Typo in README that was fixed in implementation.

**Recommendation**: Fix typo in README: "Caffiene" → "Caffeine"

---

### 6. Problem Statement Grammar Error

**README States** (Line 431):
> "its very useful"

**Actual Implementation** (`cards.js`, line 507):
> "its very useful"

**Impact**: Grammar error present in both README and code (missing apostrophe).

**Recommendation**: Fix in both places: "its" → "it's"

---

### 7. Safety Information Sheet Card Order

**README Structure** (Lines 223-226):
1. Safety assessment questions
2. Give safety information sheet ← Earlier
3. Confirm PHQ-9 Q9 score
4. Summarize safety assessment
5. Safety plan required?

**Actual Implementation** (`cards.js`):
1. Safety assessment questions
2. Confirm PHQ-9 Q9 score
3. Summarize safety assessment  
4. Safety plan required?
5. Safety plan fields (conditional)
6. Give safety information sheet ← Later

**Impact**: Order of operations differs.

**Recommendation**: Update README to match actual implementation order.

---

### 8. Problem Statement Summary Format

**README States** (Line 437):
> "{Embed the patient's readonly answers to questions in the problem, symptoms, impacts and goals sections here for quick reference}"

**Actual Implementation** (`cards.js`, line 510):
Shows as a single paragraph with interpolated variables:
```
"Summary for reference - Problem: ${core-problem}, Symptoms: ${sensations}, ${behaviours}, ${thoughts}, Impacts: ${impact-work}, ${impact-home}, Goals: ${goals}"
```

**Impact**: Implementation shows inline summary text rather than embedded form fields.

**Recommendation**: Clarify format in README.

---

### 9. Treatment Decision Table Presentation

**README States** (Lines 369-384):
Detailed table with specific treatment criteria for each diagnosis (Depression, GAD, Panic Disorder, etc.)

**Actual Implementation** (`cards.js`, line 446):
```javascript
{ type: "direction", content: "Treatment decision guidance: Consider impact severity" }
```

**Impact**: Detailed decision-making table simplified to general guidance.

**Recommendation**: Clarify that the table is for reference only, not embedded in the app.

---

### 10. Variable Naming Convention

**README Example**: `${phq9q9score}` (camelCase)

**Actual Implementation**: State key is `"phq9-q9"` (kebab-case)

**Impact**: Minor inconsistency in naming convention examples.

**Recommendation**: Use consistent kebab-case examples in README.

---

### 11. Sidebar Subsection Styling

**README States** (Line 11):
> "Below the timer is an outline of the assessment structure, with a line of text for each section and subsection"

**Actual Implementation**:
Subsections use CSS class `sidebar-subitem` for visual indentation/distinction.

**Impact**: Visual distinction between sections and subsections not mentioned.

**Recommendation**: Note that subsections are visually distinguished in the sidebar.

---

### 12-13. Minor Wording Variations

Additional minor text differences between README examples and actual implementation (functionally equivalent).

---

## Summary Statistics

| Category | Count |
|----------|-------|
| **Total Discrepancies** | 13 |
| **Major** | 3 |
| **Minor** | 8 |
| **Typos** | 2 |
| **Missing Features** | 2 |

---

## Recommendations

### Priority 1 (Major Updates)
1. ✅ Update README to acknowledge Pico CSS framework usage
2. ✅ Clarify that PHQ/GAD score interpretation is not yet implemented
3. ✅ Clarify that treatment-specific verbatim scripts are not yet implemented

### Priority 2 (Corrections)
4. ✅ Fix "Caffiene" → "Caffeine" typo
5. ✅ Fix "its" → "it's" grammar error  
6. ✅ Update safety card ordering to match implementation

### Priority 3 (Clarifications)
7. ✅ Sync identity question wording
8. ✅ Clarify problem statement summary format
9. ✅ Note that treatment decision table is reference material, not embedded
10. ✅ Use consistent kebab-case for variable examples

---

## Conclusion

The application is well-implemented and functional. The README is largely accurate but contains some descriptions of features that are not yet implemented (score interpretation, treatment-specific verbatim) and uses slightly different wording in places. The most significant discrepancy is the undocumented use of the Pico CSS framework.

The README should be updated to accurately reflect the current implementation state and clarify which features are planned for future development.
