export type ServiceCategory = 'hair' | 'nails' | 'body';

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  group: string;
  priceList: string;
  summary: string;
  fromPriceAed?: number;
  signature?: boolean;
  newest?: boolean;
  benefits?: string[];
  durationMins?: number;
};

export type TeamMember = {
  id: string;
  name: string;
  designation: string;
  specialization: string;
  description: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  place: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: ServiceCategory | 'salon';
  src: string;
};

export type BookingDraft = {
  serviceId: string;
  stylistId: string;
  stylistName: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  note: string;
};

export const categoryLabels: Record<ServiceCategory, string> = {
  hair: 'Hair',
  nails: 'Nails',
  body: 'Body',
};
