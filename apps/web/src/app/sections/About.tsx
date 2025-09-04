'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import { Center } from '@/components/Layout';
import { SparklesText } from '../components/SparkleText';
import { OrbitingSkills } from '../components/OrbitingSkills';

const container = {
  visible: {
    opacity: 1,
    x: 0,
    transition: { staggerChildren: 0.08, when: 'beforeChildren' as const },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 },
  },
};

export const AboutSection = () => {
  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.5 }}
      variants={container}
      className={cn(
        'flex items-center justify-center w-full h-full min-h-screen overflow-hidden px-4 py-8 ',
        'sm:px-6 sm:py-12',
        'md:px-8 md:py-16',
        'lg:px-12',
        'xl:px-16',
      )}
      aria-labelledby='about-title'
    >
      <Center className={cn('max-w-xs w-full', 'sm:max-w-md', 'md:max-w-2xl', 'lg:max-w-4xl', 'xl:max-w-5xl')}>
        <SparklesText
          text='About Me'
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
        <motion.div variants={item} className={cn('flex justify-center items-center py-2', 'sm:py-4', 'md:py-4')}>
          <Image
            src='https://avatars.githubusercontent.com/u/191232103?v=4'
            width={128}
            height={128}
            alt='Rui Ito Avatar'
            className={cn(
              'w-16 h-16 rounded-full border-2 border-blue-200 shadow-xl',
              'sm:w-20 sm:h-20 sm:border-4',
              'md:w-24 md:h-24',
              'lg:w-32 lg:h-32',
              'xl:w-36 xl:h-36',
            )}
            loading='lazy'
          />
        </motion.div>
        <motion.p
          variants={item}
          className={cn(
            'text-base text-center text-muted-foreground font-medium max-w-full px-2 leading-relaxed',
            'sm:text-lg sm:px-4',
            'md:text-xl md:px-6',
            'lg:text-2xl',
            'xl:text-3xl',
          )}
        >
          Hi, I'm Rui Ito — a passionate fullstack developer dedicated to crafting beautiful, scalable web experiences.
        </motion.p>
        <motion.div variants={item} className={cn('flex justify-center items-center pt-4', 'sm:pt-6', 'md:pt-4')}>
          <OrbitingSkills />
        </motion.div>
      </Center>
    </motion.section>
  );
};
