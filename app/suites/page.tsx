"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus, ListChecks, PlayCircle, Edit, Trash2 } from "lucide-react";

type TestSuite = {
  id: string;
  name: string;
  description: string;
  caseCount: number;
  lastRun?: string;
  createdAt: string;
};

export default function SuitesPage() {
  const [suites, setSuites] = useState<TestSuite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setSuites([
        {
          id: "s1",
          name: "Auth Flow",
          description: "Тесты аутентификации и авторизации",
          caseCount: 8,
          lastRun: "2025-11-10",
          createdAt: "2025-10-15",
        },
        {
          id: "s2",
          name: "Payment Module",
          description: "Тесты платежной системы",
          caseCount: 12,
          lastRun: "2025-11-09",
          createdAt: "2025-10-20",
        },
        {
          id: "s3",
          name: "Smoke Tests",
          description: "Критичные проверки перед деплоем",
          caseCount: 6,
          createdAt: "2025-10-01",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

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
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium"
                >
                  Test Cases
                </Link>
                <Link
                  href="/suites"
                  className="px-4 py-2 rounded-lg bg-blue-50 text-blue-900 font-medium"
                >
                  Test Suites
                </Link>
              </nav>
            </div>
            <Link
              href="/suites/new"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl font-medium"
            >
              <Plus className="w-4 h-4" />
              Создать Suite
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 border-2 border-gray-100 shadow-sm">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Всего наборов
            </div>
            <div className="text-3xl font-bold text-gray-900">{suites.length}</div>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-blue-100 shadow-sm">
            <div className="text-sm font-medium text-blue-900 mb-1">
              Всего кейсов
            </div>
            <div className="text-3xl font-bold text-blue-900">
              {suites.reduce((sum, s) => sum + s.caseCount, 0)}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
            <div className="text-sm font-medium text-green-700 mb-1">
              Активных runs
            </div>
            <div className="text-3xl font-bold text-green-700">1</div>
          </div>
        </div>

        {/* Suites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suites.map((suite) => (
            <div
              key={suite.id}
              className="bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-blue-300 transition-all overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {suite.name}
                    </h3>
                    <p className="text-sm text-gray-600">{suite.description}</p>
                  </div>
                  <ListChecks className="w-8 h-8 text-blue-800 flex-shrink-0" />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">
                      {suite.caseCount} тестов
                    </div>
                    {suite.lastRun && (
                      <div className="text-xs text-gray-500">
                        Последний run:{" "}
                        {new Date(suite.lastRun).toLocaleDateString("ru-RU")}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  href={`/dashboard/new-run?suite=${suite.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  <PlayCircle className="w-4 h-4" />
                  Запустить
                </Link>
                <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}

          {/* Add New Card */}
          <Link
            href="/suites/new"
            className="bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all p-6 flex flex-col items-center justify-center text-center group min-h-[200px]"
          >
            <Plus className="w-12 h-12 text-gray-400 group-hover:text-blue-800 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-700 group-hover:text-blue-800 transition-colors mb-1">
              Создать новый набор
            </h3>
            <p className="text-sm text-gray-500">
              Сгруппируйте тесты в логические наборы
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
