"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Edit, Trash2, CheckCircle2, ChevronRight } from "lucide-react";
import { TestCase } from "@/lib/types";
import { getPriorityClasses } from "@/lib/utils";

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [testCase, setTestCase] = useState<TestCase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - в реальности: fetch(`/api/cases/${params.id}`)
    setTimeout(() => {
      // Используем те же данные, что и на главной странице
      const mockCases: TestCase[] = [
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
      ];

      const foundCase = mockCases.find((c) => c.id === params.id);
      setTestCase(foundCase || null);
      setLoading(false);
    }, 300);
  }, [params.id]);

  const handleDelete = () => {
    if (!testCase) return;

    if (confirm(`Удалить тест-кейс "${testCase.title}"?`)) {
      // В реальности: await fetch(`/api/cases/${testCase.id}`, { method: 'DELETE' })
      router.push("/cases");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-lg font-medium text-gray-700">Загрузка...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!testCase) {
    return (
      <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
            Тест-кейс не найден
          </h1>
          <p className="mb-8" style={{ color: "var(--color-text-secondary)" }}>
            ID: {params.id}
          </p>
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all"
            style={{ background: "var(--color-text)", color: "white", boxShadow: "var(--shadow)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Вернуться к списку
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* Header */}
      <div className="bg-white" style={{ boxShadow: "var(--shadow-sm)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
                Recheckly
              </Link>
              <nav className="flex gap-2">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg font-medium transition-colors"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Runs
                </Link>
                <Link
                  href="/cases"
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{ background: "var(--color-primary)", color: "var(--color-text)" }}
                >
                  Test Cases
                </Link>
                <Link
                  href="/suites"
                  className="px-4 py-2 rounded-lg font-medium transition-colors"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Test Suites
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Back button + Breadcrumbs */}
        <div className="flex items-center gap-3">
          <Link
            href="/cases"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white transition-colors"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </Link>
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            <Link href="/cases" className="hover:underline">
              Все тесты
            </Link>
            {testCase.module && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span>{testCase.module}</span>
              </>
            )}
            <ChevronRight className="w-4 h-4" />
            <span className="font-semibold" style={{ color: "var(--color-text)" }}>
              {testCase.id}
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl p-8" style={{ boxShadow: "var(--shadow)" }}>
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`text-xs px-3 py-1.5 rounded-full border font-semibold ${getPriorityClasses(testCase.priority)}`}>
                  {testCase.priority}
                </span>
                <span className="text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-900 border border-blue-300 uppercase font-semibold">
                  {testCase.type}
                </span>
                {testCase.module && (
                  <span className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 font-semibold">
                    {testCase.module}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
                {testCase.title}
              </h1>
              <div className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                ID: {testCase.id}
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/cases/${testCase.id}/edit`}
                className="p-3 hover:bg-blue-50 text-blue-800 rounded-lg transition-colors"
                title="Редактировать"
              >
                <Edit className="w-5 h-5" />
              </Link>
              <button
                onClick={handleDelete}
                className="p-3 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                title="Удалить"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Steps */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--color-text)" }}>
              Шаги тестирования ({testCase.steps.length})
            </h2>
            <div className="space-y-4">
              {testCase.steps.map((step) => (
                <div
                  key={step.n}
                  className="bg-gray-50 rounded-xl p-5 border-2 border-gray-100 hover:border-gray-200 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ background: "var(--color-primary)", color: "var(--color-text)" }}
                    >
                      {step.n}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="text-xs font-bold uppercase mb-1" style={{ color: "var(--color-text-secondary)" }}>
                          Действие
                        </div>
                        <div className="text-base" style={{ color: "var(--color-text)" }}>
                          {step.action}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase mb-1 flex items-center gap-1" style={{ color: "var(--color-text-secondary)" }}>
                          <CheckCircle2 className="w-3 h-3" />
                          Ожидаемый результат
                        </div>
                        <div className="text-base" style={{ color: "var(--color-text)" }}>
                          {step.expected}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            href={`/cases/${testCase.id}/edit`}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all"
            style={{ background: "var(--color-text)", color: "white", boxShadow: "var(--shadow)" }}
          >
            <Edit className="w-4 h-4" />
            Редактировать
          </Link>
          <button
            onClick={handleDelete}
            className="px-5 py-3 rounded-xl font-semibold transition-all border-2 border-red-200 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
