import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-violet-500 hover:bg-violet-600 text-white shadow-sm shadow-violet-400/25 focus:ring-violet-400 border border-transparent',
      secondary:
        'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 focus:ring-zinc-300 border border-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 dark:border-zinc-700/60',
      outline:
        'border border-violet-200 dark:border-violet-800/60 bg-transparent hover:bg-violet-50 dark:hover:bg-violet-500/10 text-violet-700 dark:text-violet-300 focus:ring-violet-300',
      ghost:
        'bg-transparent hover:bg-violet-50 dark:hover:bg-violet-500/10 text-zinc-600 dark:text-zinc-300 hover:text-violet-700 dark:hover:text-violet-300 focus:ring-violet-300 border border-transparent',
      danger:
        'bg-rose-500 hover:bg-rose-600 text-white shadow-sm shadow-rose-400/20 focus:ring-rose-400 border border-transparent',
      success:
        'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-400/20 focus:ring-emerald-400 border border-transparent',
    };

    const sizes = {
      xs: 'px-2.5 py-1 text-xs gap-1.5',
      sm: 'px-3.5 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-5 py-2.5 text-sm gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
