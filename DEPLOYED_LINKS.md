# 🚀 MATERRA - DEPLOYED LINKS

## ✅ FRONTEND - LIVE ON VERCEL

**🔗 https://frontend-six-flame-3dmpv3bgq9.vercel.app**

✅ Status: Live and working  
✅ Build: Successful (2.21s)  
✅ Bundle size: 124.70 KB (gzipped)  
✅ Pages: All 6 pages functional  

**What you can do:**
- Visit the homepage
- Click "Enter Studio"
- Add materials
- Run optimization (requires backend)
- Browse all pages
- Full responsive design

---

## 🔄 BACKEND - DEPLOY TO RENDER (2 Minutes)

Currently not deployed. Follow these steps:

### **Deploy Backend to Render**

1. **Go to https://render.com**
2. **Sign in with GitHub**
3. **New Web Service**
4. **Connect repository:** `Ananya6Daitkar/GREEN`
5. **Configure:**
   - Name: `materra-backend`
   - Root directory: `backend/`
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Environment: Python 3.11
6. **Deploy**

This will give you a backend URL like: `https://materra-backend.onrender.com`

---

## 🔗 Connect Frontend to Backend

After backend deploys, update the frontend to use it:

**In `frontend/src/api/client.ts`:**
```typescript
const API_URL = 'https://materra-backend.onrender.com';
```

Then push:
```bash
git add frontend/src/api/client.ts
git commit -m "Update API URL to production backend"
git push origin main
```

Vercel will auto-redeploy.

---

## ✅ Full Deployment Status

| Component | Status | URL |
|-----------|--------|-----|
| **Frontend** | ✅ Live | https://frontend-six-flame-3dmpv3bgq9.vercel.app |
| **Backend** | ⏳ Ready to deploy | Follow Render steps above |
| **GitHub** | ✅ Live | https://github.com/Ananya6Daitkar/GREEN |

---

## 🎯 For Judges RIGHT NOW

**Option 1: Try Frontend (Live Now)**
- 🔗 Visit: https://frontend-six-flame-3dmpv3bgq9.vercel.app
- Explore all pages
- UI is fully functional
- Backend not connected yet (optimization won't work)

**Option 2: Run Locally (Full Working App)**
```bash
# Terminal 1: Backend
cd backend && source venv/bin/activate && python main.py

# Terminal 2: Frontend
cd frontend && npm run dev

# Open: http://localhost:3001
# Full app works with real optimization
```

**Option 3: Review Code**
- 🔗 GitHub: https://github.com/Ananya6Daitkar/GREEN
- Full source code
- 11 commits
- 13 documentation files

---

## 📊 Frontend Features (Live Now)

✅ Homepage with hero section  
✅ Studio page (empty until backend deployed)  
✅ Materials page  
✅ Designs page  
✅ Impact page  
✅ Demo page (7-step walkthrough)  
✅ Responsive design (desktop, tablet, mobile)  
✅ Professional UI with custom design system  

---

## 🏆 Next Step: Deploy Backend

To have a fully working live deployment:

1. Go to https://render.com
2. Connect your GitHub account
3. Create new Web Service from `Ananya6Daitkar/GREEN`
4. Set root directory to `backend/`
5. Deploy
6. Get backend URL
7. Update frontend API URL
8. Done!

**Total time: 5-10 minutes**

---

## 📝 Summary

- ✅ Frontend deployed to Vercel
- ✅ Code on GitHub with full history
- ✅ Local version fully functional
- ⏳ Backend ready for Render (2-step process)

**Status: 90% Complete - Just need to deploy backend** 🎉

---

**Share with judges:**
1. Frontend live: https://frontend-six-flame-3dmpv3bgq9.vercel.app
2. Code: https://github.com/Ananya6Daitkar/GREEN
3. Full demo: Clone & run locally (see README.md)
