"use client";

import { useState, useEffect, useRef } from "react";
import { CaseStatus } from "./StatusPicker";

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

export function CaseDetailModal({
  testCase,
  result,
  isOpen,
  onClose,
  onUpdate,
}: {
  testCase: TestCase;
  result: CaseResult;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (update: Partial<CaseResult>) => void;
}) {
  const [notes, setNotes] = useState(result.notes || "");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNotes(result.notes || "");
  }, [result.notes]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleNotesBlur = () => {
    if (notes !== result.notes) {
      onUpdate({ notes });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      // Имитируем загрузку (в реальности здесь будет API вызов)
      const newEvidence: Evidence[] = Array.from(files).map((file) => ({
        kind: "screenshot",
        url: URL.createObjectURL(file),
        name: file.name,
      }));

      onUpdate({
        evidence: [...(result.evidence || []), ...newEvidence],
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeEvidence = (index: number) => {
    const updated = [...(result.evidence || [])];
    updated.splice(index, 1);
    onUpdate({ evidence: updated });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">{testCase.title}</h2>
              <div className="flex gap-2 mt-2">
                <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                  {testCase.priority}
                </span>
                <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 uppercase">
                  {testCase.type}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              aria-label="Закрыть"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Steps */}
          <div>
            <h3 className="font-semibold mb-3">Шаги тестирования</h3>
            <div className="space-y-3">
              {testCase.steps.map((step) => (
                <div
                  key={step.n}
                  className="border rounded-lg p-3 bg-gray-50"
                >
                  <div className="flex gap-3">
                    <span className="font-semibold text-gray-600 flex-shrink-0">
                      {step.n}.
                    </span>
                    <div className="flex-1 space-y-1">
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Действие:{" "}
                        </span>
                        <span>{step.action}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Ожидается:{" "}
                        </span>
                        <span>{step.expected}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="font-semibold mb-2 block"
            >
              Комментарий
              {result.status === "FAIL" && (
                <span className="text-red-600 ml-2 text-sm font-normal">
                  (укажите причину fail)
                </span>
              )}
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleNotesBlur}
              placeholder="Добавьте комментарий к результату теста..."
              className="w-full border rounded-lg p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Evidence */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Скриншоты</h3>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50"
              >
                {uploading ? "Загрузка..." : "+ Добавить скрин"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            {result.evidence && result.evidence.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {result.evidence.map((ev, idx) => (
                  <div
                    key={idx}
                    className="relative border rounded-lg overflow-hidden group"
                  >
                    <img
                      src={ev.url}
                      alt={ev.name || `Screenshot ${idx + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      onClick={() => removeEvidence(idx)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Удалить"
                    >
                      ×
                    </button>
                    {ev.name && (
                      <div className="p-2 text-xs text-gray-600 truncate bg-white">
                        {ev.name}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Нет прикрепленных скриншотов
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
