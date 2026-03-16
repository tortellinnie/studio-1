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
    viewMode, setViewMode,
    sector, setSector,
    period, setPeriod
  } = useFilters();

  const activeClass = "bg-[#003da5] text-white hover:bg-[#003da5]/90 shadow-sm";
  const inactiveClass = "bg-slate-200/50 text-slate-500 hover:bg-slate-200 font-bold";

  return (
    <aside className="w-72 shrink-0 border-r border-slate-200 bg-white flex flex-col overflow-y-auto p-6 space-y-8 scrollbar-hide">
      {/* 1. High-level Measure */}
      <div className="space-y-3">
        <Label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">Select high-level Measure:</Label>
        <div className="flex flex-col gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("w-full h-10 rounded-xl font-bold transition-all text-xs tracking-normal", measure === "5-star" ? activeClass : inactiveClass)}
            onClick={() => setMeasure("5-star")}
          >
            5-Star Rating
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("w-full h-10 rounded-xl font-bold transition-all text-xs tracking-normal", measure === "psp" ? activeClass : inactiveClass)}
            onClick={() => setMeasure("psp")}
          >
            PSP
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("w-full h-10 rounded-xl font-bold transition-all text-xs tracking-normal", measure === "sentiment" ? activeClass : inactiveClass)}
            onClick={() => setMeasure("sentiment")}
          >
            Sentiment
          </Button>
        </div>
      </div>

      {/* 3. Sub-Sector */}
      <div className="space-y-3">
        <Label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">Sub-Sector:</Label>
        <Select value={sector} onValueChange={setSector}>
          <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-slate-50 text-xs font-bold tracking-normal">
            <SelectValue placeholder="Select sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oral-care" className="font-bold text-xs">Oral Care</SelectItem>
            <SelectItem value="fabric-care" className="font-bold text-xs">Fabric Care</SelectItem>
            <SelectItem value="hair-care" className="font-bold text-xs">Hair Care</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 4. Brand Division */}
      <div className="space-y-3">
        <Label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">Brand Division:</Label>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("w-full h-10 rounded-xl font-bold transition-all text-xs tracking-normal", division === "focus" ? activeClass : "bg-[#003da5] text-white")}
          onClick={() => setDivision("focus")}
        >
          Focus Brands
        </Button>
      </div>

      {/* 5. Brand */}
      <div className="space-y-3">
        <Label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">Brand:</Label>
        <Select defaultValue="multiple">
          <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-slate-50 text-xs font-bold tracking-normal">
            <SelectValue placeholder="Multiple selections" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="multiple" className="font-bold text-xs">Multiple selections</SelectItem>
            <SelectItem value="downy" className="font-bold text-xs">Downy</SelectItem>
            <SelectItem value="ariel" className="font-bold text-xs">Ariel</SelectItem>
            <SelectItem value="tide" className="font-bold text-xs">Tide</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 6. Time Period */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">Time Period:</Label>
          <InfoIcon className="h-3.5 w-3.5 text-slate-300" />
        </div>
        <div className="flex flex-col p-1.5 bg-slate-100/50 rounded-2xl border border-slate-200/50">
          {[
            { id: 7, label: 'Past 7 days' },
            { id: 30, label: 'Past 30 days' },
            { id: 90, label: 'Past 3 months' }
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className={cn(
                "w-full py-3 text-xs font-bold transition-all rounded-xl text-left px-4 tracking-normal",
                period === p.id 
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/50" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 10. View Mode */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">View Mode:</Label>
          <InfoIcon className="h-3.5 w-3.5 text-slate-300" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("h-10 rounded-xl font-bold transition-all text-[10px] uppercase tracking-widest", viewMode === "brand" ? activeClass : inactiveClass)}
            onClick={() => setViewMode("brand")}
          >
            Brand
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("h-10 rounded-xl font-bold transition-all text-[10px] uppercase tracking-widest", viewMode === "more" ? activeClass : inactiveClass)}
            onClick={() => setViewMode("more")}
          >
            More
          </Button>
        </div>
      </div>

      <div className="pt-6 space-y-3">
        <Button className="w-full h-12 bg-[#003da5] hover:bg-[#003da5]/90 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] gap-3 shadow-lg shadow-blue-900/10">
          <Filter className="h-4 w-4" />
          Apply Filters
        </Button>
        <Button variant="ghost" className="w-full h-12 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-2xl font-black uppercase tracking-widest text-[10px] gap-3">
          <HelpCircle className="h-4 w-4" />
          Support
        </Button>
      </div>
    </aside>
  );
}
