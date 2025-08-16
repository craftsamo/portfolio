'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';

export interface AppCardProps {
  title: string;
  description?: string;
  className?: string;
  buttonText: string;
  href: string;
  /** Optional image shown on the left side of the card */
  imageSrc?: string;
  /** Alt text for the image (falls back to title when not provided) */
  imageAlt?: string;
}

export const AppCard = ({ title, description, className, buttonText, href, imageSrc, imageAlt }: AppCardProps) => (
  <Card className={cn('pt-0', className)}>
    <CardHeader className='flex flex-col items-center h-full gap-4 space-y-0 border-b py-5'>
      <div className='w-full h-42 rounded-md overflow-hidden bg-muted flex-shrink-0'>
        {imageSrc ? (
          <Image src={imageSrc} alt={imageAlt ?? title} className='object-cover w-full h-full' />
        ) : (
          <div className='object-cover w-full h-full' />
        )}
      </div>
      <div className='flex-1 space-y-3'>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </div>
    </CardHeader>
    <CardContent className='px-4'>
      <Button asChild className='w-full group-hover:bg-primary/90 transition-colors'>
        <Link href={href}>
          <>
            {buttonText}
            <ArrowRightIcon className='ml-2 h-4 w-4' />
          </>
        </Link>
      </Button>
    </CardContent>
  </Card>
);
