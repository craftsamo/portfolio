'use client';

import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { CircleQuestionMarkIcon } from 'lucide-react';
import { mainnet } from 'wagmi/chains';
import {
  type WalletIconProps,
  WalletMetamask,
  WalletPhantom,
  WalletRabby,
  type NetworkIconProps,
  NetworkEthereum,
  NetworkSolana,
} from '@web3icons/react';

const networkIconMap: Record<string, ForwardRefExoticComponent<Omit<WalletIconProps, 'ref'> & RefAttributes<SVGSVGElement>>> = {
  [mainnet.id.toString()]: NetworkEthereum,
  [mainnet.name.toLowerCase()]: NetworkEthereum,
  ethereum: NetworkEthereum,
  solana: NetworkSolana,
  'solana-mainnet': NetworkSolana,
};

export const NetworkIcon = ({ id, name, variant = 'branded', ...props }: NetworkIconProps) => {
  const key = (id || name || '').toString().toLowerCase();
  const Icon = networkIconMap[key];
  if (Icon) {
    return <Icon id={id} name={name} variant={variant} {...props} />;
  }
  return <CircleQuestionMarkIcon />;
};

const walletIconMap: Record<string, ForwardRefExoticComponent<Omit<WalletIconProps, 'ref'> & RefAttributes<SVGSVGElement>>> = {
  metamask: WalletMetamask,
  'metamask.io': WalletMetamask,
  phantom: WalletPhantom,
  rabby: WalletRabby,
};

export const WalletIcon = ({ id, name, variant = 'branded', ...props }: WalletIconProps) => {
  const key = (id || name || '').toString().toLowerCase();
  const Icon = walletIconMap[key];
  if (Icon) {
    return <Icon variant={variant} {...props} />;
  }
  return <CircleQuestionMarkIcon />;
};
