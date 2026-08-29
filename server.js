import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'activities.json');
const GROUPS_FILE = path.join(__dirname, 'groups.json');

// Active web visitors in-memory heartbeat tracker
const activeVisitors = new Map();

// Periodic cleanup of inactive visitors (> 30s without heartbeat)
setInterval(() => {
  const now = Date.now();
  for (const [id, lastSeen] of activeVisitors.entries()) {
    if (now - lastSeen > 30000) {
      activeVisitors.delete(id);
    }
  }
}, 10000);

const defaultGroups = [
  {
    id: '120363420184891232@g.us',
    name: 'Resource IT Marquez - Geral',
    category: 'Geral',
    platform: 'WhatsApp',
    link: 'https://chat.whatsapp.com/LWFPj7qWEE11VCgcEvchHi',
    membersCount: 330,
    status: 'Ativo • Oficial',
    description: 'Networking principal, avisos oficiais, dúvidas e conexões na área tech.'
  },
  {
    id: '120363413475472336@g.us',
    name: 'Tech Girl (Apenas Mulheres)',
    category: 'Tech Girl',
    platform: 'WhatsApp',
    link: 'https://chat.whatsapp.com/LWFPj7qWEE11VCgcEvchHi',
    membersCount: 270,
    status: 'Ativo • Oficial',
    description: 'Espaço seguro e exclusivo para mulheres desenvolvedoras e estudantes.'
  },
  {
    id: '120363418472486998@g.us',
    name: 'Resource IT Marquez - Vagas & Ofertas Tech',
    category: 'Vagas & Ofertas',
    platform: 'WhatsApp',
    link: 'https://chat.whatsapp.com/Hwfpb0H9atAHnKom9HMq4s',
    membersCount: 185,
    status: 'Ativo • Oficial',
    description: 'Oportunidades de estágio, vagas Jr/Pleno/Sênior e descontos tech.'
  },
  {
    id: 'tg-canal',
    name: 'Resource IT | Canal Oficial',
    category: 'Telegram',
    platform: 'Telegram',
    link: 'https://t.me/+Wu8bsrBmcBpkNzQx',
    membersCount: 38,
    status: 'Ativo',
    description: 'Canal de avisos rápidos, transmissões e novidades.'
  },
  {
    id: 'dc-servidor',
    name: 'Resource IT | Servidor Discord',
    category: 'Discord',
    platform: 'Discord',
    link: 'https://discord.gg/6P8Qka2zk',
    membersCount: 17,
    status: 'Ativo',
    description: 'Canais de voz, salas de estudos e sessões de pair programming.'
  }
];

function readGroups() {
  try {
    if (!fs.existsSync(GROUPS_FILE)) {
      writeGroups(defaultGroups);
      return defaultGroups;
    }
    const data = fs.readFileSync(GROUPS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading groups db:', err);
    return defaultGroups;
  }
}

function writeGroups(groups) {
  try {
    fs.writeFileSync(GROUPS_FILE, JSON.stringify(groups, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing groups db:', err);
  }
}

function readActivities() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading activities db:', err);
    return [];
  }
}

function writeActivities(activities) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(activities.slice(0, 100), null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing activities db:', err);
  }
}

// Cache for external presence data
let cachedDiscordPresence = { online: 6, total: 17, lastFetch: 0 };
let cachedTelegramCount = { total: 38, lastFetch: 0 };

async function getLiveDiscordStats() {
  const now = Date.now();
  if (now - cachedDiscordPresence.lastFetch < 30000) {
    return cachedDiscordPresence;
  }
  try {
    const res = await fetch('https://discord.com/api/v9/invites/6P8Qka2zk?with_counts=true');
    if (res.ok) {
      const data = await res.json();
      cachedDiscordPresence = {
        online: data.approximate_presence_count || 6,
        total: data.approximate_member_count || 17,
        lastFetch: now
      };
    }
  } catch (e) {
    console.warn('Discord stats fetch error:', e.message);
  }
  return cachedDiscordPresence;
}

async function getLiveTelegramStats() {
  const now = Date.now();
  if (now - cachedTelegramCount.lastFetch < 60000) {
    return cachedTelegramCount;
  }
  try {
    const res = await fetch('https://t.me/+Wu8bsrBmcBpkNzQx', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    if (res.ok) {
      const text = await res.text();
      const match = text.match(/<div class="tgme_page_extra">([^<]+)<\/div>/i);
      if (match) {
        const num = parseInt(match[1].replace(/\D/g, ''), 10);
        if (!isNaN(num) && num > 0) {
          cachedTelegramCount = { total: num, lastFetch: now };
        }
      }
    }
  } catch (e) {
    console.warn('Telegram stats fetch error:', e.message);
  }
  return cachedTelegramCount;
}

// GET all activities
app.get('/api/activities', (req, res) => {
  const activities = readActivities();
  res.json({ success: true, activities });
});

// POST heartbeat to track real active visitors on the landing page
app.post('/api/presence/heartbeat', (req, res) => {
  const visitorId = req.body.visitorId || req.ip || 'anon';
  activeVisitors.set(visitorId, Date.now());
  res.json({ success: true, activeVisitorsCount: activeVisitors.size });
});

// GET real presence (real online Discord + real active web visitors)
app.get('/api/presence', async (req, res) => {
  const discordStats = await getLiveDiscordStats();
  const telegramStats = await getLiveTelegramStats();
  const webVisitors = Math.max(1, activeVisitors.size);
  const totalOnline = discordStats.online + webVisitors;

  const groups = readGroups();
  const totalMembers = groups.reduce((acc, g) => acc + (Number(g.membersCount) || 0), 0);

  res.json({
    success: true,
    online: totalOnline,
    details: {
      discordOnline: discordStats.online,
      webVisitors,
      discordMembers: discordStats.total,
      telegramMembers: telegramStats.total
    },
    totalMembers
  });
});

// GET all community groups with real member count
app.get('/api/community/groups', async (req, res) => {
  const discordStats = await getLiveDiscordStats();
  const telegramStats = await getLiveTelegramStats();
  const groups = readGroups().map(g => {
    if (g.id === 'dc-servidor') {
      return { ...g, membersCount: discordStats.total };
    }
    if (g.id === 'tg-canal') {
      return { ...g, membersCount: telegramStats.total };
    }
    return g;
  });

  const totalMembers = groups.reduce((acc, g) => acc + (Number(g.membersCount) || 0), 0);
  res.json({ 
    success: true, 
    totalMembers,
    groupsCount: groups.length,
    groups 
  });
});

// POST webhook to sync real group member counts from WhatsApp Bot
app.post('/api/webhook/group-sync', (req, res) => {
  const { groups } = req.body;
  if (!Array.isArray(groups)) {
    return res.status(400).json({ error: 'Payload must contain a groups array.' });
  }

  const current = readGroups();
  const map = new Map();
  current.forEach(g => map.set(g.id || g.name, g));

  groups.forEach(incoming => {
    const key = incoming.id || incoming.name;
    if (map.has(key)) {
      const existing = map.get(key);
      map.set(key, { ...existing, ...incoming, lastSync: new Date().toISOString() });
    } else {
      map.set(key, { ...incoming, lastSync: new Date().toISOString() });
    }
  });

  const updated = Array.from(map.values());
  writeGroups(updated);

  const totalMembers = updated.reduce((acc, g) => acc + (Number(g.membersCount) || 0), 0);
  console.log(`[Group Sync] Grupos sincronizados com sucesso! Total de membros: ${totalMembers}`);

  res.json({ success: true, totalMembers, groups: updated });
});

// POST webhook endpoint to receive real WhatsApp events
app.post('/api/webhook/whatsapp', (req, res) => {
  const body = req.body || {};
  console.log('Received WhatsApp Webhook Event:', JSON.stringify(body, null, 2));

  let text = body.text || body.message || body.caption || '';
  let type = body.type || 'member';
  let actor = body.pushName || body.sender || 'Membro';

  if (body.event === 'group-participants.update' || body.action === 'add') {
    text = body.text || `Novo participante (${actor}) entrou no grupo ${body.groupName || 'do WhatsApp'}`;
    type = body.type || 'member';
  } else if (text.toLowerCase().includes('vaga') || text.toLowerCase().includes('oportunidade')) {
    type = 'opportunity';
    text = `Nova oportunidade compartilhada: "${text.substring(0, 60)}..."`;
  } else if (text.toLowerCase().includes('aula') || text.toLowerCase().includes('english') || text.toLowerCase().includes('inglês')) {
    type = 'english';
    text = `Novo aviso sobre Aulas de Inglês: "${text.substring(0, 60)}..."`;
  } else if (text) {
    type = 'study';
    text = `${actor}: "${text.substring(0, 60)}..."`;
  } else {
    text = 'Nova mensagem compartilhada na comunidade';
  }

  const newActivity = {
    id: `wa-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type,
    text,
    timestamp: Date.now(),
    source: 'WhatsApp',
    actor
  };

  const current = readActivities();
  writeActivities([newActivity, ...current]);

  res.status(200).json({ success: true, received: newActivity });
});

// POST webhook endpoint for Discord
app.post('/api/webhook/discord', (req, res) => {
  const body = req.body || {};
  const newActivity = {
    id: `dc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type: body.type || 'member',
    text: body.text || 'Novo evento no Discord da comunidade',
    timestamp: Date.now(),
    source: 'Discord',
    actor: body.username || 'Dev'
  };

  const current = readActivities();
  writeActivities([newActivity, ...current]);
  res.status(200).json({ success: true, received: newActivity });
});

app.listen(PORT, () => {
  console.log(`Resource IT Activity API running on http://localhost:${PORT}`);
});
