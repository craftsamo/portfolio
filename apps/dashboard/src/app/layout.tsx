import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Geist, Geist_Mono } from 'next/font/google';
import { Suspense } from 'react';
import type { LayoutProps } from '@workspace/types/web';
import { Toaster } from '@workspace/ui/components/sonner';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@workspace/ui/components/sidebar';
import { DropdownMenuSeparator } from '@workspace/ui/components/dropdown-menu';
import { Separator } from '@workspace/ui/components/separator';
import '@workspace/ui/globals.css';
import { ReduxToolProvider, ThemeProvider } from '@/components/Providers';
import {
  Breadcrumb,
  BreadcrumbSkeleton,
  NavItemsSkeleton,
  NavUser,
  NavUserSkeleton,
  SwitcherSkeleton,
} from '@/components/Sidebar';
import { SidebarSwitcher } from './components/Switcher';
import { SidebarComponentNavItems } from './components/NavItems';
import { NavUserBodyMenus, NavUserFooterMenus, NavUserHeaderMenus } from './components/NavUserMenus';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Dashboard | Portfolio',
  description: 'Dashboard app',
};

/**
 * The root layout component for the application.
 * @param {LayoutProps} props - The layout properties.
 */
export default async function RootLayout(props: LayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <ReduxToolProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <SidebarProvider defaultOpen={defaultOpen}>
              <Sidebar collapsible='icon' {...props}>
                {/* Switcher */}
                <SidebarHeader>
                  <Suspense fallback={<SwitcherSkeleton />}>
                    <SidebarSwitcher />
                  </Suspense>
                </SidebarHeader>

                {/* Sidebar Contents */}
                <SidebarContent>
                  <Suspense fallback={<NavItemsSkeleton itemCount={2} />}>
                    <SidebarComponentNavItems />
                  </Suspense>
                </SidebarContent>

                {/* Sidebar Footer */}
                <SidebarFooter>
                  <Suspense fallback={<NavUserSkeleton />}>
                    <NavUser username='User' email='user@example.com'>
                      <NavUserHeaderMenus />
                      <DropdownMenuSeparator />
                      <NavUserBodyMenus />
                      <DropdownMenuSeparator />
                      <NavUserFooterMenus />
                    </NavUser>
                  </Suspense>
                </SidebarFooter>
                <SidebarRail />
              </Sidebar>

              {/* Main Content Heeader */}
              <SidebarInset className='bg-transparent'>
                <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                  <div className='flex items-center gap-2 px-4'>
                    <SidebarTrigger className='-ml-1' />
                    <Separator orientation='vertical' className='mr-2 h-4' />
                    <Suspense fallback={<BreadcrumbSkeleton />}>
                      <Breadcrumb />
                    </Suspense>
                  </div>
                </header>

                {/* Main Content Body */}
                {props.children}
              </SidebarInset>
            </SidebarProvider>
            <Toaster />
          </ThemeProvider>
        </ReduxToolProvider>
      </body>
    </html>
  );
}
