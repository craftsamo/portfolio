import type { IconType } from './iconComponents';

export interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: 'cyan' | 'purple';
  label: string;
}

export const skillsConfig: SkillConfig[] = [
  // Inner Orbit
  {
    id: 'html',
    orbitRadius: 100,
    size: 40,
    speed: 1,
    iconType: 'html',
    phaseShift: 0,
    glowColor: 'cyan',
    label: 'HTML5',
  },
  {
    id: 'css',
    orbitRadius: 100,
    size: 45,
    speed: 1,
    iconType: 'css',
    phaseShift: (2 * Math.PI) / 3,
    glowColor: 'cyan',
    label: 'CSS3',
  },
  {
    id: 'javascript',
    orbitRadius: 100,
    size: 40,
    speed: 1,
    iconType: 'javascript',
    phaseShift: (4 * Math.PI) / 3,
    glowColor: 'cyan',
    label: 'JavaScript',
  },
  {
    id: 'python',
    orbitRadius: 100,
    size: 40,
    speed: 1,
    iconType: 'python',
    phaseShift: (6 * Math.PI) / 3,
    glowColor: 'cyan',
    label: 'Python',
  },
  {
    id: 'solidity',
    orbitRadius: 100,
    size: 40,
    speed: 1,
    iconType: 'solidity',
    phaseShift: (8 * Math.PI) / 3,
    glowColor: 'cyan',
    label: 'Solidity',
  },

  // Outer Orbit
  {
    id: 'react',
    orbitRadius: 180,
    size: 50,
    speed: -0.6,
    iconType: 'react',
    phaseShift: 0,
    glowColor: 'purple',
    label: 'React',
  },
  {
    id: 'node',
    orbitRadius: 180,
    size: 45,
    speed: -0.6,
    iconType: 'node',
    phaseShift: (2 * Math.PI) / 3,
    glowColor: 'purple',
    label: 'Node.js',
  },
  {
    id: 'tailwind',
    orbitRadius: 180,
    size: 40,
    speed: -0.6,
    iconType: 'tailwind',
    phaseShift: (4 * Math.PI) / 3,
    glowColor: 'purple',
    label: 'Tailwind CSS',
  },
  {
    id: 'nextjs',
    orbitRadius: 180,
    size: 48,
    speed: -0.6,
    iconType: 'nextjs',
    phaseShift: (6 * Math.PI) / 3,
    glowColor: 'purple',
    label: 'Next.js',
  },
  {
    id: 'nestjs',
    orbitRadius: 180,
    size: 44,
    speed: -0.6,
    iconType: 'nestjs',
    phaseShift: (8 * Math.PI) / 3,
    glowColor: 'purple',
    label: 'Nest.js',
  },
];
