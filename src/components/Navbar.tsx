import { useState, useEffect } from 'react';
import { Sparkles, Menu, X, MessageCircle, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  theme: 'general' | 'techgirl';
  onToggleTheme: () => void;
  onOpenExperienceModal: () => void;
}

export function Navbar({ theme, onToggleTheme, onOpenExperienceModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isTechGirl = theme === 'techgirl';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'border-b border-[#E6E9EF]/10 bg-[#030C1E]/90 backdrop-blur-xl py-3.5 shadow-[0_8px_30px_rgba(3,12,30,0.8)]' 
        : 'border-b border-transparent bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#inicio" className="group flex items-center gap-3 cursor-pointer">
          <div className={`relative w-9 h-9 rounded-full overflow-hidden border p-0.5 transition-transform duration-300 group-hover:scale-105 ${
            isTechGirl ? 'border-[#967189]' : 'border-[#1D5171]'
          }`}>
            <img 
              src={isTechGirl ? '/techgirl.jpeg' : '/resource-it-marquez.jpeg'} 
              alt="Logo Resource IT Marquez" 
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<span class="text-xs font-bold font-mono text-[#E6E9EF]">RM</span>';
              }}
            />
          </div>
          <span className="font-display font-bold text-lg md:text-xl tracking-tight text-[#E6E9EF] group-hover:text-white transition-colors">
            {isTechGirl ? 'Resource IT Tech Girl' : 'Resource IT Marquez'}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          <a href="#frentes" className="text-sm font-medium text-[#A1AEC2] hover:text-[#E6E9EF] transition-colors">
            Frentes
          </a>
          <a href="#atividade" className="text-sm font-medium text-[#A1AEC2] hover:text-[#E6E9EF] transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            Ao Vivo
          </a>
          <a href="#numeros" className="text-sm font-medium text-[#A1AEC2] hover:text-[#E6E9EF] transition-colors">
            Números
          </a>
          <a href="#projetos" className="text-sm font-medium text-[#A1AEC2] hover:text-[#E6E9EF] transition-colors">
            Projetos
          </a>
            <a href="#noticias" className="text-sm font-medium text-[#A1AEC2] hover:text-[#E6E9EF] transition-colors">
            Notícias
          </a>
          <a href="#fundador" className="text-sm font-medium text-[#A1AEC2] hover:text-[#E6E9EF] transition-colors">
            Fundador
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Theme / Experience Customizer Button */}
          <button 
            type="button" 
            onClick={onOpenExperienceModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all cursor-pointer ${
              isTechGirl 
                ? 'badge-rose hover:bg-[#967189]/25 text-[#E6E9EF]' 
                : 'badge-tech hover:bg-[#1D5171]/30 text-[#E6E9EF]'
            }`}
          >
            <Sparkles size={13} className={isTechGirl ? 'text-[#967189]' : 'text-[#E0A34A]'} />
            <span>{isTechGirl ? 'Tech Girl Ativo' : 'Personalizar'}</span>
          </button>

          {/* Quick CTA */}
          <a 
            href="https://chat.whatsapp.com/HBLOJ121r0YIJu8zNfY5B3" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-4 py-2 text-xs"
          >
            <MessageCircle size={14} />
            <span>Entrar no Grupo</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            type="button" 
            onClick={onOpenExperienceModal}
            className="p-2 rounded-lg border border-[#E6E9EF]/10 bg-[#103653]/30 text-[#E6E9EF]"
          >
            <Sparkles size={16} className={isTechGirl ? 'text-[#967189]' : 'text-[#E0A34A]'} />
          </button>
          <button 
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg border border-[#E6E9EF]/10 bg-[#103653]/30 text-[#E6E9EF]"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#E6E9EF]/10 bg-[#030C1E]/95 backdrop-blur-2xl px-5 py-6 flex flex-col gap-4 animate-subir">
          <a 
            href="#frentes" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-base font-medium text-[#E6E9EF] hover:text-white"
          >
            Frentes de Atuação
          </a>
          <a 
            href="#atividade" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-base font-medium text-[#E6E9EF] hover:text-white flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
            Atividade ao Vivo
          </a>
          <a 
            href="#numeros" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-base font-medium text-[#E6E9EF] hover:text-white"
          >
            Nossos Números
          </a>
          <a 
            href="#projetos" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-base font-medium text-[#E6E9EF] hover:text-white"
          >
            Projetos em Andamento
          </a>
          <a 
            href="#apoiadores" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-base font-medium text-[#E6E9EF] hover:text-white"
          >
            Apoiadores
          </a>
          <a 
            href="#fundador" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-base font-medium text-[#E6E9EF] hover:text-white"
          >
            Fundador
          </a>

          <div className="pt-3 border-t border-[#E6E9EF]/10 flex flex-col gap-2.5">
            <a 
              href="https://chat.whatsapp.com/HBLOJ121r0YIJu8zNfY5B3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-sm"
            >
              <MessageCircle size={16} />
              <span>Entrar no WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
