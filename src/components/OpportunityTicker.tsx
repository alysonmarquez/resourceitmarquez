import { useState, useEffect } from 'react';
import { Briefcase, ArrowUpRight, Sparkles, PlusCircle } from 'lucide-react';
import { fetchRealJobs, RealJobItem } from '../services/activityService';

export function OpportunityTicker() {
  const [jobs, setJobs] = useState<RealJobItem[]>([]);

  const loadJobs = async () => {
    try {
      const liveJobs = await fetchRealJobs();
      if (liveJobs.length > 0) {
        setJobs(liveJobs);
      }
    } catch (e) {
      console.error('Error loading real jobs:', e);
    }
  };

  useEffect(() => {
    loadJobs();
    const interval = setInterval(loadJobs, 15000);
    return () => clearInterval(interval);
  }, []);

  const fallbackJobs: RealJobItem[] = [
    {
      id: 'fj-1',
      role: 'Desenvolvedor Back-End Node.js & TypeScript',
      company: 'Comunidade Resource IT',
      type: 'Remoto CLT / PJ',
      level: 'Júnior / Pleno',
      location: 'Remoto',
      tech: ['Node.js', 'PostgreSQL', 'Docker'],
      description: 'Vaga compartilhada diretamente no grupo oficial de vagas.',
      link: 'https://chat.whatsapp.com/LbQSl8Q2tjcGluF2He3zI6',
      date: 'Hoje',
      timestamp: Date.now(),
      source: 'WhatsApp Vagas'
    },
    {
      id: 'fj-2',
      role: 'Desenvolvedor Full Stack React & C# .NET',
      company: 'Comunidade Resource IT',
      type: 'Remoto',
      level: 'Pleno',
      location: 'Remoto',
      tech: ['React', 'C# .NET 9', 'SQL'],
      description: 'Oportunidade compartilhada no grupo oficial de vagas.',
      link: 'https://chat.whatsapp.com/LbQSl8Q2tjcGluF2He3zI6',
      date: 'Hoje',
      timestamp: Date.now(),
      source: 'WhatsApp Vagas'
    },
    {
      id: 'fj-3',
      role: 'Estágio em Desenvolvimento de Software',
      company: 'Comunidade Resource IT',
      type: 'Remoto',
      level: 'Estágio',
      location: 'Remoto',
      tech: ['JavaScript', 'Java / Python', 'Git'],
      description: 'Estágio para membros da comunidade com foco em evolução acelerada.',
      link: 'https://chat.whatsapp.com/LbQSl8Q2tjcGluF2He3zI6',
      date: 'Hoje',
      timestamp: Date.now(),
      source: 'WhatsApp Vagas'
    }
  ];

  const currentJobs = jobs.length > 0 ? jobs : fallbackJobs;
  const loopItems = [...currentJobs, ...currentJobs, ...currentJobs];

  return (
    <section aria-label="Oportunidades de Emprego Tech" className="py-8 border-y border-[#E6E9EF]/10 bg-[#103653]/15 select-none relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#E0A34A] animate-pulse-dot" />
          <Briefcase size={16} className="text-[#E0A34A]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E0A34A]">
            Vagas Sincronizadas do WhatsApp em Tempo Real
          </span>
        </div>
        <a 
          href="https://chat.whatsapp.com/LbQSl8Q2tjcGluF2He3zI6" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-mono text-[#A1AEC2] hover:text-[#E6E9EF] flex items-center gap-1.5 transition-colors"
        >
          <span>Acessar Grupo de Vagas</span>
          <ArrowUpRight size={13} />
        </a>
      </div>

      <div className="flex overflow-x-hidden group mask-linear">
        <div 
          className="flex items-center gap-4 whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]"
          style={{ animation: 'marquee 32s linear infinite' }}
        >
          {loopItems.map((op, index) => (
            <a
              key={`${op.id}-${index}`}
              href={op.link || 'https://chat.whatsapp.com/LbQSl8Q2tjcGluF2He3zI6'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[#E6E9EF]/10 bg-[#071528] hover:border-[#E0A34A]/50 hover:bg-[#103653]/40 transition-all shadow-sm group/item"
            >
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#E0A34A]/20 text-[#E0A34A] border border-[#E0A34A]/30">
                {op.level || 'VAGA'}
              </span>
              <div>
                <div className="text-xs font-bold text-[#E6E9EF] group-hover/item:text-white">
                  {op.role}
                </div>
                <div className="font-mono text-[10px] text-[#A1AEC2]">
                  {Array.isArray(op.tech) ? op.tech.join(' · ') : op.tech} · <span className="text-[#E0A34A]">{op.type}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
