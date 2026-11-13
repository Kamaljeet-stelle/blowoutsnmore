import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ServiceCard } from '@/components/common/ServiceCard';
import { services } from '@/data/services';
import { categoryLabels, type ServiceCategory } from '@/types';

const categories: Array<ServiceCategory | 'all'> = ['all', 'hair', 'nails', 'body'];

export function ServicesPage() {
  const [params, setParams] = useSearchParams();
  const initial = (params.get('category') as ServiceCategory | null) ?? 'all';
  const [category, setCategory] = useState<ServiceCategory | 'all'>(
    categories.includes(initial) ? initial : 'all',
  );
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return services.filter(service => {
      const matchCategory = category === 'all' || service.category === category;
      const matchQuery =
        !needle ||
        `${service.name} ${service.group} ${service.summary}`
          .toLowerCase()
          .includes(needle);
      return matchCategory && matchQuery;
    });
  }, [category, query]);

  const changeCategory = (next: ServiceCategory | 'all') => {
    setCategory(next);
    if (next === 'all') {
      params.delete('category');
    } else {
      params.set('category', next);
    }
    setParams(params, { replace: true });
  };

  return (
    <div className="container-salon py-14 sm:py-20">
      <SectionHeading
        kicker="Services"
        title="Hair, nails and body menus"
        subtitle="Browse starting prices excluding VAT. Final pricing may vary with stylist level, length and products used."
      />

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map(item => (
            <button
              key={item}
              type="button"
              onClick={() => changeCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                category === item
                  ? 'bg-charcoal text-ivory'
                  : 'border border-line bg-card text-charcoal hover:bg-beige'
              }`}>
              {item === 'all' ? 'All' : categoryLabels[item]}
            </button>
          ))}
        </div>
        <label className="relative block w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search blowout, colour, manicure…"
            className="w-full rounded-full border border-line bg-card py-3 pl-11 pr-4 text-sm outline-none ring-gold/40 focus:ring-2"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted">No services match your search.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
