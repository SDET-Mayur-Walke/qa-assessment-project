# Checkly Alerting Configuration

This document defines the alerting thresholds and notification strategies for the Coffee Shop monitoring setup.

## Alert Severity Levels

### 🔴 Critical (Immediate Response Required)
- **Response Time**: < 5 minutes
- **Escalation**: Immediate notification to on-call engineer
- **Channels**: Phone call, SMS, Slack #alerts, PagerDuty

### 🟡 Warning (Response Within 1 Hour)
- **Response Time**: < 1 hour
- **Escalation**: Notification to development team
- **Channels**: Slack #monitoring, Email

### 🟢 Informational (Daily Summary)
- **Response Time**: Next business day
- **Escalation**: Included in daily reports
- **Channels**: Slack #dev-team, Email digest

## Browser Check Alerts

### Critical Alerts

| Check | Condition | Threshold | Action |
|-------|-----------|-----------|---------|
| Smoke Path | Complete failure | Any test failure | Immediate alert |
| Homepage Load | Page not loading | HTTP status ≠ 200 | Immediate alert |
| Cart Functionality | Add to cart fails | Success rate < 95% | Immediate alert |
| Checkout Process | Order completion fails | Success rate < 90% | Immediate alert |
| Search Functionality | Search not working | Success rate < 80% | Warning alert |

### Performance Thresholds

| Metric | Warning | Critical | Action |
|--------|---------|----------|---------|
| Page Load Time | > 3 seconds | > 5 seconds | Performance alert |
| First Contentful Paint | > 2 seconds | > 4 seconds | Performance alert |
| Time to Interactive | > 5 seconds | > 8 seconds | Performance alert |
| Largest Contentful Paint | > 4 seconds | > 6 seconds | Performance alert |

### Geographic Performance

| Location | Expected Response Time | Warning Threshold | Critical Threshold |
|----------|----------------------|-------------------|-------------------|
| US East | < 2 seconds | > 3 seconds | > 5 seconds |
| EU West | < 2.5 seconds | > 4 seconds | > 6 seconds |
| AP Southeast | < 3 seconds | > 4.5 seconds | > 7 seconds |

## API Check Alerts

### Critical Alerts

| Endpoint | Condition | Threshold | Action |
|----------|-----------|-----------|---------|
| `/healthz` | Health check fails | HTTP status ≠ 200 | Immediate alert |
| GraphQL Health | Query fails | Success rate < 99% | Immediate alert |
| Products API | List fails | Success rate < 95% | Warning alert |
| Authentication | Login fails | Success rate < 90% | Warning alert |
| Cart Operations | Add/Update fails | Success rate < 85% | Warning alert |

### Performance Thresholds

| API Endpoint | Warning | Critical | Action |
|--------------|---------|----------|---------|
| Health Check | > 500ms | > 1 second | Performance alert |
| GraphQL Queries | > 1 second | > 2 seconds | Performance alert |
| Product List | > 1.5 seconds | > 3 seconds | Performance alert |
| Cart Operations | > 2 seconds | > 4 seconds | Performance alert |

### Error Rate Thresholds

| Service | Warning | Critical | Action |
|---------|---------|----------|---------|
| Overall API | > 1% | > 5% | Error rate alert |
| GraphQL | > 0.5% | > 2% | Error rate alert |
| Authentication | > 2% | > 10% | Error rate alert |

## Security Check Alerts

### Critical Security Alerts

| Check | Condition | Action |
|-------|-----------|---------|
| GraphQL Introspection | Enabled in production | Immediate security alert |
| Authentication Bypass | Protected endpoint accessible | Immediate security alert |
| CORS Misconfiguration | Missing/invalid headers | Security warning |
| Rate Limiting | Not functioning | Security warning |

### Input Validation

| Check | Condition | Action |
|-------|-----------|---------|
| Malformed Queries | Not handled gracefully | Warning alert |
| Invalid Parameters | Not validated | Warning alert |
| SQL Injection Attempts | Detected | Security alert |
| XSS Attempts | Detected | Security alert |

## Notification Channels

### Slack Integration

#### #alerts Channel (Critical)
- Browser check failures
- API health issues
- Security alerts
- Performance degradation > 50%

#### #monitoring Channel (Warning)
- Performance warnings
- Intermittent issues
- Rate limiting alerts
- Geographic performance issues

#### #dev-team Channel (Informational)
- Daily summaries
- Weekly trends
- Monthly reports
- Capacity planning alerts

### Email Notifications

#### Critical Alerts
- **Recipients**: On-call engineer, Team lead, Engineering manager
- **Frequency**: Immediate
- **Content**: Error details, affected services, immediate action items

#### Warning Alerts
- **Recipients**: Development team, QA team
- **Frequency**: Immediate
- **Content**: Issue description, potential impact, suggested actions

#### Daily Summaries
- **Recipients**: Engineering team, Product team
- **Frequency**: Daily at 9 AM
- **Content**: Performance metrics, error rates, trend analysis

### PagerDuty Integration

#### Critical Issues
- **Service**: Production Application
- **Urgency**: High
- **Escalation**: 15 minutes → 30 minutes → 1 hour
- **Rotation**: Weekly on-call rotation

#### Warning Issues
- **Service**: Production Application
- **Urgency**: Low
- **Escalation**: 2 hours → 4 hours → Next business day
- **Rotation**: Business hours only

## Alert Suppression

### Maintenance Windows
- **Duration**: Up to 4 hours
- **Notification**: 24 hours advance notice
- **Scope**: Specific checks or entire application
- **Documentation**: Required for all suppressions

### Known Issues
- **Duration**: Until resolved
- **Approval**: Engineering manager approval required
- **Documentation**: Issue tracking and resolution timeline
- **Review**: Weekly review of suppressed alerts

### False Positive Handling
- **Identification**: Automated analysis of alert patterns
- **Adjustment**: Threshold tuning within 24 hours
- **Documentation**: Root cause analysis and prevention measures
- **Review**: Monthly false positive review

## Escalation Procedures

### Level 1 (On-Call Engineer)
- **Response Time**: 5 minutes
- **Responsibilities**: Acknowledge alert, initial triage, basic remediation
- **Escalation Trigger**: Unable to resolve within 30 minutes

### Level 2 (Senior Engineer)
- **Response Time**: 15 minutes
- **Responsibilities**: Deep dive investigation, complex remediation
- **Escalation Trigger**: Unable to resolve within 2 hours

### Level 3 (Engineering Manager)
- **Response Time**: 30 minutes
- **Responsibilities**: Resource allocation, stakeholder communication
- **Escalation Trigger**: Business impact or extended outage

### Level 4 (Director of Engineering)
- **Response Time**: 1 hour
- **Responsibilities**: Strategic decisions, external communication
- **Escalation Trigger**: Major business impact or security breach

## Alert Testing

### Monthly Testing
- **Browser Checks**: Manual trigger of each check
- **API Checks**: Validation of all endpoints
- **Alert Delivery**: Test all notification channels
- **Escalation**: Verify escalation procedures

### Quarterly Review
- **Threshold Analysis**: Review and adjust thresholds
- **Coverage Assessment**: Evaluate check coverage
- **Performance Review**: Analyze alert performance
- **Process Improvement**: Update procedures based on learnings

## Metrics and Reporting

### Daily Metrics
- Check success rates
- Average response times
- Error rates by service
- Alert volume and resolution time

### Weekly Reports
- Performance trends
- Alert pattern analysis
- False positive rates
- Team response metrics

### Monthly Reviews
- SLA compliance
- Capacity planning insights
- Process improvement opportunities
- Tool effectiveness assessment

## Integration with Other Tools

### Grafana Dashboards
- Real-time monitoring visualization
- Historical trend analysis
- Custom alert rules
- Team-specific views

### Jira Integration
- Automatic ticket creation for critical alerts
- Status updates from monitoring
- Resolution tracking
- Post-incident analysis

### Runbook Integration
- Automated remediation procedures
- Step-by-step resolution guides
- Context-aware suggestions
- Knowledge base integration
