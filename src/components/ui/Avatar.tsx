import { cn } from '../../utils/cn';
import { getInitials } from '../../utils/format';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-semibold',
    lg: 'w-12 h-12 text-base font-bold',
    xl: 'w-16 h-16 text-lg font-bold',
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(
          'rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-800 shrink-0',
          sizeClasses[size],
          className
        )}
      />
    );
  }

  // Generate consistent color hash from name
  const colors = [
    'bg-indigo-500 text-white',
    'bg-violet-500 text-white',
    'bg-sky-500 text-white',
    'bg-emerald-500 text-white',
    'bg-amber-500 text-white',
    'bg-rose-500 text-white',
    'bg-teal-500 text-white',
  ];
  const charCodeSum = (name || 'A').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorClass = colors[charCodeSum % colors.length];

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-medium shrink-0 select-none shadow-sm',
        sizeClasses[size],
        colorClass,
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}
