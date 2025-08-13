import { Box, Rows } from '@/components/Layout';
import { MembersChart, SiteViewChart, BrowserViewChart } from './components/Charts';
import { TrandingStat } from '@/components/Stats';

export default async function Dashboard() {
  return (
    <Box>
      <Rows className='grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'>
        <TrandingStat
          title='Twitter Followers'
          value={Math.floor(Math.random() * (1000 - -100 + 1)) + -100}
          footerTitle='Official Account'
          footerDescription='Latest follower information'
        />
        <TrandingStat
          title='LINE Friends Count'
          value={Math.floor(Math.random() * (1000 - -100 + 1)) + -100}
          footerTitle='Official Account'
          footerDescription='Latest friend information'
        />
        <TrandingStat
          title='Instagram Followers'
          value={Math.floor(Math.random() * (1000 - -100 + 1)) + -100}
          footerTitle='Profile Information'
          footerDescription='Recent follower status'
        />
        <TrandingStat
          title='Discord Members'
          value={Math.floor(Math.random() * (1000 - -100 + 1)) + -100}
          footerTitle='Server Information'
          footerDescription='Latest member status'
        />
      </Rows>
      <Rows className='grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
        <MembersChart />
        <SiteViewChart />
        <BrowserViewChart />
      </Rows>
      <Rows className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 grid-cols-1 md:min-h-min'>
        <div />
      </Rows>
    </Box>
  );
}
