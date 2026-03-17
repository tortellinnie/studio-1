
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
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 p-10">
      
      {/* HORIZONTAL FILTERS BAR */}
      <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 flex flex-row items-center gap-12 shadow-sm">
        <div className="flex flex-col gap-1 min-w-fit">
          <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-none">Intelligence Filters</span>
          <span className="text-[10px] text-slate-400 font-bold">Synchronized cross-platform analysis</span>
        </div>
        
        <div className="flex flex-1 items-center gap-8">
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-black text-slate-400 uppercase">Primary Brand</span>
            <Select defaultValue="pg">
              <SelectTrigger className="w-[180px] h-10 bg-slate-50 border-slate-200 text-xs font-bold rounded-lg">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pg" className="font-bold">P&G (Portfolio)</SelectItem>
                <SelectItem value="unilever" className="font-bold">Unilever</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-black text-slate-400 uppercase">Category Segment</span>
            <Select defaultValue="fabric">
              <SelectTrigger className="w-[180px] h-10 bg-slate-50 border-slate-200 text-xs font-bold rounded-lg">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fabric" className="font-bold">Fabric Care</SelectItem>
                <SelectItem value="oral" className="font-bold">Oral Care</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 flex flex-col gap-1.5">
            <span className="text-[9px] font-black text-slate-400 uppercase">Comparative Baseline</span>
            <div className="flex items-center gap-2 h-10 bg-slate-50 border border-slate-200 px-4 rounded-lg w-full">
              <Badge className="bg-[#003da5] hover:bg-[#003da5] text-white text-[10px] py-1 px-3 rounded-md font-bold">
                Downy Sunrise Fresh
              </Badge>
              <span className="text-slate-300 font-black text-xs">vs</span>
              <Badge className="bg-[#ef4444] hover:bg-[#ef4444] text-white text-[10px] py-1 px-3 rounded-md font-bold">
                Surf Cherry Blossom
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Card className="border-slate-200 shadow-none rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-12 pb-0">
            <CardTitle className="text-4xl font-black text-slate-900 tracking-normal">5 Vectors of Superiority Analysis</CardTitle>
            <CardDescription className="text-lg font-medium text-slate-400 tracking-normal mt-2">P&G Portfolio vs Unilever Market Baseline</CardDescription>
          </CardHeader>
          <CardContent className="p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              
              {/* LEFT: SPIDER GRAPH & GRID BREAKDOWN */}
              <div className="lg:col-span-7 space-y-20">
                <div className="h-[500px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: '#64748b', fontSize: 13, fontWeight: 800 }}
                      />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="Downy Sunrise Fresh"
                        dataKey="A"
                        stroke="#003da5"
                        strokeWidth={4}
                        fill="#003da5"
                        fillOpacity={0.08}
                      />
                      <Radar
                        name="Surf Cherry Blossom"
                        dataKey="B"
                        stroke="#ef4444"
                        strokeWidth={4}
                        fill="#ef4444"
                        fillOpacity={0.08}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* HORIZONTAL GRID BREAKDOWN */}
                <div className="space-y-10 pt-10 border-t border-slate-100">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Vector Breakdown</span>
                  <div className="grid grid-cols-2 gap-x-20 gap-y-12">
                    {radarData.map((item) => (
                      <div key={item.subject} className="space-y-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{item.subject}</span>
                        <div className="flex items-center gap-6">
                          <span className={cn(
                            "text-5xl font-black tabular-nums tracking-tighter",
                            item.A > item.B ? "text-[#003da5]" : "text-slate-200"
                          )}>{item.A}%</span>
                          <div className="h-10 w-px bg-slate-100" />
                          <span className={cn(
                            "text-5xl font-black tabular-nums tracking-tighter",
                            item.B > item.A ? "text-[#ef4444]" : "text-slate-200"
                          )}>{item.B}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT: ENLARGED AI INSIGHTS */}
              <div className="lg:col-span-5 space-y-12">
                <div className="space-y-4">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Competitive Intelligence</span>
                  
                  <div className="p-10 border border-slate-200 rounded-[3rem] bg-white space-y-12">
                    <div className="space-y-4">
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#003da5]">Executive Status</span>
                      <p className="text-5xl font-black text-slate-900 leading-[1.1] tracking-normal">
                        Competitor leads detected in {edgedOutVectors.length} strategic vectors.
                      </p>
                    </div>

                    <div className="space-y-12">
                      {edgedOutVectors.map((vector) => (
                        <div key={vector.subject} className="flex items-start gap-6 group">
                          <div className="w-2 h-20 bg-[#ef4444] rounded-full shrink-0 mt-1" />
                          <div className="flex flex-col gap-2">
                            <span className="text-xs font-black text-[#ef4444] uppercase tracking-[0.2em] leading-none">Primary Laggard: {vector.subject}</span>
                            <span className="text-2xl font-bold text-slate-600 tracking-normal leading-tight">
                              Surf holds a <span className="text-[#ef4444] font-black">+{vector.B - vector.A}pp</span> lead. 
                              Audit pricing index and {vector.subject.toLowerCase()} claims immediately.
                            </span>
                          </div>
                        </div>
                      ))}

                      {pgLeads.length > 0 && (
                        <div className="flex items-start gap-6 pt-8 border-t border-slate-100">
                          <div className="w-2 h-20 bg-emerald-500 rounded-full shrink-0 mt-1" />
                          <div className="flex flex-col gap-2">
                            <span className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] leading-none">Portfolio Strength: {pgLeads[0].subject}</span>
                            <span className="text-2xl font-bold text-slate-600 tracking-normal leading-tight">
                              Downy maintains a <span className="text-emerald-600 font-black">+{pgLeads[0].A - pgLeads[0].B}pp</span> dominant gap. Amplify this in Q2 messaging.
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
