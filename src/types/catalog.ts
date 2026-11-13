export type City = 'Dubai';

export type ServiceCategory = 'hair' | 'nails' | 'body';

export type PriceList =
  | 'Hair'
  | 'Nails'
  | 'Body';

export type Lounge = {
  id: string;
  name: string;
  city: City;
  address: string;
  email: string;
  phone: string;
  hours: string;
};

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  group: string;
  priceList: PriceList;
  summary: string;
  fromPriceAed?: number;
  signature?: boolean;
  newest?: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  designation: string;
  specialization: string;
  description: string;
};

export type Article = {
  id: string;
  title: string;
  month: string;
  minutes: string;
  excerpt: string;
  body: string[];
};

export type Review = {
  id: string;
  name: string;
  quote: string;
  place: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type Value = {
  id: string;
  index: string;
  title: string;
  body: string;
};

export type CareStat = {
  id: string;
  figure: string;
  label: string;
};

export type BookingDraft = {
  loungeId: string;
  serviceId: string;
  variantId: string;
  variantName: string;
  addonId: string;
  addonName: string;
  staffId: string;
  staffName: string;
  minutes: number;
  priceAed: number | null;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  note: string;
};

export type Booking = BookingDraft & {
  id: string;
  createdAt: string;
  status?: 'upcoming' | 'completed' | 'cancelled' | 'requested';
};

export type InquiryKind = 'question' | 'voucher' | 'franchise';

export type Inquiry = {
  id: string;
  kind: InquiryKind;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

export type BookingErrors = Partial<
  Record<
    | 'loungeId'
    | 'serviceId'
    | 'variantId'
    | 'staffId'
    | 'date'
    | 'time'
    | 'name'
    | 'email'
    | 'phone',
    string
  >
>;

export type InquiryErrors = Partial<
  Record<'name' | 'email' | 'phone' | 'message', string>
>;

export type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dialCode: string;
  dob: string;
  gender: string;
};

export type SavedCard = {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
};

export type NoticePrefs = {
  appointments: boolean;
  offers: boolean;
};

export type InboxKind = 'booking' | 'offer' | 'lounge';

export type InboxTarget =
  | {
      screen:
        | 'Appointments'
        | 'Referral'
        | 'Care'
        | 'Journal'
        | 'Shop'
        | 'Services'
        | 'Team';
    }
  | { screen: 'ServiceDetail'; serviceId: string };

export type InboxItem = {
  id: string;
  kind: InboxKind;
  title: string;
  body: string;
  at: string;
  cta: string;
  target: InboxTarget;
  image?: ServiceCategory | 'gift';
};

export type GiftCard = {
  id: string;
  title: string;
  note: string;
  tone: 'ink' | 'sand' | 'champagne' | 'stone';
};

export const defaultProfile: Profile = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dialCode: '+971',
  dob: '',
  gender: '',
};

export const emptyDraft: BookingDraft = {
  loungeId: 'studio-city',
  serviceId: '',
  variantId: '',
  variantName: '',
  addonId: '',
  addonName: '',
  staffId: '',
  staffName: '',
  minutes: 0,
  priceAed: null,
  date: '',
  time: '',
  name: '',
  email: '',
  phone: '',
  note: '',
};

export const cities: City[] = ['Dubai'];

export const priceLists: PriceList[] = ['Hair', 'Nails', 'Body'];

export const categoryLabels: Record<ServiceCategory, string> = {
  hair: 'Hair',
  nails: 'Nails',
  body: 'Body',
};
