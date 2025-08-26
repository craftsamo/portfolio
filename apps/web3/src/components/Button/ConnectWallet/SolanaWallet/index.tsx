'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { Connecting } from '../Connecting';
import { Account } from './Account';
import { WalletOptions } from './WalletOptions';

export interface ConnectSolanaWalletProps {
  className?: string;
}

export const ConnectSolanaWallet = ({ className }: ConnectSolanaWalletProps) => {
  const { connected, connecting, disconnecting } = useWallet();
  if (connecting) {
    return <Connecting className={className} text='Connecting...' />;
  }
  if (disconnecting) {
    return <Connecting className={className} text='Disconnecting...' />;
  }
  if (connected) {
    return <Account />;
  }
  return <WalletOptions />;
};
