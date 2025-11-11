"use client";

import { useState, useEffect, useRef } from "react";
import { TestCase, CaseResult } from "@/lib/types";
import {
  X,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

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
      const newEvidence = Array.from(files).map((file) => ({
        kind: "screenshot" as const,
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

  const prioColors = {
    P0: "bg-red-100 text-red-700 border-red-200",
    P1: "bg-orange-100 text-orange-700 border-orange-200",
    P2: "bg-yellow-100 text-yellow-700 border-yellow-200",
    P3: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {testCase.title}
              </h2>
              <div className="flex gap-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium border ${prioColors[testCase.priority]}`}
                >
                  {testCase.priority}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase font-medium">
                  {testCase.type}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-all"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Steps */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Шаги тестирования
              </h3>
            </div>
            <div className="space-y-3">
              {testCase.steps.map((step) => (
                <div
                  key={step.n}
                  className="border-2 border-gray-100 rounded-xl p-4 bg-gradient-to-br from-gray-50 to-white hover:border-blue-200 transition-colors"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                      {step.n}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Действие
                        </span>
                        <p className="text-gray-900 mt-1">{step.action}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Ожидается
                        </span>
                        <p className="text-gray-700 mt-1">{step.expected}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <label htmlFor="notes" className="text-lg font-semibold text-gray-900">
                Комментарий
              </label>
              {result.status === "FAIL" && (
                <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
                  <AlertCircle className="w-3 h-3" />
                  укажите причину fail
                </span>
              )}
            </div>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleNotesBlur}
              placeholder="Добавьте комментарий к результату теста..."
              className="w-full border-2 border-gray-200 rounded-xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Evidence */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Скриншоты</h3>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Upload className="w-4 h-4" />
                {uploading ? "Загрузка..." : "Добавить скрин"}
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
              <div className="grid grid-cols-2 gap-4">
                {result.evidence.map((ev, idx) => (
                  <div
                    key={idx}
                    className="relative border-2 border-gray-200 rounded-xl overflow-hidden group hover:border-blue-300 transition-all"
                  >
                    <img
                      src={ev.url}
                      alt={ev.name || `Screenshot ${idx + 1}`}
                      className="w-full h-40 object-cover"
                    />
                    <button
                      onClick={() => removeEvidence(idx)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-lg p-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 shadow-lg"
                      aria-label="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {ev.name && (
                      <div className="p-3 text-xs text-gray-700 truncate bg-white border-t border-gray-200">
                        {ev.name}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
                <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Нет прикрепленных скриншотов</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium shadow-lg hover:shadow-xl"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
