import React from 'react';
import { X, FileText, Download, Shield } from 'lucide-react';

const formatRM = (n) => n === 0 ? 'RM 0' : `RM ${(n / 1000).toFixed(0)}K`;

const QuoteModal = ({ client, onClose }) => {
  if (!client) return null;
  const { recommendation } = client;

  const lineItems = [
    { label: 'Base Premium', value: 'RM 220 / month' },
    { label: 'Critical Illness Rider', value: 'RM 65 / month' },
    { label: 'Waiver of Premium', value: 'RM 18 / month' },
    { label: 'Personal Accident Add-on', value: 'RM 30 / month' },
    { label: 'Administration Fee', value: 'RM 12 / month' },
  ];
  const total = recommendation.premiumRange;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
        {/* Modal */}
        <div
          className="w-full max-w-lg bg-[#131720] border border-white/10 rounded-2xl shadow-2xl animate-modal overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-accent-gradient" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d1b69 100%)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <Shield size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold font-display text-white">Policy Quote</h3>
                <p className="text-xs text-blue-200">{client.name} · {recommendation.planName}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            {/* Coverage Summary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/20 rounded-xl p-4 border border-white/5 text-center">
                <p className="text-xs text-slate-400 mb-1">Sum Assured</p>
                <p className="text-2xl font-bold font-display text-emerald-400">{formatRM(recommendation.recommendedCoverage)}</p>
              </div>
              <div className="bg-black/20 rounded-xl p-4 border border-white/5 text-center">
                <p className="text-xs text-slate-400 mb-1">Total Premium</p>
                <p className="text-2xl font-bold font-display text-blue-400">{total}</p>
              </div>
            </div>

            {/* Line Items */}
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-3 font-medium flex items-center gap-1.5">
                <FileText size={11} /> Premium Breakdown
              </p>
              <div className="space-y-2">
                {lineItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-sm text-slate-300">{item.label}</span>
                    <span className="text-sm font-semibold text-white">{item.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-blue-500/10 border border-blue-500/20 mt-2">
                  <span className="text-sm font-bold text-blue-300">Total Monthly Premium</span>
                  <span className="text-sm font-bold text-blue-400">{total}</span>
                </div>
              </div>
            </div>

            {/* Riders */}
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-2 font-medium">Included Riders</p>
              <div className="flex flex-wrap gap-1.5">
                {recommendation.riders.map((r, i) => (
                  <span key={i} className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-medium">
                    ✓ {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3">
            <button onClick={onClose} className="flex-1 text-sm text-slate-400 hover:text-white py-2.5 rounded-xl border border-white/10 hover:border-white/20 transition-all">
              Close
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-white py-2.5 rounded-xl hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)' }}>
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteModal;
