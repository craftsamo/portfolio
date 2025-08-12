import Link from 'next/link';
import { Box, Center } from '@/components/Layout';

export const metadata = {
  title: '404 | Dashboard',
  description: 'Page not found',
};

export default async function NotFound() {
  return (
    <Box>
      <Center>
        <div className='flex flex-col items-center justify-center animate-fade-in'>
          <h1 className='text-7xl font-extrabold mb-2'>404</h1>
          <p className='text-xl font-bold mb-1'>Page not found</p>
          <p className='text-base text-center mb-6 text-muted-foreground'>
            The page you are looking for does not exist or the URL may be incorrect.
          </p>
          <Link href='/' className='rounded-lg px-5 py-2 font-semibold border transition-colors shadow-md'>
            Return to Dashboard
          </Link>
        </div>
      </Center>
    </Box>
  );
}
