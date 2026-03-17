
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
import { cn } from "@/lib/utils";

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

  const edgedOutVectors = radarData.filter(d => d.B > d.A);
  const pgLeads = radarData.filter(d => d.A > d.B);

  return (
    <div className="h-full flex flex-col space-y-4 animate-in fade-in duration-500 p-6 overflow-hidden">
      
      {/* HORIZONTAL FILTERS BAR - COMPACT */}
      <div className="w-full bg-white border border-slate-200 rounded-xl p-4 flex flex-row items-center gap-8 shadow-sm shrink-0">
        <div className="flex flex-col gap-0.5 min-w-fit">
          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none">Intelligence Filters</span>
          <span className="text-[9px] text-slate-400 font-bold tracking-tight">Synchronized cross-platform analysis</span>
        </div>
        
        <div className="flex flex-1 items-center gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-tight">Primary Brand</span>
            <Select defaultValue="pg">
              <SelectTrigger className="w-[160px] h-8 bg-slate-50 border-slate-200 text-[11px] font-bold rounded-md">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pg" className="font-bold text-xs">P&G (Portfolio)</SelectItem>
                <SelectItem value="unilever" className="font-bold text-xs">Unilever</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-tight">Category Segment</span>
            <Select defaultValue="fabric">
              <SelectTrigger className="w-[160px] h-8 bg-slate-50 border-slate-200 text-[11px] font-bold rounded-md">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fabric" className="font-bold text-xs">Fabric Care</SelectItem>
                <SelectItem value="oral" className="font-bold text-xs">Oral Care</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-tight">Comparative Baseline</span>
            <div className="flex items-center gap-2 h-8 bg-slate-50 border border-slate-200 px-3 rounded-md w-full">
              <Badge className="bg-[#003da5] hover:bg-[#003da5] text-white text-[9px] py-0.5 px-2 rounded font-bold">
                Downy Sunrise Fresh
              </Badge>
              <span className="text-slate-300 font-black text-[9px]">vs</span>
              <Badge className="bg-[#ef4444] hover:bg-[#ef4444] text-white text-[9px] py-0.5 px-2 rounded font-bold">
                Surf Cherry Blossom
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <Card className="h-full border-slate-200 shadow-none rounded-[2rem] overflow-hidden flex flex-col">
          <CardHeader className="p-8 pb-0 shrink-0">
            <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">5 Vectors of Superiority Analysis</CardTitle>
            <CardDescription className="text-sm font-medium text-slate-400 tracking-tight mt-1">P&G Portfolio vs Unilever Market Baseline</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4 flex-1 min-h-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
              
              {/* LEFT: SPIDER GRAPH & GRID BREAKDOWN */}
              <div className="lg:col-span-7 flex flex-col min-h-0">
                <div className="flex-1 min-h-[300px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: '#64748b', fontSize: 11, fontWeight: 800 }}
                      />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="Downy Sunrise Fresh"
                        dataKey="A"
                        stroke="#003da5"
                        strokeWidth={3}
                        fill="#003da5"
                        fillOpacity={0.08}
                      />
                      <Radar
                        name="Surf Cherry Blossom"
                        dataKey="B"
                        stroke="#ef4444"
                        strokeWidth={3}
                        fill="#ef4444"
                        fillOpacity={0.08}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* HORIZONTAL GRID BREAKDOWN - EXPANDED */}
                <div className="mt-4 pt-4 border-t border-slate-100 shrink-0">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6 block">Vector Breakdown</span>
                  <div className="grid grid-cols-2 gap-x-24 gap-y-10">
                    {radarData.map((item) => (
                      <div key={item.subject} className="space-y-2">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">{item.subject}</span>
                        <div className="flex items-center gap-6">
                          <span className={cn(
                            "text-5xl font-black tabular-nums tracking-tighter transition-colors",
                            item.A > item.B ? "text-[#003da5]" : "text-slate-200"
                          )}>{item.A}%</span>
                          <div className="h-8 w-px bg-slate-100" />
                          <span className={cn(
                            "text-5xl font-black tabular-nums tracking-tighter transition-colors",
                            item.B > item.A ? "text-[#ef4444]" : "text-slate-200"
                          )}>{item.B}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT: COMPACT AI INSIGHTS */}
              <div className="lg:col-span-5 flex flex-col min-h-0">
                <div className="flex flex-col h-full space-y-4">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Competitive Intelligence</span>
                  
                  <div className="flex-1 border border-slate-200 rounded-[2rem] bg-white p-6 flex flex-col space-y-6 overflow-y-auto scrollbar-hide">
                    <div className="space-y-2">
                      <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#003da5]">Executive Status</span>
                      <p className="text-2xl font-black text-slate-900 leading-tight tracking-tight">
                        Competitor leads detected in {edgedOutVectors.length} strategic vectors.
                      </p>
                    </div>

                    <div className="space-y-6">
                      {edgedOutVectors.map((vector) => (
                        <div key={vector.subject} className="flex items-start gap-4 group">
                          <div className="w-1.5 h-12 bg-[#ef4444] rounded-full shrink-0" />
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-black text-[#ef4444] uppercase tracking-wider leading-none">Primary Laggard: {vector.subject}</span>
                            <span className="text-base font-bold text-slate-600 tracking-tight leading-snug">
                              Surf holds a <span className="text-[#ef4444] font-black">+{vector.B - vector.A}pp</span> lead. 
                              Audit pricing index and {vector.subject.toLowerCase()} claims.
                            </span>
                          </div>
                        </div>
                      ))}

                      {pgLeads.length > 0 && (
                        <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                          <div className="w-1.5 h-12 bg-emerald-500 rounded-full shrink-0" />
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider leading-none">Portfolio Strength: {pgLeads[0].subject}</span>
                            <span className="text-base font-bold text-slate-600 tracking-tight leading-snug">
                              Downy maintains a <span className="text-emerald-600 font-black">+{pgLeads[0].A - pgLeads[0].B}pp</span> dominant gap. Amplify in Q2.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
