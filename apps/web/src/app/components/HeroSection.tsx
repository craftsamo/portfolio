'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Button } from '@workspace/ui/components/button';

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
      className='relative flex items-center justify-center min-h-[70vh] py-12'
      aria-labelledby='hero-title'
    >
      <div className='container mx-auto px-4'>
        <div className='relative z-10 max-w-4xl mx-auto text-center'>
          <motion.h1 id='hero-title' variants={item} className='text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight'>
            Hi, I&apos;m Rui — a Fullstack Engineer
          </motion.h1>

          <motion.p variants={item} className='mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto'>
            I build performant and accessible web applications using modern React, TypeScript and Tailwind. I care about design,
            developer experience and clean code.
          </motion.p>

          <motion.div variants={item} className='mt-8 flex items-center justify-center gap-4 flex-wrap'>
            <Button asChild>
              <Link href='/projects'>See my projects</Link>
            </Button>
            <Button asChild variant='ghost'>
              <Link href='/about'>About me</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
