# Recheckly Testing Quick Reference

## Daily Smoke Test (15 minutes)

**Before each deployment or start of day:**

### 1. Test Cases Module (5 min)
- [ ] Create new test case with title "Daily Smoke Test"
- [ ] Edit the case - change title to "Daily Smoke Test - Edited"
- [ ] Copy the case - verify "(копия)" suffix
- [ ] Delete the copy
- [ ] Verify stats update correctly
- [ ] Check grid layout: 3 columns on desktop, 2 on tablet, 1 on mobile

### 2. Test Suites Module (3 min)
- [ ] Navigate to /suites/new
- [ ] Create suite "Daily Suite" with 2-3 test cases
- [ ] Verify checkbox selection works
- [ ] Save and verify suite appears in /suites list

### 3. Test Runs Module (5 min)
- [ ] Navigate to /dashboard/new-run
- [ ] Drag 2 test cases into run builder
- [ ] Enter run name "Daily Smoke Run"
- [ ] Start run
- [ ] Mark first case as Passed
- [ ] Mark second case as Failed with comment "Test comment"
- [ ] Verify progress bar shows 2/2
- [ ] Check results summary

### 4. UI/Design System (2 min)
- [ ] Verify background color: #E8F0EF (mint-gray)
- [ ] Verify primary accent: #B8E986 (lime-green)
- [ ] Check hover effects on cards (lift + shadow)
- [ ] Verify no console errors

**Pass Criteria**: All checklist items ✅ = Safe to deploy

---

## Weekly Regression Test (2-3 hours)

### Test Cases Module (45 min)

**CRUD Operations:**
- [ ] RC-CASES-001: Create case with minimum fields
- [ ] RC-CASES-002: Create case with all fields (5 steps)
- [ ] RC-CASES-003: Validation errors (empty, too short, too long)
- [ ] RC-CASES-004: Edit case - modify title
- [ ] RC-CASES-005: Edit case - change priority P1→P0
- [ ] RC-CASES-006: Edit case - add steps
- [ ] RC-CASES-007: Edit case - remove steps
- [ ] RC-CASES-009: Copy case
- [ ] RC-CASES-011: Delete case with confirmation
- [ ] RC-CASES-012: Cancel delete

**Search & Filter:**
- [ ] RC-CASES-021: Search by exact title
- [ ] RC-CASES-022: Search by partial match
- [ ] RC-CASES-023: Search with no results
- [ ] RC-CASES-025: Filter by priority (P0)
- [ ] RC-CASES-027: Filter by type (Functional)
- [ ] RC-CASES-028: Combined filters (search + priority)

**Display:**
- [ ] RC-CASES-031: Grid 3 columns on desktop
- [ ] RC-CASES-032: Grid 2 columns on tablet
- [ ] RC-CASES-033: Grid 1 column on mobile
- [ ] RC-CASES-034: Hover effects (lift + shadow + buttons fade in)
- [ ] RC-CASES-037: Stats cards show correct counts

**Validation:**
- [ ] RC-CASES-041: Title required
- [ ] RC-CASES-042: Title min length (3 chars)
- [ ] RC-CASES-043: Title max length (200 chars)
- [ ] RC-CASES-044: At least 1 step required
- [ ] RC-CASES-050: XSS protection - HTML injection blocked

### Test Suites Module (30 min)

**Suite Management:**
- [ ] RC-SUITES-001: Create suite with 1 case
- [ ] RC-SUITES-002: Create suite with description
- [ ] RC-SUITES-004: Suite name validation
- [ ] RC-SUITES-005: Edit suite - change name
- [ ] RC-SUITES-006: Edit suite - add cases
- [ ] RC-SUITES-007: Edit suite - remove cases
- [ ] RC-SUITES-008: Delete suite (cases not deleted)
- [ ] RC-SUITES-010: View suite details

**Case Selection:**
- [ ] RC-SUITES-021: Checkbox select single case
- [ ] RC-SUITES-022: Checkbox select multiple cases
- [ ] RC-SUITES-023: Deselect case
- [ ] RC-SUITES-025: Selected cases summary

### Test Runs Module (45 min)

**Run Creation:**
- [ ] RC-RUNS-001: Drag-drop case into run builder
- [ ] RC-RUNS-002: Add multiple cases (5 cases)
- [ ] RC-RUNS-004: Remove case from run
- [ ] RC-RUNS-005: Reorder cases (drag-drop)
- [ ] RC-RUNS-006: Enter run name and start
- [ ] RC-RUNS-007: Run name validation

**Run Execution:**
- [ ] RC-RUNS-021: Mark case as Passed
- [ ] RC-RUNS-022: Mark case as Failed
- [ ] RC-RUNS-023: Mark case as Skipped
- [ ] RC-RUNS-024: Mark case as Blocked
- [ ] RC-RUNS-025: Add comment to failed case
- [ ] RC-RUNS-026: Change status (Failed→Passed)
- [ ] RC-RUNS-030: Progress bar updates in real-time
- [ ] RC-RUNS-033: Complete run (all cases executed)

### UI/UX Tests (30 min)

**Design System:**
- [ ] RC-UI-001: Color palette consistent (#E8F0EF, #B8E986, #FFFFFF)
- [ ] RC-UI-002: Shadows (default and hover)
- [ ] RC-UI-003: Border radius (rounded-xl cards)
- [ ] RC-UI-004: Typography (system font stack)

**Interactions:**
- [ ] RC-UI-006: Hover lift effect (translateY(-2px))
- [ ] RC-UI-007: Action buttons fade in on hover

**Responsive:**
- [ ] RC-UI-011: Desktop 1920x1080 layout
- [ ] RC-UI-013: Tablet 768px layout
- [ ] RC-UI-014: Mobile 375px layout

**Accessibility:**
- [ ] RC-UI-022: Keyboard navigation with Tab
- [ ] RC-UI-024: Color contrast WCAG AA (≥4.5:1)

### Integration Tests (20 min)

- [ ] RC-INT-001: E2E - Create case → Add to suite → Run → Execute
- [ ] RC-INT-002: Case update reflects in suite
- [ ] RC-INT-004: Delete case - impact on suite
- [ ] RC-INT-007: Stats consistency across Dashboard/Cases/Suites
- [ ] RC-INT-010: Data persistence after page refresh

---

## Pre-Release Full Regression (4-6 hours)

**Complete all Weekly Regression tests PLUS:**

### Additional Test Cases Module
- [ ] RC-CASES-008: Reorder steps
- [ ] RC-CASES-010: Copy case multiple times
- [ ] RC-CASES-013: Delete last test case
- [ ] RC-CASES-014: Delete case used in suite
- [ ] RC-CASES-015: Delete case in active run
- [ ] RC-CASES-019: Special characters in title
- [ ] RC-CASES-020: Cyrillic and emoji in title
- [ ] RC-CASES-024: Clear search/filters
- [ ] RC-CASES-035: Card content display (5 steps)
- [ ] RC-CASES-036: Title truncation (long title)
- [ ] RC-CASES-038: Stats real-time update

### Additional Suites Module
- [ ] RC-SUITES-003: Create suite - no cases selected
- [ ] RC-SUITES-009: Cancel suite deletion
- [ ] RC-SUITES-011: Suite case count badge
- [ ] RC-SUITES-012: Search suites by name
- [ ] RC-SUITES-014: Suite with deleted case
- [ ] RC-SUITES-024: Search available cases
- [ ] RC-SUITES-030: Case card preview

### Additional Runs Module
- [ ] RC-RUNS-008: Create run - no cases (error)
- [ ] RC-RUNS-009: Duplicate case in run
- [ ] RC-RUNS-010: Search cases in run builder
- [ ] RC-RUNS-011: Filter cases by priority
- [ ] RC-RUNS-031: View case details in run
- [ ] RC-RUNS-034: Complete run with pending cases
- [ ] RC-RUNS-039: View run history
- [ ] RC-RUNS-040: Delete run

### Dashboard Module
- [ ] RC-DASH-001: Test Cases stat display
- [ ] RC-DASH-002: Test Suites stat display
- [ ] RC-DASH-003: Test Runs stat display
- [ ] RC-DASH-004: Stats real-time update
- [ ] RC-DASH-005: Recent runs display (last 5)
- [ ] RC-DASH-006: Click run in recent runs
- [ ] RC-DASH-007: Quick action - New Run
- [ ] RC-DASH-008: Quick action - New Case
- [ ] RC-DASH-009: Quick action - New Suite
- [ ] RC-DASH-010: Empty dashboard (0 data)

### Performance Tests
- [ ] RC-PERF-001: Home page load < 2s
- [ ] RC-PERF-002: /cases with 100 cases load < 3s
- [ ] RC-PERF-003: /cases with 1000 cases (pagination)
- [ ] RC-PERF-004: Search performance < 500ms

### Security Tests
- [ ] RC-SEC-001: XSS - script injection blocked
- [ ] RC-SEC-002: XSS - image tag injection blocked
- [ ] RC-SEC-003: SQL injection in search

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## Bug Severity Guide

### P0 - Critical (Fix Immediately)
- Data loss (test cases/suites/runs deleted unintentionally)
- Application crash or completely broken
- Security vulnerabilities (XSS, SQL injection successful)
- Cannot create/edit/delete core entities

**Examples:**
- Delete button deletes all cases instead of one
- XSS script executes and steals data
- Cannot save test cases at all

### P1 - High (Fix in Current Sprint)
- Core functionality broken with no workaround
- Major UI/UX issues affecting majority of users
- Performance issues making app unusable

**Examples:**
- Grid layout completely broken on mobile
- Search doesn't work at all
- Run execution doesn't save results

### P2 - Medium (Fix in Next Sprint)
- Feature partially working, workaround exists
- Minor UI/UX issues
- Edge case bugs

**Examples:**
- Hover effects don't work on one button
- Stats update after refresh, not real-time
- Long titles don't truncate properly

### P3 - Low (Fix When Time Permits)
- Cosmetic issues
- Rare edge cases
- Enhancement requests

**Examples:**
- Icon slightly misaligned
- Tooltip spelling error
- Color shade slightly off

---

## Test Data Setup

### Quick Setup (for Smoke Tests)
```bash
# Create 5 test cases manually:
# - "Login Test" (P1, Functional)
# - "Signup Test" (P2, Functional)
# - "Dashboard Load" (P1, UI)
# - "API Integration" (P0, API)
# - "E2E Checkout" (P0, E2E)

# Create 1 suite:
# - "Smoke Suite" with 3 cases

# Create 1 run:
# - "Daily Smoke Run" with 2 cases
```

### Full Setup (for Weekly/Pre-Release)
```bash
# Run seed script (if available):
npm run seed:test-data

# Or create manually:
# - 20 test cases (varied priorities and types)
# - 5 test suites (with different case counts)
# - 3 completed test runs (with mixed pass/fail)
```

---

## Common Issues & Troubleshooting

### Issue: Grid layout not showing 3 columns on desktop
**Check:**
- Browser width is actually ≥1024px (lg breakpoint)
- Tailwind classes: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- No conflicting CSS

### Issue: Hover effects not working
**Check:**
- JavaScript not erroring (check console)
- `onMouseEnter` and `onMouseLeave` handlers present
- CSS transitions: `transition-all duration-200`

### Issue: Stats not updating after creating case
**Check:**
- State management (useState) updates
- Re-render triggered
- Filter/search not hiding new case

### Issue: Test case not saving
**Check:**
- Validation errors (title, steps)
- Network tab for API call failures
- Console errors

---

## Test Report Template

### Daily Smoke Test Report

**Date:** 2025-11-12
**Tester:** [Your Name]
**Duration:** 15 minutes
**Environment:** http://localhost:3000

**Results:**
- ✅ Test Cases CRUD: PASSED
- ✅ Suites Creation: PASSED
- ✅ Runs Execution: PASSED
- ✅ UI/Design System: PASSED

**Overall Status:** ✅ PASS - Safe to deploy

**Bugs Found:** None

**Notes:** All smoke tests passed. Grid layout working correctly on all breakpoints.

---

### Weekly Regression Report

**Date:** 2025-11-12
**Tester:** [Your Name]
**Duration:** 2.5 hours
**Environment:** http://localhost:3000
**Browser:** Chrome 120.0.5481.78

**Module Results:**
- Test Cases: 25/25 PASSED (100%)
- Test Suites: 12/12 PASSED (100%)
- Test Runs: 15/15 PASSED (100%)
- UI/UX: 14/14 PASSED (100%)
- Integration: 5/5 PASSED (100%)

**Overall:** 71/71 PASSED (100%)

**Bugs Found:**
- None

**Performance:**
- Home page load: 1.2s ✅
- /cases with 50 cases: 2.1s ✅

**Notes:**
- All critical paths working
- Responsive design verified on desktop/tablet/mobile
- No console errors
- Ready for release

---

## Quick Command Reference

### Development
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Type check
npm run type-check
```

### Testing (Manual)
```bash
# Open browser to test
open http://localhost:3000

# Test on specific viewport
# Use browser DevTools → Device Toolbar
# Presets: iPhone SE (375px), iPad (768px), Desktop (1920px)
```

### Test Data
```bash
# Seed test data (if script exists)
npm run seed:test-data

# Reset database (if script exists)
npm run db:reset
```

---

**Quick Links:**
- 📄 [Full Test Plan](./test-plan.md)
- 📊 [Test Cases CSV Import](./test-cases-import.csv)
- 🐛 [Bug Report Template](./test-plan.md#bug-report-template)
- 📈 [Test Metrics](./test-plan.md#test-metrics)
