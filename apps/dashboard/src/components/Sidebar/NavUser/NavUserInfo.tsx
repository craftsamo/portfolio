'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';

export interface NavUserInfoProps {
  className?: string;
  username: string;
  avatar?: string;
  email?: string;
}

/**
 * NavUserInfo component displays the user's avatar, username, and optionally email in the navigation sidebar.
 *
 * @param {NavUserInfoProps} props - Props containing className, username, avatar URL, and optional email.
 */
export const NavUserInfo = ({ className, username, avatar, email }: NavUserInfoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Avatar className='h-8 w-8 rounded-lg'>
        <AvatarImage src={avatar} alt={username} />
        <AvatarFallback className='rounded-lg'>{username[0] + username[1]}</AvatarFallback>
      </Avatar>
      <div className='grid flex-1 text-left text-sm leading-tight'>
        <span className='truncate font-semibold'>{username}</span>
        <span className='truncate text-xs'>{email || ''}</span>
      </div>
    </div>
  );
};
