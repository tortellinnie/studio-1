
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar, 
  ResponsiveContainer,
  PolarRadiusAxis
} from 'recharts';
import { 
  Activity,
  CheckCircle2,
  Zap,
  Star,
  Users,
  Megaphone,
  Truck,
  MessageCircle,
  AlertTriangle
} from "lucide-react";
import { 
  dynamicVectorScores, 
  totalCacheCount,
  dynamicGlobalSentiment,
  criticalVector,
  bestVector,
  personaInsights
} from '@/data/mockData';
import { cn } from "@/lib/utils";

export default function BrandHealthPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const radarData = dynamicVectorScores.map(v => ({
    subject: v.vector,
    A: v.healthScore,
    fullMark: 100,
  }));

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10 px-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tighter text-slate-900 font-headline uppercase">Brand Superiority & Strategic Briefing</h1>
        <p className="text-base text-muted-foreground font-bold uppercase tracking-widest">Persona-based alerts from {totalCacheCount.toLocaleString()} Taglish NLP samples</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Industry Superiority Spider Graph */}
        <Card className="lg:col-span-7 shadow-sm border-slate-200 bg-white overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-[#003da5] rounded-xl shadow-lg shadow-[#003da5]/20">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">5 Vectors of Superiority</CardTitle>
              </div>
              <Badge className="bg-emerald-500 text-white font-black uppercase tracking-widest px-4 py-1 text-[9px] rounded-lg">Dynamic Health Index</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-10 flex flex-col items-center">
            <div className="h-[450px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" strokeWidth={2} />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900, textAnchor: 'middle' }} 
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Market Health"
                    dataKey="A"
                    stroke="#003da5"
                    strokeWidth={4}
                    fill="#003da5"
                    fillOpacity={0.2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 w-full gap-8 mt-10 border-t border-slate-50 pt-10">
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Critical Vector</p>
                <p className="text-xl font-black text-red-500 uppercase tracking-tighter">{criticalVector.vector}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Market Positive</p>
                <p className="text-xl font-black text-slate-900 uppercase tracking-tighter">{dynamicGlobalSentiment.positive}%</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Anchor Vector</p>
                <p className="text-xl font-black text-emerald-500 uppercase tracking-tighter">{bestVector.vector}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Persona Briefings Section */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase tracking-tighter flex items-center gap-3 mb-2">
            <ShieldAlert className="h-6 w-6 text-[#003da5]" />
            Persona Strategic Briefings
          </h2>

          {/* Supply Chain Persona */}
          <Card className="shadow-sm border-l-4 border-l-orange-500 bg-white">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Truck className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Supply Chain Manager</h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Focus: Operational Risk</p>
                  </div>
                </div>
                <Badge className="bg-orange-500 text-white font-black text-[10px]">ALERT: {personaInsights.supplyChain.alertScore}/10</Badge>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase">Strategic Rationale</p>
                <p className="text-sm font-bold text-slate-700 leading-relaxed italic">"{personaInsights.supplyChain.recommendation}"</p>
              </div>
            </CardContent>
          </Card>

          {/* Brand Manager Persona */}
          <Card className="shadow-sm border-l-4 border-l-[#003da5] bg-white">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Megaphone className="h-5 w-5 text-[#003da5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Brand Manager</h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Focus: Value & Bango</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-[#003da5] text-[#003da5] font-black text-[10px] uppercase">{personaInsights.brandManager.taglishNuance}</Badge>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase">Campaign Resonance</p>
                <p className="text-sm font-bold text-slate-700 leading-relaxed italic">"{personaInsights.brandManager.campaignPivot}"</p>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Persona */}
          <Card className="shadow-sm border-l-4 border-l-red-500 bg-white">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Social Media Strategist</h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Focus: Viral Defense</p>
                  </div>
                </div>
                <Badge className={cn(
                  "font-black text-[10px] uppercase",
                  personaInsights.socialStrategist.viralRisk === "HIGH" ? "bg-red-500 text-white" : "bg-emerald-500 text-white"
                )}>VIRAL RISK: {personaInsights.socialStrategist.viralRisk}</Badge>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl space-y-3">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Drafted Response (Taglish-Aware)</p>
                <p className="text-xs font-medium text-slate-200 leading-relaxed italic font-mono">"{personaInsights.socialStrategist.suggestedResponse}"</p>
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-[9px] font-black uppercase rounded-lg transition-colors border border-white/10">COPY RESPONSE TO CLIPBOARD</button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Deep Vector Analysis */}
      <div className="space-y-8 pt-6 border-t border-slate-100">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-4 font-headline uppercase tracking-tighter">
          <CheckCircle2 className="h-8 w-8 text-[#003da5]" />
          Vector-Specific Performance Insights
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dynamicVectorScores.map((v) => (
            <Card key={v.vector} className="shadow-sm border-slate-200 hover:border-[#003da5]/30 transition-all bg-white group">
              <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{v.vector} Health Index</h4>
                  <Badge variant="outline" className="border-slate-100 text-[10px] font-black uppercase">{v.count} Mentions</Badge>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black text-slate-900 tracking-tighter tabular-nums">{v.healthScore}%</span>
                  <span className={cn(
                    "text-xs font-black uppercase tracking-widest",
                    v.healthScore > dynamicGlobalSentiment.positive ? "text-emerald-500" : "text-red-500"
                  )}>
                    {v.healthScore > dynamicGlobalSentiment.positive ? "Above Avg" : "At Risk"}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner">
                  <div 
                    className={cn("h-full rounded-full transition-all duration-1000", v.healthScore > 70 ? "bg-emerald-500" : "bg-[#003da5]")} 
                    style={{ width: `${v.healthScore}%` }} 
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
