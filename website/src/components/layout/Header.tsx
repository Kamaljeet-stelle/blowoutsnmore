import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/images/logo.png';
import { PrimaryButton } from '@/components/common/PrimaryButton';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About Us' },
  { to: '/team', label: 'Our Team' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div className="bg-charcoal px-4 py-2 text-center text-xs tracking-wide text-ivory/90 sm:text-sm">
        Dubai Studio City · Book via WhatsApp · Starting prices excl. VAT
      </div>
      <header
        className={`sticky top-0 z-50 border-b transition ${
          scrolled
            ? 'border-line bg-ivory/95 backdrop-blur-md'
            : 'border-transparent bg-ivory'
        }`}>
        <div className="container-salon flex h-16 items-center justify-between gap-4 sm:h-20">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src={logo} alt="Blowouts N' More" className="h-8 w-auto sm:h-10" />
            <span className="hidden font-display text-xl text-charcoal sm:inline">
              Blowouts N&apos; More
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition hover:text-gold ${
                    isActive ? 'text-gold' : 'text-charcoal/80'
                  }`
                }>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <PrimaryButton to="/booking" variant="secondary">
              Book Appointment
            </PrimaryButton>
          </div>

          <button
            type="button"
            className="inline-flex rounded-full border border-line p-2 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(current => !current)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-40 bg-ivory pt-28 lg:hidden">
          <nav className="container-salon flex flex-col gap-2" aria-label="Mobile">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 font-display text-3xl ${
                    isActive ? 'bg-beige text-charcoal' : 'text-charcoal'
                  }`
                }>
                {link.label}
              </NavLink>
            ))}
            <div className="mt-6">
              <PrimaryButton
                to="/booking"
                variant="secondary"
                className="w-full"
                onClick={() => setOpen(false)}>
                Book Appointment
              </PrimaryButton>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
