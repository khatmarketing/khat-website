import { defineConfig } from '@playwright/test';
import base from './playwright.config';
export default defineConfig({ ...base, testMatch: '**/drawer-touch.spec.ts', use: { ...base.use, browserName: 'webkit', channel: undefined } });