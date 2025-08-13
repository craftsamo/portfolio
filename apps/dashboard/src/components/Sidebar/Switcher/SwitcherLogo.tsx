'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { cn } from '@workspace/ui/lib/utils';

export interface SwitcherLogoProps {
  src: string;
  alt: string;
  fallbackText?: string;
  className?: string;
}

export const SwitcherLogo = ({ className, src, alt, fallbackText }: SwitcherLogoProps) => (
  <div className={cn('flex items-center justify-center rounded-lg size-8 md:size-8', className)}>
    <Avatar className='h-8 w-8 rounded-lg'>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className='rounded-lg'>{fallbackText || alt[0] + alt[1]}</AvatarFallback>
    </Avatar>
  </div>
);
