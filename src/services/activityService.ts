export interface CommunityActivity {
  id: string;
  type: 'member' | 'opportunity' | 'study' | 'english' | 'project' | 'techgirl' | 'github';
  text: string;
  time: string;
  timestamp: number;
  source: 'WhatsApp' | 'GitHub' | 'Discord' | 'Telegram' | 'Tech Girl' | 'Comunidade';
  actor?: string;
}

const STORAGE_KEY = 'resourceit_real_activities_v1';

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
    text: 'Nova vaga para Desenvolvedor(a) compartilhada no grupo de Ofertas',
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

// Fetch real public events from GitHub API with fast timeout
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

    const githubActivities: CommunityActivity[] = [];

    for (const ev of events) {
      const repoName = ev.repo?.name ? ev.repo.name.split('/')[1] || ev.repo.name : 'repositório';
      const actor = ev.actor?.display_login || ev.actor?.login || username;
      const createdAt = new Date(ev.created_at).getTime();

      if (ev.type === 'PushEvent') {
        const commitCount = ev.payload?.commits?.length || 1;
        const msg = ev.payload?.commits?.[0]?.message || 'Atualização no código';
        githubActivities.push({
          id: `gh-${ev.id}`,
          type: 'project',
          text: `${actor} enviou ${commitCount} commit(s) em ${repoName}: "${msg.substring(0, 50)}${msg.length > 50 ? '...' : ''}"`,
          time: formatRelativeTime(createdAt),
          timestamp: createdAt,
          source: 'GitHub',
          actor
        });
      } else if (ev.type === 'CreateEvent') {
        githubActivities.push({
          id: `gh-${ev.id}`,
          type: 'project',
          text: `${actor} criou novo branch/repositório: ${repoName}`,
          time: formatRelativeTime(createdAt),
          timestamp: createdAt,
          source: 'GitHub',
          actor
        });
      } else if (ev.type === 'WatchEvent') {
        githubActivities.push({
          id: `gh-${ev.id}`,
          type: 'member',
          text: `Novo dev favoritou o repositório ${repoName}`,
          time: formatRelativeTime(createdAt),
          timestamp: createdAt,
          source: 'GitHub',
          actor
        });
      }
    }

    return githubActivities;
  } catch (error) {
    return [];
  }
}

// Fetch real events from local Webhook API with fast timeout
export async function fetchWebhookActivities(): Promise<CommunityActivity[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch('http://localhost:3001/api/activities', { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) return [];
    const data = await res.json();
    if (data && Array.isArray(data.activities)) {
      return data.activities.map((a: any) => ({
        id: a.id,
        type: a.type || 'member',
        text: a.text,
        time: formatRelativeTime(a.timestamp),
        timestamp: a.timestamp,
        source: a.source || 'WhatsApp',
        actor: a.actor
      }));
    }
    return [];
  } catch {
    return [];
  }
}

// Hook or manager to get merged real activities
export async function getRealActivities(): Promise<CommunityActivity[]> {
  const local = getStoredActivities();
  const ghEvents = await fetchRealGitHubEvents();
  const webhookEvents = await fetchWebhookActivities();
  
  // Merge and deduplicate by id
  const map = new Map<string, CommunityActivity>();
  local.forEach(item => map.set(item.id, item));
  webhookEvents.forEach(item => map.set(item.id, item));
  ghEvents.forEach(item => map.set(item.id, item));

  const merged = Array.from(map.values()).sort((a, b) => b.timestamp - a.timestamp);
  
  // Re-format relative times
  const formatted = merged.map(item => ({
    ...item,
    time: formatRelativeTime(item.timestamp)
  }));

  saveStoredActivities(formatted);
  return formatted;
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
  success: boolean;
  totalMembers: number;
  groupsCount: number;
  groups: CommunityGroup[];
}

export async function fetchCommunityGroups(): Promise<CommunityGroupsResponse | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch('http://localhost:3001/api/community/groups', { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const data = await res.json();
    return data as CommunityGroupsResponse;
  } catch {
    return null;
  }
}

export interface PresenceData {
  success: boolean;
  online: number;
  details: {
    discordOnline: number;
    webVisitors: number;
    discordMembers: number;
    telegramMembers: number;
  };
  totalMembers: number;
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
    await fetch('http://localhost:3001/api/presence/heartbeat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId })
    });
  } catch {
    // Silent fail if local backend is not running
  }
}

export async function fetchRealPresence(): Promise<PresenceData | null> {
  try {
    await sendPresenceHeartbeat();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch('http://localhost:3001/api/presence', { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Function to push a real WhatsApp/Webhook event into the feed
export function addRealActivity(activity: Omit<CommunityActivity, 'id' | 'timestamp' | 'time'>): CommunityActivity {
  const newActivity: CommunityActivity = {
    ...activity,
    id: `event-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    time: 'agora'
  };

  const current = getStoredActivities();
  const updated = [newActivity, ...current].slice(0, 30);
  saveStoredActivities(updated);
  return newActivity;
}
