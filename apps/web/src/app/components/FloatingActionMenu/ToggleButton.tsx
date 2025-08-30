'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { LiquidGlassButton } from '@/components/Button';

interface ToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ToggleButton = ({ isOpen, onClick }: ToggleProps) => (
  <LiquidGlassButton size='xl' className='w-12 h-12' onClick={onClick}>
    <motion.div
      animate={{ rotate: isOpen ? 45 : 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      <Plus className='w-6 h-6' />
    </motion.div>
  </LiquidGlassButton>
);
