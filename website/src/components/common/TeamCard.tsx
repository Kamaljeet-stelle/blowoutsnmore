import { Link } from 'react-router-dom';
import type { TeamMember } from '@/types';

type Props = {
  member: TeamMember;
};

export function TeamCard({ member }: Props) {
  const initials = member.name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="rounded-3xl border border-line bg-card p-6 shadow-[0_10px_40px_rgba(37,35,33,0.04)]">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-gold-soft font-display text-2xl text-charcoal">
        {initials}
      </div>
      <h3 className="mt-5 font-display text-2xl text-charcoal">{member.name}</h3>
      <p className="mt-1 text-sm font-semibold text-gold">{member.designation}</p>
      <p className="mt-1 text-sm text-muted">{member.specialization}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted">{member.description}</p>
      <Link
        to={`/booking?stylist=${member.id}`}
        className="mt-6 inline-flex rounded-full border border-charcoal/15 px-4 py-2 text-xs font-semibold text-charcoal transition hover:bg-beige">
        Book with {member.name.split(' ')[0]}
      </Link>
    </article>
  );
}
