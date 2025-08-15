'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { CategoryBadge, DifficultyBadge, type DifficultyBadgeProps } from './Badge';
import { Players } from './Players';
import { PlayTime } from './PlayTime';
import { PlayButton } from './PlayButton';

export interface GameCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  difficulty: DifficultyBadgeProps['difficulty'];
  players: string;
  playTime: string;
  href: string;
  isComingSoon?: boolean;
}

export const GameCard = (props: GameCardProps) => (
  <Card className='h-full flex flex-col'>
    <CardHeader className='relative pb-4 bg-gradient-to-br from-background to-muted/20'>
      <div className='relative h-44 mb-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center overflow-hidden'>
        <div className='text-5xl opacity-60 transform hover:scale-110 transition-transform duration-300'>{props.image}</div>
      </div>
      <div className='flex flex-wrap gap-2 justify-between items-center'>
        <div className='flex gap-2 flex-wrap'>
          <CategoryBadge category={props.category} />
          <DifficultyBadge difficulty={props.difficulty} />
        </div>
      </div>
    </CardHeader>

    <CardContent className='flex-1 flex flex-col pt-0 px-6'>
      <div className='mb-6'>
        <CardTitle className='line-clamp-1 mb-3 text-xl font-bold'>{props.title}</CardTitle>
        <p className='text-sm text-muted-foreground line-clamp-2 leading-relaxed'>{props.description}</p>
      </div>

      <div className='flex mb-2 py-1 gap-5'>
        <Players players={props.players} />
        <PlayTime playTime={props.playTime} />
      </div>

      <div className='mt-auto'>
        <PlayButton href={props.href} isComingSoon={props.isComingSoon} />
      </div>
    </CardContent>
  </Card>
);
