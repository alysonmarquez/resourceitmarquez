import { Linkedin, Instagram, Globe, Github, MessageCircle, Gamepad2, ArrowUp } from 'lucide-react';

interface FooterProps {
  isTechGirl?: boolean;
}

export function Footer({ isTechGirl }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 border-t border-[#E6E9EF]/15 bg-[#030C1E] pt-16 pb-12 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E6E9EF]/10">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full overflow-hidden border p-0.5 ${
                isTechGirl ? 'border-[#967189]' : 'border-[#1D5171]'
              }`}>
                <img 
                  src={isTechGirl ? '/techgirl.jpeg' : '/resource-it-marquez.jpeg'} 
                  alt="Resource IT Marquez" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="font-display font-bold text-lg text-[#E6E9EF]">
                Resource IT Marquez
              </span>
            </div>
            
            <p className="text-xs md:text-sm text-[#A1AEC2] max-w-sm leading-relaxed">
              Comunidade aberta e colaborativa de desenvolvedores focada em backend, aceleração de carreira, projetos práticos e inclusão feminina na tecnologia.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-2">
              <a 
                href="https://www.linkedin.com/in/alysonmarquez/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl border border-[#E6E9EF]/10 bg-[#103653]/30 hover:bg-[#1D5171]/40 flex items-center justify-center text-[#A1AEC2] hover:text-[#E6E9EF] transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a 
                href="https://www.instagram.com/marquezz.dev/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl border border-[#E6E9EF]/10 bg-[#103653]/30 hover:bg-[#1D5171]/40 flex items-center justify-center text-[#A1AEC2] hover:text-[#E6E9EF] transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="https://github.com/alysonmarquez" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl border border-[#E6E9EF]/10 bg-[#103653]/30 hover:bg-[#1D5171]/40 flex items-center justify-center text-[#A1AEC2] hover:text-[#E6E9EF] transition-colors"
              >
                <Github size={16} />
              </a>
              <a 
                href="https://www.marquezmatch.online/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="MarquezMatch"
                className="w-9 h-9 rounded-xl border border-[#E6E9EF]/10 bg-[#103653]/30 hover:bg-[#1D5171]/40 flex items-center justify-center text-[#A1AEC2] hover:text-[#E6E9EF] transition-colors"
              >
                <Globe size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Canais */}
          <div className="flex flex-col gap-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#E6E9EF]">
              Canais Oficiais
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-[#A1AEC2]">
              <li>
                <a href="https://chat.whatsapp.com/HBLOJ121r0YIJu8zNfY5B3" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6E9EF] transition-colors font-medium text-[#E6E9EF]">
                  Comunidade WhatsApp (Principal)
                </a>
              </li>
              <li>
                <a href="https://chat.whatsapp.com/LWFPj7qWEE11VCgcEvchHi" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6E9EF] transition-colors">
                  WhatsApp Geral
                </a>
              </li>
              <li>
                <a href="https://chat.whatsapp.com/LbQSl8Q2tjcGluF2He3zI6" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6E9EF] transition-colors text-[#E0A34A]">
                  Grupo de Vagas & Freelas
                </a>
              </li>
              <li>
                <a href="https://chat.whatsapp.com/Hwfpb0H9atAHnKom9HMq4s" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6E9EF] transition-colors">
                  Ofertas & Descontos Tech
                </a>
              </li>
              <li>
                <a href="https://discord.gg/6P8Qka2zk" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6E9EF] transition-colors">
                  Servidor no Discord
                </a>
              </li>
              <li>
                <a href="https://t.me/+Wu8bsrBmcBpkNzQx" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6E9EF] transition-colors">
                  Canal no Telegram
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Iniciativas */}
          <div className="flex flex-col gap-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#E6E9EF]">
              Iniciativas
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-[#A1AEC2]">
              <li>
                <a href="https://chat.whatsapp.com/FuwkXEqEUtnGeOxSmVAjGj" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6E9EF] transition-colors">
                  Estudos Back-End
                </a>
              </li>
              <li>
                <a href="https://chat.whatsapp.com/CDeeiIrv3evLFU8U61dxuw?s=sw&p=i&mlu=0&ilr=0" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6E9EF] transition-colors">
                  Aulas de Inglês
                </a>
              </li>
              <li>
                <a href="https://chat.whatsapp.com/LbQSl8Q2tjcGluF2He3zI6" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6E9EF] transition-colors">
                  Vagas & Oportunidades
                </a>
              </li>
              <li>
                <a href="#projetos" className="hover:text-[#E6E9EF] transition-colors">
                  Projetos Open Source
                </a>
              </li>
              <li>
                <a href="#noticias" className="hover:text-[#E6E9EF] transition-colors">
                  Portal Tech News
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Parcerias */}
          <div className="flex flex-col gap-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#E6E9EF]">
              Parcerias & Cupom
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-[#A1AEC2]">
              <li>
                <a href="https://www.marquezmatch.online/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6E9EF] transition-colors">
                  MarquezMatch
                </a>
              </li>
              <li>
                <a href="https://www.rocketseat.com.br/oferta/influencer/v2/marquezzdev" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6E9EF] transition-colors">
                  Rocketseat (Cupom: MARQUEZZDEV)
                </a>
              </li>
              <li>
                <a href="https://www.zaroc.com.br/?utm_source=influenciador&utm_medium=social&utm_campaign=MARQUEZZDEV" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6E9EF] transition-colors">
                  Zaroc Tech Wear (Cupom: MARQUEZZDEV)
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#E6E9EF]/10 text-xs font-mono text-[#A1AEC2]">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 text-center sm:text-left">
            <p className="font-semibold text-[#E6E9EF]">
              © {new Date().getFullYear()} Resource IT Marquez. Todos os direitos reservados.
            </p>
            <span className="hidden sm:inline text-[#A1AEC2]/40">•</span>
            <p className="text-[#A1AEC2]/70 text-[11px]">
              Fundada por Alyson Marquez
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#E0A34A] font-semibold text-[11px] px-2.5 py-0.5 rounded-full border border-[#E0A34A]/20 bg-[#E0A34A]/10">
              ✦ By Dev, For Dev
            </span>
            <button 
              type="button" 
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-[#A1AEC2] hover:text-[#E6E9EF] transition-colors cursor-pointer px-2.5 py-1 rounded-lg border border-[#E6E9EF]/10 hover:bg-[#103653]/40"
            >
              <span>Voltar ao topo</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
