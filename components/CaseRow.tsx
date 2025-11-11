"use client";

import { StatusPicker, CaseStatus } from "./StatusPicker";

export function CaseRow({
  item,
  value,
  onChange,
  onOpen,
}: {
  item: {
    id: string;
    title: string;
    priority: "P0" | "P1" | "P2" | "P3";
    type: string;
  };
  value: CaseStatus;
  onChange: (s: CaseStatus) => void;
  onOpen: () => void;
}) {
  const prioColor =
    item.priority === "P0"
      ? "bg-red-600"
      : item.priority === "P1"
        ? "bg-orange-500"
        : item.priority === "P2"
          ? "bg-yellow-400"
          : "bg-gray-400";

  const statusIcon =
    value === "PASS"
      ? "✅"
      : value === "FAIL"
        ? "❌"
        : value === "BLOCKED"
          ? "🚫"
          : value === "SKIP"
            ? "⏭"
            : "⬜";

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-3 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <span
            className={`inline-block w-3 h-3 rounded-full flex-shrink-0 ${prioColor}`}
            aria-label={item.priority}
            title={item.priority}
          ></span>
          <button
            onClick={onOpen}
            className="text-left font-medium underline-offset-2 hover:underline flex-1"
          >
            <span className="mr-2">{statusIcon}</span>
            {item.title}
          </button>
        </div>
        <span className="text-xs text-gray-500 uppercase tracking-wider flex-shrink-0">
          {item.type}
        </span>
      </div>
      <StatusPicker value={value} onChange={onChange} compact />
    </div>
  );
}
