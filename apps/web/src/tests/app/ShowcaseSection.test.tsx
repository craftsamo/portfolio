import { render, waitFor } from '../jest.setup';
import '@testing-library/jest-dom';
import { ShowcaseSection } from '../../app/sections/Showcase';

describe('ShowcaseSection', () => {
  it('renders Showcase heading and carousel items', async () => {
    render(<ShowcaseSection />);
    function normalizeText(text: string) {
      return text.replace(/[\s\u3000]+/g, ' ').trim();
    }
    await waitFor(() => {
      const headings = Array.from(document.querySelectorAll('.text-6xl.font-bold'));
      const showcaseHeading = headings.find((h) => h.textContent?.toLowerCase().includes('showcase'));
      expect(showcaseHeading).toBeTruthy();
      expect(showcaseHeading?.textContent?.toLowerCase()).toContain('showcase');
      expect(normalizeText(document.body.textContent?.toLowerCase() || '')).toMatch(/dashboard/);
      expect(normalizeText(document.body.textContent || '')).toContain('Transform raw data into actionable insights');
    });
  });
});
