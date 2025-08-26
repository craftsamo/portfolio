import { Box, Rows } from '@/components/Layout';
import { HeroSection } from './components/HeroSection';
import { EthereumCard } from './components/EthereumCard';
import { SolanaCard } from './components/SolanaCard';

export default async function RootPage() {
  return (
    <Box>
      <HeroSection />
      <Rows className='pt-18 px-12 gap-16 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
        <EthereumCard />
        <SolanaCard />
      </Rows>
    </Box>
  );
}
