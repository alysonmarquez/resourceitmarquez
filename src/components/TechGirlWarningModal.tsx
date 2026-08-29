import { X, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

interface TechGirlWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TechGirlWarningModal({ isOpen, onClose }: TechGirlWarningModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal-box animate-subir !border-[#967189]/40 shadow-[0_0_40px_-10px_rgba(150,113,137,0.3)]">
        <div className="modal__header !border-[#967189]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#967189] animate-pulse-dot" />
            <h2 className="modal__title text-[#E6E9EF]">Comunidade Tech Girl</h2>
          </div>
          <button className="modal__close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>
        
        <div className="modal__body space-y-5">
          <div className="p-4 bg-[#967189]/10 border border-[#967189]/30 rounded-xl">
            <div className="flex items-center gap-2 mb-2 text-[#E6E9EF] font-semibold text-xs uppercase font-mono tracking-wider">
              <AlertCircle size={15} className="text-[#967189]" />
              <span>Atenção & Regras de Acesso</span>
            </div>
            <p className="text-xs text-[#A1AEC2] leading-relaxed">
              A comunidade <strong className="text-[#E6E9EF]">Tech Girl</strong> é um espaço seguro e exclusivo para mulheres cis e mulheres trans. 
            </p>
            <p className="text-xs text-[#A1AEC2] leading-relaxed mt-2.5">
              Para validação e aprovação rápida na entrada, pedimos que você <strong className="text-[#E6E9EF] underline underline-offset-2">mantenha a foto do seu perfil do WhatsApp visível publicamente</strong>.
            </p>
            <p className="text-[11px] text-[#A1AEC2]/70 leading-relaxed mt-2">
              Após a aprovação, você poderá retornar suas configurações normais de privacidade, caso prefira.
            </p>
          </div>

          <a 
            href="https://chat.whatsapp.com/KL38MjM87Z79KjY7TmzCkG"
            target="_blank" 
            rel="noopener noreferrer"
            onClick={onClose}
            className="btn-primary w-full flex items-center justify-center gap-2 p-3.5 text-center text-white font-semibold text-sm cursor-pointer"
          >
            <span>Entendi, quero entrar no grupo</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </>
  );
}
