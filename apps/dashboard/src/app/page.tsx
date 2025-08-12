import { Box, Rows } from '@/components/Layout';
import { MembersChart, SiteViewChart } from './components/Charts';

export default async function Dashboard() {
  return (
    <Box>
        <div className='aspect-video rounded-xl bg-muted/50' />
      <Rows className='grid-cols-1 md:grid-cols-1'>
        <MembersChart />
      </Rows>
      <Rows className='grid-cols-1 md:grid-cols-1'>
        <SiteViewChart />
      </Rows>
        <div />
      </Rows>
    </Box>
  );
}
