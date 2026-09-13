import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from './Card';
import { cn } from '../../utils/cn';

export interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: number; // e.g. 12.5%
    label?: string;
    isPositive?: boolean;
  };
  color?: 'indigo' | 'emerald' | 'amber' | 'sky' | 'rose' | 'violet';
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'indigo',
  className,
}: StatsCardProps) {
  const iconColors = {
    indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    sky: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  };

  return (
    <Card hoverEffect className={cn('relative overflow-hidden p-5', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-2xl lg:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {value}
          </h3>
        </div>
        <div
          className={cn(
            'p-3 rounded-2xl border flex items-center justify-center transition-transform hover:scale-105',
            iconColors[color]
          )}
        >
          {icon}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
        {trend ? (
          <div className="flex items-center gap-1.5 font-semibold">
            <span
              className={cn(
                'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[11px]',
                trend.isPositive
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
              )}
            >
              {trend.isPositive ? (
                <ArrowUpRight size={12} />
              ) : (
                <ArrowDownRight size={12} />
              )}
              {Math.abs(trend.value)}%
            </span>
            <span className="text-zinc-400 font-normal">{trend.label || 'vs. mês anterior'}</span>
          </div>
        ) : (
          <span className="text-zinc-500 dark:text-zinc-400">{subtitle || 'Atualizado agora'}</span>
        )}
      </div>
    </Card>
  );
}
