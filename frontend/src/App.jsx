import React, { useState, useMemo } from 'react';
import { mockClients, agentProfile } from './mockData';
import ClientSummary from './components/ClientSummary';
import PersonalityCard from './components/PersonalityCard';
import RecommendedPlan from './components/RecommendedPlan';
import CoachingEngine from './components/CoachingEngine';
import PortfolioAnalytics from './components/PortfolioAnalytics';
import NotificationsPanel from './components/NotificationsPanel';
import QuoteModal from './components/QuoteModal';
import {
  Search, Bell, Briefcase, Users, PieChart,
  Settings, ChevronRight, AlertTriangle,
} from 'lucide-react';

const totalNotifs = mockClients.reduce((sum, c) => sum + c.notifications.length, 0);

function App() {
  const [activeNav, setActiveNav]           = useState('intelligence');
  const [selectedClientId, setSelectedClientId] = useState(mockClients[0].id);
  const [searchQuery, setSearchQuery]       = useState('');
  const [showNotifs, setShowNotifs]         = useState(false);
  const [showQuote, setShowQuote]           = useState(false);

  const selectedClient = mockClients.find(c => c.id === selectedClientId);

  const filteredClients = useMemo(() =>
    mockClients.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  const NAV_ITEMS = [
    { id: 'intelligence', label: 'Client Intelligence', icon: Users },
    { id: 'analytics',   label: 'Portfolio Analytics', icon: PieChart },
  ];

  const RISK_TIER_DOT = { High: 'bg-red-500', Medium: 'bg-amber-500', Low: 'bg-emerald-500' };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0E14] text-white">

      {/* ═══════════════ SIDEBAR ═══════════════ */}
      <aside className="w-72 bg-[#131720] border-r border-white/[0.08] flex flex-col flex-shrink-0">

        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)' }}>
              <Briefcase size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black font-display leading-none text-gradient">InsurAI</h1>
              <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-widest">Intelligence Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-5 space-y-1">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest font-medium px-2 mb-3">Main Menu</p>
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              id={`nav-${id}`}
              onClick={() => setActiveNav(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                activeNav === id
                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon size={17} />
              <span className="flex-1 text-left">{label}</span>
              {id === 'intelligence' && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeNav === id ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-slate-500'}`}>
                  {mockClients.length}
                </span>
              )}
              {activeNav === id && <ChevronRight size={14} />}
            </button>
          ))}
        </nav>

        {/* High urgency alerts in sidebar */}
        <div className="px-4 py-2">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest font-medium px-2 mb-2">Renewal Alerts</p>
          {mockClients.filter(c => c.urgency === 'High').map(c => (
            <div key={c.id} className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-red-500/5 border border-red-500/15 mb-1.5 cursor-pointer hover:bg-red-500/10 transition-colors" onClick={() => { setSelectedClientId(c.id); setActiveNav('intelligence'); }}>
              <div className="w-2 h-2 rounded-full bg-red-500 pulse-dot flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-red-400 truncate">{c.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{c.nextAction}</p>
              </div>
              <AlertTriangle size={11} className="text-red-400 flex-shrink-0" />
            </div>
          ))}
        </div>

        <div className="flex-1" />

        {/* Settings */}
        <div className="px-4 py-3 border-t border-white/[0.08]">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <Settings size={17} />
            Settings
          </button>
        </div>

        {/* Agent Profile */}
        <div className="px-4 pb-5">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07]">
            <img src={agentProfile.avatar} alt={agentProfile.name} className="w-9 h-9 rounded-full object-cover border border-white/10" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{agentProfile.name}</p>
              <p className="text-[11px] text-slate-500 truncate">{agentProfile.title}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top Header Bar */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-white/[0.08] bg-[#0B0E14]/80 backdrop-blur-sm flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold font-display">
              {activeNav === 'intelligence' ? 'Agent Dashboard' : 'Portfolio Analytics'}
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              {activeNav === 'intelligence'
                ? 'AI-powered client intelligence & coaching'
                : 'Real-time insights across your client book'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="client-search"
                type="text"
                placeholder="Search clients…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-[#131720] border border-white/10 text-white text-sm placeholder-slate-500 rounded-xl pl-9 pr-4 py-2.5 w-60 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-sans"
              />
            </div>

            {/* Notifications Bell */}
            <button
              id="btn-notifications"
              onClick={() => setShowNotifs(v => !v)}
              className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
            >
              <Bell size={17} className="text-slate-300" />
              {totalNotifs > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalNotifs}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Page Body */}
        <div className="flex-1 overflow-y-auto relative">
          {/* Decorative glows */}
          <div className="pointer-events-none fixed top-0 left-72 right-0 h-full overflow-hidden -z-0">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)' }} />
          </div>

          <div className="relative z-10 px-8 py-6">
            {/* ─── CLIENT INTELLIGENCE VIEW ─── */}
            {activeNav === 'intelligence' && (
              <>
                {/* Client Selector Tabs */}
                <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
                  {filteredClients.length === 0 ? (
                    <p className="text-slate-500 text-sm py-2">No clients match "{searchQuery}"</p>
                  ) : (
                    filteredClients.map(client => (
                      <button
                        key={client.id}
                        id={`client-tab-${client.id}`}
                        onClick={() => setSelectedClientId(client.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all flex-shrink-0 min-w-[200px] ${
                          selectedClientId === client.id
                            ? 'bg-white/[0.07] border-blue-500/40 shadow-lg shadow-blue-500/10'
                            : 'bg-white/[0.02] border-white/[0.07] hover:border-white/15 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="relative">
                          <img src={client.avatar} alt={client.name} className="w-10 h-10 rounded-full object-cover" />
                          <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0B0E14] ${RISK_TIER_DOT[client.riskTier]}`} />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-sm text-white">{client.name}</p>
                          <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${RISK_TIER_DOT[client.riskTier]}`} />
                            {client.riskTier} Risk · {client.urgency} Priority
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </div>

                {/* 4-Layer Dashboard Grid */}
                {selectedClient && (
                  <div
                    key={selectedClientId}
                    className="grid grid-cols-12 gap-5 animate-fade-up"
                  >
                    {/* Layer 1 & 2: Client Profile + Personality */}
                    <div className="col-span-12 lg:col-span-7">
                      <ClientSummary client={selectedClient} />
                    </div>
                    <div className="col-span-12 lg:col-span-5">
                      <PersonalityCard personality={selectedClient.personality} />
                    </div>

                    {/* Layer 3 & 4: Recommended Plan + Coaching */}
                    <div className="col-span-12 lg:col-span-6">
                      <RecommendedPlan
                        recommendation={selectedClient.recommendation}
                        onQuote={() => setShowQuote(true)}
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <CoachingEngine coaching={selectedClient.coaching} clientName={selectedClient.name} />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ─── PORTFOLIO ANALYTICS VIEW ─── */}
            {activeNav === 'analytics' && <PortfolioAnalytics />}
          </div>
        </div>
      </main>

      {/* ═══════════════ OVERLAYS ═══════════════ */}
      {showNotifs && <NotificationsPanel onClose={() => setShowNotifs(false)} />}
      {showQuote  && <QuoteModal client={selectedClient} onClose={() => setShowQuote(false)} />}
    </div>
  );
}

export default App;
