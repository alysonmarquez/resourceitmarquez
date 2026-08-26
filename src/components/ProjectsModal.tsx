import { X } from 'lucide-react';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectsModal({ isOpen, onClose }: ProjectsModalProps) {
  if (!isOpen) return null;

  const projects = [
    { name: "Projeto RecruitAI" },
    { name: "Arena Xeque ♟️" },
    { name: "Enge PRO" },
    { name: "Projeto: SpeedBet" }
  ];

  return (
    <>
      <div className="modal__backdrop" onClick={onClose}></div>
      <div className="modal-box">
        <div className="modal__header">
          <h2 className="modal__title">Projetos em andamento</h2>
          <button className="modal__close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal__body">
          <div className="flex flex-col gap-3 mt-4">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 border border-[var(--medium-dark)] rounded-xl bg-[var(--black)] transition-colors"
              >
                <span className="font-medium text-white text-[14px]">{project.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
