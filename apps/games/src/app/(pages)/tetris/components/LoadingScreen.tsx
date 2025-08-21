'use client';

import type { CSSProperties } from 'react';

export const LoadingScreen = () => {
  const cellColors = ['#10b981', '#14d4aa', '#22d3ee', '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9'];

  const delays = [0, 100, 200, 100, 200, 200, 300, 300, 400];

  return (
    <div>
      <style jsx>{`
        @keyframes ripple {
          0% {
            background-color: transparent;
          }
          30% {
            background-color: var(--cell-color);
          }
          60% {
            background-color: transparent;
          }
          100% {
            background-color: transparent;
          }
        }
        .cell-animate {
          animation: 1.5s ripple ease infinite;
        }
      `}</style>
      <div className='flex flex-wrap w-[162px] h-[162px]'>
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index}
            className='flex-none bg-transparent box-border rounded cell-animate w-[52px] h-[52px] m-[1px]'
            style={
              {
                '--cell-color': cellColors[index],
                animationDelay: `${delays[index]}ms`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
};
