import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SectionHeading } from '@/components/common/SectionHeading';
import { aboutImage, categoryImages, heroImage } from '@/data/images';
import { salon, values } from '@/data/salon';

export function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <img src={heroImage} alt="" className="h-[48vh] w-full object-cover sm:h-[56vh]" />
        <div className="absolute inset-0 bg-charcoal/45" />
        <div className="container-salon absolute inset-x-0 bottom-0 pb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">About us</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-ivory sm:text-6xl">
            {salon.tagline}
          </h1>
        </div>
      </section>

      <section className="container-salon grid items-center gap-10 py-20 lg:grid-cols-2">
        <div>
          <SectionHeading
            kicker="Our story"
            title="Welcome to Blowouts n' More"
            subtitle={salon.intro}
          />
          <p className="mt-6 text-base leading-relaxed text-muted">
            Our team is more than stylists — we are your personal beauty allies. Trained in the
            latest trends and techniques, our artists combine skill with genuine care to deliver
            results that enhance your natural beauty and confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton to="/team" variant="secondary">
              Meet the team
            </PrimaryButton>
            <PrimaryButton to="/services" variant="ghost">
              Explore services
            </PrimaryButton>
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem]">
          <img src={aboutImage} alt="Salon story" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="bg-beige/50 py-20">
        <div className="container-salon">
          <SectionHeading kicker="Philosophy" title="Our expertise, our promise" align="center" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map(value => (
              <article key={value.id} className="rounded-3xl border border-line bg-card p-6">
                <h3 className="font-display text-2xl text-charcoal">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-salon grid gap-4 py-20 md:grid-cols-3">
        {[categoryImages.hair, categoryImages.nails, categoryImages.body].map((src, index) => (
          <div key={src} className={`overflow-hidden rounded-[1.75rem] ${index === 1 ? 'md:translate-y-6' : ''}`}>
            <img src={src} alt="" className="h-72 w-full object-cover md:h-96" />
          </div>
        ))}
      </section>
    </div>
  );
}
