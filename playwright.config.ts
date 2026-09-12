import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  testMatch: '**/*.spec.ts',
  timeout: 45_000,
  expect: { timeout: 10_000 },
  workers: 2,
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.QA_BASE_URL || 'http://localhost:3000',
    channel: process.env.QA_BROWSER_CHANNEL || 'chrome',
    viewport: { width: 390, height: 844 },
    locale: 'fa-IR',
    timezoneId: 'Asia/Tehran',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
