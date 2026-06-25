import React, { useState } from 'react';
import { AlertTriangle, Briefcase, Heart, Home, GraduationCap, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

const lifeEventIcon = (icon) => {
  const cls = 'w-4 h-4';
  switch (icon) {
    case 'ring':        return <Heart className={cls} />;
    case 'briefcase':   return <Briefcase className={cls} />;
    case 'home':        return <Home className={cls} />;
    case 'heart':       return <Heart className={cls} />;
    case 'graduation':  return <GraduationCap className={cls} />;
    default:            return <Calendar className={cls} />;
  }
};

const RiskRing = ({ score, tier }) => {
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const dash = (score / 100) * circumference;
  const color = tier === 'High' ? '#EF4444' : tier === 'Medium' ? '#F59E0B' : '#10B981';

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" width="96" height="96">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease-out', filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
      </svg>
      <div className="text-center z-10">
        <div className="text-2xl font-bold font-display leading-none" style={{ color }}>{score}</div>
        <div className="text-xs text-slate-400 mt-0.5">/ 100</div>
      </div>
    </div>
  );
};

const URGENCY_CONFIG = {
  High:   { text: 'text-red-400',    bg: 'bg-red-500/10',   border: 'border-red-500/20',   dot: 'bg-red-500' },
  Medium: { text: 'text-amber-400',  bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-500' },
  Low:    { text: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/20',dot: 'bg-emerald-500' },
};

const STAGE_CONFIG = {
  'New Prospect':     'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Policy Holder':    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Renewal':          'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Upsell Candidate': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

const ClientSummary = ({ client }) => {
  const [showMedSummary, setShowMedSummary] = useState(false);
  if (!client) return null;

  const { text: urgText, bg: urgBg, border: urgBorder, dot: urgDot } = URGENCY_CONFIG[client.urgency] || URGENCY_CONFIG.Low;
  const tierColor = { High: 'text-red-400', Medium: 'text-amber-400', Low: 'text-emerald-400' }[client.riskTier];
  const tierBg   = { High: 'bg-red-500/10 border-red-500/20', Medium: 'bg-amber-500/10 border-amber-500/20', Low: 'bg-emerald-500/10 border-emerald-500/20' }[client.riskTier];

  return (
    <div className="glass-panel p-6 animate-fade-up stagger-1 h-full">

      {/* Header Row */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={client.avatar} alt={client.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white/10"
            />
            <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#131720] ${client.policyStatus === 'Active' || client.policyStatus === 'Policy Holder' ? 'bg-emerald-500' : client.policyStatus === 'Renewal Due' ? 'bg-amber-500 pulse-dot' : 'bg-blue-500'}`} />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display">{client.name}</h2>
            <p className="text-slate-400 text-sm mt-0.5 flex items-center gap-2">
              <span>{client.age} yrs</span>
              <span className="text-slate-600">•</span>
              <span className="text-blue-400">{client.policyStatus}</span>
            </p>
            <span className={`mt-1.5 inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full border ${STAGE_CONFIG[client.relationshipStage] || 'bg-white/5 text-slate-400 border-white/10'}`}>
              {client.relationshipStage}
            </span>
          </div>
        </div>
        <span className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wide ${tierBg} ${tierColor}`}>
          {client.riskTier} Risk
        </span>
      </div>

      {/* Medical Risk + Next Action */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        {/* Medical Risk */}
        <div className="bg-black/20 rounded-xl p-4 border border-white/5">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-3 font-medium">Medical Risk Score</p>
          <div className="flex items-center gap-4">
            <RiskRing score={client.medicalRisk.score} tier={client.riskTier} />
            <div className="flex flex-col gap-1.5 flex-1">
              {client.medicalRisk.factors.map((f, i) => (
                <span key={i} className={`text-xs px-2 py-0.5 rounded-full border font-medium ${tierBg} ${tierColor}`}>{f}</span>
              ))}
            </div>
          </div>
          {/* Expandable summary */}
          <button
            onClick={() => setShowMedSummary(v => !v)}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 mt-3 transition-colors"
          >
            {showMedSummary ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {showMedSummary ? 'Hide' : 'Show'} medical summary
          </button>
          {showMedSummary && (
            <p className="text-xs text-slate-400 mt-2 leading-relaxed border-t border-white/5 pt-2">
              {client.medicalRisk.summary}
            </p>
          )}
        </div>

        {/* Next Action */}
        <div className="bg-black/20 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-2 font-medium">Next Action</p>
          <div className="font-semibold text-white leading-snug mb-3">{client.nextAction}</div>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold w-fit ${urgBg} ${urgBorder} ${urgText}`}>
            <span className={`w-2 h-2 rounded-full ${urgDot} ${client.urgency === 'High' ? 'pulse-dot' : ''}`} />
            {client.urgency} Priority
          </div>
        </div>
      </div>

      {/* Life Events */}
      <div>
        <h3 className="text-xs text-slate-400 uppercase tracking-widest mb-3 font-medium">Recent Life Events</h3>
        <div className="flex flex-col gap-2">
          {client.lifeEvents.map((event, idx) => (
            <div key={idx} className="flex items-center gap-3 py-2.5 px-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                {lifeEventIcon(event.icon)}
              </div>
              <span className="text-sm text-slate-200 flex-1">{event.label}</span>
              <span className="text-xs text-slate-500">{event.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientSummary;
