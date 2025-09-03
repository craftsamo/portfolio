'use client';

import { useEffect, useState } from 'react';
import { OrbitingSkill } from './OrbitingSkill';
import { GlowingOrbitPath } from './GlowingOrbitPath';
import { skillsConfig } from './skillsConfig';

interface ResponsiveDiameter {
  base?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}
type OrbitingSkillsProps = {
  diameter?: number | ResponsiveDiameter;
};

function getResponsiveDiameter(diameter: number | ResponsiveDiameter, width: number): number {
  if (typeof diameter === 'number') return diameter;
  if (!diameter) return 450;
  if (width >= 1280 && diameter.xl) return diameter.xl;
  if (width >= 1024 && diameter.lg) return diameter.lg;
  if (width >= 768 && diameter.md) return diameter.md;
  if (width >= 640 && diameter.sm) return diameter.sm;
  return diameter.base ?? 450;
}

export const OrbitingSkills = ({
  diameter = {
    base: 230,
    sm: 230,
    md: 250,
    lg: 400,
    xl: 480,
  },
}: OrbitingSkillsProps) => {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const resolvedDiameter = getResponsiveDiameter(diameter, windowWidth);

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
    { radius: resolvedDiameter / 4.5, glowColor: 'cyan', delay: 0 },
    { radius: resolvedDiameter / 2.5, glowColor: 'purple', delay: 1.5 },
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
      orbitRadius: isOuter ? resolvedDiameter / 2.5 : resolvedDiameter / 4.5,
      size: isOuter ? resolvedDiameter / 7 : resolvedDiameter / 9,
    };
  });

  // Central icon size calculation
  const iconSize = Math.max(resolvedDiameter / 6, 40);
  const svgSize = iconSize * 0.6;

  return (
    <div
      className='relative flex items-center justify-center'
      style={{ width: resolvedDiameter, height: resolvedDiameter }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Central "Code" Icon with enhanced glow */}
      <div
        className='bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center z-10 relative shadow-2xl'
        style={{ width: iconSize, height: iconSize }}
      >
        <div className='absolute inset-0 rounded-full bg-cyan-500/30 blur-xl animate-pulse' />
        <div className='absolute inset-0 rounded-full bg-purple-500/20 blur-2xl animate-pulse' style={{ animationDelay: '1s' }} />
        <div className='relative z-10'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={svgSize}
            height={svgSize}
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
