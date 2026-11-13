import { SectionHeading } from '@/components/common/SectionHeading';
import { TeamCard } from '@/components/common/TeamCard';
import { team } from '@/data/team';

export function TeamPage() {
  return (
    <div className="container-salon py-14 sm:py-20">
      <SectionHeading
        kicker="Our Team"
        title="Dedicated, passionate hair & beauty experts"
        subtitle="From fabulous blowouts to trendy colour and beautifully manicured nails — discover the difference with us."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map(member => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
