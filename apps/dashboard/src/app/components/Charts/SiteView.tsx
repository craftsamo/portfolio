'use client';

import { useMemo } from 'react';
import { ChartCard, BarChart, type BarChartProps } from '@/components/Charts';

const config = {
  desktop: {
    label: 'Desktop',
    color: '#4287f5',
  },
  mobile: {
    label: 'Mobile',
    color: '#f59e42',
  },
} satisfies BarChartProps['config'];

export const SiteViewChart = () => {
  const data = useMemo(() => {
    const days = Array.from({ length: 31 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    });
    return days.map((day) => ({
      day,
      desktop: Math.floor(Math.random() * 1000) + 300, // 300～1299
      mobile: Math.floor(Math.random() * 1200) + 500, // 500～1699
    }));
  }, []);
  return (
    <ChartCard title='Site View' description='Site view transition by device'>
      <BarChart
        className='h-[250px]'
        config={config}
        stackId='device'
        data={data}
        dataKey='day'
        tickFormatter={(value) => value.slice(5)}
      />
    </ChartCard>
  );
};
