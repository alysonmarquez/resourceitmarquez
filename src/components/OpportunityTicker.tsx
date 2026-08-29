import { Briefcase, ArrowUpRight, Sparkles } from 'lucide-react';
import { opportunitiesList } from '../data/communityData';

export function OpportunityTicker() {
  const items = [...opportunitiesList, ...opportunitiesList, ...opportunitiesList];

  return (
    <div className="py-8 border-y border-[#E6E9EF]/10 bg-[#103653]/15 select-none relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-[#E0A34A]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E0A34A]">
            Oportunidades Rolando Agora
          </span>
        </div>
        <a 
          href="https://chat.whatsapp.com/Hwfpb0H9atAHnKom9HMq4s" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-mono text-[#A1AEC2] hover:text-[#E6E9EF] flex items-center gap-1 transition-colors"
        >
          <span>Canal de Vagas</span>
          <ArrowUpRight size={13} />
        </a>
      </div>

      <div className="flex overflow-x-hidden group mask-linear">
        <div 
          className="flex items-center gap-4 whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]"
          style={{ animation: 'marquee 30s linear infinite' }}
        >
          {items.map((op, index) => (
            <a
              key={`${op.id}-${index}`}
              href="https://chat.whatsapp.com/Hwfpb0H9atAHnKom9HMq4s"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[#E6E9EF]/10 bg-[#071528] hover:border-[#E0A34A]/50 hover:bg-[#103653]/40 transition-all shadow-sm group/item"
            >
              {op.isHot && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#E0A34A]/20 text-[#E0A34A] border border-[#E0A34A]/30">
                  HOT
                </span>
              )}
              <div>
                <div className="text-xs font-bold text-[#E6E9EF] group-hover/item:text-white">
                  {op.role}
                </div>
                <div className="font-mono text-[10px] text-[#A1AEC2]">
                  {op.tech} · <span className="text-[#E0A34A]">{op.type}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
