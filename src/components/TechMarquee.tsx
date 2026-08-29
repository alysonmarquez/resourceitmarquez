import { technologiesRow1, technologiesRow2 } from '../data/communityData';

export function TechMarquee() {
  const row1 = [...technologiesRow1, ...technologiesRow1, ...technologiesRow1];
  const row2 = [...technologiesRow2, ...technologiesRow2, ...technologiesRow2];

  return (
    <section aria-label="Tecnologias dominadas pela comunidade" className="py-12 border-y border-[#E6E9EF]/10 bg-[#030C1E]/60 overflow-hidden select-none relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030C1E] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030C1E] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#A1AEC2]">
          Stack & Tecnologias em Construção Contínua
        </span>
      </div>

      {/* Row 1: Leftward Marquee */}
      <div className="flex overflow-x-hidden mb-3.5 group">
        <div 
          className="flex items-center gap-3 whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]"
          style={{ animation: 'marquee 34s linear infinite' }}
        >
          {row1.map((tech, index) => (
            <div 
              key={`r1-${index}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E6E9EF]/10 bg-[#071528] text-xs font-mono font-medium text-[#E6E9EF] shadow-sm hover:border-[#246386] hover:bg-[#103653]/40 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#246386]" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Rightward Marquee */}
      <div className="flex overflow-x-hidden group">
        <div 
          className="flex items-center gap-3 whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]"
          style={{ animation: 'marquee-reverse 38s linear infinite' }}
        >
          {row2.map((tech, index) => (
            <div 
              key={`r2-${index}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E6E9EF]/10 bg-[#071528] text-xs font-mono font-medium text-[#E6E9EF] shadow-sm hover:border-[#E0A34A]/50 hover:bg-[#103653]/40 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E0A34A]" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
