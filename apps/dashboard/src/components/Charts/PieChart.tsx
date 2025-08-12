'use client';

import { Pie, PieChart as PieChartCore } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@workspace/ui/components/chart';
import { cn } from '@workspace/ui/lib/utils';
import type { ChartProps } from './types';

export interface PieChartProps extends ChartProps {
  dataKey: string;
  nameKey: string;
  cx?: number | string;
  cy?: number | string;
  innerRadius?: number | string;
  outerRadius?: number | string;
  label?: boolean;
}

export const PieChart = (props: PieChartProps) => {
  const { config, data, className, dataKey, nameKey, cx, cy, innerRadius, outerRadius, label } = props;

  return (
    <ChartContainer config={config} className={cn('aspect-auto w-full', className)}>
      <PieChartCore data={props.data}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx={cx || '50%'}
          cy={cy || '50%'}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          label={label}
        />
      </PieChartCore>
    </ChartContainer>
  );
};
