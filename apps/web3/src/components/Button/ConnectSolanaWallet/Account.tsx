'use client';

import { Unlink2 } from 'lucide-react';
import { NetworkSolana } from '@web3icons/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import type { PublicKey } from '@solana/web3.js';
import { useReverseLookup } from '@bonfida/sns-react';
import { cn } from '@workspace/ui/lib/utils';
import { Button } from '@workspace/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@workspace/ui/components/dialog';
import { Skeleton } from '@workspace/ui/components/skeleton';

interface EnsNameProps {
  className?: string;
  publicKey: PublicKey;
  shortAddress: string;
}

export const EnsName = ({ className, publicKey, shortAddress }: EnsNameProps) => {
  const { connection } = useConnection();
  const { data, isPending } = useReverseLookup(connection, publicKey);

  return (
    <div className={cn('flex flex-col items-start text-left', isPending && 'space-y-1', className)}>
      {isPending ? (
        <Skeleton className='h-4 w-32' />
      ) : (
        data && <span className='text-sm text-muted-foreground tracking-wide font-mono'>{data}</span>
      )}
      <span className='font-semibold text-base text-foreground'>{shortAddress}</span>
    </div>
  );
};

const DisconnectButton = () => {
  const { disconnect } = useWallet();
  return (
    <Button size='sm' onClick={() => disconnect()}>
      <Unlink2 />
      Disconnect
    </Button>
  );
};

export interface AccountProps {
  className?: string;
  title?: string;
  description?: string;
}

export const Account = ({ className, title, description }: AccountProps) => {
  const { publicKey } = useWallet();
  const address = publicKey?.toBase58();
  const shortAddress = address ? `${address.slice(0, 6)}...${address.toString().slice(-4)}` : '';
  return (
    <div className={cn('flex items-center', className)}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <NetworkSolana variant='branded' />
            {shortAddress}
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className='flex flex-col items-center space-y-2'>
            {publicKey && <EnsName className='items-center' shortAddress={shortAddress} publicKey={publicKey} />}
            <div className='pt-2'>
              <DisconnectButton />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
