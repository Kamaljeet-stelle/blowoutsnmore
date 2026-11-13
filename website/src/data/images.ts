import hair from '@/assets/images/hair.jpg';
import nails from '@/assets/images/nails.jpg';
import body from '@/assets/images/body.jpg';
import face from '@/assets/images/face.jpg';
import barber from '@/assets/images/barber.jpg';
import hands from '@/assets/images/hands.jpg';
import type { ServiceCategory } from '@/types';

export const categoryImages: Record<ServiceCategory, string> = {
  hair,
  nails,
  body,
};

export const heroImage = face;
export const aboutImage = barber;
export const galleryFallback = hands;

/** Curated salon photography for gallery / editorial layouts */
export const remoteGallery = [
  {
    id: 'g1',
    title: 'Signature blowout',
    category: 'hair' as const,
    src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g2',
    title: 'Salon interior',
    category: 'salon' as const,
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g3',
    title: 'Colour finish',
    category: 'hair' as const,
    src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g4',
    title: 'Manicure ritual',
    category: 'nails' as const,
    src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g5',
    title: 'Soft waves',
    category: 'hair' as const,
    src: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g6',
    title: 'Beauty treatment',
    category: 'body' as const,
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g7',
    title: 'Chair details',
    category: 'salon' as const,
    src: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g8',
    title: 'Pedicure care',
    category: 'nails' as const,
    src: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1200&q=80',
  },
];

export const localGallery = [
  { id: 'l1', title: 'Hair styling', category: 'hair' as const, src: hair },
  { id: 'l2', title: 'Nails', category: 'nails' as const, src: nails },
  { id: 'l3', title: 'Body care', category: 'body' as const, src: body },
  { id: 'l4', title: 'Salon finish', category: 'salon' as const, src: face },
];
