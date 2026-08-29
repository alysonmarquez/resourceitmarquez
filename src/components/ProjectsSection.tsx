import { Terminal, GitBranch, Layers, ArrowUpRight, Sparkles, Globe } from 'lucide-react';

interface ProjectsSectionProps {
  isTechGirl?: boolean;
  onOpenProjectsModal: () => void;
}

export function ProjectsSection({ isTechGirl, onOpenProjectsModal }: ProjectsSectionProps) {
  const projects = [
    {
      id: 'marquezmatch',
      name: 'MarquezMatch',
      badge: 'IA & Otimização de Currículos',
      status: 'No Ar • 100% Online',
      statusType: 'gold',
      desc: 'Plataforma inteligente de análise curricular com IA, otimização estratégica para LinkedIn e matching semântico de vagas tech.',
      stack: ['Next.js', 'AI Agents', 'LinkedIn API', 'Tailwind CSS'],
      link: 'https://www.marquezmatch.online/'
    },
    {
      id: 'recruitai',
      name: 'RecruitAI',
      badge: 'Inteligência Artificial',
      status: 'Em Desenvolvimento',
      statusType: 'ocean',
      desc: 'Plataforma inteligente de triagem automática de currículos com extração de skills e correspondência semântica de vagas tech.',
      stack: ['Next.js 15', 'TypeScript', 'Google Gemini API', 'FastAPI'],
      link: 'https://github.com/alysonmarquez'
    },
    {
      id: 'arena-xeque',
      name: 'Arena Xeque ♟️',
      badge: 'Full Stack & WebSockets',
      status: 'Em Andamento',
      statusType: 'ocean',
      desc: 'Ambiente multiplayer de xadrez online competitivo em tempo real com ranking ELO, matchmaking e análise de partidas.',
      stack: ['React', 'Node.js', 'Socket.IO', 'PostgreSQL', 'Redis'],
      link: 'https://github.com/alysonmarquez'
    },
    {
      id: 'enge-pro',
      name: 'Enge PRO',
      badge: 'SaaS Empresarial',
      status: 'Planejamento',
      statusType: 'ocean',
      desc: 'Sistema SaaS completo voltado para construtoras e engenharia civil, centralizando relatórios de obras, orçamentos e cronogramas.',
      stack: ['React', 'TypeScript', 'Prisma ORM', 'Docker', 'AWS'],
      link: 'https://github.com/alysonmarquez'
    },
    {
      id: 'speedbet',
      name: 'Projeto SpeedBet',
      badge: 'Fintech & Algoritmos',
      status: 'Em Andamento',
      statusType: 'ocean',
      desc: 'Plataforma de alta performance para processamento assíncrono de eventos, estatísticas e integração direta com APIs.',
      stack: ['C# .NET 9', 'RabbitMQ', 'PostgreSQL', 'Grafana'],
      link: 'https://github.com/alysonmarquez'
    },
    {
      id: 'marquezzdev_bot',
      name: 'MarquezzDev Bot',
      badge: 'Automação & Webhooks',
      status: 'Ativo • 24/7',
      statusType: 'ocean',
      desc: 'Bot avançado de WhatsApp e Telegram com monitoramento contínuo de grupos, agregador de vagas tech e notificações automáticas.',
      stack: ['Node.js', 'whatsapp-web.js', 'Puppeteer', 'Axios'],
      link: 'https://github.com/alysonmarquez/marquezzdev_bot'
    }
  ];

  return (
    <section id="projetos" aria-labelledby="projetos-heading" className="py-16 md:py-24 border-t border-[#E6E9EF]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6E9EF]/10 bg-[#103653]/30 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A1AEC2]">
                Iniciativas Práticas
              </span>
            </div>
            <h2 id="projetos-heading" className="font-display text-2xl md:text-4xl font-bold text-[#E6E9EF] tracking-tight">
              Projetos construídos pela comunidade.
            </h2>
            <p className="text-sm md:text-base text-[#A1AEC2] max-w-xl mt-2 leading-relaxed">
              Aqui ninguém estuda só teoria. Trabalhamos em equipe em projetos open-source e produtos reais para gerar portfólio de alto nível.
            </p>
          </div>

          <button 
            type="button" 
            onClick={onOpenProjectsModal}
            className="btn-secondary inline-flex items-center gap-2 px-4 py-2.5 text-xs cursor-pointer"
          >
            <Layers size={15} />
            <span>Ver detalhes de todos</span>
          </button>
        </div>

        {/* 3 Columns Grid on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((proj) => (
            <div 
              key={proj.id}
              className={`p-6 rounded-2xl card-surface flex flex-col justify-between group ${
                isTechGirl ? 'card-surface-techgirl' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl border border-[#E6E9EF]/10 bg-[#103653]/30">
                      <Terminal size={18} className={isTechGirl ? 'text-[#967189]' : 'text-[#246386]'} />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-[#E6E9EF] group-hover:text-white transition-colors">
                        {proj.name}
                      </h3>
                      <span className="font-mono text-[11px] text-[#A1AEC2]">
                        {proj.badge}
                      </span>
                    </div>
                  </div>

                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    proj.statusType === 'gold' 
                      ? 'badge-gold' 
                      : 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  }`}>
                    {proj.status}
                  </span>
                </div>

                <p className="text-xs text-[#A1AEC2] leading-relaxed mb-5">
                  {proj.desc}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.stack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-0.5 rounded-md border border-[#E6E9EF]/5 bg-[#030C1E]/50 text-[10px] font-mono text-[#A1AEC2]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E6E9EF]/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#A1AEC2]/70">
                  <GitBranch size={12} />
                  <span className="truncate max-w-[130px]">{proj.id}</span>
                </div>

                <a 
                  href={proj.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#E6E9EF] hover:text-white transition-colors"
                >
                  <span>Acessar</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
