import React, { useState } from 'react';
import { Activity, Clock, CheckCircle2, AlertTriangle, RefreshCw, Server } from 'lucide-react';
import { ADMIN_STATS_DATA } from '../../data/admin';

export const AdminTransformationsPage: React.FC = () => {
  const [tasks] = useState(ADMIN_STATS_DATA.recentTransformations);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ivory/10">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-gold block mb-1">
            PIPELINE SUPERVISION & GPU CLUSTER
          </span>
          <h1 className="text-3xl font-editorial-heading font-medium text-ivory">
            Transformation Queue & GPU Workload.
          </h1>
          <p className="text-xs text-stone-dark mt-0.5">
            Active neural workers, ray-tracing batch latency, and photographic synthesis status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded bg-espresso text-xs font-mono text-stone-light border border-gold/20 flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-gold" />
            16 / 16 RTX A6000 Active
          </span>
        </div>
      </div>

      {/* Cluster Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-espresso border border-gold/20">
          <span className="text-[10px] uppercase font-mono text-stone-dark block">Average Queue Depth</span>
          <span className="text-2xl font-editorial-heading font-medium text-ivory mt-1 block">4 Tasks</span>
          <span className="text-[10px] text-sage font-mono mt-0.5 block">Zero congestion</span>
        </div>

        <div className="p-4 rounded-xl bg-espresso border border-gold/20">
          <span className="text-[10px] uppercase font-mono text-stone-dark block">Inference Execution Time</span>
          <span className="text-2xl font-editorial-heading font-medium text-ivory mt-1 block">4.9s Mean</span>
          <span className="text-[10px] text-stone-dark font-mono mt-0.5 block">p99 = 6.8s (8K exports)</span>
        </div>

        <div className="p-4 rounded-xl bg-espresso border border-gold/20">
          <span className="text-[10px] uppercase font-mono text-stone-dark block">Failure Rate</span>
          <span className="text-2xl font-editorial-heading font-medium text-ivory mt-1 block">0.6%</span>
          <span className="text-[10px] text-sage font-mono mt-0.5 block">Caused by unsegmented images</span>
        </div>
      </div>

      {/* Live Table */}
      <div className="p-6 rounded-2xl bg-espresso border border-gold/20">
        <h3 className="font-editorial-heading text-lg font-medium text-ivory mb-4">
          Recent Synthesized Frames
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-ivory/10 text-stone-dark uppercase text-[10px] font-mono">
                <th className="pb-3">Task ID</th>
                <th className="pb-3">Client</th>
                <th className="pb-3">Target Reference</th>
                <th className="pb-3">Latency</th>
                <th className="pb-3">Time</th>
                <th className="pb-3 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory/5 text-stone-light">
              {tasks.map(t => (
                <tr key={t.id} className="hover:bg-ivory/5 transition-colors">
                  <td className="py-3 font-mono text-gold">{t.id}</td>
                  <td className="py-3 text-ivory font-medium">{t.userName}</td>
                  <td className="py-3">
                    <span className="font-semibold text-ivory">{t.watchBrand}</span>{' '}
                    <span className="text-stone-dark">{t.watchModel}</span>
                  </td>
                  <td className="py-3 font-mono">{t.latencySec}s</td>
                  <td className="py-3 text-stone-dark">{t.timestamp}</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded bg-sage/15 text-sage text-[10px] font-mono border border-sage/30">
                      PASSED (300 DPI)
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

