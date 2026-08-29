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
const JOBS_FILE = path.join(__dirname, 'jobs.json');

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
    id: 'wa-comunidade',
    name: 'Comunidade Resource IT Marquez',
    category: 'Comunidade',
    platform: 'WhatsApp',
    link: 'https://chat.whatsapp.com/HBLOJ121r0YIJu8zNfY5B3',
    membersCount: 330,
    status: 'Ativo • Principal',
    description: 'Comunidade central, networking, conexões e projetos.'
  },
  {
    id: 'wa-geral',
    name: 'Resource IT Marquez - Geral',
    category: 'Geral',
    platform: 'WhatsApp',
    link: 'https://chat.whatsapp.com/LWFPj7qWEE11VCgcEvchHi',
    membersCount: 270,
    status: 'Ativo • Oficial',
    description: 'Chat geral de discussões, dúvidas técnicas e suporte.'
  },
  {
    id: 'wa-vagas',
    name: 'Resource IT Marquez - Vagas e Freelas',
    category: 'Vagas & Freelas',
    platform: 'WhatsApp',
    link: 'https://chat.whatsapp.com/LbQSl8Q2tjcGluF2He3zI6',
    membersCount: 110,
    status: 'Ativo • Feed em Tempo Real',
    description: 'Vagas de emprego tech, estágios e oportunidades freelance postadas em tempo real.'
  },
  {
    id: 'wa-ofertas',
    name: '🏷️ Resource IT Marquez - Ofertas Tech',
    category: 'Ofertas & Descontos',
    platform: 'WhatsApp',
    link: 'https://chat.whatsapp.com/Hwfpb0H9atAHnKom9HMq4s',
    membersCount: 75,
    status: 'Ativo • Oficial',
    description: 'Promoções de hardware, cursos, periféricos e livros tech.'
  },
  {
    id: 'tg-canal',
    name: 'Resource IT | Canal Oficial',
    category: 'Telegram',
    platform: 'Telegram',
    link: 'https://t.me/+Wu8bsrBmcBpkNzQx',
    membersCount: 38,
    status: 'Ativo • Oficial',
    description: 'Canal de avisos rápidos, transmissões e novidades.'
  },
  {
    id: 'dc-servidor',
    name: 'Resource IT | Servidor Discord',
    category: 'Discord',
    platform: 'Discord',
    link: 'https://discord.gg/6P8Qka2zk',
    membersCount: 17,
    status: 'Ativo • Oficial',
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
    fs.writeFileSync(DB_FILE, JSON.stringify(activities, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing activities db:', err);
  }
}

function readJobs() {
  try {
    if (!fs.existsSync(JOBS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(JOBS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading jobs db:', err);
    return [];
  }
}

function writeJobs(jobs) {
  try {
    fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing jobs db:', err);
  }
}

// -------------------------------------------------------------
// Tech News Cache & Aggregator (TabNews & Dev.to API)
// -------------------------------------------------------------
let cachedNews = [];
let lastNewsFetch = 0;

async function fetchLiveTechNews() {
  const now = Date.now();
  if (cachedNews.length > 0 && now - lastNewsFetch < 1000 * 60 * 10) {
    return cachedNews;
  }

  try {
    const response = await fetch('https://www.tabnews.com.br/api/v1/contents?strategy=relevant&per_page=15');
    if (response.ok) {
      const items = await response.json();
      const news = items
        .filter(item => item.title && !item.parent_id)
        .slice(0, 10)
        .map(item => {
          let category = 'Geral';
          const t = item.title.toLowerCase();
          if (t.includes('ia') || t.includes('ai') || t.includes('gpt') || t.includes('llm') || t.includes('inteligência')) category = 'Inteligência Artificial';
          else if (t.includes('backend') || t.includes('api') || t.includes('node') || t.includes('banco') || t.includes('sql') || t.includes('java')) category = 'Back-End & Cloud';
          else if (t.includes('vaga') || t.includes('salário') || t.includes('carreira') || t.includes('mercado') || t.includes('emprego')) category = 'Mercado & Vagas';
          else if (t.includes('react') || t.includes('next') || t.includes('css') || t.includes('front')) category = 'Front-End';

          return {
            id: `tabnews-${item.id}`,
            title: item.title,
            summary: item.body ? item.body.substring(0, 160).replace(/[#*`_]/g, '') + '...' : 'Confira a publicação completa na comunidade.',
            source: 'TabNews',
            category,
            url: `https://www.tabnews.com.br/${item.owner_username}/${item.slug}`,
            publishedAt: new Date(item.published_at || item.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
            author: item.owner_username,
            tabcoins: item.tabcoins || 1
          };
        });

      if (news.length > 0) {
        cachedNews = news;
        lastNewsFetch = now;
        return cachedNews;
      }
    }
  } catch (err) {
    console.error('Error fetching live tech news:', err.message);
  }

  // Fallback if network unavailable
  if (cachedNews.length === 0) {
    cachedNews = [
      {
        id: 'news-fallback-1',
        title: 'Modelos de Raciocínio e Agentes Autônomos Transformam o Desenvolvimento de Software',
        summary: 'Novas arquiteturas de IA permitem geração e depuração contínua de código em repositórios complexos.',
        source: 'Mundo Tech',
        category: 'Inteligência Artificial',
        url: 'https://news.ycombinator.com',
        publishedAt: 'Hoje',
        author: 'Equipe Tech',
        tabcoins: 45
      },
      {
        id: 'news-fallback-2',
        title: 'Mercado de TI em 2025: Alta Demanda por Engenheiros de Back-End e Cloud',
        summary: 'Pesquisa aponta crescimento contínuo para especialistas em microsserviços, Go, C# .NET e segurança.',
        source: 'Carreira Tech',
        category: 'Mercado & Vagas',
        url: 'https://chat.whatsapp.com/LbQSl8Q2tjcGluF2He3zI6',
        publishedAt: 'Hoje',
        author: 'Resource IT News',
        tabcoins: 38
      }
    ];
  }
  return cachedNews;
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// 1. GET /api/tech-news (Automatic Tech News Portal)
app.get('/api/tech-news', async (req, res) => {
  try {
    const news = await fetchLiveTechNews();
    res.json({ success: true, count: news.length, news });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// 2. GET /api/jobs (Real Automated Jobs Feed)
app.get('/api/jobs', (req, res) => {
  const jobs = readJobs();
  res.json({ success: true, count: jobs.length, jobs });
});

// 3. POST /api/webhook/job (WhatsApp Bot Vagas Webhook)
app.post('/api/webhook/job', (req, res) => {
  const { role, company, type, level, location, tech, description, link, sender } = req.body;
  if (!role && !description) {
    return res.status(400).json({ error: 'Conteúdo da vaga obrigatório' });
  }

  const jobs = readJobs();
  const newJob = {
    id: `job-${Date.now()}`,
    role: role || 'Nova Oportunidade Compartilhada',
    company: company || 'Comunidade Resource IT',
    type: type || 'Remoto / Presencial',
    level: level || 'Júnior / Pleno',
    location: location || 'Brasil',
    tech: Array.isArray(tech) ? tech : ['Tech', 'Dev'],
    description: description || 'Confira os detalhes completos no grupo oficial de vagas.',
    link: link || 'https://chat.whatsapp.com/LbQSl8Q2tjcGluF2He3zI6',
    date: 'Agora',
    timestamp: Date.now(),
    source: sender ? `Postado por ${sender}` : 'Grupo de Vagas WhatsApp'
  };

  jobs.unshift(newJob);
  if (jobs.length > 50) jobs.pop();
  writeJobs(jobs);

  // Also log as community activity
  const activities = readActivities();
  activities.unshift({
    id: `act-job-${Date.now()}`,
    text: `💼 Nova vaga postada no grupo: ${newJob.role}`,
    source: 'WhatsApp',
    type: 'opportunity',
    actor: sender || 'Comunidade Vagas',
    timestamp: Date.now(),
    time: 'Agora'
  });
  if (activities.length > 50) activities.pop();
  writeActivities(activities);

  res.status(201).json({ success: true, job: newJob });
});

// 4. Presence & Heartbeat
app.post('/api/heartbeat', (req, res) => {
  const visitorId = req.body.visitorId || req.ip || 'anonymous';
  activeVisitors.set(visitorId, Date.now());
  res.json({ status: 'ok', activeVisitors: activeVisitors.size });
});

app.get('/api/presence', async (req, res) => {
  const webVisitors = activeVisitors.size || 1;
  let discordOnline = 7;

  try {
    const dcRes = await fetch('https://discord.com/api/v9/invites/6P8Qka2zk?with_counts=true');
    if (dcRes.ok) {
      const dcData = await dcRes.json();
      if (dcData.approximate_presence_count) {
        discordOnline = dcData.approximate_presence_count;
      }
    }
  } catch (e) {}

  const totalPresence = discordOnline + webVisitors;

  res.json({
    online: totalPresence,
    details: {
      discordOnline,
      webVisitors
    }
  });
});

// 5. Activities Feed
app.get('/api/activities', (req, res) => {
  const activities = readActivities();
  res.json(activities);
});

app.post('/api/webhook/activity', (req, res) => {
  const { text, source, type, actor, metadata } = req.body;
  if (!text) return res.status(400).json({ error: 'Texto obrigatório' });

  const activities = readActivities();
  const newActivity = {
    id: `act-${Date.now()}`,
    text,
    source: source || 'WhatsApp',
    type: type || 'member',
    actor: actor || '',
    metadata: metadata || {},
    timestamp: Date.now(),
    time: 'Agora'
  };

  activities.unshift(newActivity);
  if (activities.length > 50) activities.pop();
  writeActivities(activities);

  res.status(201).json({ success: true, activity: newActivity });
});

// 6. Community Groups
app.get('/api/groups', (req, res) => {
  const groups = readGroups();
  const totalMembers = groups.reduce((acc, g) => acc + (g.membersCount || 0), 0);
  res.json({
    totalMembers,
    groups
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Resource IT Marquez Server running on port ${PORT}`);
});
