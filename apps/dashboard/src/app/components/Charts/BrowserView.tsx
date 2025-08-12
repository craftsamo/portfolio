'use client';

import { useMemo } from 'react';
import { ChartCard, PieChart, type PieChartProps } from '@/components/Charts';

const config = {
  visitors: {
    label: 'Visitors',
  },
  chrome: { label: 'Chrome', color: '#4285F4' },
  safari: { label: 'Safari', color: '#FFD166' },
  edge: { label: 'Edge', color: '#00A4EF' },
  firefox: { label: 'Firefox', color: '#FF5722' },
  other: { label: 'Other', color: '#AAAAAA' },
} satisfies PieChartProps['config'];

export const BrowserViewChart = () => {
  const data = useMemo(() => {
    return [
      { browser: 'chrome', visitors: Math.round((Math.random() * 40 + 40) * 100) / 100, fill: 'var(--color-chrome)' },
      { browser: 'safari', visitors: Math.round((Math.random() * 40 + 40) * 100) / 100, fill: 'var(--color-safari)' },
      { browser: 'firefox', visitors: Math.round((Math.random() * 13 + 7) * 100) / 100, fill: 'var(--color-firefox)' },
      { browser: 'edge', visitors: Math.round((Math.random() * 10 + 5) * 100) / 100, fill: 'var(--color-edge)' },
      { browser: 'other', visitors: Math.round((Math.random() * 10 + 1) * 100) / 100, fill: 'var(--color-other)' },
    ];
  }, []);
  return (
    <ChartCard title='Browser Share' description='Estimated browser market share'>
      <PieChart className='h-[250px]' config={config} data={data} dataKey='visitors' nameKey='browser' outerRadius={80} label />
    </ChartCard>
  );
};
