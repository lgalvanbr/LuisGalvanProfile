import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { lazyWithRetry } from './utils/lazyWithRetry';

// Dynamic route-level code-splitting with stale-chunk auto-recovery
const Portfolio = lazyWithRetry(() => import('./pages/Portfolio'));
const LGI = lazyWithRetry(() => import('./pages/LGI'));
const LgiAI = lazyWithRetry(() => import('./pages/LgiAI'));
const LgiSolar = lazyWithRetry(() => import('./pages/LgiSolar'));

function RouteFallback() {
  return (
    <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center gap-3 text-white">
      <div className="w-10 h-10 rounded-full border-2 border-slate-800 border-t-white animate-spin" />
      <span className="text-xs font-mono text-slate-400 tracking-widest uppercase animate-pulse">LGI Core</span>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/lgi" element={<LGI />} />
            <Route path="/ia" element={<LgiAI />} />
            <Route path="/ai" element={<LgiAI />} />
            <Route path="/solar" element={<LgiSolar />} />
          </Routes>
        </Suspense>
      </Router>
    </LanguageProvider>
  );
}
