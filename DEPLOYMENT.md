# Deployment Guide

## Current Deployments

### Vercel (Primary - Recommended)
- **Status**: ✅ Active
- **URL**: https://igfsite-github-io-git-main-m-is-projects-7d992abc.vercel.app/
- **Custom Domain**: https://igiehonfoundation.org (if configured)
- **Features**: 
  - Full React Router support
  - Instant deployments
  - No caching issues
  - All routes work directly

### GitHub Pages (Backup)
- **Status**: ⚠️ Has routing issues
- **URL**: https://igfsite.github.io
- **Issues**: 
  - React Router conflicts
  - Caching delays
  - Direct route access problems

## Deployment Commands

### For Vercel
```bash
# Build for production
pnpm build:client

# Deploy (if using CLI)
vercel --prod
```

### For GitHub Pages (Backup)
```bash
# Build and deploy
./deploy.sh
git add .
git commit -m "Deploy updates"
git push origin main
```

## Configuration Files

- `vercel.json` - Vercel configuration with SPA routing
- `.vercelignore` - Files to exclude from Vercel deployment
- `deploy.sh` - GitHub Pages deployment script
- `.github/workflows/deploy.yml` - GitHub Actions (may conflict)

## Recommendations

1. **Use Vercel as primary** - Better React Router support
2. **Keep GitHub Pages as backup** - For redundancy
3. **Update all links** to point to Vercel URL
4. **Test all forms** after each deployment