import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src/specs',
    timeout: 60000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'https://www.centraldepasajes.com.ar',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        viewport: { width: 1920, height: 1080 },
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
