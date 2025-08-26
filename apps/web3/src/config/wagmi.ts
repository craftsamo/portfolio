import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected, metaMask } from 'wagmi/connectors';
import { mock } from 'wagmi/connectors';

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

export const testConfig = createConfig({
  chains: [mainnet, sepolia],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [
    injected(),
    metaMask(),
    mock({
      accounts: [
        '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
        '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      ],
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
