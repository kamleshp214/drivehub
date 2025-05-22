# 🚀 DriveHub Deployment Guide

## One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/drivehub)

## 📋 Pre-Deployment Checklist

- [ ] Google Cloud Project created
- [ ] Google Drive API enabled
- [ ] API Key generated with domain restrictions
- [ ] OAuth 2.0 Client ID created
- [ ] Environment variables ready

## 🔧 Vercel Deployment Steps

### 1. Import Project
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your DriveHub repository from GitHub

### 2. Configure Build Settings
Vercel will auto-detect these settings:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Set Environment Variables
Add these in Vercel Project Settings → Environment Variables:

```
VITE_GOOGLE_API_KEY=your_api_key_here
VITE_GOOGLE_CLIENT_ID=your_client_id_here
```

### 4. Deploy
Click "Deploy" - your DriveHub will be live in ~2 minutes!

## 🌐 Domain Configuration

### Custom Domain (Optional)
1. In Vercel Dashboard → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update Google Cloud Console OAuth origins

### Domain Security
Update your Google Cloud Console:
- **API Key restrictions**: Add your Vercel domain
- **OAuth authorized origins**: Add `https://yourdomain.vercel.app`
- **OAuth redirect URIs**: Add `https://yourdomain.vercel.app`

## 📊 Performance Optimizations

DriveHub is already optimized with:
- ✅ Code splitting and lazy loading
- ✅ Optimized bundle size
- ✅ CDN delivery via Vercel Edge Network
- ✅ Automatic image optimization
- ✅ Gzip compression
- ✅ HTTP/2 support

## 🔍 Monitoring & Analytics

### Vercel Analytics (Built-in)
- Real User Monitoring
- Core Web Vitals tracking
- Geographic performance data

### Google Analytics (Optional)
Add to your environment variables:
```
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

## 🛠️ Troubleshooting

### Common Deployment Issues

**Build fails with "process is not defined"**
- ✅ Already fixed in production build

**Environment variables not working**
- Ensure variables start with `VITE_`
- Redeploy after adding variables

**Google API errors**
- Verify domain is added to API restrictions
- Check OAuth consent screen configuration

### Performance Issues

**Slow initial load**
- Enable Vercel Speed Insights
- Check Core Web Vitals in DevTools

**API rate limits**
- Google Drive API has generous limits
- Monitor usage in Google Cloud Console

## 🔄 Continuous Deployment

### Automatic Deployments
- **Production**: Deploys from `main` branch
- **Preview**: Deploys from feature branches
- **Development**: Use `npm run dev` locally

### Git Workflow
```bash
# Feature development
git checkout -b feature/new-feature
git commit -m "Add new feature"
git push origin feature/new-feature

# Create PR → Auto-preview deployment
# Merge to main → Auto-production deployment
```

## 📈 Scaling Considerations

### Traffic Growth
Vercel automatically scales:
- ✅ Global CDN distribution
- ✅ Automatic scaling to demand
- ✅ 99.99% uptime SLA

### API Limits
Google Drive API quotas:
- **Queries per day**: 1,000,000,000
- **Queries per 100 seconds**: 1,000
- **Queries per user per 100 seconds**: 100

## 🔐 Security Best Practices

### API Key Security
- ✅ Domain restrictions enabled
- ✅ Environment variables (not in code)
- ✅ Separate keys for dev/prod

### OAuth Security
- ✅ Authorized origins configured
- ✅ HTTPS only
- ✅ Minimal required scopes

## 🆘 Support & Maintenance

### Monitoring Checklist
- [ ] Vercel deployment status
- [ ] Google Cloud Console quotas
- [ ] Error tracking
- [ ] Performance metrics

### Regular Updates
- Update dependencies monthly
- Monitor security advisories
- Review Google API changes

---

Your DriveHub is now production-ready! 🎉