import { useState } from 'react';
import { X } from 'lucide-react';
import type { GalleryItem } from '@/types';

type Props = {
  items: GalleryItem[];
};

export function ImageGallery({ items }: Props) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="mb-4 block w-full overflow-hidden rounded-3xl border border-line text-left break-inside-avoid">
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              className="w-full object-cover transition duration-500 hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}>
          <button
            type="button"
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full bg-ivory/90 p-2 text-charcoal"
            onClick={() => setActive(null)}>
            <X className="h-5 w-5" />
          </button>
          <img
            src={active.src}
            alt={active.title}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain"
            onClick={event => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
