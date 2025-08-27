import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExampleSection } from './components/ExampleSection';
import { Box } from '@/components/Layout';
import { SectionScrollHandler } from './components/SectionScrollHandler';
import { AnimateSection } from './components/AnimateSection';
const sections = [
  { id: 'hero', component: <HeroSection /> },
  { id: 'about', component: <AboutSection /> },
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
