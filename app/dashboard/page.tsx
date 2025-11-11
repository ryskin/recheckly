"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Plus,
  ListChecks,
  FileText,
  PlayCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  TrendingUp,
  Calendar,
} from "lucide-react";

type RunStatus = "in_progress" | "completed" | "draft";

type RunListItem = {
  id: string;
  name: string;
  status: RunStatus;
  suiteId: string;
  suiteName: string;
  assignedTo?: string;
  createdAt: string;
  completedAt?: string;
  stats: {
    total: number;
    pass: number;
    fail: number;
    pending: number;
  };
};

export default function DashboardPage() {
  const [runs, setRuns] = useState<RunListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - в реальности это будет API вызов
    setTimeout(() => {
      setRuns([
        {
          id: "demo",
          name: "Sprint 23 - Auth & Profile",
          status: "in_progress",
          suiteId: "s1",
          suiteName: "Auth Flow",
          assignedTo: "Иван Петров",
          createdAt: "2025-11-10T10:00:00Z",
          stats: { total: 6, pass: 2, fail: 1, pending: 3 },
        },
        {
          id: "r2",
          name: "Regression - Payment Module",
          status: "completed",
          suiteId: "s2",
          suiteName: "Payment Tests",
          assignedTo: "Мария Сидорова",
          createdAt: "2025-11-09T14:00:00Z",
          completedAt: "2025-11-09T18:30:00Z",
          stats: { total: 12, pass: 10, fail: 2, pending: 0 },
        },
        {
          id: "r3",
          name: "Smoke - Production Deploy",
          status: "draft",
          suiteId: "s3",
          suiteName: "Smoke Suite",
          createdAt: "2025-11-11T09:00:00Z",
          stats: { total: 8, pass: 0, fail: 0, pending: 8 },
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const statusConfig = {
    in_progress: {
      label: "В процессе",
      color: "bg-blue-100 text-blue-700 border-blue-200",
      icon: PlayCircle,
    },
    completed: {
      label: "Завершен",
      color: "bg-green-100 text-green-700 border-green-200",
      icon: CheckCircle2,
    },
    draft: {
      label: "Черновик",
      color: "bg-gray-100 text-gray-700 border-gray-200",
      icon: Clock,
    },
  };

  const totalStats = runs.reduce(
    (acc, run) => ({
      total: acc.total + run.stats.total,
      pass: acc.pass + run.stats.pass,
      fail: acc.fail + run.stats.fail,
      pending: acc.pending + run.stats.pending,
    }),
    { total: 0, pass: 0, fail: 0, pending: 0 }
  );

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
                  className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium"
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
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium"
                >
                  Test Suites
                </Link>
              </nav>
            </div>
            <Link
              href="/dashboard/new-run"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl font-medium"
            >
              <Plus className="w-4 h-4" />
              Создать Run
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 border-2 border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Всего тестов</span>
              <ListChecks className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{totalStats.total}</div>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-700">Passed</span>
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-700">{totalStats.pass}</div>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-red-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-red-700">Failed</span>
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-3xl font-bold text-red-700">{totalStats.fail}</div>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Pending</span>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-700">{totalStats.pending}</div>
          </div>
        </div>

        {/* Runs List */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Test Runs</h2>
            <p className="text-sm text-gray-600 mt-1">
              Управляйте тестовыми запусками и отслеживайте прогресс
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {runs.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-500 mb-2">
                  Нет созданных runs
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  Создайте первый test run, чтобы начать тестирование
                </p>
                <Link
                  href="/dashboard/new-run"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Создать Run
                </Link>
              </div>
            ) : (
              runs.map((run) => {
                const config = statusConfig[run.status];
                const StatusIcon = config.icon;
                const progress =
                  run.stats.total > 0
                    ? ((run.stats.pass + run.stats.fail) / run.stats.total) * 100
                    : 0;

                return (
                  <div
                    key={run.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Link
                            href={`/runs/${run.id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                          >
                            {run.name}
                          </Link>
                          <span
                            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full border font-medium ${config.color}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {config.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {run.suiteName}
                          </span>
                          {run.assignedTo && (
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {run.assignedTo}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(run.createdAt).toLocaleDateString("ru-RU")}
                          </span>
                        </div>

                        {/* Progress */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex gap-4">
                              <span className="text-green-700 font-medium">
                                ✓ {run.stats.pass}
                              </span>
                              <span className="text-red-700 font-medium">
                                ✗ {run.stats.fail}
                              </span>
                              <span className="text-gray-600">
                                ⏳ {run.stats.pending}
                              </span>
                            </div>
                            <span className="font-semibold text-gray-900">
                              {Math.round(progress)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 transition-all duration-500"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/runs/${run.id}`}
                          className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all font-medium text-sm"
                        >
                          Открыть
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/cases/new"
            className="p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all group"
          >
            <Plus className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 mb-1">Создать Test Case</h3>
            <p className="text-sm text-gray-600">
              Добавьте новый тестовый кейс в библиотеку
            </p>
          </Link>

          <Link
            href="/suites/new"
            className="p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all group"
          >
            <ListChecks className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 mb-1">Создать Test Suite</h3>
            <p className="text-sm text-gray-600">
              Сгруппируйте кейсы в тестовый набор
            </p>
          </Link>

          <Link
            href="/dashboard/reports"
            className="p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all group"
          >
            <TrendingUp className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 mb-1">Отчеты</h3>
            <p className="text-sm text-gray-600">
              Анализ результатов и статистика
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
