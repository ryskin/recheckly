"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";

type TestStep = {
  id: string;
  action: string;
  expected: string;
};

export default function NewCasePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"P0" | "P1" | "P2" | "P3">("P1");
  const [type, setType] = useState("functional");
  const [steps, setSteps] = useState<TestStep[]>([
    { id: "1", action: "", expected: "" },
  ]);
  const [saving, setSaving] = useState(false);

  const addStep = () => {
    setSteps([
      ...steps,
      { id: Date.now().toString(), action: "", expected: "" },
    ]);
  };

  const removeStep = (id: string) => {
    if (steps.length > 1) {
      setSteps(steps.filter((s) => s.id !== id));
    }
  };

  const updateStep = (
    id: string,
    field: "action" | "expected",
    value: string
  ) => {
    setSteps(
      steps.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Укажите название кейса");
      return;
    }

    const validSteps = steps.filter((s) => s.action.trim() || s.expected.trim());
    if (validSteps.length === 0) {
      alert("Добавьте хотя бы один шаг");
      return;
    }

    setSaving(true);
    try {
      // Имитируем сохранение
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const caseData = {
        title,
        priority,
        type,
        steps: validSteps.map((s, i) => ({
          n: i + 1,
          action: s.action,
          expected: s.expected,
        })),
      };

      console.log("Saving case:", caseData);

      // В реальности здесь будет:
      // await fetch('/api/cases', {
      //   method: 'POST',
      //   body: JSON.stringify(caseData)
      // })

      router.push("/cases");
    } finally {
      setSaving(false);
    }
  };

  const priorityColors = {
    P0: "bg-red-100 text-red-700 border-red-300",
    P1: "bg-orange-100 text-orange-700 border-orange-300",
    P2: "bg-yellow-100 text-yellow-700 border-yellow-300",
    P3: "bg-gray-100 text-gray-700 border-gray-300",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/cases"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                Создать Test Case
              </h1>
            </div>
            <div className="flex gap-2">
              <Link
                href="/cases"
                className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all font-medium"
              >
                Отмена
              </Link>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl font-medium disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Сохранение..." : "Сохранить"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Название теста
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="[Feature] Описание тестового сценария"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Приоритет
                </label>
                <div className="flex gap-2">
                  {(["P0", "P1", "P2", "P3"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`flex-1 px-3 py-2 rounded-lg border-2 font-semibold text-sm transition-all ${
                        priority === p
                          ? priorityColors[p]
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Тип теста
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white cursor-pointer font-medium"
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
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Шаги тестирования
              </h2>
              <button
                onClick={addStep}
                className="flex items-center gap-2 px-3 py-2 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all font-medium text-sm"
              >
                <Plus className="w-4 h-4" />
                Добавить шаг
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="border-2 border-gray-100 rounded-xl p-4 bg-gradient-to-br from-gray-50 to-white space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">
                      Шаг {index + 1}
                    </span>
                    {steps.length > 1 && (
                      <button
                        onClick={() => removeStep(step.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Действие
                    </label>
                    <input
                      type="text"
                      value={step.action}
                      onChange={(e) =>
                        updateStep(step.id, "action", e.target.value)
                      }
                      placeholder="Что нужно сделать..."
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Ожидаемый результат
                    </label>
                    <input
                      type="text"
                      value={step.expected}
                      onChange={(e) =>
                        updateStep(step.id, "expected", e.target.value)
                      }
                      placeholder="Что должно произойти..."
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">💡 Совет:</p>
              <p>
                Используйте четкие формулировки действий и ожидаемых результатов.
                Хороший тест-кейс должен быть понятен любому члену команды.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
