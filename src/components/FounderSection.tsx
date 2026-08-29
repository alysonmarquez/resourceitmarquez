import { Linkedin, Instagram, ExternalLink, Sparkles, Quote, Globe } from 'lucide-react';

interface FounderSectionProps {
  isTechGirl?: boolean;
}

export function FounderSection({ isTechGirl }: FounderSectionProps) {
  return (
    <section id="fundador" aria-labelledby="founder-heading" className="py-16 md:py-24 border-t border-[#E6E9EF]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6E9EF]/10 bg-[#103653]/30 mb-3">
            <Sparkles size={13} className="text-[#E0A34A]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A1AEC2]">
              Liderança & Visão
            </span>
          </div>
          <h2 id="founder-heading" className="font-display text-2xl md:text-4xl font-bold text-[#E6E9EF] tracking-tight">
            Quem começou tudo isso.
          </h2>
          <p className="text-sm md:text-base text-[#A1AEC2] max-w-xl mt-2 leading-relaxed">
            Conheça o idealizador por trás da comunidade Resource IT Marquez.
          </p>
        </div>

        {/* Founder Card */}
        <div className={`p-8 md:p-12 rounded-3xl card-surface max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
          isTechGirl ? 'card-surface-techgirl' : ''
        }`}>
          
          {/* Photo with Glowing Frame (Spectrum border) */}
          <div className="relative shrink-0 group">
            <div className="absolute -inset-1 rounded-3xl opacity-60 blur-md transition-all duration-500 group-hover:opacity-90 bg-gradient-to-r from-[#1D5171] via-[#967189] to-[#E0A34A]" />
            
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-2xl overflow-hidden border border-[#E6E9EF]/20 bg-[#071528] shadow-2xl">
              <img 
                src="/alyson-marquez.jpg" 
                alt="Alyson Marquez — Founder" 
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Bio & Details */}
          <div className="flex flex-col gap-4 text-left">
            <div>
              <div className="inline-block font-mono text-xs font-semibold uppercase tracking-wider text-[#E0A34A] mb-1">
                Founder & Lead Developer
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#E6E9EF]">
                Alyson Marquez
              </h3>
              <p className="text-xs font-mono text-[#A1AEC2]">
                @marquezzdev
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#A1AEC2] leading-relaxed">
              Desenvolvedor de software, criador de conteúdo e fundador da <strong className="text-[#E6E9EF]">Resource IT Marquez</strong>. Apaixonado por tecnologia e por conectar pessoas, criou a comunidade com o propósito de aproximar profissionais, compartilhar conhecimento e gerar oportunidades reais na área. Além de atuar no desenvolvimento de software, lidera projetos de tecnologia e iniciativas voltadas a estudos, networking, carreira e inclusão de novos profissionais no mercado.
            </p>

            {/* Quote */}
            <div className="p-4 rounded-xl border border-dashed border-[#1D5171]/50 bg-[#103653]/20 flex items-start gap-3">
              <Quote size={18} className="shrink-0 mt-0.5 text-[#E0A34A]" />
              <p className="text-xs sm:text-sm font-medium text-[#E6E9EF] italic">
                “Tecnologia transforma projetos. Comunidade transforma pessoas.”
              </p>
            </div>

            {/* Social Links & Platforms */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@marquezzdev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#E6E9EF] border border-[#E6E9EF]/10 bg-[#030C1E]/60 hover:border-[#E6E9EF]/25 hover:bg-[#103653]/40 transition-all"
              >
                <span>TikTok</span>
                <ExternalLink size={12} />
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/marquezz.dev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#E6E9EF] border border-[#E6E9EF]/10 bg-[#030C1E]/60 hover:border-[#E6E9EF]/25 hover:bg-[#103653]/40 transition-all"
              >
                <Instagram size={14} />
                <span>Instagram</span>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/alysonmarquez/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#E6E9EF] border border-[#E6E9EF]/10 bg-[#030C1E]/60 hover:border-[#E6E9EF]/25 hover:bg-[#103653]/40 transition-all"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </a>

              {/* MarquezMatch Platform */}
              <a 
                href="https://www.marquezmatch.online/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white shadow-md transition-all"
              >
                <Globe size={14} />
                <span>MarquezMatch (Análise Curricular)</span>
                <ExternalLink size={12} />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
