'use client';

import { useCallback } from 'react';
import { WalletIcon, NetworkSolana } from '@web3icons/react';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { useWallet, type Wallet } from '@solana/wallet-adapter-react';
import { Button } from '@workspace/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@workspace/ui/components/dialog';
import { cn } from '@workspace/ui/lib/utils';

interface WalletOptionProps {
  connector: Wallet;
}

export const WalletOption = ({ connector }: WalletOptionProps) => {
  const { select, connect, wallet } = useWallet();
  const buttonText = `${connector.adapter.name} (${connector.readyState})`;

  const handleWalletSelect = useCallback(async () => {
    if (wallet?.adapter.name && connector.adapter.name === wallet.adapter.name) {
      await connect();
    } else {
      select(connector.adapter.name);
    }
  }, [connector.adapter.name, wallet?.adapter.name, select, connect]);

  return (
    <Button disabled={connector.readyState === WalletReadyState.Unsupported} onClick={handleWalletSelect}>
      <WalletIcon id={connector.adapter.name} variant='branded' />
      {buttonText}
    </Button>
  );
};

export interface WalletOptionsProps {
  className?: string;
  buttonText?: string;
  title?: string;
  description?: string;
}

export const WalletOptions = ({
  className,
  title = 'Select Provider',
  description,
  buttonText = 'Connect Wallet',
}: WalletOptionsProps) => {
  const { wallets } = useWallet();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className={cn(className)}>
          <NetworkSolana variant='branded' />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {wallets.map((connector) => (
          <WalletOption key={connector.adapter.name} connector={connector} />
        ))}
      </DialogContent>
    </Dialog>
  );
};
