import { memo } from 'react';
import type { IconType } from './iconComponents';
import { iconComponents } from './iconComponents';

export interface SkillIconProps {
  type: IconType;
}

export const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

