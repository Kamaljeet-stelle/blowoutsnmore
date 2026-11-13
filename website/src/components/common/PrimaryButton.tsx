import { Link } from 'react-router-dom';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const styles = {
  primary:
    'bg-charcoal text-ivory hover:bg-charcoal/90 shadow-sm',
  secondary:
    'bg-gold text-ivory hover:bg-gold/90 shadow-sm',
  ghost:
    'bg-transparent text-charcoal border border-charcoal/20 hover:border-charcoal/40 hover:bg-beige/40',
};

export function PrimaryButton({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
  ...rest
}: Props) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:opacity-50 ${styles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={rest.onClick as never}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
