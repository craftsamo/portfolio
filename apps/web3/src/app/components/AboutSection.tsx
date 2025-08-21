'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SparklesText } from './SparkleText';

const aboutContainer = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, when: 'beforeChildren' as const },
  },
};

const aboutItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 },
  },
};

export const AboutSection = () => (
  <motion.section
    initial='hidden'
    whileInView='visible'
    viewport={{ once: true, amount: 0.5 }}
    variants={aboutContainer}
    className='relative flex items-center justify-center min-h-[55vh] py-16 overflow-hidden'
    aria-labelledby='about-title'
  >
    <div className='container mx-auto px-4 relative z-20'>
      <div className='relative z-10 max-w-3xl mx-auto text-center'>
        <SparklesText text='About Me' sparklesCount={10} />
        <motion.div
          variants={aboutItem}
          className='mx-auto mt-6 mb-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 opacity-80 shadow-lg'
        />
        <motion.div variants={aboutItem} className='mt-10 flex justify-center items-center'>
          <Image
            src='https://avatars.githubusercontent.com/u/191232103?v=4'
            width={128}
            height={128}
            alt='Rui Ito Avatar'
            className='w-24 h-24 mb-6 rounded-full border-4 border-blue-200 shadow-xl mx-auto'
            loading='lazy'
          />
        </motion.div>
        <motion.p variants={aboutItem} className='text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto'>
          Hi, I’m Rui Ito — a passionate fullstack developer who loves creating beautiful and scalable web experiences.
          <br className='hidden md:inline' />
          My expertise ranges from UI/UX design to backend architecture, and I thrive on building products that delight users.
        </motion.p>
      </div>
    </div>
  </motion.section>
);
