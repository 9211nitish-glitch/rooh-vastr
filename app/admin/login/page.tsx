"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Shield, ArrowRight, AlertCircle, KeyRound } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError("Please enter the admin security passcode");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid authorization credentials");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-stone-200/80 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4F1026]/10 mb-4 border border-[#4F1026]/20">
            <Shield className="w-8 h-8 text-[#4F1026]" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#242124] tracking-wide">
            ROOH VASTR
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#8A4D56] font-semibold mt-1">
            Staff & Admin Portal
          </p>
          <p className="text-xs text-stone-500 mt-2">
            Secure boundary. Authorization required to access store CRM and operations.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-red-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Admin Passcode / Secret Key
            </label>
            <div className="relative">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter secret passcode..."
                className="w-full px-4 py-3 pl-10 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#4F1026] focus:border-transparent transition"
                autoFocus
              />
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            </div>
            <p className="text-[11px] text-stone-400 mt-1.5">
              Default operational key: <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-600">RoohAdmin@2026</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4F1026] hover:bg-[#3D0C1D] text-white font-medium py-3 px-4 rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <span>Verifying authorization...</span>
            ) : (
              <>
                <span>Access Admin Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-100 text-center text-[11px] text-stone-400">
          Protected by server-side session tokens & IP audit logging.
        </div>
      </div>
    </div>
  );
}
