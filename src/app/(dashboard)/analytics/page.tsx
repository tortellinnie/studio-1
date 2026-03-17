
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Info, TrendingUp, Users, Activity, HardDrive } from "lucide-react";

const monthlyUsage = [
  { month: 'Jan', tokens: 120000 },
  { month: 'Feb', tokens: 150000 },
  { month: 'Mar', tokens: 180000 },
  { month: 'Apr', tokens: 240000 },
  { month: 'May', tokens: 320000 },
  { month: 'Jun', tokens: 290000 },
  { month: 'Jul', tokens: 420000 },
];

const categoryDistribution = [
  { name: 'Marketing', value: 45 },
  { name: 'Engineering', value: 30 },
  { name: 'Sales', value: 15 },
  { name: 'Customer Support', value: 10 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', '#10b981', '#f59e0b'];

export default function AnalyticsPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Usage Analytics</h1>
          <p className="text-muted-foreground">Deep dive into your organization's AI consumption.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 lavender-glow border-primary/20 text-primary">Billing Cycle: Oct 01 - Oct 31</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Active Users", value: "24", icon: Users, sub: "+3 this week" },
          { title: "Total Requests", value: "8.4k", icon: Activity, sub: "+12% vs last month" },
          { title: "Token Quota", value: "62%", icon: HardDrive, sub: "840k / 1.2M used" },
          { title: "Estimated Savings", value: "$1.2k", icon: TrendingUp, sub: "Based on human labor hours" },
        ].map((item, i) => (
          <Card key={i} className="lavender-glow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase">{item.title}</CardTitle>
              <item.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Token Consumption Trend</CardTitle>
            <CardDescription>Historical monthly overview of total token usage across all models.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyUsage}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="tokens" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Category Usage</CardTitle>
            <CardDescription>Workload distribution.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full mt-6 space-y-2">
              {categoryDistribution.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-muted-foreground">{entry.name}</span>
                  </div>
                  <span className="font-medium">{entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-secondary/20 bg-secondary/5">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-3 bg-secondary/20 rounded-full">
            <Info className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <CardTitle>Optimization Insights</CardTitle>
            <CardDescription>AI-generated recommendations to reduce costs and improve quality.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-secondary">Token Efficiency</h4>
            <p className="text-sm text-muted-foreground">Your "SaaS Description" prompt is unusually verbose. Shortening the system instructions could save ~15% on tokens per call without sacrificing quality.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-secondary">Model Switching</h4>
            <p className="text-sm text-muted-foreground">80% of your requests are simple summarizations. Consider using Gemini 1.5 Flash instead of Pro to reduce costs by up to 40%.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
