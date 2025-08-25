'use client';

import type { ReactNode } from 'react';
import { useAccount } from 'wagmi';
import { ConnectEthereumWallet } from '@/components/Button';
import { ShiningCard } from './ShiningCard';

export interface WalletCardProps {
  description?: string;
  children?: ReactNode;
}

export const EthereumCard = ({ description, children }: WalletCardProps) => {
  const { isConnected } = useAccount();
  return (
    <ShiningCard shining={isConnected} title='Ethereum Wallet' description={description}>
      <ConnectEthereumWallet />
      {children}
    </ShiningCard>
  );
};
