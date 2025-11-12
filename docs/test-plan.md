# Recheckly Test Plan

**Version**: 1.0
**Last Updated**: 2025-11-12
**Author**: QA Team
**Product**: Recheckly - Web-based Test Management System

---

## Table of Contents

1. [Overview](#overview)
2. [Test Strategy](#test-strategy)
3. [Test Organization](#test-organization)
4. [Smoke Tests](#smoke-tests)
5. [Module Tests](#module-tests)
   - [Test Cases Module](#test-cases-module)
   - [Test Suites Module](#test-suites-module)
   - [Test Runs Module](#test-runs-module)
   - [Dashboard Module](#dashboard-module)
6. [Cross-Functional Tests](#cross-functional-tests)
7. [Non-Functional Tests](#non-functional-tests)
8. [Testing Schedule](#testing-schedule)
9. [Test Metrics](#test-metrics)

---

## Overview

### Purpose
This test plan defines the comprehensive testing strategy for Recheckly, a modern web-based test management system built with Next.js 16, TypeScript, and Tailwind CSS.

### Scope
- **In Scope**: Web UI, test case management, test suite organization, test run execution, reporting
- **Out of Scope**: Mobile native apps, API testing (separate plan), performance testing >10k test cases

### Test Environment
- **Frontend**: Next.js 16.0.1, React 19.2.0, TypeScript, Tailwind CSS v4
- **Browsers**: Chrome 120+, Firefox 120+, Safari 17+, Edge 120+
- **Devices**: Desktop (1920x1080, 1440x900), Tablet (768x1024), Mobile (375x667)
- **Base URL**: http://localhost:3000 (dev), https://recheckly.app (prod)

### Test Data
- **Valid Test Case**: Title (3-200 chars), Priority (P0-P3), Type (Functional/UI/API/etc), Steps (1-50)
- **Valid Test Suite**: Name (3-100 chars), Description (optional), Cases (1-500)
- **Valid Test Run**: Name (3-100 chars), Cases (1-100), Statuses (Passed/Failed/Skipped/Blocked)

---

## Test Strategy

### Testing Levels
1. **Smoke Testing** (15 min, daily): Critical path validation
2. **Functional Testing** (2-4 hours, per feature): Module-specific scenarios
3. **Integration Testing** (1-2 hours, weekly): Cross-module workflows
4. **Regression Testing** (4-6 hours, before release): Full test suite
5. **UAT** (ongoing): User acceptance validation

### Test Prioritization
- **P0 (Critical)**: Blocker bugs, data loss, security issues - must fix immediately
- **P1 (High)**: Core functionality broken, affects majority of users - fix in current sprint
- **P2 (Medium)**: Feature partially working, workaround exists - fix in next sprint
- **P3 (Low)**: Minor UI issues, edge cases - fix when time permits

### Test Coverage Goals
- **Smoke Tests**: 100% pass rate required
- **Functional Tests**: 95% pass rate
- **Integration Tests**: 90% pass rate
- **UI/UX Tests**: 85% pass rate

---

## Test Organization

### Naming Convention

```
RC-[MODULE]-[NUMBER]
```

**Modules**:
- **SMOKE**: Smoke tests (critical path)
- **CASES**: Test Cases module
- **SUITES**: Test Suites module
- **RUNS**: Test Runs module
- **DASH**: Dashboard module
- **UI**: UI/UX tests (cross-module)
- **INT**: Integration tests
- **PERF**: Performance tests
- **A11Y**: Accessibility tests

**Example**: `RC-CASES-015` = Test Cases module, test #15

### Test Attributes

Each test case includes:
- **ID**: Unique identifier (e.g., RC-CASES-001)
- **Title**: Brief description
- **Priority**: P0/P1/P2/P3
- **Type**: Functional/UI/Integration/Performance/Security
- **Module**: Test Cases/Suites/Runs/Dashboard/etc.
- **Prerequisites**: Setup steps (if any)
- **Test Data**: Input values
- **Steps**: Numbered action steps
- **Expected Result**: Detailed expected outcome
- **Actual Result**: Filled during execution
- **Status**: Not Run/Passed/Failed/Blocked/Skipped
- **Notes**: Additional observations

---

## Smoke Tests

**Frequency**: Daily (before standups)
**Duration**: 15 minutes
**Goal**: Verify critical user journeys work

### RC-SMOKE-001: Create and Delete Test Case
**Priority**: P0
**Type**: Functional

**Prerequisites**: None

**Steps**:
1. Navigate to /cases
2. Click "New Case" button
3. Enter title: "Smoke Test Case"
4. Select priority: P1
5. Select type: Functional
6. Add step: Action "Click login", Expected "User logged in"
7. Click Save
8. Locate the created case in the list
9. Click Delete (trash icon)
10. Confirm deletion

**Expected Result**:
- [ ] Case created successfully
- [ ] Case appears in grid layout
- [ ] Case deleted successfully
- [ ] Case removed from list
- [ ] Stats updated (Total cases decremented)

---

### RC-SMOKE-002: Edit Test Case
**Priority**: P0
**Type**: Functional

**Prerequisites**: At least 1 test case exists

**Steps**:
1. Navigate to /cases
2. Hover over any test case
3. Click Edit (pencil icon)
4. Change title to "Edited Title"
5. Add new step: Action "Logout", Expected "User logged out"
6. Click Save

**Expected Result**:
- [ ] Edit modal opens
- [ ] Changes saved successfully
- [ ] Title updated in grid
- [ ] New step visible in preview
- [ ] Edit modal closes

---

### RC-SMOKE-003: Copy Test Case
**Priority**: P0
**Type**: Functional

**Prerequisites**: At least 1 test case exists

**Steps**:
1. Navigate to /cases
2. Hover over any test case
3. Click Copy (copy icon)
4. Observe the grid

**Expected Result**:
- [ ] New case created with "(копия)" suffix
- [ ] Copy appears at top of grid
- [ ] All fields copied (priority, type, steps)
- [ ] New unique ID assigned
- [ ] Stats updated (Total cases incremented)

---

### RC-SMOKE-004: Grid Layout Display
**Priority**: P1
**Type**: UI

**Prerequisites**: At least 6 test cases exist

**Steps**:
1. Navigate to /cases
2. View on desktop (1920x1080)
3. Resize to tablet width (768px)
4. Resize to mobile width (375px)

**Expected Result**:
- [ ] Desktop: 3 columns displayed
- [ ] Tablet: 2 columns displayed
- [ ] Mobile: 1 column displayed
- [ ] Cards have consistent height
- [ ] Hover effects work on all screen sizes

---

### RC-SMOKE-005: Create Test Suite
**Priority**: P0
**Type**: Functional

**Prerequisites**: At least 3 test cases exist

**Steps**:
1. Navigate to /suites/new
2. Enter suite name: "Smoke Suite"
3. Enter description: "Test suite for smoke tests"
4. Select 3 test cases using checkboxes
5. Click Save

**Expected Result**:
- [ ] Suite created successfully
- [ ] Selected cases summary shown
- [ ] Redirected to /suites page (or success message)
- [ ] Suite appears in suites list

---

### RC-SMOKE-006: Create and Execute Test Run
**Priority**: P0
**Type**: Functional

**Prerequisites**: At least 1 test suite exists

**Steps**:
1. Navigate to /dashboard/new-run
2. Enter run name: "Smoke Run"
3. Drag and drop 2 test cases into run builder
4. Click Start Run
5. Mark first case as Passed
6. Mark second case as Failed
7. Add comment: "Bug found in step 2"
8. Complete run

**Expected Result**:
- [ ] Run created successfully
- [ ] Drag-drop works smoothly
- [ ] Execution page loads
- [ ] Statuses update correctly
- [ ] Comment saved
- [ ] Progress bar shows 2/2 completed
- [ ] Results summary displayed

---

### RC-SMOKE-007: Dashboard Navigation
**Priority**: P1
**Type**: Functional

**Prerequisites**: None

**Steps**:
1. Navigate to /
2. Click "Dashboard" card
3. Observe dashboard page
4. Navigate back to home
5. Click "Test Cases" card
6. Navigate back to home
7. Click "Test Suites" card

**Expected Result**:
- [ ] All navigation links work
- [ ] No 404 errors
- [ ] Pages load within 2 seconds
- [ ] Design system consistent across pages

---

### Smoke Test Execution Checklist

Before each deployment:
- [ ] All smoke tests passed
- [ ] No P0/P1 bugs open
- [ ] Build successful
- [ ] No console errors
- [ ] Stats calculations correct

---

## Module Tests

---

## Test Cases Module

**Base URL**: `/cases`
**Total Tests**: 50
**Priority**: High

---

### 2.1. CRUD Operations (RC-CASES-001 to 020)

---

#### RC-CASES-001: Create New Test Case - Minimum Fields
**Priority**: P0
**Type**: Functional

**Prerequisites**: None

**Test Data**:
- Title: "Login Test"
- Priority: P1
- Type: Functional
- Steps: 1 step

**Steps**:
1. Navigate to /cases
2. Click "New Case" button
3. Enter title: "Login Test"
4. Select priority: P1
5. Select type: Functional
6. Add step: Action "Enter credentials", Expected "Login successful"
7. Click Save

**Expected Result**:
- [ ] Case created successfully
- [ ] Appears in grid with correct data
- [ ] Stats updated (+1 total)
- [ ] Card shows P1 badge (yellow)
- [ ] Card shows "Functional" badge (blue)

---

#### RC-CASES-002: Create New Test Case - All Fields
**Priority**: P0
**Type**: Functional

**Test Data**:
- Title: "Complete Registration Flow Test"
- Priority: P0
- Type: E2E
- Steps: 5 steps with detailed actions and expected results

**Steps**:
1. Navigate to /cases
2. Click "New Case"
3. Enter title: "Complete Registration Flow Test"
4. Select priority: P0
5. Select type: E2E
6. Add 5 steps with actions and expected results
7. Click Save

**Expected Result**:
- [ ] Case created with all fields
- [ ] All 5 steps visible in preview (first 2 shown, "+3 more")
- [ ] P0 badge shown in red
- [ ] E2E type badge displayed

---

#### RC-CASES-003: Create Test Case - Validation Errors
**Priority**: P1
**Type**: Negative Testing

**Test Data**:
- Empty title
- Title with 1 character
- Title with 201 characters
- No steps added

**Steps**:
1. Navigate to /cases
2. Click "New Case"
3. Leave title empty, click Save
4. Observe validation
5. Enter 1 character title, click Save
6. Observe validation
7. Enter 201 character title, click Save
8. Observe validation
9. Enter valid title but don't add steps, click Save
10. Observe validation

**Expected Result**:
- [ ] Empty title: Error "Title is required"
- [ ] 1 char: Error "Title must be at least 3 characters"
- [ ] 201 chars: Error "Title must be less than 200 characters"
- [ ] No steps: Error "At least 1 step is required"
- [ ] Cannot save until all validations pass

---

#### RC-CASES-004: Edit Test Case - Modify Title
**Priority**: P0
**Type**: Functional

**Prerequisites**: At least 1 test case exists

**Steps**:
1. Navigate to /cases
2. Hover over any test case
3. Click Edit (pencil icon)
4. Change title from "Old Title" to "New Title"
5. Click Save
6. Observe grid

**Expected Result**:
- [ ] Edit modal opens with current data
- [ ] Title field is editable
- [ ] Save button enabled after change
- [ ] Title updated in grid
- [ ] No duplicate cases created

---

#### RC-CASES-005: Edit Test Case - Modify Priority
**Priority**: P1
**Type**: Functional

**Prerequisites**: Test case with P1 priority exists

**Steps**:
1. Navigate to /cases
2. Find P1 test case (yellow badge)
3. Click Edit
4. Change priority from P1 to P0
5. Click Save

**Expected Result**:
- [ ] Priority dropdown shows current value (P1)
- [ ] Can change to P0
- [ ] Save successful
- [ ] Badge color changes from yellow to red
- [ ] Grid re-sorts if sorted by priority

---

#### RC-CASES-006: Edit Test Case - Add Steps
**Priority**: P1
**Type**: Functional

**Prerequisites**: Test case with 2 steps exists

**Steps**:
1. Navigate to /cases
2. Edit test case with 2 steps
3. Click "Add Step" button
4. Enter step 3: Action "Verify email", Expected "Email received"
5. Click Save

**Expected Result**:
- [ ] Current 2 steps displayed in modal
- [ ] Add Step button adds new empty step form
- [ ] Step 3 saved successfully
- [ ] Preview shows 2 steps + "1 more"

---

#### RC-CASES-007: Edit Test Case - Remove Steps
**Priority**: P1
**Type**: Functional

**Prerequisites**: Test case with 3+ steps exists

**Steps**:
1. Edit test case with 3 steps
2. Click remove icon (X) on step 2
3. Click Save

**Expected Result**:
- [ ] Step 2 removed from modal
- [ ] Steps renumbered (3 becomes 2)
- [ ] Save successful
- [ ] Preview shows updated step count

---

#### RC-CASES-008: Edit Test Case - Reorder Steps
**Priority**: P2
**Type**: Functional

**Prerequisites**: Test case with 3+ steps exists

**Steps**:
1. Edit test case with 3 steps
2. Drag step 3 to position 1
3. Click Save

**Expected Result**:
- [ ] Drag-drop works (if implemented)
- [ ] Steps renumbered correctly
- [ ] Order persisted after save
- [ ] Preview reflects new order

**Note**: If drag-drop not implemented, mark as "Blocked - Feature not available"

---

#### RC-CASES-009: Copy Test Case
**Priority**: P0
**Type**: Functional

**Prerequisites**: Test case "Login Test" exists

**Steps**:
1. Navigate to /cases
2. Locate "Login Test"
3. Hover and click Copy icon
4. Observe grid

**Expected Result**:
- [ ] New case created instantly (no modal)
- [ ] Title: "Login Test (копия)"
- [ ] All fields copied (priority, type, steps)
- [ ] Copy appears at top of grid
- [ ] Original case unchanged
- [ ] Stats +1

---

#### RC-CASES-010: Copy Test Case - Multiple Times
**Priority**: P2
**Type**: Functional

**Prerequisites**: Test case exists

**Steps**:
1. Copy same test case 3 times

**Expected Result**:
- [ ] First copy: "Title (копия)"
- [ ] Second copy: "Title (копия) (копия)"
- [ ] Third copy: "Title (копия) (копия) (копия)"
- [ ] All 3 copies have unique IDs
- [ ] Stats +3

---

#### RC-CASES-011: Delete Test Case
**Priority**: P0
**Type**: Functional

**Prerequisites**: Test case exists

**Steps**:
1. Navigate to /cases
2. Hover over test case
3. Click Delete (trash icon)
4. Confirm deletion in dialog

**Expected Result**:
- [ ] Confirmation dialog appears: "Удалить тест-кейс '[Title]'?"
- [ ] OK button deletes case
- [ ] Case removed from grid instantly
- [ ] Stats -1
- [ ] No error messages

---

#### RC-CASES-012: Delete Test Case - Cancel
**Priority**: P2
**Type**: Functional

**Prerequisites**: Test case exists

**Steps**:
1. Click Delete on a test case
2. Click Cancel in confirmation dialog

**Expected Result**:
- [ ] Dialog closes
- [ ] Case NOT deleted
- [ ] Case still visible in grid
- [ ] Stats unchanged

---

#### RC-CASES-013: Delete Last Test Case
**Priority**: P2
**Type**: Edge Case

**Prerequisites**: Exactly 1 test case exists

**Steps**:
1. Delete the only test case
2. Observe /cases page

**Expected Result**:
- [ ] Case deleted successfully
- [ ] Stats show "0 Test Cases"
- [ ] Empty state message displayed (if implemented)
- [ ] OR grid shows empty
- [ ] No errors

---

#### RC-CASES-014: Delete Test Case Used in Suite
**Priority**: P1
**Type**: Integration

**Prerequisites**: Test case exists and is added to a suite

**Steps**:
1. Delete test case that's part of a suite
2. Confirm deletion
3. Navigate to /suites
4. View the suite

**Expected Result**:
- [ ] Case deleted successfully OR
- [ ] Warning shown: "Case is used in 1 suite"
- [ ] If deleted, suite still exists but case reference removed
- [ ] OR suite shows "Case deleted" placeholder

**Note**: Behavior depends on implementation - document actual behavior

---

#### RC-CASES-015: Delete Test Case Used in Active Run
**Priority**: P0
**Type**: Integration

**Prerequisites**: Test case is part of an active test run

**Steps**:
1. Attempt to delete case in active run
2. Observe behavior

**Expected Result**:
- [ ] Deletion blocked with error: "Cannot delete - case is in active run"
- [ ] OR case marked as deleted but run preserved
- [ ] Run execution not affected

**Note**: Critical data integrity test

---

#### RC-CASES-016: Bulk Delete Test Cases
**Priority**: P2
**Type**: Functional

**Prerequisites**: Multiple test cases exist

**Steps**:
1. Select 3 test cases (if bulk selection implemented)
2. Click "Delete Selected"
3. Confirm

**Expected Result**:
- [ ] All 3 cases deleted
- [ ] Stats -3
- [ ] Confirmation shows count: "Delete 3 test cases?"

**Note**: If bulk selection not implemented, mark as "Feature not available"

---

#### RC-CASES-017: Edit Modal - Cancel Changes
**Priority**: P2
**Type**: Functional

**Prerequisites**: Test case exists

**Steps**:
1. Edit test case
2. Change title to "Modified Title"
3. Click Cancel (X or Cancel button)
4. Observe grid

**Expected Result**:
- [ ] Modal closes
- [ ] Changes NOT saved
- [ ] Original title unchanged in grid

---

#### RC-CASES-018: Edit Modal - Close Without Saving
**Priority**: P2
**Type**: Functional

**Prerequisites**: Test case exists

**Steps**:
1. Edit test case
2. Make changes
3. Click outside modal (backdrop) or press ESC

**Expected Result**:
- [ ] Unsaved changes warning shown (if implemented) OR
- [ ] Modal closes without saving
- [ ] Changes lost

---

#### RC-CASES-019: Create Case - Special Characters in Title
**Priority**: P2
**Type**: Functional

**Test Data**: Title with special chars: "Test #1: Login & Signup (V2.0)"

**Steps**:
1. Create case with title containing: #, :, &, (), .
2. Save

**Expected Result**:
- [ ] Special characters accepted
- [ ] Title displayed correctly in grid
- [ ] No encoding issues
- [ ] Search works with special chars

---

#### RC-CASES-020: Create Case - Cyrillic and Emoji in Title
**Priority**: P2
**Type**: Functional

**Test Data**:
- Cyrillic: "Тест авторизации"
- Emoji: "Login Test 🔐"

**Steps**:
1. Create case with Cyrillic title
2. Create case with emoji
3. Save both

**Expected Result**:
- [ ] Cyrillic displayed correctly
- [ ] Emoji displayed correctly (or stripped if not supported)
- [ ] No encoding errors
- [ ] Both searchable

---

### 2.2. Search & Filter (RC-CASES-021 to 030)

---

#### RC-CASES-021: Search by Title - Exact Match
**Priority**: P1
**Type**: Functional

**Prerequisites**: Test case "Login Test" exists

**Steps**:
1. Navigate to /cases
2. Enter "Login Test" in search box
3. Observe results

**Expected Result**:
- [ ] Only "Login Test" displayed
- [ ] Other cases hidden
- [ ] Stats update to show filtered count
- [ ] Search is case-insensitive

---

#### RC-CASES-022: Search by Title - Partial Match
**Priority**: P1
**Type**: Functional

**Prerequisites**: Cases "Login Test", "Logout Test", "User Test" exist

**Steps**:
1. Enter "Test" in search
2. Observe results

**Expected Result**:
- [ ] All 3 cases shown (all contain "Test")
- [ ] Search is substring match

---

#### RC-CASES-023: Search - No Results
**Priority**: P2
**Type**: Functional

**Steps**:
1. Enter "NonExistentCase" in search

**Expected Result**:
- [ ] No cases displayed
- [ ] Empty state shown: "No test cases found"
- [ ] OR grid empty with message
- [ ] Stats show "0 results"

---

#### RC-CASES-024: Search - Clear Search
**Priority**: P2
**Type**: Functional

**Prerequisites**: Search is active with filtered results

**Steps**:
1. Enter search term "Login"
2. Clear search box (delete text or click X)

**Expected Result**:
- [ ] All cases reappear
- [ ] Stats return to total count
- [ ] Grid restored to original state

---

#### RC-CASES-025: Filter by Priority - Single
**Priority**: P1
**Type**: Functional

**Prerequisites**: Cases with different priorities exist (P0, P1, P2, P3)

**Steps**:
1. Click Priority filter dropdown
2. Select "P0"
3. Observe grid

**Expected Result**:
- [ ] Only P0 cases displayed
- [ ] All have red badge
- [ ] Stats show filtered count
- [ ] Filter badge/indicator shown

---

#### RC-CASES-026: Filter by Priority - Multiple
**Priority**: P1
**Type**: Functional

**Prerequisites**: Cases with P0, P1, P2, P3 exist

**Steps**:
1. Select Priority filter: P0 and P1
2. Observe results

**Expected Result**:
- [ ] P0 and P1 cases shown
- [ ] P2 and P3 hidden
- [ ] Multi-select works (checkboxes, not radio)

**Note**: If only single-select supported, mark as "Feature limitation"

---

#### RC-CASES-027: Filter by Type - Functional
**Priority**: P1
**Type**: Functional

**Prerequisites**: Cases with types: Functional, UI, API, E2E exist

**Steps**:
1. Select Type filter: "Functional"
2. Observe grid

**Expected Result**:
- [ ] Only Functional cases shown
- [ ] Type badge displays correctly
- [ ] Stats updated

---

#### RC-CASES-028: Combined Filters - Search + Priority
**Priority**: P1
**Type**: Functional

**Prerequisites**: Multiple test cases with varied data

**Steps**:
1. Enter search: "Login"
2. Select Priority: P0
3. Observe results

**Expected Result**:
- [ ] Only cases matching BOTH filters shown
- [ ] AND logic applied (Login title AND P0 priority)
- [ ] Stats show combined filter count

---

#### RC-CASES-029: Combined Filters - Priority + Type
**Priority**: P1
**Type**: Functional

**Steps**:
1. Select Priority: P1
2. Select Type: Functional
3. Observe results

**Expected Result**:
- [ ] Only P1 Functional cases shown
- [ ] Multiple filters work together

---

#### RC-CASES-030: Clear All Filters
**Priority**: P2
**Type**: Functional

**Prerequisites**: Multiple filters active

**Steps**:
1. Apply search + priority + type filters
2. Click "Clear Filters" button (if exists)
3. OR manually clear each filter

**Expected Result**:
- [ ] All filters cleared
- [ ] Full list restored
- [ ] Stats return to total

---

### 2.3. Display & Layout (RC-CASES-031 to 040)

---

#### RC-CASES-031: Grid Layout - Desktop (3 columns)
**Priority**: P1
**Type**: UI

**Prerequisites**: At least 9 test cases exist

**Steps**:
1. Navigate to /cases on desktop (1920x1080)
2. Observe grid layout

**Expected Result**:
- [ ] 3 columns displayed (lg:grid-cols-3)
- [ ] Cards evenly spaced (gap-4)
- [ ] First row has 3 cards
- [ ] Consistent card width

---

#### RC-CASES-032: Grid Layout - Tablet (2 columns)
**Priority**: P1
**Type**: UI

**Prerequisites**: At least 6 test cases exist

**Steps**:
1. Resize browser to 768px width
2. Observe grid

**Expected Result**:
- [ ] 2 columns displayed (md:grid-cols-2)
- [ ] Cards resize appropriately
- [ ] No horizontal scroll

---

#### RC-CASES-033: Grid Layout - Mobile (1 column)
**Priority**: P1
**Type**: UI

**Prerequisites**: At least 3 test cases exist

**Steps**:
1. Resize browser to 375px width
2. Observe grid

**Expected Result**:
- [ ] 1 column displayed (grid-cols-1)
- [ ] Cards full width
- [ ] Vertical scroll works
- [ ] No content cutoff

---

#### RC-CASES-034: Card - Hover Effects
**Priority**: P2
**Type**: UI

**Prerequisites**: At least 1 test case exists

**Steps**:
1. Hover over test case card
2. Observe visual changes
3. Move mouse away

**Expected Result**:
- [ ] Card lifts (translateY(-2px))
- [ ] Shadow intensifies (var(--shadow-hover))
- [ ] Action buttons fade in (opacity 0 → 100)
- [ ] Smooth transition (transition-all)
- [ ] Returns to normal on mouse leave

---

#### RC-CASES-035: Card - Content Display
**Priority**: P1
**Type**: UI

**Prerequisites**: Test case with 5 steps exists

**Steps**:
1. View test case card with 5 steps

**Expected Result**:
- [ ] Title displayed (line-clamp-2 for long titles)
- [ ] Priority badge top-left
- [ ] Type badge next to priority
- [ ] First 2 steps shown
- [ ] "+3 more" indicator for remaining steps
- [ ] Step numbers (1., 2.) shown
- [ ] Step action text truncated (line-clamp-2)

---

#### RC-CASES-036: Card - Title Truncation
**Priority**: P2
**Type**: UI

**Test Data**: Title with 150 characters

**Steps**:
1. Create case with very long title
2. View in grid

**Expected Result**:
- [ ] Title truncated after 2 lines
- [ ] Ellipsis (...) shown
- [ ] Full title visible on hover (if tooltip implemented)
- [ ] Card height consistent with other cards

---

#### RC-CASES-037: Stats Cards - Correct Counts
**Priority**: P1
**Type**: Functional

**Prerequisites**: Known number of test cases (e.g., 10 total, 3 P0, 2 P1, 3 P2, 2 P3)

**Steps**:
1. Navigate to /cases
2. Observe stats cards at top

**Expected Result**:
- [ ] "Total" shows 10
- [ ] "P0" shows 3 (red background)
- [ ] "P1" shows 2 (yellow background)
- [ ] "P2" shows 3 (blue background)
- [ ] "P3" shows 2 (gray background)
- [ ] Stats in large font (text-4xl)

---

#### RC-CASES-038: Stats Cards - Real-time Update
**Priority**: P1
**Type**: Functional

**Steps**:
1. Note current stats (e.g., Total: 5)
2. Create new P0 test case
3. Observe stats

**Expected Result**:
- [ ] Total increments to 6
- [ ] P0 count increments
- [ ] No page refresh needed
- [ ] Update happens instantly

---

#### RC-CASES-039: Priority Badge - Color Contrast
**Priority**: P1
**Type**: Accessibility

**Prerequisites**: Cases with all priority levels exist

**Steps**:
1. View grid with P0, P1, P2, P3 cases
2. Check badge colors

**Expected Result**:
- [ ] P0: Red background (bg-red-50), dark red text (text-red-900)
- [ ] P1: Yellow background (bg-yellow-50), dark yellow text (text-yellow-900)
- [ ] P2: Blue background (bg-blue-50), dark blue text (text-blue-900)
- [ ] P3: Gray background (bg-gray-50), dark gray text (text-gray-900)
- [ ] All badges have border (border-[color]-300)
- [ ] Text readable (WCAG AA contrast ratio ≥ 4.5:1)

---

#### RC-CASES-040: Empty State - No Test Cases
**Priority**: P2
**Type**: UI

**Prerequisites**: Database has 0 test cases

**Steps**:
1. Navigate to /cases with no cases

**Expected Result**:
- [ ] Stats show "0 Test Cases"
- [ ] Empty state message shown (if implemented)
- [ ] "New Case" button still visible
- [ ] No errors in console

---

### 2.4. Validation (RC-CASES-041 to 050)

---

#### RC-CASES-041: Title Validation - Required
**Priority**: P0
**Type**: Negative

**Steps**:
1. Open New Case modal
2. Leave title empty
3. Fill other fields
4. Click Save

**Expected Result**:
- [ ] Error: "Title is required"
- [ ] Save button disabled OR validation error shown
- [ ] Cannot proceed

---

#### RC-CASES-042: Title Validation - Min Length
**Priority**: P1
**Type**: Negative

**Test Data**: "AB" (2 chars)

**Steps**:
1. Enter 2-character title
2. Click Save

**Expected Result**:
- [ ] Error: "Title must be at least 3 characters"
- [ ] Cannot save

---

#### RC-CASES-043: Title Validation - Max Length
**Priority**: P1
**Type**: Negative

**Test Data**: 201 character string

**Steps**:
1. Enter 201 character title
2. Click Save

**Expected Result**:
- [ ] Error: "Title must be less than 200 characters"
- [ ] OR input field limits to 200 chars
- [ ] Cannot save if >200

---

#### RC-CASES-044: Steps Validation - At Least 1 Required
**Priority**: P1
**Type**: Negative

**Steps**:
1. Create case with valid title
2. Don't add any steps
3. Click Save

**Expected Result**:
- [ ] Error: "At least 1 step is required"
- [ ] Cannot save

---

#### RC-CASES-045: Step Validation - Action Required
**Priority**: P1
**Type**: Negative

**Steps**:
1. Add step
2. Leave Action empty
3. Fill Expected Result
4. Click Save

**Expected Result**:
- [ ] Error: "Step action is required"
- [ ] Highlights empty Action field

---

#### RC-CASES-046: Step Validation - Expected Result Required
**Priority**: P1
**Type**: Negative

**Steps**:
1. Add step
2. Fill Action
3. Leave Expected Result empty
4. Click Save

**Expected Result**:
- [ ] Error: "Expected result is required"
- [ ] Cannot save

---

#### RC-CASES-047: Priority Validation - Required
**Priority**: P1
**Type**: Negative

**Steps**:
1. Create case
2. Don't select priority
3. Click Save

**Expected Result**:
- [ ] Error: "Priority is required" OR
- [ ] Default priority selected automatically (e.g., P2)
- [ ] Behavior depends on implementation

---

#### RC-CASES-048: Type Validation - Required
**Priority**: P1
**Type**: Negative

**Steps**:
1. Create case
2. Don't select type
3. Click Save

**Expected Result**:
- [ ] Error: "Type is required" OR
- [ ] Default type selected (e.g., Functional)

---

#### RC-CASES-049: Steps Validation - Max Steps
**Priority**: P2
**Type**: Negative

**Steps**:
1. Add 51 steps to a test case
2. Click Save

**Expected Result**:
- [ ] Error: "Maximum 50 steps allowed" OR
- [ ] Add Step button disabled after 50

---

#### RC-CASES-050: Form Validation - HTML Injection
**Priority**: P0
**Type**: Security

**Test Data**:
- Title: `<script>alert('XSS')</script>`
- Step: `<img src=x onerror=alert('XSS')>`

**Steps**:
1. Create case with malicious HTML
2. Save
3. View in grid

**Expected Result**:
- [ ] HTML tags escaped/sanitized
- [ ] Script NOT executed
- [ ] Displayed as plain text: `<script>alert('XSS')</script>`
- [ ] No XSS vulnerability

---

## Test Suites Module

**Base URL**: `/suites`
**Total Tests**: 30
**Priority**: High

---

### 3.1. Suite Management (RC-SUITES-001 to 020)

---

#### RC-SUITES-001: Create New Suite - Minimum Fields
**Priority**: P0
**Type**: Functional

**Prerequisites**: At least 1 test case exists

**Steps**:
1. Navigate to /suites/new
2. Enter name: "Login Suite"
3. Select 1 test case
4. Click Save

**Expected Result**:
- [ ] Suite created successfully
- [ ] Redirected to /suites
- [ ] Suite visible in list
- [ ] Shows 1 case count

---

#### RC-SUITES-002: Create Suite - With Description
**Priority**: P1
**Type**: Functional

**Steps**:
1. Navigate to /suites/new
2. Enter name: "Registration Suite"
3. Enter description: "All registration flow tests"
4. Select 3 test cases
5. Click Save

**Expected Result**:
- [ ] Suite created with description
- [ ] Description visible in suite detail view
- [ ] 3 cases associated

---

#### RC-SUITES-003: Create Suite - No Cases Selected
**Priority**: P1
**Type**: Negative

**Steps**:
1. Navigate to /suites/new
2. Enter name but don't select any cases
3. Click Save

**Expected Result**:
- [ ] Error: "Select at least 1 test case" OR
- [ ] Can save empty suite (depends on requirements)
- [ ] Document actual behavior

---

#### RC-SUITES-004: Create Suite - Name Validation
**Priority**: P1
**Type**: Negative

**Test Data**: Empty name, 2-char name, 101-char name

**Steps**:
1. Try to create suite with invalid names
2. Observe validation

**Expected Result**:
- [ ] Empty: "Name is required"
- [ ] Too short: "Minimum 3 characters"
- [ ] Too long: "Maximum 100 characters"

---

#### RC-SUITES-005: Edit Suite - Change Name
**Priority**: P1
**Type**: Functional

**Prerequisites**: Suite "Old Name" exists

**Steps**:
1. Navigate to /suites
2. Click Edit on suite
3. Change name to "New Name"
4. Click Save

**Expected Result**:
- [ ] Name updated
- [ ] Suite list shows new name
- [ ] Cases remain associated

---

#### RC-SUITES-006: Edit Suite - Add Cases
**Priority**: P1
**Type**: Functional

**Prerequisites**: Suite with 2 cases exists, 3 more cases available

**Steps**:
1. Edit suite with 2 cases
2. Select 3 additional cases
3. Save

**Expected Result**:
- [ ] Suite now has 5 cases
- [ ] Count updated
- [ ] All cases visible in suite detail

---

#### RC-SUITES-007: Edit Suite - Remove Cases
**Priority**: P1
**Type**: Functional

**Prerequisites**: Suite with 5 cases exists

**Steps**:
1. Edit suite
2. Deselect 2 cases
3. Save

**Expected Result**:
- [ ] Suite now has 3 cases
- [ ] Removed cases not in suite
- [ ] Cases still exist in /cases (not deleted)

---

#### RC-SUITES-008: Delete Suite
**Priority**: P1
**Type**: Functional

**Prerequisites**: Suite exists

**Steps**:
1. Navigate to /suites
2. Click Delete on a suite
3. Confirm deletion

**Expected Result**:
- [ ] Confirmation dialog shown
- [ ] Suite deleted from list
- [ ] Associated cases NOT deleted (still in /cases)

---

#### RC-SUITES-009: Delete Suite - Cancel
**Priority**: P2
**Type**: Functional

**Steps**:
1. Click Delete
2. Click Cancel in dialog

**Expected Result**:
- [ ] Suite NOT deleted
- [ ] Still visible in list

---

#### RC-SUITES-010: View Suite Details
**Priority**: P1
**Type**: Functional

**Prerequisites**: Suite with 5 cases exists

**Steps**:
1. Navigate to /suites
2. Click on suite name/card
3. Observe detail page

**Expected Result**:
- [ ] Suite name and description shown
- [ ] List of 5 test cases displayed
- [ ] Each case shows: title, priority, type
- [ ] Can navigate to individual case
- [ ] Edit and Delete buttons visible

---

#### RC-SUITES-011: Suite - Case Count Badge
**Priority**: P2
**Type**: UI

**Prerequisites**: Suites with different case counts exist

**Steps**:
1. View /suites list
2. Observe case count on each suite card

**Expected Result**:
- [ ] Badge shows "X cases"
- [ ] Count accurate for each suite
- [ ] Updates when cases added/removed

---

#### RC-SUITES-012: Suite - Search by Name
**Priority**: P2
**Type**: Functional

**Prerequisites**: Suites "Login Suite", "Signup Suite" exist

**Steps**:
1. Enter "Login" in search
2. Observe results

**Expected Result**:
- [ ] Only "Login Suite" shown
- [ ] Search is case-insensitive
- [ ] Partial match works

---

#### RC-SUITES-013: Duplicate Suite Name
**Priority**: P2
**Type**: Functional

**Prerequisites**: Suite "Smoke Tests" exists

**Steps**:
1. Create new suite with name "Smoke Tests"
2. Click Save

**Expected Result**:
- [ ] Either: Error "Suite name already exists" OR
- [ ] Duplicate names allowed (both exist)
- [ ] Document actual behavior

---

#### RC-SUITES-014: Suite with Deleted Case
**Priority**: P1
**Type**: Integration

**Prerequisites**: Suite contains case "Test A"

**Steps**:
1. Delete "Test A" from /cases
2. View the suite
3. Observe case list

**Expected Result**:
- [ ] Deleted case removed from suite automatically OR
- [ ] Placeholder shown: "Case deleted" OR
- [ ] Error shown
- [ ] Document behavior

---

#### RC-SUITES-015: Empty Suite List
**Priority**: P2
**Type**: UI

**Prerequisites**: No suites exist

**Steps**:
1. Navigate to /suites

**Expected Result**:
- [ ] Empty state message shown
- [ ] "Create New Suite" button visible
- [ ] No errors

---

#### RC-SUITES-016 to 020: Reserved for Future Tests

---

### 3.2. Case Selection UI (RC-SUITES-021 to 030)

---

#### RC-SUITES-021: Checkbox Selection - Single
**Priority**: P1
**Type**: UI

**Prerequisites**: /suites/new page with available cases

**Steps**:
1. Navigate to /suites/new
2. Click checkbox on 1 test case
3. Observe state

**Expected Result**:
- [ ] Checkbox checked
- [ ] Card highlighted (border-blue-500, bg-blue-50)
- [ ] Checkmark icon visible
- [ ] Selected cases summary updates (+1)

---

#### RC-SUITES-022: Checkbox Selection - Multiple
**Priority**: P1
**Type**: UI

**Steps**:
1. Select 3 test cases
2. Observe summary

**Expected Result**:
- [ ] All 3 checkboxes checked
- [ ] All 3 cards highlighted
- [ ] Summary shows "3 cases selected"

---

#### RC-SUITES-023: Deselect Case
**Priority**: P1
**Type**: UI

**Steps**:
1. Select 3 cases
2. Click checkbox on 1 to deselect
3. Observe

**Expected Result**:
- [ ] Checkbox unchecked
- [ ] Card unhighlighted (border-gray-100, bg-white)
- [ ] Summary shows "2 cases selected"

---

#### RC-SUITES-024: Search Available Cases
**Priority**: P2
**Type**: Functional

**Prerequisites**: /suites/new with 10+ cases

**Steps**:
1. Enter search term to filter cases
2. Select filtered case
3. Clear search

**Expected Result**:
- [ ] Search filters available cases
- [ ] Can select from filtered results
- [ ] Selected case remains checked after clearing search

---

#### RC-SUITES-025: Selected Cases Summary
**Priority**: P1
**Type**: UI

**Steps**:
1. Select 3 cases with different priorities
2. View "Selected Cases" summary section

**Expected Result**:
- [ ] Summary shows count: "3 cases selected"
- [ ] Lists selected case titles
- [ ] Shows priority badges for each

---

#### RC-SUITES-026: Save with No Selection
**Priority**: P1
**Type**: Negative

**Steps**:
1. Navigate to /suites/new
2. Enter name
3. Don't select any cases
4. Click Save

**Expected Result**:
- [ ] Validation error OR
- [ ] Empty suite created (if allowed)

---

#### RC-SUITES-027: Filter Cases by Priority
**Priority**: P2
**Type**: Functional

**Steps**:
1. On /suites/new, apply Priority filter: P0
2. Observe available cases

**Expected Result**:
- [ ] Only P0 cases shown
- [ ] Can select from filtered list
- [ ] Filter doesn't affect already selected cases

---

#### RC-SUITES-028: Select All Cases
**Priority**: P2
**Type**: Functional

**Prerequisites**: 20+ test cases exist

**Steps**:
1. Click "Select All" button (if exists)
2. Observe

**Expected Result**:
- [ ] All visible cases selected OR
- [ ] Feature not available

---

#### RC-SUITES-029: Deselect All
**Priority**: P2
**Type**: Functional

**Steps**:
1. Select 5 cases
2. Click "Deselect All" (if exists)

**Expected Result**:
- [ ] All checkboxes unchecked
- [ ] Summary shows "0 cases selected"

---

#### RC-SUITES-030: Case Card Preview in Suite Builder
**Priority**: P2
**Type**: UI

**Steps**:
1. Navigate to /suites/new
2. Observe case cards

**Expected Result**:
- [ ] Each card shows: title, priority badge, type badge
- [ ] First 2 steps previewed
- [ ] Checkbox clearly visible
- [ ] Cards responsive (1/2/3 columns on mobile/tablet/desktop)

---

## Test Runs Module

**Base URL**: `/runs` and `/dashboard/new-run`
**Total Tests**: 40
**Priority**: Critical

---

### 4.1. Run Creation (RC-RUNS-001 to 020)

---

#### RC-RUNS-001: Create Run - Drag and Drop Case
**Priority**: P0
**Type**: Functional

**Prerequisites**: At least 1 test case exists

**Steps**:
1. Navigate to /dashboard/new-run
2. Drag test case from available list
3. Drop into run builder area
4. Observe

**Expected Result**:
- [ ] Drag-drop animation smooth
- [ ] Case appears in run builder
- [ ] Case shows: title, priority badge
- [ ] "Run Builder" area shows 1 case

---

#### RC-RUNS-002: Create Run - Add Multiple Cases
**Priority**: P0
**Type**: Functional

**Steps**:
1. Drag 5 different cases into run builder
2. Observe

**Expected Result**:
- [ ] All 5 cases added
- [ ] Cases listed in order added
- [ ] Count shows "5 cases"

---

#### RC-RUNS-003: Create Run - Add via Plus Button
**Priority**: P1
**Type**: Functional

**Prerequisites**: Alternative add method exists (+ button)

**Steps**:
1. Click + button on test case
2. Observe run builder

**Expected Result**:
- [ ] Case added to run builder
- [ ] Same result as drag-drop

**Note**: If + button doesn't exist, mark as "Feature not available"

---

#### RC-RUNS-004: Remove Case from Run Builder
**Priority**: P1
**Type**: Functional

**Prerequisites**: Run builder has 3 cases

**Steps**:
1. Click remove/X button on case in run builder
2. Observe

**Expected Result**:
- [ ] Case removed from run
- [ ] Count decrements
- [ ] Case still available in left panel

---

#### RC-RUNS-005: Reorder Cases in Run
**Priority**: P1
**Type**: Functional

**Prerequisites**: Run builder has 3 cases in order A, B, C

**Steps**:
1. Drag case C to position 1
2. Observe order

**Expected Result**:
- [ ] Order changes to C, A, B
- [ ] Drag-drop reordering works
- [ ] Visual feedback during drag

---

#### RC-RUNS-006: Create Run - Enter Name
**Priority**: P0
**Type**: Functional

**Steps**:
1. Add cases to run builder
2. Enter run name: "Sprint 1 Regression"
3. Click "Start Run"

**Expected Result**:
- [ ] Run name saved
- [ ] Run created successfully
- [ ] Redirected to /runs/[runId]

---

#### RC-RUNS-007: Create Run - Name Validation
**Priority**: P1
**Type**: Negative

**Test Data**: Empty name, 2-char name, 101-char name

**Steps**:
1. Try to start run with invalid names

**Expected Result**:
- [ ] Empty: "Name is required"
- [ ] Too short: Min 3 characters error
- [ ] Too long: Max 100 characters error

---

#### RC-RUNS-008: Create Run - No Cases
**Priority**: P1
**Type**: Negative

**Steps**:
1. Enter run name
2. Don't add any cases
3. Click Start Run

**Expected Result**:
- [ ] Error: "Add at least 1 test case"
- [ ] Cannot start run

---

#### RC-RUNS-009: Duplicate Case in Run
**Priority**: P2
**Type**: Functional

**Steps**:
1. Add case "Login Test"
2. Add same "Login Test" again
3. Observe run builder

**Expected Result**:
- [ ] Either: Error "Case already in run" OR
- [ ] Same case added twice (allowed)
- [ ] Document behavior

---

#### RC-RUNS-010: Search Cases in Run Builder
**Priority**: P2
**Type**: Functional

**Prerequisites**: 20+ cases available

**Steps**:
1. Enter search term in available cases panel
2. Drag filtered case to run

**Expected Result**:
- [ ] Search filters available cases
- [ ] Can add filtered cases to run

---

#### RC-RUNS-011: Filter Cases by Priority in Run Builder
**Priority**: P2
**Type**: Functional

**Steps**:
1. Filter available cases by P0
2. Add P0 cases to run

**Expected Result**:
- [ ] Only P0 cases shown
- [ ] Can build run with filtered cases

---

#### RC-RUNS-012: Create Run from Suite
**Priority**: P1
**Type**: Integration

**Prerequisites**: Suite with 5 cases exists

**Steps**:
1. Navigate to /suites
2. Click "Run Suite" or "Create Run" on suite
3. Observe run builder

**Expected Result**:
- [ ] Run builder pre-populated with suite's 5 cases OR
- [ ] Redirected directly to run execution
- [ ] Suite name used as default run name

**Note**: If feature doesn't exist, mark as "Feature not available"

---

#### RC-RUNS-013: Cancel Run Creation
**Priority**: P2
**Type**: Functional

**Steps**:
1. Add 3 cases to run builder
2. Enter name
3. Click Cancel/Back

**Expected Result**:
- [ ] Confirmation shown: "Discard run?"
- [ ] If confirmed, return to /dashboard
- [ ] Run not saved

---

#### RC-RUNS-014: Save Run as Draft
**Priority**: P2
**Type**: Functional

**Steps**:
1. Add cases and name
2. Click "Save as Draft" (if exists)

**Expected Result**:
- [ ] Run saved without starting
- [ ] Can resume later

**Note**: If feature doesn't exist, mark as "Feature not available"

---

#### RC-RUNS-015 to 020: Reserved for Future Tests

---

### 4.2. Run Execution (RC-RUNS-021 to 040)

---

#### RC-RUNS-021: Mark Case as Passed
**Priority**: P0
**Type**: Functional

**Prerequisites**: Active run with 3 cases

**Steps**:
1. Navigate to /runs/[runId]
2. Click "Passed" button on first case
3. Observe

**Expected Result**:
- [ ] Case marked as Passed
- [ ] Status badge turns green
- [ ] Progress bar updates: 1/3 completed
- [ ] Checkmark icon shown

---

#### RC-RUNS-022: Mark Case as Failed
**Priority**: P0
**Type**: Functional

**Steps**:
1. Click "Failed" button on case
2. Observe

**Expected Result**:
- [ ] Case marked as Failed
- [ ] Status badge turns red
- [ ] Progress updates
- [ ] X icon shown

---

#### RC-RUNS-023: Mark Case as Skipped
**Priority**: P1
**Type**: Functional

**Steps**:
1. Click "Skipped" button on case

**Expected Result**:
- [ ] Case marked as Skipped
- [ ] Status badge gray/yellow
- [ ] Progress updates

---

#### RC-RUNS-024: Mark Case as Blocked
**Priority**: P1
**Type**: Functional

**Steps**:
1. Click "Blocked" button on case

**Expected Result**:
- [ ] Case marked as Blocked
- [ ] Status badge orange
- [ ] Progress updates

---

#### RC-RUNS-025: Add Comment to Failed Case
**Priority**: P1
**Type**: Functional

**Steps**:
1. Mark case as Failed
2. Enter comment: "Login button not working - bug #123"
3. Save comment

**Expected Result**:
- [ ] Comment saved
- [ ] Comment visible on case
- [ ] Comment icon/indicator shown

---

#### RC-RUNS-026: Change Status - Failed to Passed
**Priority**: P1
**Type**: Functional

**Steps**:
1. Mark case as Failed
2. Click "Passed" to change status

**Expected Result**:
- [ ] Status changes to Passed
- [ ] Previous comment retained (or cleared - document behavior)
- [ ] Progress updates

---

#### RC-RUNS-027: Keyboard Shortcuts - Pass
**Priority**: P2
**Type**: Functional

**Steps**:
1. Select case
2. Press "P" key (or configured shortcut)

**Expected Result**:
- [ ] Case marked as Passed via keyboard
- [ ] Same result as clicking button

**Note**: If shortcuts not implemented, mark as "Feature not available"

---

#### RC-RUNS-028: Keyboard Shortcuts - Fail
**Priority**: P2
**Type**: Functional

**Steps**:
1. Select case
2. Press "F" key

**Expected Result**:
- [ ] Case marked as Failed

---

#### RC-RUNS-029: Keyboard Shortcuts - Skip
**Priority**: P2
**Type**: Functional

**Steps**:
1. Press "S" key

**Expected Result**:
- [ ] Case marked as Skipped

---

#### RC-RUNS-030: Progress Bar - Real-time Update
**Priority**: P1
**Type**: UI

**Prerequisites**: Run with 10 cases

**Steps**:
1. Mark 5 cases as Passed
2. Observe progress bar

**Expected Result**:
- [ ] Progress bar shows 50% (5/10)
- [ ] Visual bar fills to 50%
- [ ] Text shows "5/10 completed"

---

#### RC-RUNS-031: View Case Details in Run
**Priority**: P1
**Type**: Functional

**Steps**:
1. During run execution, click on case title
2. Observe

**Expected Result**:
- [ ] Case details expand OR modal opens
- [ ] Shows: steps, expected results
- [ ] Can still mark status from detail view

---

#### RC-RUNS-032: Bulk Mark - All Passed
**Priority**: P2
**Type**: Functional

**Steps**:
1. Select multiple cases (if selection exists)
2. Click "Mark Selected as Passed"

**Expected Result**:
- [ ] All selected cases marked Passed
- [ ] Progress updates

**Note**: If bulk actions don't exist, mark as "Feature not available"

---

#### RC-RUNS-033: Complete Run - All Cases Executed
**Priority**: P0
**Type**: Functional

**Prerequisites**: Run with 5 cases

**Steps**:
1. Mark all 5 cases (any statuses)
2. Observe completion

**Expected Result**:
- [ ] Run marked as Complete
- [ ] Completion message shown
- [ ] Results summary displayed
- [ ] Can view full report

---

#### RC-RUNS-034: Complete Run - Some Cases Pending
**Priority**: P1
**Type**: Functional

**Steps**:
1. Mark 3 out of 5 cases
2. Try to complete run

**Expected Result**:
- [ ] Warning: "2 cases pending"
- [ ] Can force complete OR must finish all

---

#### RC-RUNS-035: Pause and Resume Run
**Priority**: P2
**Type**: Functional

**Steps**:
1. Start run, mark 2 cases
2. Click "Pause" or navigate away
3. Return later
4. Resume run

**Expected Result**:
- [ ] Progress saved
- [ ] Can continue from where left off

---

#### RC-RUNS-036: Abort Run
**Priority**: P2
**Type**: Functional

**Steps**:
1. Start run
2. Click "Abort" or "Cancel"
3. Confirm

**Expected Result**:
- [ ] Run marked as Aborted
- [ ] Partial results saved
- [ ] Can view incomplete results

---

#### RC-RUNS-037: Rerun Failed Cases
**Priority**: P2
**Type**: Functional

**Prerequisites**: Completed run with 3 failed cases

**Steps**:
1. View completed run
2. Click "Rerun Failed"

**Expected Result**:
- [ ] New run created with only failed cases
- [ ] Can re-execute

**Note**: If feature doesn't exist, mark as "Feature not available"

---

#### RC-RUNS-038: Export Run Results
**Priority**: P2
**Type**: Functional

**Steps**:
1. Complete run
2. Click "Export" (PDF/CSV/etc)

**Expected Result**:
- [ ] Results exported in chosen format
- [ ] Includes: run name, date, statuses, comments

**Note**: If export doesn't exist, mark as "Feature not available"

---

#### RC-RUNS-039: View Run History
**Priority**: P1
**Type**: Functional

**Steps**:
1. Navigate to /runs
2. Observe list of runs

**Expected Result**:
- [ ] All runs displayed
- [ ] Shows: name, date, status (Active/Completed)
- [ ] Can filter by status

---

#### RC-RUNS-040: Delete Run
**Priority**: P1
**Type**: Functional

**Steps**:
1. Navigate to /runs
2. Click Delete on a run
3. Confirm

**Expected Result**:
- [ ] Confirmation dialog shown
- [ ] Run deleted
- [ ] Results also deleted

---

## Dashboard Module

**Base URL**: `/dashboard`
**Total Tests**: 20
**Priority**: Medium

---

### 5.1. Overview (RC-DASH-001 to 010)

---

#### RC-DASH-001: Dashboard Stats - Test Cases
**Priority**: P1
**Type**: Functional

**Prerequisites**: Known number of test cases (e.g., 25 total)

**Steps**:
1. Navigate to /dashboard
2. Observe stats cards

**Expected Result**:
- [ ] "Test Cases" card shows 25
- [ ] Icon displayed (FileText or similar)
- [ ] Click navigates to /cases

---

#### RC-DASH-002: Dashboard Stats - Test Suites
**Priority**: P1
**Type**: Functional

**Prerequisites**: Known number of suites (e.g., 5)

**Steps**:
1. View dashboard

**Expected Result**:
- [ ] "Test Suites" card shows 5
- [ ] Click navigates to /suites

---

#### RC-DASH-003: Dashboard Stats - Test Runs
**Priority**: P1
**Type**: Functional

**Steps**:
1. View dashboard with 3 completed runs

**Expected Result**:
- [ ] "Test Runs" card shows 3
- [ ] Click navigates to /runs

---

#### RC-DASH-004: Dashboard Stats - Real-time Update
**Priority**: P1
**Type**: Functional

**Steps**:
1. Note current Test Cases count (e.g., 10)
2. Open /cases in new tab
3. Create new case
4. Return to dashboard

**Expected Result**:
- [ ] Stats update to 11 automatically OR
- [ ] Refresh dashboard to see update

---

#### RC-DASH-005: Recent Runs - Display
**Priority**: P1
**Type**: Functional

**Prerequisites**: 5+ completed runs exist

**Steps**:
1. View dashboard
2. Observe "Recent Runs" section

**Expected Result**:
- [ ] Last 5 runs displayed
- [ ] Shows: run name, date, status, pass rate
- [ ] Most recent at top

---

#### RC-DASH-006: Recent Runs - Click to View
**Priority**: P1
**Type**: Functional

**Steps**:
1. Click on a run in Recent Runs list

**Expected Result**:
- [ ] Navigates to /runs/[runId]
- [ ] Shows full run results

---

#### RC-DASH-007: Quick Actions - New Run
**Priority**: P1
**Type**: Functional

**Steps**:
1. Click "New Run" button on dashboard

**Expected Result**:
- [ ] Navigates to /dashboard/new-run
- [ ] Run builder opens

---

#### RC-DASH-008: Quick Actions - New Case
**Priority**: P1
**Type**: Functional

**Steps**:
1. Click "New Case" button

**Expected Result**:
- [ ] Navigates to /cases/new OR
- [ ] Opens new case modal

---

#### RC-DASH-009: Quick Actions - New Suite
**Priority**: P1
**Type**: Functional

**Steps**:
1. Click "New Suite" button

**Expected Result**:
- [ ] Navigates to /suites/new

---

#### RC-DASH-010: Empty Dashboard - No Data
**Priority**: P2
**Type**: UI

**Prerequisites**: Fresh database with no data

**Steps**:
1. Navigate to /dashboard

**Expected Result**:
- [ ] Stats show 0 for all cards
- [ ] "Recent Runs" shows empty state
- [ ] Quick action buttons still visible

---

### 5.2. Charts & Analytics (RC-DASH-011 to 020)

---

#### RC-DASH-011: Pass/Fail Chart - Display
**Priority**: P2
**Type**: UI

**Prerequisites**: Completed runs with mixed results

**Steps**:
1. View dashboard
2. Observe pass/fail chart (if exists)

**Expected Result**:
- [ ] Chart shows pass rate over time OR
- [ ] Pie chart of passed vs failed

**Note**: If charts don't exist, mark as "Feature not available"

---

#### RC-DASH-012: Trends - Test Case Growth
**Priority**: P2
**Type**: Analytics

**Steps**:
1. View chart showing test case count over time

**Expected Result**:
- [ ] Line graph shows growth
- [ ] X-axis: dates, Y-axis: count

**Note**: If feature doesn't exist, mark as "Feature not available"

---

#### RC-DASH-013: Filter Dashboard by Date Range
**Priority**: P2
**Type**: Functional

**Steps**:
1. Select date range: Last 7 days
2. Observe stats and charts

**Expected Result**:
- [ ] Data filtered to date range
- [ ] Recent Runs shows only runs in range

**Note**: If filtering doesn't exist, mark as "Feature not available"

---

#### RC-DASH-014 to 020: Reserved for Future Analytics Features

---

## Cross-Functional Tests

---

### 6. UI/UX Tests (Cross-Module)

---

#### RC-UI-001: Design System - Color Palette
**Priority**: P1
**Type**: UI

**Steps**:
1. Navigate through all pages: /, /cases, /suites, /runs, /dashboard
2. Verify colors

**Expected Result**:
- [ ] Background: var(--color-bg) = #E8F0EF (mint-gray)
- [ ] Primary accent: var(--color-primary) = #B8E986 (lime-green)
- [ ] Cards: #FFFFFF (white)
- [ ] Text: var(--color-text) = #1A1A1A (near-black)
- [ ] Consistent across all pages

---

#### RC-UI-002: Design System - Shadows
**Priority**: P1
**Type**: UI

**Steps**:
1. Observe cards on all pages

**Expected Result**:
- [ ] Default shadow: var(--shadow) = 0 2px 8px rgba(0,0,0,0.06)
- [ ] Hover shadow: var(--shadow-hover) = 0 4px 16px rgba(0,0,0,0.12)
- [ ] Consistent soft shadows, no harsh borders

---

#### RC-UI-003: Design System - Border Radius
**Priority**: P2
**Type**: UI

**Steps**:
1. Check cards, buttons, badges

**Expected Result**:
- [ ] Cards: rounded-xl (16px)
- [ ] Buttons: rounded-lg (12px)
- [ ] Badges: rounded-full
- [ ] Consistent rounding

---

#### RC-UI-004: Typography - Font Family
**Priority**: P1
**Type**: UI

**Steps**:
1. Inspect font on all pages

**Expected Result**:
- [ ] System font stack: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto"
- [ ] Antialiasing enabled (antialiased class)
- [ ] Clean, readable typography

---

#### RC-UI-005: Typography - Font Sizes
**Priority**: P2
**Type**: UI

**Steps**:
1. Check headings and body text

**Expected Result**:
- [ ] H1/Page titles: text-3xl or larger
- [ ] Stats numbers: text-4xl (large)
- [ ] Body text: text-base (16px)
- [ ] Small text (badges, labels): text-xs (12px)

---

#### RC-UI-006: Hover Animations - Lift Effect
**Priority**: P1
**Type**: UI

**Steps**:
1. Hover over cards on /cases, /suites
2. Observe animation

**Expected Result**:
- [ ] Card lifts: translateY(-2px)
- [ ] Shadow intensifies
- [ ] Smooth transition (transition-all)
- [ ] Returns to normal on mouse leave

---

#### RC-UI-007: Hover Animations - Action Buttons
**Priority**: P1
**Type**: UI

**Steps**:
1. Hover over test case card
2. Observe action buttons (Edit, Copy, Delete)

**Expected Result**:
- [ ] Buttons hidden (opacity-0) by default
- [ ] Fade in (opacity-100) on card hover
- [ ] Smooth transition
- [ ] Icons remain visible and clickable

---

#### RC-UI-008: Button States - Enabled
**Priority**: P1
**Type**: UI

**Steps**:
1. Check all buttons in enabled state

**Expected Result**:
- [ ] Clear visual appearance
- [ ] Cursor changes to pointer
- [ ] Background: primary color or neutral
- [ ] Clickable

---

#### RC-UI-009: Button States - Disabled
**Priority**: P1
**Type**: UI

**Steps**:
1. Find disabled button (e.g., Save with validation errors)

**Expected Result**:
- [ ] Grayed out appearance (opacity-50)
- [ ] Cursor: not-allowed or default
- [ ] Not clickable

---

#### RC-UI-010: Button States - Loading
**Priority**: P2
**Type**: UI

**Steps**:
1. Trigger async action (e.g., Save)
2. Observe button during save

**Expected Result**:
- [ ] Spinner/loading indicator shown OR
- [ ] Button text changes to "Saving..."
- [ ] Button disabled during operation

**Note**: If loading states don't exist, mark as "Feature not available"

---

#### RC-UI-011: Responsive - Desktop (1920x1080)
**Priority**: P0
**Type**: Responsive

**Steps**:
1. View all pages on 1920x1080 desktop
2. Check layout

**Expected Result**:
- [ ] 3-column grid on /cases
- [ ] Nav bar horizontal
- [ ] Stats cards in row
- [ ] No horizontal scroll
- [ ] Content centered with max-width

---

#### RC-UI-012: Responsive - Desktop (1440x900)
**Priority**: P1
**Type**: Responsive

**Steps**:
1. Resize to 1440x900

**Expected Result**:
- [ ] Still 3-column grid
- [ ] Layout adjusts gracefully
- [ ] All content visible

---

#### RC-UI-013: Responsive - Tablet (768x1024)
**Priority**: P0
**Type**: Responsive

**Steps**:
1. Resize to tablet width (768px)

**Expected Result**:
- [ ] 2-column grid on /cases (md:grid-cols-2)
- [ ] Nav may become hamburger menu OR stays horizontal
- [ ] Stats cards stack or shrink
- [ ] No horizontal scroll

---

#### RC-UI-014: Responsive - Mobile (375x667)
**Priority**: P0
**Type**: Responsive

**Steps**:
1. Resize to mobile (375px)

**Expected Result**:
- [ ] 1-column grid (grid-cols-1)
- [ ] Nav becomes hamburger menu
- [ ] Stats cards stack vertically
- [ ] All content accessible
- [ ] Touch targets large enough (min 44x44px)

---

#### RC-UI-015: Responsive - Mobile Landscape (667x375)
**Priority**: P2
**Type**: Responsive

**Steps**:
1. Rotate mobile to landscape

**Expected Result**:
- [ ] Layout adapts OR remains portrait-optimized
- [ ] No broken layouts
- [ ] Content accessible

---

#### RC-UI-016: Dark Mode - Toggle
**Priority**: P3
**Type**: UI

**Steps**:
1. Click dark mode toggle (if exists)

**Expected Result**:
- [ ] Colors invert to dark theme
- [ ] Contrast maintained

**Note**: If dark mode doesn't exist, mark as "Feature not available"

---

#### RC-UI-017: Navigation - Header Links
**Priority**: P1
**Type**: Functional

**Steps**:
1. Click each nav link: Home, Dashboard, Cases, Suites, Runs

**Expected Result**:
- [ ] All links navigate correctly
- [ ] Active link highlighted (primary color background)
- [ ] No 404 errors

---

#### RC-UI-018: Navigation - Breadcrumbs
**Priority**: P2
**Type**: UI

**Steps**:
1. Navigate to /cases/new
2. Check breadcrumbs

**Expected Result**:
- [ ] Breadcrumbs show: Home > Cases > New
- [ ] Click Home returns to /
- [ ] Click Cases returns to /cases

**Note**: If breadcrumbs don't exist, mark as "Feature not available"

---

#### RC-UI-019: Loading States - Page Load
**Priority**: P2
**Type**: UI

**Steps**:
1. Navigate to /cases (clear cache if needed)
2. Observe loading

**Expected Result**:
- [ ] Loading spinner or skeleton shown
- [ ] Content loads smoothly
- [ ] No flash of unstyled content

---

#### RC-UI-020: Error States - 404 Page
**Priority**: P1
**Type**: UI

**Steps**:
1. Navigate to /nonexistent-page

**Expected Result**:
- [ ] 404 page displayed
- [ ] Error message: "Page not found"
- [ ] Link to return home
- [ ] Maintains app layout

---

#### RC-UI-021: Error States - Network Error
**Priority**: P1
**Type**: Error Handling

**Steps**:
1. Disconnect internet
2. Try to create test case
3. Observe error

**Expected Result**:
- [ ] Error message shown: "Network error"
- [ ] Retry button available
- [ ] App doesn't crash

---

#### RC-UI-022: Accessibility - Keyboard Navigation
**Priority**: P1
**Type**: Accessibility

**Steps**:
1. Use Tab key to navigate /cases page
2. Press Enter on buttons

**Expected Result**:
- [ ] Tab focuses on interactive elements in order
- [ ] Focus visible (outline or ring)
- [ ] Enter activates buttons
- [ ] Can navigate entire page without mouse

---

#### RC-UI-023: Accessibility - Screen Reader
**Priority**: P2
**Type**: Accessibility

**Prerequisites**: Screen reader software

**Steps**:
1. Navigate /cases with screen reader
2. Listen to announcements

**Expected Result**:
- [ ] Page title announced
- [ ] Buttons have labels
- [ ] Images have alt text
- [ ] Form fields have labels

---

#### RC-UI-024: Accessibility - Color Contrast (WCAG AA)
**Priority**: P1
**Type**: Accessibility

**Steps**:
1. Use contrast checker on all text
2. Check badges, buttons, links

**Expected Result**:
- [ ] Normal text: ≥ 4.5:1 contrast ratio
- [ ] Large text: ≥ 3:1 contrast ratio
- [ ] Priority badges meet AA standard
- [ ] Primary color (#B8E986) on dark text: sufficient contrast

---

#### RC-UI-025: Accessibility - Focus Indicators
**Priority**: P1
**Type**: Accessibility

**Steps**:
1. Tab through page
2. Observe focus rings

**Expected Result**:
- [ ] All focusable elements have visible focus
- [ ] Focus ring color contrasts with background
- [ ] Focus not removed by CSS (outline-none only if custom focus)

---

### 7. Integration Tests (RC-INT-001 to 010)

---

#### RC-INT-001: End-to-End - Create Case → Add to Suite → Run
**Priority**: P0
**Type**: Integration

**Steps**:
1. Create new test case "Integration Test"
2. Create new suite "Integration Suite"
3. Add "Integration Test" to suite
4. Create run from suite
5. Execute run and mark as Passed
6. View results

**Expected Result**:
- [ ] Case created successfully
- [ ] Suite created with case
- [ ] Run created from suite
- [ ] Execution completes
- [ ] Results show 1 passed

---

#### RC-INT-002: Case Update Reflects in Suite
**Priority**: P1
**Type**: Integration

**Prerequisites**: Suite contains case "Test A"

**Steps**:
1. Edit "Test A" title to "Test A Updated"
2. View suite
3. Observe case title

**Expected Result**:
- [ ] Suite shows updated title "Test A Updated"
- [ ] Changes propagate automatically

---

#### RC-INT-003: Case Update Reflects in Active Run
**Priority**: P1
**Type**: Integration

**Prerequisites**: Active run contains case "Test B"

**Steps**:
1. During run, edit "Test B" in /cases
2. Return to run
3. Observe case

**Expected Result**:
- [ ] Run shows updated case OR
- [ ] Run uses snapshot (original) - document behavior

---

#### RC-INT-004: Delete Case - Impact on Suite
**Priority**: P1
**Type**: Integration

**Prerequisites**: Suite has 3 cases including "Test C"

**Steps**:
1. Delete "Test C" from /cases
2. View suite
3. Observe case count

**Expected Result**:
- [ ] Suite now has 2 cases OR
- [ ] Error/placeholder for deleted case

---

#### RC-INT-005: Delete Case - Impact on Active Run
**Priority**: P0
**Type**: Integration

**Prerequisites**: Active run contains "Test D"

**Steps**:
1. Delete "Test D" during run
2. Continue run execution

**Expected Result**:
- [ ] Deletion blocked: "Case in active run" OR
- [ ] Run preserved with deleted case shown as placeholder

---

#### RC-INT-006: Multiple Users - Concurrent Editing
**Priority**: P2
**Type**: Integration

**Prerequisites**: 2 browser sessions

**Steps**:
1. User A edits case "Test E"
2. User B edits same case "Test E" simultaneously
3. Both save

**Expected Result**:
- [ ] Last save wins OR
- [ ] Conflict warning shown OR
- [ ] Optimistic locking prevents overwrite

**Note**: Behavior depends on backend implementation

---

#### RC-INT-007: Statistics Consistency - Cases vs Suites
**Priority**: P1
**Type**: Integration

**Steps**:
1. Create 5 test cases
2. Add 3 to Suite A, 2 to Suite B
3. Check stats on Dashboard, /cases, /suites

**Expected Result**:
- [ ] Dashboard shows 5 cases, 2 suites
- [ ] /cases shows 5
- [ ] /suites shows Suite A (3), Suite B (2)
- [ ] Counts consistent across pages

---

#### RC-INT-008: Search Across Modules
**Priority**: P2
**Type**: Integration

**Steps**:
1. Create case "Login Flow Test"
2. Create suite "Login Suite"
3. Use global search (if exists) for "Login"

**Expected Result**:
- [ ] Results show both case and suite

**Note**: If global search doesn't exist, mark as "Feature not available"

---

#### RC-INT-009: Bulk Operations - Select and Act
**Priority**: P2
**Type**: Integration

**Steps**:
1. Select 5 test cases
2. Bulk add to new suite

**Expected Result**:
- [ ] All 5 cases added to suite
- [ ] Bulk operation completes

**Note**: If bulk actions don't exist, mark as "Feature not available"

---

#### RC-INT-010: Data Persistence - Refresh Page
**Priority**: P0
**Type**: Integration

**Steps**:
1. Create test case
2. Refresh page
3. Navigate to /cases

**Expected Result**:
- [ ] Case still exists
- [ ] Data persisted to backend/localStorage
- [ ] No data loss

---

## Non-Functional Tests

---

### 8. Performance Tests (RC-PERF-001 to 010)

---

#### RC-PERF-001: Page Load Time - Home
**Priority**: P1
**Type**: Performance

**Steps**:
1. Clear cache
2. Navigate to /
3. Measure load time

**Expected Result**:
- [ ] Page loads in < 2 seconds
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Largest Contentful Paint (LCP) < 2.5s

---

#### RC-PERF-002: Page Load Time - /cases with 100 Cases
**Priority**: P1
**Type**: Performance

**Prerequisites**: 100 test cases exist

**Steps**:
1. Clear cache
2. Navigate to /cases
3. Measure load time

**Expected Result**:
- [ ] Page loads in < 3 seconds
- [ ] Grid renders smoothly
- [ ] No lag on scroll

---

#### RC-PERF-003: Page Load Time - /cases with 1000 Cases
**Priority**: P2
**Type**: Performance

**Prerequisites**: 1000 test cases exist

**Steps**:
1. Navigate to /cases
2. Observe rendering

**Expected Result**:
- [ ] Pagination OR virtualization implemented
- [ ] Page loads in < 5 seconds
- [ ] Smooth scroll with virtual scrolling

**Note**: If pagination doesn't exist, may have performance issues - document behavior

---

#### RC-PERF-004: Search Performance - Large Dataset
**Priority**: P2
**Type**: Performance

**Prerequisites**: 500+ test cases

**Steps**:
1. Enter search term
2. Measure filter time

**Expected Result**:
- [ ] Results appear in < 500ms
- [ ] Debouncing implemented (waits for typing to stop)
- [ ] No UI freeze

---

#### RC-PERF-005: Drag-Drop Performance
**Priority**: P2
**Type**: Performance

**Steps**:
1. Drag case in run builder
2. Observe frame rate

**Expected Result**:
- [ ] Smooth animation (60fps)
- [ ] No stuttering
- [ ] Visual feedback immediate

---

#### RC-PERF-006: Build Size - JavaScript Bundle
**Priority**: P2
**Type**: Performance

**Steps**:
1. Run production build: npm run build
2. Check output sizes

**Expected Result**:
- [ ] Main bundle < 500KB gzipped
- [ ] Code splitting implemented
- [ ] Lazy loading for routes

---

#### RC-PERF-007: Network - API Calls
**Priority**: P2
**Type**: Performance

**Steps**:
1. Open DevTools Network tab
2. Navigate to /cases
3. Count API calls

**Expected Result**:
- [ ] Minimal API calls (1-3 for initial load)
- [ ] Data cached after first load
- [ ] No redundant requests

---

#### RC-PERF-008: Memory Usage - No Leaks
**Priority**: P2
**Type**: Performance

**Steps**:
1. Open /cases
2. Create 10 cases
3. Delete 10 cases
4. Monitor memory in DevTools

**Expected Result**:
- [ ] Memory returns to baseline
- [ ] No memory leaks
- [ ] Heap size stable

---

#### RC-PERF-009 to 010: Reserved for Future Performance Tests

---

### 9. Security Tests (RC-SEC-001 to 010)

---

#### RC-SEC-001: XSS - Input Sanitization
**Priority**: P0
**Type**: Security

**Test Data**: `<script>alert('XSS')</script>`

**Steps**:
1. Enter malicious script in test case title
2. Save and view

**Expected Result**:
- [ ] Script NOT executed
- [ ] HTML escaped: `&lt;script&gt;alert('XSS')&lt;/script&gt;`
- [ ] Displayed as plain text

---

#### RC-SEC-002: XSS - Image Tag Injection
**Priority**: P0
**Type**: Security

**Test Data**: `<img src=x onerror=alert('XSS')>`

**Steps**:
1. Enter in step action field
2. Save and view

**Expected Result**:
- [ ] Image not rendered
- [ ] Script not executed
- [ ] HTML escaped

---

#### RC-SEC-003: SQL Injection - Search
**Priority**: P0
**Type**: Security

**Test Data**: `' OR '1'='1`

**Steps**:
1. Enter SQL injection in search
2. Observe results

**Expected Result**:
- [ ] No SQL error
- [ ] Parameterized queries used (backend)
- [ ] Returns no results or safe results

---

#### RC-SEC-004: Authentication - Unauthorized Access
**Priority**: P0
**Type**: Security

**Prerequisites**: Auth system exists

**Steps**:
1. Log out
2. Try to access /cases directly
3. Observe

**Expected Result**:
- [ ] Redirected to login page
- [ ] Cannot access protected routes

**Note**: If no auth, mark as "Auth not implemented"

---

#### RC-SEC-005: CSRF Protection
**Priority**: P1
**Type**: Security

**Steps**:
1. Check form submissions
2. Verify CSRF token

**Expected Result**:
- [ ] CSRF tokens on forms OR
- [ ] SameSite cookies used

---

#### RC-SEC-006 to 010: Reserved for Additional Security Tests

---

## Testing Schedule

### Daily (15 minutes)
- [ ] Run Smoke Tests (RC-SMOKE-001 to 007)
- [ ] Check for console errors
- [ ] Verify build passes

### Weekly (2-3 hours)
- [ ] Run Test Cases Module tests (RC-CASES-001 to 050)
- [ ] Run UI/UX tests (RC-UI-001 to 025)
- [ ] Run Integration tests (RC-INT-001 to 010)

### Sprint End (4-6 hours)
- [ ] Full regression: All modules
- [ ] Performance tests
- [ ] Security tests
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

### Pre-Release (8+ hours)
- [ ] Complete test suite (all 200+ tests)
- [ ] Manual exploratory testing
- [ ] UAT with stakeholders
- [ ] Performance profiling
- [ ] Accessibility audit

---

## Test Metrics

### Coverage Targets
- **Code Coverage**: 80% (unit tests - separate plan)
- **Functional Coverage**: 95% (all user stories tested)
- **UI Coverage**: 90% (all screens and states tested)

### Pass Rate Targets
- **Smoke Tests**: 100% must pass
- **Functional Tests**: 95% pass before release
- **Integration Tests**: 90% pass
- **UI/UX Tests**: 85% pass

### Defect Metrics
Track:
- Total defects found
- Defects by priority (P0, P1, P2, P3)
- Defects by module (Cases, Suites, Runs, Dashboard)
- Defect resolution time
- Regression defects (bugs reintroduced)

### Test Execution Metrics
Track:
- Tests executed vs total tests
- Pass/Fail/Blocked counts
- Execution time per module
- Test case maintenance burden

---

## Appendix

### Test Data Setup Script

```javascript
// scripts/seed-test-data.js
// Run this to populate database with test data

async function seedTestData() {
  // Create 20 test cases
  for (let i = 1; i <= 20; i++) {
    await createTestCase({
      title: `Test Case ${i}`,
      priority: ['P0', 'P1', 'P2', 'P3'][i % 4],
      type: ['Functional', 'UI', 'API', 'E2E'][i % 4],
      steps: [
        { n: 1, action: 'Step 1 action', expected: 'Expected result 1' },
        { n: 2, action: 'Step 2 action', expected: 'Expected result 2' },
      ],
    });
  }

  // Create 5 test suites
  // Create 3 test runs
  // ...
}
```

### Bug Report Template

```markdown
# Bug Report

**ID**: RC-BUG-XXX
**Title**: [Short description]
**Severity**: Critical / High / Medium / Low
**Priority**: P0 / P1 / P2 / P3
**Module**: Cases / Suites / Runs / Dashboard / UI

## Description
[Detailed description of the bug]

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Result
[What should happen]

## Actual Result
[What actually happens]

## Environment
- **Browser**: Chrome 120.0.5481.78
- **OS**: macOS 14.1
- **Screen Size**: 1920x1080
- **URL**: http://localhost:3000/cases

## Screenshots
[Attach screenshots/videos]

## Console Errors
```
[Paste console errors if any]
```

## Frequency
- [ ] Always reproducible
- [ ] Sometimes reproducible (50%)
- [ ] Rare (<10%)

## Workaround
[If any workaround exists]

## Related Tests
- Related test case: RC-CASES-015
```

---

**End of Test Plan**

Total Test Cases: ~200+
Modules Covered: 8
Estimated Full Execution Time: 8-10 hours
Recommended Automation: Smoke tests + Critical path tests
