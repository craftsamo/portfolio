import { Box } from '@/components/Layout';
import { SectionScrollHandler } from './components/SectionScrollHandler';
import { AnimateSection } from './components/AnimateSection';
import { AboutSection, HeroSection, ShowcaseSection } from './sections';

const sections = [
  { id: 'hero', component: <HeroSection /> },
  { id: 'about', component: <AboutSection /> },
  { id: 'showcase', component: <ShowcaseSection /> },
];

export default async function Portfolio() {
  return (
    <Box
      className='h-screen overflow-hidden flex flex-col items-stretch justify-stretch'
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <SectionScrollHandler sectionCount={sections.length - 1}>
        {sections.map((section, index) => (
          <AnimateSection key={section.id} index={index}>
            {section.component}
          </AnimateSection>
        ))}
      </SectionScrollHandler>
    </Box>
  );
}
