import { useState } from 'react';
import { Radio } from 'lucide-react';
import { tickerItems } from '../data/communityData';

export function ActivityTicker() {
  const [isPaused, setIsPaused] = useState(false);

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case 'opportunity':
        return 'text-[#E0A34A] border-[#E0A34A]/30 bg-[#E0A34A]/10';
      case 'techgirl':
        return 'text-[#967189] border-[#967189]/30 bg-[#967189]/10';
      case 'education':
        return 'text-[#997074] border-[#997074]/30 bg-[#997074]/10';
      case 'dev':
        return 'text-[#38bdf8] border-[#1D5171]/40 bg-[#1D5171]/20';
      default:
        return 'text-[#246386] border-[#246386]/30 bg-[#246386]/10';
    }
  };

  // Duplicate items for seamless continuous looping
  const items = [...tickerItems, ...tickerItems];

  return (
    <aside 
      aria-label="Feed de atividades em tempo real"
      className="w-full bg-[#030C1E]/95 border-b border-[#E6E9EF]/10 py-1.5 overflow-hidden select-none z-30 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
        
        {/* Live Indicator Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#103653]/40 border border-[#E6E9EF]/10 shrink-0 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E0A34A] animate-pulse-dot" />
          <span className="font-mono text-[10px] font-bold text-[#E6E9EF] tracking-wider uppercase">
            LIVE FEED
          </span>
        </div>

        {/* Scrolling Ticker Track */}
        <div className="relative flex overflow-x-hidden w-full mask-linear">
          <div 
            className="flex items-center gap-8 whitespace-nowrap will-change-transform"
            style={{
              animation: 'marquee 38s linear infinite',
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex items-center gap-2">
                <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border uppercase font-semibold ${getBadgeStyle(item.category)}`}>
                  {item.tag}
                </span>
                <span className="text-xs text-[#A1AEC2] hover:text-[#E6E9EF] transition-colors">
                  {item.text}
                </span>
                <span className="text-[#E6E9EF]/20 ml-4">·</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </aside>
  );
}
