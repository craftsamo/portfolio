import { Box, Rows } from '@/components/Layout';
import { MembersChart } from './components/Charts';

export default async function Dashboard() {
  return (
    <Box>
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
      <Rows className='grid-cols-1 md:grid-cols-1'>
        <MembersChart />
      </Rows>
      <Rows className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>
        <div />
      </Rows>
    </Box>
  );
}
