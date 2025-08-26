import type { ReactElement } from 'react';
import '@testing-library/dom';
import RootPage from '../../app/page';
import { render, screen, act, waitFor } from '../testUtils';

describe('Root Page', () => {
  let RootComponent: ReactElement;

  beforeEach(async () => {
    await act(async () => {
      RootComponent = await RootPage();
    });
  });

  it('renders the Root page without crashing', async () => {
    await act(async () => {
      render(RootComponent);
    });
    await waitFor(() => {
      expect(document.body).toBeInTheDocument();
    });
  });

  it('renders HeroSection with main elements', async () => {
    await act(async () => {
      render(RootComponent);
    });
    await waitFor(() => {
  // There may be multiple elements that contain the same label (heading and button),
  // assert that at least one exists instead of requiring a single unique match.
  const connectNodes = screen.getAllByText('Connect Wallet');
  expect(connectNodes.length).toBeGreaterThan(0);
      expect(screen.getByText('This is a demo app for connecting EthereumWallet and SolanaWallet.')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /get started/i })).toBeInTheDocument();
    });
  });

  it('renders Ethereum Wallet and Solana Wallet cards', async () => {
    await act(async () => {
      render(RootComponent);
    });
    await waitFor(() => {
      expect(screen.getByText('Ethereum Wallet')).toBeInTheDocument();
      expect(screen.getByText('Solana Wallet')).toBeInTheDocument();
    });
  });

  it('Get Started button has correct external link attributes', async () => {
    await act(async () => {
      render(RootComponent);
    });
    await waitFor(() => {
      const githubLink = screen.getByRole('link', { name: /get started/i });
      expect(githubLink).toHaveAttribute('href', 'https://github.com/itou-rui/portfolio');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
