# MATERRA Deployment Guide

## Local Development

### Quick Start

```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
python main.py

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Then open http://localhost:3000

## Production Deployment

### Frontend (Vercel)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy to Vercel:
```bash
npm install -g vercel
vercel --prod
```

### Backend (Render)

1. Create a `Procfile`:
```
web: cd backend && source venv/bin/activate && python main.py
```

2. Push to GitHub

3. Create a new Web Service on Render
   - Connect your GitHub repo
   - Set runtime to Python
   - Set build command: `pip install -r backend/requirements.txt`
   - Set start command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`

4. Set environment variables if needed

### Environment Variables

Backend (.env):
```
DEBUG=false
```

Frontend (.env):
```
VITE_API_URL=https://your-backend-url.com
```

## Monitoring

- Backend health: `GET /health`
- Frontend build status: Check Vercel dashboard
- Logs: Available in both Vercel and Render dashboards

## Troubleshooting

**Backend not connecting:**
- Check CORS configuration in `main.py`
- Verify API_BASE URL in `frontend/src/api/client.ts`

**Optimization failing:**
- Check material dimensions (must be > edge margin + component size)
- Verify damage regions don't cover entire panel

**Performance issues:**
- Increase grid search step in optimizer
- Reduce material resolution
