import React, { useState } from 'react';
import { Shield, TrendingUp, Info, AlertTriangle, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

const formatRM = (n) => n === 0 ? 'RM 0' : `RM ${(n / 1000).toFixed(0)}K`;

const CoverageBar = ({ current, recommended }) => {
  const max = recommended * 1.1;
  const currentPct = Math.min((current / max) * 100, 100);
  const recPct = Math.min((recommended / max) * 100, 100);
  return (
    <div className="space-y-2 mt-3">
      <div>
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Current Coverage</span>
          <span className="font-semibold text-red-400">{formatRM(current)}</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-red-500/60 rounded-full" style={{ width: `${currentPct}%`, transition: 'width 1s ease' }} />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Recommended Coverage</span>
          <span className="font-semibold text-emerald-400">{formatRM(recommended)}</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${recPct}%`, transition: 'width 1.2s ease' }} />
        </div>
      </div>
    </div>
  );
};

const RecommendedPlan = ({ recommendation, onQuote }) => {
  const [showXAI, setShowXAI] = useState(false);
  if (!recommendation) return null;

  return (
    <div className="glass-panel p-6 animate-fade-up stagger-3 h-full flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <Shield className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold font-display leading-none">Recommended Plan</h3>
          <p className="text-xs text-slate-400 mt-0.5">AI Policy Recommendation Engine</p>
        </div>
      </div>

      {/* Plan Name Card */}
      <div className="bg-black/30 rounded-xl p-4 border border-white/5">
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-1.5">Best-Fit Policy Package</p>
        <h4 className="text-lg font-bold font-display text-white mb-3">{recommendation.planName}</h4>
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div>
            <p className="text-xs text-slate-400">Estimated Premium</p>
            <p className="text-xl font-bold text-white mt-0.5">{recommendation.premiumRange}</p>
          </div>
          <button
            onClick={onQuote}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-gradient text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all"
            style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)' }}
          >
            <Sparkles size={14} />
            Generate Quote
          </button>
        </div>
      </div>

      {/* Coverage Gap Warning */}
      {recommendation.coverageGap && (
        <div className="flex items-start gap-3 bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
          <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-400 mb-0.5">Coverage Gap Detected</p>
            <p className="text-xs text-slate-300">{recommendation.coverageGap}</p>
          </div>
        </div>
      )}

      {/* Coverage Comparison Visual */}
      <div className="bg-black/20 rounded-xl p-4 border border-white/5">
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-1 font-medium flex items-center gap-1.5">
          <TrendingUp size={12} /> Coverage Comparison
        </p>
        <CoverageBar current={recommendation.currentCoverage} recommended={recommendation.recommendedCoverage} />
        <p className="text-xs font-semibold text-emerald-400 mt-3 pl-1">{recommendation.comparison}</p>
      </div>

      {/* Riders */}
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-2 font-medium">Recommended Riders</p>
        <div className="flex flex-col gap-1.5">
          {recommendation.riders.map((rider, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-slate-300 py-1.5 px-3 rounded-lg bg-white/[0.03] border border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
              {rider}
            </div>
          ))}
        </div>
      </div>

      {/* XAI Rationale */}
      <div>
        <button
          onClick={() => setShowXAI(v => !v)}
          className="flex items-center justify-between w-full text-left group"
        >
          <p className="text-xs text-slate-400 uppercase tracking-widest font-medium flex items-center gap-1.5 group-hover:text-slate-300 transition-colors">
            <Info size={12} /> Why this plan? (Explainable AI)
          </p>
          {showXAI ? <ChevronUp size={14} className="text-slate-500" /> : <ChevronDown size={14} className="text-slate-500" />}
        </button>
        {showXAI && (
          <div className="mt-2">
            <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-blue-500 pl-3 mb-3">{recommendation.rationale}</p>
            <div className="flex flex-wrap gap-1.5">
              {recommendation.xaiFactors.map((f, i) => (
                <span key={i} className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-medium">
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedPlan;
