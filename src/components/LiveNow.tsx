import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Flame, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { liveNowEvents } from '../data/communityData';
import { GlowCard } from './GlowCard';

interface LiveNowProps {
  isTechGirl?: boolean;
}

export function LiveNow({ isTechGirl }: LiveNowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = 320;
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section id="ao-vivo" aria-labelledby="livenow-heading" className="py-16 md:py-20 border-t border-[#E6E9EF]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6E9EF]/10 bg-[#103653]/30 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E0A34A] animate-pulse-dot" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E0A34A] font-semibold">
                Tempo Real
              </span>
            </div>
            <h2 id="livenow-heading" className="font-display text-2xl md:text-3xl font-bold text-[#E6E9EF] tracking-tight">
              Acontecendo Agora na Comunidade.
            </h2>
            <p className="text-xs sm:text-sm text-[#A1AEC2] max-w-xl mt-1">
              Discussões ativas, novidades de projetos e movimentação recente nos canais.
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Rolar para a esquerda"
              className="p-2.5 rounded-xl border border-[#E6E9EF]/10 bg-[#071528] text-[#A1AEC2] hover:text-[#E6E9EF] hover:bg-[#103653]/40 transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Rolar para a direita"
              className="p-2.5 rounded-xl border border-[#E6E9EF]/10 bg-[#071528] text-[#A1AEC2] hover:text-[#E6E9EF] hover:bg-[#103653]/40 transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel (Scrollable & Touch-Draggable) */}
        <div 
          ref={containerRef}
          className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none"
          tabIndex={0}
          aria-label="Eventos recentes da comunidade"
        >
          {liveNowEvents.map((event) => (
            <div 
              key={event.id}
              className="min-w-[280px] sm:min-w-[340px] max-w-[340px] snap-start"
            >
              <GlowCard className="p-5 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-2xl">{event.icon}</span>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border font-medium ${event.badgeColor}`}>
                      {event.time}
                    </span>
                  </div>

                  <span className="font-mono text-[11px] text-[#A1AEC2] block mb-1">
                    {event.category}
                  </span>
                  <h3 className="font-display text-base font-bold text-[#E6E9EF] mb-2">
                    {event.title}
                  </h3>
                  <p className="text-xs text-[#A1AEC2] leading-relaxed mb-4">
                    {event.subtitle}
                  </p>
                </div>

                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#E6E9EF] hover:text-white pt-3 border-t border-[#E6E9EF]/10 transition-colors"
                  >
                    <span>Participar / Acessar</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </GlowCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
