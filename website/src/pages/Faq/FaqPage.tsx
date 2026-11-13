import { FAQAccordion } from '@/components/common/FAQAccordion';
import { SectionHeading } from '@/components/common/SectionHeading';
import { faqs } from '@/data/salon';

export function FaqPage() {
  return (
    <div className="container-salon py-14 sm:py-20">
      <SectionHeading
        kicker="FAQ"
        title="Everything you need before you visit"
        subtitle="Booking, pricing, timings and how WhatsApp confirmation works."
      />
      <div className="mt-10 max-w-3xl">
        <FAQAccordion items={faqs} />
      </div>
    </div>
  );
}
