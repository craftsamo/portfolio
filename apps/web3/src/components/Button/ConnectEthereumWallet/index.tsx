'use client';

import { useAccount } from 'wagmi';
import { Connecting } from './Connecting';
import { WalletOptions } from './WalletOptions';
import { Account } from './Account';

export interface ConnectEthereumWalletProps {
  className?: string;
}

export const ConnectEthereumWallet = ({ className }: ConnectEthereumWalletProps) => {
  const { status } = useAccount();
  switch (status) {
    case 'disconnected':
      return <WalletOptions className={className} />;
    case 'connected':
      return <Account />;
    case 'connecting':
      return <Connecting className={className} text='Connecting...' />;
    case 'reconnecting':
      return <Connecting className={className} text='Reconnecting...' />;
  }
};
