"use client";

import * as React from "react";
import { 
  Filter, 
  HelpCircle, 
  HelpCircle as InfoIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useFilters } from "@/context/FilterContext";

export function FilterSidebar() {
  const { 
    measure, setMeasure, 
    division, setDivision, 
    incentivized, setIncentivized, 
    timeline, setTimeline, 
    viewMode, setViewMode,
    sector, setSector,
    period, setPeriod
  } = useFilters();

  const activeClass = "bg-[#003da5] text-white hover:bg-[#003da5]/90";
  const inactiveClass = "bg-slate-200 text-slate-500 hover:bg-slate-300";

  return (
    <aside className="w-72 shrink-0 border-r border-slate-200 bg-white flex flex-col overflow-y-auto p-6 space-y-6">
      {/* 1. High-level Measure */}
      <div className="space-y-2">
        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-normal">Select high-level Measure:</Label>
        <div className="flex flex-col gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("w-full h-9 rounded-xl font-bold transition-all", measure === "5-star" ? activeClass : inactiveClass)}
            onClick={() => setMeasure("5-star")}
          >
            5-Star Rating
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("w-full h-9 rounded-xl font-bold transition-all", measure === "psp" ? activeClass : inactiveClass)}
            onClick={() => setMeasure("psp")}
          >
            PSP
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("w-full h-9 rounded-xl font-bold transition-all", measure === "sentiment" ? activeClass : inactiveClass)}
            onClick={() => setMeasure("sentiment")}
          >
            Sentiment
          </Button>
        </div>
      </div>

      {/* 3. Sub-Sector */}
      <div className="space-y-2">
        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-normal">Sub-Sector:</Label>
        <Select value={sector} onValueChange={setSector}>
          <SelectTrigger className="h-9 rounded-lg border-slate-200 bg-slate-50 text-xs font-semibold">
            <SelectValue placeholder="Select sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oral-care">Oral Care</SelectItem>
            <SelectItem value="fabric-care">Fabric Care</SelectItem>
            <SelectItem value="hair-care">Hair Care</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 4. Brand Division */}
      <div className="space-y-2">
        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-normal">Brand Division:</Label>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("w-full h-9 rounded-xl font-bold transition-all", division === "focus" ? activeClass : inactiveClass)}
          onClick={() => setDivision("focus")}
        >
          Focus Brands
        </Button>
      </div>

      {/* 5. Brand */}
      <div className="space-y-2">
        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-normal">Brand:</Label>
        <Select defaultValue="multiple">
          <SelectTrigger className="h-9 rounded-lg border-slate-200 bg-slate-50 text-xs font-semibold">
            <SelectValue placeholder="Multiple selections" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="multiple">Multiple selections</SelectItem>
            <SelectItem value="downy">Downy</SelectItem>
            <SelectItem value="ariel">Ariel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 6. Time Period (Transferred function) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-normal">Time Period:</Label>
          <InfoIcon className="h-3.5 w-3.5 text-slate-300" />
        </div>
        <div className="flex flex-col p-1.5 bg-slate-100/50 rounded-xl border border-slate-200">
          {[
            { id: 7, label: 'Past 7 days' },
            { id: 30, label: 'Past 30 days' },
            { id: 90, label: 'Past 3 months' }
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className={cn(
                "w-full py-2.5 text-xs font-bold transition-all rounded-lg text-left px-4",
                period === p.id 
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 8. Include Incentivized */}
      <div className="space-y-2">
        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-normal">Include Incentivized:</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("h-9 rounded-xl font-bold transition-all", incentivized === "yes" ? activeClass : inactiveClass)}
            onClick={() => setIncentivized("yes")}
          >
            Yes
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("h-9 rounded-xl font-bold transition-all", incentivized === "no" ? activeClass : inactiveClass)}
            onClick={() => setIncentivized("no")}
          >
            No
          </Button>
        </div>
      </div>

      {/* 9. Timeline (Refined: No Year) */}
      <div className="space-y-2">
        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-normal">Timeline:</Label>
        <div className="grid grid-cols-3 gap-1.5">
          {["Qtr", "Mon", "Day"].map((t) => (
            <Button 
              key={t}
              variant="ghost" 
              size="sm" 
              className={cn(
                "h-8 px-0 text-[10px] rounded-lg font-bold transition-all", 
                timeline === t.toLowerCase() ? activeClass : inactiveClass
              )}
              onClick={() => setTimeline(t.toLowerCase())}
            >
              {t}
            </Button>
          ))}
        </div>
      </div>

      {/* 10. View Mode */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-normal">View Mode:</Label>
          <InfoIcon className="h-3.5 w-3.5 text-slate-300" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("h-9 rounded-xl font-bold transition-all text-[10px] uppercase tracking-normal", viewMode === "brand" ? activeClass : inactiveClass)}
            onClick={() => setViewMode("brand")}
          >
            Brand
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("h-9 rounded-xl font-bold transition-all text-[10px] uppercase tracking-normal", viewMode === "more" ? activeClass : inactiveClass)}
            onClick={() => setViewMode("more")}
          >
            More views
          </Button>
        </div>
      </div>

      <div className="pt-4 space-y-3">
        <Button className="w-full h-11 bg-[#003da5] hover:bg-[#003da5]/90 text-white rounded-2xl font-bold uppercase tracking-widest text-xs gap-3">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
        <Button variant="ghost" className="w-full h-11 bg-slate-200 text-slate-500 hover:bg-slate-300 rounded-2xl font-bold uppercase tracking-widest text-xs gap-3">
          <HelpCircle className="h-4 w-4" />
          Support
        </Button>
      </div>
    </aside>
  );
}
