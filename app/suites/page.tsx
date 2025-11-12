"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus, ListChecks, PlayCircle, Edit, Trash2, Upload, CheckCircle2, X, RotateCcw } from "lucide-react";

type TestSuite = {
  id: string;
  name: string;
  description: string;
  caseIds: string[];  // Array of test case IDs that belong to this suite
  lastRun?: string;
  createdAt: string;
};

export default function SuitesPage() {
  const [suites, setSuites] = useState<TestSuite[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSuite, setEditingSuite] = useState<TestSuite | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importedSuites, setImportedSuites] = useState<TestSuite[]>([]);
  const [importSuccess, setImportSuccess] = useState(false);
  const [importStats, setImportStats] = useState({ added: 0, skipped: 0 });

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setSuites([
        {
          id: "s1",
          name: "Auth Flow",
          description: "Тесты аутентификации и авторизации",
          caseIds: ["RC-CASES-001", "RC-CASES-004", "RC-SEC-001", "RC-SEC-004"],
          lastRun: "2025-11-10",
          createdAt: "2025-10-15",
        },
        {
          id: "s2",
          name: "Payment Module",
          description: "Тесты платежной системы",
          caseIds: ["RC-INT-001", "RC-PERF-001"],
          lastRun: "2025-11-09",
          createdAt: "2025-10-20",
        },
        {
          id: "s3",
          name: "Smoke Tests",
          description: "Критичные проверки перед деплоем",
          caseIds: ["RC-SMOKE-001", "RC-SMOKE-002", "RC-SMOKE-003", "RC-SMOKE-004"],
          createdAt: "2025-10-01",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleEdit = (id: string) => {
    const suite = suites.find((s) => s.id === id);
    if (suite) {
      setEditingSuite(suite);
    }
  };

  const handleDelete = (id: string) => {
    const suite = suites.find((s) => s.id === id);
    if (!suite) return;

    if (confirm(`Удалить набор "${suite.name}"?\n\nТест-кейсы останутся в системе.`)) {
      setSuites(suites.filter((s) => s.id !== id));
    }
  };

  const handleSaveEdit = () => {
    if (!editingSuite) return;

    setSuites(
      suites.map((s) =>
        s.id === editingSuite.id
          ? { ...editingSuite }
          : s
      )
    );
    setEditingSuite(null);
  };

  const parseCSV = (csvText: string): TestSuite[] => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    const dataLines = lines.slice(1);
    const parsedSuites: TestSuite[] = [];

    for (const line of dataLines) {
      const fields: string[] = [];
      let currentField = '';
      let insideQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          fields.push(currentField.trim());
          currentField = '';
        } else {
          currentField += char;
        }
      }
      fields.push(currentField.trim());

      if (fields.length < 6) continue;

      const [id, name, description, caseIdsStr, lastRun, createdAt] = fields;

      // Parse pipe-separated case IDs: "RC-SMOKE-001|RC-SMOKE-002|RC-SMOKE-003"
      const caseIds = caseIdsStr.trim()
        ? caseIdsStr.split('|').map(cid => cid.trim()).filter(cid => cid.length > 0)
        : [];

      const suite: TestSuite = {
        id: id.trim(),
        name: name.trim(),
        description: description.trim(),
        caseIds,
        lastRun: lastRun.trim() || undefined,
        createdAt: createdAt.trim(),
      };

      parsedSuites.push(suite);
    }

    return parsedSuites;
  };

  const handleLoadDemoData = async () => {
    try {
      const response = await fetch('/test-suites-import.csv');
      const text = await response.text();
      const parsed = parseCSV(text);

      // Filter duplicates
      const existingIds = new Set(suites.map(s => s.id));
      const newSuites = parsed.filter(s => !existingIds.has(s.id));

      setSuites([...suites, ...newSuites]);
      alert(`Загружено ${newSuites.length} наборов тестов!${parsed.length > newSuites.length ? ` (${parsed.length - newSuites.length} пропущено как дубликаты)` : ''}`);
    } catch (error) {
      console.error('Error loading demo data:', error);
      alert('Ошибка загрузки демо-данных');
    }
  };

  const handleClearAll = () => {
    if (confirm(`Удалить ВСЕ наборы тестов (${suites.length})?`)) {
      setSuites([]);
      alert('Все наборы удалены');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSV(text);
      setImportedSuites(parsed);
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    const existingIds = new Set(suites.map(s => s.id));
    const newSuites = importedSuites.filter(s => !existingIds.has(s.id));
    const duplicateCount = importedSuites.length - newSuites.length;

    setImportStats({ added: newSuites.length, skipped: duplicateCount });
    setSuites([...suites, ...newSuites]);
    setImportSuccess(true);

    setTimeout(() => {
      setShowImportModal(false);
      setImportSuccess(false);
      setImportedSuites([]);
      setImportStats({ added: 0, skipped: 0 });
    }, 2000);
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
              {suites.reduce((sum, s) => sum + s.caseIds.length, 0)}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
            <div className="text-sm font-medium text-green-700 mb-1">
              Активных runs
            </div>
            <div className="text-3xl font-bold text-green-700">1</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={handleLoadDemoData}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all border-2"
            style={{
              borderColor: 'var(--color-primary)',
              color: 'var(--color-text)',
              background: 'white'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
            }}
          >
            <CheckCircle2 className="w-4 h-4" />
            Demo Data
          </button>

          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all border-2 border-blue-500 text-blue-700 bg-white hover:bg-blue-50"
          >
            <Upload className="w-4 h-4" />
            Import CSV
          </button>

          {suites.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all border-2 border-red-500 text-red-700 bg-white hover:bg-red-50"
            >
              <RotateCcw className="w-4 h-4" />
              Очистить
            </button>
          )}

          <div className="text-sm text-gray-600 ml-auto">
            {suites.length} наборов
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

                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900 mb-2">
                      {suite.caseIds.length} тест-кейсов
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {suite.caseIds.slice(0, 3).map((caseId) => (
                        <span
                          key={caseId}
                          className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded"
                        >
                          {caseId}
                        </span>
                      ))}
                      {suite.caseIds.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-0.5">
                          +{suite.caseIds.length - 3} ещё
                        </span>
                      )}
                    </div>
                    {suite.lastRun && (
                      <div className="text-xs text-gray-500 mt-2">
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
                <button
                  onClick={() => handleEdit(suite.id)}
                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Редактировать"
                >
                  <Edit className="w-4 h-4 text-blue-700" />
                </button>
                <button
                  onClick={() => handleDelete(suite.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  title="Удалить"
                >
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

      {/* Edit Modal */}
      {editingSuite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Редактировать набор
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Название набора
                </label>
                <input
                  type="text"
                  value={editingSuite.name}
                  onChange={(e) =>
                    setEditingSuite({ ...editingSuite, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Название набора"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Описание
                </label>
                <textarea
                  value={editingSuite.description}
                  onChange={(e) =>
                    setEditingSuite({
                      ...editingSuite,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="Описание набора"
                />
              </div>

              {/* Info */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-blue-900">
                  <div className="font-semibold mb-2">Информация</div>
                  <div className="mb-2">Тест-кейсов: {editingSuite.caseIds.length}</div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {editingSuite.caseIds.map((caseId) => (
                      <span
                        key={caseId}
                        className="text-xs font-mono bg-white text-blue-700 px-2 py-0.5 rounded border border-blue-200"
                      >
                        {caseId}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-blue-700 mt-2">
                    Для изменения состава кейсов используйте страницу создания/редактирования набора
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setEditingSuite(null)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Отмена
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Импорт наборов тестов</h2>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportedSuites([]);
                  setImportSuccess(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {importSuccess ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
                  <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                    Успешно импортировано!
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    {importStats.added} наборов добавлено
                    {importStats.skipped > 0 && ` (${importStats.skipped} пропущено как дубликаты)`}
                  </p>
                </div>
              ) : importedSuites.length > 0 ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-700" />
                      <div>
                        <div className="font-bold text-blue-900">
                          Найдено {importedSuites.length} наборов
                        </div>
                        <div className="text-sm text-blue-700">
                          Проверьте данные перед импортом
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {importedSuites.map((suite) => (
                      <div
                        key={suite.id}
                        className="bg-white border-2 border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="font-bold text-gray-900">{suite.name}</div>
                            <div className="text-sm text-gray-600">{suite.description}</div>
                          </div>
                          <div className="text-xs text-gray-500 font-mono">{suite.id}</div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          <div className="font-medium mb-1">{suite.caseIds.length} тест-кейсов:</div>
                          <div className="flex flex-wrap gap-1">
                            {suite.caseIds.slice(0, 5).map((caseId) => (
                              <span
                                key={caseId}
                                className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded"
                              >
                                {caseId}
                              </span>
                            ))}
                            {suite.caseIds.length > 5 && (
                              <span className="text-xs text-gray-500 px-2 py-0.5">
                                +{suite.caseIds.length - 5} ещё
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div>Создан: {new Date(suite.createdAt).toLocaleDateString('ru-RU')}</div>
                          {suite.lastRun && (
                            <div>Последний run: {new Date(suite.lastRun).toLocaleDateString('ru-RU')}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    Выберите CSV файл
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Формат: ID,Name,Description,CaseIds,LastRun,CreatedAt
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    CaseIds: Pipe-separated list (e.g. "RC-001|RC-002|RC-003")
                  </p>
                  <label className="inline-block">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <span className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 cursor-pointer inline-flex items-center gap-2 font-medium">
                      <Upload className="w-4 h-4" />
                      Выбрать файл
                    </span>
                  </label>
                </div>
              )}
            </div>

            {importedSuites.length > 0 && !importSuccess && (
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowImportModal(false);
                    setImportedSuites([]);
                  }}
                  className="px-6 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Отмена
                </button>
                <button
                  onClick={handleConfirmImport}
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-medium"
                >
                  Импортировать {importedSuites.length} наборов
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
