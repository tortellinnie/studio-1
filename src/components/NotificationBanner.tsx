"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowUpRight } from "lucide-react";

export function NotificationBanner() {
  return (
    <Alert variant="destructive" className="border-red-100 bg-red-50/50 p-6 rounded-xl">
      <div className="flex w-full items-start justify-between">
        <div className="flex gap-4">
          <div className="mt-1">
            <AlertCircle className="h-5 w-5 text-red-600" />
          </div>
          <div className="flex flex-col gap-1">
            <AlertTitle className="text-base font-bold text-red-800 uppercase tracking-tight">
              Urgent: Sentiment Surge Detected
            </AlertTitle>
            <AlertDescription className="text-sm text-red-700/80 font-medium leading-relaxed">
              There is a surge of negative sentiments in <strong>Ariel Sunrise Fresh</strong>! 
              The trend contributes negatively towards the <span className="font-bold underline">Value (Price Perception)</span> vector on Lazada PH.
            </AlertDescription>
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-bold text-red-800 hover:bg-red-100/50 px-3 py-2 rounded-lg transition-colors">
          VIEW ANALYSIS <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </Alert>
  );
}