'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
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
      className='flex items-center justify-center min-h-[100vh] overflow-hidden'
      aria-labelledby='about-title'
    >
      <Center className='space-y-2'>
        <SparklesText text='Welcome' />
        <motion.div
          variants={item}
          className='h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 opacity-80 shadow-lg'
        />
        <motion.p
          variants={item}
          className='text-xl md:text-2xl text-center text-muted-foreground font-semibold max-w-2xl drop-shadow-lg'
        >
          Showcase your skills and projects with a stunning, fullstack portfolio template. Crafted for modern developers, it
          features elegant reusable components, a scalable architecture, and a delightful developer experience—so you can focus on
          what matters: telling your story and making your mark.
          <br />
          <br />
          Start customizing and deploy your unique portfolio today.
        </motion.p>
        <Link href='https://github.com/itou-rui/portfolio' target='_blank' rel='noopener noreferrer'>
          <LiquidGlassButton size='lg'>Getting Start</LiquidGlassButton>
        </Link>
      </Center>
    </motion.section>
  );
};
