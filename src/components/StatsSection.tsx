import { useState, useEffect } from 'react';
import { Users, BookOpen, Layers, CheckCircle2, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { fetchCommunityGroups, CommunityGroup } from '../services/activityService';

interface StatsSectionProps {
  isTechGirl?: boolean;
}

export function StatsSection({ isTechGirl }: StatsSectionProps) {
  const [totalMembers, setTotalMembers] = useState<number>(840);
  const [groups, setGroups] = useState<CommunityGroup[]>([]);
  const [showGroupsModal, setShowGroupsModal] = useState(false);

  useEffect(() => {
    fetchCommunityGroups().then(data => {
      if (data && data.totalMembers) {
        setTotalMembers(data.totalMembers);
        setGroups(data.groups || []);
      }
    });
  }, []);

  const stats = [
    {
      value: `+${totalMembers.toLocaleString('pt-BR')}`,
      label: 'Membros Conectados',
      desc: 'Membros reais e ativos nos grupos oficiais de WhatsApp, Telegram e Discord.',
      icon: <Users size={22} className="text-[#E0A34A]" />,
      action: () => setShowGroupsModal(true),
      actionLabel: 'Ver grupos oficiais'
    },
    {
      value: '5',
      label: 'Frentes de Estudo',
      desc: 'Back-End, Tech Girl, Inglês Internacional, Vagas & Mentorias.',
      icon: <BookOpen size={22} className="text-[#246386]" />
    },
    {
      value: '6',
      label: 'Projetos Práticos',
      desc: 'MarquezMatch, RecruitAI, Arena Xeque, Enge PRO, SpeedBet e Bot.',
      icon: <Layers size={22} className="text-[#967189]" />
    },
    {
      value: '100%',
      label: 'Gratuito & Aberto',
      desc: 'Comunidade sem mensalidades, focada em acelerar carreiras reais.',
      icon: <CheckCircle2 size={22} className="text-[#E0A34A]" />
    }
  ];

  return (
    <section id="numeros" aria-labelledby="stats-heading" className="py-16 md:py-24 border-t border-[#E6E9EF]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6E9EF]/10 bg-[#103653]/30 mb-3">
            <Sparkles size={13} className="text-[#E0A34A]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A1AEC2]">
              Impacto & Métricas Reais
            </span>
          </div>
          <h2 id="stats-heading" className="font-display text-2xl md:text-4xl font-bold text-[#E6E9EF] tracking-tight">
            A Resource IT Marquez em números reais.
          </h2>
          <p className="text-sm md:text-base text-[#A1AEC2] max-w-2xl mt-3 leading-relaxed">
            Uma comunidade viva com membros sincronizados diretamente dos canais oficiais.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`p-6 rounded-2xl card-surface flex flex-col justify-between ${
                isTechGirl ? 'card-surface-techgirl' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl border border-[#E6E9EF]/10 bg-[#103653]/40">
                    {stat.icon}
                  </div>
                  <span className="font-mono text-xs text-[#A1AEC2]/50">0{idx + 1}</span>
                </div>
                <div className="font-display text-3xl md:text-4xl font-extrabold text-[#E6E9EF] tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="font-medium text-sm text-[#E6E9EF]/90 mb-2">
                  {stat.label}
                </div>
              </div>
              <div>
                <p className="text-xs text-[#A1AEC2] leading-relaxed mt-2 mb-3">
                  {stat.desc}
                </p>
                {stat.action && (
                  <button
                    type="button"
                    onClick={stat.action}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#E0A34A] hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
                  >
                    <span>{stat.actionLabel}</span>
                    <ExternalLink size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Groups Breakdown Modal */}
      {showGroupsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#030C1E]/85 backdrop-blur-md animate-subir">
          <div className="fixed inset-0 -z-10" onClick={() => setShowGroupsModal(false)} aria-hidden="true" />

          <div 
            role="dialog"
            aria-modal="true"
            className="w-full max-w-2xl bg-[#071528] border border-[#E6E9EF]/15 rounded-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl relative text-left"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E6E9EF]/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl border border-[#E6E9EF]/10 bg-[#103653]/40">
                  <MessageCircle size={20} className="text-[#E0A34A]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#E6E9EF]">Grupos & Canais Oficiais</h3>
                  <p className="text-xs text-[#A1AEC2]">Total de {totalMembers.toLocaleString('pt-BR')} conexões ativas</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setShowGroupsModal(false)}
                className="text-[#A1AEC2] hover:text-[#E6E9EF] text-xs font-mono p-2 cursor-pointer rounded-lg hover:bg-[#103653]/30"
              >
                ✕ Fechar
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {groups.map((g) => (
                <div key={g.id} className="p-4 rounded-2xl border border-[#E6E9EF]/10 bg-[#030C1E]/60 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-[#E6E9EF]">{g.name}</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-[#E6E9EF]/10 bg-[#103653]/40 text-[#E0A34A]">
                        {g.platform}
                      </span>
                    </div>
                    <p className="text-xs text-[#A1AEC2]">{g.description}</p>
                    <span className="font-mono text-[11px] text-emerald-400 mt-1 inline-block">
                      {g.membersCount} participantes • {g.status}
                    </span>
                  </div>

                  <a 
                    href={g.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary shrink-0 px-3.5 py-1.5 text-xs font-semibold text-white cursor-pointer"
                  >
                    Acessar
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
