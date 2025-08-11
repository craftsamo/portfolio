import { Box, Rows } from '@/components/Layout';

export default async function Dashboard() {
  return (
    <Box>
      <Rows>
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
      </Rows>
      <Rows className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>
        <div />
      </Rows>
    </Box>
  );
}
