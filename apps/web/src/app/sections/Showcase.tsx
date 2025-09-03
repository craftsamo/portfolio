'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import { Center } from '@/components/Layout';
import { SparklesText } from '../components/SparkleText';
import { Carousel } from '../components/Carousel';

const items = [
  {
    title: 'Dashboard apps',
    description: 'An intuitive dashboard for managing KPIs and business tasks in one place.',
    src: 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=1200&q=80',
    href: 'https://portfolio-dashboard.itourui.dev',
  },
  {
    title: 'Mini Game Arcade',
    description: 'A collection of mini games you can play instantly in your browser.',
    src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=3542',
    href: 'https://portfolio-games.itourui.dev',
  },
  {
    title: 'Web3 Wallet Hub',
    description: 'A simple hub for connecting Ethereum and Solana wallets.',
    src: 'https://images.unsplash.com/photo-1672911640817-d2902754be5a?q=80&w=3732',
    href: 'https://portfolio-web3.itourui.dev',
  },
];

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

export const ShowcaseSection = () => {
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
      aria-labelledby='showcase-title'
    >
      <Center className={cn('max-w-xs w-full mx-auto', 'sm:max-w-md', 'md:max-w-2xl', 'lg:max-w-4xl', 'xl:max-w-6xl')}>
        <SparklesText text='Showcase' className={cn('text-3xl', 'sm:text-4xl', 'md:text-5xl', 'lg:text-6xl', 'xl:text-7xl')} />
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
            'text-base text-center text-muted-foreground font-semibold max-w-full drop-shadow-lg leading-relaxed px-2',
            'sm:text-lg sm:px-4',
            'md:text-xl md:px-6',
            'lg:text-2xl',
            'xl:text-3xl',
          )}
        >
          Here are some applications built with this architect.
        </motion.p>
        <motion.div variants={item} className={cn('w-full pt-4', 'sm:pt-6', 'md:pt-8', 'lg:pt-10', 'xl:pt-12')}>
          <Carousel carouselItems={items} autoplay />
        </motion.div>
      </Center>
    </motion.section>
  );
};
