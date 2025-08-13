'use client';

import { Line, LineChart as LineChartCore, XAxis, CartesianGrid } from 'recharts';
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

export interface LineChartProps extends ChartProps {
  dataKey: string;
  type?: CurveType;
  dot?: boolean;
}

export const LineChart = (props: LineChartProps) => {
  return (
    <ChartContainer config={props.config} className={cn('aspect-auto w-full', props.className)}>
      <LineChartCore data={props.data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={props.dataKey} tickLine={false} tickMargin={10} axisLine={false} tickFormatter={props.tickFormatter} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {Object.entries(props.config).map(([key]) => (
          <Line
            key={key}
            type={props.type || 'monotone'}
            dataKey={key}
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            dot={props.dot ?? false}
          />
        ))}
      </LineChartCore>
    </ChartContainer>
  );
};
