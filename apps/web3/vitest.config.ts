import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const r = (p: string) => resolve(__dirname, p);

export default defineConfig({
  // @ts-expect-error-ignore
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      '@workspace/ui': r('../../packages/ui/src'),
      '@workspace/constants': r('../../packages/constants/src'),
    },
  },
  test: {
    setupFiles: ['src/tests/vitest.setup.js'],
    environment: 'jsdom',
    globals: true,
    include: ['src/tests/**'],
    exclude: ['node_modules', 'src/tests/testUtils.tsx', 'src/tests/vitest.setup.js'],
  },
});
