export interface CommunityActivity {
  id: string;
  type: 'member' | 'opportunity' | 'study' | 'english' | 'project' | 'techgirl' | 'github';
  text: string;
  time: string;
  timestamp: number;
  source: 'WhatsApp' | 'GitHub' | 'Discord' | 'Telegram' | 'Tech Girl' | 'Comunidade';
  actor?: string;
}

export interface NewsReactions {
  fire: number;
  rocket: number;
  heart: number;
  insight: number;
}

export interface TechNewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: string;
  url: string;
  publishedAt: string;
  author?: string;
  tabcoins?: number;
  image?: string;
  reactions?: NewsReactions;
}

export interface RealJobItem {
  id: string;
  role: string;
  company: string;
  type: string;
  level: string;
  location: string;
  tech: string[];
  description: string;
  link: string;
  date: string;
  timestamp: number;
  source: string;
}

const STORAGE_KEY = 'resourceit_real_activities_v1';
const API_BASE = '/api';

const defaultRealActivities: CommunityActivity[] = [
  {
    id: 'w-1',
    type: 'member',
    text: 'Novo integrante ingressou no grupo Resource IT | Back-End',
    time: 'agora',
    timestamp: Date.now() - 60000,
    source: 'WhatsApp'
  },
  {
    id: 'gh-1',
    type: 'project',
    text: 'Novo commit registrado no repositório resourceitmarquez',
    time: 'há 15 min',
    timestamp: Date.now() - 900000,
    source: 'GitHub',
    actor: 'alysonmarquez'
  },
  {
    id: 'w-2',
    type: 'english',
    text: 'Aviso de aula de conversação em grupo agendada',
    time: 'há 45 min',
    timestamp: Date.now() - 2700000,
    source: 'WhatsApp'
  },
  {
    id: 'w-3',
    type: 'opportunity',
    text: 'Nova vaga para Desenvolvedor(a) compartilhada no grupo de Vagas',
    time: 'há 2 horas',
    timestamp: Date.now() - 7200000,
    source: 'WhatsApp'
  },
  {
    id: 'tg-1',
    type: 'techgirl',
    text: 'Nova participante validada na Comunidade Tech Girl',
    time: 'há 3 horas',
    timestamp: Date.now() - 10800000,
    source: 'Tech Girl'
  }
];

function getStoredActivities(): CommunityActivity[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultRealActivities;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultRealActivities;
  } catch {
    return defaultRealActivities;
  }
}

function saveStoredActivities(activities: CommunityActivity[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities.slice(0, 30)));
  } catch (e) {
    console.error('Error saving activities to localStorage:', e);
  }
}

export function formatRelativeTime(timestamp: number): string {
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 45) return 'agora';
  if (diffSec < 3600) return `há ${Math.floor(diffSec / 60)} min`;
  if (diffSec < 86400) return `há ${Math.floor(diffSec / 3600)}h`;
  return `há ${Math.floor(diffSec / 86400)}d`;
}

// Fetch real public events from GitHub API
export async function fetchRealGitHubEvents(username: string = 'alysonmarquez'): Promise<CommunityActivity[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=10`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });
    clearTimeout(timeoutId);

    if (!response.ok) return [];
    
    const events = await response.json();
    if (!Array.isArray(events)) return [];

    return events
      .filter((ev: any) => ev.type === 'PushEvent' || ev.type === 'CreateEvent' || ev.type === 'WatchEvent')
      .slice(0, 4)
      .map((ev: any) => {
        const repoName = ev.repo?.name ? ev.repo.name.replace(`${username}/`, '') : 'repo';
        let actionText = '';
        if (ev.type === 'PushEvent') {
          const count = ev.payload?.commits?.length || 1;
          actionText = `${count} commit(s) enviado(s) para o projeto ${repoName}`;
        } else if (ev.type === 'CreateEvent') {
          actionText = `Criou nova branch/tag no projeto ${repoName}`;
        } else {
          actionText = `Atualizou o projeto ${repoName}`;
        }

        const createdAt = new Date(ev.created_at).getTime();

        return {
          id: `gh-${ev.id}`,
          type: 'github' as const,
          text: actionText,
          time: formatRelativeTime(createdAt),
          timestamp: createdAt,
          source: 'GitHub' as const,
          actor: `@${username}`
        };
      });
  } catch {
    return [];
  }
}

// Fetch real live Tech News from /api/tech-news
export async function fetchTechNews(): Promise<TechNewsArticle[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`${API_BASE}/tech-news`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) return [];
    const data = await res.json();
    return (data.news || []) as TechNewsArticle[];
  } catch {
    return [];
  }
}

// React to Tech News
export async function reactToTechNews(newsId: string, emoji: 'fire' | 'rocket' | 'heart' | 'insight'): Promise<NewsReactions | null> {
  try {
    const res = await fetch(`${API_BASE}/tech-news/${newsId}/react`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emoji })
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.reactions as NewsReactions;
  } catch {
    return null;
  }
}

// Fetch real live Jobs from /api/jobs
export async function fetchRealJobs(): Promise<RealJobItem[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${API_BASE}/jobs`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) return [];
    const data = await res.json();
    return (data.jobs || []) as RealJobItem[];
  } catch {
    return [];
  }
}

// Merge and return real activities
export async function getRealActivities(): Promise<CommunityActivity[]> {
  const localActivities = getStoredActivities();
  const githubActivities = await fetchRealGitHubEvents('alysonmarquez');

  let backendActivities: CommunityActivity[] = [];
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE}/activities`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      backendActivities = await res.json();
    }
  } catch {}

  const mergedMap = new Map<string, CommunityActivity>();

  [...backendActivities, ...githubActivities, ...localActivities].forEach(act => {
    if (!mergedMap.has(act.id)) {
      mergedMap.set(act.id, act);
    }
  });

  const merged = Array.from(mergedMap.values());
  merged.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  return merged.slice(0, 15);
}

export interface CommunityGroup {
  id: string;
  name: string;
  category: string;
  platform: string;
  link: string;
  membersCount: number;
  status: string;
  description: string;
}

export interface CommunityGroupsResponse {
  totalMembers: number;
  groups: CommunityGroup[];
}

export async function fetchCommunityGroups(): Promise<CommunityGroupsResponse | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${API_BASE}/groups`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const data = await res.json();
    return data as CommunityGroupsResponse;
  } catch {
    return null;
  }
}

export interface PresenceData {
  online: number;
  details: {
    discordOnline: number;
    webVisitors: number;
  };
}

export function getVisitorId(): string {
  try {
    let id = sessionStorage.getItem('resourceit_visitor_id');
    if (!id) {
      id = `vis_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      sessionStorage.setItem('resourceit_visitor_id', id);
    }
    return id;
  } catch {
    return 'vis_fallback';
  }
}

export async function sendPresenceHeartbeat(): Promise<void> {
  try {
    const visitorId = getVisitorId();
    await fetch(`${API_BASE}/heartbeat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId })
    });
  } catch {}
}

export async function fetchRealPresence(): Promise<PresenceData | null> {
  try {
    await sendPresenceHeartbeat();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`${API_BASE}/presence`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
