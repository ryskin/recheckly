# NutriGuide to Recheckly Conversion Guide

## Overview

This guide shows how to convert NutriGuide's onboarding test plan to Recheckly's test case format.

## Conversion Pattern

### ID Naming Convention

**NutriGuide Format**: `TC-OB-001`, `TC-OB-002`, etc.
**Recheckly Format**: `RC-ONBOARDING-001`, `RC-ONBOARDING-002`, etc.

**Pattern**: `TC-OB-XXX` → `RC-ONBOARDING-XXX`

### Module Assignment

All NutriGuide onboarding tests should be assigned to the **"Onboarding"** module in Recheckly.

### Fields Mapping

| NutriGuide Field | Recheckly Field | Notes |
|------------------|-----------------|-------|
| Test Case ID | ID | Convert format (see above) |
| Test Name | Title | Keep as-is or simplify |
| Priority | Priority | Map to P0/P1/P2/P3 |
| Type | Type | functional, ui, integration, etc. |
| Preconditions | Prerequisites | Not stored in TestCase, add to first step if needed |
| Test Steps | Steps | Convert to array of {n, action, expected} |
| Expected Result | Steps[].expected | Map to each step's expected result |
| Persona | Title or separate field | Can include in title or create separate test per persona |

### Priority Mapping

| NutriGuide | Recheckly | Description |
|------------|-----------|-------------|
| Critical | P0 | Core functionality, blocks release |
| High | P1 | Important features, should work |
| Medium | P2 | Nice to have, can be deferred |
| Low | P3 | Edge cases, cosmetic issues |

### Type Mapping

| NutriGuide Test Type | Recheckly Type |
|---------------------|----------------|
| Functional | functional |
| UI/UX | ui |
| Integration | integration |
| Validation | negative |
| E2E | e2e |

## Example Conversions

### Example 1: Language Selection

**NutriGuide Format**:
```
TC-OB-001: Language Selection - Default Language
Priority: High
Type: Functional
Preconditions: App installed, first launch
Steps:
1. Launch app
2. Observe language selection screen
3. Verify English is pre-selected
4. Tap Continue
Expected: App displays English UI, proceeds to Welcome screen
```

**Recheckly CSV Format**:
```csv
RC-ONBOARDING-001,Language Selection - Default Language,P1,functional,Onboarding,App installed and first launch,"1. Launch app | 2. Observe language selection screen | 3. Verify English is pre-selected | 4. Tap Continue","Language selection screen appears | English is pre-selected by default | Continue button enabled | App displays English UI | Proceeds to Welcome screen"
```

### Example 2: Age Input Validation

**NutriGuide Format**:
```
TC-OB-015: Age Input - Invalid Range (under 13)
Priority: Critical
Type: Validation
Preconditions: User at Age Input screen
Steps:
1. Enter age: 10
2. Tap Continue
3. Observe validation
Expected: Error message "Must be 13 or older", cannot proceed
```

**Recheckly CSV Format**:
```csv
RC-ONBOARDING-015,Age Input - Invalid Range (under 13),P0,negative,Onboarding,User at Age Input screen,"1. Enter age: 10 | 2. Tap Continue | 3. Observe validation","Age input field accepts value | Error message appears: 'Must be 13 or older' | Continue button disabled | Cannot proceed to next screen"
```

### Example 3: Multi-Screen Flow

**NutriGuide Format**:
```
TC-OB-090: Complete Onboarding - Muscle Gain Persona
Priority: Critical
Type: E2E
Preconditions: Fresh app install
Steps:
1. Select Language: English
2. View Welcome screens (3)
3. Enter Age: 25
4. Select Gender: Male
5. Select Goal: Muscle Gain
6. Select Activity: Moderate
7. Enter Weight: 70kg
8. Enter Height: 175cm
9. Select Diet: No restrictions
10. Complete onboarding
Expected: Profile created, redirected to Dashboard with Muscle Gain recommendations
```

**Recheckly CSV Format**:
```csv
RC-ONBOARDING-090,Complete Onboarding - Muscle Gain Persona,P0,e2e,Onboarding,Fresh app install,"1. Select Language: English | 2. View Welcome screens (3) | 3. Enter Age: 25 | 4. Select Gender: Male | 5. Select Goal: Muscle Gain | 6. Select Activity: Moderate | 7. Enter Weight: 70kg | 8. Enter Height: 175cm | 9. Select Diet: No restrictions | 10. Complete onboarding","Language selected successfully | Welcome screens display correctly with swipe navigation | Age accepted and validated | Gender selection saved | Muscle Gain goal selected | Activity level saved | Weight input validated | Height input validated | Diet preference saved | Profile created in database | User redirected to Dashboard | Dashboard shows Muscle Gain specific recommendations and macros"
```

## CSV File Format

### Header Row
```csv
ID,Title,Priority,Type,Module,Prerequisites,Steps,Expected Result
```

### Field Formatting Rules

1. **ID**: Simple string, no quotes needed (e.g., `RC-ONBOARDING-001`)
2. **Title**: Descriptive name (quote if contains commas)
3. **Priority**: P0, P1, P2, or P3
4. **Type**: functional, ui, integration, negative, e2e, etc.
5. **Module**: Always "Onboarding" for these tests
6. **Prerequisites**: Brief description or "None"
7. **Steps**: Pipe-separated list in quotes: `"1. Step one | 2. Step two | 3. Step three"`
8. **Expected Result**: Pipe-separated expected outcomes matching each step: `"Result one | Result two | Result three"`

### Important Notes

- Use **pipe separator `|`** for multiple steps/results (NOT newlines)
- Wrap Steps and Expected Result fields in **double quotes**
- Each step should have a corresponding expected result
- Steps format: `"1. Action | 2. Action | 3. Action"`
- Expected format: `"Result 1 | Result 2 | Result 3"`

## Persona-Based Testing

NutriGuide has 10 personas. You can handle them in two ways:

### Option 1: Separate Test Cases per Persona
Create individual test cases for critical personas:
- `RC-ONBOARDING-091`: Complete Onboarding - Weight Loss Persona
- `RC-ONBOARDING-092`: Complete Onboarding - Muscle Gain Persona
- `RC-ONBOARDING-093`: Complete Onboarding - General Health Persona

### Option 2: Single Test with Data Variations
Create one test case with test data for all personas, document variations in Steps field or notes.

## Import Process

1. **Create CSV file** with converted tests (use template above)
2. **Save to `/public/nutriguide-onboarding.csv`** for Demo Data loading OR
3. **Upload via Import CSV button** on /cases page
4. **Preview** imported tests in modal
5. **Confirm** to add to Recheckly

## Quick Conversion Checklist

- [ ] Convert ID: TC-OB-XXX → RC-ONBOARDING-XXX
- [ ] Set Module: "Onboarding"
- [ ] Map Priority: Critical→P0, High→P1, Medium→P2, Low→P3
- [ ] Map Type: functional, ui, integration, negative, e2e
- [ ] Convert Steps to pipe-separated format: "1. Step | 2. Step"
- [ ] Convert Expected Results to pipe-separated: "Result | Result"
- [ ] Ensure Steps and Expected Results have same number of items
- [ ] Wrap Steps and Expected Result in double quotes
- [ ] Save as CSV with proper escaping

## Example Full CSV File

See `/docs/nutriguide-onboarding-sample.csv` for a complete example with 10 converted test cases.
