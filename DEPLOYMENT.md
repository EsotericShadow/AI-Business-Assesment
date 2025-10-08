# Deployment Guide

This guide will help you deploy the AI Business Assessment Tool to production.

## 🚀 Quick Deploy to Vercel

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI Business Assessment Tool"
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/ai-assessment-webapp.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Next.js project

3. **Configure Environment Variables**
   In the Vercel dashboard, add these environment variables:
   
   | Variable | Value | Description |
   |----------|-------|-------------|
   | `XAI_API_KEY` | `your_xai_api_key` | Your XAI API key |
   | `UPSTASH_REDIS_REST_URL` | `your_redis_url` | Upstash Redis URL |
   | `UPSTASH_REDIS_REST_TOKEN` | `your_redis_token` | Upstash Redis token |

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at `https://your-project.vercel.app`

## 🔧 Environment Setup

### XAI API Key
1. Go to [console.x.ai](https://console.x.ai)
2. Sign up/Login
3. Create a new API key
4. Copy the key (starts with `xai-`)

### Upstash Redis (for Rate Limiting)
1. Go to [upstash.com](https://upstash.com)
2. Create a free account
3. Create a new Redis database
4. Copy the REST URL and token

## 🌐 Custom Domain (Optional)

1. **In Vercel Dashboard**
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain

2. **Update DNS**
   - Add a CNAME record pointing to `cname.vercel-dns.com`
   - Or add A records as instructed by Vercel

## 📊 Monitoring & Analytics

### Vercel Analytics
- Built-in analytics in Vercel dashboard
- Shows page views, performance metrics
- No additional setup required

### Custom Analytics
- Add Google Analytics or other tracking
- Update `app/layout.tsx` with tracking code

## 🔒 Security Checklist

- ✅ Environment variables are set in Vercel
- ✅ `.env.local` is in `.gitignore`
- ✅ Rate limiting is enabled
- ✅ API keys are secure
- ✅ HTTPS is enabled (automatic with Vercel)

## 🚨 Troubleshooting

### Build Failures
```bash
# Test build locally
npm run build

# Check for TypeScript errors
npm run lint
```

### Environment Variables
- Ensure all required variables are set in Vercel
- Check variable names match exactly
- Redeploy after adding new variables

### API Issues
- Verify XAI API key is valid
- Check Upstash Redis connection
- Monitor rate limits

## 📈 Performance Optimization

### Vercel Optimizations
- Automatic image optimization
- Edge functions for API routes
- Global CDN distribution
- Automatic HTTPS

### App Optimizations
- Static generation where possible
- Efficient API calls
- Optimized bundle size
- Responsive images

## 🔄 Updates & Maintenance

### Deploying Updates
```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```
Vercel will automatically redeploy.

### Monitoring
- Check Vercel dashboard for errors
- Monitor API usage
- Review performance metrics
- Check rate limiting logs

## 📞 Support

If you encounter issues:
1. Check the [Vercel documentation](https://vercel.com/docs)
2. Review the [Next.js deployment guide](https://nextjs.org/docs/deployment)
3. Check the app logs in Vercel dashboard
4. Contact support@evergreenwebsolutions.com

---

**Your AI Business Assessment Tool is now live!** 🎉
