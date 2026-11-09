import React, { useState } from 'react';
import { Search, UserCheck, Shield, Filter, MoreVertical, Sparkles } from 'lucide-react';
import { ADMIN_USERS_LIST } from '../../data/admin';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState(ADMIN_USERS_LIST);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('All');

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === 'All' || u.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ivory/10">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-gold block mb-1">
            USER DIRECTORY & ACCESS CONTROL
          </span>
          <h1 className="text-3xl font-editorial-heading font-medium text-ivory">
            Registered Members.
          </h1>
          <p className="text-xs text-stone-dark mt-0.5">
            Audit member subscriptions, historical transformations, and studio tier privileges.
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-espresso border border-gold/20">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="w-3.5 h-3.5 text-stone-dark absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by member name or email address..."
            className="w-full bg-warmblack border border-gold/20 rounded-lg pl-9 pr-3 py-2 text-xs text-ivory focus:outline-none focus:border-gold"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={tierFilter}
            onChange={e => setTierFilter(e.target.value)}
            className="bg-warmblack border border-gold/20 rounded-lg px-3 py-2 text-xs text-ivory focus:outline-none focus:border-gold"
          >
            <option value="All">All Tiers</option>
            <option value="Elite">Elite Tier</option>
            <option value="Premium">Premium Tier</option>
            <option value="Free">Free Explore</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="p-6 rounded-2xl bg-espresso border border-gold/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-ivory/10 text-stone-dark uppercase text-[10px] font-mono">
                <th className="pb-3">Member Name</th>
                <th className="pb-3">Email Address</th>
                <th className="pb-3">Subscription Tier</th>
                <th className="pb-3">Transformations</th>
                <th className="pb-3">Member Since</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory/5 text-stone-light">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-ivory/5 transition-colors">
                  <td className="py-3 font-medium text-ivory">{user.name}</td>
                  <td className="py-3 font-mono text-stone-dark">{user.email}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                      user.tier === 'Elite'
                        ? 'bg-gold/20 text-gold border border-gold/40'
                        : user.tier === 'Premium'
                        ? 'bg-ivory/10 text-stone-light border border-ivory/20'
                        : 'bg-warmblack text-stone-dark'
                    }`}>
                      {user.tier}
                    </span>
                  </td>
                  <td className="py-3 font-mono">{user.totalTx}</td>
                  <td className="py-3 text-stone-dark">{user.joinedDate}</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded bg-sage/15 text-sage text-[10px] font-mono font-medium border border-sage/30">
                      {user.status}
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

