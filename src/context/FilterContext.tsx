'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * @fileOverview Global state for the intelligence dashboard filters.
 * Synchronizes the FilterSidebar with analytical pages.
 */

interface FilterContextType {
  measure: string;
  setMeasure: (v: string) => void;
  division: string;
  setDivision: (v: string) => void;
  incentivized: string;
  setIncentivized: (v: string) => void;
  timeline: string;
  setTimeline: (v: string) => void;
  viewMode: string;
  setViewMode: (v: string) => void;
  sector: string;
  setSector: (v: string) => void;
  period: number;
  setPeriod: (v: number) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [measure, setMeasure] = useState('5-star');
  const [division, setDivision] = useState('focus');
  const [incentivized, setIncentivized] = useState('no');
  const [timeline, setTimeline] = useState('qtr');
  const [viewMode, setViewMode] = useState('brand');
  const [sector, setSector] = useState('oral-care');
  const [period, setPeriod] = useState(90);

  return (
    <FilterContext.Provider value={{
      measure, setMeasure,
      division, setDivision,
      incentivized, setIncentivized,
      timeline, setTimeline,
      viewMode, setViewMode,
      sector, setSector,
      period, setPeriod
    }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilters must be used within FilterProvider');
  return context;
}
