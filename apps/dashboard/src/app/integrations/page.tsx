'use client';

import React, { useState } from 'react';
import {
  Search,
  Grid,
  List,
  ShoppingCart,
  PackageCheck,
  Plug,
  Cpu,
  Key,
} from 'lucide-react';
import { useIntegrationStore } from '@/store/useIntegrationStore';
import { useProviderStore, BUILTIN_PROVIDERS } from '@/store/useProviderStore';
import { IntegrationCard } from '@/components/IntegrationCard';
import { PageHeader } from '@/components/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';

export default function IntegrationsPage() {
  const { myIntegrations, marketplaceIntegrations, isInstalled } = useIntegrationStore();
  const { providers, setPreferredModel, setApiKey, getApiKey } = useProviderStore();
  const { theme } = useUIStore();
  const [activeTab, setActiveTab] = useState<'my' | 'marketplace'>('my');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const currentIntegrations = activeTab === 'my' ? myIntegrations : marketplaceIntegrations;
  const filteredIntegrations = currentIntegrations.filter(
    (i) =>
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      <PageHeader
        title="INTEGRATIONS"
        badge="NC-PLUGINS"
        statusLabel="Plugin Status:"
        statusValue="Sync Ready"
        statusColor="indigo"
        className="pb-10 gap-8"
      >
        <div
          className={cn(
            'flex items-center gap-2 p-1.5 rounded-[24px] border transition-all shadow-xl',
            theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100 shadow-slate-200/40'
          )}
        >
          <button
            onClick={() => setActiveTab('my')}
            className={cn(
              'flex items-center gap-3 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95',
              activeTab === 'my'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
            )}
          >
            <PackageCheck size={18} />
            <span>INSTALLED</span>
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={cn(
              'flex items-center gap-3 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95',
              activeTab === 'marketplace'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
            )}
          >
            <ShoppingCart size={18} />
            <span>MARKETPLACE</span>
          </button>
        </div>
      </PageHeader>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="relative flex-1 group w-full">
          <Search
            size={20}
            className={cn(
              'absolute left-5 top-1/2 -translate-y-1/2 transition-colors',
              theme === 'dark' ? 'text-slate-700 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-600'
            )}
          />
          <input
            type="text"
            placeholder={`Search ${activeTab === 'my' ? 'installed' : 'marketplace'} integrations...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              'w-full rounded-[24px] pl-14 pr-6 py-5 text-sm font-bold transition-all border outline-none shadow-xl',
              theme === 'dark'
                ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-700 focus:border-indigo-500/50'
                : 'bg-white border-slate-100 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 shadow-slate-200/40'
            )}
          />
        </div>
        <div className={cn('rounded-[20px] flex p-1.5 border shadow-xl transition-all', theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100 shadow-slate-200/40')}>
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'p-3 rounded-xl transition-all active:scale-95',
              viewMode === 'grid'
                ? theme === 'dark' ? 'bg-slate-800 text-indigo-400 shadow-inner' : 'bg-slate-50 text-indigo-600 border border-slate-100 shadow-inner'
                : 'text-slate-500 hover:text-slate-300'
            )}
          >
            <Grid size={22} />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={cn(
              'p-3 rounded-xl transition-all active:scale-95',
              viewMode === 'table'
                ? theme === 'dark' ? 'bg-slate-800 text-indigo-400 shadow-inner' : 'bg-slate-50 text-indigo-600 border border-slate-100 shadow-inner'
                : 'text-slate-500 hover:text-slate-300'
            )}
          >
            <List size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filteredIntegrations.length > 0 ? (
          <motion.div
            key={`${activeTab}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {filteredIntegrations.map((integration) => (
                  <IntegrationCard
                    key={integration.id}
                    integration={integration}
                    viewMode="grid"
                    isInstalled={isInstalled(integration.name)}
                    source={activeTab === 'my' ? 'installed' : 'marketplace'}
                  />
                ))}
              </div>
            ) : (
              <div
                className={cn(
                  'rounded-[40px] overflow-hidden border shadow-2xl transition-all',
                  theme === 'dark' ? 'bg-slate-950/50 border-slate-800' : 'bg-white border-slate-100 shadow-slate-200/50'
                )}
              >
                <table className="w-full text-left">
                  <thead>
                    <tr className={cn('transition-colors', theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50/50')}>
                      <th className={cn('py-6 px-10 text-[10px] font-black uppercase tracking-[0.3em]', theme === 'dark' ? 'text-slate-600' : 'text-slate-400')}>
                        Integration
                      </th>
                      <th className={cn('py-6 px-10 text-[10px] font-black uppercase tracking-[0.3em]', theme === 'dark' ? 'text-slate-600' : 'text-slate-400')}>
                        Description
                      </th>
                      <th className={cn('py-6 px-10 text-[10px] font-black uppercase tracking-[0.3em]', theme === 'dark' ? 'text-slate-600' : 'text-slate-400')}>
                        Status
                      </th>
                      <th className={cn('py-6 px-10 text-right text-[10px] font-black uppercase tracking-[0.3em]', theme === 'dark' ? 'text-slate-600' : 'text-slate-400')}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={cn('divide-y', theme === 'dark' ? 'divide-slate-900' : 'divide-slate-50')}>
                    {filteredIntegrations.map((integration) => (
                      <IntegrationCard
                        key={integration.id}
                        integration={integration}
                        viewMode="table"
                        isInstalled={isInstalled(integration.name)}
                        source={activeTab === 'my' ? 'installed' : 'marketplace'}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              'flex flex-col items-center justify-center py-40 rounded-[64px] border-2 border-dashed shadow-inner transition-colors',
              theme === 'dark' ? 'bg-slate-900/10 border-slate-800/30' : 'bg-slate-50/50 border-slate-200'
            )}
          >
            <div
              className={cn(
                'w-32 h-32 rounded-[40px] flex items-center justify-center mb-10 shadow-2xl border transition-all animate-pulse',
                theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-700 shadow-black/50' : 'bg-white border-slate-100 text-slate-200 shadow-slate-200/50'
              )}
            >
              {activeTab === 'my' ? <Plug size={64} strokeWidth={1} /> : <ShoppingCart size={64} strokeWidth={1} />}
            </div>
            <h3 className={cn('text-3xl font-black mb-4 tracking-tighter', theme === 'dark' ? 'text-white' : 'text-slate-950')}>
              {searchQuery ? 'NO MATCHES' : activeTab === 'my' ? 'NO INTEGRATIONS INSTALLED' : 'MARKETPLACE OFFLINE'}
            </h3>
            <p className={cn('text-sm max-w-sm text-center leading-loose font-bold uppercase tracking-[0.1em] mb-12', theme === 'dark' ? 'text-slate-600' : 'text-slate-400')}>
              {activeTab === 'my'
                ? 'Add integrations from the Marketplace, then configure them to connect your tools.'
                : 'Refresh your neural link to load available integrations.'}
            </p>
            {activeTab === 'my' && !searchQuery && (
              <button
                onClick={() => setActiveTab('marketplace')}
                className="flex items-center gap-4 px-12 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all shadow-2xl shadow-indigo-600/30 active:scale-95"
              >
                <ShoppingCart size={20} />
                <span>Open Marketplace</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Providers & Models */}
      <section className="pt-8">
        <div
          className={cn(
            'rounded-[40px] border shadow-2xl overflow-hidden transition-colors',
            theme === 'dark' ? 'bg-slate-950/50 border-slate-800' : 'bg-white border-slate-100 shadow-slate-200/50'
          )}
        >
          <div className={cn('px-8 py-6 border-b', theme === 'dark' ? 'border-slate-800' : 'border-slate-100')}>
            <div className="flex items-center gap-3 mb-2">
              <div className={cn('p-2 rounded-xl', theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600')}>
                <Cpu size={20} />
              </div>
              <h2 className={cn('text-lg font-black tracking-tighter', theme === 'dark' ? 'text-white' : 'text-slate-950')}>
                AI Providers & Models
              </h2>
            </div>
            <p className={cn('text-[11px] font-bold uppercase tracking-widest', theme === 'dark' ? 'text-slate-500' : 'text-slate-400')}>
              Preferred providers and models for your agents. Add API keys to enable usage.
            </p>
          </div>
          <div className="p-8 space-y-6">
            {providers.map((provider) => {
              const option = BUILTIN_PROVIDERS.find((p) => p.id === provider.providerId);
              const models = option?.models ?? [];
              return (
                <div
                  key={provider.providerId}
                  className={cn(
                    'flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-3xl border transition-colors',
                    theme === 'dark' ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50/50 border-slate-100'
                  )}
                >
                  <div className="flex items-center gap-4 min-w-[140px]">
                    <div className={cn('p-2.5 rounded-2xl', theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-white border border-slate-100 text-slate-600')}>
                      <Key size={20} />
                    </div>
                    <span className={cn('font-black tracking-tight', theme === 'dark' ? 'text-white' : 'text-slate-900')}>
                      {provider.name}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className={cn('block text-[10px] font-black uppercase tracking-widest mb-2', theme === 'dark' ? 'text-slate-500' : 'text-slate-400')}>
                        Model
                      </label>
                      <select
                        value={provider.preferredModel}
                        onChange={(e) => setPreferredModel(provider.providerId, e.target.value)}
                        className={cn(
                          'w-full rounded-2xl px-4 py-3 text-sm font-bold border outline-none transition-all',
                          theme === 'dark'
                            ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500'
                            : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-500'
                        )}
                      >
                        {models.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className={cn('block text-[10px] font-black uppercase tracking-widest mb-2', theme === 'dark' ? 'text-slate-500' : 'text-slate-400')}>
                        API Key
                      </label>
                      <input
                        type="password"
                        placeholder="sk-..."
                        value={getApiKey(provider.providerId)}
                        onChange={(e) => setApiKey(provider.providerId, e.target.value)}
                        className={cn(
                          'w-full rounded-2xl px-4 py-3 text-sm font-bold border outline-none transition-all placeholder:opacity-50',
                          theme === 'dark'
                            ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:border-indigo-500'
                            : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500'
                        )}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
