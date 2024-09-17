import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-xl border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-xs text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-xs text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-xs text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground text-xs',
        yellow: 'border-transparent bg-yellow-500 text-primary text-xs',
        blue: 'bg-blue-600 text-white text-xs leading-[0.9rem]',
        red: 'bg-red-600 text-white text-xs leading-[0.9rem]',
        gray: 'bg-gray-500 text-white text-xs leading-[0.9rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
