# Checkly Monitoring Configuration

This directory contains Checkly monitoring definitions for the QA Assessment Coffee Shop application.

## Overview

Checkly provides synthetic monitoring for both browser and API checks to ensure the application is working correctly in production.

## Configuration Files

- `checkly.config.ts` - Main Checkly configuration
- `browser-checks/` - Browser-based E2E monitoring
- `api-checks/` - API endpoint monitoring
- `package.json` - Dependencies and scripts

## Browser Checks

### Smoke Path Check (`smoke-path.spec.ts`)

**Purpose**: Validates the complete user journey from product browsing to order completion.

**What it tests**:
- Homepage loads correctly
- Product browsing and selection
- Add to cart functionality
- Coupon application
- Checkout process
- Search functionality

**Frequency**: Every 10 minutes
**Locations**: US East, EU West, AP Southeast
**Retry Policy**: 2 retries with 30-second intervals

## API Checks

### Health Check (`health.spec.ts`)

**Purpose**: Monitors API health and basic functionality.

**What it tests**:
- `/healthz` endpoint
- GraphQL health query
- Products list retrieval
- Authentication flow
- Cart operations

**Frequency**: Every 5 minutes
**Locations**: US East, EU West
**Retry Policy**: 3 retries with 15-second intervals

### Production Security Check (`production-security.spec.ts`)

**Purpose**: Validates production security configurations.

**What it tests**:
- GraphQL introspection disabled in production
- Authentication required for protected endpoints
- CORS headers configured correctly
- Rate limiting behavior
- Input validation
- Malformed query handling

**Frequency**: Every 15 minutes
**Locations**: US East, EU West
**Retry Policy**: 2 retries with 30-second intervals

## Alerting Thresholds

### Critical Alerts (Immediate Notification)

1. **Browser Check Failures**
   - Any smoke path test failure
   - Homepage not loading
   - Cart functionality broken
   - Checkout process failing

2. **API Health Issues**
   - Health endpoint returning non-200 status
   - GraphQL queries failing consistently
   - Database connectivity issues

3. **Security Issues**
   - GraphQL introspection enabled in production
   - Authentication bypassed
   - Rate limiting not working

### Warning Alerts (15-minute delay)

1. **Performance Degradation**
   - Response times > 3 seconds
   - Page load times > 5 seconds
   - API response times > 2 seconds

2. **Intermittent Issues**
   - Check failures with retry success
   - Partial functionality issues
   - Network timeout issues

### Informational Alerts (Daily summary)

1. **Usage Patterns**
   - High traffic volumes
   - Unusual geographic distribution
   - Peak usage times

2. **Performance Trends**
   - Gradual performance degradation
   - Resource utilization trends
   - Error rate trends

## Environment Variables

### Required for Production

```bash
# Checkly Configuration
CHECKLY_API_KEY=your_checkly_api_key
CHECKLY_ACCOUNT_ID=your_account_id

# Application URLs
PRODUCTION_URL=https://your-app.com
API_URL=https://api.your-app.com

# Test Data
TEST_EMAIL=test@example.com
TEST_COUPON_CODE=WELCOME10

# Environment
NODE_ENV=production
```

### Development/Testing

```bash
# Local development
LOCAL_URL=http://localhost:3000
LOCAL_API_URL=http://localhost:4000

# Staging environment
STAGING_URL=https://staging.your-app.com
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd checkly
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your Checkly credentials
   ```

3. **Test Locally**
   ```bash
   npm run checkly:test
   ```

4. **Deploy to Checkly**
   ```bash
   npm run checkly:deploy
   ```

## Monitoring Dashboard

The Checkly dashboard provides:

- **Real-time Status**: Current status of all checks
- **Performance Metrics**: Response times and success rates
- **Geographic Coverage**: Status across different locations
- **Alert History**: Timeline of issues and resolutions
- **Trend Analysis**: Performance trends over time

## Integration with CI/CD

### GitHub Actions Integration

```yaml
name: Deploy Checkly Checks
on:
  push:
    branches: [main]
    paths: ['checkly/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy Checkly checks
        run: |
          cd checkly
          npm install
          npm run checkly:deploy
        env:
          CHECKLY_API_KEY: ${{ secrets.CHECKLY_API_KEY }}
```

### Slack Integration

Configure Slack notifications in Checkly dashboard:
- Critical alerts → #alerts channel
- Warnings → #monitoring channel
- Daily summaries → #dev-team channel

## Troubleshooting

### Common Issues

1. **Check Failures Due to Test Data**
   - Ensure test products exist
   - Verify test email is configured
   - Check coupon codes are valid

2. **Network Timeouts**
   - Increase timeout values in checkly.config.ts
   - Check geographic locations for network issues
   - Verify application performance

3. **Authentication Issues**
   - Verify API keys are correct
   - Check account permissions
   - Ensure environment variables are set

### Debug Mode

Run checks in debug mode for detailed logging:
```bash
DEBUG=checkly:* npm run checkly:test
```

## Best Practices

1. **Test Coverage**: Ensure all critical user paths are covered
2. **Realistic Data**: Use production-like test data
3. **Geographic Distribution**: Monitor from multiple locations
4. **Alert Tuning**: Set appropriate thresholds to avoid alert fatigue
5. **Regular Review**: Review and update checks based on application changes

## Maintenance

- **Weekly**: Review check results and performance trends
- **Monthly**: Update test data and scenarios
- **Quarterly**: Review alerting thresholds and coverage
- **Per Release**: Update checks for new features
