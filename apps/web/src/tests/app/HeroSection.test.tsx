import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

// Mock IntersectionObserver for Framer Motion in tests
beforeAll(() => {
  class MockIntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly thresholds = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  global.IntersectionObserver = MockIntersectionObserver;
});

import { HeroSection } from '@/app/sections/Hero';

describe('HeroSection', () => {
  it('renders the Welcome heading', async () => {
    render(<HeroSection />);
    await waitFor(() => {
      // SparklesText animates, so wait for "Welcome" to appear
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
  });

  it('renders the main description paragraph', async () => {
    render(<HeroSection />);
    // Use a substring from the main paragraph for robustness
    const paragraphSnippet = 'Showcase your skills and projects with a stunning, fullstack portfolio template.';
    await waitFor(() => {
      expect(screen.getByText(paragraphSnippet, { exact: false })).toBeInTheDocument();
    });
  });

  it('renders the Getting Start button with correct link', async () => {
    render(<HeroSection />);
    const button = await screen.findByRole('link', { name: /getting start/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', 'https://github.com/itou-rui/portfolio');
    expect(button).toHaveAttribute('target', '_blank');
    expect(button).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});
