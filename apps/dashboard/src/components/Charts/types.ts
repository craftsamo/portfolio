import type { ChartConfig } from '@workspace/ui/components/chart';

export interface ChartProps {
  className?: string;
  config: ChartConfig;
  data: { [any: string]: string | number }[];
  tickFormatter?: ((value: any, index: number) => string) | undefined;
}
