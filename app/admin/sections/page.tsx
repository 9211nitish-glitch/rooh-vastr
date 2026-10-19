"use client";

import React, { useState, useEffect } from "react";
import {
  SlidersHorizontal,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  Sparkles,
  LayoutTemplate
} from "lucide-react";
import { HomepageSection } from "@/lib/types";
import { SEED_SECTIONS } from "@/lib/data/store-data";

export default function AdminSectionsPage() {
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rooh_homepage_sections");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSections(parsed);
          return;
        }
      }
      setSections(SEED_SECTIONS);
      localStorage.setItem("rooh_homepage_sections", JSON.stringify(SEED_SECTIONS));
    } catch (e) {
      console.error(e);
      setSections(SEED_SECTIONS);
    }
  }, []);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleSection = (id: string) => {
    const updated = sections.map((s) =>
      s.id === id ? { ...s, is_enabled: !s.is_enabled } : s
    );
    setSections(updated);
    localStorage.setItem("rooh_homepage_sections", JSON.stringify(updated));
    showNotification("Section visibility toggled");
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const copy = [...sections];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    // Re-index display_order
    const reordered = copy.map((item, idx) => ({
      ...item,
      display_order: idx + 1,
    }));

    setSections(reordered);
    localStorage.setItem("rooh_homepage_sections", JSON.stringify(reordered));
    showNotification(`Reordered sections`);
  };

  const handleResetDefaults = () => {
    setSections(SEED_SECTIONS);
    localStorage.setItem("rooh_homepage_sections", JSON.stringify(SEED_SECTIONS));
    showNotification("Reset to standard luxury storefront order");
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#242124] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-stone-700 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs uppercase font-bold text-[#6D1835] tracking-widest">
            Storefront Merchandising
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124]">
            Homepage Layout & Section Manager
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Reorder modules, toggle promotional spotlights, and tailor the storytelling flow of the Rooh Vastr homepage.
          </p>
        </div>

        <button
          onClick={handleResetDefaults}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 text-xs font-bold transition-colors shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Default Order</span>
        </button>
      </div>

      {/* Sections Table / Cards */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-stone-100 flex justify-between items-center bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4 text-[#6D1835]" />
            <span className="text-xs font-bold text-[#242124] uppercase tracking-wider">
              Active Module Sequencing ({sections.filter((s) => s.is_enabled).length} Enabled)
            </span>
          </div>
          <span className="text-[11px] text-stone-500 font-medium">
            Drag or use arrow controls
          </span>
        </div>

        <div className="divide-y divide-stone-100">
          {sections.map((section, idx) => (
            <div
              key={section.id}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                section.is_enabled ? "bg-white" : "bg-stone-50/60 opacity-60"
              }`}
            >
              {/* Order index + Title + Subtitle */}
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                  {idx + 1}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-sm text-[#242124]">
                      {section.title}
                    </h3>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-bold">
                      {section.section_key}
                    </span>
                  </div>
                  {section.subtitle && (
                    <p className="text-xs text-stone-500">{section.subtitle}</p>
                  )}
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                {/* Move Up */}
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, "up")}
                  className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none text-stone-700 flex items-center justify-center transition-colors"
                  title="Move section higher"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>

                {/* Move Down */}
                <button
                  type="button"
                  disabled={idx === sections.length - 1}
                  onClick={() => handleMove(idx, "down")}
                  className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none text-stone-700 flex items-center justify-center transition-colors"
                  title="Move section lower"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                {/* Toggle Visibility */}
                <button
                  type="button"
                  onClick={() => handleToggleSection(section.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    section.is_enabled
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                      : "bg-stone-200 text-stone-600 border border-stone-300 hover:bg-stone-300"
                  }`}
                >
                  {section.is_enabled ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Visible</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
