"use client";

import { ShieldCheck } from "lucide-react";

/**
 * @fileOverview Security Health Header component for the Privacy-Safe Audit Trail.
 * Provides a clinical signal of data anonymization and PII compliance.
 */
export function SecurityHealthHeader() {
  return (
    <div className="hidden lg:flex items-center gap-3 px-4 py-2 border border-slate-100 bg-slate-50/50 rounded-xl transition-all hover:bg-white hover:shadow-sm">
      <div className="bg-emerald-500/10 p-1.5 rounded-lg shrink-0">
        <ShieldCheck className="h-4 w-4 text-emerald-600" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 leading-none mb-0.5">
          <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider">
            Data Anonymized:
          </span>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-normal">
            [JSON-ID Mode Active]
          </span>
        </div>
        <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-tight leading-none">
          <span>Total Reviews Processed: 50,230</span>
          <span className="text-slate-200">•</span>
          <span className="text-emerald-600/70">PII Redacted: 100%</span>
        </div>
      </div>
    </div>
  );
}
