"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardCheck,
  FileText,
  ListChecks,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full space-y-8">
        {/* Hero */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Recheckly
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            Современная платформа для управления тестированием
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Создавайте тест-кейсы, организуйте их в наборы, запускайте проверки
            и получайте детальные отчёты. Всё в одном месте.
          </p>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/dashboard"
            className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all p-8 border-2 border-transparent hover:border-blue-300"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                <LayoutDashboard className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-800 transition-colors">
                  QA Dashboard
                </h2>
                <p className="text-gray-600 mb-4">
                  Управляйте тест-кейсами, создавайте наборы и запускайте test runs
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-blue-50 text-blue-900 rounded-full font-medium">
                    Test Cases
                  </span>
                  <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">
                    Test Suites
                  </span>
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full font-medium">
                    Test Runs
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <Link
            href="/runs/demo"
            className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all p-8 border-2 border-transparent hover:border-purple-300"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                <ClipboardCheck className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  Запустить тестирование
                </h2>
                <p className="text-gray-600 mb-4">
                  Начните выполнение тестов с быстрой установкой статусов
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full font-medium">
                    Keyboard Shortcuts
                  </span>
                  <span className="text-xs px-2 py-1 bg-orange-50 text-orange-700 rounded-full font-medium">
                    Offline Mode
                  </span>
                  <span className="text-xs px-2 py-1 bg-blue-50 text-blue-900 rounded-full font-medium">
                    Auto-save
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
            <FileText className="w-10 h-10 text-blue-800 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Создавайте кейсы</h3>
            <p className="text-sm text-gray-600">
              Описывайте тест-кейсы с шагами, приоритетами и типами
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
            <ListChecks className="w-10 h-10 text-purple-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Группируйте в наборы</h3>
            <p className="text-sm text-gray-600">
              Объединяйте кейсы в логические test suites для удобства
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
            <Zap className="w-10 h-10 text-green-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Быстрое выполнение</h3>
            <p className="text-sm text-gray-600">
              Горячие клавиши, автосохранение и offline-режим
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>
            Простой и мощный инструмент для QA-команд любого размера
          </p>
        </div>
      </div>
    </div>
  );
}
