import { Link, useParams } from 'react-router-dom';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { ServiceCard } from '@/components/common/ServiceCard';
import { categoryImages } from '@/data/images';
import { services } from '@/data/services';
import { categoryLabels } from '@/types';

export function ServiceDetailsPage() {
  const { serviceId } = useParams();
  const service = services.find(item => item.id === serviceId);

  if (!service) {
    return (
      <div className="container-salon py-24 text-center">
        <h1 className="font-display text-4xl">Service not found</h1>
        <PrimaryButton to="/services" className="mt-6">
          Back to services
        </PrimaryButton>
      </div>
    );
  }

  const related = services
    .filter(item => item.category === service.category && item.id !== service.id)
    .slice(0, 3);

  const benefits = [
    'Consultation-led finish tailored to your hair or skin',
    'Premium products chosen for Dubai climate wear',
    'Experienced stylists and beauty technicians',
    'WhatsApp booking with preferred time requests',
  ];

  return (
    <div>
      <section className="container-salon grid gap-10 py-12 lg:grid-cols-2 lg:py-16">
        <div className="overflow-hidden rounded-[2rem]">
          <img
            src={categoryImages[service.category]}
            alt={service.name}
            className="h-full min-h-[360px] w-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            {categoryLabels[service.category]} · {service.group}
          </p>
          <h1 className="mt-3 font-display text-5xl text-charcoal">{service.name}</h1>
          {service.fromPriceAed != null ? (
            <p className="mt-4 text-lg font-semibold text-gold">
              From AED {service.fromPriceAed}
              <span className="ml-2 text-sm font-normal text-muted">excl. VAT</span>
            </p>
          ) : null}
          {service.durationMins ? (
            <p className="mt-2 text-sm text-muted">Approx. {service.durationMins} minutes</p>
          ) : (
            <p className="mt-2 text-sm text-muted">
              Duration confirmed by the salon based on hair length and service details.
            </p>
          )}
          <p className="mt-6 text-base leading-relaxed text-muted">{service.summary}</p>
          <ul className="mt-8 space-y-3">
            {benefits.map(benefit => (
              <li key={benefit} className="flex gap-3 text-sm text-charcoal">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                {benefit}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton to={`/booking?service=${service.id}`} variant="secondary">
              Book Appointment
            </PrimaryButton>
            <PrimaryButton to="/services" variant="ghost">
              Browse more services
            </PrimaryButton>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-beige/40 py-16">
          <div className="container-salon">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="font-display text-4xl text-charcoal">Related services</h2>
              <Link to={`/services?category=${service.category}`} className="text-sm font-semibold">
                View category
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map(item => (
                <ServiceCard key={item.id} service={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
