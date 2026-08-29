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
  CheckCircle
} from 'lucide-react';
import { getRealActivities, CommunityActivity, fetchRealPresence, PresenceData } from '../services/activityService';

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

  const getIcon = (item: CommunityActivity) => {
    if (item.source === 'GitHub') return <GitCommit size={14} />;
    switch (item.type) {
      case 'member':
        return <Users size={14} />;
      case 'opportunity':
        return <Briefcase size={14} />;
      case 'english':
        return <BookOpen size={14} />;
      case 'techgirl':
        return <Sparkles size={14} />;
      case 'study':
        return <Code2 size={14} />;
      default:
        return <Activity size={14} />;
    }
  };

  const getIconStyle = (item: CommunityActivity) => {
    if (item.source === 'GitHub') {
      return 'border-[#246386]/40 bg-[#1D5171]/20 text-[#E6E9EF]';
    }
    if (item.type === 'techgirl') {
      return 'border-[#967189]/40 bg-[#967189]/20 text-[#E6E9EF]';
    }
    if (item.type === 'member') {
      return isTechGirl 
        ? 'border-[#967189]/40 bg-[#967189]/20 text-[#E6E9EF]' 
        : 'border-[#1D5171]/40 bg-[#1D5171]/20 text-[#E6E9EF]';
    }
    if (item.type === 'opportunity') {
      return 'border-[#E0A34A]/40 bg-[#E0A34A]/15 text-[#E0A34A]';
    }
    if (item.type === 'english') {
      return 'border-[#246386]/40 bg-[#246386]/20 text-[#E6E9EF]';
    }
    return 'border-[#E6E9EF]/10 bg-[#103653]/30 text-[#A1AEC2]';
  };

  return (
    <div id="atividade" className="flex flex-col gap-3 w-full">
      
      {/* Top Bar with Real Sync info */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#A1AEC2]">
          <span className="relative flex h-2 w-2">
            <span className={`absolute h-full w-full animate-ping rounded-full opacity-75 ${
              isTechGirl ? 'bg-[#967189]' : 'bg-[#1D5171]'
            }`} />
            <span className={`relative h-2 w-2 rounded-full ${
              isTechGirl ? 'bg-[#967189]' : 'bg-[#246386]'
            }`} />
          </span>
          <span>Feed de Atividade Real</span>
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

      {/* Terminal Card Window */}
      <div className={`overflow-hidden rounded-2xl border bg-[#071528] card-surface shadow-2xl ${
        isTechGirl ? 'border-[#967189]/30 card-surface-techgirl' : 'border-[#E6E9EF]/10'
      }`}>
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#E6E9EF]/10 px-4 py-3 bg-[#030C1E]/50">
          <div className="flex items-center gap-2">
            <Radio size={14} className={isTechGirl ? 'text-[#967189] animate-pulse' : 'text-[#246386] animate-pulse'} />
            <span className="font-mono text-xs text-[#E6E9EF]">
              resourceit <span className="text-[#A1AEC2]/40">·</span> logs em tempo real
            </span>
          </div>
          
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[#E6E9EF]/15" />
            <span className="h-2 w-2 rounded-full bg-[#E6E9EF]/15" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#E6E9EF]/10 bg-[#030C1E]/30 overflow-x-auto text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              filter === 'all' 
                ? (isTechGirl ? 'bg-[#967189] text-white font-semibold' : 'bg-[#1D5171] text-[#E6E9EF] font-semibold')
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
                ? (isTechGirl ? 'bg-[#967189] text-white font-semibold' : 'bg-[#1D5171] text-[#E6E9EF] font-semibold')
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
                ? (isTechGirl ? 'bg-[#967189] text-white font-semibold' : 'bg-[#1D5171] text-[#E6E9EF] font-semibold')
                : 'text-[#A1AEC2] hover:text-[#E6E9EF] hover:bg-[#103653]/40'
            }`}
          >
            GitHub & Commits
          </button>
        </div>

        {/* Logs Feed Container */}
        <div 
          className="divide-y divide-[#E6E9EF]/5 max-h-[360px] overflow-y-auto"
          tabIndex={0}
          aria-label="Feed de atividades da comunidade"
        >
          {filteredActivities.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-[#A1AEC2]">
              {isLoading ? 'Sincronizando atividades reais...' : 'Nenhum evento registrado no momento.'}
            </div>
          ) : (
            filteredActivities.map((item) => (
              <div 
                key={item.id} 
                className="flex items-start gap-3 p-3.5 hover:bg-[#103653]/30 transition-colors"
              >
                {/* Source/Type Icon */}
                <div className={`mt-0.5 p-1.5 rounded-lg border shrink-0 ${getIconStyle(item)}`}>
                  {getIcon(item)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-[11px] text-[#A1AEC2] truncate">
                      {item.actor ? item.actor : item.source}
                    </span>
                    <span className="font-mono text-[10px] text-[#A1AEC2]/60 shrink-0">
                      {item.time}
                    </span>
                  </div>

                  <p className="text-xs text-[#E6E9EF] leading-relaxed break-words font-sans">
                    {item.text}
                  </p>

                  {item.source === 'GitHub' && (
                    <div className="mt-1.5 flex items-center gap-1 font-mono text-[10px] text-[#246386]">
                      <GitBranch size={10} />
                      <span>github.com/alysonmarquez</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Terminal Footer */}
        <div className="px-4 py-2.5 bg-[#030C1E]/60 border-t border-[#E6E9EF]/10 flex items-center justify-between text-[10px] font-mono text-[#A1AEC2]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Conectado aos webhooks oficiais
          </span>
          <span>Sync: {lastSync}</span>
        </div>

      </div>

    </div>
  );
}
