'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumb as BreadcrumbCore, BreadcrumbList } from '@workspace/ui/components/breadcrumb';
import { BreadcrumbItem } from './BreadcrumbItem';

function createBreadcrumbItems(pathSegments: string[]) {
  const SLICE_START_INDEX = 0;
  const SLICE_OFFSET = 1;

  return [
    { text: 'Dashboard', href: pathSegments.length > 1 ? `/` : null },
    ...pathSegments.map((pathSegment, segmentIndex) => {
      const currentPathSegments = pathSegments.slice(SLICE_START_INDEX, segmentIndex + SLICE_OFFSET);
      const isLast = segmentIndex === pathSegments.length - 1;
      const href = isLast ? null : currentPathSegments.map((seg) => `/${seg}`).join('');
      return {
        href,
        text: pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1),
      };
    }),
  ];
}

export const Breadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const items = createBreadcrumbItems(segments);

  return (
    <BreadcrumbCore>
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={index} href={item.href} text={item.text} isLast={index === items.length - 1} />
        ))}
      </BreadcrumbList>
    </BreadcrumbCore>
  );
};
