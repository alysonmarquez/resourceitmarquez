import { useState, useEffect } from 'react';
import { Newspaper, ArrowUpRight, Sparkles, RefreshCw, ExternalLink, Flame, Cpu, Cloud, Briefcase } from 'lucide-react';
import { fetchTechNews, TechNewsArticle } from '../services/activityService';
import { GlowCard } from './GlowCard';

interface TechNewsSectionProps {
  isTechGirl?: boolean;
}

export function TechNewsSection({ isTechGirl }: TechNewsSectionProps) {
  const [news, setNews] = useState<TechNewsArticle[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('agora');

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

    // Auto refresh every 5 minutes
    const interval = setInterval(() => {
      loadNews();
    }, 1000 * 60 * 5);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'Inteligência Artificial', label: 'IA & Agentes' },
    { id: 'Back-End & Cloud', label: 'Back-End & Cloud' },
    { id: 'Mercado & Vagas', label: 'Mercado & Carreira' }
  ];

  const filteredNews = news.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Inteligência Artificial':
        return 'text-[#E0A34A] border-[#E0A34A]/30 bg-[#E0A34A]/10';
      case 'Back-End & Cloud':
        return 'text-[#38bdf8] border-[#1D5171]/40 bg-[#1D5171]/20';
      case 'Mercado & Vagas':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      default:
        return 'text-[#E6E9EF] border-[#E6E9EF]/15 bg-[#103653]/30';
    }
  };

  return (
    <section id="noticias" aria-labelledby="noticias-heading" className="py-16 md:py-24 border-t border-[#E6E9EF]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Auto-Update Info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6E9EF]/10 bg-[#103653]/30 mb-3">
              <Newspaper size={13} className="text-[#E0A34A]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E0A34A] font-semibold">
                Portal Tech em Tempo Real
              </span>
            </div>
            <h2 id="noticias-heading" className="font-display text-2xl md:text-4xl font-bold text-[#E6E9EF] tracking-tight">
              O que está acontecendo no mundo tech.
            </h2>
            <p className="text-xs sm:text-sm text-[#A1AEC2] max-w-xl mt-2 leading-relaxed">
              Feed automatizado com as principais discussões, lançamentos de IA, novidades de desenvolvimento e movimentações do mercado.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#E6E9EF]/10 bg-[#071528] text-xs font-mono text-[#A1AEC2]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span>Atualizado: {lastUpdated}</span>
            </div>
            <button
              type="button"
              onClick={loadNews}
              title="Atualizar notícias"
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

        {/* News Grid (3 Columns on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNews.map((item) => (
            <GlowCard
              key={item.id}
              className={`p-6 ${isTechGirl ? 'card-surface-techgirl' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full border font-semibold uppercase ${getCategoryBadge(item.category)}`}>
                    {item.category}
                  </span>
                  <span className="font-mono text-[11px] text-[#A1AEC2]/60">
                    {item.publishedAt}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-[#E6E9EF] mb-2 leading-snug hover:text-white transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#A1AEC2] leading-relaxed line-clamp-3 mb-4">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E6E9EF]/10 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#A1AEC2]/70">
                  <span className="px-1.5 py-0.5 rounded bg-[#103653]/40 border border-[#E6E9EF]/10 text-[10px] text-[#E6E9EF]">
                    {item.source}
                  </span>
                  {item.author && <span className="truncate max-w-[100px]">@{item.author}</span>}
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#E6E9EF] hover:text-white transition-colors"
                >
                  <span>Ler matéria</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </GlowCard>
          ))}
        </div>

      </div>
    </section>
  );
}
