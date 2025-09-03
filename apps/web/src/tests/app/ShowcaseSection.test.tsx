import { render, screen, waitFor } from '../jest.setup';
import '@testing-library/jest-dom';
import { ShowcaseSection } from '../../app/sections/Showcase';

describe('ShowcaseSection', () => {
  it('renders Showcase heading and carousel items', async () => {
    render(<ShowcaseSection />);
    function normalizeText(text: string) {
      return text.replace(/[\s\u3000]+/g, ' ').trim();
    }
    await waitFor(() => {
      const showcaseHeading = screen.getByText(/showcase/i);
      expect(showcaseHeading).toBeInTheDocument();
      expect(showcaseHeading.textContent?.toLowerCase()).toContain('showcase');
      expect(normalizeText(document.body.textContent?.toLowerCase() || '')).toMatch(/dashboard/);
      expect(normalizeText(document.body.textContent || '')).toContain('Here are some applications built with this architect.');
    });
  });
});
