'use client';

import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider as WagmiProviderCore, type WagmiProviderProps as WagmiProviderCoreProps } from 'wagmi';
import { config } from '@/config/wagmi';

const queryClient = new QueryClient();

export interface WagmiProviderProps extends Omit<WagmiProviderCoreProps, 'config'> {
  children: ReactNode;
}

export const WagmiProvider = ({ children, ...props }: WagmiProviderProps) => (
  <WagmiProviderCore config={config} {...props}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </WagmiProviderCore>
);
