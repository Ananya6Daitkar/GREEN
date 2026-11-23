# 🚀 Deploy MATERRA to Production NOW

The application is ready. These are the exact steps to get it live.

---

## ✅ Frontend Deployment (Vercel) - 2 Minutes

### Option 1: One-Click Deploy (Easiest)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd frontend
   vercel --prod
   ```
   - Follow prompts
   - Link to GitHub account
   - Choose "frontend" as root directory
   - Build: `npm run build`
   - Output: `dist`

3. **Get Live URL**
   - Vercel will give you a URL like `https://materra-studio.vercel.app`
   - Your app is LIVE

### Option 2: GitHub Integration (Automatic Deploys)

1. **Go to Vercel.com**
2. **Connect GitHub account**
3. **Import repository:** `Ananya6Daitkar/GREEN`
4. **Framework preset:** Vite
5. **Root directory:** `frontend`
6. **Build command:** `npm run build`
7. **Output directory:** `dist`
8. **Environment:** `VITE_API_URL=https://materra-backend.onrender.com`
9. **Deploy**

Done. Every push to `main` auto-deploys.

---

## ✅ Backend Deployment (Render) - 2 Minutes

### Option 1: One-Click Deploy

1. **Go to Render.com**
2. **Connect GitHub**
3. **New Web Service**
4. **Repository:** `Ananya6Daitkar/GREEN`
5. **Build Command:**
   ```bash
   pip install -r backend/requirements.txt
   ```
6. **Start Command:**
   ```bash
   cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
7. **Environment Variables:**
   - Add if needed (currently none required)
8. **Deploy**

Your backend is LIVE at something like `https://materra-backend.onrender.com`

### Option 2: Manual via Git

```bash
# Add Render as remote
git remote add render https://git.render.com/ananya-daitkar/GREEN.git

# Deploy
git push render main
```

---

## 🔗 Connect Frontend to Backend

After both are deployed, update the frontend API URL:

**In `frontend/src/api/client.ts`:**
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'https://materra-backend.onrender.com';
```

Then push:
```bash
git add frontend/src/api/client.ts
git commit -m "Update API URL to production backend"
git push origin main
```

Vercel will auto-redeploy.

---

## ✅ Verify Deployment

1. **Frontend working?**
   ```bash
   curl https://materra-studio.vercel.app
   ```
   Should return HTML

2. **Backend working?**
   ```bash
   curl https://materra-backend.onrender.com/health
   ```
   Should return: `{"status":"healthy"}`

3. **Frontend can reach backend?**
   - Open https://materra-studio.vercel.app
   - Go to "Studio"
   - Click "Add Material"
   - Click "Run Optimization ⚡"
   - If you see results, it's working!

---

## 📝 Update README with Live URLs

After deployment, update `README.md`:

```markdown
## 🚀 Live Application

| Service | URL |
|---------|-----|
| **Frontend** | https://materra-studio.vercel.app |
| **Backend** | https://materra-backend.onrender.com |
| **GitHub** | https://github.com/Ananya6Daitkar/GREEN |
```

---

## 🆘 Troubleshooting

### Frontend won't load
- Check Vercel build logs
- Verify `dist/` builds locally: `npm run build`
- Check environment variable: `VITE_API_URL`

### Backend won't start
- Check Render build logs
- Verify dependencies: `pip install -r backend/requirements.txt`
- Test locally: `python main.py`

### Frontend can't reach backend
- Check CORS in `backend/main.py` (should allow all origins)
- Verify backend URL in `frontend/src/api/client.ts`
- Check browser console for errors

---

## 🏆 Success Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] Frontend loads at `https://materra-studio.vercel.app`
- [ ] Backend health check passes: `https://materra-backend.onrender.com/health`
- [ ] Can add material in frontend
- [ ] Can run optimization
- [ ] See results appear
- [ ] README updated with live URLs
- [ ] GitHub shows latest commits

---

## 🎉 You're Done!

Share these URLs with judges:
- **Try it:** https://materra-studio.vercel.app
- **Code:** https://github.com/Ananya6Daitkar/GREEN
- **API:** https://materra-backend.onrender.com

**Time to deploy:** 5 minutes total  
**Status:** LIVE & WINNING 🏆
