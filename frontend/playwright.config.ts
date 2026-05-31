import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'npm run dev -- --port 3000',
        port: 3000,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
});
