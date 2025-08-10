'use client';

import {
  BreadcrumbItem as BreadcrumbItemCore,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@workspace/ui/components/breadcrumb';

export interface BreadcrumbItemProps {
  href: string | null;
  text: string;
  isLast: boolean;
}

export const BreadcrumbItem = ({ href, text, isLast }: BreadcrumbItemProps) => (
  <div className='flex items-center'>
    <BreadcrumbItemCore className='hidden md:block'>
      {href ? <BreadcrumbLink href={href}>{text}</BreadcrumbLink> : <BreadcrumbPage>{text}</BreadcrumbPage>}
    </BreadcrumbItemCore>
    {!isLast && <BreadcrumbSeparator className='ml-3 text-white' />}
  </div>
);
