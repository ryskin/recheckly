export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Централизованная цветовая схема с хорошим контрастом
export const PRIORITY_COLORS = {
  P0: {
    bg: "bg-red-50",
    text: "text-red-900",
    border: "border-red-300",
    hover: "hover:bg-red-100",
  },
  P1: {
    bg: "bg-orange-50",
    text: "text-orange-900",
    border: "border-orange-300",
    hover: "hover:bg-orange-100",
  },
  P2: {
    bg: "bg-yellow-50",
    text: "text-yellow-900",
    border: "border-yellow-300",
    hover: "hover:bg-yellow-100",
  },
  P3: {
    bg: "bg-gray-50",
    text: "text-gray-900",
    border: "border-gray-300",
    hover: "hover:bg-gray-100",
  },
} as const;

export type Priority = keyof typeof PRIORITY_COLORS;

export function getPriorityClasses(priority: Priority): string {
  const colors = PRIORITY_COLORS[priority];
  return `${colors.bg} ${colors.text} ${colors.border}`;
}

