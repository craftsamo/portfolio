import '@testing-library/jest-dom';
import { vi } from 'vitest';

globalThis.setImmediate = vi.useRealTimers;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

window.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Solana/Bonfida mocks for Vitest
vi.mock('@bonfida/sns-react', () => ({
  useReverseLookup: () => undefined,
}));

vi.mock('@solana/web3.js', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    PublicKey: mod.PublicKey,
    // Mock findProgramAddressSync to avoid address nonce error
    findProgramAddressSync: vi.fn(() => [new Uint8Array(32), 255]),
  };
});

vi.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    push: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
    },
    beforePopState: vi.fn(() => null),
    prefetch: vi.fn(() => null),
  }),
}));
