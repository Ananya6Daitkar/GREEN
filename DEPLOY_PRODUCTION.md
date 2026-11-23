# Production Deployment Guide

## 🚀 Deploy MATERRA to Production

This guide shows how to deploy MATERRA to production using Vercel (frontend) and Render (backend).

---

## **Frontend Deployment (Vercel)**

### Option 1: Automatic Deployment from GitHub (Recommended)

**Prerequisites:**
- GitHub account with https://github.com/Ananya6Daitkar/GREEN pushed
- Vercel account (free at vercel.com)

**Steps:**

1. Go to https://vercel.com
2. Click "New Project"
3. Import GitHub repository: `Ananya6Daitkar/GREEN`
4. Configure:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `frontend`
5. Environment Variables:
   - `VITE_API_URL` = `https://materra-backend.onrender.com` (after backend deployed)
6. Deploy!

**Result:** 
- Frontend automatically deploys on every GitHub push
- Vercel provides URL: `https://materra-studio.vercel.app` (or custom domain)

### Option 2: Manual Deployment

```bash
npm install -g vercel

cd frontend
vercel --prod

# Follow prompts, use default settings
```

---

## **Backend Deployment (Render)**

### Option 1: Automatic Deployment from GitHub (Recommended)

**Prerequisites:**
- GitHub account with repository pushed
- Render account (free at render.com)

**Steps:**

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub account and select: `Ananya6Daitkar/GREEN`
4. Configure:
   - Name: `materra-backend`
   - Environment: **Python 3**
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Root Directory: `.` (leave default)
5. Click "Create Web Service"

**Result:**
- Backend automatically deploys on every GitHub push
- Render provides URL: `https://materra-backend.onrender.com`
- Free tier has limitations; upgrade if needed for production

### Option 2: Alternative - Deploy to Railway

```bash
npm install -g @railway/cli

railway login
railway init
# Select: Python 3
# Configure same build/start commands as above
railway deploy --prod
```

---

## **Environment Variables**

### Frontend (.env.production)
```
VITE_API_URL=https://materra-backend.onrender.com
```

### Backend (.env.production)
```
DEBUG=false
ENVIRONMENT=production
```

---

## **Post-Deployment Verification**

### Test Frontend
```bash
curl https://materra-studio.vercel.app
```

### Test Backend
```bash
curl https://materra-backend.onrender.com/health
```

### Test API Integration
```bash
curl -X POST https://materra-backend.onrender.com/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "materials": [{"id": "m1", "width": 1200, "height": 600, "thickness": 18, "quantity": 1, "condition": "good", "damageRegions": []}],
    "components": [{"id": "c1", "name": "Base", "quantity": 1, "width": 400, "height": 300, "thickness": 18}],
    "constraints": {"kerf": 3, "edgeMargin": 10, "allowRotation": true}
  }'
```

---

## **Custom Domain Setup**

### Frontend (Vercel)
1. Go to Vercel Project Settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Backend (Render)
1. Go to Render Service Settings
2. Click "Custom Domain"
3. Add your custom domain
4. Update DNS records as instructed

---

## **Monitoring & Maintenance**

### View Logs
- **Vercel:** Dashboard → Deployment → Logs
- **Render:** Dashboard → Service → Logs

### Monitor Performance
- **Vercel Analytics:** Dashboard → Analytics
- **Render Metrics:** Dashboard → Metrics

### Auto-Scaling
- **Vercel:** Automatic (unlimited scale)
- **Render:** Configure in service settings

---

## **Cost Estimation**

### Vercel (Frontend)
- Free tier: Unlimited deployments, generous limits
- Pro: $20/month for teams and advanced features

### Render (Backend)
- Free tier: Limited (may sleep after inactivity)
- Hobby: $7/month (always running)
- Standard: $12+/month

**Total estimated production cost: $7-20/month**

---

## **Troubleshooting**

### Frontend not connecting to backend
- Check `VITE_API_URL` environment variable
- Ensure backend is running and healthy
- Check CORS configuration in backend

### Backend deployment fails
- Verify `Procfile` exists in root
- Check `runtime.txt` specifies Python 3.11
- Ensure all dependencies in `requirements.txt`

### Optimization API times out
- Check backend logs for errors
- Verify algorithm is not stuck on large inputs
- Increase Render plan if needed

---

## **Deployment Checklist**

- ✅ Code pushed to GitHub
- ✅ Environment variables configured
- ✅ Build commands verified
- ✅ Database/storage configured (if needed)
- ✅ Logs accessible
- ✅ Health checks passing
- ✅ API endpoints responding
- ✅ Frontend connecting to backend
- ✅ Domain configured (optional)
- ✅ Monitoring enabled

---

## **Next Steps**

1. Deploy frontend to Vercel
2. Deploy backend to Render
3. Update frontend environment variables with backend URL
4. Test all features
5. Share public URLs with judges

---

**Deployment Status:**
- Frontend: Ready for Vercel
- Backend: Ready for Render  
- Estimated deployment time: 5-10 minutes total

---

For questions, see README.md or QUICKSTART.md
