# Recheckly Testing Documentation

> **Modular test architecture inspired by TestRail/Zephyr, but simpler and better organized.**

## 📁 Documentation Structure

```
docs/
├── README.md                    # You are here
├── test-plan.md                 # Complete test plan (200+ test cases)
├── test-cases-import.csv        # CSV for TestRail/Zephyr import
└── testing-checklist.md         # Quick reference for daily/weekly testing
```

---

## 🎯 Quick Start

### For QA Engineers - Daily Testing

**Morning smoke test (15 minutes):**
1. Open [testing-checklist.md](./testing-checklist.md)
2. Follow the "Daily Smoke Test" section
3. Check all boxes as you complete tests
4. If all ✅ → Safe to deploy

**Found a bug?**
- Use the [Bug Report Template](./test-plan.md#bug-report-template) in test-plan.md
- Assign priority: P0 (critical) → P3 (low)
- Report in issue tracker

### For QA Leads - Test Planning

**Before sprint:**
1. Review [test-plan.md](./test-plan.md) modules
2. Assign test cases to team members
3. Set coverage goals (see [Test Metrics](./test-plan.md#test-metrics))

**Weekly review:**
1. Check [Testing Schedule](./test-plan.md#testing-schedule)
2. Run weekly regression (2-3 hours)
3. Update test cases as features change

### For Developers - Understanding Testing

**Before implementing a feature:**
1. Check [test-plan.md](./test-plan.md) for related tests
2. Understand expected behavior from test cases
3. Write code that passes acceptance criteria

**After implementing:**
1. Run relevant smoke tests
2. Fix any failing tests
3. Add new test cases if feature is new

---

## 📋 Documentation Files Explained

### 1. test-plan.md

**What:** Complete test plan with 200+ test cases organized by module

**Structure:**
```
1. Overview & Strategy
2. Smoke Tests (7 tests, 15 min daily)
3. Module Tests:
   - Test Cases (50 tests)
   - Test Suites (30 tests)
   - Test Runs (40 tests)
   - Dashboard (20 tests)
4. UI/UX Tests (25 tests, cross-module)
5. Integration Tests (10 tests)
6. Performance Tests (10 tests)
7. Security Tests (10 tests)
8. Testing Schedule & Metrics
```

**When to use:**
- Full regression testing (before release)
- Understanding all test coverage
- Writing new test cases
- Importing into TestRail/Zephyr

**How to navigate:**
- Use Table of Contents
- Jump to specific module (e.g., "Test Cases Module")
- Search for test ID (e.g., RC-CASES-015)

**Test ID Format:**
```
RC-[MODULE]-[NUMBER]

Examples:
RC-SMOKE-001    → Smoke test #1
RC-CASES-015    → Test Cases module, test #15
RC-RUNS-021     → Test Runs module, test #21
RC-UI-014       → UI/UX test #14
```

---

### 2. test-cases-import.csv

**What:** CSV export of key test cases for importing into TestRail, Zephyr, or similar TMS (Test Management Systems)

**Columns:**
- ID: Unique test identifier (e.g., RC-CASES-001)
- Title: Short test name
- Priority: P0 (critical) to P3 (low)
- Type: Functional, UI, Integration, Performance, Security
- Module: Test Cases, Suites, Runs, Dashboard, etc.
- Prerequisites: Setup requirements
- Steps: Numbered test steps
- Expected Result: What should happen

**How to import:**

**TestRail:**
1. Go to Test Cases section
2. Click "Import" → "CSV"
3. Upload `test-cases-import.csv`
4. Map columns: ID → Case ID, Title → Title, etc.
5. Import

**Zephyr:**
1. Navigate to project
2. Tests → Import Test Cases
3. Choose CSV format
4. Upload file
5. Map fields and import

**Jira Xray:**
1. Import → Test Cases
2. CSV format
3. Map columns
4. Import

**Manual import (any system):**
- Use the CSV as reference
- Copy-paste test cases manually
- Maintain ID structure for traceability

---

### 3. testing-checklist.md

**What:** Quick reference guide for daily, weekly, and pre-release testing

**Sections:**

**Daily Smoke Test (15 min):**
- 7 critical tests covering all modules
- Must pass before deployment
- Checkbox format for easy tracking

**Weekly Regression (2-3 hours):**
- Subset of full test plan (~70 tests)
- Covers main functionality
- Run before sprint end

**Pre-Release Full Regression (4-6 hours):**
- All 200+ tests
- Run before major releases
- Includes cross-browser testing

**Bonus:**
- Bug severity guide
- Test data setup instructions
- Common issues & troubleshooting
- Test report templates

**When to use:**
- Every morning (smoke test)
- End of sprint (weekly regression)
- Before release (full regression)
- When you need a quick test reference

---

## 🏗️ Test Organization

### Modular Architecture

Tests are organized by **module** for easy navigation and maintenance:

```
Recheckly
├── Smoke Tests (RC-SMOKE-*)         # Critical path, 15 min
├── Test Cases Module (RC-CASES-*)   # /cases page functionality
├── Test Suites Module (RC-SUITES-*) # /suites functionality
├── Test Runs Module (RC-RUNS-*)     # /runs and execution
├── Dashboard Module (RC-DASH-*)     # /dashboard overview
├── UI/UX Tests (RC-UI-*)            # Cross-module design/UX
├── Integration Tests (RC-INT-*)     # Multi-module workflows
├── Performance Tests (RC-PERF-*)    # Load time, responsiveness
└── Security Tests (RC-SEC-*)        # XSS, injection, auth
```

### Priority Levels

**P0 - Critical:**
- Data loss, security issues, app crash
- **Action:** Fix immediately, block deployment
- **Examples:** Delete deletes all data, XSS vulnerability

**P1 - High:**
- Core functionality broken, no workaround
- **Action:** Fix in current sprint
- **Examples:** Cannot create test cases, search broken

**P2 - Medium:**
- Feature partially working, workaround exists
- **Action:** Fix in next sprint
- **Examples:** Stats update after refresh, not real-time

**P3 - Low:**
- Cosmetic issues, rare edge cases
- **Action:** Fix when time permits
- **Examples:** Icon misaligned, color slightly off

---

## 🔄 Testing Workflow

### Daily Workflow (QA Engineer)

```
9:00 AM  → Run smoke tests (15 min)
9:15 AM  → Report results (pass/fail)
9:30 AM  → If failed, file bugs
10:00 AM → Feature testing (assigned features)
4:00 PM  → Regression of today's changes
5:00 PM  → Update test cases if needed
```

### Weekly Workflow (QA Team)

```
Monday    → Test new features from sprint planning
Tuesday   → Continue feature testing
Wednesday → Bug bash (exploratory testing)
Thursday  → Weekly regression (2-3 hours)
Friday    → Bug verification, update test plan
```

### Release Workflow (Before Production Deploy)

```
Day 1: Full regression (all modules)
Day 2: Performance & security testing
Day 3: Cross-browser testing (Chrome, Firefox, Safari, Edge)
Day 4: UAT (User Acceptance Testing)
Day 5: Final smoke test → DEPLOY ✅
```

---

## 📊 Test Metrics

### Coverage Goals

| Metric | Target | Current |
|--------|--------|---------|
| Smoke Tests Pass Rate | 100% | - |
| Functional Tests Pass Rate | 95% | - |
| Integration Tests Pass Rate | 90% | - |
| Code Coverage (unit tests) | 80% | - |

### Tracking

**Update weekly:**
- Total tests: 200+
- Passed: ?
- Failed: ?
- Blocked: ?
- Pass rate: ?%

**Bug metrics:**
- P0 bugs: ? (target: 0)
- P1 bugs: ? (target: < 3)
- P2 bugs: ?
- P3 bugs: ?

---

## 🛠️ Test Environment Setup

### Local Testing

```bash
# Clone repository
git clone https://github.com/yourusername/recheckly.git
cd recheckly

# Install dependencies
npm install

# Start dev server
npm run dev

# Open browser
open http://localhost:3000
```

### Test Data

**Quick setup (for smoke tests):**
```bash
# Manually create:
# - 5 test cases
# - 1 suite with 3 cases
# - 1 run with 2 cases
```

**Full setup (for regression):**
```bash
# If seed script exists:
npm run seed:test-data

# Otherwise, manually create:
# - 20 test cases (varied priorities/types)
# - 5 suites
# - 3 completed runs
```

### Browser Setup

**Required browsers:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest) - macOS only
- Edge (latest) - Windows only

**Responsive testing:**
- Use DevTools → Device Toolbar
- Test viewports:
  - Mobile: 375x667 (iPhone SE)
  - Tablet: 768x1024 (iPad)
  - Desktop: 1920x1080, 1440x900

---

## 🐛 Bug Reporting

### When You Find a Bug

1. **Check if it's already reported:** Search existing issues
2. **Reproduce:** Confirm bug happens consistently
3. **Document:** Use [Bug Report Template](./test-plan.md#bug-report-template)
4. **Assign priority:**
   - P0: Data loss, crash, security
   - P1: Core feature broken
   - P2: Partial functionality
   - P3: Cosmetic
5. **Report:** Create issue with template
6. **Track:** Update test execution results

### Bug Report Checklist

- [ ] Clear title (e.g., "Delete button deletes all cases instead of one")
- [ ] Steps to reproduce (numbered, detailed)
- [ ] Expected vs Actual result
- [ ] Screenshots/video (if applicable)
- [ ] Environment (browser, OS, screen size)
- [ ] Priority (P0-P3)
- [ ] Related test case ID (e.g., RC-CASES-011)

---

## 🎓 For New QA Engineers

### Week 1: Learning the System

**Day 1-2: Understand the Product**
- Read main README.md
- Explore the app manually (create cases, suites, runs)
- Understand user workflows

**Day 3-4: Learn the Tests**
- Read this README
- Review [test-plan.md](./test-plan.md) structure
- Run smoke tests following [testing-checklist.md](./testing-checklist.md)

**Day 5: First Real Testing**
- Run weekly regression with mentor
- File first bug using template
- Update test cases if needed

### Month 1: Becoming Productive

- Run daily smoke tests independently
- Participate in weekly regression
- File bugs correctly with priority
- Suggest test case improvements

### Month 3: Full Speed

- Own a module (e.g., Test Cases)
- Write new test cases for new features
- Mentor new QA engineers
- Contribute to test automation planning

---

## 🚀 Advanced Topics

### Test Automation

**Candidates for automation:**
1. Smoke tests (RC-SMOKE-001 to 007)
2. CRUD operations (RC-CASES-001 to 020)
3. Search/Filter (RC-CASES-021 to 030)
4. Responsive layout (RC-UI-011 to 014)

**Suggested tools:**
- Playwright (E2E testing)
- Vitest (unit/component testing)
- Axe (accessibility testing)

**Priority:**
1. Automate smoke tests first
2. Then critical path (E2E workflow)
3. Then regression tests

### Performance Testing

**Tools:**
- Lighthouse (Chrome DevTools)
- WebPageTest
- Next.js built-in analytics

**Key metrics:**
- FCP (First Contentful Paint): < 1.5s
- LCP (Largest Contentful Paint): < 2.5s
- TTI (Time to Interactive): < 3.5s
- CLS (Cumulative Layout Shift): < 0.1

### Accessibility Testing

**Manual testing:**
- Keyboard navigation (Tab, Enter, Esc)
- Screen reader (VoiceOver, NVDA)
- Color contrast checker

**Automated testing:**
- Axe DevTools extension
- WAVE browser extension
- Lighthouse accessibility audit

**Standards:**
- WCAG 2.1 Level AA compliance
- Color contrast: ≥ 4.5:1 (normal text)
- Keyboard accessible
- Screen reader friendly

---

## 📞 Support & Questions

### Need Help?

**Understanding a test case:**
- Read the full test in [test-plan.md](./test-plan.md)
- Check prerequisites and test data
- Ask QA lead if unclear

**Found an issue with test plan:**
- Test case outdated? Update it!
- Missing test coverage? Add new test!
- Create PR with changes

**Want to contribute:**
- Follow the modular structure (RC-[MODULE]-[NUMBER])
- Add to appropriate module section
- Update CSV export if needed
- Keep checklist in sync

### Contact

- **QA Lead:** [Name]
- **Team Channel:** #qa-testing
- **Bug Reports:** GitHub Issues
- **Test Plan Updates:** Submit PR to docs/

---

## 📚 Additional Resources

### Internal Links

- [Full Test Plan](./test-plan.md) - 200+ test cases
- [Quick Checklist](./testing-checklist.md) - Daily/weekly testing
- [CSV Import](./test-cases-import.csv) - For TestRail/Zephyr

### External Resources

- [TestRail Documentation](https://www.gurock.com/testrail/docs)
- [Zephyr Scale Docs](https://support.smartbear.com/zephyr-scale-cloud/docs/)
- [ISTQB Testing Glossary](https://glossary.istqb.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🔄 Changelog

### Version 1.0 (2025-11-12)

**Added:**
- Complete test plan with 200+ test cases
- Modular organization (8 modules)
- Smoke tests (7 tests, 15 min daily)
- CSV export for TestRail/Zephyr
- Quick reference checklist
- Bug report template
- Test metrics and schedule

**Modules:**
- ✅ Smoke Tests (7 tests)
- ✅ Test Cases (50 tests)
- ✅ Test Suites (30 tests)
- ✅ Test Runs (40 tests)
- ✅ Dashboard (20 tests)
- ✅ UI/UX (25 tests)
- ✅ Integration (10 tests)
- ✅ Performance (10 tests)
- ✅ Security (10 tests)

**Coverage:**
- CRUD operations
- Search & Filter
- Display & Layout
- Validation
- Responsive design
- Accessibility
- Performance
- Security

---

**Last Updated:** 2025-11-12
**Maintained By:** QA Team
**Version:** 1.0
