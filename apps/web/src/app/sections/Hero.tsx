'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import { SparklesText } from '../components/SparkleText';
import { Center } from '@/components/Layout';
import { LiquidGlassButton } from '@/components/Button';

const container: Variants = {
  visible: {
    opacity: 1,
    x: 0,
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
      whileInView='visible'
      viewport={{ once: true, amount: 0.5 }}
      variants={container}
      className={cn(
        'flex items-center justify-center w-full h-full min-h-screen px-4 py-8',
        'sm:px-6 sm:py-12',
        'md:px-8 md:py-16',
        'lg:px-12',
        'xl:px-16',
      )}
      aria-labelledby='hero-title'
    >
      <Center className={cn('space-y-1 max-w-xs w-full mx-auto', 'sm:max-w-md', 'md:max-w-2xl', 'lg:max-w-4xl', 'xl:max-w-5xl')}>
        <SparklesText
          text='Welcome'
          sparklesCount={5}
          className={cn('text-3xl', 'sm:text-4xl', 'md:text-5xl', 'lg:text-6xl', 'xl:text-7xl')}
        />
        <motion.div
          variants={item}
          className={cn(
            'h-1 w-16 rounded-full bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 opacity-80 shadow-lg',
            'sm:h-1.5 sm:w-20',
            'md:h-2 md:w-24',
            'lg:w-28',
            'xl:w-32',
          )}
        />
        <motion.p
          variants={item}
          className={cn(
            'text-sm text-center text-muted-foreground font-semibold max-w-full drop-shadow-lg leading-relaxed px-2',
            'sm:text-base sm:px-4',
            'md:text-lg md:px-6',
            'lg:text-xl',
            'xl:text-2xl',
          )}
        >
          Showcase your skills and projects with a stunning, fullstack portfolio template. Crafted for modern developers, it
          features elegant reusable components, a scalable architecture, and a delightful developer experience—so you can focus on
          what matters: telling your story and making your mark.
          <br className={cn('hidden', 'sm:block')} />
          <br className={cn('hidden', 'sm:block')} />
          <span className={cn('block mt-4', 'sm:inline sm:mt-0')}>Start customizing and deploy your unique portfolio today.</span>
        </motion.p>
        <motion.div variants={item} className={cn('pt-4', 'sm:pt-6', 'md:pt-8')}>
          <Link href='https://github.com/itou-rui/portfolio' target='_blank' rel='noopener noreferrer'>
            <LiquidGlassButton
              size='lg'
              className={cn('text-sm px-6 py-3', 'sm:text-base sm:px-8 sm:py-4', 'md:text-lg md:px-10 md:py-5')}
            >
              Getting Start
            </LiquidGlassButton>
          </Link>
        </motion.div>
      </Center>
    </motion.section>
  );
};
