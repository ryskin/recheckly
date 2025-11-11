"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardCheck,
  FileText,
  ListChecks,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-5xl w-full space-y-12">
        {/* Hero */}
        <div className="text-center space-y-6">
          <h1 className="text-7xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
            Recheckly
          </h1>
          <p className="text-2xl font-medium" style={{ color: 'var(--color-text)' }}>
            Современная платформа для управления тестированием
          </p>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Создавайте тест-кейсы, организуйте их в наборы, запускайте проверки
            и получайте детальные отчёты. Всё в одном месте.
          </p>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/dashboard"
            className="group bg-white rounded-2xl p-8 transition-all duration-200 hover:translate-y-[-4px]"
            style={{ boxShadow: 'var(--shadow)', }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow)'}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl" style={{ background: 'var(--color-primary)' }}>
                  <LayoutDashboard className="w-7 h-7" style={{ color: 'var(--color-text)' }} />
                </div>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-text-secondary)' }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                  QA Dashboard
                </h2>
                <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  Управляйте тест-кейсами, создавайте наборы и запускайте test runs
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: '#F3F4F6', color: 'var(--color-text)' }}>
                    Test Cases
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: '#F3F4F6', color: 'var(--color-text)' }}>
                    Test Suites
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: '#F3F4F6', color: 'var(--color-text)' }}>
                    Test Runs
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <Link
            href="/runs/demo"
            className="group bg-white rounded-2xl p-8 transition-all duration-200 hover:translate-y-[-4px]"
            style={{ boxShadow: 'var(--shadow)' }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow)'}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl" style={{ background: 'var(--color-primary)' }}>
                  <ClipboardCheck className="w-7 h-7" style={{ color: 'var(--color-text)' }} />
                </div>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-text-secondary)' }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                  Запустить тестирование
                </h2>
                <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  Начните выполнение тестов с быстрой установкой статусов
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: '#F3F4F6', color: 'var(--color-text)' }}>
                    Keyboard Shortcuts
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: '#F3F4F6', color: 'var(--color-text)' }}>
                    Offline Mode
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: '#F3F4F6', color: 'var(--color-text)' }}>
                    Auto-save
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow)' }}>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(184, 233, 134, 0.2)' }}>
              <FileText className="w-6 h-6" style={{ color: 'var(--color-text)' }} />
            </div>
            <h3 className="font-bold mb-2 text-lg" style={{ color: 'var(--color-text)' }}>
              Создавайте кейсы
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Описывайте тест-кейсы с шагами, приоритетами и типами
            </p>
          </div>

          <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow)' }}>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(184, 233, 134, 0.2)' }}>
              <ListChecks className="w-6 h-6" style={{ color: 'var(--color-text)' }} />
            </div>
            <h3 className="font-bold mb-2 text-lg" style={{ color: 'var(--color-text)' }}>
              Группируйте в наборы
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Объединяйте кейсы в логические test suites для удобства
            </p>
          </div>

          <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow)' }}>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(184, 233, 134, 0.2)' }}>
              <Zap className="w-6 h-6" style={{ color: 'var(--color-text)' }} />
            </div>
            <h3 className="font-bold mb-2 text-lg" style={{ color: 'var(--color-text)' }}>
              Быстрое выполнение
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Горячие клавиши, автосохранение и offline-режим
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <p>
            Простой и мощный инструмент для QA-команд любого размера
          </p>
        </div>
      </div>
    </div>
  );
}
