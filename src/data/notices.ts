import type { InboxItem } from '../types/catalog';
import { services } from './services';

type FeedNotice = Omit<InboxItem, 'at'> & { hoursAgo: number };

const seasonal = services.find(service => service.newest);

const feed: FeedNotice[] = [
  ...(seasonal
    ? [
        {
          id: `season-${seasonal.id}`,
          kind: 'offer' as const,
          title: `New this season: ${seasonal.name}`,
          body: seasonal.summary,
          cta: 'Explore service',
          target: { screen: 'ServiceDetail' as const, serviceId: seasonal.id },
          image: seasonal.category,
          hoursAgo: 2,
        },
      ]
    : []),
  {
    id: 'welcome',
    kind: 'lounge',
    title: "Welcome to Blowouts N' More",
    body: 'Browse hair, nails and body services, then request your appointment on WhatsApp.',
    cta: 'Browse services',
    target: { screen: 'Services' },
    hoursAgo: 5,
  },
  {
    id: 'team',
    kind: 'lounge',
    title: 'Meet the artists',
    body: 'Get to know the stylists and beauty experts behind your glow-up.',
    cta: 'View team',
    target: { screen: 'Team' },
    hoursAgo: 28,
  },
  {
    id: 'care-tips',
    kind: 'lounge',
    title: 'Between visits',
    body: 'Simple habits to keep blowouts and colour looking fresh longer.',
    cta: 'Read the guide',
    target: { screen: 'Care' },
    hoursAgo: 52,
  },
  {
    id: 'journal',
    kind: 'lounge',
    title: 'From the journal',
    body: 'Short notes on blowouts, colour care, and salon life in Dubai.',
    cta: 'Open the journal',
    target: { screen: 'Journal' },
    hoursAgo: 200,
  },
];

export function feedNotices(now: Date): InboxItem[] {
  return feed.map(({ hoursAgo, ...notice }) => ({
    ...notice,
    at: new Date(now.getTime() - hoursAgo * 3600000).toISOString(),
  }));
}
