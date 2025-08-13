'use client';

import { Bar, BarChart as BarChartCore, XAxis, CartesianGrid } from 'recharts';
import { cn } from '@workspace/ui/lib/utils';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@workspace/ui/components/chart';
import type { ChartProps } from './types';

export interface BarChartProps extends ChartProps {
  dataKey: string;
  radius?: number;
  stackId?: string;
}

export const BarChart = (props: BarChartProps) => {
  return (
    <ChartContainer config={props.config} className={cn('aspect-auto w-full', props.className)}>
      <BarChartCore data={props.data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={props.dataKey} tickLine={false} tickMargin={10} axisLine={false} tickFormatter={props.tickFormatter} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {Object.entries(props.config).map(([key]) => (
          <Bar stackId={props.stackId} key={key} dataKey={key} fill={`var(--color-${key})`} radius={props.radius || 5} />
        ))}
      </BarChartCore>
    </ChartContainer>
  );
};
