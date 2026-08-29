import { X, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

interface TechGirlWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TechGirlWarningModal({ isOpen, onClose }: TechGirlWarningModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#030C1E]/85 backdrop-blur-md animate-subir">
      <div className="fixed inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="techgirl-modal-title"
        className="w-full max-w-md bg-[#071528] border border-[#967189]/40 rounded-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-[0_0_40px_-10px_rgba(150,113,137,0.3)] relative text-left"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#967189]/20 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#967189] animate-pulse-dot" />
            <h2 id="techgirl-modal-title" className="font-display text-lg sm:text-xl font-bold text-[#E6E9EF]">
              Comunidade Tech Girl
            </h2>
          </div>
          <button 
            type="button"
            className="p-2 rounded-xl text-[#A1AEC2] hover:text-[#E6E9EF] hover:bg-[#103653]/40 transition-colors cursor-pointer" 
            onClick={onClose} 
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="space-y-5">
          <div className="p-4 sm:p-5 bg-[#967189]/10 border border-[#967189]/30 rounded-2xl">
            <div className="flex items-center gap-2 mb-2.5 text-[#E6E9EF] font-semibold text-xs uppercase font-mono tracking-wider">
              <AlertCircle size={16} className="text-[#967189]" />
              <span>Atenção & Regras de Acesso</span>
            </div>
            <p className="text-xs sm:text-sm text-[#A1AEC2] leading-relaxed">
              A comunidade <strong className="text-[#E6E9EF]">Tech Girl</strong> é um espaço seguro e exclusivo para mulheres cis e mulheres trans. 
            </p>
            <p className="text-xs sm:text-sm text-[#A1AEC2] leading-relaxed mt-2.5">
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
            className="btn-primary w-full flex items-center justify-center gap-2 p-3.5 text-center text-white font-semibold text-sm cursor-pointer shadow-lg"
          >
            <span>Entendi, quero entrar no grupo</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
