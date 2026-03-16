
"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowUpRight, TrendingDown } from "lucide-react";
import { criticalVector, totalCacheCount } from "@/data/mockData";

export function NotificationBanner() {
  return (
    <Alert variant="destructive" className="border-red-100 bg-red-50/50 p-6 rounded-xl shadow-sm">
      <div className="flex w-full items-start justify-between">
        <div className="flex gap-4">
          <div className="mt-1">
            <AlertCircle className="h-6 w-6 text-red-600 animate-pulse" />
          </div>
          <div className="flex flex-col gap-1">
            <AlertTitle className="text-lg font-black text-red-800 uppercase tracking-tight flex items-center gap-2">
              Critical: {criticalVector.vector} Friction Detected
              <span className="text-[10px] font-black bg-red-100 px-2 py-0.5 rounded-full ml-2">SYSTEM ALERT</span>
            </AlertTitle>
            <AlertDescription className="text-base text-red-700/80 font-bold leading-relaxed max-w-2xl">
              An NLP inference audit of {totalCacheCount} samples confirms a surge in negative sentiment regarding <strong>{criticalVector.vector}</strong>. 
              This trend is currently depressing the corrected market rating to <span className="font-black underline">{criticalVector.healthScore}%</span> health.
            </AlertDescription>
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-black text-red-800 hover:bg-red-100/50 bg-white shadow-sm border border-red-100 px-4 py-3 rounded-xl transition-all hover:scale-105 active:scale-95">
          GENERATE RECOVERY PLAN <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </Alert>
  );
}
