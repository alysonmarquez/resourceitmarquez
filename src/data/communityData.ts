export interface TickerItem {
  id: string;
  text: string;
  category: 'community' | 'opportunity' | 'techgirl' | 'education' | 'dev';
  tag: string;
}

export interface LiveNowEvent {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  category: string;
  time: string;
  badgeColor: string;
  link?: string;
}

export interface OpportunityItem {
  id: string;
  role: string;
  level: string;
  type: string;
  tech: string;
  isHot?: boolean;
}

export const tickerItems: TickerItem[] = [
  { id: 't1', text: 'Novo membro conectou na Comunidade', category: 'community', tag: 'WhatsApp' },
  { id: 't2', text: 'Vaga Remota Node.js Jr compartilhada no grupo de Vagas', category: 'opportunity', tag: 'Vagas' },
  { id: 't3', text: 'RecruitAI recebeu novo commit no GitHub', category: 'dev', tag: 'Open Source' },
  { id: 't4', text: 'Nova participante acolhida no Tech Girl', category: 'techgirl', tag: 'Tech Girl' },
  { id: 't5', text: 'Aula de conversação em Inglês confirmada para 19h', category: 'education', tag: 'Aulas' },
  { id: 't6', text: '+840 conexões ativas na comunidade', category: 'community', tag: 'Impacto' },
  { id: 't7', text: 'Projeto SpeedBet abriu vagas para colaboradores C# .NET', category: 'dev', tag: 'Projetos' },
  { id: 't8', text: 'Arena Xeque iniciou testes de WebSockets multiplayer', category: 'dev', tag: 'Full Stack' }
];

export const heroRotatingWords: string[] = [
  'PROJETOS REAIS',
  'NETWORKING TECH',
  'VAGAS & FREELAS',
  'ESTUDOS BACK-END',
  'AULAS DE INGLÊS',
  'COMUNIDADE TECH GIRL',
  'CÓDIGO OPEN SOURCE',
  'MENTORIAS PRÁTICAS'
];

export const technologiesRow1: string[] = [
  'Node.js',
  'TypeScript',
  'Next.js 15',
  'React 19',
  'C# .NET 9',
  'Java Spring Boot',
  'Python',
  'FastAPI',
  'PostgreSQL',
  'Docker',
  'AWS Cloud'
];

export const technologiesRow2: string[] = [
  'Redis Cache',
  'RabbitMQ',
  'Socket.IO',
  'Google Gemini API',
  'Prisma ORM',
  'Tailwind CSS v4',
  'Git & GitHub',
  'GraphQL',
  'Linux',
  'CI/CD Pipelines',
  'Microservices'
];

export const liveNowEvents: LiveNowEvent[] = [
  {
    id: 'ln1',
    icon: '🔥',
    title: 'Discussão de Arquitetura Limpa',
    subtitle: 'Debate ativo sobre Domain-Driven Design e desacoplamento de microsserviços.',
    category: 'Back-End & APIs',
    time: 'Acontecendo agora',
    badgeColor: 'border-[#246386]/40 bg-[#246386]/20 text-[#38bdf8]',
    link: 'https://chat.whatsapp.com/FuwkXEqEUtnGeOxSmVAjGj'
  },
  {
    id: 'ln2',
    icon: '💼',
    title: 'Oportunidades Jr & Estágio',
    subtitle: 'Novas posições remotas e freelas postados no canal oficial de vagas.',
    category: 'Vagas & Carreira',
    time: 'Há 12 min',
    badgeColor: 'border-[#E0A34A]/40 bg-[#E0A34A]/20 text-[#E0A34A]',
    link: 'https://chat.whatsapp.com/LbQSl8Q2tjcGluF2He3zI6'
  },
  {
    id: 'ln3',
    icon: '🚀',
    title: 'RecruitAI v1.2 Deploy',
    subtitle: 'Módulo de matching semântico com IA atualizado pela equipe open-source.',
    category: 'Projetos Open Source',
    time: 'Há 28 min',
    badgeColor: 'border-[#1D5171]/40 bg-[#1D5171]/20 text-[#E6E9EF]',
    link: 'https://github.com/alysonmarquez'
  },
  {
    id: 'ln4',
    icon: '👑',
    title: 'Tech Girl Space',
    subtitle: 'Troca de experiências sobre transição de carreira e primeiros passos em tech.',
    category: 'Tech Girl',
    time: 'Há 45 min',
    badgeColor: 'border-[#967189]/40 bg-[#967189]/20 text-[#E6E9EF]',
    link: 'https://chat.whatsapp.com/LWFPj7qWEE11VCgcEvchHi'
  },
  {
    id: 'ln5',
    icon: '🇺🇸',
    title: 'Inglês para Entrevistas',
    subtitle: 'Welison organizando pauta do próximo encontro prático de conversação.',
    category: 'Aulas de Inglês',
    time: 'Hoje • 19:30',
    badgeColor: 'border-[#997074]/40 bg-[#997074]/20 text-[#E6E9EF]',
    link: 'https://chat.whatsapp.com/CDeeiIrv3evLFU8U61dxuw?s=sw&p=i&mlu=0&ilr=0'
  }
];

export const terminalLogs = [
  { command: 'resource@community:~$ connect --all-nodes', output: '✓ 840 conexões sincronizadas em tempo real' },
  { command: 'resource@community:~$ status --projects', output: '✓ RecruitAI, Arena Xeque, Enge PRO, SpeedBet [ATIVOS]' },
  { command: 'resource@community:~$ check --channels', output: '✓ WhatsApp, Discord, Telegram [OPERACIONAIS 24/7]' },
  { command: 'resource@community:~$ community_state', output: '🚀 STATUS: BUILDING TOGETHER' }
];
