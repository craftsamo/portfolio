'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
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
      className='flex items-center justify-center h-[calc(var(--vh)*100)] overflow-hidden'
      aria-labelledby='about-title'
    >
      <Center className='space-y-2'>
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
        </motion.p>
        <motion.div variants={item} className='flex justify-center items-center'>
          <OrbitingSkills diameter={300} />
        </motion.div>
      </Center>
    </motion.section>
  );
};
