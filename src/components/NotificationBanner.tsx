
"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function NotificationBanner() {
  return (
    <div className="mb-6 space-y-3">
      <Alert variant="destructive" className="border-red-200 bg-red-50/50">
        <AlertCircle className="h-4 w-4" />
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-1">
            <AlertTitle className="flex items-center gap-2 text-sm font-bold text-red-800">
              URGENT: SENTIMENT SURGE DETECTED
              <Badge className="bg-red-600 text-[10px] font-bold">HIGH PRIORITY</Badge>
            </AlertTitle>
            <AlertDescription className="text-sm text-red-700 font-medium">
              There is a surge of negative sentiments in <strong>Ariel Sunrise Fresh</strong>! 
              The trend contributes negatively towards the <span className="font-bold underline">Value (Price Perception)</span> vector on Lazada PH.
            </AlertDescription>
          </div>
          <button className="flex items-center gap-1 text-xs font-bold text-red-800 hover:underline">
            View Analysis <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </Alert>
    </div>
  );
}
