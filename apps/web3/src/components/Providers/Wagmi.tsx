'use client';

import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider as WagmiProviderCore, type State } from 'wagmi';
import { config } from '@/config/wagmi';

const queryClient = new QueryClient();

export interface WagmiProviderProps {
  children: ReactNode;
  initialState?: State;
}

export const WagmiProvider = ({ children, initialState }: WagmiProviderProps) => (
  <WagmiProviderCore config={config} initialState={initialState}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </WagmiProviderCore>
);
