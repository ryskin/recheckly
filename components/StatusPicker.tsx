"use client";

import { CheckCircle2, XCircle, Ban, SkipForward } from "lucide-react";
import { CaseStatus } from "@/lib/types";

const statusConfig: Record<
  Exclude<CaseStatus, "NONE">,
  { label: string; icon: React.ElementType; color: string; bgActive: string; borderActive: string }
> = {
  PASS: {
    label: "Pass",
    icon: CheckCircle2,
    color: "text-green-700",
    bgActive: "bg-green-50",
    borderActive: "border-green-500",
  },
  FAIL: {
    label: "Fail",
    icon: XCircle,
    color: "text-red-700",
    bgActive: "bg-red-50",
    borderActive: "border-red-500",
  },
  BLOCKED: {
    label: "Blocked",
    icon: Ban,
    color: "text-orange-700",
    bgActive: "bg-orange-50",
    borderActive: "border-orange-500",
  },
  SKIP: {
    label: "Skip",
    icon: SkipForward,
    color: "text-blue-700",
    bgActive: "bg-blue-50",
    borderActive: "border-blue-500",
  },
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
  const opts: Array<Exclude<CaseStatus, "NONE">> = ["PASS", "FAIL", "BLOCKED", "SKIP"];

  return (
    <div
      className={`flex gap-2 ${compact ? "" : "mt-2"}`}
      role="group"
      aria-label="Статус кейса"
    >
      {opts.map((s) => {
        const config = statusConfig[s];
        const Icon = config.icon;
        const isActive = value === s;

        return (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm font-medium
              transition-all duration-200 min-w-[44px] min-h-[44px]
              hover:scale-105 active:scale-95
              ${
                isActive
                  ? `${config.borderActive} ${config.bgActive} ${config.color} shadow-sm`
                  : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              }
            `}
            aria-pressed={isActive}
          >
            <Icon className={`w-4 h-4 ${isActive ? config.color : "text-gray-500"}`} />
            <span>{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}
