'use client';

import { Area, AreaChart as AreaChartCore, XAxis, CartesianGrid } from 'recharts';
import type { CurveType } from 'recharts/types/shape/Curve';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@workspace/ui/components/chart';
import { cn } from '@workspace/ui/lib/utils';
import type { ChartProps } from './types';

export interface AreaChartProps extends ChartProps {
  dataKey: string;
  radius?: number;
  type?: CurveType;
}

export const AreaChart = (props: AreaChartProps) => {
  return (
    <ChartContainer config={props.config} className={cn('aspect-auto w-full', props.className)}>
      <AreaChartCore data={props.data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={props.dataKey} tickLine={false} tickMargin={10} axisLine={false} tickFormatter={props.tickFormatter} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {Object.entries(props.config).map(([key]) => (
          <Area
            key={key}
            type={props.type || 'monotone'}
            dataKey={key}
            fill={`var(--color-${key})`}
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </AreaChartCore>
    </ChartContainer>
  );
};
