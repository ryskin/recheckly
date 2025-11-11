"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { CaseRow } from "@/components/CaseRow";
import { CaseDetailModal } from "@/components/CaseDetailModal";
import { ToastProvider, useToast } from "@/components/Toast";
import { CaseStatus, FilterType, RunPayload } from "@/lib/types";
import { debounce } from "@/lib/utils";
import {
  Search,
  Filter,
  Send,
  Wifi,
  WifiOff,
  Loader2,
  CheckCircle2,
  XCircle,
  Ban,
  SkipForward,
  Circle,
} from "lucide-react";

function RunPageContent({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  const [runId, setRunId] = useState<string | null>(null);
  const [data, setData] = useState<RunPayload | null>(null);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [pendingUpdates, setPendingUpdates] = useState<
    Array<{ caseId: string; update: Partial<CaseStatus> }>
  >([]);

  const { showToast } = useToast();

  // Unwrap params
  useEffect(() => {
    params.then((p) => setRunId(p.runId));
  }, [params]);

  // Load initial data
  useEffect(() => {
    if (!runId) return;

    (async () => {
      try {
        // Try to load from localStorage first
        const cached = localStorage.getItem(`run_${runId}`);
        if (cached) {
          setData(JSON.parse(cached));
        }

        const res = await fetch(`/api/runs/${runId}`, { cache: "no-store" });
        const payload = await res.json();
        setData(payload);
        localStorage.setItem(`run_${runId}`, JSON.stringify(payload));
      } catch (error) {
        console.error("Failed to load run:", error);
        showToast("Ошибка загрузки данных", "error");
        // Try to use cached data
        const cached = localStorage.getItem(`run_${runId}`);
        if (cached) {
          setData(JSON.parse(cached));
          showToast("Загружены данные из кэша", "info");
        }
      }
    })();
  }, [runId, showToast]);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showToast("Соединение восстановлено", "success");
    };
    const handleOffline = () => {
      setIsOnline(false);
      showToast("Соединение потеряно. Работаем offline", "info");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [showToast]);

  // Retry pending updates when coming online
  useEffect(() => {
    if (isOnline && pendingUpdates.length > 0 && runId) {
      (async () => {
        for (const { caseId, update } of pendingUpdates) {
          try {
            await fetch(`/api/runs/${runId}/results/${caseId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(update),
            });
          } catch (error) {
            console.error("Failed to sync update:", error);
          }
        }
        setPendingUpdates([]);
        showToast("Изменения синхронизированы", "success");
      })();
    }
  }, [isOnline, pendingUpdates, runId, showToast]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!selectedCase || !data) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle shortcuts when not typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const statusMap: Record<string, CaseStatus> = {
        "1": "PASS",
        "2": "FAIL",
        "3": "BLOCKED",
        "4": "SKIP",
      };

      const newStatus = statusMap[e.key];
      if (newStatus) {
        e.preventDefault();
        setStatus(selectedCase, newStatus);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [selectedCase, data]);

  const cases = useMemo(() => {
    if (!data) return [];
    let arr = data.suite.cases;

    // Apply filter
    if (filter === "P0" || filter === "P1" || filter === "P2" || filter === "P3") {
      arr = arr.filter((c) => c.priority === filter);
    }
    if (filter === "FAIL") {
      arr = arr.filter((c) => data.results[c.id]?.status === "FAIL");
    }
    if (filter === "PENDING") {
      arr = arr.filter(
        (c) => (data.results[c.id]?.status ?? "NONE") === "NONE"
      );
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      arr = arr.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.type.toLowerCase().includes(query) ||
          c.id.toLowerCase().includes(query)
      );
    }

    return arr;
  }, [data, filter, searchQuery]);

  const summary = useMemo(() => {
    if (!data)
      return { total: 0, pass: 0, fail: 0, blocked: 0, skip: 0, none: 0 };
    const st = data.suite.cases.map(
      (c) => data.results[c.id]?.status ?? "NONE"
    );
    const total = st.length;
    const pass = st.filter((x) => x === "PASS").length;
    const fail = st.filter((x) => x === "FAIL").length;
    const blocked = st.filter((x) => x === "BLOCKED").length;
    const skip = st.filter((x) => x === "SKIP").length;
    const none = st.filter((x) => x === "NONE").length;
    return { total, pass, fail, blocked, skip, none };
  }, [data]);

  // Debounced save function
  const debouncedSave = useMemo(
    () =>
      debounce(async (runId: string, caseId: string, update: any) => {
        setSaving(true);
        try {
          if (isOnline) {
            await fetch(`/api/runs/${runId}/results/${caseId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(update),
            });
          } else {
            setPendingUpdates((prev) => [
              ...prev.filter((p) => p.caseId !== caseId),
              { caseId, update },
            ]);
          }
        } catch (error) {
          console.error("Failed to save:", error);
          setPendingUpdates((prev) => [
            ...prev.filter((p) => p.caseId !== caseId),
            { caseId, update },
          ]);
        } finally {
          setSaving(false);
        }
      }, 500),
    [isOnline]
  );

  const setStatus = useCallback(
    async (caseId: string, status: CaseStatus) => {
      if (!data || !runId) return;

      // Optimistic update
      const next = structuredClone(data);
      next.results[caseId] = {
        ...(next.results[caseId] ?? { status: "NONE" }),
        status,
      };
      setData(next);

      // Save to localStorage
      localStorage.setItem(`run_${runId}`, JSON.stringify(next));

      // Auto-prompt for notes when FAIL is selected
      if (status === "FAIL" && !next.results[caseId]?.notes) {
        setSelectedCase(caseId);
      }

      debouncedSave(runId, caseId, { status });
    },
    [data, runId, debouncedSave]
  );

  const updateCaseResult = useCallback(
    async (caseId: string, update: any) => {
      if (!data || !runId) return;

      // Optimistic update
      const next = structuredClone(data);
      next.results[caseId] = {
        ...(next.results[caseId] ?? { status: "NONE" }),
        ...update,
      };
      setData(next);

      // Save to localStorage
      localStorage.setItem(`run_${runId}`, JSON.stringify(next));

      debouncedSave(runId, caseId, next.results[caseId]);
    },
    [data, runId, debouncedSave]
  );

  async function completeRun() {
    if (!data || !runId) return;

    // Check if all P0 cases are completed
    const p0Cases = data.suite.cases.filter((c) => c.priority === "P0");
    const p0Incomplete = p0Cases.filter(
      (c) => (data.results[c.id]?.status ?? "NONE") === "NONE"
    );

    if (p0Incomplete.length > 0) {
      showToast(
        `Нельзя завершить Run: есть ${p0Incomplete.length} незавершенных P0 кейсов`,
        "error"
      );
      return;
    }

    try {
      const res = await fetch(`/api/runs/${runId}/complete`, {
        method: "POST",
      });
      if (res.ok) {
        showToast("Отчёт успешно отправлен! Спасибо за работу 🎉", "success");
      } else {
        showToast("Ошибка при отправке отчёта", "error");
      }
    } catch (error) {
      showToast("Ошибка при отправке отчёта", "error");
    }
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <div className="text-lg font-medium text-gray-700">Загрузка...</div>
        </div>
      </div>
    );
  }

  const selectedTestCase = selectedCase
    ? data.suite.cases.find((c) => c.id === selectedCase)
    : null;

  const statusIcons = {
    PASS: CheckCircle2,
    FAIL: XCircle,
    BLOCKED: Ban,
    SKIP: SkipForward,
    NONE: Circle,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 border-2 border-gray-100">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Test Run Checklist
              </h1>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                {/* Summary stats */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-600">Всего:</span>
                  <span className="font-bold text-gray-900">{summary.total}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="font-bold text-green-700">{summary.pass}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span className="font-bold text-red-700">{summary.fail}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Ban className="w-4 h-4 text-orange-600" />
                  <span className="font-bold text-orange-700">{summary.blocked}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <SkipForward className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-blue-700">{summary.skip}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Circle className="w-4 h-4 text-gray-400" />
                  <span className="font-bold text-gray-600">{summary.none}</span>
                </div>
              </div>

              {/* Status badges */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {saving && (
                  <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Сохранение...
                  </span>
                )}
                {!isOnline && (
                  <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                    <WifiOff className="w-3 h-3" />
                    Offline режим
                  </span>
                )}
                {isOnline && (
                  <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                    <Wifi className="w-3 h-3" />
                    Online
                  </span>
                )}
                {pendingUpdates.length > 0 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                    {pendingUpdates.length} в очереди
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={completeRun}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Send className="w-4 h-4" />
              Отправить отчёт
            </button>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Прогресс</span>
              <span className="text-sm font-bold text-gray-900">
                {summary.total > 0
                  ? Math.round((summary.pass / summary.total) * 100)
                  : 0}
                %
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 transition-all duration-500 ease-out shadow-sm"
                style={{
                  width: `${summary.total > 0 ? (summary.pass / summary.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          {/* Search and filters */}
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
                className="pl-10 pr-8 py-2 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer font-medium"
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterType)}
              >
                <option value="ALL">Все кейсы</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
                <option value="FAIL">Только FAIL</option>
                <option value="PENDING">Только Pending</option>
              </select>
            </div>
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="text-xs text-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
            <span className="font-semibold">Горячие клавиши:</span> 1=PASS,
            2=FAIL, 3=BLOCKED, 4=SKIP (в открытой карточке)
          </div>
        </div>

        {/* Cases Grid */}
        <div className="grid gap-4">
          {cases.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-gray-100">
              <Circle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-500">
                {searchQuery.trim()
                  ? "Кейсы не найдены"
                  : "Нет кейсов по выбранному фильтру"}
              </p>
              {searchQuery.trim() && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Очистить поиск
                </button>
              )}
            </div>
          ) : (
            cases.map((c) => (
              <CaseRow
                key={c.id}
                item={c}
                value={data.results[c.id]?.status ?? "NONE"}
                onChange={(s) => setStatus(c.id, s)}
                onOpen={() => setSelectedCase(c.id)}
              />
            ))
          )}
        </div>
      </div>

      {selectedTestCase && (
        <CaseDetailModal
          testCase={selectedTestCase}
          result={
            data.results[selectedTestCase.id] ?? {
              status: "NONE",
              notes: "",
              evidence: [],
            }
          }
          isOpen={!!selectedCase}
          onClose={() => setSelectedCase(null)}
          onUpdate={(update) => updateCaseResult(selectedTestCase.id, update)}
        />
      )}
    </div>
  );
}

export default function RunPage({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  return (
    <ToastProvider>
      <RunPageContent params={params} />
    </ToastProvider>
  );
}
