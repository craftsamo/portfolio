'use client';

import { motion } from 'framer-motion';
import { SparklesText } from './SparkleText';
import { AppCard } from './AppCard';

const container = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, when: 'beforeChildren' as const },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 },
  },
};

const examples = [
  {
    title: 'Dashboard',
    description: 'Data visualization and management dashboard. Demo of KPIs, charts, and an admin panel.',
    buttonText: 'Open Dashboard',
    href: 'https://portfolio-dashboard.itourui.dev',
  },
  {
    title: 'Games',
    description: 'A collection of browser-playable mini games. Includes light games like Tetris.',
    buttonText: 'Play Games',
    href: 'https://portfolio-games.itourui.dev',
  },
  {
    title: 'Web3',
    description: 'An app to connect Ethereum and Solana wallets',
    buttonText: 'Open Web3',
    href: 'https://portfolio-web3.itourui.dev',
  },
];

export const ExampleSection = () => (
  <motion.section
    initial='hidden'
    whileInView='visible'
    viewport={{ once: true, amount: 0.6 }}
    variants={container}
    className='relative flex flex-col items-center justify-center min-h-[55vh] py-16 overflow-hidden'
    aria-labelledby='examples-title'
  >
    <div className='container mx-auto px-4 relative z-10'>
      <div className='relative z-10 max-w-4xl mx-auto text-center'>
        <SparklesText text='Examples' sparklesCount={10} />
        <motion.div
          variants={item}
          className='mx-auto mt-6 mb-8 h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 opacity-80 shadow-lg'
        />
      </div>
      <motion.div variants={container} className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {examples.map((ex, _) => (
          <motion.div variants={item} key={ex.title}>
            <AppCard {...ex} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </motion.section>
);
