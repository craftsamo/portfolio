'use client';

import { useMemo } from 'react';
import { ChartCard, BarChart, type BarChartProps } from '@/components/Charts';

const config = {
  twitter: {
    label: 'Twitter',
    color: '#1DA1F2', // Twitter Blue
  },
  line: {
    label: 'Line',
    color: '#21B94E', // LINE Green
  },
  instagram: {
    label: 'Instagram',
    color: '#C13584', // Instagram Magenta
  },
  discord: {
    label: 'Discord',
    color: '#5865F2', // Discord Blurple
  },
} satisfies BarChartProps['config'];

export const MembersChart = () => {
  const data = useMemo(() => {
    const days = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    });
    return days.map((day) => ({
      day,
      twitter: Math.floor(Math.random() * 400) + 50, // 50～449
      line: Math.floor(Math.random() * 200) + 50, // 50～249
      instagram: Math.floor(Math.random() * 100) + 10, // 10～109
      discord: Math.floor(Math.random() * 100) + 10, // 10～109
    }));
  }, []);
  return (
    <ChartCard title='Members' description='Transition in the number of members by social media'>
      <BarChart className='h-[200px]' config={config} data={data} dataKey='day' tickFormatter={(value) => value.slice(5)} />
    </ChartCard>
  );
};
