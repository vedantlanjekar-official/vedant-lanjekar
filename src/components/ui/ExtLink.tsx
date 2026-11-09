import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

export function ExtLink({
  href,
  children,
  className,
  icon = true,
  label,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  icon?: boolean;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? 'ext-link'}
      aria-label={label ? `${label} (opens in a new tab)` : undefined}
    >
      {children}
      {icon && <ArrowUpRight size={14} aria-hidden="true" style={{ flexShrink: 0 }} />}
    </a>
  );
}
