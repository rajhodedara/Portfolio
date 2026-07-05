export interface Project {
  slug: string
  arcNumber: number
  arcTitle: string
  arcSubtitle: string
  hook: string
  stack: string[]
  accentColor: string
  problem: string
  approach: string
  result: string
  bullets: string[]
  links: {
    github?: string
    live?: string
  }
  nextSlug: string | null
  prevSlug: string | null
  coverGradient: string
}

export const projects: Project[] = [
  {
    slug: 'origin-eats',
    arcNumber: 1,
    arcTitle: 'Origin Eats',
    arcSubtitle: 'The Restaurant Wars Arc',
    hook: 'Mapping Mumbai\'s 500+ restaurant battlegrounds.',
    stack: ['React', 'Vite', 'Supabase', 'Tailwind CSS', 'GeoJSON'],
    accentColor: '#D62828',
    problem:
      'Restaurant entrepreneurs in Mumbai had no data-driven way to evaluate market opportunity: competitor density, cuisine gaps, and location demand were invisible without expensive research firms.',
    approach:
      'Built a GeoJSON-powered SaaS platform that indexes 500+ restaurant data points across Mumbai\'s 24 wards. A rule-based AI engine scores venture success probability by analyzing location demand, competitor pricing, and cuisine trends. Integrated UPI payments, coupon system, and real-time Supabase queries for a full subscription lifecycle.',
    result:
      'A live, revenue-generating SaaS product that surfaces competitor density heatmaps and market opportunity layers, letting any aspiring restaurant owner make informed, data-driven decisions before spending a rupee on rent.',
    bullets: [
      'GeoJSON-powered restaurant density heatmaps across Mumbai\'s 24 wards, indexing 500+ data points to surface competitor density and market opportunity layers.',
      'Rule-based AI recommendation engine scoring restaurant venture success probability by analysing location demand, competitor pricing, and cuisine trends.',
      'End-to-end deployment with authentication, subscription lifecycle, UPI integration, coupon system, and real-time data queries.',
    ],
    links: { github: 'https://github.com/rajhodedara/OriginEats' },
    nextSlug: 'stock-pulse',
    prevSlug: null,
    coverGradient: 'from-red-900 via-red-700 to-orange-500',
  },
  {
    slug: 'stock-pulse',
    arcNumber: 2,
    arcTitle: 'Stock Pulse',
    arcSubtitle: 'The Market Sentiment Saga',
    hook: 'A three-signal trading brain forged from AI, math, and the crowd.',
    stack: ['FastAPI', 'Streamlit', 'FinBERT', 'Plotly', 'Pandas', 'yfinance'],
    accentColor: '#FFD60A',
    problem:
      'Retail traders rely on gut feel or single-signal systems. No accessible tool fused AI sentiment, quantitative technical indicators, and crowd-sourced prediction market data into a single coherent trading signal.',
    approach:
      'Built a multi-signal trading intelligence engine fusing FinBERT sentiment analysis (30% weight), RSI/MACD/Bollinger Bands technical indicators (25%), and Polymarket crowd prediction data (45%) into BUY/SELL/HOLD verdicts with 0–1 confidence scores. 5 FastAPI REST endpoints with TTL caching serve OHLCV history, indicators, and Polymarket data. Interactive Plotly dashboards overlay SMA 7/21/50, Bollinger Bands, and volume coloring on candlestick charts.',
    result:
      'A production-grade, multi-source trading intelligence dashboard that lets any user understand not just what the signal is, but why, with confidence-scored verdicts backed by AI, math, and market crowds simultaneously.',
    bullets: [
      'Multi-signal trading intelligence fusing FinBERT sentiment (30%), technical indicators RSI/MACD/Bollinger Bands (25%), and Polymarket crowd data (45%) into BUY/SELL/HOLD verdicts with 0–1 confidence scoring.',
      '5 FastAPI REST endpoints with TTL caching for OHLCV history, indicators, and Polymarket data.',
      'Interactive Plotly dashboards with candlestick/area/line charts overlaid with SMA 7/21/50, Bollinger Bands, and volume coloring.',
    ],
    links: { github: 'https://github.com/rajhodedara/StockPulse' },
    nextSlug: 'synapse',
    prevSlug: 'origin-eats',
    coverGradient: 'from-yellow-900 via-yellow-700 to-amber-400',
  },
  {
    slug: 'synapse',
    arcNumber: 3,
    arcTitle: 'Synapse',
    arcSubtitle: 'The Productivity Awakening',
    hook: 'A universal launcher that bends Windows to your will.',
    stack: ['PyQt6', 'Win32 API', 'pywin32', 'ctypes', 'PyInstaller'],
    accentColor: '#2B2B2B',
    problem:
      'Power users on Windows lose hours every day switching between disparate tools, including file search, clipboard managers, window managers, OCR, and AI assistants, with no unified command surface.',
    approach:
      'Built a universal productivity launcher as a distributable Windows desktop app. Integrates Voidtools Everything SDK for high-performance file search with smart filtering and debouncing, a clipboard manager with history and search, OCR pipeline, and AI integrations. Advanced window management handles tiling layouts, multi-monitor hotkeys, and dynamic workspace organization via PyQt6 and Win32 APIs, compiled to a standalone .exe with PyInstaller.',
    result:
      'A production Windows application delivered as a self-contained .exe. Users get a single hotkey surface to launch files, run AI commands, manage windows, and access clipboard history, all without leaving keyboard focus.',
    bullets: [
      'Universal productivity launcher with real-time search, AI integrations, clipboard manager, OCR, and system controls.',
      'High-performance file search using Voidtools "Everything" SDK with smart filtering, categorized results, and debouncing.',
      'Advanced window management (tiling, layouts, multi-monitor, hotkeys) via PyQt6 and Windows APIs.',
    ],
    links: { github: 'https://github.com/rajhodedara/Synapse' },
    nextSlug: 'courier-dbms',
    prevSlug: 'stock-pulse',
    coverGradient: 'from-gray-900 via-slate-700 to-gray-500',
  },
  {
    slug: 'courier-dbms',
    arcNumber: 4,
    arcTitle: 'Courier DBMS',
    arcSubtitle: 'The Family Business Chronicles',
    hook: 'Turning a family courier office\'s chaos into clean SQL.',
    stack: ['Python', 'Tkinter', 'PostgreSQL', 'Supabase'],
    accentColor: '#8B7355',
    problem:
      'A family-run courier office in Mumbai managed bookings, billing, and records entirely on paper and mismatched spreadsheets. Errors were frequent, reports took hours, and the thermal printer was manually operated from memory.',
    approach:
      'Designed and built a full GUI desktop application from direct operational experience. Features advanced SQL with ILIKE fuzzy search and date-range filtering, real-time autocomplete for senders and receivers, CSV/Excel export for accountants, thermal printer integration, and automated billing. Supabase PostgreSQL backend with a clean Tkinter UI optimized for counter-staff speed.',
    result:
      'The office now processes bookings 5× faster, generates billing reports in seconds, and operates with zero paper records. Built from genuine operational insight: every feature was motivated by a real workflow pain point witnessed firsthand.',
    bullets: [
      'Full GUI app automating end-to-end courier booking, billing, and record management, built from direct operational experience.',
      'Advanced SQL filtering (ILIKE, date ranges), CSV/Excel export, thermal printer integration, real-time autocomplete for sender/receiver.',
    ],
    links: {},
    nextSlug: null,
    prevSlug: 'synapse',
    coverGradient: 'from-amber-900 via-amber-700 to-yellow-600',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
