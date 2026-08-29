import { X, Sparkles, Code2, Globe2, FolderGit2, Briefcase } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  isTechGirl?: boolean;
}

export function AboutModal({ isOpen, onClose, isTechGirl }: AboutModalProps) {
  if (!isOpen) return null;

  const frentes = [
    {
      icon: <Sparkles size={16} className="text-[#967189]" />,
      name: 'Tech Girl',
      desc: 'Inclusão, apoio e aceleração prática de mulheres na área de tecnologia.'
    },
    {
      icon: <Code2 size={16} className="text-[#246386]" />,
      name: 'Estudos Back-End',
      desc: 'Arquitetura de software, APIs RESTful, microsserviços e bancos de dados.'
    },
    {
      icon: <Globe2 size={16} className="text-[#246386]" />,
      name: 'Aulas de Inglês',
      desc: 'Grupos de conversação e encontros gratuitos voltados para o mercado internacional.'
    },
    {
      icon: <FolderGit2 size={16} className="text-[#246386]" />,
      name: 'Projetos Práticos',
      desc: 'Desenvolvimento colaborativo de projetos reais para construção de portfólio.'
    },
    {
      icon: <Briefcase size={16} className="text-[#E0A34A]" />,
      name: 'Carreira & Mentorias',
      desc: 'Análise de currículo, LinkedIn, preparação para entrevistas e troca de vagas.'
    }
  ];

  const tags = ['Back-End', 'Front-End', 'Cloud', 'DevOps', 'Data', 'QA', 'English', 'Mentoria'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#030C1E]/85 backdrop-blur-md animate-subir">
      {/* Click outside backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Card */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-title"
        className="w-full max-w-lg bg-[#071528] border border-[#E6E9EF]/15 rounded-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E6E9EF]/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className={`w-2.5 h-2.5 rounded-full ${isTechGirl ? 'bg-[#967189]' : 'bg-[#1D5171]'}`} />
            <h2 id="about-modal-title" className="font-display text-lg sm:text-xl font-bold text-[#E6E9EF]">
              Sobre a Comunidade
            </h2>
          </div>
          <button 
            type="button"
            className="p-2 rounded-xl text-[#A1AEC2] hover:text-[#E6E9EF] hover:bg-[#103653]/40 transition-colors cursor-pointer" 
            onClick={onClose} 
            aria-label="Fechar modal"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Body */}
        <div className="space-y-6">
          {/* Welcome Box */}
          <div className="p-4 sm:p-5 rounded-2xl border border-[#E6E9EF]/10 bg-[#030C1E]/60 text-left">
            <h3 className="text-sm font-bold text-[#E6E9EF] mb-2">
              🚀 Bem-vindo(a) à Resource IT Marquez
            </h3>
            <p className="text-xs sm:text-sm text-[#A1AEC2] leading-relaxed">
              Nascemos em <strong>07/05/2025</strong> com o propósito de democratizar o acesso ao conhecimento, conectar desenvolvedores de todos os níveis e acelerar carreiras na área de tecnologia através de colaboração ativa, projetos práticos e mentorias gratuitas.
            </p>
          </div>

          {/* Pillars List */}
          <div className="space-y-3 text-left">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#E0A34A]">
              Nossas Frentes de Atuação
            </h3>
            <div className="flex flex-col gap-2.5">
              {frentes.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3.5 p-3.5 rounded-xl border border-[#E6E9EF]/10 bg-[#103653]/20 hover:bg-[#103653]/40 transition-colors"
                >
                  <div className="mt-0.5 p-2 rounded-lg bg-[#030C1E]/50 border border-[#E6E9EF]/10 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#E6E9EF]">{item.name}</h4>
                    <p className="text-[11px] sm:text-xs text-[#A1AEC2] leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Domain Tags */}
          <div className="space-y-3 pt-1 text-left">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#A1AEC2]">
              Áreas de Domínio
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tech) => (
                <span 
                  key={tech} 
                  className="badge-tech px-3 py-1 rounded-lg text-xs font-mono font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
