'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SparklesText } from '../components/SparkleText';
import { Center } from '@/components/Layout';

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

export const AboutSection = () => (
  <motion.section
    initial='hidden'
    whileInView='visible'
    viewport={{ once: true, amount: 0.5 }}
    variants={container}
    className='flex items-center justify-center min-h-[100vh] overflow-hidden'
    aria-labelledby='about-title'
  >
    <Center className='space-y-4'>
      <SparklesText text='About Me' sparklesCount={10} />
      <motion.div
        variants={item}
        className='h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 opacity-80 shadow-lg'
      />
      <motion.div variants={item} className='flex justify-center items-center'>
        <Image
          src='https://avatars.githubusercontent.com/u/191232103?v=4'
          width={128}
          height={128}
          alt='Rui Ito Avatar'
          className='w-24 h-24 rounded-full border-4 border-blue-200 shadow-xl'
          loading='lazy'
        />
      </motion.div>
      <motion.p variants={item} className='text-lg md:text-xl text-center text-muted-foreground font-medium max-w-2xl '>
        Hi, I’m Rui Ito — a passionate fullstack developer dedicated to crafting beautiful, scalable web experiences.
        <br className='hidden md:inline' />
        From pixel-perfect UI/UX design to robust backend architecture, I believe every detail matters.
        <br className='hidden md:inline' />
        My mission is to build products that not only function flawlessly, but also bring delight to users and empower teams to
        achieve more.
        <br className='hidden md:inline' />I thrive in collaborative environments, love learning new technologies, and am always
        pushing the boundaries of what’s possible on the web.
      </motion.p>
    </Center>
  </motion.section>
);
