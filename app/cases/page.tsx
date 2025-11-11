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
} from "lucide-react";
import { TestCase } from "@/lib/types";
import { getPriorityClasses, PRIORITY_COLORS } from "@/lib/utils";

export default function CasesPage() {
  const [cases, setCases] = useState<TestCase[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("ALL");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);
  const [editingCase, setEditingCase] = useState<TestCase | null>(null);

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setCases([
        {
          id: "c1",
          title: "[Auth] Login with valid credentials",
          priority: "P0",
          type: "smoke",
          steps: [
            { n: 1, action: "Open app", expected: "Home visible" },
            { n: 2, action: "Go to Login", expected: "Login form visible" },
            { n: 3, action: "Enter valid creds & Submit", expected: "Dashboard visible" },
          ],
        },
        {
          id: "c2",
          title: "[Auth] Wrong password error",
          priority: "P0",
          type: "functional",
          steps: [
            { n: 1, action: "Open login", expected: "Form visible" },
            { n: 2, action: "Enter wrong password", expected: "Error shown" },
          ],
        },
        {
          id: "c3",
          title: "[Profile] Update user information",
          priority: "P1",
          type: "functional",
          steps: [
            { n: 1, action: "Go to Profile", expected: "Profile page" },
            { n: 2, action: "Edit name", expected: "Name updated" },
          ],
        },
        {
          id: "c4",
          title: "[Payment] Process card payment",
          priority: "P0",
          type: "integration",
          steps: [
            { n: 1, action: "Add to cart", expected: "Cart updated" },
            { n: 2, action: "Go to checkout", expected: "Payment form" },
            { n: 3, action: "Enter card details", expected: "Payment processed" },
          ],
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority = filterPriority === "ALL" || c.priority === filterPriority;
    const matchesType = filterType === "ALL" || c.type === filterType;

    return matchesSearch && matchesPriority && matchesType;
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

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow)' }}>
            <div className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-secondary)' }}>Всего</div>
            <div className="text-4xl font-bold" style={{ color: 'var(--color-text)' }}>{cases.length}</div>
          </div>
          {(["P0", "P1", "P2", "P3"] as const).map((p) => (
            <div
              key={p}
              className={`rounded-xl p-6 ${getPriorityClasses(p)}`}
              style={{ boxShadow: 'var(--shadow)' }}
            >
              <div className="text-sm font-semibold mb-1">{p}</div>
              <div className="text-4xl font-bold">
                {cases.filter((c) => c.priority === p).length}
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
        <div className="space-y-3">
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
            filteredCases.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-xl p-6 group transition-all"
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
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {c.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full border font-medium ${getPriorityClasses(c.priority)}`}
                        >
                          {c.priority}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-300 uppercase font-medium">
                          {c.type}
                        </span>
                      </div>

                      <div className="text-sm text-gray-600 mb-3">
                        {c.steps.length} {c.steps.length === 1 ? "шаг" : "шагов"}
                        {" • "}ID: {c.id}
                      </div>

                      <div className="space-y-1">
                        {c.steps.slice(0, 2).map((step) => (
                          <div
                            key={step.n}
                            className="text-sm text-gray-600 flex gap-2"
                          >
                            <span className="font-medium text-gray-400">
                              {step.n}.
                            </span>
                            <span className="flex-1">{step.action}</span>
                          </div>
                        ))}
                        {c.steps.length > 2 && (
                          <div className="text-sm text-gray-400 italic">
                            + еще {c.steps.length - 2} шаг(ов)
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(c.id)}
                        className="p-2 hover:bg-blue-50 text-blue-800 rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCopy(c.id)}
                        className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
                        title="Копировать"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
              </div>
            ))
          )}
        </div>
      </div>

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
    </div>
  );
}
