export const salon = {
  name: "Blowouts N' More",
  tagline: 'Fabulous and Flawlessly You!',
  intro:
    "Step into our vibrant sanctuary and let our talented team whisk you away to a world of gorgeous blowouts, chic cuts, dazzling colour, and pampering mani-pedis.",
  address:
    'G01 Qanawat Office Building, Plot no. 6757728, Al Hebiah 2nd, Dubai Studio City, Dubai',
  phoneDisplay: '+971 58 297 1740',
  phoneE164: '971582971740',
  whatsappUrl: 'https://wa.me/971582971740',
  instagramUrl: 'https://www.instagram.com/blowoutsnmore',
  instagramHandle: '@blowoutsnmore',
  mapsUrl: 'https://maps.google.com/?q=Blowouts+N+More+Dubai+Studio+City',
  websiteUrl: 'https://blowoutsnmore.com/',
  email: 'hello@blowoutsnmore.com',
};

export const salonHours = [
  { day: 'Monday', hours: '10AM – 7PM' },
  { day: 'Tuesday', hours: '10AM – 7PM' },
  { day: 'Wednesday', hours: '10AM – 7PM' },
  { day: 'Thursday', hours: '10AM – 8PM' },
  { day: 'Friday', hours: '10AM – 8PM' },
  { day: 'Saturday', hours: '9AM – 8PM' },
  { day: 'Sunday', hours: '10AM – 8PM' },
] as const;

export const values = [
  {
    id: 'craft',
    title: 'Crafted with care',
    body: 'Every blowout, colour and manicure is shaped around your lifestyle and how you want to feel when you leave.',
  },
  {
    id: 'allies',
    title: 'Beauty allies',
    body: 'Our artists combine trend-aware skill with genuine warmth — more than stylists, your personal beauty partners.',
  },
  {
    id: 'sanctuary',
    title: 'A vibrant sanctuary',
    body: 'A calm Dubai Studio City salon designed for gorgeous results and an easy, pampering visit.',
  },
];

export const testimonials = [
  {
    id: '1',
    name: 'Regular guest',
    place: 'Dubai Studio City',
    quote:
      'The best blow-dries in Dubai — polished, lasting, and always welcoming.',
  },
  {
    id: '2',
    name: 'Local client',
    place: 'Instagram',
    quote:
      'Fabulous service and a team that knows how to make every visit feel special.',
  },
  {
    id: '3',
    name: 'Weekly guest',
    place: 'Dubai',
    quote:
      'Clean, stylish salon with parking nearby — a true neighbourhood beauty destination.',
  },
];

export const faqs = [
  {
    id: 'book',
    question: 'How do I book an appointment?',
    answer:
      'Use the Book Appointment flow on this website, then send your preferred details on WhatsApp. The salon confirms availability with you directly.',
  },
  {
    id: 'prices',
    question: 'Are the listed prices final?',
    answer:
      'Listed prices are starting prices excluding VAT. Final pricing may vary with stylist level, hair length, thickness and products used.',
  },
  {
    id: 'cancel',
    question: 'How do I cancel or reschedule?',
    answer:
      'Please message the salon on WhatsApp as soon as possible so the team can update your preferred time.',
  },
  {
    id: 'hours',
    question: 'What are your opening hours?',
    answer:
      'Mon–Wed 10AM–7PM, Thu–Fri 10AM–8PM, Sat 9AM–8PM, Sun 10AM–8PM.',
  },
  {
    id: 'location',
    question: 'Where are you located?',
    answer:
      'G01 Qanawat Office Building, Plot no. 6757728, Al Hebiah 2nd, Dubai Studio City, Dubai.',
  },
  {
    id: 'contact',
    question: 'How can I contact the salon?',
    answer:
      'WhatsApp is the preferred booking channel: +971 58 297 1740. You can also visit us in Dubai Studio City or follow @blowoutsnmore on Instagram.',
  },
];
