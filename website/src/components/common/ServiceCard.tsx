import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categoryImages } from '@/data/images';
import type { Service } from '@/types';
import { categoryLabels } from '@/types';

type Props = {
  service: Service;
};

export function ServiceCard({ service }: Props) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-line bg-card shadow-[0_10px_40px_rgba(37,35,33,0.04)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(37,35,33,0.08)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={categoryImages[service.category]}
          alt={service.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-charcoal backdrop-blur">
          {categoryLabels[service.category]}
        </span>
      </div>
      <div className="space-y-3 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">{service.group}</p>
            <h3 className="mt-1 font-display text-2xl text-charcoal">{service.name}</h3>
          </div>
          {service.fromPriceAed != null ? (
            <p className="shrink-0 text-sm font-semibold text-gold">
              From AED {service.fromPriceAed}
            </p>
          ) : null}
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">{service.summary}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            to={`/services/${service.id}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-charcoal underline-offset-4 hover:underline">
            View details <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            to={`/booking?service=${service.id}`}
            className="inline-flex items-center rounded-full bg-charcoal px-4 py-2 text-xs font-semibold text-ivory transition hover:bg-charcoal/90">
            Book now
          </Link>
        </div>
      </div>
    </article>
  );
}
