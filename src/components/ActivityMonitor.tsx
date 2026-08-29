import { useState, useEffect } from 'react';
import { 
  Radio, 
  Terminal, 
  Users, 
  Code2, 
  BookOpen, 
  Briefcase, 
  Activity, 
  Sparkles, 
  RefreshCw,
  GitBranch,
  GitCommit,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { getRealActivities, CommunityActivity, fetchRealPresence, PresenceData } from '../services/activityService';
import { CommunityReactions } from './CommunityReactions';

interface ActivityMonitorProps {
  isTechGirl?: boolean;
}

export function ActivityMonitor({ isTechGirl }: ActivityMonitorProps) {
  const [activities, setActivities] = useState<CommunityActivity[]>([]);
  const [filter, setFilter] = useState<'all' | 'github' | 'community'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSync, setLastSync] = useState<string>('agora');
  const [presence, setPresence] = useState<PresenceData | null>(null);

  const loadActivities = async () => {
    setIsLoading(true);
    try {
      const [data, pres] = await Promise.all([
        getRealActivities(),
        fetchRealPresence()
      ]);
      setActivities(data);
      if (pres) setPresence(pres);
      setLastSync(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) {
      console.error('Error loading real activities:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();

    const interval = setInterval(() => {
      loadActivities();
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const filteredActivities = activities.filter(item => {
    if (filter === 'github') return item.source === 'GitHub';
    if (filter === 'community') return item.source !== 'GitHub';
    return true;
  });

  // Category visual metadata based on official design system
  const getActivityMeta = (item: CommunityActivity) => {
    if (item.source === 'GitHub') {
      return {
        icon: <GitCommit size={14} />,
        tag: 'GitHub Dev',
        badgeClass: 'border-[#1D5171]/50 bg-[#1D5171]/20 text-[#38bdf8]',
        cardBorder: 'border-l-[#1D5171]',
        iconBg: 'bg-[#103653]/40 text-[#38bdf8] border-[#1D5171]/40'
      };
    }
    if (item.type === 'techgirl') {
      return {
        icon: <Sparkles size={14} />,
        tag: 'Tech Girl',
        badgeClass: 'border-[#967189]/40 bg-[#967189]/20 text-[#E6E9EF]',
        cardBorder: 'border-l-[#967189]',
        iconBg: 'bg-[#967189]/20 text-[#E6E9EF] border-[#967189]/40'
      };
    }
    if (item.type === 'opportunity') {
      return {
        icon: <Briefcase size={14} />,
        tag: 'Vagas & Oportunidades',
        badgeClass: 'border-[#E0A34A]/40 bg-[#E0A34A]/15 text-[#E0A34A]',
        cardBorder: 'border-l-[#E0A34A]',
        iconBg: 'bg-[#E0A34A]/15 text-[#E0A34A] border-[#E0A34A]/40'
      };
    }
    if (item.type === 'english') {
      return {
        icon: <BookOpen size={14} />,
        tag: 'Aulas & Educação',
        badgeClass: 'border-[#997074]/40 bg-[#997074]/20 text-[#E6E9EF]',
        cardBorder: 'border-l-[#997074]',
        iconBg: 'bg-[#997074]/20 text-[#E6E9EF] border-[#997074]/40'
      };
    }
    // Default Community / WhatsApp
    return {
      icon: <Users size={14} />,
      tag: 'Comunidade WhatsApp',
      badgeClass: 'border-[#246386]/40 bg-[#246386]/20 text-[#E6E9EF]',
      cardBorder: 'border-l-[#246386]',
      iconBg: 'bg-[#103653]/40 text-[#246386] border-[#246386]/40'
    };
  };

  return (
    <div id="atividade" className="flex flex-col gap-3 w-full">
      
      {/* Top Bar with Real Sync info */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#A1AEC2]">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-[#E0A34A] opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-[#E0A34A]" />
          </span>
          <span className="font-semibold text-[#E6E9EF]">Feed de Atividade em Tempo Real</span>
        </div>

        {/* Real-time sync badge */}
        <div className="flex items-center gap-2">
          <div 
            title={presence ? `Discord: ${presence.details?.discordOnline || 0} online • Web: ${presence.details?.webVisitors || 1} ativos` : 'Sincronizando presença real...'}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 cursor-help"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span className="font-mono text-[10px] font-semibold text-emerald-300">
              {presence ? presence.online : 8} online
            </span>
          </div>
          <button 
            type="button" 
            onClick={loadActivities}
            title="Sincronizar agora"
            className="p-1 rounded-md text-[#A1AEC2] hover:text-[#E6E9EF] border border-[#E6E9EF]/10 hover:border-[#E6E9EF]/20 bg-[#103653]/20 cursor-pointer transition-colors"
          >
            <RefreshCw size={12} className={isLoading ? 'animate-spin text-[#246386]' : ''} />
          </button>
        </div>
      </div>

      {/* Terminal Card Window with Subtle Liquid Iridescent Border Glow */}
      <div className={`overflow-hidden rounded-2xl border bg-[#071528] card-surface shadow-2xl relative ${
        isTechGirl ? 'border-[#967189]/30 card-surface-techgirl' : 'border-[#E6E9EF]/10'
      }`}>
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#E6E9EF]/10 px-4 py-3 bg-[#030C1E]/60">
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-[#E0A34A] animate-pulse" />
            <span className="font-mono text-xs text-[#E6E9EF]">
              resourceit <span className="text-[#A1AEC2]/40">·</span> webhooks ativos
            </span>
          </div>
          
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[#1D5171]" />
            <span className="h-2 w-2 rounded-full bg-[#967189]" />
            <span className="h-2 w-2 rounded-full bg-[#E0A34A]" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#E6E9EF]/10 bg-[#030C1E]/40 overflow-x-auto text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              filter === 'all' 
                ? 'btn-primary text-white font-semibold shadow-sm'
                : 'text-[#A1AEC2] hover:text-[#E6E9EF] hover:bg-[#103653]/40'
            }`}
          >
            Todos ({activities.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('community')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              filter === 'community' 
                ? 'btn-primary text-white font-semibold shadow-sm'
                : 'text-[#A1AEC2] hover:text-[#E6E9EF] hover:bg-[#103653]/40'
            }`}
          >
            WhatsApp & Grupos
          </button>
          <button
            type="button"
            onClick={() => setFilter('github')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              filter === 'github' 
                ? 'btn-primary text-white font-semibold shadow-sm'
                : 'text-[#A1AEC2] hover:text-[#E6E9EF] hover:bg-[#103653]/40'
            }`}
          >
            GitHub & Commits
          </button>
        </div>

        {/* Logs Feed Container */}
        <div 
          className="divide-y divide-[#E6E9EF]/5 max-h-[350px] overflow-y-auto"
          tabIndex={0}
          aria-label="Feed de atividades da comunidade"
        >
          {filteredActivities.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-[#A1AEC2]">
              {isLoading ? 'Sincronizando atividades reais...' : 'Nenhum evento registrado no momento.'}
            </div>
          ) : (
            filteredActivities.map((item) => {
              const meta = getActivityMeta(item);
              return (
                <div 
                  key={item.id} 
                  className={`flex items-start gap-3 p-3.5 hover:bg-[#103653]/30 transition-all border-l-2 ${meta.cardBorder}`}
                >
                  {/* Source/Type Icon */}
                  <div className={`mt-0.5 p-2 rounded-xl border shrink-0 ${meta.iconBg}`}>
                    {meta.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono text-xs font-bold text-[#E6E9EF] truncate">
                          {item.actor ? item.actor : item.source}
                        </span>
                        <span className={`font-mono text-[9px] px-1.5 py-0.2 rounded border uppercase font-medium ${meta.badgeClass}`}>
                          {meta.tag}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#A1AEC2]/60 shrink-0">
                        {item.time}
                      </span>
                    </div>

                    <p className="text-xs text-[#E6E9EF] leading-relaxed break-words font-sans">
                      {item.text}
                    </p>

                    {item.source === 'GitHub' && (
                      <div className="mt-1.5 flex items-center gap-1 font-mono text-[10px] text-[#38bdf8]">
                        <GitBranch size={10} />
                        <span>github.com/alysonmarquez</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Terminal Footer */}
        <div className="px-4 py-2.5 bg-[#030C1E]/70 border-t border-[#E6E9EF]/10 flex items-center justify-between text-[10px] font-mono text-[#A1AEC2]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Conectado aos webhooks oficiais
          </span>
          <span className="text-[#E0A34A]">Sync: {lastSync}</span>
        </div>

      </div>

      {/* Interactive Live Community Reactions */}
      <CommunityReactions />

    </div>
  );
}
