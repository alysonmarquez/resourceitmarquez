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
    <>
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal-box animate-subir">
        <div className="modal__header">
          <div className="flex items-center gap-2.5">
            <div className={`w-2.5 h-2.5 rounded-full ${isTechGirl ? 'bg-[#967189]' : 'bg-[#1D5171]'}`} />
            <h2 className="modal__title">Sobre nós</h2>
          </div>
          <button className="modal__close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>
        
        <div className="modal__body space-y-5">
          <div className="p-4 rounded-xl border border-[#E6E9EF]/10 bg-[#030C1E]/50">
            <p className="text-xs md:text-sm text-[#E6E9EF] leading-relaxed">
              🚀 <strong>Bem-vindo(a) à Comunidade Resource IT Marquez</strong>
              <br /><br />
              Nascemos para democratizar o acesso ao conhecimento, conectar desenvolvedores e acelerar carreiras na área de tecnologia através de colaboração ativa e mentorias.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#A1AEC2]">
              Nossas Frentes de Atuação
            </h3>
            <div className="flex flex-col gap-2">
              {frentes.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-3 rounded-xl border border-[#E6E9EF]/10 bg-[#103653]/20 hover:bg-[#103653]/40 transition-colors"
                >
                  <div className="mt-0.5 shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="text-xs font-bold text-[#E6E9EF]">{item.name}</h4>
                    <p className="text-[11px] text-[#A1AEC2] leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#A1AEC2]">
              Áreas de Domínio
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tech) => (
                <span 
                  key={tech} 
                  className="badge-tech px-2.5 py-1 rounded-lg text-xs font-mono font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
