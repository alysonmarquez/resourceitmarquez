import { useState, useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';

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
    <>
      <div className="modal__backdrop" onClick={onClose}></div>
      <div className="modal-box">
        <div className="modal__header">
          {view === 'lgbt' ? (
            <button className="text-[var(--text-color-secondary)] hover:text-white transition-colors mr-2" onClick={() => setView('main')}>
              <ArrowLeft size={20} />
            </button>
          ) : null}
          <h2 className="modal__title">Personalizar experiência</h2>
          <button className="modal__close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal__body space-y-6">
          <p className="text-[var(--text-color-secondary)]">
            {view === 'main' 
              ? <>Para ajustar a experiência visual da comunidade, informe como você prefere seguir.<br/><br/>A escolha define quais grupos aparecem primeiro e salva a preferência neste dispositivo.</>
              : <>Por favor, especifique para podermos direcionar você à melhor experiência dentro da nossa comunidade.</>
            }
          </p>

          <div className="flex flex-col gap-3">
            {view === 'main' ? (
              <>
                <button
                  onClick={() => handleSelect('mulher_cis')}
                  className="w-full p-4 text-left border border-[var(--medium-dark)] bg-[var(--black)] rounded-xl hover:bg-[var(--dark-gray)] transition-all text-white font-medium"
                >
                  Mulher cis
                </button>
                <button
                  onClick={() => handleSelect('homem_cis')}
                  className="w-full p-4 text-left border border-[var(--medium-dark)] bg-[var(--black)] rounded-xl hover:bg-[var(--dark-gray)] transition-all text-white font-medium"
                >
                  Homem cis
                </button>
                <button
                  onClick={() => handleSelect('lgbt')}
                  className="w-full p-4 text-left border border-[var(--medium-dark)] bg-[var(--black)] rounded-xl hover:bg-[var(--dark-gray)] transition-all text-white font-medium"
                >
                  Sou LGBT
                </button>
                <button
                  onClick={() => handleSelect('nao_informar')}
                  className="w-full p-4 text-left border border-[var(--medium-dark)] bg-[var(--black)] rounded-xl hover:bg-[var(--dark-gray)] transition-all text-white font-medium"
                >
                  Prefiro não informar
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleSelect('mulher_trans')}
                  className="w-full p-4 text-left border border-[var(--medium-dark)] bg-[var(--black)] rounded-xl hover:bg-[var(--dark-gray)] transition-all text-white font-medium"
                >
                  Mulher trans
                </button>
                <button
                  onClick={() => handleSelect('outros')}
                  className="w-full p-4 text-left border border-[var(--medium-dark)] bg-[var(--black)] rounded-xl hover:bg-[var(--dark-gray)] transition-all text-white font-medium"
                >
                  Outros
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
