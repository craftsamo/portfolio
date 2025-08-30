'use client';

import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from '@/store';

interface AnimateSectionProps {
  index: number;
  children: ReactNode;
}

export const AnimateSection = ({ index, children }: AnimateSectionProps) => {
  const { current, direction } = useAppSelector((state) => state.sectionInView);
  const isActive = current === index;
  const yFrom = direction === 'prev' ? -40 : 40;
  const yExit = direction === 'prev' ? 40 : -40;
  return (
    isActive && (
      <AnimatePresence>
        <motion.div
          className='w-full h-full flex-grow flex-shrink-0'
          initial={{ opacity: 0, y: yFrom }}
          animate={{ opacity: 1, y: 0, pointerEvents: 'auto' }}
          exit={{ opacity: 0, y: yExit }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    )
  );
};
