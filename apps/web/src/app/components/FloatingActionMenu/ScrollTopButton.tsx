'use client';

import { ArrowUp } from 'lucide-react';
import { LiquidGlassButton } from '@/components/Button';
import { cn } from '@workspace/ui/lib/utils';
import { useAppDispatch } from '@/store';
import { resetSection } from '@/store/slices/sectionInView';

interface ScrollTopButtonProps {
  className?: string;
  close: () => void;
}

export const ScrollTopButton = ({ className, close }: ScrollTopButtonProps) => {
  const dispatch = useAppDispatch();

  // Scroll to top handler
  const handleScrollTop = () => {
    dispatch(resetSection());
    close();
  };

  return (
    <LiquidGlassButton size='lg' className={cn('w-10 h-10 rounded-full', className)} onClick={handleScrollTop}>
      <ArrowUp className='w-6 h-6' />
    </LiquidGlassButton>
  );
};
