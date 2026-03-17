
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PolarRadiusAxis
} from 'recharts';
import { getStatsForPeriod, allIndustryProducts, allBrands, vectorLabels, getProductVectorScores, getComparativeRadarData, getSingleProductTimeline, getVelocityTimeline } from '@/data/mockData';
import { TopProductsPodium, wilsonLowerBound, type RankedProduct } from '@/components/TopProductsPodium';
import { BrandSignalPanel } from '@/components/BrandSignalPanel';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Info, ChevronDown, Check } from "lucide-react";

const COLORS = {
  positive: "#10b981", // Emerald 500
  neutral: "#f59e0b",  // Amber 500
  negative: "#ef4444", // Rose 500
  pg: "#003da5",       // P&G Blue
};

const COMPARISON_COLORS = ['#003da5', '#ef4444', '#10b981', '#f59e0b'];
const VELOCITY_COLORS = ['#003da5', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#f97316'];

const allCompanies = [...new Set(allIndustryProducts.map(p => p.company))];
const allCategories = [...new Set(allIndustryProducts.map(p => p.category))];

// ─── Searchable single-select dropdown ─────────────────────────────────────
function SingleDropdown({ label, options, value, onChange, placeholder = 'All', disabled = false }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
  placeholder?: string; disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      <Popover open={open && !disabled} onOpenChange={(o) => { setOpen(o); if (!o) setSearch(''); }}>
        <PopoverTrigger asChild>
          <button
            disabled={disabled}
            className={cn(
              "flex items-center justify-between gap-2 px-3 py-2 rounded-lg border bg-white text-sm font-bold transition-colors min-w-[160px]",
              disabled ? "border-slate-100 text-slate-300 cursor-not-allowed" : "border-slate-200 text-slate-700 hover:border-slate-300"
            )}
          >
            <span className={cn(!value && "font-medium", !value && !disabled && "text-slate-400", !value && disabled && "text-slate-300")}>
              {value || placeholder}
            </span>
            <ChevronDown className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0 shadow-lg border-slate-200" align="start">
          <div className="p-2 border-b border-slate-100">
            <input
              autoFocus
              className="w-full text-sm px-2 py-1.5 outline-none bg-transparent placeholder:text-slate-400"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="max-h-48 overflow-y-auto py-1">
            {[{ v: '', label: placeholder }, ...filtered.map(o => ({ v: o, label: o }))].map(({ v, label: l }) => (
              <button
                key={v || '__all__'}
                onClick={() => { onChange(v); setOpen(false); setSearch(''); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 transition-colors text-left"
              >
                {value === v
                  ? <Check className="w-3.5 h-3.5 text-[#003da5] shrink-0" />
                  : <span className="w-3.5 shrink-0" />}
                <span className={cn("font-medium", value === v ? "text-[#003da5] font-bold" : "text-slate-600")}>{l}</span>
              </button>
            ))}
            {filtered.length === 0 && <p className="px-3 py-2 text-sm text-slate-400">No results</p>}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// ─── Searchable multi-select dropdown ──────────────────────────────────────
function MultiDropdown({ label, options, selected, onToggle, placeholder = 'All' }: {
  label: string; options: string[]; selected: string[]; onToggle: (v: string) => void; placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));
  const display = selected.length === 0 ? placeholder : selected.join(', ');

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      <Popover open={open} onOpenChange={(o) => { setOpen(o); if (!o) setSearch(''); }}>
        <PopoverTrigger asChild>
          <button className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:border-slate-300 transition-colors min-w-[140px]">
            <span className={cn("truncate max-w-[120px]", !selected.length && "text-slate-400 font-medium")}>{display}</span>
            <ChevronDown className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-0 shadow-lg border-slate-200" align="start">
          <div className="p-2 border-b border-slate-100">
            <input
              autoFocus
              className="w-full text-sm px-2 py-1.5 outline-none bg-transparent placeholder:text-slate-400"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="max-h-48 overflow-y-auto py-1">
            {filtered.map(opt => {
              const isSelected = selected.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => onToggle(opt)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-slate-50 transition-colors text-left"
                >
                  <div className={cn("w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors", isSelected ? "bg-[#003da5] border-[#003da5]" : "border-slate-300")}>
                    {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <span className={cn("font-medium", isSelected ? "text-slate-900 font-bold" : "text-slate-600")}>{opt}</span>
                </button>
              );
            })}
            {filtered.length === 0 && <p className="px-3 py-2 text-sm text-slate-400">No results</p>}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// ─── Product multi-select with colour chips ─────────────────────────────────
function ProductMultiSelect({ products, selected, onToggle, onClearAll, colors }: {
  products: typeof allIndustryProducts; selected: string[]; onToggle: (id: string) => void;
  onClearAll: () => void; colors: string[];
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase()) ||
    p.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-1.5 flex-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        Products <span className="normal-case font-medium text-slate-300">— max 4</span>
      </span>
      <Popover open={open} onOpenChange={(o) => { setOpen(o); if (!o) setSearch(''); }}>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors w-full min-h-[38px] text-left">
            {selected.length === 0 ? (
              <span className="text-sm text-slate-400 font-medium flex-1">Select products to compare...</span>
            ) : (
              <div className="flex gap-1.5 flex-wrap flex-1">
                {selected.map((id, i) => {
                  const p = allIndustryProducts.find(x => x.id === id);
                  const short = p?.name.split(' ').slice(0, 3).join(' ') ?? id;
                  return (
                    <span key={id} className="text-[11px] font-bold px-2 py-0.5 rounded text-white leading-tight" style={{ backgroundColor: colors[i] }}>
                      {short}
                    </span>
                  );
                })}
              </div>
            )}
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-auto" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[420px] p-0 shadow-lg border-slate-200" align="start">
          <div className="p-2 border-b border-slate-100">
            <input
              autoFocus
              className="w-full text-sm px-2 py-1.5 outline-none bg-transparent placeholder:text-slate-400"
              placeholder="Search by product name or brand..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="max-h-60 overflow-y-auto py-1">
            {filtered.map(p => {
              const selIdx = selected.indexOf(p.id);
              const isSelected = selIdx !== -1;
              const isDisabled = !isSelected && selected.length >= 4;
              return (
                <button
                  key={p.id}
                  onClick={() => !isDisabled && onToggle(p.id)}
                  disabled={isDisabled}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors text-left disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <div
                    className="w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors"
                    style={isSelected ? { backgroundColor: colors[selIdx], borderColor: colors[selIdx] } : { borderColor: '#cbd5e1' }}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.brand} · {p.category}</p>
                  </div>
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: colors[selIdx] }} />
                  )}
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="px-3 py-4 text-sm text-slate-400 text-center">No products match your search</p>
            )}
          </div>
          <div className="p-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{selected.length}/4 selected</span>
            {selected.length > 0 && (
              <button onClick={onClearAll} className="text-xs text-slate-400 hover:text-slate-600 font-bold transition-colors">
                Clear all
              </button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// ─── Velocity searchable multi-select with colour chips ─────────────────────
function VelocityMultiSelect({ options, selected, onToggle, colors, placeholder }: {
  options: { value: string; label: string; sub?: string }[];
  selected: string[];
  onToggle: (value: string) => void;
  colors: string[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase()) ||
    (o.sub ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3">
      {/* Dropdown trigger */}
      <Popover open={open} onOpenChange={(o) => { setOpen(o); if (!o) setSearch(''); }}>
        <PopoverTrigger asChild>
          <button className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-500 hover:border-slate-300 transition-colors min-w-[200px] w-fit">
            <span>{placeholder}</span>
            <ChevronDown className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0 shadow-lg border-slate-200" align="start">
          <div className="p-2 border-b border-slate-100">
            <input
              autoFocus
              className="w-full text-sm px-2 py-1.5 outline-none bg-transparent placeholder:text-slate-400"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="max-h-56 overflow-y-auto py-1">
            {filtered.map(opt => {
              const isSelected = selected.includes(opt.value);
              const colorIdx = selected.indexOf(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => onToggle(opt.value)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors text-left"
                >
                  <div
                    className="w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors"
                    style={isSelected
                      ? { backgroundColor: colors[colorIdx], borderColor: colors[colorIdx] }
                      : { borderColor: '#cbd5e1' }}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{opt.label}</p>
                    {opt.sub && <p className="text-xs text-slate-400">{opt.sub}</p>}
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 && <p className="px-3 py-3 text-sm text-slate-400 text-center">No results</p>}
          </div>
          {selected.length > 0 && (
            <div className="p-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => selected.forEach(v => onToggle(v))}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((value, i) => {
            const opt = options.find(o => o.value === value);
            return (
              <span
                key={value}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold text-white"
                style={{ backgroundColor: colors[i % colors.length] }}
              >
                {opt?.label ?? value}
                <button
                  onClick={() => onToggle(value)}
                  className="opacity-70 hover:opacity-100 transition-opacity ml-0.5"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function OverviewPage() {
  const [period, setPeriod] = useState(90);
  const [stats, setStats] = useState(getStatsForPeriod(90));
  const [isClient, setIsClient] = useState(false);

  // Comparative analysis filters
  const [filterCompanies, setFilterCompanies] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSubcategory, setFilterSubcategory] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(['pg-1', 'uni-1']);

  // Active product shown in the Analysis Timeline
  const [activeTimelineProduct, setActiveTimelineProduct] = useState<string>('pg-1');

  // Sentiment Velocity filters
  const [velocityMode, setVelocityMode] = useState<'brand' | 'product'>('brand');
  const [velocityBrands, setVelocityBrands] = useState<string[]>(['P&G', 'Unilever', 'Local']);
  const [velocityProductIds, setVelocityProductIds] = useState<string[]>(['pg-1', 'uni-1', 'pg-2']);

  useEffect(() => {
    setIsClient(true);
    setStats(getStatsForPeriod(period));
  }, [period]);

  // Keep active timeline product in sync with selection
  useEffect(() => {
    if (selectedProductIds.length === 0) return;
    if (!selectedProductIds.includes(activeTimelineProduct)) {
      setActiveTimelineProduct(selectedProductIds[0]);
    }
  }, [selectedProductIds, activeTimelineProduct]);

  if (!isClient) return null;

  // Rank by raw score: (sentimentScore% / 100) * reviewCount
  const rankedProducts: RankedProduct[] = [...allIndustryProducts]
    .map((p) => ({
      ...p,
      wilson: wilsonLowerBound(p.sentimentScore, p.samplesAnalyzed),
      rawScore: (p.sentimentScore / 100) * p.reviewCount,
    }))
    .sort((a, b) => b.rawScore - a.rawScore)
    .map((p, i) => ({ ...p, rank: i + 1 }));

  // Comparative analysis derived data
  const filteredSubcategories = [...new Set(
    allIndustryProducts
      .filter(p => !filterCategory || p.category === filterCategory)
      .map(p => p.subcategory)
  )];

  const visibleProducts = allIndustryProducts.filter(p => {
    if (filterCompanies.length > 0 && !filterCompanies.includes(p.company)) return false;
    if (filterCategory && p.category !== filterCategory) return false;
    if (filterSubcategory && p.subcategory !== filterSubcategory) return false;
    return true;
  });

  const toggleCompany = (company: string) => {
    setFilterCompanies(prev =>
      prev.includes(company) ? prev.filter(c => c !== company) : [...prev, company]
    );
  };

  const handleCategoryChange = (cat: string) => {
    setFilterCategory(prev => prev === cat ? '' : cat);
    setFilterSubcategory('');
  };

  const toggleProduct = (id: string) => {
    setSelectedProductIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  };

  const comparativeRadarData = getComparativeRadarData(selectedProductIds);
  const velocityIds = velocityMode === 'brand' ? velocityBrands : velocityProductIds;
  const velocityTimeline = getVelocityTimeline(velocityMode, velocityIds, period);

  const activeProduct = allIndustryProducts.find(p => p.id === activeTimelineProduct);
  const activeProductIndex = selectedProductIds.indexOf(activeTimelineProduct);
  const activeTimelineColor = COMPARISON_COLORS[activeProductIndex] ?? COMPARISON_COLORS[0];
  const singleProductTimeline = activeTimelineProduct
    ? getSingleProductTimeline(activeTimelineProduct, period)
    : [];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* 1. KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Market positive", value: `${stats.posPct}%`, sub: "Overall sentiment health", trend: "+2.4%", trendColor: "text-emerald-600", icon: TrendingUp },
          { title: "Corrected rating", value: stats.correctedRating.toFixed(2), sub: "NLP Adjusted vs 4.82", trend: "-0.12", trendColor: "text-red-600", icon: TrendingDown },
          { title: "Rating inflation", value: `${stats.ratingInflation}%`, sub: "Platform bias detected", trend: "+1.1%", trendColor: "text-amber-600", icon: Info },
          { title: "Negative friction", value: `${stats.negPct}%`, sub: "Unmet consumer needs", trend: "-0.8%", trendColor: "text-red-600", icon: TrendingDown },
        ].map((item, i) => (
          <Card key={i} className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <p className="text-base font-bold text-slate-500">{item.title}</p>
                <item.icon className={cn("h-5 w-5", item.trendColor)} />
              </div>
              <div className="space-y-2">
                <h3 className="text-5xl font-extrabold text-slate-900 tabular-nums tracking-normal">{item.value}</h3>
                <div className="flex items-center gap-2 pt-1">
                  <span className={cn("text-xs font-bold px-2 py-1 rounded bg-slate-50", item.trendColor)}>{item.trend}</span>
                  <p className="text-sm text-slate-400 font-semibold">{item.sub}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2. Brand Signal — 3 core questions */}
      <BrandSignalPanel />

      {/* 3. Top Performing SKUs Podium */}
      <TopProductsPodium products={rankedProducts} />

      {/* 4+5. Unified Analysis Container — shared filters drive both radar and timeline */}
      <div className="space-y-6">

        {/* Shared Filter Bar */}
        <div className="border border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
          <div className="flex items-center justify-between px-8 py-4 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">Shared filters</span>
              <span className="text-slate-300 font-light">·</span>
              <span className="text-xs font-semibold text-slate-400">Selections apply to both analyses below</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-500">5 Vectors of Superiority</span>
              <span className="text-slate-300">+</span>
              <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-500">Analysis Timeline</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 items-end px-8 py-6">
          <MultiDropdown
            label="Brand"
            options={allCompanies}
            selected={filterCompanies}
            onToggle={toggleCompany}
            placeholder="All brands"
          />
          <SingleDropdown
            label="Category"
            options={allCategories}
            value={filterCategory}
            onChange={handleCategoryChange}
            placeholder="All categories"
          />
          <SingleDropdown
            label="Subcategory"
            options={filteredSubcategories}
            value={filterSubcategory}
            onChange={setFilterSubcategory}
            placeholder={filterCategory ? 'All subcategories' : 'Select category first'}
            disabled={!filterCategory}
          />
          <ProductMultiSelect
            products={visibleProducts}
            selected={selectedProductIds}
            onToggle={toggleProduct}
            onClearAll={() => setSelectedProductIds([])}
            colors={COMPARISON_COLORS}
          />
          </div>
        </div>

        {/* 5 Vectors + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <Card className="lg:col-span-9 border-slate-200 shadow-sm rounded-xl bg-white p-10 flex flex-col gap-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">5 Vectors of superiority analysis</h3>
              <p className="text-sm text-slate-400 font-medium mt-1">Comparative product analysis across the 5 superiority vectors</p>
            </div>

            {selectedProductIds.length === 0 ? (
              <div className="flex items-center justify-center min-h-[350px] text-slate-300 text-sm font-bold">
                Select at least one product above to view the analysis
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[420px]">
                <ResponsiveContainer width="100%" height={420}>
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={comparativeRadarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis
                      dataKey="vector"
                      tick={{ fill: '#64748b', fontSize: 13, fontWeight: 700 }}
                    />
                    {selectedProductIds.map((id, i) => {
                      const product = allIndustryProducts.find(p => p.id === id);
                      return (
                        <Radar
                          key={id}
                          name={product?.name ?? id}
                          dataKey={id}
                          stroke={COMPARISON_COLORS[i]}
                          strokeWidth={3}
                          fill={COMPARISON_COLORS[i]}
                          fillOpacity={0.08}
                        />
                      );
                    })}
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{ fontSize: '12px', fontWeight: 700, paddingTop: '16px' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}

            {selectedProductIds.length > 0 && (
              <div className="border-t border-slate-100 pt-8">
                <div className="grid grid-cols-5 gap-6">
                  {vectorLabels.map(vector => (
                    <div key={vector} className="space-y-3">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-tight">{vector}</p>
                      {selectedProductIds.map((id, i) => {
                        const scores = getProductVectorScores(id);
                        return (
                          <div key={id} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COMPARISON_COLORS[i] }} />
                            <span className="text-xl font-extrabold tabular-nums leading-none" style={{ color: COMPARISON_COLORS[i] }}>
                              {scores[vector]}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Sidebar Controls & Volume */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="flex flex-col p-1 bg-slate-100 rounded-lg border border-slate-200">
              {[
                { id: 7, label: 'Past 7 days' },
                { id: 30, label: 'Past 30 days' },
                { id: 90, label: 'Past 3 months' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPeriod(p.id)}
                  className={cn(
                    "w-full py-2.5 text-sm font-bold transition-all rounded-md text-left px-4",
                    period === p.id
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                      : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <Card className="border border-slate-200 bg-white p-8 shadow-sm rounded-xl">
              <div className="flex justify-between items-start">
                <p className="text-5xl font-extrabold leading-none tabular-nums text-slate-900 tracking-normal">
                  {stats.total.toLocaleString()}
                </p>
                <p className="text-lg font-bold text-emerald-600 leading-none">+43.6%</p>
              </div>
              <p className="text-sm font-bold text-slate-400 italic mt-4">Total data samples</p>
            </Card>

            <Card className="border border-slate-200 bg-white p-8 shadow-sm rounded-xl">
              <div className="flex justify-between items-start">
                <p className="text-5xl font-extrabold leading-none tabular-nums text-slate-900 tracking-normal">
                  {stats.totalUsers.toLocaleString()}
                </p>
                <p className="text-lg font-bold text-emerald-600 leading-none">+36.8%</p>
              </div>
              <p className="text-sm font-bold text-slate-400 italic mt-4">Unique consumers</p>
            </Card>
          </div>
        </div>

        {/* Analysis Timeline — product tab buttons switch which product is shown */}
        <Card className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
          <CardHeader className="pt-8 px-8 pb-0">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold text-slate-900">Analysis timeline</CardTitle>
                <CardDescription className="text-base text-slate-500 font-medium">
                  {activeProduct
                    ? `Daily sentiment breakdown · ${activeProduct.name}`
                    : 'Select products above to view their timeline'}
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs font-bold py-1.5 px-3 text-slate-500 border-slate-200 mt-1">
                Validated NLP inference
              </Badge>
            </div>

            {/* Product tab buttons */}
            {selectedProductIds.length > 0 && (
              <div className="flex gap-2 mt-6 border-b border-slate-100 pb-0">
                {selectedProductIds.map((id, i) => {
                  const product = allIndustryProducts.find(p => p.id === id);
                  const isActive = activeTimelineProduct === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveTimelineProduct(id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-t-lg border-b-2 transition-all",
                        isActive
                          ? "text-slate-900 border-b-2"
                          : "text-slate-400 border-transparent hover:text-slate-600"
                      )}
                      style={isActive ? { borderBottomColor: COMPARISON_COLORS[i] } : {}}
                    >
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COMPARISON_COLORS[i] }} />
                      {product?.name.split(' ').slice(0, 3).join(' ') ?? id}
                    </button>
                  );
                })}
              </div>
            )}
          </CardHeader>

          <CardContent className="h-[450px] px-8 py-8">
            {selectedProductIds.length === 0 ? (
              <div className="flex items-center justify-center h-full text-slate-300 text-sm font-bold">
                Select products in the filter bar above to view their timeline
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={singleProductTimeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} dy={10} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} dx={-10} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 700, fontSize: '13px' }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="center"
                    height={40}
                    iconType="square"
                    iconSize={10}
                    wrapperStyle={{ fontSize: '13px', fontWeight: 700, paddingBottom: '20px' }}
                  />
                  <Bar dataKey="Positive" stackId="a" fill={COLORS.positive} />
                  <Bar dataKey="Neutral" stackId="a" fill={COLORS.neutral} />
                  <Bar dataKey="Negative" stackId="a" fill={COLORS.negative} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

      </div>

      {/* 6. Sentiment Velocity */}
      <Card className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
        <CardHeader className="pt-8 px-8 pb-0 border-b border-slate-100">
          <div className="flex items-start justify-between pb-6">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold text-slate-900">Sentiment velocity</CardTitle>
              <CardDescription className="text-base text-slate-500 font-medium">
                {velocityMode === 'brand' ? 'Brand-to-brand sentiment comparison over time' : 'Product-to-product sentiment comparison over time'}
              </CardDescription>
            </div>
            {/* Mode toggle */}
            <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 gap-0.5">
              {(['brand', 'product'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setVelocityMode(mode)}
                  className={cn(
                    "px-4 py-2 text-sm font-bold rounded-md transition-all capitalize",
                    velocityMode === mode
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                      : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Selection row */}
          <div className="pb-5">
            {velocityMode === 'brand' ? (
              <VelocityMultiSelect
                options={allBrands.map(b => ({ value: b, label: b }))}
                selected={velocityBrands}
                onToggle={brand => setVelocityBrands(prev =>
                  prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
                )}
                colors={VELOCITY_COLORS}
                placeholder="Select brands..."
              />
            ) : (
              <VelocityMultiSelect
                options={allIndustryProducts.map(p => ({ value: p.id, label: p.name, sub: `${p.brand} · ${p.category}` }))}
                selected={velocityProductIds}
                onToggle={id => setVelocityProductIds(prev =>
                  prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
                )}
                colors={VELOCITY_COLORS}
                placeholder="Select products..."
              />
            )}
          </div>
        </CardHeader>

        <CardContent className="h-[450px] px-8 py-8">
          {velocityIds.length === 0 ? (
            <div className="flex items-center justify-center h-full text-slate-300 text-sm font-bold">
              Select at least one {velocityMode} above
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={velocityTimeline}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} unit="%" domain={[0, 100]} dx={-10} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', fontSize: '13px', fontWeight: 700, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value, name) => {
                    if (velocityMode === 'product') {
                      const product = allIndustryProducts.find(p => p.id === name);
                      return [`${value}%`, product?.name ?? name];
                    }
                    return [`${value}%`, name];
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  height={40}
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{ fontSize: '12px', fontWeight: 700, paddingBottom: '20px' }}
                  formatter={(value) => {
                    if (velocityMode === 'product') {
                      const product = allIndustryProducts.find(p => p.id === value);
                      return product?.name ?? value;
                    }
                    return value;
                  }}
                />
                {velocityIds.map((id, i) => (
                  <Line
                    key={id}
                    type="monotone"
                    dataKey={id}
                    stroke={VELOCITY_COLORS[i % VELOCITY_COLORS.length]}
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 0, fill: VELOCITY_COLORS[i % VELOCITY_COLORS.length] }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
