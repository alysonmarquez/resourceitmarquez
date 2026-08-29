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
const REACTIONS_FILE = path.join(__dirname, 'news_reactions.json');

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
    return defaultGroups;
  }
}

function writeGroups(groups) {
  try {
    fs.writeFileSync(GROUPS_FILE, JSON.stringify(groups, null, 2), 'utf8');
  } catch (err) {}
}

function readActivities() {
  try {
    if (!fs.existsSync(DB_FILE)) return [];
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (err) {
    return [];
  }
}

function writeActivities(activities) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(activities, null, 2), 'utf8');
  } catch (err) {}
}

function readJobs() {
  try {
    if (!fs.existsSync(JOBS_FILE)) return [];
    return JSON.parse(fs.readFileSync(JOBS_FILE, 'utf8'));
  } catch (err) {
    return [];
  }
}

function writeJobs(jobs) {
  try {
    fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2), 'utf8');
  } catch (err) {}
}

function readReactions() {
  try {
    if (!fs.existsSync(REACTIONS_FILE)) return {};
    return JSON.parse(fs.readFileSync(REACTIONS_FILE, 'utf8'));
  } catch (err) {
    return {};
  }
}

function writeReactions(reactions) {
  try {
    fs.writeFileSync(REACTIONS_FILE, JSON.stringify(reactions, null, 2), 'utf8');
  } catch (err) {}
}

// -------------------------------------------------------------
// Tech News Cache & Aggregator with Images & Reactions
// -------------------------------------------------------------
let cachedNews = [];
let lastNewsFetch = 0;

const defaultImages = {
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
  backend: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  code: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  career: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  general: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
};

async function fetchLiveTechNews() {
  const now = Date.now();
  if (cachedNews.length > 0 && now - lastNewsFetch < 1000 * 60 * 10) {
    const reactions = readReactions();
    return cachedNews.map(item => ({
      ...item,
      reactions: reactions[item.id] || item.reactions
    }));
  }

  let newsList = [];
  const reactions = readReactions();

  try {
    // 1. Fetch from Dev.to API (Includes direct cover_image)
    const devToPromise = fetch('https://dev.to/api/articles?per_page=6&top=1')
      .then(r => r.ok ? r.json() : [])
      .catch(() => []);

    // 2. Fetch from TabNews API
    const tabNewsPromise = fetch('https://www.tabnews.com.br/api/v1/contents?strategy=relevant&per_page=10')
      .then(r => r.ok ? r.json() : [])
      .catch(() => []);

    const [devToArticles, tabNewsItems] = await Promise.all([devToPromise, tabNewsPromise]);

    if (Array.isArray(tabNewsItems)) {
      tabNewsItems.filter(item => item.title && !item.parent_id).slice(0, 5).forEach((item, idx) => {
        let category = 'Geral';
        let img = defaultImages.general;
        const t = (item.title + ' ' + (item.body || '')).toLowerCase();

        if (t.includes('ia') || t.includes('ai') || t.includes('gpt') || t.includes('llm') || t.includes('inteligência')) {
          category = 'Inteligência Artificial';
          img = defaultImages.ai;
        } else if (t.includes('backend') || t.includes('api') || t.includes('node') || t.includes('banco') || t.includes('sql') || t.includes('java') || t.includes('cloud')) {
          category = 'Back-End & Cloud';
          img = defaultImages.backend;
        } else if (t.includes('vaga') || t.includes('salário') || t.includes('carreira') || t.includes('mercado') || t.includes('emprego')) {
          category = 'Mercado & Vagas';
          img = defaultImages.career;
        } else if (t.includes('react') || t.includes('next') || t.includes('css') || t.includes('front') || t.includes('código')) {
          category = 'Desenvolvimento';
          img = defaultImages.code;
        }

        const id = `tabnews-${item.id}`;
        newsList.push({
          id,
          title: item.title,
          summary: item.body ? item.body.substring(0, 150).replace(/[#*`_]/g, '').trim() + '...' : 'Confira a análise técnica completa e comentários da comunidade.',
          source: 'TabNews',
          category,
          image: img,
          url: `https://www.tabnews.com.br/${item.owner_username}/${item.slug}`,
          publishedAt: new Date(item.published_at || item.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
          author: item.owner_username,
          reactions: reactions[id] || {
            fire: 14 + (idx * 3),
            rocket: 9 + (idx * 2),
            heart: 18 + (idx * 4),
            insight: 7 + idx
          }
        });
      });
    }

    if (Array.isArray(devToArticles)) {
      devToArticles.forEach((article, idx) => {
        let category = 'Desenvolvimento';
        let img = article.cover_image || article.social_image || defaultImages.code;
        const t = (article.title + ' ' + (article.description || '')).toLowerCase();

        if (t.includes('ai') || t.includes('gpt') || t.includes('llm') || t.includes('prompt')) {
          category = 'Inteligência Artificial';
          if (!article.cover_image) img = defaultImages.ai;
        } else if (t.includes('cloud') || t.includes('docker') || t.includes('database') || t.includes('sql') || t.includes('node') || t.includes('backend')) {
          category = 'Back-End & Cloud';
          if (!article.cover_image) img = defaultImages.backend;
        } else if (t.includes('career') || t.includes('job') || t.includes('salary') || t.includes('hiring')) {
          category = 'Mercado & Vagas';
          if (!article.cover_image) img = defaultImages.career;
        }

        const id = `devto-${article.id}`;
        newsList.push({
          id,
          title: article.title,
          summary: article.description ? article.description.substring(0, 150) + '...' : 'Artigo em destaque com práticas de arquitetura e tecnologia.',
          source: 'Dev.to Tech',
          category,
          image: img,
          url: article.url,
          publishedAt: new Date(article.published_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
          author: article.user?.username || 'developer',
          reactions: reactions[id] || {
            fire: article.public_reactions_count ? Math.floor(article.public_reactions_count / 2) + 5 : 12,
            rocket: 8 + (idx * 2),
            heart: article.positive_reactions_count || 15,
            insight: 6 + idx
          }
        });
      });
    }

    if (newsList.length > 0) {
      cachedNews = newsList;
      lastNewsFetch = now;
      return cachedNews;
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
        image: defaultImages.ai,
        url: 'https://news.ycombinator.com',
        publishedAt: 'Hoje',
        author: 'Equipe Tech',
        reactions: { fire: 28, rocket: 19, heart: 34, insight: 15 }
      },
      {
        id: 'news-fallback-2',
        title: 'Mercado de TI: Alta Demanda por Engenheiros de Back-End, Microsserviços e Cloud',
        summary: 'Pesquisa aponta crescimento contínuo para especialistas em microsserviços, Go, C# .NET e segurança.',
        source: 'Carreira Tech',
        category: 'Back-End & Cloud',
        image: defaultImages.backend,
        url: 'https://chat.whatsapp.com/LbQSl8Q2tjcGluF2He3zI6',
        publishedAt: 'Hoje',
        author: 'Resource IT News',
        reactions: { fire: 22, rocket: 14, heart: 27, insight: 11 }
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

// 2. POST /api/tech-news/:id/react (Live React Emoji on News)
app.post('/api/tech-news/:id/react', (req, res) => {
  const { id } = req.params;
  const { emoji } = req.body; // 'fire' | 'rocket' | 'heart' | 'insight'

  if (!emoji || !['fire', 'rocket', 'heart', 'insight'].includes(emoji)) {
    return res.status(400).json({ error: 'Emoji inválido' });
  }

  const reactions = readReactions();
  if (!reactions[id]) {
    reactions[id] = { fire: 10, rocket: 5, heart: 12, insight: 4 };
  }

  reactions[id][emoji] = (reactions[id][emoji] || 0) + 1;
  writeReactions(reactions);

  res.json({ success: true, reactions: reactions[id] });
});

// 3. GET /api/jobs (Real Automated Jobs Feed)
app.get('/api/jobs', (req, res) => {
  const jobs = readJobs();
  res.json({ success: true, count: jobs.length, jobs });
});

// 4. POST /api/webhook/job (WhatsApp Bot Vagas Webhook)
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

// 5. Presence & Heartbeat
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

// 6. Activities Feed
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

// 7. Community Groups
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
