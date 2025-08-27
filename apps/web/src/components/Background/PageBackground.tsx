'use client';

import type { ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { ShootingStar } from './ShootingStar';
import { LightBreeze } from './LightBreeze';

export interface PageBackground {
  children?: ReactNode;
}

const backgroundComponent = {
  light: LightBreeze,
  dark: ShootingStar,
};

export const PageBackground = ({ children }: PageBackground) => {
  const { theme, resolvedTheme } = useTheme();
  const activeTheme = theme === 'system' ? resolvedTheme : theme || 'light';
  const Background = backgroundComponent[activeTheme as 'light' | 'dark'];
  return <Background>{children}</Background>;
};
