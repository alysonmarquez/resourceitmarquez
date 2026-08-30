import { useState, useEffect } from 'react';
import { 
  Terminal,
  ExternalLink,
  MessageCircle,
  Briefcase,
  Code2,
  Gamepad2,
  Users,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Copy,
  Check,
  Tag,
  Shirt,
  Flame,
  Zap
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ActivityTicker } from './components/ActivityTicker';
import { RotatingWords } from './components/RotatingWords';
import { MembersOnline } from './components/MembersOnline';
import { TechMarquee } from './components/TechMarquee';
import { LiveNow } from './components/LiveNow';
import { OpportunityTicker } from './components/OpportunityTicker';
import { CommunityTerminal } from './components/CommunityTerminal';
import { KineticCommunity } from './components/KineticCommunity';
import { TechNewsSection } from './components/TechNewsSection';
import { StatsSection } from './components/StatsSection';
import { FrentesSection } from './components/FrentesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ActivityMonitor } from './components/ActivityMonitor';
import { FounderSection } from './components/FounderSection';
import { Footer } from './components/Footer';
import { HeroIridescentAura } from './components/HeroIridescentAura';
import { GlowCard } from './components/GlowCard';
import { RevealOnScroll } from './components/RevealOnScroll';
import { ExperienceModal } from './components/ExperienceModal';
import { ProjectsModal } from './components/ProjectsModal';
import { AboutModal } from './components/AboutModal';
import { TechGirlWarningModal } from './components/TechGirlWarningModal';
import { fetchCommunityGroups } from './services/activityService';

export default function App() {
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isTechGirlWarningModalOpen, setIsTechGirlWarningModalOpen] = useState(false);
  const [totalMembers, setTotalMembers] = useState(840);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  
  const [theme, setTheme] = useState<'general' | 'techgirl'>(() => {
    return (localStorage.getItem('themePreference') as 'general' | 'techgirl') || 'general';
  });

  const isTechGirl = theme === 'techgirl';

  const handleSetTheme = (newTheme: 'general' | 'techgirl') => {
    setTheme(newTheme);
    localStorage.setItem('themePreference', newTheme);
  };

  useEffect(() => {
    fetchCommunityGroups().then(data => {
      if (data && data.totalMembers) {
        setTotalMembers(data.totalMembers);
      }
    });
  }, []);

  const handleCopyCoupon = (coupon: string) => {
    navigator.clipboard.writeText(coupon);
    setCopiedCoupon(coupon);
    setTimeout(() => setCopiedCoupon(null), 2500);
  };

  const partners = [
    {
      id: 'trilhasenior',
      name: 'Trilha Sênior',
      type: 'Formação Dev Poliglota',
      title: 'Formação Poliglota & System Design',
      desc: 'Domine Java, Go, Kotlin, Elixir, Rust e TypeScript. Do design de sistemas e microsserviços à implementação avançada em produção.',
      coupon: 'MARQUEZZDEV',
      discount: '10% OFF',
      link: 'https://trilhasenior.com.br/',
      icon: '⚡'
    },
    {
      id: 'rocketseat',
      name: 'Rocketseat',
      type: 'Plataforma Parceira',
      title: 'Decole sua Carreira em Programação',
      desc: 'Formação completa com desconto exclusivo para membros da comunidade usando o cupom oficial.',
      coupon: 'MARQUEZZDEV',
      link: 'https://www.rocketseat.com.br/oferta/influencer/v2/marquezzdev',
      icon: '🚀'
    },
    {
      id: 'zaroc',
      name: 'Zaroc Tech Wear',
      type: 'Tech Wear & Vestuário',
      title: 'Camiseta Tech Modal Essential',
      desc: 'Vestuário tecnológico e minimalista para desenvolvedores com tecido Modal Essential e tecnologia anti-odor.',
      coupon: 'MARQUEZZDEV',
      link: 'https://www.zaroc.com.br/?utm_source=influenciador&utm_medium=social&utm_campaign=MARQUEZZDEV',
      icon: '👕'
    },
    {
      id: 'marquezmatch',
      name: 'MarquezMatch',
      type: 'IA & Carreira Tech',
      title: 'Análise Curricular & LinkedIn',
      desc: 'Plataforma inteligente para otimização de perfil, matching de vagas e análise com IA de currículos tech.',
      link: 'https://www.marquezmatch.online/',
      icon: '🎯'
    },
    {
      id: 'welison',
      name: 'Welison',
      type: 'Inglês Tech',
      title: 'Aulas de Conversação Gratuitas',
      desc: 'Encontros semanais práticos em grupo na comunidade Resource IT Marquez | English para acelerar seu inglês.',
      link: 'https://wa.me/5589999262292',
      icon: '🇺🇸'
    }
  ];

  return (
    <div className="min-h-screen bg-[#030C1E] text-[#E6E9EF] overflow-x-hidden selection:bg-[#1D5171] selection:text-white">
      
      {/* Official Aura Atmosphere Background */}
      <div className={isTechGirl ? "hero-aura-bg-techgirl" : "hero-aura-bg"} />
      <div className="noise-overlay" />

      {/* Top Continuous Ticker Bar */}
      <ActivityTicker />

      {/* Fixed Navbar */}
      <Navbar 
        theme={theme}
        onToggleTheme={() => handleSetTheme(isTechGirl ? 'general' : 'techgirl')}
        onOpenExperienceModal={() => setIsExperienceModalOpen(true)}
      />

      {/* Modals */}
      <ExperienceModal 
        isOpen={isExperienceModalOpen} 
        onClose={() => setIsExperienceModalOpen(false)} 
        onSelectExperience={handleSetTheme}
      />
      <ProjectsModal 
        isOpen={isProjectsModalOpen} 
        onClose={() => setIsProjectsModalOpen(false)} 
        isTechGirl={isTechGirl}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        isTechGirl={isTechGirl}
      />
      <TechGirlWarningModal
        isOpen={isTechGirlWarningModalOpen}
        onClose={() => setIsTechGirlWarningModalOpen(false)}
      />

      {/* Main Content Area */}
      <main id="inicio" className="relative z-10">
        
        {/* HERO SECTION with Dynamic Organic Iridescent Wave Background */}
        <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative">
          
          {/* Organic Iridescent Wave & Light Trails directly from Logo */}
          <HeroIridescentAura isTechGirl={isTechGirl} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Left Column: Hero Headlines & Action Buttons */}
              <div className="lg:col-span-7 flex flex-col gap-6 animate-subir">
                
                {/* Kicker Pill Badge + Live Members Online Indicator */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E6E9EF]/15 bg-[#103653]/40 backdrop-blur-md shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#E0A34A] animate-pulse-dot" />
                    <span className="font-mono text-xs font-semibold text-[#E6E9EF]">
                      +{totalMembers.toLocaleString('pt-BR')} Conexões Reais
                    </span>
                  </div>

                  <MembersOnline />
                </div>

                {/* Main Headline with Logo-Inspired Organic Spectrum Gradient */}
                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#E6E9EF] leading-[1.08]">
                  Construa sua carreira em tecnologia com quem{' '}
                  <span className="text-logo-spectrum">
                    está no jogo.
                  </span>
                </h1>

                {/* Rotating Dynamic Words */}
                <div className="pt-1">
                  <RotatingWords />
                </div>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-[#A1AEC2] max-w-xl leading-relaxed">
                  Uma comunidade aberta de desenvolvedores e estudantes focada em <strong className="text-[#E6E9EF]">Back-End</strong>, <strong className="text-[#E6E9EF]">projetos práticos</strong>, <strong className="text-[#E6E9EF]">aulas de inglês gratuitas</strong> e <strong className="text-[#E6E9EF]">aceleração profissional</strong>.
                </p>

                {/* Action CTA Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 pt-2">
                  <a 
                    href="https://chat.whatsapp.com/HBLOJ121r0YIJu8zNfY5B3" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm cursor-pointer"
                  >
                    <MessageCircle size={18} />
                    <span>Entrar na Comunidade</span>
                    <ArrowUpRight size={16} />
                  </a>

                  {isTechGirl ? (
                    <button 
                      type="button" 
                      onClick={() => setIsTechGirlWarningModalOpen(true)}
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-[#E6E9EF] border border-[#967189]/40 bg-[#967189]/15 hover:bg-[#967189]/25 transition-all cursor-pointer shadow-md"
                    >
                      <Sparkles size={18} className="text-[#967189]" />
                      <span>Comunidade Tech Girl</span>
                    </button>
                  ) : (
                    <a 
                      href="https://discord.gg/6P8Qka2zk" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-secondary inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm cursor-pointer"
                    >
                      <Gamepad2 size={18} />
                      <span>Ingressar no Discord</span>
                    </a>
                  )}

                  <button 
                    type="button" 
                    onClick={() => setIsAboutModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs font-semibold text-[#A1AEC2] hover:text-[#E6E9EF] border border-transparent hover:border-[#E6E9EF]/10 bg-transparent transition-all cursor-pointer"
                  >
                    <ShieldCheck size={16} />
                    <span>Sobre a Comunidade</span>
                  </button>
                </div>

                {/* Key Pillars Tags (without coupon in hero) */}
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E6E9EF]/10">
                  <span className="font-mono text-xs text-[#A1AEC2]/70 mr-2">Destaques:</span>
                  {['100% Gratuito', 'Back-End & APIs', 'Aulas de Inglês', 'Tech Girl', 'Open Source', 'Vagas Tech'].map((tag) => (
                    <span 
                      key={tag} 
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium ${
                        tag.includes('Vagas') 
                          ? 'badge-gold font-semibold shadow-sm'
                          : tag.includes('Tech Girl')
                          ? 'badge-rose font-medium'
                          : 'badge-tech'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Right Column: Live Activity Monitor + Interactive Reactions + Terminal (Sticky on Desktop) */}
              <div className="lg:col-span-5 lg:sticky lg:top-28 animate-subir space-y-5">
                <ActivityMonitor isTechGirl={isTechGirl} />
                <CommunityTerminal />
              </div>

            </div>

          </div>
        </section>

        {/* TECH MARQUEE (Dual Track Infinite Stream) */}
        <TechMarquee />

        {/* LIVE NOW (Acontecendo Agora Carousel) */}
        <LiveNow isTechGirl={isTechGirl} />

        {/* OPPORTUNITY TICKER (Vagas & Carreira em Tempo Real) */}
        <OpportunityTicker />

        {/* STATS & NUMBERS with ANIMATED COUNTERS */}
        <StatsSection isTechGirl={isTechGirl} />

        {/* FRENTES & ECOSYSTEM */}
        <FrentesSection 
          isTechGirl={isTechGirl}
          onOpenTechGirlModal={() => setIsTechGirlWarningModalOpen(true)}
          onOpenProjectsModal={() => setIsProjectsModalOpen(true)}
          onOpenAboutModal={() => setIsAboutModalOpen(true)}
        />

        {/* TECH NEWS SECTION (Portal de Notícias Tech em Tempo Real) */}
        <TechNewsSection isTechGirl={isTechGirl} />

        {/* PROJECTS SECTION with SPOTLIGHT GLOW CARDS */}
        <ProjectsSection 
          isTechGirl={isTechGirl}
          onOpenProjectsModal={() => setIsProjectsModalOpen(true)}
        />

        {/* KINETIC TYPOGRAPHY ("A Comunidade Não Para") */}
        <KineticCommunity />

        {/* SUPPORTERS & PARTNERS SHOWCASE */}
        <section id="apoiadores" aria-labelledby="apoiadores-heading" className="py-16 md:py-24 border-t border-[#E6E9EF]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6E9EF]/10 bg-[#103653]/30 mb-3">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A1AEC2]">
                  Parcerias & Benefícios
                </span>
              </div>
              <h2 id="apoiadores-heading" className="font-display text-2xl md:text-4xl font-bold text-[#E6E9EF] tracking-tight">
                Apoiadores e Parceiros Oficiais.
              </h2>
              <p className="text-sm md:text-base text-[#A1AEC2] max-w-xl mt-2 leading-relaxed">
                Empresas e especialistas que apoiam a Resource IT Marquez com recursos, descontos e oportunidades exclusivas.
              </p>
            </div>

            {/* Partners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {partners.map((partner, idx) => (
                <GlowCard 
                  key={idx}
                  className={`p-6 ${isTechGirl ? 'card-surface-techgirl' : ''}`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#103653]/40 border border-[#E6E9EF]/10 flex items-center justify-center text-xl">
                        {partner.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#E6E9EF]">{partner.name}</h3>
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#E0A34A]">
                          {partner.type}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-sm font-semibold text-[#E6E9EF] mb-1">{partner.title}</h4>
                    <p className="text-xs text-[#A1AEC2] leading-relaxed mb-4">{partner.desc}</p>

                    {/* Highlighted Coupon Box if exists */}
                    {partner.coupon && (
                      <div className="mb-5 p-3 rounded-xl border border-dashed border-[#E0A34A]/40 bg-[#E0A34A]/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Tag size={14} className="text-[#E0A34A]" />
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-xs font-bold text-[#E6E9EF] tracking-wider">
                              {partner.coupon}
                            </span>
                            {partner.discount && (
                              <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.2 rounded bg-[#E0A34A]/20 text-[#E0A34A] border border-[#E0A34A]/30">
                                {partner.discount}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyCoupon(partner.coupon!)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium flex items-center gap-1 transition-all cursor-pointer ${
                            copiedCoupon === partner.coupon
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-[#103653]/60 hover:bg-[#1D5171] text-[#E6E9EF] border border-[#E6E9EF]/10'
                          }`}
                        >
                          {copiedCoupon === partner.coupon ? (
                            <>
                              <Check size={12} />
                              <span>Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <a 
                    href={partner.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-white"
                  >
                    <span>Acessar benefício</span>
                    <ExternalLink size={14} />
                  </a>
                </GlowCard>
              ))}
            </div>

          </div>
        </section>

        {/* FOUNDER SECTION */}
        <FounderSection isTechGirl={isTechGirl} />

        {/* Full Footer */}
        <Footer isTechGirl={isTechGirl} />

      </main>

    </div>
  );
}
