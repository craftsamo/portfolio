'use client';

import { motion } from 'framer-motion';
import { Card } from '@workspace/ui/components/card';
import { Badge } from '@workspace/ui/components/badge';
import { gameData } from '../gameData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 150,
      damping: 25,
    },
  },
};

export const HeroSection = () => {
  const totalGames = gameData.length;
  const availableGames = gameData.filter((game) => !game.isComingSoon).length;
  const categories = [...new Set(gameData.map((game) => game.category))];
  const titleLines = ['Game', 'Collection'];

  return (
    <motion.section
      initial='hidden'
      animate='visible'
      variants={containerVariants}
      className='relative min-h-[80vh] flex items-center justify-center overflow-hidden mt-6'
    >
      {/* Main content */}
      <div className='relative z-10 text-center max-w-4xl'>
        {/* Animated 2-line title */}
        <motion.div variants={itemVariants} className='mb-6'>
          {titleLines.map((line, lineIdx) => (
            <div key={lineIdx} className='leading-tight'>
              {line.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: (lineIdx * 10 + index) * 0.1,
                    type: 'spring',
                    stiffness: 150,
                    damping: 25,
                  }}
                  className='text-6xl md:text-8xl font-bold bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent inline-block'
                >
                  {char}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className='text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed'>
          From classic games to modern puzzles
          <br />
          Enjoy a variety of game genres
        </motion.p>

        {/* Game stats cards */}
        <motion.div variants={itemVariants} className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl'>
          <Card className='p-4 backdrop-blur-sm bg-card/50 border-border/50'>
            <div className='text-2xl font-bold text-primary'>{totalGames}</div>
            <div className='text-sm text-muted-foreground'>Games</div>
          </Card>
          <Card className='p-4 backdrop-blur-sm bg-card/50 border-border/50'>
            <div className='text-2xl font-bold text-green-500'>{availableGames}</div>
            <div className='text-sm text-muted-foreground'>Playable</div>
          </Card>
          <Card className='p-4 backdrop-blur-sm bg-card/50 border-border/50'>
            <div className='text-2xl font-bold text-blue-500'>{categories.length}</div>
            <div className='text-sm text-muted-foreground'>Categories</div>
          </Card>
          <Card className='p-4 backdrop-blur-sm bg-card/50 border-border/50'>
            <div className='text-2xl font-bold text-purple-500'>∞</div>
            <div className='text-sm text-muted-foreground'>Fun</div>
          </Card>
        </motion.div>

        {/* Category badges */}
        <motion.div variants={itemVariants} className='flex justify-center flex-wrap gap-2'>
          {categories.map((category) => (
            <Badge key={category} variant='outline' className='px-3 py-1'>
              {category}
            </Badge>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
