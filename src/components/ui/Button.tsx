import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 ease-out focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-ivory text-indigo-950 hover:bg-ivory-dim',
  secondary:
    'border border-ivory/35 text-ivory hover:border-ivory hover:bg-ivory/5',
  ghost: 'text-ivory/80 hover:text-ivory',
};

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/**
 * Shared call-to-action control. Renders an <a> when `href` is passed,
 * otherwise a real <button>, so every CTA stays a proper accessible
 * element regardless of whether it navigates or triggers a handler.
 */
export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => {
    const classes = cn(base, variants[variant], className);

    if ('href' in props && props.href) {
      const isExternal = props.href.startsWith('http');
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(isExternal
            ? { target: '_blank', rel: 'noreferrer noopener' }
            : {})}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
