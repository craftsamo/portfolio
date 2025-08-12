'use client';

import { useEffect, useState, createElement, type ElementType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, Check, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@workspace/ui/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';

type ThemeType = 'light' | 'dark' | 'system';

const themeIcons: Record<ThemeType, ElementType> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

interface ThemeToggleBaseProps {
  theme: ThemeType;
  setTheme: (theme: string) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
interface ThemeToggleWithThemesProps extends ThemeToggleBaseProps {
  themes: ThemeType[];
  showLabel?: boolean;
}

export const ThemeToggleButton = (props: ThemeToggleWithThemesProps) => {
  const { theme, setTheme, themes, showLabel = false, size = 'md', className } = props;
  const sizeClasses = { sm: 'h-8 px-2 text-xs', md: 'h-10 px-3 text-sm', lg: 'h-12 px-4 text-base' };
  const iconSizes = { sm: 14, md: 16, lg: 20 };
  const safeTheme =
    themes && themes.length > 0 && themes.includes(theme) ? theme : themes && themes.length > 0 ? themes[0] : 'light';
  const nextTheme = themes && themes.length > 0 ? themes[(themes.indexOf(safeTheme as ThemeType) + 1) % themes.length] : 'light';
  const Icon = themeIcons[safeTheme as ThemeType] ?? Sun;
  const themeLabel = safeTheme ? (safeTheme as string).charAt(0).toUpperCase() + (safeTheme as string).slice(1) : '';
  return (
    <motion.button
      onClick={() => setTheme(nextTheme ?? 'light')}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg border transition-all duration-200',
        'bg-card text-foreground',
        'hover:scale-105 hover:bg-muted active:scale-95',
        sizeClasses[size],
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        key={safeTheme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Icon size={iconSizes[size]} />
      </motion.div>
      {showLabel && <span className='font-medium'>{themeLabel}</span>}
    </motion.button>
  );
};

export const ThemeToggleDropdown = (props: ThemeToggleWithThemesProps) => {
  const { theme, setTheme, themes, showLabel = false, size = 'md', className } = props;
  const sizeClasses = { sm: 'h-8 px-2 text-xs', md: 'h-10 px-3 text-sm', lg: 'h-12 px-4 text-base' };
  const iconSizes = { sm: 14, md: 16, lg: 20 };
  const safeTheme =
    themes && themes.length > 0 && typeof theme === 'string' && themes.includes(theme)
      ? theme
      : themes && themes.length > 0
        ? themes[0]
        : 'light';
  const themeLabel = safeTheme ? safeTheme.charAt(0).toUpperCase() + safeTheme.slice(1) : '';
  return (
    <div className='relative'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {showLabel ? (
            <motion.button
              className={cn(
                'inline-flex items-center justify-between gap-2 rounded-lg border transition-all duration-200',
                sizeClasses[size],
                'min-w-[80px]',
                className,
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className='flex items-center gap-2'>
                {createElement(themeIcons[safeTheme as ThemeType] ?? Sun, {
                  size: iconSizes[size],
                })}
                <span className='font-medium'>{themeLabel}</span>
              </div>
              <ChevronDown size={iconSizes[size]} />
            </motion.button>
          ) : (
            <motion.button
              className={cn(
                'inline-flex items-center justify-center rounded-lg border transition-all duration-200',
                sizeClasses[size],
                className,
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {typeof safeTheme === 'string' && themeIcons[safeTheme as ThemeType]
                ? createElement(themeIcons[safeTheme as ThemeType], { size: iconSizes[size] })
                : createElement(Sun, { size: iconSizes[size] })}
            </motion.button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='z-50 min-w-[100px] space-y-1'>
          {themes.map((themeOption) => {
            const safeOption = themeOption ?? 'light';
            const Icon = themeIcons[safeOption as ThemeType] ?? Sun;
            const isSelected = theme === safeOption;
            const optionLabel = safeOption.charAt(0).toUpperCase() + safeOption.slice(1);
            return (
              <DropdownMenuItem
                key={safeOption}
                onClick={() => setTheme(safeOption)}
                className={cn('flex items-center justify-between gap-2 px-3 py-2', isSelected && 'bg-muted')}
              >
                <div className='flex items-center gap-2'>
                  <Icon size={iconSizes[size]} />
                  <span className='font-medium'>{optionLabel}</span>
                </div>
                {isSelected && <Check size={iconSizes[size]} />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const ThemeToggleRadial = (props: ThemeToggleWithThemesProps) => {
  const { theme, setTheme, themes, size = 'md', className } = props;
  const [isOpen, setIsOpen] = useState(false);
  const iconSizes = { sm: 14, md: 16, lg: 20 };
  const radius = size === 'sm' ? 60 : size === 'md' ? 80 : 100;
  const centerSize = size === 'sm' ? 40 : size === 'md' ? 48 : 56;
  const safeTheme =
    typeof theme === 'string' && themes?.includes(theme) ? theme : themes && themes.length > 0 ? themes[0] : 'light';
  return (
    <div className={cn('relative', className)}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-center rounded-full border-2 transition-all',
          `h-${centerSize / 4} w-${centerSize / 4}`,
        )}
        style={{ width: centerSize, height: centerSize }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          {typeof safeTheme === 'string' && themeIcons[safeTheme as ThemeType]
            ? createElement(themeIcons[safeTheme as ThemeType], { size: iconSizes[size] })
            : createElement(Sun, { size: iconSizes[size] })}
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <>
            {themes.map((themeOption, index) => {
              const safeOption: ThemeType = (
                typeof themeOption === 'string' && themeOption !== undefined ? themeOption : 'light'
              ) as ThemeType;
              const Icon = themeIcons[safeOption] ?? Sun;
              const angle = 210 + index * (themes.length > 1 ? 120 / (themes.length - 1) : 0);
              const x = Math.cos(angle * (Math.PI / 180)) * radius;
              const y = -Math.sin(angle * (Math.PI / 180)) * radius;
              const isSelected = theme === safeOption;
              return (
                <motion.button
                  key={safeOption}
                  onClick={() => {
                    setTheme(safeOption);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'absolute flex items-center justify-center rounded-full border-2 shadow-lg',
                    size === 'sm' ? 'h-8 w-8' : size === 'md' ? 'h-10 w-10' : 'h-12 w-12',
                    isSelected ? 'scale-125 bg-card' : 'bg-card ',
                  )}
                  style={{
                    left: `calc(50% + ${x}px - ${size === 'sm' ? 16 : size === 'md' ? 20 : 24}px)`,
                    top: `calc(50% + ${y}px - ${size === 'sm' ? 16 : size === 'md' ? 20 : 24}px)`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {Icon ? (
                    <Icon size={size === 'sm' ? 12 : size === 'md' ? 16 : 18} />
                  ) : (
                    <Sun size={size === 'sm' ? 12 : size === 'md' ? 16 : 18} />
                  )}
                </motion.button>
              );
            })}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ThemeToggleSwitch = (props: ThemeToggleBaseProps) => {
  const { theme, setTheme, size = 'md', className } = props;
  const isLight = theme === 'light';
  return (
    <motion.button
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className={cn(
        'relative inline-flex items-center rounded-full border-2 transition-all duration-300 bg-muted',
        size === 'sm' ? 'h-6 w-11.5' : size === 'md' ? 'h-7 w-13' : 'h-8 w-15',
        className,
      )}
    >
      <motion.div
        className={cn(
          'inline-flex items-center justify-center rounded-full shadow-lg bg-black dark:bg-white',
          size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6',
        )}
        animate={{
          x: isLight ? 2 : size === 'sm' ? 24 : size === 'md' ? 26 : 30,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isLight ? (
            <Sun size={size === 'sm' ? 10 : size === 'md' ? 12 : 14} className='text-yellow-500' />
          ) : (
            <Moon size={size === 'sm' ? 10 : size === 'md' ? 12 : 14} className='text-slate-700' />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export const ThemeToggleTabs = (props: ThemeToggleWithThemesProps) => {
  const { theme, setTheme, themes, showLabel = false, size = 'md', className } = props;
  return (
    <Tabs value={theme} onValueChange={setTheme} className={cn(className)}>
      <TabsList className={cn('inline-flex items-center rounded-lg border p-1 bg-muted')}>
        {themes.map((themeOption) => {
          const safeOption: ThemeType = (
            typeof themeOption === 'string' && themeOption !== undefined ? themeOption : 'light'
          ) as ThemeType;
          const Icon = themeIcons[safeOption] ?? Sun;
          const isSelected = theme === safeOption;
          const optionLabel = safeOption.charAt(0).toUpperCase() + safeOption.slice(1);
          return (
            <TabsTrigger
              key={safeOption}
              value={safeOption}
              className={cn(
                'relative inline-flex items-center justify-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-all',
                size === 'sm' ? 'h-6 px-2' : size === 'md' ? 'h-7 px-3' : 'h-8 px-4',
                isSelected && 'text-foreground',
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId='segmented-bg'
                  className='absolute inset-0 rounded-md bg-card shadow-sm'
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <div className='relative z-10 flex items-center gap-1'>
                {Icon ? (
                  <Icon size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />
                ) : (
                  <Sun size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />
                )}
                {showLabel && <span>{optionLabel}</span>}
              </div>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export interface ThemeToggleProps {
  variant?: 'button' | 'switch' | 'dropdown' | 'tabs' | 'radial';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  themes?: ThemeType[];
  className?: string;
}

export const ThemeToggle = ({
  variant = 'button',
  size = 'md',
  showLabel = false,
  themes = ['light', 'dark', 'system'],
  className,
}: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const commonProps = {
    theme: theme as ThemeType,
    setTheme: setTheme as (theme: string) => void,
    themes,
    showLabel,
    size,
    className,
  };

  switch (variant) {
    case 'button':
      return <ThemeToggleButton {...commonProps} />;
    case 'switch':
      return <ThemeToggleSwitch {...commonProps} />;
    case 'dropdown':
      return <ThemeToggleDropdown {...commonProps} />;
    case 'tabs':
      return <ThemeToggleTabs {...commonProps} />;
    case 'radial':
      return <ThemeToggleRadial {...commonProps} />;
    default:
      return <ThemeToggleButton {...commonProps} />;
  }
};
