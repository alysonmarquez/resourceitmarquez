import { useState, useEffect } from 'react';
import { Newspaper, ArrowUpRight, RefreshCw, Flame, Rocket, Lightbulb, Heart, Share2, Check } from 'lucide-react';
import { fetchTechNews, reactToTechNews, TechNewsArticle, NewsReactions } from '../services/activityService';
import { GlowCard } from './GlowCard';

interface TechNewsSectionProps {
  isTechGirl?: boolean;
}

export function TechNewsSection({ isTechGirl }: TechNewsSectionProps) {
  const [news, setNews] = useState<TechNewsArticle[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('agora');
  const [userReactions, setUserReactions] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('resourceit_user_news_reactions');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadNews = async () => {
    setIsLoading(true);
    try {
      const items = await fetchTechNews();
      if (items.length > 0) {
        setNews(items);
        setLastUpdated(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (e) {
      console.error('Error loading tech news:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
    const interval = setInterval(loadNews, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, []);

  const handleReact = async (articleId: string, emojiType: 'fire' | 'rocket' | 'heart' | 'insight') => {
    const prevReaction = userReactions[articleId];
    const isSame = prevReaction === emojiType;
    const newReaction = isSame ? null : emojiType;

    // Optimistic UI update
    setNews(prev => prev.map(item => {
      if (item.id !== articleId) return item;
      const current = item.reactions || { fire: 10, rocket: 5, heart: 12, insight: 4 };
      const updated: NewsReactions = { ...current };

      if (prevReaction && updated[prevReaction as keyof NewsReactions] !== undefined) {
        updated[prevReaction as keyof NewsReactions] = Math.max(0, updated[prevReaction as keyof NewsReactions] - 1);
      }
      if (newReaction && updated[newReaction as keyof NewsReactions] !== undefined) {
        updated[newReaction as keyof NewsReactions] += 1;
      }
      return { ...item, reactions: updated };
    }));

    const updatedUserReactions = { ...userReactions };
    if (newReaction) {
      updatedUserReactions[articleId] = newReaction;
    } else {
      delete updatedUserReactions[articleId];
    }
    setUserReactions(updatedUserReactions);
    try {
      localStorage.setItem('resourceit_user_news_reactions', JSON.stringify(updatedUserReactions));
    } catch {}

    if (newReaction) {
      await reactToTechNews(articleId, emojiType);
    }
  };

  const handleShare = (article: TechNewsArticle) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(article.url);
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const categories = [
    { id: 'all', label: 'Todas as Notícias' },
    { id: 'Inteligência Artificial', label: 'IA & Agentes' },
    { id: 'Back-End & Cloud', label: 'Back-End & Cloud' },
    { id: 'Mercado & Vagas', label: 'Mercado & Salários' },
    { id: 'Desenvolvimento', label: 'Engenharia de Software' }
  ];

  const filteredNews = news.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Inteligência Artificial':
        return 'text-[#E0A34A] border-[#E0A34A]/40 bg-[#E0A34A]/20';
      case 'Back-End & Cloud':
        return 'text-[#38bdf8] border-[#1D5171]/50 bg-[#1D5171]/30';
      case 'Mercado & Vagas':
        return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/20';
      default:
        return 'text-[#E6E9EF] border-[#E6E9EF]/20 bg-[#103653]/40';
    }
  };

  return (
    <section id="noticias" aria-labelledby="noticias-heading" className="py-16 md:py-24 border-t border-[#E6E9EF]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6E9EF]/10 bg-[#103653]/30 mb-3">
              <Newspaper size={13} className="text-[#E0A34A]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E0A34A] font-semibold">
                Portal Tech & Comunidade
              </span>
            </div>
            <h2 id="noticias-heading" className="font-display text-2xl md:text-4xl font-bold text-[#E6E9EF] tracking-tight">
              O que está acontecendo no mundo tech.
            </h2>
            <p className="text-xs sm:text-sm text-[#A1AEC2] max-w-xl mt-2 leading-relaxed">
              Feed automatizado com imagens, discussões e reações em tempo real sobre inteligência artificial, engenharia de software e mercado.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E6E9EF]/10 bg-[#071528] text-xs font-mono text-[#A1AEC2]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span>Atualizado: {lastUpdated}</span>
            </div>
            <button
              type="button"
              onClick={loadNews}
              title="Atualizar notícias agora"
              className="p-2 rounded-xl border border-[#E6E9EF]/10 bg-[#071528] text-[#A1AEC2] hover:text-[#E6E9EF] hover:bg-[#103653]/40 transition-colors cursor-pointer"
            >
              <RefreshCw size={14} className={isLoading ? 'animate-spin text-[#246386]' : ''} />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'btn-primary text-white font-semibold shadow-sm'
                  : 'border-[#E6E9EF]/10 bg-[#071528] text-[#A1AEC2] hover:text-[#E6E9EF] hover:bg-[#103653]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* News Grid with Images and Reactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => {
            const currentReaction = userReactions[item.id];
            const reactions = item.reactions || { fire: 12, rocket: 8, heart: 16, insight: 5 };

            return (
              <GlowCard
                key={item.id}
                className={`overflow-hidden flex flex-col justify-between ${isTechGirl ? 'card-surface-techgirl' : ''}`}
              >
                <div>
                  {/* Article Cover Image with Overlay Badges */}
                  <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#030C1E] border-b border-[#E6E9EF]/10 group">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071528] via-transparent to-black/30" />

                    {/* Category & Time floating badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full border backdrop-blur-md font-semibold uppercase shadow-sm ${getCategoryBadge(item.category)}`}>
                        {item.category}
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[#030C1E]/80 backdrop-blur-md text-[#E6E9EF] border border-[#E6E9EF]/10">
                        {item.publishedAt}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-3 text-[10px] font-mono text-[#A1AEC2]">
                      <span className="px-1.5 py-0.5 rounded bg-[#030C1E]/80 border border-[#E6E9EF]/10">
                        {item.source}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 pb-3">
                    <h3 className="font-display text-base font-bold text-[#E6E9EF] mb-2 leading-snug hover:text-white transition-colors">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </h3>

                    <p className="text-xs text-[#A1AEC2] leading-relaxed line-clamp-3 mb-3">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Footer with Interactive Reactions and Link */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-[#E6E9EF]/10 flex flex-col gap-3">
                    
                    {/* Live React Emoji Bar */}
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5">
                        {/* Fire Reaction */}
                        <button
                          type="button"
                          onClick={() => handleReact(item.id, 'fire')}
                          title="Em alta / Incrível"
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                            currentReaction === 'fire'
                              ? 'bg-[#E0A34A]/25 border-[#E0A34A] text-[#E0A34A] font-bold scale-105 shadow-sm'
                              : 'bg-[#103653]/30 border-[#E6E9EF]/10 text-[#A1AEC2] hover:text-[#E6E9EF] hover:bg-[#103653]/60'
                          }`}
                        >
                          <Flame size={13} className={currentReaction === 'fire' ? 'text-[#E0A34A] fill-[#E0A34A]' : ''} />
                          <span>{reactions.fire}</span>
                        </button>

                        {/* Rocket Reaction */}
                        <button
                          type="button"
                          onClick={() => handleReact(item.id, 'rocket')}
                          title="Inovador / Foguete"
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                            currentReaction === 'rocket'
                              ? 'bg-[#246386]/30 border-[#38bdf8] text-[#38bdf8] font-bold scale-105 shadow-sm'
                              : 'bg-[#103653]/30 border-[#E6E9EF]/10 text-[#A1AEC2] hover:text-[#E6E9EF] hover:bg-[#103653]/60'
                          }`}
                        >
                          <Rocket size={13} className={currentReaction === 'rocket' ? 'text-[#38bdf8]' : ''} />
                          <span>{reactions.rocket}</span>
                        </button>

                        {/* Heart Reaction */}
                        <button
                          type="button"
                          onClick={() => handleReact(item.id, 'heart')}
                          title="Amei / Relevante"
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                            currentReaction === 'heart'
                              ? 'bg-[#967189]/30 border-[#967189] text-[#e879f9] font-bold scale-105 shadow-sm'
                              : 'bg-[#103653]/30 border-[#E6E9EF]/10 text-[#A1AEC2] hover:text-[#E6E9EF] hover:bg-[#103653]/60'
                          }`}
                        >
                          <Heart size={13} className={currentReaction === 'heart' ? 'text-[#e879f9] fill-[#e879f9]' : ''} />
                          <span>{reactions.heart}</span>
                        </button>
                      </div>

                      {/* Share / Copy link button */}
                      <button
                        type="button"
                        onClick={() => handleShare(item)}
                        title="Compartilhar matéria"
                        className="p-1.5 rounded-lg border border-[#E6E9EF]/10 bg-[#103653]/30 text-[#A1AEC2] hover:text-[#E6E9EF] hover:bg-[#103653]/60 transition-colors cursor-pointer"
                      >
                        {copiedId === item.id ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
                      </button>
                    </div>

                    {/* Read Full Article Link */}
                    <div className="flex items-center justify-between">
                      {item.author ? (
                        <span className="text-[11px] font-mono text-[#A1AEC2]/70 truncate max-w-[120px]">
                          @{item.author}
                        </span>
                      ) : <span />}

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#E6E9EF] hover:text-white transition-colors"
                      >
                        <span>Ler matéria completa</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>

                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
