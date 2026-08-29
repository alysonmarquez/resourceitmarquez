import { Code2, Sparkles, MessageCircle, Briefcase, FolderGit2, Info, ArrowUpRight } from 'lucide-react';
import { GlowCard } from './GlowCard';

interface FrentesSectionProps {
  isTechGirl?: boolean;
  onOpenTechGirlModal: () => void;
  onOpenProjectsModal: () => void;
  onOpenAboutModal: () => void;
}

export function FrentesSection({ 
  isTechGirl, 
  onOpenTechGirlModal, 
  onOpenProjectsModal, 
  onOpenAboutModal 
}: FrentesSectionProps) {
  const frentes = [
    {
      id: 'backend',
      title: 'Estudos Back-End',
      tag: 'Especialização',
      desc: 'Imersão em arquitetura de microsserviços, APIs REST, Node.js, C#, Java, PostgreSQL e boas práticas de engenharia de software.',
      icon: <Code2 size={20} className={isTechGirl ? 'text-[#967189]' : 'text-[#246386]'} />,
      link: 'https://chat.whatsapp.com/FuwkXEqEUtnGeOxSmVAjGj',
      isExternal: true,
      actionText: 'Entrar no grupo de Back-End'
    },
    {
      id: 'techgirl',
      title: 'Comunidade Tech Girl',
      tag: 'Exclusivo para Mulheres',
      desc: 'Espaço seguro, focado em apoiar, mentorar e acelerar a presença e liderança de mulheres cis e trans no ecossistema tech.',
      icon: <Sparkles size={20} className="text-[#967189]" />,
      onClick: onOpenTechGirlModal,
      isExternal: false,
      actionText: 'Conhecer Tech Girl & Regras',
      highlight: true
    },
    {
      id: 'english',
      title: 'Aulas de Inglês Gratuitas',
      tag: 'Internacional',
      desc: 'Encontros de conversação e aulas temáticas voltadas para o dia a dia de desenvolvedores e processos seletivos globais.',
      icon: <MessageCircle size={20} className={isTechGirl ? 'text-[#967189]' : 'text-[#246386]'} />,
      link: 'https://chat.whatsapp.com/CDeeiIrv3evLFU8U61dxuw?s=sw&p=i&mlu=0&ilr=0',
      isExternal: true,
      actionText: 'Acessar aulas no WhatsApp'
    },
    {
      id: 'vagas',
      title: 'Vagas & Oportunidades Tech',
      tag: 'Carreira',
      desc: 'Compartilhamento em tempo real de vagas de emprego, estágios, posições Jr/Pleno e freelas enviados pela comunidade.',
      icon: <Briefcase size={20} className="text-[#E0A34A]" />,
      link: 'https://chat.whatsapp.com/LbQSl8Q2tjcGluF2He3zI6',
      isExternal: true,
      actionText: 'Acessar grupo de Vagas'
    },
    {
      id: 'projetos',
      title: 'Projetos em Andamento',
      tag: 'Hands-on',
      desc: 'Trabalhe em equipe construindo plataformas reais como MarquezMatch, RecruitAI e Arena Xeque com versionamento no GitHub.',
      icon: <FolderGit2 size={20} className={isTechGirl ? 'text-[#967189]' : 'text-[#246386]'} />,
      onClick: onOpenProjectsModal,
      isExternal: false,
      actionText: 'Explorar projetos ativos'
    },
    {
      id: 'sobre',
      title: 'Sobre a Comunidade',
      tag: 'Conheça Mais',
      desc: 'Entenda os pilares, propósito, regras de convivência e como funciona a colaboração diária na Resource IT Marquez.',
      icon: <Info size={20} className="text-[#E0A34A]" />,
      onClick: onOpenAboutModal,
      isExternal: false,
      actionText: 'Ler sobre a Resource IT'
    }
  ];

  return (
    <section id="frentes" aria-labelledby="frentes-heading" className="py-16 md:py-24 border-t border-[#E6E9EF]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6E9EF]/10 bg-[#103653]/30 mb-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A1AEC2]">
              Frentes de Atuação
            </span>
          </div>
          <h2 id="frentes-heading" className="font-display text-2xl md:text-4xl font-bold text-[#E6E9EF] tracking-tight">
            Tudo o que você precisa para acelerar sua jornada.
          </h2>
          <p className="text-sm md:text-base text-[#A1AEC2] max-w-2xl mt-2 leading-relaxed">
            Ambientes focados em áreas estratégicas para você estudar, praticar e se conectar com outros desenvolvedores.
          </p>
        </div>

        {/* 6 Cards Grid (3 columns on desktop) with Glow Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {frentes.map((frente) => (
            <GlowCard 
              key={frente.id}
              className={`p-6 ${
                frente.highlight 
                  ? 'border-[#967189]/40 card-surface-techgirl' 
                  : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl border border-[#E6E9EF]/10 bg-[#103653]/30">
                    {frente.icon}
                  </div>
                  <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                    frente.highlight 
                      ? 'badge-rose' 
                      : 'badge-tech'
                  }`}>
                    {frente.tag}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-[#E6E9EF] mb-2">
                  {frente.title}
                </h3>
                <p className="text-xs text-[#A1AEC2] leading-relaxed mb-6">
                  {frente.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E6E9EF]/10">
                {frente.isExternal ? (
                  <a 
                    href={frente.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E6E9EF] hover:text-white transition-colors"
                  >
                    <span>{frente.actionText}</span>
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <button 
                    type="button" 
                    onClick={frente.onClick}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E6E9EF] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    <span>{frente.actionText}</span>
                    <ArrowUpRight size={14} />
                  </button>
                )}
              </div>
            </GlowCard>
          ))}
        </div>

      </div>
    </section>
  );
}
