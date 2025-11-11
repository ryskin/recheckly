"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { CaseRow } from "@/components/CaseRow";
import { CaseStatus } from "@/components/StatusPicker";
import { CaseDetailModal } from "@/components/CaseDetailModal";

type TestStep = {
  n: number;
  action: string;
  expected: string;
};

type TestCase = {
  id: string;
  title: string;
  priority: "P0" | "P1" | "P2" | "P3";
  type: string;
  steps: TestStep[];
};

type Evidence = {
  kind: "screenshot";
  url: string;
  name?: string;
};

type CaseResult = {
  status: CaseStatus;
  notes?: string;
  evidence?: Evidence[];
};

type RunPayload = {
  suite: { cases: TestCase[] };
  results: Record<string, CaseResult>;
};

type FilterType = "ALL" | "P0" | "P1" | "P2" | "P3" | "FAIL" | "PENDING";

export default function RunPage({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  const [runId, setRunId] = useState<string | null>(null);
  const [data, setData] = useState<RunPayload | null>(null);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [pendingUpdates, setPendingUpdates] = useState<
    Array<{ caseId: string; update: Partial<CaseResult> }>
  >([]);

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
        // Try to use cached data
        const cached = localStorage.getItem(`run_${runId}`);
        if (cached) {
          setData(JSON.parse(cached));
        }
      }
    })();
  }, [runId]);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

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
      })();
    }
  }, [isOnline, pendingUpdates, runId]);

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
    return arr;
  }, [data, filter]);

  const summary = useMemo(() => {
    if (!data) return { total: 0, pass: 0, fail: 0, blocked: 0, skip: 0, none: 0 };
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

      setSaving(true);
      try {
        if (isOnline) {
          await fetch(`/api/runs/${runId}/results/${caseId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
          });
        } else {
          // Queue for later
          setPendingUpdates((prev) => [
            ...prev.filter((p) => p.caseId !== caseId),
            { caseId, update: { status } },
          ]);
        }
      } catch (error) {
        console.error("Failed to save:", error);
        setPendingUpdates((prev) => [
          ...prev.filter((p) => p.caseId !== caseId),
          { caseId, update: { status } },
        ]);
      } finally {
        setSaving(false);
      }
    },
    [data, runId, isOnline]
  );

  const updateCaseResult = useCallback(
    async (caseId: string, update: Partial<CaseResult>) => {
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

      setSaving(true);
      try {
        if (isOnline) {
          await fetch(`/api/runs/${runId}/results/${caseId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(next.results[caseId]),
          });
        } else {
          setPendingUpdates((prev) => [
            ...prev.filter((p) => p.caseId !== caseId),
            { caseId, update: next.results[caseId] },
          ]);
        }
      } catch (error) {
        console.error("Failed to save:", error);
        setPendingUpdates((prev) => [
          ...prev.filter((p) => p.caseId !== caseId),
          { caseId, update: next.results[caseId] },
        ]);
      } finally {
        setSaving(false);
      }
    },
    [data, runId, isOnline]
  );

  async function completeRun() {
    if (!data || !runId) return;

    // Check if all P0 cases are completed
    const p0Cases = data.suite.cases.filter((c) => c.priority === "P0");
    const p0Incomplete = p0Cases.filter(
      (c) => (data.results[c.id]?.status ?? "NONE") === "NONE"
    );

    if (p0Incomplete.length > 0) {
      alert(
        `Нельзя завершить Run: есть незавершенные P0 кейсы (${p0Incomplete.length})`
      );
      return;
    }

    try {
      const res = await fetch(`/api/runs/${runId}/complete`, {
        method: "POST",
      });
      if (res.ok) {
        alert("Отчёт отправлен. Спасибо!");
      } else {
        alert("Ошибка при отправке отчёта");
      }
    } catch (error) {
      alert("Ошибка при отправке отчёта");
    }
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium">Загрузка...</div>
        </div>
      </div>
    );
  }

  const selectedTestCase = selectedCase
    ? data.suite.cases.find((c) => c.id === selectedCase)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <header className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Test Run Checklist</h1>
              <p className="text-sm text-gray-600 mt-1">
                Всего {summary.total} · ✅ {summary.pass} · ❌ {summary.fail} ·
                🚫 {summary.blocked} · ⏭ {summary.skip} · ⬜ {summary.none}
              </p>
              <div className="flex items-center gap-2 mt-2">
                {saving && (
                  <span className="text-xs text-blue-600">Сохранение...</span>
                )}
                {!isOnline && (
                  <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800">
                    Offline режим
                  </span>
                )}
                {pendingUpdates.length > 0 && (
                  <span className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-800">
                    {pendingUpdates.length} в очереди
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <select
                className="border rounded px-3 py-2 text-sm bg-white"
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterType)}
              >
                <option value="ALL">Все</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
                <option value="FAIL">Только FAIL</option>
                <option value="PENDING">Только Pending</option>
              </select>
              <button
                onClick={completeRun}
                className="px-4 py-2 rounded bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Отправить отчёт
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-green-600 h-2 transition-all duration-300"
              style={{
                width: `${summary.total > 0 ? (summary.pass / summary.total) * 100 : 0}%`,
              }}
            />
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="text-xs text-gray-500 bg-gray-50 rounded p-2">
            Горячие клавиши: 1=PASS, 2=FAIL, 3=BLOCKED, 4=SKIP (в открытой
            карточке)
          </div>
        </header>

        <div className="grid gap-3">
          {cases.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
              Нет кейсов по выбранному фильтру
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
