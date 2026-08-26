import { X, ExternalLink } from 'lucide-react';

interface TechGirlWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TechGirlWarningModal({ isOpen, onClose }: TechGirlWarningModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal__backdrop" onClick={onClose}></div>
      <div className="modal-box !border-[#e83e8c55]">
        <div className="modal__header">
          <h2 className="modal__title text-white">Comunidade Tech Girl</h2>
          <button className="modal__close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal__body space-y-6">
          <div className="p-4 bg-[#e83e8c11] border border-[#e83e8c55] rounded-xl text-[#f3f4f6]">
            <p className="font-medium text-[#e83e8c] mb-2">Atenção!</p>
            <p className="text-sm leading-relaxed text-[var(--text-color-secondary)]">
              A comunidade Tech Girl é exclusiva para mulheres cis e mulheres trans. 
              Para sua aprovação no grupo, você precisará <strong className="text-white">deixar a foto do seu perfil do WhatsApp visível publicamente</strong>.
            </p>
            <p className="text-sm leading-relaxed text-[var(--text-color-secondary)] mt-3">
              Após a aprovação, você poderá voltar a foto do perfil para as configurações normais, se desejar.
            </p>
          </div>

          <a 
            href="https://chat.whatsapp.com/KL38MjM87Z79KjY7TmzCkG"
            target="_blank" 
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 p-4 text-center border border-[#e83e8c] bg-[#e83e8c22] rounded-xl hover:bg-[#e83e8c44] transition-all text-white font-medium"
          >
            Entendi, quero entrar
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </>
  );
}
