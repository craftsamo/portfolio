'use client';

import { useEffect, useState } from 'react';
import { useConnect, type Connector } from 'wagmi';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@workspace/ui/components/dialog';
import { NetworkIcon, WalletIcon } from '../Icons';

interface WalletOptionProps {
  connector: Connector;
  onClick: () => void;
}

const WalletOption = ({ connector, onClick }: WalletOptionProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button disabled={!ready} onClick={onClick}>
      <WalletIcon name={connector.name} />
      {connector.name}
    </Button>
  );
};

export interface WalletOptionsProps {
  className?: string;
  title?: string;
  description?: string;
  buttonText?: string;
}

export const WalletOptions = ({
  className,
  title = 'Select Provider',
  description,
  buttonText = 'Connect Wallet',
}: WalletOptionsProps) => {
  const { connectors, connect } = useConnect();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='lg' variant='outline' className={cn(className)}>
          <NetworkIcon id='1' />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {connectors.map((connector) => (
          <WalletOption key={connector.uid} connector={connector} onClick={() => connect({ connector })} />
        ))}
      </DialogContent>
    </Dialog>
  );
};
