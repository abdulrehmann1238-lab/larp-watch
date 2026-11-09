import React from 'react';
import { 
  Users, 
  Sparkles, 
  Activity, 
  CreditCard, 
  CheckCircle2, 
  TrendingUp, 
  Watch, 
  ArrowUpRight,
  ShieldCheck,
  Server
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ADMIN_STATS_DATA } from '../../data/admin';

export const AdminDashboardPage: React.FC = () => {
  const stats = ADMIN_STATS_DATA;
  const GOLD_COLORS = ['#A58A5B', '#C8B084', '#876D40', '#D8CCB8', '#71816D', '#55534D'];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ivory/10">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-gold block mb-1">
            EXECUTIVE TELEMETRY & HOROLOGY REGISTRY
          </span>
          <h1 className="text-3xl font-editorial-heading font-medium text-ivory">
            Platform Intelligence.
          </h1>
          <p className="text-xs text-stone-dark mt-0.5">
            Real-time synthesis load, user cohort velocity, and brand distribution across European & Asian clusters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-sage/10 text-sage text-xs font-mono border border-sage/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sage animate-ping" />
            99.4% Synthesis Health
          </span>
        </div>
      </div>

      {/* Top 5 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl bg-espresso border border-gold/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-dark mb-2">
            <span className="text-[9px] uppercase font-mono tracking-widest">Total Users</span>
            <Users className="w-3.5 h-3.5 text-gold" />
          </div>
          <div>
            <span className="text-2xl font-editorial-heading font-medium text-ivory">
              {stats.totalUsers.toLocaleString()}
            </span>
            <span className="text-[10px] text-sage block font-mono mt-0.5">+14% MoM</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-espresso border border-gold/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-dark mb-2">
            <span className="text-[9px] uppercase font-mono tracking-widest">Transformations</span>
            <Sparkles className="w-3.5 h-3.5 text-gold" />
          </div>
          <div>
            <span className="text-2xl font-editorial-heading font-medium text-ivory">
              {stats.totalTransformations.toLocaleString()}
            </span>
            <span className="text-[10px] text-gold block font-mono mt-0.5">5,430 today</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-espresso border border-gold/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-dark mb-2">
            <span className="text-[9px] uppercase font-mono tracking-widest">Active Subscriptions</span>
            <CreditCard className="w-3.5 h-3.5 text-gold" />
          </div>
          <div>
            <span className="text-2xl font-editorial-heading font-medium text-ivory">
              {stats.activeSubscriptions.toLocaleString()}
            </span>
            <span className="text-[10px] text-sage block font-mono mt-0.5">82% Annual retain</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-espresso border border-gold/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-dark mb-2">
            <span className="text-[9px] uppercase font-mono tracking-widest">Estimated MRR</span>
            <TrendingUp className="w-3.5 h-3.5 text-gold" />
          </div>
          <div>
            <span className="text-2xl font-editorial-heading font-medium text-ivory">
              {stats.estimatedRevenue}
            </span>
            <span className="text-[10px] text-gold block font-mono mt-0.5">ARPU $38.80</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-espresso border border-gold/20 flex flex-col justify-between col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-stone-dark mb-2">
            <span className="text-[9px] uppercase font-mono tracking-widest">Avg Latency</span>
            <Activity className="w-3.5 h-3.5 text-gold" />
          </div>
          <div>
            <span className="text-2xl font-editorial-heading font-medium text-ivory">
              4.9s
            </span>
            <span className="text-[10px] text-sage block font-mono mt-0.5">RTX A6000 Cluster</span>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Transformations Volume Trend (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-espresso border border-gold/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-editorial-heading text-lg font-medium text-ivory">
                Daily Synthesis Output & Ingestion
              </h3>
              <p className="text-[11px] text-stone-dark">7-Day photographic transformation volume across all tiers.</p>
            </div>
            <span className="text-[10px] font-mono text-gold px-2 py-0.5 rounded bg-gold/10 border border-gold/20">
              UTC +1
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.dailyVolume}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A58A5B" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#A58A5B" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.3} />
                <XAxis dataKey="date" stroke="#888" fontSize={10} tickLine={false} />
                <YAxis stroke="#888" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#171715', borderColor: '#A58A5B', fontSize: '11px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="transformations" stroke="#A58A5B" strokeWidth={2} fillOpacity={1} fill="url(#goldGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Brand Popularity Distribution (4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-espresso border border-gold/20 flex flex-col justify-between">
          <div>
            <h3 className="font-editorial-heading text-lg font-medium text-ivory mb-1">
              Popular Timepiece Maisons
            </h3>
            <p className="text-[11px] text-stone-dark mb-4">Share of user requests by luxury manufacturer.</p>

            <div className="space-y-3">
              {stats.brandDistribution.map((item, i) => (
                <div key={item.brand} className="text-xs">
                  <div className="flex justify-between text-stone-light mb-1">
                    <span>{item.brand}</span>
                    <span className="font-mono text-gold font-semibold">{item.percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-warmblack rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: GOLD_COLORS[i % GOLD_COLORS.length]
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-ivory/10 text-[10px] text-stone-dark font-mono">
            Rolex and Patek Philippe account for 61% of total wrist matches.
          </div>
        </div>
      </div>

      {/* Live Recent Transformation Queue Table */}
      <div className="p-6 rounded-2xl bg-espresso border border-gold/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-editorial-heading text-lg font-medium text-ivory">
              Live Synthesis Stream & Audit Log
            </h3>
            <p className="text-[11px] text-stone-dark">Real-time transformations dispatched by studio members.</p>
          </div>
          <span className="text-[10px] font-mono text-sage flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
            STREAM ACTIVE
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-ivory/10 text-stone-dark uppercase text-[10px] font-mono">
                <th className="pb-3">Task ID</th>
                <th className="pb-3">Client Member</th>
                <th className="pb-3">Timepiece Reference</th>
                <th className="pb-3">Latency</th>
                <th className="pb-3">Timestamp</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory/5 text-stone-light">
              {stats.recentTransformations.map(tx => (
                <tr key={tx.id} className="hover:bg-ivory/5 transition-colors">
                  <td className="py-3 font-mono text-gold">{tx.id}</td>
                  <td className="py-3 font-medium text-ivory">{tx.userName}</td>
                  <td className="py-3">
                    <span className="font-semibold text-ivory">{tx.watchBrand}</span>{' '}
                    <span className="text-stone-dark">{tx.watchModel}</span>
                  </td>
                  <td className="py-3 font-mono">{tx.latencySec}s</td>
                  <td className="py-3 text-stone-dark">{tx.timestamp}</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded bg-sage/15 text-sage text-[10px] font-mono font-medium border border-sage/30">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

