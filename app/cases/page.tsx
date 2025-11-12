"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  FileText,
  Edit,
  Trash2,
  Copy,
  Folder,
  FolderOpen,
  ChevronRight,
  Upload,
  CheckCircle2,
  X,
  RotateCcw,
} from "lucide-react";
import { TestCase, TestModule } from "@/lib/types";
import { getPriorityClasses, PRIORITY_COLORS } from "@/lib/utils";

const MODULES: { name: TestModule; icon: string; count?: number }[] = [
  { name: "Smoke Tests", icon: "🔥" },
  { name: "Test Cases", icon: "📝" },
  { name: "Test Suites", icon: "📦" },
  { name: "Test Runs", icon: "▶️" },
  { name: "Dashboard", icon: "📊" },
  { name: "UI/UX", icon: "🎨" },
  { name: "Integration", icon: "🔗" },
  { name: "Performance", icon: "⚡" },
  { name: "Security", icon: "🔒" },
  { name: "Onboarding", icon: "👋" },
];

export default function CasesPage() {
  const [cases, setCases] = useState<TestCase[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("ALL");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [selectedModule, setSelectedModule] = useState<TestModule | "ALL">("ALL");
  const [loading, setLoading] = useState(true);
  const [editingCase, setEditingCase] = useState<TestCase | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importedCases, setImportedCases] = useState<TestCase[]>([]);
  const [importSuccess, setImportSuccess] = useState(false);
  const [importStats, setImportStats] = useState({ added: 0, skipped: 0 });

  useEffect(() => {
    // Mock data with module assignments
    setTimeout(() => {
      setCases([
        {
          id: "RC-SMOKE-001",
          title: "Create and Delete Test Case",
          priority: "P0",
          type: "functional",
          module: "Smoke Tests",
          steps: [
            { n: 1, action: "Navigate to /cases", expected: "Cases page visible" },
            { n: 2, action: "Click 'New Case' button", expected: "Modal opens" },
            { n: 3, action: "Enter title: 'Smoke Test Case'", expected: "Title filled" },
            { n: 4, action: "Select priority: P1", expected: "Priority selected" },
            { n: 5, action: "Click Save", expected: "Case created successfully" },
          ],
        },
        {
          id: "RC-SMOKE-002",
          title: "Edit Test Case",
          priority: "P0",
          type: "functional",
          module: "Smoke Tests",
          steps: [
            { n: 1, action: "Navigate to /cases", expected: "Cases page visible" },
            { n: 2, action: "Hover over any test case", expected: "Edit icon appears" },
            { n: 3, action: "Click Edit (pencil icon)", expected: "Edit modal opens" },
            { n: 4, action: "Change title to 'Edited Title'", expected: "Title updated" },
            { n: 5, action: "Click Save", expected: "Changes saved successfully" },
          ],
        },
        {
          id: "RC-CASES-001",
          title: "Create New Test Case - Minimum Fields",
          priority: "P0",
          type: "functional",
          module: "Test Cases",
          steps: [
            { n: 1, action: "Navigate to /cases", expected: "Cases page visible" },
            { n: 2, action: "Click 'New Case' button", expected: "Modal opens" },
            { n: 3, action: "Enter title: 'Login Test'", expected: "Title entered" },
            { n: 4, action: "Select priority: P1", expected: "Priority selected" },
            { n: 5, action: "Click Save", expected: "Case created successfully" },
          ],
        },
        {
          id: "RC-CASES-011",
          title: "Delete Test Case",
          priority: "P0",
          type: "functional",
          module: "Test Cases",
          steps: [
            { n: 1, action: "Navigate to /cases", expected: "Cases page visible" },
            { n: 2, action: "Hover over test case", expected: "Delete icon appears" },
            { n: 3, action: "Click Delete (trash icon)", expected: "Confirmation dialog appears" },
            { n: 4, action: "Confirm deletion", expected: "Case removed from grid" },
          ],
        },
        {
          id: "RC-SUITES-001",
          title: "Create New Suite - Minimum Fields",
          priority: "P0",
          type: "functional",
          module: "Test Suites",
          steps: [
            { n: 1, action: "Navigate to /suites/new", expected: "Suite creation page visible" },
            { n: 2, action: "Enter name: 'Login Suite'", expected: "Name entered" },
            { n: 3, action: "Select 1 test case", expected: "Case selected" },
            { n: 4, action: "Click Save", expected: "Suite created successfully" },
          ],
        },
        {
          id: "RC-RUNS-001",
          title: "Create Run - Drag and Drop Case",
          priority: "P0",
          type: "functional",
          module: "Test Runs",
          steps: [
            { n: 1, action: "Navigate to /dashboard/new-run", expected: "New run page visible" },
            { n: 2, action: "Drag test case from available list", expected: "Drag animation smooth" },
            { n: 3, action: "Drop into run builder area", expected: "Case appears in run builder" },
          ],
        },
        {
          id: "RC-UI-001",
          title: "Design System - Color Palette",
          priority: "P1",
          type: "ui",
          module: "UI/UX",
          steps: [
            { n: 1, action: "Navigate through all pages", expected: "Background: #E8F0EF (mint-gray)" },
            { n: 2, action: "Verify primary accent", expected: "Primary: #B8E986 (lime-green)" },
            { n: 3, action: "Check card colors", expected: "Cards: #FFFFFF (white)" },
          ],
        },
        {
          id: "RC-INT-001",
          title: "End-to-End - Create Case → Add to Suite → Run",
          priority: "P0",
          type: "integration",
          module: "Integration",
          steps: [
            { n: 1, action: "Create new test case", expected: "Case created" },
            { n: 2, action: "Create new suite", expected: "Suite created" },
            { n: 3, action: "Add case to suite", expected: "Case added" },
            { n: 4, action: "Create run from suite", expected: "Run created" },
          ],
        },
        {
          id: "RC-PERF-001",
          title: "Page Load Time - Home",
          priority: "P1",
          type: "performance",
          module: "Performance",
          steps: [
            { n: 1, action: "Clear cache", expected: "Cache cleared" },
            { n: 2, action: "Navigate to /", expected: "Page loads" },
            { n: 3, action: "Measure load time", expected: "Load time < 2 seconds" },
          ],
        },
        {
          id: "RC-SEC-001",
          title: "XSS - Input Sanitization",
          priority: "P0",
          type: "security",
          module: "Security",
          steps: [
            { n: 1, action: "Enter malicious script in title", expected: "Script NOT executed" },
            { n: 2, action: "Save and view", expected: "HTML escaped" },
          ],
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  // Calculate module counts
  const moduleCounts = MODULES.map((m) => ({
    ...m,
    count: cases.filter((c) => c.module === m.name).length,
  }));

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority = filterPriority === "ALL" || c.priority === filterPriority;
    const matchesType = filterType === "ALL" || c.type === filterType;
    const matchesModule = selectedModule === "ALL" || c.module === selectedModule;

    return matchesSearch && matchesPriority && matchesType && matchesModule;
  });

  const handleDelete = (id: string) => {
    const caseToDelete = cases.find(c => c.id === id);
    if (!caseToDelete) return;

    if (confirm(`Удалить тест-кейс "${caseToDelete.title}"?`)) {
      setCases(cases.filter(c => c.id !== id));
      // В реальности: await fetch(`/api/cases/${id}`, { method: 'DELETE' })
    }
  };

  const handleCopy = (id: string) => {
    const caseToCopy = cases.find(c => c.id === id);
    if (!caseToCopy) return;

    const newCase: TestCase = {
      ...caseToCopy,
      id: `c${Date.now()}`,
      title: `${caseToCopy.title} (копия)`,
    };

    setCases([newCase, ...cases]);
    // В реальности: await fetch('/api/cases', { method: 'POST', body: JSON.stringify(newCase) })
  };

  const handleEdit = (id: string) => {
    const caseToEdit = cases.find(c => c.id === id);
    if (caseToEdit) {
      setEditingCase(caseToEdit);
    }
  };

  const handleSaveEdit = () => {
    if (!editingCase) return;

    setCases(cases.map(c => c.id === editingCase.id ? editingCase : c));
    setEditingCase(null);
    // В реальности: await fetch(`/api/cases/${editingCase.id}`, { method: 'PUT', body: JSON.stringify(editingCase) })
  };

  const parseCSV = (csvText: string): TestCase[] => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    // Skip header row
    const dataLines = lines.slice(1);
    const parsedCases: TestCase[] = [];

    for (const line of dataLines) {
      // Parse CSV with quoted fields
      const fields: string[] = [];
      let currentField = '';
      let insideQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          fields.push(currentField.trim());
          currentField = '';
        } else {
          currentField += char;
        }
      }
      fields.push(currentField.trim()); // Push last field

      if (fields.length < 8) continue; // Skip invalid rows

      const [id, title, priority, type, module, _prerequisites, stepsStr, expectedStr] = fields;

      // Parse steps (pipe-separated format)
      const stepActions = stepsStr.split('|').map(s => s.trim());
      const stepExpecteds = expectedStr.split('|').map(s => s.trim());

      const steps = stepActions.map((action, index) => ({
        n: index + 1,
        action,
        expected: stepExpecteds[index] || '',
      }));

      const testCase: TestCase = {
        id: id.trim(),
        title: title.trim(),
        priority: priority.trim() as "P0" | "P1" | "P2" | "P3",
        type: type.toLowerCase().trim(),
        module: module.trim() as TestModule,
        steps,
      };

      parsedCases.push(testCase);
    }

    return parsedCases;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSV(text);
      setImportedCases(parsed);
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    // Filter out duplicates by ID - keep existing cases, only add new ones
    const existingIds = new Set(cases.map(c => c.id));
    const newCases = importedCases.filter(c => !existingIds.has(c.id));
    const duplicateCount = importedCases.length - newCases.length;

    setImportStats({ added: newCases.length, skipped: duplicateCount });
    setCases([...cases, ...newCases]);
    setImportSuccess(true);

    setTimeout(() => {
      setShowImportModal(false);
      setImportSuccess(false);
      setImportedCases([]);
      setImportStats({ added: 0, skipped: 0 });
    }, 2000);
  };

  const handleLoadDemoData = async () => {
    try {
      const response = await fetch('/test-cases-import.csv');
      const text = await response.text();
      const parsed = parseCSV(text);
      setCases(parsed);
      alert(`Загружено ${parsed.length} тест-кейсов!`);
    } catch (error) {
      console.error('Error loading demo data:', error);
      alert('Ошибка загрузки демо-данных');
    }
  };

  const handleClearAll = () => {
    if (confirm(`Удалить ВСЕ тест-кейсы (${cases.length})?`)) {
      setCases([]);
      alert('Все тест-кейсы удалены');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg font-medium text-gray-700">Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <div className="bg-white" style={{ boxShadow: 'var(--shadow-sm)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                Recheckly
              </Link>
              <nav className="flex gap-2">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg font-medium transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F3F4F6'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  Runs
                </Link>
                <Link
                  href="/cases"
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{ background: 'var(--color-primary)', color: 'var(--color-text)' }}
                >
                  Test Cases
                </Link>
                <Link
                  href="/suites"
                  className="px-4 py-2 rounded-lg font-medium transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F3F4F6'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  Test Suites
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              {cases.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all border-2 border-red-300 text-red-600 bg-white hover:bg-red-50"
                  title="Удалить все тест-кейсы"
                >
                  <RotateCcw className="w-4 h-4" />
                  Очистить
                </button>
              )}
              <button
                onClick={handleLoadDemoData}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all border-2"
                style={{
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-text)',
                  background: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
              >
                <Upload className="w-4 h-4" />
                Demo Data
              </button>
              <button
                onClick={() => setShowImportModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all"
                style={{ background: 'var(--color-primary)', color: 'var(--color-text)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Upload className="w-4 h-4" />
                Import CSV
              </button>
              <Link
                href="/cases/new"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all"
                style={{ background: 'var(--color-text)', color: 'white', boxShadow: 'var(--shadow)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow)';
                }}
              >
                <Plus className="w-4 h-4" />
                Создать Case
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Sidebar - Module Navigation */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-4 sticky top-8" style={{ boxShadow: 'var(--shadow)' }}>
              <h3 className="text-sm font-bold mb-3 px-2" style={{ color: 'var(--color-text)' }}>
                Модули
              </h3>
              <div className="space-y-1">
                {/* All modules */}
                <button
                  onClick={() => setSelectedModule("ALL")}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left transition-all ${
                    selectedModule === "ALL"
                      ? "font-semibold"
                      : "hover:bg-gray-50"
                  }`}
                  style={{
                    background: selectedModule === "ALL" ? "var(--color-primary)" : "transparent",
                    color: selectedModule === "ALL" ? "var(--color-text)" : "var(--color-text-secondary)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">Все тесты</span>
                  </div>
                  <span className="text-xs font-bold">{cases.length}</span>
                </button>

                {/* Module folders */}
                {moduleCounts.map((module) => (
                  <button
                    key={module.name}
                    onClick={() => setSelectedModule(module.name)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left transition-all ${
                      selectedModule === module.name
                        ? "font-semibold"
                        : "hover:bg-gray-50"
                    }`}
                    style={{
                      background: selectedModule === module.name ? "var(--color-primary)" : "transparent",
                      color: selectedModule === module.name ? "var(--color-text)" : "var(--color-text-secondary)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {selectedModule === module.name ? (
                        <FolderOpen className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <Folder className="w-4 h-4 flex-shrink-0" />
                      )}
                      <span className="text-sm truncate">{module.name}</span>
                    </div>
                    <span className="text-xs font-bold">{module.count || 0}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <button
                onClick={() => setSelectedModule("ALL")}
                className={`hover:underline ${selectedModule === "ALL" ? "font-semibold" : ""}`}
                style={{ color: selectedModule === "ALL" ? "var(--color-text)" : "var(--color-text-secondary)" }}
              >
                Все тесты
              </button>
              {selectedModule !== "ALL" && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                    {selectedModule}
                  </span>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow)' }}>
                <div className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                  {selectedModule === "ALL" ? "Всего" : "В модуле"}
                </div>
                <div className="text-4xl font-bold" style={{ color: 'var(--color-text)' }}>
                  {selectedModule === "ALL" ? cases.length : filteredCases.length}
                </div>
              </div>
              {(["P0", "P1", "P2", "P3"] as const).map((p) => (
                <div
                  key={p}
                  className={`rounded-xl p-6 ${getPriorityClasses(p)}`}
                  style={{ boxShadow: 'var(--shadow)' }}
                >
                  <div className="text-sm font-semibold mb-1">{p}</div>
                  <div className="text-4xl font-bold">
                    {filteredCases.filter((c) => c.priority === p).length}
                  </div>
                </div>
              ))}
            </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 space-y-4" style={{ boxShadow: 'var(--shadow)' }}>
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск кейсов..."
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="pl-10 pr-8 py-2 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer font-medium"
              >
                <option value="ALL">Все приоритеты</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
              </select>
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer font-medium"
            >
              <option value="ALL">Все типы</option>
              <option value="smoke">Smoke</option>
              <option value="functional">Functional</option>
              <option value="regression">Regression</option>
              <option value="integration">Integration</option>
              <option value="performance">Performance</option>
              <option value="security">Security</option>
            </select>
          </div>
        </div>

        {/* Cases List */}
        {filteredCases.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center" style={{ boxShadow: 'var(--shadow)' }}>
            <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--color-text-secondary)', opacity: 0.3 }} />
            <p className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
              {searchQuery ? "Кейсы не найдены" : "Нет test cases"}
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              {searchQuery
                ? "Попробуйте изменить параметры поиска"
                : "Создайте первый тестовый кейс"}
            </p>
            {!searchQuery && (
              <Link
                href="/cases/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all"
                style={{ background: 'var(--color-text)', color: 'white', boxShadow: 'var(--shadow)' }}
              >
                <Plus className="w-4 h-4" />
                Создать Case
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCases.map((c) => (
              <Link
                key={c.id}
                href={`/cases/${c.id}`}
                className="bg-white rounded-xl p-5 group transition-all flex flex-col cursor-pointer"
                style={{ boxShadow: 'var(--shadow)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full border font-semibold ${getPriorityClasses(c.priority)}`}
                    >
                      {c.priority}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-300 uppercase font-semibold">
                      {c.type}
                    </span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleEdit(c.id);
                      }}
                      className="p-1.5 hover:bg-blue-50 text-blue-800 rounded-lg transition-colors z-10"
                      title="Редактировать"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCopy(c.id);
                      }}
                      className="p-1.5 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors z-10"
                      title="Копировать"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(c.id);
                      }}
                      className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors z-10"
                      title="Удалить"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-base mb-2 line-clamp-2" style={{ color: 'var(--color-text)' }}>
                  {c.title}
                </h3>

                <div className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                  {c.steps.length} {c.steps.length === 1 ? "шаг" : "шагов"} • ID: {c.id}
                </div>

                <div className="space-y-1.5 flex-1">
                  {c.steps.slice(0, 2).map((step) => (
                    <div
                      key={step.n}
                      className="text-xs flex gap-2"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      <span className="font-semibold text-gray-400 flex-shrink-0">
                        {step.n}.
                      </span>
                      <span className="line-clamp-2">{step.action}</span>
                    </div>
                  ))}
                  {c.steps.length > 2 && (
                    <div className="text-xs text-gray-400 italic">
                      + еще {c.steps.length - 2}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
          </div>
          {/* End Main Content */}
        </div>
        {/* End Flex Container */}
      </div>
      {/* End Max Width Container */}

      {/* Edit Modal */}
      {editingCase && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Редактировать тест-кейс</h2>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Название</label>
                <input
                  type="text"
                  value={editingCase.title}
                  onChange={(e) => setEditingCase({ ...editingCase, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Priority & Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Приоритет</label>
                  <select
                    value={editingCase.priority}
                    onChange={(e) => setEditingCase({ ...editingCase, priority: e.target.value as any })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="P0">P0 - Критичный</option>
                    <option value="P1">P1 - Высокий</option>
                    <option value="P2">P2 - Средний</option>
                    <option value="P3">P3 - Низкий</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Тип</label>
                  <select
                    value={editingCase.type}
                    onChange={(e) => setEditingCase({ ...editingCase, type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="smoke">Smoke</option>
                    <option value="functional">Functional</option>
                    <option value="regression">Regression</option>
                    <option value="integration">Integration</option>
                    <option value="performance">Performance</option>
                    <option value="security">Security</option>
                  </select>
                </div>
              </div>

              {/* Steps */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Шаги</label>
                <div className="space-y-3">
                  {editingCase.steps.map((step, index) => (
                    <div key={step.n} className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-500">Шаг {step.n}</span>
                        {editingCase.steps.length > 1 && (
                          <button
                            onClick={() => {
                              const newSteps = editingCase.steps.filter((_, i) => i !== index);
                              setEditingCase({
                                ...editingCase,
                                steps: newSteps.map((s, i) => ({ ...s, n: i + 1 }))
                              });
                            }}
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={step.action}
                        onChange={(e) => {
                          const newSteps = [...editingCase.steps];
                          newSteps[index] = { ...step, action: e.target.value };
                          setEditingCase({ ...editingCase, steps: newSteps });
                        }}
                        placeholder="Действие"
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={step.expected}
                        onChange={(e) => {
                          const newSteps = [...editingCase.steps];
                          newSteps[index] = { ...step, expected: e.target.value };
                          setEditingCase({ ...editingCase, steps: newSteps });
                        }}
                        placeholder="Ожидаемый результат"
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setEditingCase({
                      ...editingCase,
                      steps: [...editingCase.steps, { n: editingCase.steps.length + 1, action: "", expected: "" }]
                    });
                  }}
                  className="mt-3 flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Добавить шаг
                </button>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setEditingCase(null)}
                className="px-6 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 font-medium"
              >
                Отмена
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Импорт тест-кейсов</h2>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportedCases([]);
                  setImportSuccess(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {importSuccess ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
                  <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                    Успешно импортировано!
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    {importStats.added} тест-кейсов добавлено
                    {importStats.skipped > 0 && ` (${importStats.skipped} пропущено как дубликаты)`}
                  </p>
                </div>
              ) : importedCases.length > 0 ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-700" />
                      <div>
                        <div className="font-bold text-blue-900">
                          Найдено {importedCases.length} тест-кейсов
                        </div>
                        <div className="text-sm text-blue-700">
                          Проверьте данные перед импортом
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {importedCases.map((testCase, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex gap-2 mb-2">
                              <span className={`text-xs px-2 py-1 rounded-full border font-semibold ${getPriorityClasses(testCase.priority)}`}>
                                {testCase.priority}
                              </span>
                              <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-300 uppercase font-semibold">
                                {testCase.type}
                              </span>
                              {testCase.module && (
                                <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700 font-semibold">
                                  {testCase.module}
                                </span>
                              )}
                            </div>
                            <div className="font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                              {testCase.title}
                            </div>
                            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                              ID: {testCase.id} • {testCase.steps.length} шагов
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Upload className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--color-text-secondary)', opacity: 0.3 }} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                    Выберите CSV файл
                  </h3>
                  <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                    Формат: ID, Title, Priority, Type, Module, Prerequisites, Steps, Expected Result
                  </p>
                  <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all cursor-pointer"
                    style={{ background: 'var(--color-primary)', color: 'var(--color-text)' }}
                  >
                    <Upload className="w-5 h-5" />
                    Выбрать файл
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            {importedCases.length > 0 && !importSuccess && (
              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => {
                    setShowImportModal(false);
                    setImportedCases([]);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Отмена
                </button>
                <button
                  onClick={handleConfirmImport}
                  className="flex-1 px-6 py-3 rounded-lg transition-colors font-medium text-white"
                  style={{ background: 'var(--color-text)' }}
                >
                  Импортировать {importedCases.length} кейсов
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
