import { Linking } from 'react-native';
import type { BookingDraft } from '../types/catalog';

/** Official WhatsApp booking link from blowoutsnmore.com */
export const WHATSAPP_BOOKING_URL = 'https://wa.me/971582971740';

/** Official Instagram from blowoutsnmore.com */
export const INSTAGRAM_URL = 'https://www.instagram.com/blowoutsnmore';

export const MAPS_URL =
  'https://maps.google.com/?q=Blowouts+N+More+Dubai+Studio+City';

export function buildBookingMessage(
  draft: BookingDraft,
  serviceName: string,
  salonName: string,
) {
  const lines = [
    `Hello Blowouts N' More — I'd like to request an appointment.`,
    '',
    `Salon: ${salonName}`,
    `Service: ${serviceName}${draft.variantName ? ` (${draft.variantName})` : ''}`,
    draft.addonName ? `Add-on: ${draft.addonName}` : '',
    draft.staffName ? `Preferred stylist: ${draft.staffName}` : '',
    draft.date ? `Preferred date: ${draft.date}` : '',
    draft.time ? `Preferred time: ${draft.time}` : '',
    draft.priceAed != null ? `Listed from price: AED ${draft.priceAed} (excl. VAT)` : '',
    '',
    `Name: ${draft.name || '—'}`,
    `Phone: ${draft.phone || '—'}`,
    draft.email ? `Email: ${draft.email}` : '',
    draft.note ? `Note: ${draft.note}` : '',
    '',
    'Please confirm availability. Thank you!',
  ].filter(line => line !== '');

  return lines.join('\n');
}

export async function openWhatsAppBooking(message: string) {
  const url = `${WHATSAPP_BOOKING_URL}?text=${encodeURIComponent(message)}`;
  const canOpen = await Linking.canOpenURL(url);
  if (!canOpen) {
    await Linking.openURL(WHATSAPP_BOOKING_URL);
    return;
  }
  await Linking.openURL(url);
}

export async function openInstagram() {
  await Linking.openURL(INSTAGRAM_URL);
}

export async function openSalonMap() {
  await Linking.openURL(MAPS_URL);
}

export async function openWhatsAppDirect() {
  await Linking.openURL(WHATSAPP_BOOKING_URL);
}
