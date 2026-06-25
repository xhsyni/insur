import React from 'react';
import { Users, ShieldCheck, AlertTriangle, TrendingUp, BarChart2, PieChart } from 'lucide-react';
import { mockClients } from '../mockData';

const DISC_COLORS = { D: '#EF4444', I: '#F59E0B', S: '#10B981', C: '#3B82F6' };
const DISC_LABELS = { D: 'Dominance', I: 'Influence', S: 'Steadiness', C: 'Conscientiousness' };

const KPI = ({ icon: Icon, label, value, sub, color }) => (
  <div className="glass-panel p-5 flex items-start gap-4">
    <div className="p-2.5 rounded-xl flex-shrink-0" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
      <Icon size={20} style={{ color }} />
    </div>
    <div>
      <p className="text-xs text-slate-400 uppercase tracking-widest font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold font-display text-white">{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
    </div>
  </div>
);

const PortfolioAnalytics = () => {
  const total     = mockClients.length;
  const active    = mockClients.filter(c => c.policyStatus === 'Active' || c.policyStatus === 'Policy Holder').length;
  const renewals  = mockClients.filter(c => c.urgency === 'High').length;
  const highRisk  = mockClients.filter(c => c.riskTier === 'High').length;

  // DISC distribution
  const discCounts = {};
  mockClients.forEach(c => { discCounts[c.personality.disc] = (discCounts[c.personality.disc] || 0) + 1; });
  const discEntries = Object.entries(discCounts);

  // Risk distribution
  const riskCounts = { Low: 0, Medium: 0, High: 0 };
  mockClients.forEach(c => riskCounts[c.riskTier]++);

  // Monthly touchpoints mock data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const touchpoints = [8, 12, 9, 15, 11, 14];
  const maxTP = Math.max(...touchpoints);

  // Donut for DISC — simple SVG pie
  const buildPie = () => {
    let angle = 0;
    const cx = 60, cy = 60, r = 50, innerR = 28;
    const paths = discEntries.map(([disc, count]) => {
      const slice = (count / total) * 2 * Math.PI;
      const x1 = cx + r * Math.sin(angle);
      const y1 = cy - r * Math.cos(angle);
      angle += slice;
      const x2 = cx + r * Math.sin(angle);
      const y2 = cy - r * Math.cos(angle);
      const large = slice > Math.PI ? 1 : 0;
      const ix1 = cx + innerR * Math.sin(angle - slice);
      const iy1 = cy - innerR * Math.cos(angle - slice);
      const ix2 = cx + innerR * Math.sin(angle);
      const iy2 = cy - innerR * Math.cos(angle);
      return (
        <path
          key={disc}
          d={`M ${ix1} ${iy1} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${large} 0 ${ix1} ${iy1} Z`}
          fill={DISC_COLORS[disc]}
          opacity="0.85"
        />
      );
    });
    return paths;
  };

  return (
    <div className="animate-fade-up">
      <h2 className="text-2xl font-bold font-display mb-1">Portfolio Analytics</h2>
      <p className="text-slate-400 text-sm mb-6">Real-time intelligence across your client book</p>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPI icon={Users}         label="Total Clients"     value={total}    sub="Under management"       color="#3B82F6" />
        <KPI icon={ShieldCheck}   label="Active Policies"   value={active}   sub="Policy holders"         color="#10B981" />
        <KPI icon={AlertTriangle} label="Renewal Alerts"    value={renewals} sub="Require immediate action" color="#F59E0B" />
        <KPI icon={TrendingUp}    label="High Risk Clients" value={highRisk} sub="Need plan restructure"   color="#EF4444" />
      </div>

      <div className="grid grid-cols-12 gap-4">

        {/* DISC Donut */}
        <div className="col-span-4 glass-panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <PieChart size={16} className="text-slate-400" />
            <h3 className="font-semibold font-display">DISC Distribution</h3>
          </div>
          <div className="flex items-center justify-between gap-4">
            <svg viewBox="0 0 120 120" width="120" height="120">
              {buildPie()}
              <text x="60" y="65" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{total}</text>
              <text x="60" y="76" textAnchor="middle" fill="#94A3B8" fontSize="7">clients</text>
            </svg>
            <div className="flex flex-col gap-2 flex-1">
              {discEntries.map(([disc, count]) => (
                <div key={disc} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: DISC_COLORS[disc] }} />
                  <span className="text-xs text-slate-300">{DISC_LABELS[disc]}</span>
                  <span className="ml-auto text-xs font-bold text-white">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="col-span-4 glass-panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 size={16} className="text-slate-400" />
            <h3 className="font-semibold font-display">Risk Tier Distribution</h3>
          </div>
          <div className="space-y-4 mt-2">
            {Object.entries(riskCounts).map(([tier, cnt]) => {
              const pct = (cnt / total) * 100;
              const colors = { High: '#EF4444', Medium: '#F59E0B', Low: '#10B981' };
              return (
                <div key={tier}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400">{tier} Risk</span>
                    <span className="font-bold" style={{ color: colors[tier] }}>{cnt} client{cnt !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: colors[tier], transition: 'width 1s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Touchpoints */}
        <div className="col-span-4 glass-panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-slate-400" />
            <h3 className="font-semibold font-display">Monthly Touchpoints</h3>
          </div>
          <div className="flex items-end justify-between gap-2 h-28">
            {months.map((m, i) => (
              <div key={m} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className="w-full rounded-t-md"
                  style={{
                    height: `${(touchpoints[i] / maxTP) * 100}%`,
                    background: i === months.length - 1 ? 'linear-gradient(to top, #3B82F6, #8B5CF6)' : 'rgba(255,255,255,0.1)',
                    transition: 'height 1s ease',
                  }}
                />
                <span className="text-xs text-slate-500">{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Detail Table */}
        <div className="col-span-12 glass-panel p-5">
          <h3 className="font-semibold font-display mb-4">Client Book Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {['Client', 'Age', 'Risk Tier', 'DISC', 'Relationship Stage', 'Policy Status', 'Urgency'].map(h => (
                    <th key={h} className="text-left text-xs text-slate-400 uppercase tracking-widest font-medium py-2 px-3 first:pl-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockClients.map(c => {
                  const tierColor = { High: 'text-red-400', Medium: 'text-amber-400', Low: 'text-emerald-400' }[c.riskTier];
                  const urgColor  = { High: 'text-red-400', Medium: 'text-amber-400', Low: 'text-emerald-400' }[c.urgency];
                  return (
                    <tr key={c.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 pl-0 pr-3">
                        <div className="flex items-center gap-2.5">
                          <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                          <span className="font-medium">{c.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-300">{c.age}</td>
                      <td className="py-3 px-3"><span className={`font-semibold ${tierColor}`}>{c.riskTier}</span></td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-xs px-2 py-0.5 rounded-full" style={{ background: `${DISC_COLORS[c.personality.disc]}20`, color: DISC_COLORS[c.personality.disc], border: `1px solid ${DISC_COLORS[c.personality.disc]}35` }}>
                          {c.personality.disc}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-300">{c.relationshipStage}</td>
                      <td className="py-3 px-3 text-slate-300">{c.policyStatus}</td>
                      <td className="py-3 px-3"><span className={`font-semibold ${urgColor}`}>{c.urgency}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnalytics;
