import { useState, useEffect } from 'react';
import { X, ArrowLeft, UserCheck, Heart, Sparkles, ChevronRight } from 'lucide-react';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExperience: (theme: 'general' | 'techgirl') => void;
}

export function ExperienceModal({ isOpen, onClose, onSelectExperience }: ExperienceModalProps) {
  const [view, setView] = useState<'main' | 'lgbt'>('main');

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setView('main'), 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelect = (option: string) => {
    if (option === 'mulher_cis' || option === 'mulher_trans') {
      onSelectExperience('techgirl');
      onClose();
    } else if (option === 'lgbt') {
      setView('lgbt');
    } else {
      onSelectExperience('general');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#030C1E]/85 backdrop-blur-md animate-subir">
      <div className="fixed inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="exp-modal-title"
        className="w-full max-w-lg bg-[#071528] border border-[#E6E9EF]/15 rounded-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl relative"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#E6E9EF]/10 mb-6">
          <div className="flex items-center gap-2.5">
            {view === 'lgbt' ? (
              <button 
                type="button"
                className="p-1.5 rounded-lg hover:bg-[#103653]/40 text-[#A1AEC2] hover:text-[#E6E9EF] transition-colors cursor-pointer mr-1" 
                onClick={() => setView('main')}
                aria-label="Voltar"
              >
                <ArrowLeft size={18} />
              </button>
            ) : (
              <div className="w-2.5 h-2.5 rounded-full bg-[#1D5171]" />
            )}
            <h2 id="exp-modal-title" className="font-display text-lg sm:text-xl font-bold text-[#E6E9EF]">
              Personalizar Experiência
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
        
        <div className="space-y-5 text-left">
          <p className="text-xs sm:text-sm text-[#A1AEC2] leading-relaxed">
            {view === 'main' 
              ? <>Para personalizar sua experiência visual e ter acesso prioritário aos canais adequados, selecione uma opção abaixo.</>
              : <>Para direcionarmos você ao espaço mais adequado da comunidade, especifique:</>
            }
          </p>

          <div className="flex flex-col gap-2.5">
            {view === 'main' ? (
              <>
                <button 
                  type="button"
                  className="flex items-center justify-between p-4 rounded-2xl border border-[#E6E9EF]/10 bg-[#103653]/20 hover:bg-[#103653]/40 hover:border-[#1D5171] transition-all cursor-pointer text-left group"
                  onClick={() => handleSelect('mulher_cis')}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-[#967189]/20 text-[#E6E9EF]">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-[#E6E9EF]">Mulher (Cisgênero)</div>
                      <div className="text-[11px] text-[#A1AEC2]">Acesso prioritário ao Tech Girl</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[#A1AEC2] group-hover:text-[#E6E9EF]" />
                </button>

                <button 
                  type="button"
                  className="flex items-center justify-between p-4 rounded-2xl border border-[#E6E9EF]/10 bg-[#103653]/20 hover:bg-[#103653]/40 hover:border-[#1D5171] transition-all cursor-pointer text-left group"
                  onClick={() => handleSelect('homem_cis')}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-[#1D5171]/30 text-[#E6E9EF]">
                      <UserCheck size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-[#E6E9EF]">Homem (Cisgênero)</div>
                      <div className="text-[11px] text-[#A1AEC2]">Comunidade Geral, Back-End e Vagas</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[#A1AEC2] group-hover:text-[#E6E9EF]" />
                </button>

                <button 
                  type="button"
                  className="flex items-center justify-between p-4 rounded-2xl border border-[#E6E9EF]/10 bg-[#103653]/20 hover:bg-[#103653]/40 hover:border-[#1D5171] transition-all cursor-pointer text-left group"
                  onClick={() => handleSelect('lgbt')}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-[#E0A34A]/20 text-[#E0A34A]">
                      <Heart size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-[#E6E9EF]">Comunidade LGBTQIA+</div>
                      <div className="text-[11px] text-[#A1AEC2]">Identidades trans, não-binárias e diversas</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[#A1AEC2] group-hover:text-[#E6E9EF]" />
                </button>
              </>
            ) : (
              <>
                <button 
                  type="button"
                  className="flex items-center justify-between p-4 rounded-2xl border border-[#E6E9EF]/10 bg-[#103653]/20 hover:bg-[#103653]/40 hover:border-[#1D5171] transition-all cursor-pointer text-left group"
                  onClick={() => handleSelect('mulher_trans')}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-[#967189]/20 text-[#E6E9EF]">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-[#E6E9EF]">Mulher Trans / Travesti</div>
                      <div className="text-[11px] text-[#A1AEC2]">100% bem-vinda ao espaço Tech Girl</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[#A1AEC2] group-hover:text-[#E6E9EF]" />
                </button>

                <button 
                  type="button"
                  className="flex items-center justify-between p-4 rounded-2xl border border-[#E6E9EF]/10 bg-[#103653]/20 hover:bg-[#103653]/40 hover:border-[#1D5171] transition-all cursor-pointer text-left group"
                  onClick={() => handleSelect('geral')}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-[#1D5171]/30 text-[#E6E9EF]">
                      <UserCheck size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-[#E6E9EF]">Homem Trans / Não-Binário / Outros</div>
                      <div className="text-[11px] text-[#A1AEC2]">Comunidade Geral e grupos de estudo</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[#A1AEC2] group-hover:text-[#E6E9EF]" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
