'use client';

import type { ReactNode } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { ConnectSolanaWallet } from '@/components/Button';
import { ShiningCard } from './ShiningCard';

export interface SolanaCardProps {
  description?: string;
  children?: ReactNode;
}

export const SolanaCard = ({ description, children }: SolanaCardProps) => {
  const { connected } = useWallet();
  return (
    <ShiningCard shining={connected} title='Solana Wallet' description={description}>
      <ConnectSolanaWallet />
      {children}
    </ShiningCard>
  );
};
