import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/types';

type Props = {
  items: FaqItem[];
};

export function FAQAccordion({ items }: Props) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {items.map(item => {
        const open = openId === item.id;
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-line bg-card">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
              <span className="font-medium text-charcoal">{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-gold transition ${open ? 'rotate-180' : ''}`}
              />
            </button>
            {open ? (
              <div className="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted">
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
