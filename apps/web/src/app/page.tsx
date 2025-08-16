import { Box, Rows } from '@/components/Layout';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExampleSection } from './components/ExampleSection';

export default async function Portfolio() {
  return (
    <Box>
      {/* Hero section */}
      <Rows id='hero' className='sm:pt-28 grid-cols-1'>
        <HeroSection />
      </Rows>

      {/* About */}
      <Rows id='about' className='sm:pt-12 grid-cols-1'>
        <AboutSection />
      </Rows>

      {/* Demo list */}
      <Rows id='examples' className='sm:pt-12 grid-cols-1 gap-6 px-5'>
        <ExampleSection />
      </Rows>
    </Box>
  );
}
