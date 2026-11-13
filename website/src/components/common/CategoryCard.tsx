import { Link } from 'react-router-dom';
import { categoryImages } from '@/data/images';
import type { ServiceCategory } from '@/types';
import { categoryLabels } from '@/types';

const details: Record<ServiceCategory, string> = {
  hair: 'Blowouts, cuts, colour & treatments',
  nails: 'Manicures, pedicures & gel',
  body: 'Waxing, threading & massage',
};

type Props = {
  category: ServiceCategory;
};

export function CategoryCard({ category }: Props) {
  return (
    <Link
      to={`/services?category=${category}`}
      className="group relative block overflow-hidden rounded-[1.75rem] border border-line bg-card">
      <div className="aspect-[3/4] overflow-hidden sm:aspect-[4/5]">
        <img
          src={categoryImages[category]}
          alt={categoryLabels[category]}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
          Our expertise
        </p>
        <h3 className="mt-2 font-display text-3xl">{categoryLabels[category]}</h3>
        <p className="mt-2 text-sm text-ivory/80">{details[category]}</p>
      </div>
    </Link>
  );
}
