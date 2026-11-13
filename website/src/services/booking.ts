import { salon } from '@/data/salon';
import type { BookingDraft } from '@/types';

export function buildWhatsAppMessage(
  draft: BookingDraft,
  serviceName: string,
) {
  return [
    `Hello Blowouts N' More — I'd like to request an appointment.`,
    '',
    `Salon: ${salon.name}`,
    `Service: ${serviceName}`,
    draft.stylistName ? `Preferred stylist: ${draft.stylistName}` : '',
    draft.date ? `Preferred date: ${draft.date}` : '',
    draft.time ? `Preferred time: ${draft.time}` : '',
    '',
    `Name: ${draft.name || '—'}`,
    `Phone: ${draft.phone || '—'}`,
    draft.email ? `Email: ${draft.email}` : '',
    draft.note ? `Note: ${draft.note}` : '',
    '',
    'Please confirm availability. Thank you!',
  ]
    .filter(Boolean)
    .join('\n');
}

export function openWhatsApp(message?: string) {
  const url = message
    ? `${salon.whatsappUrl}?text=${encodeURIComponent(message)}`
    : salon.whatsappUrl;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function validateCustomer(draft: Pick<BookingDraft, 'name' | 'email' | 'phone'>) {
  const errors: Partial<Record<'name' | 'email' | 'phone', string>> = {};
  if (draft.name.trim().length < 2) errors.name = 'Enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) {
    errors.email = 'Enter a valid email.';
  }
  if (draft.phone.replace(/\D/g, '').length < 8) {
    errors.phone = 'Enter a valid phone number.';
  }
  return errors;
}

/** Mock preferred slots for the prototype — not live salon inventory */
export function mockTimeSlots(dateIso: string) {
  const day = new Date(`${dateIso}T12:00:00`).getDay();
  const weekend = day === 0 || day === 6;
  const base = weekend
    ? ['10:00', '11:00', '12:30', '14:00', '15:30', '17:00', '18:30']
    : ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'];
  return base.map((time, index) => ({
    time,
    available: (index + day) % 4 !== 0,
  }));
}
