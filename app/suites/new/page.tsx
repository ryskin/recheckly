"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Save, CheckCircle2 } from "lucide-react";
import { TestCase } from "@/lib/types";
import { getPriorityClasses } from "@/lib/utils";

export default function NewSuitePage() {
  const router = useRouter();
  const [suiteName, setSuiteName] = useState("");
  const [description, setDescription] = useState("");
  const [allCases, setAllCases] = useState<TestCase[]>([]);
  const [selectedCaseIds, setSelectedCaseIds] = useState<string[]>([]);
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
          ],
        },
        {
          id: "c2",
          title: "[Auth] Wrong password error",
          priority: "P0",
          type: "functional",
          steps: [
            { n: 1, action: "Open login", expected: "Form visible" },
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
        {
          id: "c5",
          title: "[API] User endpoint returns correct data",
          priority: "P1",
          type: "integration",
          steps: [
            { n: 1, action: "Call /api/user", expected: "200 response" },
          ],
        },
        {
          id: "c6",
          title: "[Auth] Logout clears session",
          priority: "P0",
          type: "smoke",
          steps: [
            { n: 1, action: "Click logout", expected: "Redirected" },
          ],
        },
      ];
      setAllCases(mockCases);
      setLoading(false);
    }, 500);
  }, []);

  const toggleCase = (caseId: string) => {
    if (selectedCaseIds.includes(caseId)) {
      setSelectedCaseIds(selectedCaseIds.filter((id) => id !== caseId));
    } else {
      setSelectedCaseIds([...selectedCaseIds, caseId]);
    }
  };

  const handleSave = async () => {
    if (!suiteName.trim()) {
      alert("Укажите название suite");
      return;
    }
    if (selectedCaseIds.length === 0) {
      alert("Выберите хотя бы один тест-кейс");
      return;
    }

    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Creating suite:", {
        name: suiteName,
        description,
        caseIds: selectedCaseIds,
      });
      router.push("/suites");
    } finally {
      setSaving(false);
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

  const selectedCases = allCases.filter((c) => selectedCaseIds.includes(c.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/suites" className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold">Создать Test Suite</h1>
            </div>
            <div className="flex gap-2">
              <Link
                href="/suites"
                className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Отмена
              </Link>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Сохранение..." : "Создать Suite"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 space-y-4">
          <h2 className="text-lg font-bold">Информация о Suite</h2>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Название
            </label>
            <input
              type="text"
              value={suiteName}
              onChange={(e) => setSuiteName(e.target.value)}
              placeholder="Auth Flow"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Описание
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Тесты для проверки аутентификации и авторизации"
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {selectedCases.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-800" />
                Выбранные тесты
              </h2>
              <span className="text-sm font-semibold text-blue-800">
                {selectedCases.length} кейсов
              </span>
            </div>

            <div className="space-y-2">
              {selectedCases.map((testCase) => (
                <div
                  key={testCase.id}
                  className="bg-gray-50 border-2 border-gray-100 rounded-lg p-3 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {testCase.title}
                    </h3>
                    <span
                      className={"text-xs px-2 py-0.5 rounded-full border font-medium " + getPriorityClasses(testCase.priority)}
                    >
                      {testCase.priority}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleCase(testCase.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-300 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">
                  {selectedCases.filter((c) => c.priority === "P0").length} критических (P0)
                </span>
                {" • "}
                {selectedCases.filter((c) => c.type === "smoke").length} smoke тестов
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <h2 className="text-lg font-bold mb-4">Выберите тест-кейсы</h2>

          <div className="space-y-2">
            {allCases.map((testCase) => {
              const isSelected = selectedCaseIds.includes(testCase.id);
              return (
                <button
                  key={testCase.id}
                  onClick={() => toggleCase(testCase.id)}
                  className={"w-full text-left border-2 rounded-lg p-4 transition-all " +
                    (isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-md")
                  }
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={"mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all " +
                        (isSelected
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300")
                      }
                    >
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">
                        {testCase.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={"text-xs px-2 py-0.5 rounded-full border font-medium " +
                            getPriorityClasses(testCase.priority)
                          }
                        >
                          {testCase.priority}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-300 uppercase font-medium">
                          {testCase.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          {testCase.steps.length} шагов
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">💡 Совет:</span> Suite — это набор
            связанных тест-кейсов. Например, все тесты для модуля аутентификации
            или оплаты.
          </p>
        </div>
      </div>
    </div>
  );
}
