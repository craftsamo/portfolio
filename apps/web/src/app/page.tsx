import { Box, Rows } from '@/components/Layout';
import { AppCard } from './components/AppCard';
import { HeroSection } from './components/HeroSection';

export default async function Portfolio() {
  return (
    <Box>
      {/* Hero section */}
      <Rows className='grid-cols-1'>
        <HeroSection />
      </Rows>

      {/* Demo list */}
      <Rows className='grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        <AppCard
          title='Dashboard'
          description='Data visualization and management dashboard. Demo of KPIs, charts, and an admin panel.'
          buttonText='Open Dashboard'
          href='https://portfolio-dashboard.itourui.dev'
        />
        <AppCard
          title='Games'
          description='A collection of browser-playable mini games. Includes light games like Tetris.'
          buttonText='Play Games'
          href='https://portfolio-games.itourui.dev'
        />
      </Rows>
    </Box>
  );
}
