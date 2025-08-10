'use client';

import { Plus } from 'lucide-react';
import { DropdownMenuItem, DropdownMenuShortcut } from '@workspace/ui/components/dropdown-menu';
import { SwitcherLogo, type SwitcherLogoProps } from './SwitcherLogo';

export interface SwitcherMenuItemProps {
  index?: number;
  logoProps: SwitcherLogoProps;
  text: string;
  onClick?: () => void;
}

export function SwitcherMenuItem({ index, logoProps, text, onClick }: SwitcherMenuItemProps) {
  return (
    <DropdownMenuItem onClick={onClick} className='gap-2 p-2'>
      <SwitcherLogo className='border' {...logoProps} />
      {text}
      {index !== undefined && <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>}
    </DropdownMenuItem>
  );
}

export function AddSwitcherMenuItem() {
  return (
    <DropdownMenuItem className='gap-2 p-2'>
      <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
        <Plus className='size-4' />
      </div>
      <div className='font-medium text-muted-foreground'>Add item</div>
    </DropdownMenuItem>
  );
}
