import { SectionHeading } from '@/components/common/SectionHeading';
import { salon } from '@/data/salon';

export function PrivacyPage() {
  return (
    <div className="container-salon max-w-3xl py-14 sm:py-20">
      <SectionHeading kicker="Legal" title="Privacy policy" />
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
        <p>
          {salon.name} values your privacy. Details you enter on this website prototype stay in
          your browser until you choose to share them through WhatsApp.
        </p>
        <p>
          When you send a booking or contact request, the conversation continues in WhatsApp under
          that platform’s terms.
        </p>
        <p>
          For the salon’s latest public information, visit{' '}
          <a href={salon.websiteUrl} className="font-semibold text-gold">
            blowoutsnmore.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="container-salon max-w-3xl py-14 sm:py-20">
      <SectionHeading kicker="Legal" title="Terms & conditions" />
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
        <p>
          Appointments requested through this prototype are not automatically confirmed. The salon
          confirms availability on WhatsApp.
        </p>
        <p>
          Listed prices are starting prices excluding VAT and may vary with stylist level, hair
          length, thickness and products used.
        </p>
        <p>Cancellations and timing changes should be arranged directly with the salon.</p>
      </div>
    </div>
  );
}
