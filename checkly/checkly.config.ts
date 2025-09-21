// checkly/checkly.config.ts
import { defineConfig } from '@checkly/cli';

export default defineConfig({
  projectName: 'QA Assessment - Coffee Shop',
  logicalId: 'qa-assessment-coffee-shop',
  repoUrl: 'https://github.com/your-org/qa-assessment-project',
  checks: {
    browserChecks: {
      frequency: 10, // every 10 minutes
      locations: ['us-east-1', 'eu-west-1', 'ap-southeast-1'],
      tags: ['production', 'e2e', 'smoke'],
      retryPolicy: {
        retryCount: 2,
        retryInterval: 30,
      },
    },
    apiChecks: {
      frequency: 5, // every 5 minutes
      locations: ['us-east-1', 'eu-west-1'],
      tags: ['production', 'api', 'health'],
      retryPolicy: {
        retryCount: 3,
        retryInterval: 15,
      },
    },
  },
  cli: {
    runLocation: 'us-east-1',
    privateRunLocation: {
      type: 'private-location',
      slugName: 'your-private-location',
    },
  },
});
