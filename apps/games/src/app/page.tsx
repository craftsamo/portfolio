import { Box, Rows } from '@/components/Layout';
import { HeroSection } from './components/HeroSection';
import { GameCard } from './components/GameCard';
import { gameData } from './gameData';

export default async function RootPage() {
  return (
    <Box className='px-12'>
      {/* Hero section */}
      <Rows className='grid-cols-1'>
        <HeroSection />
      </Rows>

      {/* Game list */}
      <Rows className='grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
        {gameData.map((game) => (
          <GameCard key={game.title} {...game} />
        ))}
      </Rows>
    </Box>
  );
}
