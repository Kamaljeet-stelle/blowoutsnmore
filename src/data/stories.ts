import type { Article, CareStat, Faq, Review, Value } from '../types/catalog';

export const values: Value[] = [
  {
    id: 'craft',
    index: '01',
    title: 'Crafted with care',
    body: 'Every blowout, colour, and manicure is shaped around your hair, your lifestyle, and how you want to feel when you leave.',
  },
  {
    id: 'allies',
    index: '02',
    title: 'Beauty allies',
    body: 'Our artists are more than stylists — they are trusted partners who combine trend-aware skill with genuine warmth.',
  },
  {
    id: 'sanctuary',
    index: '03',
    title: 'A vibrant sanctuary',
    body: 'Step into a calm Dubai Studio City salon designed for gorgeous results and an easy, pampering visit.',
  },
];

export const careStats: CareStat[] = [
  { id: 'hair', figure: 'Hair', label: 'Blowouts, cuts & colour' },
  { id: 'nails', figure: 'Nails', label: 'Mani-pedis & gel' },
  { id: 'body', figure: 'Body', label: 'Waxing, threading & massage' },
];

export const faqs: Faq[] = [
  {
    id: 'book',
    question: 'How do I book an appointment?',
    answer:
      'Use the Book flow in the app, then send your request on WhatsApp. The salon will confirm availability with you directly.',
  },
  {
    id: 'prices',
    question: 'Are the prices final?',
    answer:
      'Listed prices are starting prices excluding VAT. Final pricing may vary with stylist level, hair length, thickness, and products used.',
  },
  {
    id: 'location',
    question: 'Where are you located?',
    answer:
      'G01 Qanawat Office Building, Plot no. 6757728, Al Hebiah 2nd, Dubai Studio City, Dubai.',
  },
  {
    id: 'hours',
    question: 'What are your opening hours?',
    answer:
      'Mon–Wed 10AM–7PM, Thu–Fri 10AM–8PM, Sat 9AM–8PM, Sun 10AM–8PM.',
  },
];

export const reviews: Review[] = [
  {
    id: 'blowdry',
    name: 'Guest favourite',
    place: 'Dubai Studio City',
    quote: 'The best blow-dries in Dubai — polished, lasting, and always welcoming.',
  },
  {
    id: 'team',
    name: 'Regular client',
    place: 'Instagram',
    quote: 'Fabulous service and a team that knows how to make every visit feel special.',
  },
  {
    id: 'space',
    name: 'Local guest',
    place: 'Dubai',
    quote: 'Clean, stylish salon with parking nearby — a true neighbourhood beauty destination.',
  },
];

export const articles: Article[] = [
  {
    id: 'lasting-blowout',
    title: 'How to keep a blowout fresh longer',
    month: 'October 2026',
    minutes: '2 min',
    excerpt:
      'A great blowout starts in the chair — and lasts longer with a few calm habits between visits.',
    body: [
      'Ask your stylist for a finish that matches your week: soft waves, sleek, or bouncy volume.',
      'Sleep on a silk pillowcase when you can, and refresh with a light mist rather than washing too soon.',
    ],
  },
  {
    id: 'colour-dubai',
    title: 'Colour that loves Dubai weather',
    month: 'September 2026',
    minutes: '2 min',
    excerpt:
      'Heat, sun, and AC can fade colour. A thoughtful plan keeps blondes and brunettes looking luminous.',
    body: [
      'Toner appointments and bond-building treatments help keep colour even between full services.',
      'Tell your colourist about swimming, workouts, and how often you style at home.',
    ],
  },
  {
    id: 'mani-rhythm',
    title: 'Building a manicure rhythm',
    month: 'August 2026',
    minutes: '1 min',
    excerpt:
      'Gel or classic polish — a regular cadence keeps hands looking finished without last-minute panic.',
    body: [
      'Gellish manicures are ideal when you want colour that lasts through a busy Dubai calendar.',
      'Book removal with care so natural nails stay strong between sets.',
    ],
  },
];

export const aboutParagraphs = [
  "Blowouts n' More is a vibrant beauty sanctuary in Dubai Studio City.",
  'Step in for gorgeous blowouts, chic cuts, dazzling colour, and pampering mani-pedis — all delivered with personal care.',
  'Our team is more than stylists. We are your beauty allies, trained in the latest techniques and focused on enhancing your natural confidence.',
  'Use this app to browse services, meet the team, and request an appointment over WhatsApp. The salon confirms availability with you directly.',
];

export const careParagraphs = [
  'At Blowouts N\' More, every service is paced for comfort — from the wash to the final brush stroke.',
  'Tell your stylist how you live in your hair and nails. The best result is the one that still looks beautiful days later.',
];

export const privateParagraphs = [
  'Prefer a quieter visit? Add a note when you request your appointment and the team will do their best to accommodate.',
];

export const voucherParagraphs = [
  'Looking for a gift experience? Message the salon on WhatsApp with the occasion and preferred services, and the team will guide you.',
];
