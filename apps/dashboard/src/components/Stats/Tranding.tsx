'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import type { StatProps } from './types';

export interface TrandingStatProps extends StatProps {
  footerTitle?: string;
  footerDescription?: string;
}

export const TrandingStat = (props: TrandingStatProps) => (
  <Card>
    <CardHeader>
      <CardTitle>{props.title}</CardTitle>
      <CardDescription>{props.description}</CardDescription>
      <CardAction>
        <Badge variant='outline' className={props.value > 0 ? 'text-green-500' : 'text-red-500'}>
          {props.value > 0 ? <TrendingUp /> : <TrendingDown />}
          {props.value > 0 && '+'}
          {props.value}
          {props.unit && props.unit}
        </Badge>
      </CardAction>
    </CardHeader>
    {props.footerTitle && (
      <CardFooter className='flex-col items-start gap-1.5 text-sm'>
        <div className='line-clamp-1 flex gap-2 font-medium'>
          {props.footerTitle}
          {props.value > 0 ? <TrendingUp className='size-4 text-green-500' /> : <TrendingDown className='size-4 text-red-500' />}
        </div>
        {props.footerDescription && <div className='text-muted-foreground'>{props.footerDescription}</div>}
      </CardFooter>
    )}
  </Card>
);
