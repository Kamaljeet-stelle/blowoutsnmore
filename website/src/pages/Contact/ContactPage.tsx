import { useState, type FormEvent } from 'react';
import { MapPin, MessageCircle, Phone, Share2 } from 'lucide-react';
import { FAQAccordion } from '@/components/common/FAQAccordion';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SectionHeading } from '@/components/common/SectionHeading';
import { faqs, salon, salonHours } from '@/data/salon';
import { openWhatsApp } from '@/services/booking';

export function ContactPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      'Website contact form message:',
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone')}`,
      `Message: ${data.get('message')}`,
    ].join('\n');
    openWhatsApp(message);
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <div>
      <div className="container-salon py-14 sm:py-20">
        <SectionHeading
          kicker="Contact"
          title="Visit us or message on WhatsApp"
          subtitle="Prefer WhatsApp for bookings — we reply with availability and stylist guidance."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-5 rounded-[1.75rem] border border-line bg-card p-6 sm:p-8">
            <p className="flex gap-3 text-sm text-muted">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              {salon.address}
            </p>
            <a
              href={salon.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex text-sm font-semibold text-gold underline-offset-4 hover:underline">
              Open in Google Maps
            </a>
            <p className="flex items-center gap-3 text-sm text-charcoal">
              <Phone className="h-5 w-5 text-gold" />
              {salon.phoneDisplay}
            </p>
            <button
              type="button"
              onClick={() => openWhatsApp()}
              className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-ivory">
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </button>
            <a
              href={salon.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm text-charcoal hover:text-gold">
              <Share2 className="h-5 w-5 text-gold" />
              {salon.instagramHandle}
            </a>
            <div className="border-t border-line pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Opening hours
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {salonHours.map(row => (
                  <li key={row.day} className="flex justify-between gap-4">
                    <span>{row.day}</span>
                    <span className="font-medium text-charcoal">{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-[1.75rem] border border-line bg-beige/40 p-6 sm:p-8">
            <h2 className="font-display text-3xl text-charcoal">Send a message</h2>
            <p className="text-sm text-muted">
              Submitting opens WhatsApp with your message — no fabricated email delivery.
            </p>
            {[
              ['name', 'Full name', 'text'],
              ['email', 'Email', 'email'],
              ['phone', 'Phone', 'tel'],
            ].map(([name, label, type]) => (
              <label key={name} className="block">
                <span className="text-sm font-medium">{label}</span>
                <input
                  required
                  name={name}
                  type={type}
                  className="mt-2 w-full rounded-2xl border border-line bg-card px-4 py-3 text-sm outline-none ring-gold/40 focus:ring-2"
                />
              </label>
            ))}
            <label className="block">
              <span className="text-sm font-medium">Message</span>
              <textarea
                required
                name="message"
                rows={4}
                className="mt-2 w-full rounded-2xl border border-line bg-card px-4 py-3 text-sm outline-none ring-gold/40 focus:ring-2"
              />
            </label>
            <PrimaryButton type="submit" variant="secondary">
              Continue on WhatsApp
            </PrimaryButton>
            {sent ? (
              <p className="text-sm text-gold">WhatsApp opened with your message draft.</p>
            ) : null}
          </form>
        </div>
      </div>

      <section className="bg-beige/50 py-16">
        <div className="container-salon">
          <SectionHeading kicker="FAQ" title="Common questions" />
          <div className="mt-8 max-w-3xl">
            <FAQAccordion items={faqs} />
          </div>
          <div className="mt-6">
            <PrimaryButton to="/faq" variant="ghost">
              View all FAQs
            </PrimaryButton>
          </div>
        </div>
      </section>
    </div>
  );
}
