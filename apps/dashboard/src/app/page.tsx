import { Box, Rows } from '@/components/Layout';
import { MembersChart, SiteViewChart, BrowserViewChart } from './components/Charts';

export default async function Dashboard() {
  return (
    <Box>
      <Rows className='grid-cols-1 md:grid-cols-1'>
        <MembersChart />
      </Rows>
      <Rows className='grid-cols-1 md:grid-cols-1'>
        <SiteViewChart />
      </Rows>
      <Rows className='grid-cols-1 md:grid-cols-1'>
        <BrowserViewChart />
      </Rows>
      <Rows className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 grid-cols-1 md:min-h-min'>
        <div />
      </Rows>
    </Box>
  );
}
