import { X, Terminal, GitBranch, ArrowUpRight } from 'lucide-react';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isTechGirl?: boolean;
}

export function ProjectsModal({ isOpen, onClose, isTechGirl }: ProjectsModalProps) {
  if (!isOpen) return null;

  const projects = [
    { 
      name: "MarquezMatch",
      category: "IA & Otimização (Next.js, AI Agents, LinkedIn)",
      status: "No Ar • 100% Online",
      desc: "Plataforma inteligente para análise curricular, matching de vagas e otimização de perfil no LinkedIn.",
      link: "https://www.marquezmatch.online/"
    },
    { 
      name: "Projeto RecruitAI",
      category: "IA & Recrutamento (Next.js 15, Gemini API)",
      status: "Em Desenvolvimento",
      desc: "Plataforma inteligente para triagem de currículos e matching semântico de candidatos a vagas tech.",
      link: "https://github.com/alysonmarquez"
    },
    { 
      name: "Arena Xeque ♟️",
      category: "Full Stack & WebSockets (React, Node.js, Socket.IO)",
      status: "Em Andamento",
      desc: "Plataforma competitiva de xadrez online em tempo real com ranking ELO e análise de partidas.",
      link: "https://github.com/alysonmarquez"
    },
    { 
      name: "Enge PRO",
      category: "SaaS & Gestão (TypeScript, Prisma, Docker)",
      status: "Planejamento",
      desc: "Software completo para gerenciamento de obras, relatórios de medição e engenharia civil.",
      link: "https://github.com/alysonmarquez"
    },
    { 
      name: "Projeto SpeedBet",
      category: "Fintech & Algoritmos (C# .NET 9, PostgreSQL)",
      status: "Em Andamento",
      desc: "Sistema de análise e automação com alta performance e integração assíncrona de APIs.",
      link: "https://github.com/alysonmarquez"
    },
    { 
      name: "Resource IT Hub & Monitor",
      category: "Landing Page & Webhooks (React 19, Tailwind v4)",
      status: "Em Produção",
      desc: "Hub central da comunidade com monitor de atividade em tempo real e webhooks do WhatsApp.",
      link: "https://github.com/alysonmarquez/resourceitmarquez"
    },
    { 
      name: "MarquezzDev Bot",
      category: "Automação & Webhooks (Node.js, whatsapp-web.js)",
      status: "Ativo • 24/7",
      desc: "Bot oficial com monitoramento contínuo de grupos, envio de vagas tech e sincronização em tempo real.",
      link: "https://github.com/alysonmarquez/marquezzdev_bot"
    }
  ];

  return (
    <>
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal-box animate-subir max-w-xl">
        <div className="modal__header">
          <div className="flex items-center gap-2.5">
            <div className={`w-2.5 h-2.5 rounded-full ${isTechGirl ? 'bg-[#967189]' : 'bg-[#1D5171]'}`} />
            <h2 className="modal__title">Projetos em Andamento ({projects.length})</h2>
          </div>
          <button className="modal__close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>
        
        <div className="modal__body space-y-4 max-h-[70vh] overflow-y-auto">
          <p className="text-xs text-[#A1AEC2]">
            Iniciativas criadas por membros da comunidade para prática real, trabalho em equipe e geração de portfólio.
          </p>

          <div className="flex flex-col gap-2.5">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="flex flex-col gap-2 p-3.5 border border-[#E6E9EF]/10 rounded-xl bg-[#103653]/20 hover:bg-[#103653]/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal size={15} className={isTechGirl ? 'text-[#967189]' : 'text-[#246386]'} />
                    <span className="font-semibold text-[#E6E9EF] text-sm">{project.name}</span>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    {project.status}
                  </span>
                </div>
                
                <p className="text-xs text-[#A1AEC2] leading-normal">
                  {project.desc}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-[#E6E9EF]/10">
                  <div className="flex items-center gap-1.5">
                    <GitBranch size={12} className="text-[#A1AEC2]/60" />
                    <span className="font-mono text-[11px] text-[#A1AEC2]">
                      {project.category}
                    </span>
                  </div>

                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono font-medium text-[#E6E9EF] hover:text-white"
                  >
                    <span>Acessar</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
