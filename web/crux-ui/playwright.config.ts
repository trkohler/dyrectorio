// eslint-disable-next-line import/no-extraneous-dependencies
import { devices, PlaywrightTestConfig } from '@playwright/test'
import path from 'path'

const baseURL = process.env.E2E_BASE_URL || 'http://172.17.0.1:8000'

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  globalSetup: path.join(__dirname, 'e2e', 'utils', 'global-setup.ts'),
  globalTeardown: path.join(__dirname, 'e2e', 'utils', 'global-teardown.ts'),
  timeout: 30 * 1000, // 30 sec
  testDir: path.join(__dirname, 'e2e'),
  // If a test fails, retry it additional 2 times
  retries: 2,
  // Artifacts folder where screenshots, videos, and traces are stored.
  outputDir: path.join(__dirname, 'e2e_results/'),
  webServer: {
    command: 'npm run prod',
    url: baseURL,
    timeout: 120 * 1000, // 2 min
    reuseExistingServer: !process.env.CI,
  },
  use: {
    // Use baseURL so to make navigations relative.
    // More information: https://playwright.dev/docs/api/class-testoptions#test-options-base-url
    baseURL,

    // Retry a test if its failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
    // More information: https://playwright.dev/docs/trace-viewer
    trace: 'retry-with-trace',

    // All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context
    // contextOptions: {
    //   ignoreHTTPSErrors: true,
    // },
  },
  projects: [
    {
      name: 'Desktop Chromium',
      use: {
        ...devices['Desktop Chromium'],
      },
    },
    // {
    //   name: 'Desktop Firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    // {
    //   name: 'Desktop Safari',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
    // Test against mobile viewports.
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: devices['iPhone 12'],
    // },
  ],
}

export default config
