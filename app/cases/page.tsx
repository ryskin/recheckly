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

  const prioColors = {
    P0: "bg-red-100 text-red-700 border-red-200",
    P1: "bg-orange-100 text-orange-700 border-orange-200",
    P2: "bg-yellow-100 text-yellow-700 border-yellow-200",
    P3: "bg-gray-100 text-gray-700 border-gray-200",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Recheckly
              </Link>
              <nav className="flex gap-1">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium"
                >
                  Runs
                </Link>
                <Link
                  href="/cases"
                  className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium"
                >
                  Test Cases
                </Link>
                <Link
                  href="/suites"
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium"
                >
                  Test Suites
                </Link>
              </nav>
            </div>
            <Link
              href="/cases/new"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl font-medium"
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
          <div className="bg-white rounded-xl p-6 border-2 border-gray-100 shadow-sm">
            <div className="text-sm font-medium text-gray-600 mb-1">Всего</div>
            <div className="text-3xl font-bold text-gray-900">{cases.length}</div>
          </div>
          {(["P0", "P1", "P2", "P3"] as const).map((p) => (
            <div
              key={p}
              className={`rounded-xl p-6 border-2 shadow-sm ${prioColors[p]}`}
            >
              <div className="text-sm font-medium mb-1">{p}</div>
              <div className="text-3xl font-bold">
                {cases.filter((c) => c.priority === p).length}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-6 space-y-4">
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
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden">
          {filteredCases.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-500 mb-2">
                {searchQuery ? "Кейсы не найдены" : "Нет test cases"}
              </p>
              <p className="text-sm text-gray-400 mb-6">
                {searchQuery
                  ? "Попробуйте изменить параметры поиска"
                  : "Создайте первый тестовый кейс"}
              </p>
              {!searchQuery && (
                <Link
                  href="/cases/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Создать Case
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredCases.map((c) => (
                <div
                  key={c.id}
                  className="p-6 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {c.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full border font-medium ${prioColors[c.priority]}`}
                        >
                          {c.priority}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase font-medium">
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
                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
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
              ))}
            </div>
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
