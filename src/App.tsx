import { useState, useEffect } from 'react';
import { 
  Terminal,
  ExternalLink,
  MessageCircle,
  Briefcase,
  Code2,
  Gamepad2,
  Users,
  Linkedin,
  Instagram,
  Globe,
  CupSoda,
  Sparkles,
  X
} from 'lucide-react';
import { ExperienceModal } from './components/ExperienceModal';
import { ProjectsModal } from './components/ProjectsModal';
import { AboutModal } from './components/AboutModal';
import { TechGirlWarningModal } from './components/TechGirlWarningModal';

export default function App() {
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isTechGirlWarningModalOpen, setIsTechGirlWarningModalOpen] = useState(false);
  
  const [theme, setTheme] = useState<'general' | 'techgirl'>(() => {
    return (localStorage.getItem('themePreference') as 'general' | 'techgirl') || 'general';
  });
  const [hasPreference, setHasPreference] = useState(() => !!localStorage.getItem('themePreference'));
  const [currentPartner, setCurrentPartner] = useState(0);

  const handleSetTheme = (newTheme: 'general' | 'techgirl') => {
    setTheme(newTheme);
    localStorage.setItem('themePreference', newTheme);
    setHasPreference(true);
  };

  const resetTheme = () => {
    localStorage.removeItem('themePreference');
    setTheme('general');
    setHasPreference(false);
  };

  const partners = [
    {
      name: 'Alysson Marquez',
      type: 'Mentoria',
      title: 'Carreira & Mentorias',
      desc: 'Análise curricular, otimização de LinkedIn e mentorias para iniciantes em tech.',
      link: 'https://wa.me/558699336352',
      icon: '💼'
    },
    {
      name: 'Welison',
      type: 'Inglês',
      title: 'Inglês para Tech',
      desc: 'Aulas grátis na comunidade Resource IT Marquez | English.',
      link: 'https://wa.me/5589999262292',
      icon: '🇺🇸'
    },
    {
      name: 'Zaroc',
      type: 'Parceiro',
      title: 'Soluções em Tecnologia',
      desc: 'Apoiador oficial da comunidade Resource IT Marquez.',
      link: 'https://www.zaroc.com.br/?utm_source=influenciador&utm_medium=social&utm_campaign=MARQUEZZDEV',
      icon: '🏢'
    },
    {
      name: 'Rocketseat',
      type: 'Assinatura',
      title: 'Decole sua carreira em programação',
      desc: 'A plataforma completa para começar do zero ou se especializar e estudar no seu ritmo.',
      link: 'https://www.rocketseat.com.br/oferta/influencer/v2/marquezzdev',
      icon: '🚀'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPartner(prev => (prev + 1) % partners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [partners.length]);

  return (
    <>
      <ExperienceModal 
        isOpen={isExperienceModalOpen} 
        onClose={() => setIsExperienceModalOpen(false)} 
        onSelectExperience={handleSetTheme}
      />
      <ProjectsModal 
        isOpen={isProjectsModalOpen} 
        onClose={() => setIsProjectsModalOpen(false)} 
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
      <TechGirlWarningModal
        isOpen={isTechGirlWarningModalOpen}
        onClose={() => setIsTechGirlWarningModalOpen(false)}
      />

      <main className="home">
        <div className="wrapper-home">
          
          <header className="header">
            <button type="button" className="header__logo-button" aria-label="Exibindo logo">
              <span className={`header__img-frame transition-all duration-500 ${theme === 'techgirl' ? 'border-[#e83e8c] rounded-full' : 'border-[var(--medium-dark)] rounded-3xl'}`}>
                <div className={`header__img flex items-center justify-center transition-all duration-500 overflow-hidden ${theme === 'techgirl' ? 'bg-[#2a0a18] rounded-full' : 'bg-[var(--black)] rounded-3xl'}`}>
                   {theme === 'techgirl' ? (
                     <img src="/techgirl.jpeg" alt="Tech Girl" className="w-full h-full object-cover" onError={(e) => {
                       e.currentTarget.style.display = 'none';
                       e.currentTarget.parentElement!.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-[#e83e8c]"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>';
                     }} />
                   ) : (
                     <img src="/resource-it-marquez.jpeg" alt="Resource IT Marquez" className="w-full h-full object-cover" onError={(e) => {
                       e.currentTarget.style.display = 'none';
                       e.currentTarget.parentElement!.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-white"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>';
                     }} />
                   )}
                </div>
              </span>
            </button>
            
            <div className="header__content">
              <h1 id="header-title" className="header__title text-center">
                {theme === 'techgirl' ? 'Resource IT Tech Girl' : 'Resource IT Marquez'}
              </h1>
              <ul className="header__stats-list">
                <li className="header__stats-list__item">
                  <CupSoda size={16} className="header__stats-list__item-icon text-[var(--text-color-secondary)]" />
                  <p className="header__stats-list__item-text">Desde 07/05/2025</p>
                </li>
              </ul>
              
              <section className="section-social-media">
                <a href="https://www.linkedin.com/in/alysonmarquez/" target="_blank" rel="noopener noreferrer" className="button link small normal">
                  <Linkedin size={16} />
                </a>
                <a href="https://www.instagram.com/marquezz.dev/" target="_blank" rel="noopener noreferrer" className="button link small normal">
                  <Instagram size={16} />
                </a>
                <a href="https://www.marquezzdev.online/" target="_blank" rel="noopener noreferrer" className="button link small normal">
                  <Globe size={16} />
                </a>
              </section>
            </div>
          </header>

          <section aria-labelledby="groups-showcase-title" className="groups-showcase">
            <nav aria-label="Menu institucional" className="home-menu">
              
              {theme === 'techgirl' && (
                <button type="button" onClick={() => setIsTechGirlWarningModalOpen(true)} className="home-menu__item" style={{ borderColor: '#e83e8c55', backgroundColor: '#e83e8c11' }}>
                  <span className="flex items-center gap-2 text-white font-medium"><Sparkles size={16} className="text-[#e83e8c]"/> Comunidade Tech Girl</span>
                  <ExternalLink size={14} className="text-[#e83e8c]" />
                </button>
              )}

              <a href="https://chat.whatsapp.com/LWFPj7qWEE11VCgcEvchHi" target="_blank" rel="noopener noreferrer" className="home-menu__item">
                <span className="flex items-center gap-2"><Users size={16} className="text-[var(--text-color-secondary)]"/> Comunidade geral no WhatsApp</span>
                <ExternalLink size={14} />
              </a>

              <a href="https://chat.whatsapp.com/CDeeiIrv3evLFU8U61dxuw?s=sw&p=i&mlu=0&ilr=0" target="_blank" rel="noopener noreferrer" className="home-menu__item">
                <span className="flex items-center gap-2"><MessageCircle size={16} className="text-[var(--text-color-secondary)]"/> Aulas de Inglês em grupo gratuitas</span>
                <ExternalLink size={14} />
              </a>

              <a href="https://chat.whatsapp.com/FuwkXEqEUtnGeOxSmVAjGj" target="_blank" rel="noopener noreferrer" className="home-menu__item">
                <span className="flex items-center gap-2"><Code2 size={16} className="text-[var(--text-color-secondary)]"/> Estudos Back-End</span>
                <ExternalLink size={14} />
              </a>

              <a href="https://chat.whatsapp.com/Hwfpb0H9atAHnKom9HMq4s" target="_blank" rel="noopener noreferrer" className="home-menu__item">
                <span className="flex items-center gap-2"><Briefcase size={16} className="text-[var(--text-color-secondary)]"/> Grupo de Ofertas</span>
                <ExternalLink size={14} />
              </a>

              <a href="https://t.me/+Wu8bsrBmcBpkNzQx" target="_blank" rel="noopener noreferrer" className="home-menu__item">
                <span className="flex items-center gap-2"><MessageCircle size={16} className="text-[var(--text-color-secondary)]"/> Comunidade no Telegram</span>
                <ExternalLink size={14} />
              </a>

              <a href="https://discord.gg/6P8Qka2zk" target="_blank" rel="noopener noreferrer" className="home-menu__item">
                <span className="flex items-center gap-2"><Gamepad2 size={16} className="text-[var(--text-color-secondary)]"/> Comunidade no Discord</span>
                <ExternalLink size={14} />
              </a>

              <button type="button" onClick={() => setIsProjectsModalOpen(true)} className="home-menu__item">
                <span className="flex items-center gap-2"><Terminal size={16} className="text-[var(--text-color-secondary)]"/> Projetos em andamento</span>
                <ExternalLink size={14} />
              </button>

              <button type="button" onClick={() => setIsAboutModalOpen(true)} className="home-menu__item">
                <span className="flex items-center gap-2"><Users size={16} className="text-[var(--text-color-secondary)]"/> Sobre nós</span>
                <ExternalLink size={14} />
              </button>

              {hasPreference ? (
                <button type="button" onClick={resetTheme} className="home-menu__item home-menu__item--muted !border-[var(--medium-dark)]">
                  <span className="flex items-center gap-2">Resetar preferência sexual</span>
                  <X size={14} />
                </button>
              ) : (
                <button type="button" onClick={() => setIsExperienceModalOpen(true)} className="home-menu__item home-menu__item--muted">
                  <span className="flex items-center gap-2">Personalizar experiência</span>
                  <Users size={14} />
                </button>
              )}

            </nav>
          </section>

          <section aria-labelledby="supporters-title" className="supporters">
            <div className="supporters__badge">
              <h2 id="supporters-title" className="supporters__title">Apoiadores</h2>
              <div className="supporters__marquee">
                <a href="https://www.rocketseat.com.br/oferta/influencer/v2/marquezzdev" target="_blank" rel="noopener noreferrer" className="supporters__item" aria-label="Abrir apoiador Rocketseat">
                  <span className="text-xl">🚀</span>
                  <span>Rocketseat</span>
                </a>
              </div>
            </div>
          </section>

          <section aria-labelledby="partner-content-title" className="partner-content">
            <div className="partner-content__header">
              <h2 id="partner-content-title" className="partner-content__title">Conteúdos dos apoiadores</h2>
            </div>
            
            <div aria-label="Conteúdos compartilhados pelos apoiadores" className="w-full">
              <div className="w-full overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentPartner * 100}%)` }}
                >
                  {partners.map((partner, idx) => (
                    <div key={idx} className="w-full shrink-0">
                      <article className="partner-content-card w-full">
                        <div className="partner-content-card__header">
                          <div className="partner-content-card__logo">
                            <span className="text-[14px]">{partner.icon}</span>
                          </div>
                          <div className="partner-content-card__meta">
                            <span className="partner-content-card__partner">{partner.name}</span>
                            <span className="partner-content-card__type">{partner.type}</span>
                          </div>
                        </div>
                        <h3 className="partner-content-card__title">{partner.title}</h3>
                        <p className="partner-content-card__description">{partner.desc}</p>
                        <a target="_blank" rel="noopener noreferrer" className="partner-content-card__action" href={partner.link}>
                          <span>Acessar / Falar com</span>
                          <ExternalLink size={14} />
                        </a>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 mt-4 pb-2">
                {partners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPartner(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${currentPartner === idx ? 'bg-[#d77e00]' : 'bg-[var(--medium-dark)]'}`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          <footer className="footer">
            <p>Todos os direitos reservados a Resource IT Marquez - 2025</p>
            <p>v.1</p>
          </footer>

        </div>
      </main>
    </>
  );
}
