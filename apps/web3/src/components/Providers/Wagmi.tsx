'use client';

import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider as WagmiProviderCore, type WagmiProviderProps as WagmiProviderCoreProps } from 'wagmi';
import { config as defaultConfig } from '@/config/wagmi';

const queryClient = new QueryClient();

export interface WagmiProviderProps extends Omit<WagmiProviderCoreProps, 'config'> {
  children: ReactNode;
  config?: WagmiProviderCoreProps['config'];
}

export const WagmiProvider = ({ children, config = defaultConfig, ...props }: WagmiProviderProps) => (
  <WagmiProviderCore config={config} {...props}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </WagmiProviderCore>
);
