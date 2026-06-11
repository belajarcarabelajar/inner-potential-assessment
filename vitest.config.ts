import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    // Use jsdom so DOM globals (document, localStorage, etc.) are available in unit tests
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],

    // Resolve the '@/' path alias used throughout the source
    alias: {
      '@': path.resolve(__dirname, './src'),
    },

    // Where Vitest looks for test files
    include: [
      'tests/**/*.{test,spec}.{ts,tsx}',
      'src/**/*.{test,spec}.{ts,tsx}',
    ],

    // Exclude build output and third-party code
    exclude: ['node_modules', 'dist', 'worker'],

    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov', 'html'],

      // Instrument only project source – not test helpers or node_modules
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/main.tsx',        // Entry-point bootstrap – untestable in isolation
        'src/**/*.d.ts',
        'src/assets/**',
        'src/index.css',
        'src/App.css',
      ],

      // Minimum coverage thresholds – CI fails if coverage REGRESSES below these.
      // Current measured baselines (2026-06-11):
      //   Statements: 20.91%  Branches: 13.94%  Functions: 20.83%  Lines: 19.49%
      // Escalation schedule: +10 pts per sprint as component tests are added.
      thresholds: {
        lines: 19,
        branches: 13,
        functions: 20,
        statements: 20,
      },
    },
  },
});
