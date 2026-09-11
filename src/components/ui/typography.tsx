import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      display: 'text-[60px] leading-[74px] font-bold text-gray-900',
      title: 'text-[44px] leading-[58px] font-semibold text-gray-900',
      body: 'text-[28px] leading-[38px] font-medium text-gray-900',
      caption: 'text-[16px] leading-[24px] font-normal text-gray-600',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

interface TypographyProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

export function Typography({
  className,
  variant,
  as: Component = 'p',
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
}
