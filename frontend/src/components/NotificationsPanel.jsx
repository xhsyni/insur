import React from 'react';
import { X, Bell, AlertTriangle } from 'lucide-react';
import { mockClients } from '../mockData';

const URGENCY_STYLES = {
  High:   { dot: 'bg-red-500',    text: 'text-red-400',    border: 'border-red-500/20',    bg: 'bg-red-500/5' },
  Medium: { dot: 'bg-amber-500',  text: 'text-amber-400',  border: 'border-amber-500/20',  bg: 'bg-amber-500/5' },
  Low:    { dot: 'bg-emerald-500',text: 'text-emerald-400',border: 'border-emerald-500/20',bg: 'bg-emerald-500/5' },
};

const NotificationsPanel = ({ onClose }) => {
  const allNotifs = mockClients.flatMap(c =>
    c.notifications.map(n => ({ ...n, clientName: c.name, avatar: c.avatar }))
  ).sort((a, b) => (a.urgency === 'High' ? -1 : b.urgency === 'High' ? 1 : 0));

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-96 z-50 bg-[#131720] border-l border-white/10 flex flex-col animate-slide-right shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Bell size={18} className="text-blue-400" />
            <h3 className="font-bold font-display">Notifications</h3>
            <span className="bg-blue-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {allNotifs.length}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {allNotifs.map(n => {
            const style = URGENCY_STYLES[n.urgency] || URGENCY_STYLES.Low;
            return (
              <div key={n.id} className={`rounded-xl p-3 border ${style.border} ${style.bg}`}>
                <div className="flex items-start gap-3">
                  <img src={n.avatar} alt={n.clientName} className="w-8 h-8 rounded-full object-cover mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${style.dot}`} />
                      <span className={`text-xs font-bold uppercase tracking-wide ${style.text}`}>{n.urgency}</span>
                    </div>
                    <p className="text-sm text-slate-200 leading-snug">{n.message}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-xs text-slate-500">{n.clientName}</span>
                      <span className="text-xs text-slate-600">{n.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10">
          <button className="w-full text-sm text-slate-400 hover:text-white transition-colors py-2 rounded-lg hover:bg-white/5">
            Mark all as read
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationsPanel;
