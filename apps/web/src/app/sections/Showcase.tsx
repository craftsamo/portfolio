'use client';

import { motion, type Variants } from 'framer-motion';
import { Center } from '@/components/Layout';
import { SparklesText } from '../components/SparkleText';
import { Carousel } from '../components/Carousel';

const items = [
  {
    title: 'Interactive Dashboard',
    description:
      'Transform raw data into actionable insights with a beautiful, intuitive dashboard. Track your KPIs, monitor performance in real-time, and manage your business effortlessly—all in one seamless admin experience.',
    src: 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=1200&q=80',
    href: 'https://portfolio-dashboard.itourui.dev',
  },
  {
    title: 'Mini Game Arcade',
    description:
      'Step into a vibrant arcade packed with both classic favorites and modern browser games. Whether you’re looking for a quick break or a nostalgic escape, enjoy instant gameplay anytime—no downloads, just pure fun on any device.',
    src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=3542',
    href: 'https://portfolio-games.itourui.dev',
  },
  {
    title: 'Web3 Wallet Hub',
    description:
      'Experience the next generation of the web with effortless wallet connectivity. Securely link your Ethereum and Solana wallets, manage your assets, and explore the decentralized world with ease—all from a single, user-friendly hub.',
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
      className='flex items-center justify-center min-h-[100vh] overflow-hidden'
      aria-labelledby='about-title'
    >
      <Center className='space-y-4'>
        <SparklesText text='Showcase' />
        <motion.div
          variants={item}
          className='h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 opacity-80 shadow-lg'
        />
        <motion.p
          variants={item}
          className='text-xl md:text-2xl text-center text-muted-foreground font-semibold max-w-2xl drop-shadow-lg'
        >
          Here are some applications built with this architect.
        </motion.p>
        <Carousel carouselItems={items} autoplay />
      </Center>
    </motion.section>
  );
};
