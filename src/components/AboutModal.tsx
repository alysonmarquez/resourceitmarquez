import { X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal__backdrop" onClick={onClose}></div>
      <div className="modal-box">
        <div className="modal__header">
          <h2 className="modal__title">Sobre nós</h2>
          <button className="modal__close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal__body space-y-6">
          <p className="text-[var(--text-color-secondary)] leading-relaxed">
            🚀 <strong>Bem-vindo(a) à Comunidade Resource IT Marquez</strong><br/><br/>
            Nascemos para democratizar o acesso ao conhecimento, conectar pessoas e acelerar a evolução profissional na área de tecnologia.
            Nossa comunidade abriga diversas frentes, focadas em promover desde os primeiros passos até a alta especialização.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">🌟 Nossas Frentes:</h3>
            <ul className="space-y-2 text-[var(--text-color-secondary)] pl-4 list-disc list-inside">
              <li><strong>Tech Girl:</strong> Focado na inclusão, apoio e aceleração de mulheres na tecnologia.</li>
              <li><strong>Estudos Back-End:</strong> Compartilhamento de conhecimento profundo sobre arquitetura, APIs e bancos de dados.</li>
              <li><strong>Aulas de Inglês:</strong> Grupos de conversação e ensino gratuitos para capacitação internacional.</li>
              <li><strong>Projetos Colaborativos:</strong> Construção de portfólio real trabalhando em equipe.</li>
              <li><strong>Carreira & Ofertas:</strong> Troca de vagas, mentoria e dicas para o mercado de trabalho.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">⚙️ Tecnologias e Áreas:</h3>
            <div className="flex flex-wrap gap-2">
              {['Back-End', 'Front-End', 'Cloud', 'DevOps', 'Data Science', 'QA', 'English', 'Mentoria'].map(tech => (
                <span key={tech} className="px-2 py-1 bg-[var(--black)] border border-[var(--medium-dark)] rounded-md text-xs font-medium text-[var(--text-color-secondary)]">
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
