import React, { useState } from 'react';
import { Brain, Check, X, Copy, CheckCheck } from 'lucide-react';

const DISC_STYLES = {
  D: { label: 'Dominance',       gradient: 'from-red-600 to-rose-500',    badge: 'bg-red-500/15 text-red-400 border-red-500/25',    accent: 'text-red-400',    ring: 'ring-red-500/30', bar: 'bg-red-500' },
  I: { label: 'Influence',       gradient: 'from-amber-500 to-yellow-400', badge: 'bg-amber-500/15 text-amber-400 border-amber-500/25',accent: 'text-amber-400',  ring: 'ring-amber-500/30',bar: 'bg-amber-400' },
  S: { label: 'Steadiness',      gradient: 'from-emerald-600 to-green-400',badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',accent: 'text-emerald-400',ring: 'ring-emerald-500/30',bar: 'bg-emerald-500' },
  C: { label: 'Conscientiousness',gradient: 'from-blue-600 to-sky-400',   badge: 'bg-blue-500/15 text-blue-400 border-blue-500/25',   accent: 'text-blue-400',   ring: 'ring-blue-500/30',  bar: 'bg-blue-500' },
};

const PersonalityCard = ({ personality }) => {
  const [copied, setCopied] = useState(false);
  if (!personality) return null;

  const style = DISC_STYLES[personality.disc] || DISC_STYLES.C;

  const handleCopy = () => {
    navigator.clipboard.writeText(personality.sampleOpener);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel p-6 animate-fade-up stagger-2 h-full flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl bg-gradient-to-br ${style.gradient} shadow-lg`}>
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold font-display leading-none">Behavioral Profile</h3>
          <p className="text-xs text-slate-400 mt-0.5">DISC Personality Engine</p>
        </div>
      </div>

      {/* DISC Type Badge */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">DISC Classification</p>
          <p className={`text-xl font-bold font-display ${style.accent}`}>{personality.type}</p>
          <p className="text-sm text-slate-400 mt-1">{personality.description}</p>
        </div>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-black font-display ring-2 ${style.ring} bg-gradient-to-br ${style.gradient}`}>
          {personality.disc}
        </div>
      </div>

      {/* Confidence Score Bar */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <p className="text-xs text-slate-400">Profile Confidence</p>
          <p className={`text-xs font-bold ${style.accent}`}>{personality.confidenceScore}%</p>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${style.bar}`} style={{ width: `${personality.confidenceScore}%`, transition: 'width 1.2s ease-out' }} />
        </div>
      </div>

      {/* Key Traits */}
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-2 font-medium">Key Traits</p>
        <div className="flex flex-wrap gap-1.5">
          {personality.traits.map((trait, i) => (
            <span key={i} className={`text-xs px-2.5 py-1 rounded-full border font-medium ${style.badge}`}>
              {trait}
            </span>
          ))}
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-3">
          <p className="text-xs font-semibold text-emerald-400 mb-2 flex items-center gap-1"><Check size={12} /> Do's</p>
          <ul className="space-y-1.5">
            {personality.dos.map((d, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                <Check size={10} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-3">
          <p className="text-xs font-semibold text-red-400 mb-2 flex items-center gap-1"><X size={12} /> Don'ts</p>
          <ul className="space-y-1.5">
            {personality.donts.map((d, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                <X size={10} className="text-red-400 mt-0.5 flex-shrink-0" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sample Opener */}
      <div className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-4 flex-1">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-blue-400">💬 Sample Opening Line</p>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
          >
            {copied ? <><CheckCheck size={12} className="text-emerald-400" /> <span className="text-emerald-400">Copied!</span></> : <><Copy size={12} /> Copy</>}
          </button>
        </div>
        <p className="text-sm text-slate-300 italic leading-relaxed">"{personality.sampleOpener}"</p>
      </div>

      {/* Approach Strategy */}
      <div className={`border rounded-xl p-3 ${style.badge} bg-opacity-5`} style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <p className={`text-xs font-semibold mb-1.5 ${style.accent}`}>🎯 Approach Strategy</p>
        <p className="text-xs text-slate-300 leading-relaxed">{personality.approach}</p>
      </div>
    </div>
  );
};

export default PersonalityCard;
