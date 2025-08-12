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
        <div />
      </Rows>
    </Box>
  );
}
