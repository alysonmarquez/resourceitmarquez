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
            💻 <strong>Bem-vindo ao Estudos Backend</strong><br/>
            Este grupo foi criado para reunir desenvolvedores e estudantes interessados em Back-end. Nosso objetivo é compartilhar conhecimento, resolver dúvidas, estudar em conjunto e evoluir tecnicamente.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">📚 Aqui você encontrará:</h3>
            <ul className="space-y-2 text-[var(--text-color-secondary)] pl-4 list-disc list-inside">
              <li>Materiais de estudo</li>
              <li>Desafios e exercícios</li>
              <li>Discussões sobre arquitetura e boas práticas</li>
              <li>APIs, bancos de dados, autenticação e segurança</li>
              <li>Projetos práticos e colaboração</li>
              <li>Oportunidades e dicas de carreira</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">⚙️ Tecnologias abordadas:</h3>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Java', 'C#/.NET', 'Python', 'PHP', 'Go', 'PostgreSQL', 'MySQL', 'MongoDB', 'Docker', 'Git', 'REST', 'GraphQL', 'Microsserviços', 'Cloud'].map(tech => (
                <span key={tech} className="px-2 py-1 bg-[var(--black)] border border-[var(--medium-dark)] rounded-md text-xs font-medium text-[var(--text-color-secondary)]">
                  {tech}
                </span>
              ))}
              <span className="px-2 py-1 bg-[var(--black)] border border-[var(--medium-dark)] rounded-md text-xs font-medium text-[var(--text-color-secondary)]">
                e muito mais
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
