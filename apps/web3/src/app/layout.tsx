import type { Metadata } from 'next';
import getConfig from 'next/config';
import { headers } from 'next/headers';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookieToInitialState } from 'wagmi';
import type { LayoutProps } from '@workspace/types/web';
import { Toaster } from '@workspace/ui/components/sonner';
import '@workspace/ui/globals.css';
import { ReduxToolProvider, ThemeProvider, WagmiProvider } from '@/components/Providers';
import { NavBar } from './components/NavBar';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'portfolio page',
};

/**
 * The root layout component for the application.
 * @param {LayoutProps} props - The layout properties.
 */
export default async function RootLayout(props: LayoutProps) {
  const headerStore = await headers();
  const cookie = headerStore.get('cookie');
  const initialState = cookieToInitialState(getConfig(), cookie);
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <ReduxToolProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <WagmiProvider initialState={initialState}>
              <NavBar className='fixed' />
              {props.children}
            </WagmiProvider>
            <Toaster />
          </ThemeProvider>
        </ReduxToolProvider>
      </body>
    </html>
  );
}
