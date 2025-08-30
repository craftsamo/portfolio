'use client';

import { useEffect, useState } from 'react';
import { OrbitingSkill } from './OrbitingSkill';
import { GlowingOrbitPath } from './GlowingOrbitPath';
import { skillsConfig } from './skillsConfig';

interface OrbitingSkillsProps {
  diameter?: number; // px
}

export const OrbitingSkills = ({ diameter = 450 }: OrbitingSkillsProps) => {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime((prevTime) => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: 'cyan' | 'purple'; delay: number }> = [
    { radius: diameter / 4.5, glowColor: 'cyan', delay: 0 },
    { radius: diameter / 2.5, glowColor: 'purple', delay: 1.5 },
  ];

  const inner = skillsConfig.filter((s) => s.orbitRadius <= 100);
  const outer = skillsConfig.filter((s) => s.orbitRadius > 100);

  const distributePhaseShift = (skills: typeof skillsConfig) => {
    const n = skills.length;
    return skills.map((c, i) => ({
      ...c,
      phaseShift: (2 * Math.PI * i) / n,
    }));
  };
  const distributedSkills = [...distributePhaseShift(inner), ...distributePhaseShift(outer)];

  const scaledSkillsConfig = distributedSkills.map((config) => {
    const isOuter = config.orbitRadius > 100;
    return {
      ...config,
      orbitRadius: isOuter ? diameter / 2.5 : diameter / 4.5,
      size: isOuter ? diameter / 7 : diameter / 9,
    };
  });

  return (
    <div
      className='relative flex items-center justify-center'
      style={{ width: diameter, height: diameter }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Central "Code" Icon with enhanced glow */}
      <div className='w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center z-10 relative shadow-2xl'>
        <div className='absolute inset-0 rounded-full bg-cyan-500/30 blur-xl animate-pulse' />
        <div className='absolute inset-0 rounded-full bg-purple-500/20 blur-2xl animate-pulse' style={{ animationDelay: '1s' }} />
        <div className='relative z-10'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='36'
            height='36'
            viewBox='0 0 24 24'
            fill='none'
            stroke='url(#gradient)'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <defs>
              <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='0%' stopColor='#06B6D4' />
                <stop offset='100%' stopColor='#9333EA' />
              </linearGradient>
            </defs>
            <polyline points='16 18 22 12 16 6' />
            <polyline points='8 6 2 12 8 18' />
          </svg>
        </div>
      </div>

      {/* Render glowing orbit paths */}
      {orbitConfigs.map((config) => (
        <GlowingOrbitPath
          key={`path-${config.radius}`}
          radius={config.radius}
          glowColor={config.glowColor}
          animationDelay={config.delay}
        />
      ))}

      {/* Render orbiting skill icons */}
      {scaledSkillsConfig.map((config) => {
        const angle = time * config.speed + (config.phaseShift || 0);
        return <OrbitingSkill key={config.id} config={config} angle={angle} />;
      })}
    </div>
  );
};
