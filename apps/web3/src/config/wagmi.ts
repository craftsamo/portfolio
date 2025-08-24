import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected, metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, sepolia],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [injected(), metaMask()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
