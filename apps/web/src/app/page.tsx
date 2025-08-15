import { Box, Rows } from '@/components/Layout';
import { HeroSection } from './components/HeroSection';
export default async function Portfolio() {
  return (
    <Box>
      {/* Hero section */}
      <Rows className='grid-cols-1'>
        <HeroSection />
      </Rows>
    </Box>
  );
}
