import { Box, Rows } from '@/components/Layout';
import { HeroSection } from './components/HeroSection';
import { EthereumCard } from './components/EthereumCard';
import { SolanaCard } from './components/SolanaCard';

export default async function Portfolio() {
  return (
    <Box>
      <HeroSection />
        <EthereumCard />
        <SolanaCard />
      </Rows>
    </Box>
  );
}
