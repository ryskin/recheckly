"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Plus, Trash2, Save, GripVertical, CheckCircle2 } from "lucide-react";
import { TestCase } from "@/lib/types";

export default function NewRunPage() {
  const router = useRouter();
  const [runName, setRunName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [allCases, setAllCases] = useState<TestCase[]>([]);
  const [selectedCases, setSelectedCases] = useState<TestCase[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedCase, setDraggedCase] = useState<TestCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const mockCases: TestCase[] = [
        {
          id: "c1",
          title: "[Auth] Login with valid credentials",
          priority: "P0",
          type: "smoke",
          steps: [
            { n: 1, action: "Open app", expected: "Home visible" },
            { n: 2, action: "Go to Login", expected: "Login form visible" },
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
          ],
        },
        {
          id: "c4",
          title: "[Payment] Process card payment",
          priority: "P0",
          type: "integration",
          steps: [
            { n: 1, action: "Add to cart", expected: "Cart updated" },
          ],
        },
      ];
      setAllCases(mockCases);
      setLoading(false);
    }, 500);
  }, []);

  const filteredCases = allCases.filter((c) => {
    const matchesSearch = !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const notSelected = !selectedCases.find((s) => s.id === c.id);
    return matchesSearch && notSelected;
  });

  const handleDragStart = (e: React.DragEvent, testCase: TestCase) => {
    setDraggedCase(testCase);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedCase && !selectedCases.find((c) => c.id === draggedCase.id)) {
      setSelectedCases([...selectedCases, draggedCase]);
    }
    setDraggedCase(null);
  };

  const addCase = (testCase: TestCase) => {
    if (!selectedCases.find((c) => c.id === testCase.id)) {
      setSelectedCases([...selectedCases, testCase]);
    }
  };

  const removeCase = (id: string) => {
    setSelectedCases(selectedCases.filter((c) => c.id !== id));
  };

  const handleSave = async () => {
    if (!runName.trim()) {
      alert("Укажите название run");
      return;
    }
    if (selectedCases.length === 0) {
      alert("Добавьте хотя бы один тест-кейс");
      return;
    }

    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard");
    } finally {
      setSaving(false);
    }
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
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold">Создать Test Run</h1>
            </div>
            <div className="flex gap-2">
              <Link href="/dashboard" className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50">
                Отмена
              </Link>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Сохранение..." : "Создать Run"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 space-y-4">
              <h2 className="text-lg font-bold">Информация о Run</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Название</label>
                <input
                  type="text"
                  value={runName}
                  onChange={(e) => setRunName(e.target.value)}
                  placeholder="Sprint 23 - Auth & Profile"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Назначить</label>
                <input
                  type="text"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="Иван Петров"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  Выбранные тесты
                </h2>
                <span className="text-sm font-semibold text-blue-600">{selectedCases.length} кейсов</span>
              </div>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className={`min-h-[400px] border-2 border-dashed rounded-xl p-4 ${draggedCase ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-gray-50"}`}
              >
                {selectedCases.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <GripVertical className="w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium mb-1">Перетащите сюда тест-кейсы</p>
                    <p className="text-sm text-gray-400">или нажмите + на кейсе справа</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedCases.map((testCase, index) => (
                      <div key={testCase.id} className="bg-white border-2 border-gray-100 rounded-lg p-3 group">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2 flex-1">
                            <span className="text-xs font-bold text-gray-400 mt-1">{index + 1}.</span>
                            <div className="flex-1">
                              <h3 className="text-sm font-semibold text-gray-900 mb-1">{testCase.title}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${prioColors[testCase.priority]}`}>
                                {testCase.priority}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeCase(testCase.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 space-y-4">
              <h2 className="text-lg font-bold">Доступные тест-кейсы</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск кейсов..."
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredCases.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Все кейсы добавлены</p>
                  </div>
                ) : (
                  filteredCases.map((testCase) => (
                    <div
                      key={testCase.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, testCase)}
                      className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-lg p-3 hover:border-blue-200 hover:shadow-md cursor-move group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2 flex-1">
                          <GripVertical className="w-4 h-4 text-gray-300 mt-1" />
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">{testCase.title}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${prioColors[testCase.priority]}`}>
                              {testCase.priority}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => addCase(testCase)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded opacity-0 group-hover:opacity-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">💡 Совет:</span> Перетаскивайте тест-кейсы из правой панели в корзину слева или используйте кнопку +
          </p>
        </div>
      </div>
    </div>
  );
}
