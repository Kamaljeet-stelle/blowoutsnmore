import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SectionHeading } from '@/components/common/SectionHeading';
import { services } from '@/data/services';
import { team } from '@/data/team';
import {
  buildWhatsAppMessage,
  mockTimeSlots,
  openWhatsApp,
  validateCustomer,
} from '@/services/booking';
import { categoryLabels, type BookingDraft, type ServiceCategory } from '@/types';

const steps = [
  'Service',
  'Stylist',
  'Date',
  'Time',
  'Details',
  'Summary',
  'Request',
] as const;

const emptyDraft: BookingDraft = {
  serviceId: '',
  stylistId: '',
  stylistName: '',
  date: '',
  time: '',
  name: '',
  email: '',
  phone: '',
  note: '',
};

function nextDays(count: number) {
  const days: string[] = [];
  const start = new Date();
  for (let i = 1; i <= count; i += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    days.push(date.toISOString().slice(0, 10));
  }
  return days;
}

export function BookingPage() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<BookingDraft>(() => ({
    ...emptyDraft,
    serviceId: params.get('service') ?? '',
    stylistId: params.get('stylist') ?? '',
    stylistName: team.find(member => member.id === params.get('stylist'))?.name ?? '',
  }));
  const [category, setCategory] = useState<ServiceCategory | 'all'>('all');
  const [errors, setErrors] = useState<Partial<Record<'name' | 'email' | 'phone', string>>>({});
  const [requested, setRequested] = useState(false);

  const selectedService = services.find(service => service.id === draft.serviceId);
  const slots = useMemo(
    () => (draft.date ? mockTimeSlots(draft.date) : []),
    [draft.date],
  );
  const dates = useMemo(() => nextDays(10), []);
  const stylists = team.filter(member => member.designation !== 'Receptionist');

  const filteredServices = services.filter(
    service => category === 'all' || service.category === category,
  );

  const canContinue = () => {
    if (step === 0) return Boolean(draft.serviceId);
    if (step === 1) return Boolean(draft.stylistId);
    if (step === 2) return Boolean(draft.date);
    if (step === 3) return Boolean(draft.time);
    if (step === 4) {
      const nextErrors = validateCustomer(draft);
      setErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    }
    return true;
  };

  const sendRequest = () => {
    if (!selectedService) return;
    const message = buildWhatsAppMessage(draft, selectedService.name);
    openWhatsApp(message);
    setRequested(true);
    setStep(6);
  };

  return (
    <div className="container-salon py-14 sm:py-20">
      <SectionHeading
        kicker="Booking"
        title="Request your appointment"
        subtitle="Preferred dates and times are mock slots for this prototype. The salon confirms real availability on WhatsApp."
      />

      <ol className="mt-8 flex flex-wrap gap-2">
        {steps.map((label, index) => (
          <li
            key={label}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              index === step
                ? 'bg-charcoal text-ivory'
                : index < step
                  ? 'bg-gold/20 text-charcoal'
                  : 'bg-beige text-muted'
            }`}>
            {index + 1}. {label}
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-[1.75rem] border border-line bg-card p-5 sm:p-8">
          {step === 0 ? (
            <div>
              <h3 className="font-display text-3xl">Select a service</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {(['all', 'hair', 'nails', 'body'] as const).map(item => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      category === item ? 'bg-charcoal text-ivory' : 'bg-beige text-charcoal'
                    }`}>
                    {item === 'all' ? 'All' : categoryLabels[item]}
                  </button>
                ))}
              </div>
              <div className="mt-5 max-h-[420px] space-y-2 overflow-y-auto pr-1">
                {filteredServices.map(service => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setDraft(current => ({ ...current, serviceId: service.id }))}
                    className={`flex w-full items-start justify-between gap-3 rounded-2xl border px-4 py-3 text-left ${
                      draft.serviceId === service.id
                        ? 'border-gold bg-gold-soft'
                        : 'border-line hover:bg-beige/40'
                    }`}>
                    <span>
                      <span className="block font-medium text-charcoal">{service.name}</span>
                      <span className="mt-1 block text-xs text-muted">{service.group}</span>
                    </span>
                    {service.fromPriceAed != null ? (
                      <span className="shrink-0 text-sm font-semibold text-gold">
                        From AED {service.fromPriceAed}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div>
              <h3 className="font-display text-3xl">Select a stylist</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setDraft(current => ({
                      ...current,
                      stylistId: 'any',
                      stylistName: 'Any stylist',
                    }))
                  }
                  className={`rounded-2xl border px-4 py-4 text-left ${
                    draft.stylistId === 'any' ? 'border-gold bg-gold-soft' : 'border-line'
                  }`}>
                  <p className="font-semibold">Any stylist</p>
                  <p className="mt-1 text-sm text-muted">First available artist</p>
                </button>
                {stylists.map(member => (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() =>
                      setDraft(current => ({
                        ...current,
                        stylistId: member.id,
                        stylistName: member.name,
                      }))
                    }
                    className={`rounded-2xl border px-4 py-4 text-left ${
                      draft.stylistId === member.id ? 'border-gold bg-gold-soft' : 'border-line'
                    }`}>
                    <p className="font-semibold">{member.name}</p>
                    <p className="mt-1 text-sm text-muted">{member.designation}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div>
              <h3 className="font-display text-3xl">Preferred date</h3>
              <p className="mt-2 text-sm text-muted">Prototype calendar — not live inventory.</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {dates.map(date => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setDraft(current => ({ ...current, date, time: '' }))}
                    className={`rounded-2xl border px-3 py-4 text-sm font-semibold ${
                      draft.date === date ? 'border-gold bg-gold-soft' : 'border-line'
                    }`}>
                    {new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div>
              <h3 className="font-display text-3xl">Preferred time</h3>
              <p className="mt-2 text-sm text-muted">
                Grey slots are mock-unavailable. Final confirmation happens on WhatsApp.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {slots.map(slot => (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setDraft(current => ({ ...current, time: slot.time }))}
                    className={`rounded-2xl border px-3 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-35 ${
                      draft.time === slot.time ? 'border-gold bg-gold-soft' : 'border-line'
                    }`}>
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div>
              <h3 className="font-display text-3xl">Your details</h3>
              <div className="mt-5 space-y-4">
                {(
                  [
                    ['name', 'Full name', 'text'],
                    ['email', 'Email', 'email'],
                    ['phone', 'Phone', 'tel'],
                  ] as const
                ).map(([key, label, type]) => (
                  <label key={key} className="block">
                    <span className="text-sm font-medium text-charcoal">{label}</span>
                    <input
                      type={type}
                      value={draft[key]}
                      onChange={event =>
                        setDraft(current => ({ ...current, [key]: event.target.value }))
                      }
                      className="mt-2 w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-sm outline-none ring-gold/40 focus:ring-2"
                    />
                    {errors[key] ? (
                      <span className="mt-1 block text-xs text-red-700">{errors[key]}</span>
                    ) : null}
                  </label>
                ))}
                <label className="block">
                  <span className="text-sm font-medium text-charcoal">Notes (optional)</span>
                  <textarea
                    value={draft.note}
                    onChange={event =>
                      setDraft(current => ({ ...current, note: event.target.value }))
                    }
                    rows={3}
                    className="mt-2 w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-sm outline-none ring-gold/40 focus:ring-2"
                  />
                </label>
              </div>
            </div>
          ) : null}

          {step === 5 ? (
            <div>
              <h3 className="font-display text-3xl">Booking summary</h3>
              <dl className="mt-5 space-y-3 text-sm">
                {[
                  ['Service', selectedService?.name],
                  ['Stylist', draft.stylistName],
                  ['Date', draft.date],
                  ['Time', draft.time],
                  ['Name', draft.name],
                  ['Email', draft.email],
                  ['Phone', draft.phone],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-start justify-between gap-4 border-b border-line py-3">
                    <dt className="text-muted">{label}</dt>
                    <dd className="text-right font-medium text-charcoal">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 rounded-2xl bg-beige/70 px-4 py-3 text-sm text-muted">
                This will open WhatsApp with your request. It is not an automatic confirmation.
              </p>
            </div>
          ) : null}

          {step === 6 ? (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ivory">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="mt-5 font-display text-3xl">WhatsApp request opened</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                {requested
                  ? 'Your preferred visit details were prepared for WhatsApp. The salon will confirm availability with you directly.'
                  : 'Ready when you are.'}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <PrimaryButton onClick={() => openWhatsApp()} variant="secondary">
                  Open WhatsApp again
                </PrimaryButton>
                <PrimaryButton to="/" variant="ghost">
                  Back home
                </PrimaryButton>
              </div>
            </div>
          ) : null}

          {step < 6 ? (
            <div className="mt-8 flex flex-wrap justify-between gap-3">
              <PrimaryButton
                variant="ghost"
                disabled={step === 0}
                onClick={() => setStep(current => Math.max(0, current - 1))}>
                Back
              </PrimaryButton>
              {step < 5 ? (
                <PrimaryButton
                  variant="secondary"
                  disabled={!canContinue()}
                  onClick={() => {
                    if (!canContinue()) return;
                    setStep(current => current + 1);
                  }}>
                  Continue
                </PrimaryButton>
              ) : (
                <PrimaryButton variant="secondary" onClick={sendRequest}>
                  Send on WhatsApp
                </PrimaryButton>
              )}
            </div>
          ) : null}
        </div>

        <aside className="h-fit rounded-[1.75rem] border border-line bg-beige/50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Selected</p>
          <h3 className="mt-2 font-display text-2xl text-charcoal">
            {selectedService?.name ?? 'Choose a service'}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>{draft.stylistName || 'Stylist pending'}</li>
            <li>
              {draft.date || 'Date pending'}
              {draft.time ? ` · ${draft.time}` : ''}
            </li>
            {selectedService?.fromPriceAed != null ? (
              <li className="font-semibold text-gold">
                From AED {selectedService.fromPriceAed} excl. VAT
              </li>
            ) : null}
          </ul>
        </aside>
      </div>
    </div>
  );
}
