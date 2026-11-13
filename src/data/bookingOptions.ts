import { services } from './services';
import { team } from './team';

export type ServiceVariant = {
  id: string;
  name: string;
  minutes: number;
  priceAed?: number;
};

export type ServiceAddon = {
  id: string;
  name: string;
  minutes: number;
  priceAed?: number;
};

export type StaffChoice = {
  id: string;
  name: string;
  detail: string;
  kind: 'any' | 'male' | 'female' | 'person';
};

export type ServiceChoice = {
  serviceId: string;
  variantId: string;
  variantName: string;
  addonId: string;
  addonName: string;
  staffId: string;
  staffName: string;
  minutes: number;
  priceAed: number | null;
};

export const emptyChoice: ServiceChoice = {
  serviceId: '',
  variantId: '',
  variantName: '',
  addonId: '',
  addonName: '',
  staffId: '',
  staffName: '',
  minutes: 0,
  priceAed: null,
};

export const staffChoices: StaffChoice[] = [
  {
    id: 'any',
    name: 'Any stylist',
    detail: 'First available artist',
    kind: 'any',
  },
  ...team
    .filter(member => member.designation !== 'Receptionist')
    .map(member => ({
      id: member.id,
      name: member.name,
      detail: member.designation,
      kind: 'person' as const,
    })),
];

const blowoutVariants: ServiceVariant[] = [
  { id: 'blow-short', name: 'Short hair', minutes: 45, priceAed: 150 },
  { id: 'blow-medium', name: 'Medium hair', minutes: 55, priceAed: 160 },
  { id: 'blow-long', name: 'Long hair', minutes: 65, priceAed: 180 },
  { id: 'blow-xl', name: 'Extra long hair', minutes: 75, priceAed: 200 },
];

const blowoutAddons: ServiceAddon[] = [
  { id: 'addon-curls', name: 'Pin-up Curls', minutes: 20, priceAed: 150 },
  { id: 'addon-extensions', name: 'Extensions finish', minutes: 15, priceAed: 180 },
];

function defaultVariants(serviceId: string): ServiceVariant[] {
  const service = services.find(item => item.id === serviceId);
  const price = service?.fromPriceAed;
  const minutes =
    service?.category === 'nails' ? 45 : service?.category === 'body' ? 30 : 60;
  return [
    {
      id: `${serviceId}-standard`,
      name: 'Standard',
      minutes,
      priceAed: price,
    },
  ];
}

export function variantsFor(serviceId: string) {
  if (serviceId === 'wash-blowout') {
    return blowoutVariants;
  }
  return defaultVariants(serviceId);
}

export function addonsFor(serviceId: string) {
  if (serviceId === 'wash-blowout') {
    return blowoutAddons;
  }
  return [] as ServiceAddon[];
}

export function formatAed(amount: number) {
  return `AED ${amount.toFixed(amount % 1 === 0 ? 0 : 2)}`;
}

export function priceLabel(priceAed: number | null | undefined) {
  if (priceAed == null) {
    return 'Price on request';
  }
  return `From ${formatAed(priceAed)}`;
}

export function quoteFor(variant: ServiceVariant, addon?: ServiceAddon) {
  const minutes = variant.minutes + (addon?.minutes ?? 0);
  const priceAed =
    variant.priceAed == null
      ? null
      : variant.priceAed + (addon?.priceAed ?? 0);
  return { minutes, priceAed };
}
