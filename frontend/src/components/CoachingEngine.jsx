import React, { useState } from 'react';
import { MessageSquare, Send, Clock, AlertTriangle, Mail, Phone, Coffee, Copy, CheckCheck, RefreshCw, CalendarCheck, ChevronDown, ChevronUp } from 'lucide-react';

const CHANNEL_ICONS = {
  mail:            <Mail size={15} />,
  'message-square':<MessageSquare size={15} />,
  phone:           <Phone size={15} />,
  coffee:          <Coffee size={15} />,
};

const CoachingEngine = ({ coaching, clientName }) => {
  const [script, setScript]     = useState(coaching?.script || '');
  const [copied, setCopied]     = useState(false);
  const [toast, setToast]       = useState('');
  const [openIdx, setOpenIdx]   = useState(null);

  if (!coaching) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegen = () => {
    setScript(coaching.script); // In a real app this would call an LLM
    showToast('Script regenerated!');
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleSend = (channel) => showToast(`✅ Message queued via ${channel}!`);

  const channelColor = {
    'WhatsApp':        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Email':           'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Phone Call':      'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Coffee Meeting':  'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };

  const touchDate = new Date(coaching.nextTouchpoint.date).toLocaleDateString('en-MY', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="glass-panel p-6 animate-fade-up stagger-4 h-full flex flex-col gap-5">

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xl animate-slide-right">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <MessageSquare className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold font-display leading-none">AI Coaching Engine</h3>
          <p className="text-xs text-slate-400 mt-0.5">Personality-adapted follow-up strategy</p>
        </div>
      </div>

      {/* Channel + Timing */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-black/20 rounded-xl p-3 border border-white/5">
          <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-1.5">
            <Send size={11} /> Recommended Channel
          </p>
          <div className={`inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-lg border ${channelColor[coaching.channel] || 'bg-white/5 text-slate-300 border-white/10'}`}>
            {CHANNEL_ICONS[coaching.channelIcon]}
            {coaching.channel}
          </div>
        </div>
        <div className="bg-black/20 rounded-xl p-3 border border-white/5">
          <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-1.5">
            <Clock size={11} /> Optimal Timing
          </p>
          <p className="text-sm font-semibold text-slate-200">{coaching.timing}</p>
        </div>
      </div>

      {/* Editable Script */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">AI-Generated Script</p>
          <button onClick={handleRegen} className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors">
            <RefreshCw size={11} /> Regenerate
          </button>
        </div>
        <textarea
          className="coaching-textarea"
          value={script}
          onChange={e => setScript(e.target.value)}
        />
        <div className="flex items-center gap-2 mt-2 justify-end">
          <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.03] transition-all">
            {copied ? <><CheckCheck size={12} className="text-emerald-400" /><span className="text-emerald-400">Copied!</span></> : <><Copy size={12} /> Copy Script</>}
          </button>
          <button onClick={() => handleSend(coaching.channel)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg text-white font-semibold transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)' }}>
            <Send size={12} /> Send via {coaching.channel}
          </button>
        </div>
      </div>

      {/* Next Touchpoint */}
      <div className="flex items-center gap-3 bg-purple-500/5 border border-purple-500/20 rounded-xl p-3">
        <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
          <CalendarCheck size={16} />
        </div>
        <div>
          <p className="text-xs text-slate-400">Next Touchpoint</p>
          <p className="text-sm font-semibold text-slate-200">{coaching.nextTouchpoint.label}</p>
          <p className="text-xs text-purple-400 font-medium mt-0.5">{touchDate}</p>
        </div>
      </div>

      {/* Objection Handling */}
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-2 font-medium flex items-center gap-1.5">
          <AlertTriangle size={11} /> Expected Objections
        </p>
        <div className="flex flex-col gap-2">
          {coaching.objectionHandling.map((obj, idx) => (
            <div key={idx} className="border border-white/5 rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/[0.03] transition-colors"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span className="text-sm font-medium text-slate-200">"{obj.objection}"</span>
                {openIdx === idx ? <ChevronUp size={14} className="text-slate-500 flex-shrink-0" /> : <ChevronDown size={14} className="text-slate-500 flex-shrink-0" />}
              </button>
              {openIdx === idx && (
                <div className="px-4 pb-3 border-t border-white/5 pt-2">
                  <p className="text-xs text-slate-400 mb-1 font-medium">Suggested Response:</p>
                  <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-amber-500 pl-3">{obj.response}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoachingEngine;
