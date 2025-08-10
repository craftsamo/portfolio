'use client';

import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { DropdownMenuItem } from '@workspace/ui/components/dropdown-menu';

const toastDetails = {
  loading: {
    title: 'Logging out...',
    description: 'Please wait while we log you out.',
  },
  success: {
    title: 'Success',
    description: 'You have been logged out.',
  },
  error: {
    title: 'Error',
    description: 'Failed to log out. Please try again later.',
  },
} as const;

export const LogoutItem = () => {
  const handleClick = async () => {
    const logoutPromise = () => {
      return new Promise<{ status: number }>((resolve, reject) => {
        setTimeout(() => {
          const isSuccess = Math.random() > 0.5;
          if (isSuccess) {
            resolve({ status: 200 });
          } else {
            reject({ status: 500 });
          }
        }, 800);
      });
    };

    const loadingToastDetails = toastDetails.loading;
    toast.promise(logoutPromise, {
      loading: loadingToastDetails.description,
      success: (success) => {
        const status = success ? 'success' : 'error';
        return toastDetails[status].description;
      },
      error: () => toastDetails.error.description,
    });
  };

  return (
    <DropdownMenuItem onClick={handleClick}>
      <LogOut />
      Logout
    </DropdownMenuItem>
  );
};
