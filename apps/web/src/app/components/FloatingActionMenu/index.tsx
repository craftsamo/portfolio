'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@workspace/ui/components/theme-toggle';
import { cn } from '@workspace/ui/lib/utils';
import { LiquidGlassButton } from '@/components/Button';
import { ToggleButton } from './ToggleButton';
import { ScrollTopButton } from './ScrollTopButton';

const Wrap = ({ index, children }: { index: number; children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
  >
    {children}
  </motion.div>
);

type FloatingActionMenuProps = {
  className?: string;
};

export const FloatingActionMenu = ({ className }: FloatingActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  return (
    <div className={cn('fixed bottom-8 right-8', className)}>
      <ToggleButton isOpen={isOpen} onClick={toggle} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 10, y: 10, filter: 'blur(10px)' }}
            transition={{
              duration: 0.6,
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: 0.1,
            }}
            className='absolute bottom-10 right-0 mb-6'
          >
            <div className='flex flex-col items-end gap-4'>
              <Wrap index={0}>
                <LiquidGlassButton
                  size='lg'
                  className='w-10 h-10 rounded-full'
                  onClick={(e) => {
                    const button = e.currentTarget.querySelector('button, [role="button"]') as HTMLElement | null;
                    if (button) button.click();
                  }}
                >
                  <ThemeToggle className='bg-transparent border-transparent rounded-full' />
                </LiquidGlassButton>
              </Wrap>
              <Wrap index={1}>
                <ScrollTopButton close={close} />
              </Wrap>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
