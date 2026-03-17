
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

const radarData = [
  { subject: 'Product', A: 91, B: 80, fullMark: 100 },
  { subject: 'Packaging', A: 98, B: 77, fullMark: 100 },
  { subject: 'Value', A: 86, B: 98, fullMark: 100 },
  { subject: 'Communication', A: 78, B: 99, fullMark: 100 },
  { subject: 'Retail Execution', A: 99, B: 79, fullMark: 100 },
];

export default function CompetitiveAnalysisPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 p-8">
      
      {/* SHARED FILTERS BAR */}
      <div className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Shared Filters</span>
          <span className="text-[10px] text-slate-400">Selections apply to both analyses below</span>
        </div>
        
        <div className="flex-1 flex flex-wrap items-center gap-4">
          <div className="space-y-1.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase ml-1">Brand</span>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px] h-10 bg-white border-slate-200 text-xs font-bold rounded-lg">
                <SelectValue placeholder="All brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All brands</SelectItem>
                <SelectItem value="pg">P&G</SelectItem>
                <SelectItem value="unilever">Unilever</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase ml-1">Category</span>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px] h-10 bg-white border-slate-200 text-xs font-bold rounded-lg">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                <SelectItem value="fabric">Fabric Care</SelectItem>
                <SelectItem value="oral">Oral Care</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase ml-1">Subcategory</span>
            <Select disabled>
              <SelectTrigger className="w-[160px] h-10 bg-white border-slate-200 text-xs font-bold rounded-lg opacity-50">
                <SelectValue placeholder="Select category first" />
              </SelectTrigger>
              <SelectContent />
            </Select>
          </div>

          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-400 uppercase ml-1">Products — <span className="lowercase font-medium">max 4</span></span>
            </div>
            <div className="flex items-center gap-2 h-10 bg-white border border-slate-200 px-3 rounded-lg w-full">
              <Badge className="bg-[#003da5] hover:bg-[#003da5] text-white text-[10px] py-1 px-3 rounded-md font-bold tracking-normal">
                Downy Sunrise Fresh
              </Badge>
              <Badge className="bg-[#ef4444] hover:bg-[#ef4444] text-white text-[10px] py-1 px-3 rounded-md font-bold tracking-normal">
                Surf Cherry Blossom
              </Badge>
              <div className="ml-auto">
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50">5 Vectors of Superiority</button>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50">Analysis Timeline</button>
        </div>
      </div>

      <div className="w-full">
        {/* MAIN ANALYSIS CARD */}
        <Card className="border-slate-200 shadow-none rounded-[2rem] overflow-hidden">
          <CardHeader className="p-10 pb-0">
            <CardTitle className="text-3xl font-black text-slate-900 tracking-normal">5 Vectors of superiority analysis</CardTitle>
            <CardDescription className="text-base font-medium text-slate-400 tracking-normal">Comparative product analysis across the 5 superiority vectors</CardDescription>
          </CardHeader>
          <CardContent className="p-10 space-y-12">
            <div className="h-[500px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Downy Sunrise Fresh"
                    dataKey="A"
                    stroke="#003da5"
                    strokeWidth={3}
                    fill="#003da5"
                    fillOpacity={0.1}
                  />
                  <Radar
                    name="Surf Cherry Blossom"
                    dataKey="B"
                    stroke="#ef4444"
                    strokeWidth={3}
                    fill="#ef4444"
                    fillOpacity={0.1}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* CHART LEGEND */}
            <div className="flex items-center justify-center gap-10">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#003da5]" />
                <span className="text-sm font-black text-[#003da5] tracking-normal">Downy Sunrise Fresh Garden Bloom</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#ef4444]" />
                <span className="text-sm font-black text-[#ef4444] tracking-normal">Surf Cherry Blossom Liquid</span>
              </div>
            </div>

            <div className="h-px bg-slate-100 w-full" />

            {/* VECTOR DATA GRID */}
            <div className="grid grid-cols-5 gap-4">
              {radarData.map((item) => (
                <div key={item.subject} className="space-y-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{item.subject}</span>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#003da5]" />
                      <span className="text-2xl font-black text-[#003da5] tabular-nums">{item.A}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#ef4444]" />
                      <span className="text-2xl font-black text-[#ef4444] tabular-nums">{item.B}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
