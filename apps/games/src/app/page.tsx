import { Box, Rows } from '@/components/Layout';
import { HeroSection } from './components/HeroSection';

export default async function RootPage() {
  return (
    <Box className='px-12'>
      {/* Hero section */}
      <Rows className='grid-cols-1'>
        <HeroSection />
      </Rows>
    </Box>
  );
}
