'use client';

import { useMemo } from 'react';
import { Unlink2 } from 'lucide-react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { cn } from '@workspace/ui/lib/utils';
import { Button } from '@workspace/ui/components/button';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@workspace/ui/components/dialog';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { NetworkIcon } from '../Icons';

interface EnsAvatarProps {
  className?: string;
  address?: `0x${string}`;
  shortAddress: string;
  size?: number;
}

const EnsAvatar = ({ className = 'h-9 w-9', address, shortAddress }: EnsAvatarProps) => {
  const { data: ensName, isLoading: isEnsNameLoading } = useEnsName({ address });
  const { data: ensAvatar, isLoading: isEnsAvatarLoading } = useEnsAvatar({ name: ensName! });
  const isLoading = isEnsNameLoading || isEnsAvatarLoading;
  return useMemo(
    () =>
      isLoading ? (
        <Skeleton className={cn('rounded-full', className)} />
      ) : (
        <Avatar className={cn(className)}>
          {ensAvatar && <AvatarImage src={ensAvatar} />}
          <AvatarFallback>{ensName ? ensName.slice(0, 2).toUpperCase() : shortAddress.slice(2, 4).toUpperCase()}</AvatarFallback>
        </Avatar>
      ),
    [className, ensAvatar, ensName, isLoading, shortAddress],
  );
};

interface EnsNameProps {
  className?: string;
  address?: `0x${string}`;
  shortAddress: string;
}

export const EnsName = ({ className, address, shortAddress }: EnsNameProps) => {
  const { data: ensName, isLoading: isEnsNameLoading } = useEnsName({ address });
  return (
    <div className={cn('flex flex-col items-start text-left', isEnsNameLoading && 'space-y-1', className)}>
      {isEnsNameLoading ? (
        <Skeleton className='h-4 w-32' />
      ) : (
        ensName && <span className='font-semibold text-base text-foreground'>{ensName ? ensName : shortAddress}</span>
      )}
      <span className='text-sm text-muted-foreground tracking-wide font-mono'>{shortAddress}</span>
    </div>
  );
};

const DisconnectButton = () => {
  const { disconnect } = useDisconnect();
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
  const { address, chainId } = useAccount();
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  return (
    <div className={cn('flex items-center', className)}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <NetworkIcon id={`${chainId || 1}`} />
            {shortAddress}
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className='flex flex-col items-center space-y-2'>
            <EnsAvatar className='w-16 h-16' shortAddress={shortAddress} address={address} />
            <EnsName className='items-center' shortAddress={shortAddress} address={address} />
            <div className='pt-2'>
              <DisconnectButton />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
