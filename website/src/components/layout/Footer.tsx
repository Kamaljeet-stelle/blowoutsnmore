import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, Share2 } from 'lucide-react';
import logo from '@/assets/images/logo.png';
import { salon } from '@/data/salon';
import { openWhatsApp } from '@/services/booking';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-charcoal text-ivory">
      <div className="container-salon grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <img src={logo} alt="" className="h-8 w-auto brightness-0 invert" />
          <p className="font-display text-2xl">{salon.name}</p>
          <p className="text-sm leading-relaxed text-ivory/70">{salon.intro}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            {[
              ['/', 'Home'],
              ['/services', 'Services'],
              ['/about', 'About Us'],
              ['/team', 'Our Team'],
              ['/gallery', 'Gallery'],
              ['/contact', 'Contact'],
              ['/faq', 'FAQ'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li>
              <Link to="/services?category=hair" className="hover:text-gold">
                Hair
              </Link>
            </li>
            <li>
              <Link to="/services?category=nails" className="hover:text-gold">
                Nails
              </Link>
            </li>
            <li>
              <Link to="/services?category=body" className="hover:text-gold">
                Body
              </Link>
            </li>
            <li>
              <Link to="/booking" className="hover:text-gold">
                Book Appointment
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Visit</p>
          <p className="flex gap-2 text-sm text-ivory/80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {salon.address}
          </p>
          <button
            type="button"
            onClick={() => openWhatsApp()}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ivory">
            <MessageCircle className="h-4 w-4" /> WhatsApp booking
          </button>
          <a
            href={salon.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ivory/80 hover:text-gold">
            <Share2 className="h-4 w-4" /> {salon.instagramHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-salon flex flex-col gap-3 py-5 text-xs text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {salon.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-gold">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gold">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
