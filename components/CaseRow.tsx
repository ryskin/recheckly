"use client";

import { StatusPicker } from "./StatusPicker";
import { CaseStatus, TestCase } from "@/lib/types";
import { CheckCircle2, XCircle, Ban, SkipForward, Circle } from "lucide-react";

const statusIcons: Record<CaseStatus, React.ElementType> = {
  PASS: CheckCircle2,
  FAIL: XCircle,
  BLOCKED: Ban,
  SKIP: SkipForward,
  NONE: Circle,
};

const statusColors: Record<CaseStatus, string> = {
  PASS: "text-green-600",
  FAIL: "text-red-600",
  BLOCKED: "text-orange-600",
  SKIP: "text-blue-600",
  NONE: "text-gray-400",
};

export function CaseRow({
  item,
  value,
  onChange,
  onOpen,
}: {
  item: TestCase;
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

  const StatusIcon = statusIcons[value];
  const statusColor = statusColors[value];

  return (
    <div className="border-2 border-gray-100 rounded-xl p-4 flex flex-col gap-3 bg-white hover:border-gray-200 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <span
            className={`inline-block w-3 h-3 rounded-full flex-shrink-0 ${prioColor} ring-2 ring-white shadow-sm`}
            aria-label={item.priority}
            title={item.priority}
          ></span>
          <button
            onClick={onOpen}
            className="text-left font-medium hover:text-blue-600 flex-1 flex items-center gap-2 group transition-colors"
          >
            <StatusIcon className={`w-5 h-5 ${statusColor} flex-shrink-0`} />
            <span className="group-hover:underline underline-offset-2">{item.title}</span>
          </button>
        </div>
        <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600 uppercase tracking-wider flex-shrink-0 font-medium">
          {item.type}
        </span>
      </div>
      <StatusPicker value={value} onChange={onChange} compact />
    </div>
  );
}
