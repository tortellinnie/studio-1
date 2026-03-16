
"use client";

import * as React from "react";
import { 
  Filter, 
  HelpCircle, 
  ChevronDown, 
  Calendar as CalendarIcon,
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function FilterSidebar() {
  const [measure, setMeasure] = React.useState("5-star");
  const [source, setSource] = React.useState("err");
  const [division, setBrandDivision] = React.useState("focus");
  const [incentivized, setIncentivized] = React.useState("no");
  const [timeline, setTimeline] = React.useState("qtr");
  const [viewMode, setViewMode] = React.useState("brand");

  const activeClass = "bg-[#003da5] text-white hover:bg-[#003da5]/90";
  const inactiveClass = "bg-slate-200 text-slate-500 hover:bg-slate-300";

  return (
    <aside className="w-72 shrink-0 border-r border-slate-200 bg-white flex flex-col overflow-y-auto p-6 space-y-6">
      {/* 1. High-level Measure */}
      <div className="space-y-2">
        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Select high-level Measure:</Label>
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

      {/* 2. Source Type */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Source Type:</Label>
          <InfoIcon className="h-3.5 w-3.5 text-slate-300" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("h-9 rounded-xl font-bold transition-all", source === "err" ? activeClass : inactiveClass)}
            onClick={() => setSource("err")}
          >
            eR&R
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("h-9 rounded-xl font-bold transition-all", source === "icc" ? activeClass : inactiveClass)}
            onClick={() => setSource("icc")}
          >
            ICC
          </Button>
        </div>
      </div>

      {/* 3. Sub-Sector */}
      <div className="space-y-2">
        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Sub-Sector:</Label>
        <Select defaultValue="oral-care">
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
        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Brand Division:</Label>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("w-full h-9 rounded-xl font-bold transition-all", division === "focus" ? activeClass : inactiveClass)}
          onClick={() => setBrandDivision("focus")}
        >
          Focus Brands
        </Button>
      </div>

      {/* 5. Brand */}
      <div className="space-y-2">
        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Brand:</Label>
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

      {/* 6. Time Period */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Time Period:</Label>
          <InfoIcon className="h-3.5 w-3.5 text-slate-300" />
        </div>
        <Select defaultValue="custom">
          <SelectTrigger className="h-9 rounded-lg border-slate-200 bg-slate-50 text-xs font-semibold">
            <SelectValue placeholder="Custom" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="custom">Custom</SelectItem>
            <SelectItem value="mtd">MTD</SelectItem>
            <SelectItem value="ytd">YTD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 7. Custom Range */}
      <div className="space-y-2">
        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-tight text-primary">Select Custom Range</Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <Input defaultValue="7/1/2025" className="h-9 px-2 text-[10px] font-bold bg-slate-50 border-slate-200 rounded-lg pr-7" />
            <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          </div>
          <div className="relative">
            <Input defaultValue="12/31/2025" className="h-9 px-2 text-[10px] font-bold bg-slate-50 border-slate-200 rounded-lg pr-7" />
            <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* 8. Include Incentivized */}
      <div className="space-y-2">
        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Include Incentivized:</Label>
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

      {/* 9. Timeline */}
      <div className="space-y-2">
        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Timeline:</Label>
        <div className="grid grid-cols-4 gap-1.5">
          {["Year", "Qtr", "Mon", "Day"].map((t) => (
            <Button 
              key={t}
              variant="ghost" 
              size="sm" 
              className={cn(
                "h-8 px-0 text-[10px] rounded-lg font-black transition-all", 
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
          <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">View Mode:</Label>
          <InfoIcon className="h-3.5 w-3.5 text-slate-300" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("h-9 rounded-xl font-bold transition-all text-[10px] uppercase tracking-wider", viewMode === "brand" ? activeClass : inactiveClass)}
            onClick={() => setViewMode("brand")}
          >
            Brand
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("h-9 rounded-xl font-bold transition-all text-[10px] uppercase tracking-wider", viewMode === "more" ? activeClass : inactiveClass)}
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
