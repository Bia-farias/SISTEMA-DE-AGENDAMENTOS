import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({ children, className, hoverEffect = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-[#13101e] border border-violet-100/70 dark:border-violet-900/30 rounded-2xl p-5 shadow-sm transition-all duration-200',
        hoverEffect &&
          'hover:shadow-md hover:border-violet-200 dark:hover:border-violet-800/60 hover:translate-y-[-1px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 pb-4 mb-4 border-b border-violet-100/60 dark:border-violet-900/20',
        className
      )}
    >
      <div>
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
        {subtitle && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
