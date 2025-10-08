# Environment Variables Setup

## Required Environment Variables for Production

Add these environment variables to your Vercel deployment:

### Database Configuration
```bash
DATABASE_URL="your_postgresql_database_url_here"
```

### Email Services (Resend - Primary)
```bash
RESEND_API_KEY="your_resend_api_key_here"
FROM_EMAIL="Evergreen Web Solutions <noreply@evergreenwebsolutions.ca>"
```

### Email Services (SendGrid - Fallback)
```bash
SENDGRID_API_KEY="your_sendgrid_api_key_here"
SENDGRID_DOMAIN="evergreenwebsolutions.ca"
```

### XAI API (for AI chat functionality)
```bash
XAI_API_KEY="your_xai_api_key_here"
```

### Upstash Redis (for rate limiting)
```bash
UPSTASH_REDIS_REST_URL="your_upstash_redis_url_here"
UPSTASH_REDIS_REST_TOKEN="your_upstash_redis_token_here"
```

### Lead Management (Optional - for advanced features)
```bash
LEADMINE_API_BASE="https://lead-mine.vercel.app"
LEADMINE_API_KEY="your_leadmine_api_key_here"
```

### Campaign Configuration (Optional)
```bash
CAMPAIGN_FROM_EMAIL="Gabriel Lacroix <gabriel@evergreenwebsolutions.ca>"
CAMPAIGN_LINK_BASE="https://rsvp.evergreenwebsolutions.ca"
CAMPAIGN_CRON_SECRET="your_campaign_cron_secret_here"
CAMPAIGN_EMAIL_BATCH_SIZE="50"
CAMPAIGN_MIN_HOURS_BETWEEN_EMAILS="72"
```

### Privacy Policy
```bash
PRIVACY_POLICY_URL="https://evergreenwebsolutions.ca/api/privacy"
```

### Weaviate Configuration (Optional - for advanced AI features)
```bash
WEAVIATE_URL="your_weaviate_url_here"
WEAVIATE_API_KEY="your_weaviate_api_key_here"
```

## Setup Steps

1. **Go to your Vercel dashboard**
2. **Select your AI Assessment project**
3. **Go to Settings > Environment Variables**
4. **Add each variable above**
5. **Redeploy your application**

## Database Initialization

After setting up environment variables, initialize your database:

1. **Visit:** `https://your-app.vercel.app/api/init-db`
2. **Send a POST request** (you can use curl, Postman, or browser dev tools)
3. **Check the response** - should show "Database initialized successfully"

## Testing Email Functionality

1. **Complete an assessment** on your live site
2. **Click "Get Detailed Report"** 
3. **Check your email** - you should receive a professional implementation plan
4. **Check Vercel logs** for email delivery status

## Lead Management

View all captured leads:
- **API Endpoint:** `https://your-app.vercel.app/api/leads`
- **Get specific lead:** `https://your-app.vercel.app/api/leads?email=user@example.com`

## Email Domain Configuration

Your Resend domain `evergreenwebsolutions.ca` is already configured with:
- ✅ DKIM records
- ✅ SPF records  
- ✅ DMARC policy
- ✅ MX records

All emails will be sent from `noreply@evergreenwebsolutions.ca` with proper authentication.

## Troubleshooting

### If emails aren't sending:
1. Check Vercel logs for errors
2. Verify RESEND_API_KEY is correct
3. Check Resend dashboard for delivery status
4. Ensure FROM_EMAIL uses your verified domain

### If database errors occur:
1. Verify DATABASE_URL is correct
2. Check if database is initialized
3. Visit `/api/init-db` to create tables

### If AI chat isn't working:
1. Verify XAI_API_KEY is correct
2. Check rate limiting settings
3. Verify Upstash Redis configuration
