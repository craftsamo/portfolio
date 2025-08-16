'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Button } from '@workspace/ui/components/button';
import { SparklesText } from './SparkleText';

// Simple animated container variants
const container: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, when: 'beforeChildren' as const },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 },
  },
};

export const HeroSection = () => {
  return (
    <motion.section
      initial='hidden'
      animate='visible'
      variants={container}
      className='relative flex items-center justify-center min-h-[70vh] py-12 overflow-hidden'
      aria-labelledby='hero-title'
    >
      <div className='pointer-events-none absolute inset-0 z-0' />
      <div className='container mx-auto px-4 relative z-10'>
        <div className='relative z-10 max-w-4xl mx-auto text-center'>
          <SparklesText text='Welcome' sparklesCount={15} />

          {/* Accent Line below title */}
          <motion.div
            variants={item}
            className='mx-auto mt-6 mb-2 h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 opacity-80 shadow-lg'
          />

          <motion.p
            variants={item}
            className='mt-8 text-xl md:text-2xl text-muted-foreground font-semibold max-w-2xl mx-auto drop-shadow-lg'
          >
            A fullstack portfolio template featuring reusable UI components, scalable architecture, and seamless developer
            experience — powered by Turborepo.
          </motion.p>

          <motion.div variants={item} className='mt-12 flex justify-center gap-4'>
            <Link href='https://github.com/itou-rui/turborepo-starter' target='_blank' rel='noopener noreferrer'>
              <Button
                size='lg'
                variant='outline'
                className='transition-all duration-200 shadow-md hover:scale-105 hover:bg-gradient-to-r hover:from-blue-400 hover:to-pink-400 hover:text-white flex items-center gap-2'
              >
                <svg width='22' height='22' fill='none' viewBox='0 0 22 22'>
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 11h16m0 0l-5-5m5 5l-5 5'
                  />
                </svg>
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
