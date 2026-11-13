import { Link } from 'react-router-dom';
import { ArrowRight, Clock3, MapPin, Star } from 'lucide-react';
import { CategoryCard } from '@/components/common/CategoryCard';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ServiceCard } from '@/components/common/ServiceCard';
import { aboutImage, heroImage, localGallery } from '@/data/images';
import { salon, salonHours, testimonials, values } from '@/data/salon';
import { services } from '@/data/services';
import { team } from '@/data/team';
import { openWhatsApp } from '@/services/booking';

export function HomePage() {
  const featured = services.filter(service => service.signature || service.newest).slice(0, 6);
  const featuredTeam = team.slice(0, 3);

  return (
    <div>
      <section className="relative min-h-[88vh] overflow-hidden">
        <img
          src={heroImage}
          alt="Blowouts N' More salon atmosphere"
          className="animate-hero-image absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/45 to-charcoal/20" />
        <div className="container-salon relative flex min-h-[88vh] flex-col justify-end pb-16 pt-28 sm:pb-20">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
            {salon.name}
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl">
            Fabulous and Flawlessly You!
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg">
            {salon.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton to="/booking" variant="secondary">
              Book Appointment
            </PrimaryButton>
            <PrimaryButton to="/services" variant="ghost" className="border-ivory/30 text-ivory hover:bg-ivory/10">
              Explore Services
            </PrimaryButton>
          </div>
        </div>
      </section>

      <section className="container-salon py-20">
        <SectionHeading
          kicker="Our Expertise"
          title="Hair, Nails & Body"
          subtitle="Three carefully curated menus designed for polished everyday beauty and special-occasion glow."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <CategoryCard category="hair" />
          <CategoryCard category="nails" />
          <CategoryCard category="body" />
        </div>
      </section>

      <section className="bg-beige/50 py-20">
        <div className="container-salon">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              kicker="Featured"
              title="Salon favourites"
              subtitle="Signature rituals guests return for — from lasting blowouts to gel manicures."
            />
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-salon grid items-center gap-10 py-20 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem]">
          <img src={aboutImage} alt="Salon experience" className="h-full w-full object-cover" />
        </div>
        <div>
          <SectionHeading
            kicker="Why choose us"
            title="Your personal beauty sanctuary in Dubai Studio City"
            subtitle="Trained artists, thoughtful finishes, and a welcoming space built for confidence."
          />
          <div className="mt-8 space-y-5">
            {values.map(value => (
              <div key={value.id} className="rounded-2xl border border-line bg-card p-5">
                <h3 className="font-display text-2xl text-charcoal">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-20 text-ivory">
        <div className="container-salon">
          <SectionHeading
            kicker="Our Team"
            title="Meet the artists"
            subtitle="Dedicated hair and beauty experts ready to pamper you — one style, one smile, one glow-up at a time."
            light
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredTeam.map(member => (
              <div key={member.id} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="font-display text-2xl">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold text-gold">{member.designation}</p>
                <p className="mt-3 text-sm text-ivory/70">{member.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <PrimaryButton to="/team" variant="secondary">
              Meet the full team
            </PrimaryButton>
          </div>
        </div>
      </section>

      <section className="container-salon py-20">
        <SectionHeading kicker="Gallery" title="Salon moments" />
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {localGallery.map((item, index) => (
            <div
              key={item.id}
              className={`overflow-hidden rounded-3xl ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="h-full min-h-40 w-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="mt-8">
          <PrimaryButton to="/gallery" variant="ghost">
            Open full gallery
          </PrimaryButton>
        </div>
      </section>

      <section className="bg-beige/40 py-20">
        <div className="container-salon">
          <SectionHeading kicker="Testimonials" title="Loved by our guests" align="center" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map(item => (
              <blockquote key={item.id} className="rounded-3xl border border-line bg-card p-6">
                <Star className="h-5 w-5 text-gold" fill="currentColor" />
                <p className="mt-4 font-display text-2xl leading-snug text-charcoal">
                  “{item.quote}”
                </p>
                <footer className="mt-5 text-sm text-muted">
                  {item.name} · {item.place}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="container-salon grid gap-8 py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-line bg-card p-8 sm:p-10">
          <SectionHeading
            kicker="Instagram"
            title="Follow @blowoutsnmore"
            subtitle="Salon looks, blowouts and behind-the-scenes beauty."
          />
          <div className="mt-8">
            <PrimaryButton href={salon.instagramUrl} variant="secondary">
              Follow on Instagram
            </PrimaryButton>
          </div>
        </div>
        <div className="rounded-[2rem] bg-charcoal p-8 text-ivory sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Visit us</p>
          <h3 className="mt-3 font-display text-3xl">Salon & hours</h3>
          <p className="mt-4 flex gap-2 text-sm text-ivory/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {salon.address}
          </p>
          <a
            href={salon.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-gold underline-offset-4 hover:underline">
            Open location map
          </a>
          <ul className="mt-6 space-y-2 text-sm text-ivory/75">
            {salonHours.map(row => (
              <li key={row.day} className="flex items-center justify-between gap-4 border-b border-white/10 py-2">
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-3.5 w-3.5 text-gold" />
                  {row.day}
                </span>
                <span>{row.hours}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => openWhatsApp()}
            className="mt-6 inline-flex rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ivory">
            WhatsApp Book Now
          </button>
        </div>
      </section>

      <section className="container-salon pb-8">
        <div className="overflow-hidden rounded-[2rem] bg-beige px-8 py-12 text-center sm:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Glow-up moment</p>
          <h2 className="mt-3 font-display text-4xl text-charcoal sm:text-5xl">
            Book your appointment today
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryButton to="/booking">Start booking</PrimaryButton>
            <PrimaryButton variant="ghost" onClick={() => openWhatsApp()}>
              Message on WhatsApp
            </PrimaryButton>
          </div>
        </div>
      </section>

    </div>
  );
}
