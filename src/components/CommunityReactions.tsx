import { useState, useEffect } from 'react';
import { Flame, Rocket, Zap, Terminal, Sparkles, Heart } from 'lucide-react';

interface ReactionItem {
  id: string;
  emoji: string;
  label: string;
  count: number;
  color: string;
  glow: string;
}

interface FloatingParticle {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

export function CommunityReactions() {
  const [reactions, setReactions] = useState<ReactionItem[]>([
    { id: 'fire', emoji: '🔥', label: 'Em Chamas', count: 342, color: 'text-amber-400', glow: 'rgba(224, 163, 74, 0.4)' },
    { id: 'rocket', emoji: '🚀', label: 'Decolando', count: 289, color: 'text-[#246386]', glow: 'rgba(36, 99, 134, 0.4)' },
    { id: 'zap', emoji: '⚡', label: 'Energia', count: 215, color: 'text-yellow-400', glow: 'rgba(234, 179, 8, 0.4)' },
    { id: 'tech', emoji: '💻', label: 'Devs', count: 418, color: 'text-cyan-400', glow: 'rgba(29, 81, 113, 0.4)' },
    { id: 'techgirl', emoji: '👑', label: 'Tech Girl', count: 276, color: 'text-[#967189]', glow: 'rgba(150, 113, 137, 0.4)' },
    { id: 'heart', emoji: '❤️', label: 'Comunidade', count: 395, color: 'text-[#997074]', glow: 'rgba(153, 112, 116, 0.4)' }
  ]);

  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [userReacted, setUserReacted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('resource_it_user_reactions');
    if (saved) {
      try {
        setUserReacted(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleReact = (id: string, emoji: string, e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. Update reaction counts
    setReactions(prev => 
      prev.map(r => r.id === id ? { ...r, count: r.count + 1 } : r)
    );

    const updatedUserReacted = { ...userReacted, [id]: true };
    setUserReacted(updatedUserReacted);
    localStorage.setItem('resource_it_user_reactions', JSON.stringify(updatedUserReacted));

    // 2. Spawn floating particle
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticle: FloatingParticle = {
      id: Date.now() + Math.random(),
      emoji,
      x: e.clientX - rect.left + (Math.random() * 20 - 10),
      y: e.clientY - rect.top
    };

    setParticles(prev => [...prev, newParticle]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  };

  const totalReactions = reactions.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="relative p-4 sm:p-5 rounded-2xl border border-[#E6E9EF]/10 bg-[#071528]/80 backdrop-blur-xl shadow-xl mt-4">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#E0A34A] animate-pulse-dot" />
          <span className="font-mono text-xs uppercase tracking-wider text-[#A1AEC2]">
            Reaja à Comunidade ao Vivo
          </span>
        </div>

        <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[#103653]/60 border border-[#E6E9EF]/10 text-[#E0A34A] font-semibold">
          +{totalReactions.toLocaleString('pt-BR')} reações
        </span>
      </div>

      {/* Reactions Bar */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 relative">
        {reactions.map((r) => {
          const hasReacted = !!userReacted[r.id];
          return (
            <button
              key={r.id}
              type="button"
              onClick={(e) => handleReact(r.id, r.emoji, e)}
              className={`relative flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-90 select-none ${
                hasReacted 
                  ? 'border border-[#E0A34A]/40 bg-[#E0A34A]/10 text-[#E6E9EF] shadow-[0_0_15px_-3px_rgba(224,163,74,0.3)]' 
                  : 'border border-[#E6E9EF]/10 bg-[#103653]/30 hover:bg-[#1D5171]/40 hover:border-[#E6E9EF]/25 text-[#A1AEC2] hover:text-[#E6E9EF]'
              }`}
            >
              <span className="text-sm transition-transform group-hover:scale-125">{r.emoji}</span>
              <span className="font-mono text-[11px]">{r.count}</span>
            </button>
          );
        })}

        {/* Floating animated particles */}
        {particles.map(p => (
          <span
            key={p.id}
            className="absolute pointer-events-none text-base z-30 animate-[popReaction_1s_ease-out_forwards]"
            style={{ left: `${p.x}px`, top: `${p.y}px` }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

    </div>
  );
}
