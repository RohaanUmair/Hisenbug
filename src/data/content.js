// Single source of truth for site copy and brand identity.
// SITE is also read by vite.config.js to fill the {{site.*}} tokens in index.html,
// so keep this file free of imports.
//
// Business content confirmed by the founders on 2026-10-10 (products, stats, FAQ, milestones, footer, metadata).
// Not yet confirmed, so deliberately absent: social profiles and a registered legal entity name.

const NAME = 'HisenBug'
const DOMAIN = 'hisenbug.com'
const EMAIL = `hello@${DOMAIN}`
const TAGLINE = 'AI-native software company'
const DESCRIPTION =
  'HisenBug is an AI-native software company building custom business software, AI automation, agentic AI systems, chatbots and digital products. Makers of EzKhata and the AI Voice Agent.'
const PAGE_TITLE = `${NAME} — AI-Native Software & Business Automation`

export const SITE = {
  name: NAME,
  legalName: NAME,
  domain: DOMAIN,
  url: `https://${DOMAIN}/`,
  email: EMAIL,
  tagline: TAGLINE,
  // og:title / twitter:title
  title: PAGE_TITLE,
  // <title> (browser tab and search results)
  titleLong: PAGE_TITLE,
  description: DESCRIPTION,
  keywords: 'HisenBug, AI-native software, custom software development, AI automation, business automation, agentic AI, chatbot development, AI architecture, product design, EzKhata, AI voice agent',
  ogImage: `https://${DOMAIN}/og-image.png`,
  ogImageAlt: `${NAME} — ${TAGLINE}`,
  themeColor: '#080808',
  homeAriaLabel: `${NAME} — home`,
}

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Founders', href: '#founders' },
]

export const HERO = {
  tag: 'AI automation & software',
  title: 'AI-native software company & smart business solutions',
}

export const STATS_HEADING = [
  {
    text: 'We study your workflow, then build AI around it and connect it to the tools you already use, one clear step at a time',
  },
]

// Wording confirmed by the founders (2026-10-10). Keep every value something you can back up.
export const STATS = [
  { value: '24/7', desc: 'AI automation and customer interactions around the clock.' },
  { value: '2', desc: 'Featured products: EzKhata and AI Voice Agent.' },
  { value: '3', desc: 'Languages in EzKhata: English, Urdu and Roman Urdu.' },
]

export const STAGES_HEADING = {
  title: 'From messy to automated',
  sub: 'Follow one order through the three chapters of working with us.',
}

export const STAGES = [
  {
    name: 'Idea & Prototype',
    body: 'Monday morning: orders arrive in chats, stock lives in a spreadsheet and calls go unanswered. We sit with you, map how the work really moves, and sketch the fix as a prototype you can click through.',
    highlight: 'Nothing is built blind:',
    rest: ' you approve the plan before any code is written.',
  },
  {
    name: 'First Release',
    body: 'The first automation goes live on one real task. A customer messages an order, the bot confirms it, sends the bill and updates the ledger, while your team keeps working.',
    highlight: 'One small step,',
    rest: ' with results you can see and measure.',
  },
  {
    name: 'Scale-Up',
    body: 'Once it works, we connect more of your tools: stock, couriers, suppliers and approvals. Forecasting shows what to reorder before you run out.',
    highlight: 'Your systems stay.',
    rest: ' We automate the gaps between them.',
  },
]

export const SERVICES = {
  title: 'Services',
  sub: 'Hire us to lead the whole journey, or bring us in for one sharp, well-defined piece. Both work.',
  tag: 'End-to-end partnership',
  lead: 'We automate your business around the way it already works. Our automations connect to your company\u2019s tools and react instantly. Tell us your goal and your workflow, and we\u2019ll build a fast, efficient AI automation to fit.',
  cards: {
    automation: {
      title: 'AI Business Automation',
      desc: 'We study how your business already works, then build an AI layer around it. Your tools stay; the gaps between them run themselves.',
    },
    voice: {
      title: 'AI Voice Agents',
      desc: 'Voice assistants that pick up every call, qualify the caller and book the next step, while your team stays on the work that matters.',
    },
    chatbots: {
      title: 'Chatbots',
      desc: 'Bots that live in the chat apps your customers already use, taking orders, answering questions and keeping records from a simple message.',
    },
    platforms: {
      title: 'Product Design',
      desc: 'We study your users, prototype early and refine often, so the interface you ship has already earned its place.',
    },
    dev: {
      title: 'Engineering',
      desc: 'Clean, well-tested code that turns the design into a dependable product, built carefully and without wasted effort.',
    },
  },
}

export const STARTUPS_HEADING = [
  { text: 'We build and run our own products first, so we know the work first-hand.' },
  { br: true },
  { br: true },
  { text: 'Two products built and working today.', className: 'text-[#a3a3a3]' },
]

// Product copy, status and pricing confirmed by the founders (2026-10-10). No prices or customer names.
// desc is a list of paragraphs; action: 'book' (optional) opens the booking modal instead of following href.
export const STARTUPS = [
  {
    name: 'AI Voice Agent',
    tagline: 'Your AI Receptionist, Ready Around the Clock.',
    desc: [
      'Answers incoming calls, qualifies buyers and schedules property viewings for real estate businesses, with a connected broker dashboard for leads, appointments and listings.',
    ],
    status: 'Live with customers',
    pricing: 'Subscription-based',
    cta: 'Try Live Demo',
    href: 'https://real-estate-agent-blond.vercel.app/',
  },
  {
    name: 'EzKhata',
    tagline: 'Your Business. One Smart System.',
    desc: [
      'WhatsApp-powered business management: billing, payment reminders, expenses, employees and records in one place. Add products by QR code, read details from images and manage multiple businesses through one system. Supports English, Urdu and Roman Urdu.',
    ],
    status: 'Live',
    pricing: 'Paid subscription',
    // no sign-up page yet: activation goes through the HisenBug team, so the button says so and opens an email
    cta: 'Get EzKhata · Contact us',
    ctaLabel: 'Get EzKhata: email HisenBug to activate a subscription',
    href: `mailto:${EMAIL}?subject=${encodeURIComponent('Get EzKhata')}`,
  },
]

// "Recognition" rows reused for milestones. org = status, project = what, title = detail, date = category
// (no dates: none are verified). Confirmed by the founders 2026-10-10; the broker dashboard is part of the Voice Agent.
export const AWARDS = {
  title: 'Our Products & Services',
  items: [
    { org: 'Live', project: 'AI Voice Agent', title: 'In use with customers', date: 'Product', hue: 268 },
    { org: 'Live', project: 'EzKhata', title: 'WhatsApp business management', date: 'Product', hue: 150 },
    { org: 'Available', project: 'Custom AI Software', title: 'Built around business requirements', date: 'Service', hue: 212 },
    { org: 'Available', project: 'Business Automation', title: 'Workflow automation solutions', date: 'Service', hue: 28 },
    { org: 'Available', project: 'Agentic AI & Architecture', title: 'AI systems designed for business processes', date: 'Service', hue: 320 },
  ],
}

// Roles are optional: cards without one just say "Co-founder". One shared note instead of a bio per person.
export const FOUNDERS_SECTION = {
  title: 'Meet the founders',
  lead: 'The three co-founders behind HisenBug.',
  note: [
    'We started HisenBug to help small businesses scale: to make their operations stable, fast and efficient, and to support their growth. We also build our own smart products, so small business owners can run smarter businesses without the heavy lifting.',
    'For larger businesses, we deliver smart, effective automation that does the work and leaves your team with one job: reviewing the results. The outcome is less manual effort and lower costs.',
  ],
  cta: 'Talk to us',
}
export const FOUNDERS = [
  { name: 'Ali Abbas', role: 'Co-founder \u00b7 AI automation engineer', image: '/team/cofounder-1.webp', href: '' },
  { name: 'Rohaan Umair', role: 'Co-founder \u00b7 Full-stack AI engineer', image: '/team/cofounder-2.webp', href: '' },
  { name: 'Hayyan Wasi', role: 'Co-founder \u00b7 AI engineer', image: '/team/cofounder-3.webp', href: '' },
]

// Articles are files in src/journal (see _template.md); only the heading lives here.
export const BLOG = {
  title: 'Journal',
}

// Original HisenBug FAQ (2026-10-10), written from facts confirmed by the founders. Replaces the earlier list.
export const FAQ = {
  title: 'Frequently asked',
  items: [
    {
      q: 'What does HisenBug do?',
      a: 'HisenBug is an AI-native software company. We develop custom software, AI automation, agentic AI systems, chatbots, AI architecture and digital products. We also build our own products, EzKhata and the AI Voice Agent.',
    },
    {
      q: 'Can you build software around our business needs?',
      a: 'Yes. We develop custom software and automation solutions based on your business requirements, existing workflows and operational needs.',
    },
    {
      q: 'What is agentic AI?',
      a: 'Agentic AI goes beyond answering questions. It can work through multiple steps to complete tasks and support business workflows. We design and develop these systems around specific business requirements.',
    },
    {
      q: 'What is EzKhata?',
      a: "EzKhata is HisenBug's WhatsApp-powered business management product. It supports billing, payment reminders, expense tracking, employee management, business records, QR-code product management, image reading and multiple businesses within one system.",
    },
    {
      q: 'Which languages does EzKhata support?',
      a: 'EzKhata supports English, Urdu and Roman Urdu, allowing businesses to manage their operations in the language they prefer.',
    },
    {
      q: 'How do we start using EzKhata?',
      a: 'EzKhata is live and available through a paid subscription. To discuss activation for your business, contact us at ',
      link: { label: SITE.email, href: `mailto:${SITE.email}`, after: '.' },
    },
    {
      q: 'What does the AI Voice Agent do?',
      a: 'Our AI Voice Agent answers incoming calls, qualifies potential buyers and schedules property viewings for real estate businesses. It includes a connected broker dashboard for managing leads, appointments and listings. The solution is live with real customers.',
    },
    {
      q: "How does HisenBug's pricing work?",
      a: 'Our products use subscription-based pricing. For custom software development and business automation, pricing and the working arrangement depend on your specific requirements.',
    },
    {
      q: 'Where is HisenBug based? Do you work internationally?',
      a: 'HisenBug operates from Pakistan and works with businesses worldwide.',
    },
  ],
}

export const CTA = {
  title: 'Let’s build together',
  desc: 'Tell us where the manual work piles up. We’ll show you what a pilot could automate.',
  write: 'Email us',
  book: 'Book a call',
}

export const FOOTER = {
  cols: [
    {
      main: { label: 'Work', href: '#work' },
      links: [
        { label: 'AI Voice Agent', href: '#work' },
        { label: 'EzKhata', href: '#work' },
      ],
    },
    {
      main: { label: 'Services', href: '#services' },
      links: [
        { label: 'AI Automation', href: '#services' },
        { label: 'Agentic AI', href: '#services' },
        { label: 'Chatbot Development', href: '#services' },
        { label: 'AI Architecture', href: '#services' },
        { label: 'Product Design', href: '#services' },
        { label: 'Custom Software', href: '#services' },
      ],
    },
    {
      main: { label: 'Company', href: '#founders' },
      links: [
        { label: 'Founders', href: '#founders' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  ],
  email: SITE.email,
  socials: [], // add { name, href } entries here when the real profiles exist (names: Instagram, X, LinkedIn, Dribbble, Behance)
  copy: `© ${new Date().getFullYear()} ${SITE.legalName}. All rights reserved.`,
  location: 'Based in Pakistan · Working with businesses worldwide',
}

export const COOKIE_TEXT =
  'We use cookies to keep the site running smoothly, understand how it is used and improve our outreach. Choose “Accept” to allow them, or “Deny all” to keep only the essentials.'
