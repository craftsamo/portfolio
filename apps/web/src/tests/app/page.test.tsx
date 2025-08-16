import { render, screen, act, waitFor } from '../jest.setup';
import '@testing-library/jest-dom';
import Portfolio from '../../app/page';
import type { ReactElement } from 'react';

describe('Portfolio Page', () => {
  let PortfolioComponent: ReactElement;

  beforeEach(async () => {
    // First, resolve the async component outside of act
    await act(async () => {
      PortfolioComponent = await Portfolio();
    });
  });

  it('renders the Portfolio correctly', async function () {
    // Then render the resolved component
    await act(async () => {
      render(PortfolioComponent);
    });
    
    // Wait for any async rendering to complete with error boundary
    await waitFor(() => {
      // Basic validation that the page rendered without throwing
      expect(document.body).toBeInTheDocument();
    }, { 
      timeout: 5000,
      onTimeout: (error) => {
        console.log('Test timeout - component may have async issues');
        return error;
      }
    });
  });

  it('renders all main sections with correct IDs', async () => {
    await act(async () => {
      render(PortfolioComponent);
    });

    await waitFor(() => {
      // Check if all main sections are rendered with their IDs
      expect(document.querySelector('#hero')).toBeInTheDocument();
      expect(document.querySelector('#about')).toBeInTheDocument();
      expect(document.querySelector('#examples')).toBeInTheDocument();
    });
  });

  it('contains Hero section with welcome content', async () => {
    await act(async () => {
      render(PortfolioComponent);
    });

    await waitFor(() => {
      // Check for Hero section content
      expect(screen.getByText('Welcome')).toBeInTheDocument();
      expect(screen.getByText(/fullstack portfolio template/i)).toBeInTheDocument();
      expect(screen.getByText('Get Started')).toBeInTheDocument();
    });
  });

  it('contains About section with personal information', async () => {
    await act(async () => {
      render(PortfolioComponent);
    });

    await waitFor(() => {
      // Check for About section content
      expect(screen.getByText('About Me')).toBeInTheDocument();
      // Use more flexible text matching for split text
      expect(screen.getByText(/Rui Ito/i)).toBeInTheDocument();
      expect(screen.getByText(/fullstack developer/i)).toBeInTheDocument();
    });
  });

  it('contains Examples section with project cards', async () => {
    await act(async () => {
      render(PortfolioComponent);
    });

    await waitFor(() => {
      // Check for Examples section content
      expect(screen.getByText('Examples')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Games')).toBeInTheDocument();
      expect(screen.getByText('Open Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Play Games')).toBeInTheDocument();
    });
  });

  it('has proper semantic structure', async () => {
    await act(async () => {
      render(PortfolioComponent);
    });

    await waitFor(() => {
      // Check for semantic sections
      const heroSection = document.querySelector('#hero');
      const aboutSection = document.querySelector('#about');
      const examplesSection = document.querySelector('#examples');

      expect(heroSection).toHaveClass('grid-cols-1');
      expect(aboutSection).toHaveClass('sm:pt-12');
      expect(examplesSection).toHaveClass('gap-6');
    });
  });

  it('contains external links with proper attributes', async () => {
    await act(async () => {
      render(PortfolioComponent);
    });

    await waitFor(() => {
      // Check for external links
      const githubLink = screen.getByRole('link', { name: /get started/i });
      const dashboardButton = screen.getByRole('link', { name: /open dashboard/i });
      const gamesButton = screen.getByRole('link', { name: /play games/i });

      expect(githubLink).toHaveAttribute('href', 'https://github.com/itou-rui/turborepo-starter');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

      expect(dashboardButton).toHaveAttribute('href', 'https://portfolio-dashboard.itourui.dev');
      expect(gamesButton).toHaveAttribute('href', 'https://portfolio-games.itourui.dev');
    });
  });

  it('has proper image with accessibility attributes', async () => {
    await act(async () => {
      render(PortfolioComponent);
    });

    await waitFor(() => {
      // Check for profile image with Next.js optimized src
      const profileImage = screen.getByAltText('Rui Ito Avatar');
      expect(profileImage).toBeInTheDocument();
      // Next.js optimizes images, so we check if the src contains the original URL
      expect(profileImage.getAttribute('src')).toContain('avatars.githubusercontent.com');
      expect(profileImage.getAttribute('src')).toContain('191232103');
      expect(profileImage).toHaveAttribute('loading', 'lazy');
    });
  });
});
