
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

          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-400 uppercase ml-1">Products — <span className="lowercase font-medium">max 2</span></span>
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
          <button className="px-6 py-2 bg-[#003da5] text-white border border-[#003da5] rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/10">Superiority Radar</button>
        </div>
      </div>

      <div className="w-full">
        <Card className="border-slate-200 shadow-none rounded-[2rem] overflow-hidden">
          <CardHeader className="p-10 pb-0">
            <CardTitle className="text-3xl font-black text-slate-900 tracking-normal">5 Vectors of Superiority Analysis</CardTitle>
            <CardDescription className="text-base font-medium text-slate-400 tracking-normal">Comparative analysis: Downy vs Surf baseline</CardDescription>
          </CardHeader>
          <CardContent className="p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* LEFT: SPIDER GRAPH & VECTOR BREAKDOWN */}
              <div className="lg:col-span-7 space-y-16">
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

                <div className="flex items-center justify-center gap-10 pb-8 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-[#003da5]" />
                    <span className="text-sm font-black text-[#003da5] tracking-normal">Downy Sunrise Fresh</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-[#ef4444]" />
                    <span className="text-sm font-black text-[#ef4444] tracking-normal">Surf Cherry Blossom</span>
                  </div>
                </div>

                {/* HIGH-FIDELITY VECTOR BREAKDOWN GRID */}
                <div className="space-y-10">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Vector Breakdown</span>
                  <div className="grid grid-cols-2 gap-x-16 gap-y-12">
                    {radarData.map((item) => (
                      <div key={item.subject} className="space-y-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{item.subject}</span>
                        <div className="flex items-center gap-6">
                          <span className={cn(
                            "text-4xl font-black tabular-nums tracking-tighter",
                            item.A > item.B ? "text-[#003da5]" : "text-slate-200"
                          )}>{item.A}%</span>
                          <div className="h-8 w-px bg-slate-100" />
                          <span className={cn(
                            "text-4xl font-black tabular-nums tracking-tighter",
                            item.B > item.A ? "text-[#ef4444]" : "text-slate-200"
                          )}>{item.B}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT: AI INSIGHTS SIDEBAR */}
              <div className="lg:col-span-5 space-y-10 border-l border-slate-100 pl-10">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Competitive Insights</span>
                  <div className="p-8 border border-slate-200 rounded-[2.5rem] shadow-sm space-y-8">
                    <div className="space-y-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#003da5]">Status Analysis</span>
                      <p className="text-2xl font-black text-slate-900 leading-tight">
                        Surf is currently outperforming Downy in {edgedOutVectors.length} key vectors.
                      </p>
                    </div>

                    <div className="space-y-8">
                      {edgedOutVectors.map((vector) => (
                        <div key={vector.subject} className="flex items-start gap-4">
                          <div className="w-1.5 h-12 bg-[#ef4444] rounded-full shrink-0" />
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-[#ef4444] uppercase tracking-[0.15em] leading-none">Primary Laggard: {vector.subject}</span>
                            <span className="text-sm font-bold text-slate-500 tracking-normal leading-tight">
                              Competitor lead: <span className="text-[#ef4444]">+{vector.B - vector.A}pp</span>. 
                              Audit {vector.subject.toLowerCase()} claims and price index immediately to reclaim portfolio lead.
                            </span>
                          </div>
                        </div>
                      ))}

                      {pgLeads.length > 0 && (
                        <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                          <div className="w-1.5 h-12 bg-emerald-500 rounded-full shrink-0" />
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.15em] leading-none">Core Strength: {pgLeads[0].subject}</span>
                            <span className="text-sm font-bold text-slate-500 tracking-normal leading-tight">
                              Downy maintains a massive <span className="text-emerald-600">+{pgLeads[0].A - pgLeads[0].B}pp</span> gap in {pgLeads[0].subject}. Amplify this in all Q2 digital marketing.
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
