"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  Link as LinkIcon,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  hint?: string;
  helperText?: string;
  aspectRatio?: "square" | "video" | "banner" | "wide" | "auto";
  required?: boolean;
  className?: string;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  folder = "general",
  hint,
  helperText,
  aspectRatio = "auto",
  required = false,
  className = "",
}: ImageUploadFieldProps) {
  const displayHint = hint || helperText;
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Kripya valid image file (JPG, PNG, WebP) upload karein.");
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          onChange(data.url);
          setIsUploading(false);
          return;
        }
      }

      // If server upload failed, fallback to local FileReader data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          onChange(result);
        }
        setIsUploading(false);
      };
      reader.onerror = () => {
        setUploadError("Image read karne me error aayi.");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      // Offline / fallback to data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          onChange(result);
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square max-h-52";
      case "video":
        return "aspect-video max-h-48";
      case "banner":
        return "aspect-[21/9] max-h-44";
      case "wide":
        return "aspect-[16/9] max-h-48";
      default:
        return "h-40";
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label and mode toggle buttons */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-stone-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-[11px] font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
              activeTab === "upload"
                ? "bg-white text-[#541223] font-bold shadow-xs"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
              activeTab === "url"
                ? "bg-white text-[#541223] font-bold shadow-xs"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            Link / URL
          </button>
        </div>
      </div>

      {/* When an image is already selected/uploaded */}
      {value ? (
        <div className="relative rounded-xl border border-stone-200 bg-stone-50 p-2 overflow-hidden group">
          <div className={`w-full relative rounded-lg overflow-hidden bg-stone-200 ${getAspectClass()}`}>
            {value.startsWith("data:") || value.startsWith("/uploads/") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Image
                src={value}
                alt={label}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover rounded-lg"
              />
            )}

            {/* Overlay Action Buttons */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-white/95 text-stone-800 text-xs font-semibold hover:bg-white shadow-md flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Change
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="px-3 py-1.5 rounded-lg bg-rose-600/90 text-white text-xs font-semibold hover:bg-rose-600 shadow-md flex items-center gap-1.5 transition"
              >
                <X className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-stone-500">
            <span className="truncate max-w-[280px] font-mono text-[10px]">
              {value.startsWith("data:") ? "Local file (Ready)" : value}
            </span>
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-rose-600 hover:underline font-semibold"
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        /* When no image is selected yet */
        <div>
          {activeTab === "upload" ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                dragOver
                  ? "border-[#541223] bg-rose-50/60"
                  : "border-stone-200 hover:border-stone-400 bg-stone-50/50 hover:bg-stone-50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
              />

              {isUploading ? (
                <div className="py-3 flex flex-col items-center justify-center gap-2 text-stone-600">
                  <Loader2 className="w-6 h-6 text-[#541223] animate-spin" />
                  <span className="text-xs font-semibold">Image upload ho rhi hai...</span>
                </div>
              ) : (
                <div className="py-2 flex flex-col items-center justify-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-rose-50 text-[#541223] flex items-center justify-center border border-rose-100">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#541223] hover:underline">
                      Click to upload
                    </span>{" "}
                    <span className="text-xs text-stone-500">or drag & drop</span>
                  </div>
                  <p className="text-[10px] text-stone-400">
                    PNG, JPG, WebP ya GIF (Max 10MB)
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* URL Mode */
            <div className="space-y-1.5">
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or CDN link"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-mono bg-white focus:outline-none focus:border-[#541223] focus:ring-1 focus:ring-[#541223]"
                />
              </div>
              <p className="text-[10px] text-stone-400">
                Direct public image URL paste karein.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Hidden file input for when image already exists and user clicks "Change" */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {uploadError && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {displayHint && <p className="text-[10px] text-stone-400">{displayHint}</p>}
    </div>
  );
}
