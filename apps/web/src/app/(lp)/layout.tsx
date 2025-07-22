import type { Metadata } from 'next';
import type { LayoutProps } from '@workspace/types/web';

export const metadata: Metadata = {
  title: 'Turborepo Starter',
  description: 'Turborepo Starter Next.js App',
};

export default async function LandingPageLayout(props: LayoutProps) {
  return <>{props.children}</>;
}
