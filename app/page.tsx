"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  // Auto-redirect to demo run after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/runs/demo");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">
            Recheckly
          </h1>
          <p className="text-lg text-gray-600">
            Веб-интерфейс для мануального тестирования
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Возможности
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                Быстрая установка статусов прямо в списке (PASS, FAIL, BLOCKED, SKIP)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Автосохранение без кнопки "Сохранить"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Детальный просмотр шагов с комментариями и скриншотами</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Фильтры по приоритету (P0/P1/P2/P3) и статусу</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Горячие клавиши (1-4 для быстрой установки статусов)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Offline-режим с локальным сохранением</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Прогресс-бар и статистика в реальном времени</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/runs/demo"
            className="w-full px-6 py-3 bg-black text-white rounded-lg font-medium text-center hover:bg-gray-800 transition-colors"
          >
            Открыть демо-checklist
          </Link>
          <p className="text-sm text-gray-500 text-center">
            Автоматический переход через 2 секунды...
          </p>
        </div>

        <div className="pt-4 border-t text-center text-sm text-gray-500">
          <p>
            Для использования в проекте: перейдите на{" "}
            <code className="px-2 py-1 bg-gray-100 rounded text-gray-800">
              /runs/[runId]
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}
