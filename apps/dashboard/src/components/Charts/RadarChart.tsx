'use client';

import { Radar, RadarChart as RadarChartCore, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@workspace/ui/components/chart';
import { cn } from '@workspace/ui/lib/utils';
import type { ChartProps } from './types';

export interface RadarChartProps extends ChartProps {
  dataKey: string;
}

export const RadarChart = (props: RadarChartProps) => {
  return (
    <ChartContainer config={props.config} className={cn('aspect-auto w-full', props.className)}>
      <RadarChartCore data={props.data}>
        <PolarGrid />
        <PolarAngleAxis dataKey={props.dataKey} />
        <PolarRadiusAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {Object.entries(props.config).map(([key]) => (
          <Radar
            key={key}
            name={key}
            dataKey={key}
            stroke={`var(--color-${key})`}
            fill={`var(--color-${key})`}
            fillOpacity={0.6}
          />
        ))}
      </RadarChartCore>
    </ChartContainer>
  );
};
