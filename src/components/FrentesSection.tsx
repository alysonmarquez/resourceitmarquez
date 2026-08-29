import { 
  Code2, 
  Sparkles, 
  MessageCircle, 
  Briefcase, 
  Terminal, 
  Users, 
  ArrowUpRight 
} from 'lucide-react';

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
      title: 'Grupo de Ofertas & Vagas',
      tag: 'Carreira',
      desc: 'Compartilhamento diário de oportunidades para estágio, Jr, Pleno, além de cupons e descontos educacionais exclusivos.',
      icon: <Briefcase size={20} className={isTechGirl ? 'text-[#967189]' : 'text-[#E0A34A]'} />,
      link: 'https://chat.whatsapp.com/Hwfpb0H9atAHnKom9HMq4s',
      isExternal: true,
      actionText: 'Ver vagas & oportunidades'
    },
    {
      id: 'projetos',
      title: 'Projetos em Andamento',
      tag: 'Hands-on',
      desc: 'Trabalhe em equipe construindo plataformas reais como RecruitAI e Arena Xeque com versionamento no GitHub e code review.',
      icon: <Terminal size={20} className={isTechGirl ? 'text-[#967189]' : 'text-[#246386]'} />,
      onClick: onOpenProjectsModal,
      isExternal: false,
      actionText: 'Ver projetos ativos'
    },
    {
      id: 'sobre',
      title: 'Sobre a Comunidade',
      tag: 'Manifesto',
      desc: 'Nossa história, fundação em 07/05/2025, regras de convivência e a visão de democratizar o acesso à carreira de tecnologia.',
      icon: <Users size={20} className={isTechGirl ? 'text-[#967189]' : 'text-[#246386]'} />,
      onClick: onOpenAboutModal,
      isExternal: false,
      actionText: 'Ler manifesto e regras'
    }
  ];

  return (
    <section id="frentes" aria-labelledby="frentes-heading" className="py-16 md:py-24 border-t border-[#E6E9EF]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6E9EF]/10 bg-[#103653]/30 mb-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A1AEC2]">
              Pilares & Ecossistema
            </span>
          </div>
          <h2 id="frentes-heading" className="font-display text-2xl md:text-4xl font-bold text-[#E6E9EF] tracking-tight">
            Frentes ativas da Resource IT Marquez.
          </h2>
          <p className="text-sm md:text-base text-[#A1AEC2] max-w-xl mt-2 leading-relaxed">
            Escolha sua trilha, entre nos grupos e acelere sua evolução técnica com suporte da comunidade.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {frentes.map((item) => (
            <div 
              key={item.id}
              className={`p-6 rounded-2xl card-surface flex flex-col justify-between group ${
                item.highlight 
                  ? 'border-[#967189]/40 bg-[#103653]/20 shadow-[0_4px_25px_-5px_rgba(150,113,137,0.2)]' 
                  : ''
              } ${isTechGirl ? 'card-surface-techgirl' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl border border-[#E6E9EF]/10 bg-[#103653]/30">
                    {item.icon}
                  </div>
                  <span className={`font-mono text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                    item.highlight 
                      ? 'badge-rose' 
                      : 'badge-tech'
                  }`}>
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-[#E6E9EF] mb-2 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#A1AEC2] leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              {/* Action */}
              {item.isExternal ? (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl border border-[#E6E9EF]/10 bg-[#030C1E]/50 hover:bg-[#1D5171]/40 hover:border-[#246386]/60 text-xs font-semibold text-[#E6E9EF] transition-all"
                >
                  <span>{item.actionText}</span>
                  <ArrowUpRight size={14} className="text-[#A1AEC2] group-hover:text-[#E6E9EF]" />
                </a>
              ) : (
                <button 
                  type="button" 
                  onClick={item.onClick}
                  className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl border border-[#E6E9EF]/10 bg-[#030C1E]/50 hover:bg-[#1D5171]/40 hover:border-[#246386]/60 text-xs font-semibold text-[#E6E9EF] transition-all cursor-pointer text-left"
                >
                  <span>{item.actionText}</span>
                  <ArrowUpRight size={14} className="text-[#A1AEC2] group-hover:text-[#E6E9EF]" />
                </button>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
