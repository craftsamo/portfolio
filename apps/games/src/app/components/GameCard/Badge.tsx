'use client';

import { Badge } from '@workspace/ui/components/badge';

export interface CategoryBadgeProps {
  category: string;
}

export const CategoryBadge = ({ category }: CategoryBadgeProps) => <Badge variant='outline'>{category}</Badge>;

export const CommingSoonBadge = () => (
  <Badge variant='secondary' className='text-lg px-4 py-2'>
    Coming Soon
  </Badge>
);

export interface DifficultyBadgeProps {
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const difficultyColor = {
  Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  return <Badge className={difficultyColor[difficulty]}>{difficulty}</Badge>;
};
