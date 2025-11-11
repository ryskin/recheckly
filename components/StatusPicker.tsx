"use client";

export type CaseStatus = "PASS" | "FAIL" | "BLOCKED" | "SKIP" | "NONE";

const labels: Record<CaseStatus, string> = {
  PASS: "✅ PASS",
  FAIL: "❌ FAIL",
  BLOCKED: "🚫 BLOCKED",
  SKIP: "⏭ SKIP",
  NONE: "⬜",
};

export function StatusPicker({
  value,
  onChange,
  compact = false,
}: {
  value: CaseStatus;
  onChange: (s: CaseStatus) => void;
  compact?: boolean;
}) {
  const opts: CaseStatus[] = ["PASS", "FAIL", "BLOCKED", "SKIP"];
  return (
    <div
      className={`flex gap-2 ${compact ? "" : "mt-2"}`}
      role="group"
      aria-label="Статус кейса"
    >
      {opts.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={`px-3 py-2 rounded border text-sm font-medium transition-colors min-w-[44px] min-h-[44px]
            ${
              value === s
                ? "border-black bg-gray-100"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
          aria-pressed={value === s}
        >
          {labels[s]}
        </button>
      ))}
    </div>
  );
}
