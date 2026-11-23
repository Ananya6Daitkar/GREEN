# MATERRA Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Prerequisites
- Node.js 16+ installed
- Python 3.9+ installed
- Git

### Step 1: Clone & Setup (First Time Only)

```bash
cd /Users/nalinee/Green\ hacks

# Install backend dependencies
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Install frontend dependencies
cd ../frontend
npm install

cd ..
```

### Step 2: Start Backend

```bash
cd backend
source venv/bin/activate
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 3: Start Frontend (New Terminal)

```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.4.21  ready in 234 ms
  ➜  Local:   http://localhost:3000/
```

### Step 4: Open in Browser

Visit **http://localhost:3000**

---

## ✅ Verify Everything Works

### Backend Health Check
```bash
curl http://localhost:8000/health
# Should return: {"status":"healthy"}
```

### Test Optimization API
```bash
curl -X POST http://localhost:8000/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "materials": [
      {"id": "m1", "width": 1200, "height": 600, "thickness": 18, "quantity": 1, "condition": "good", "damageRegions": []}
    ],
    "components": [
      {"id": "c1", "name": "Base", "quantity": 1, "width": 400, "height": 300, "thickness": 18}
    ],
    "constraints": {"kerf": 3, "edgeMargin": 10, "allowRotation": true}
  }'
```

Should return JSON with `"status": "feasible"` and component placements.

---

## 📖 Usage Guide

### Add Material to Project
1. Click **Enter Studio** button
2. Click **+ Add Material**
3. Fill in dimensions:
   - Width: 1200 mm
   - Height: 600 mm
   - Thickness: 18 mm
4. Click **Add Material**

### Run Optimization
1. Material should be in left panel
2. Click **Run Optimization** button (top right)
3. Watch as solver generates cutting layout
4. See results in right panel:
   - Material utilization %
   - Components placed
   - Solver runtime

### Explore Cutting Layout
- Scroll/pan the canvas in center
- Green rectangles = components
- Orange regions = damage (if added)
- Brown outline = material edge

### Adjust Environmental Impact
1. Navigate to **Impact** page
2. Change assumption values:
   - Transport distance
   - Material mass
   - Processing energy
3. Click **Calculate Impact**
4. See scenario comparison

### Try the Demo
1. Click **Demo** in header
2. Follow 7-step walkthrough
3. Use Next/Back/Reset buttons
4. Each step shows real data

---

## 🔧 Troubleshooting

### "Cannot connect to backend"
- Check backend is running: `ps aux | grep python`
- Verify port 8000: `lsof -i :8000`
- Restart backend if needed

### "npm command not found"
- Install Node.js from nodejs.org
- Verify: `node --version`

### "Python not found"
- Install Python 3.9+
- Verify: `python3 --version`

### Frontend shows blank page
- Check browser console (F12)
- Look for errors in terminal where `npm run dev` runs
- Try clearing browser cache

### Optimization fails
- Material must be larger than components
- Edge margin (10mm) + component size must fit
- Check browser console for error messages

---

## 📁 Project Structure

```
/Users/nalinee/Green hacks/
├── frontend/              # React app
│   ├── src/
│   │   ├── pages/        # 6 main pages
│   │   ├── components/   # Reusable UI components
│   │   ├── stores/       # Zustand state
│   │   ├── types/        # TypeScript types
│   │   ├── data/         # Product templates
│   │   └── api/          # HTTP client
│   ├── package.json
│   └── tsconfig.json
│
├── backend/               # FastAPI server
│   ├── main.py           # API endpoints
│   ├── optimizer.py      # Solving algorithm
│   ├── requirements.txt   # Dependencies
│   └── venv/             # Virtual environment
│
├── README.md             # Overview
├── QUICKSTART.md         # This file
├── FINAL_SUMMARY.md      # Complete summary
├── DEPLOYMENT.md         # Production guide
└── TEST_REPORT.md        # Test results
```

---

## 🎯 Key Pages & Features

| Page | URL | Feature |
|------|-----|---------|
| Home | `/` | Hero, how-it-works, CTA |
| Studio | `/studio` | Material input, optimizer, results |
| Materials | `/materials` | Material library |
| Designs | `/designs` | Design explorer |
| Impact | `/impact` | Environmental calculator |
| Demo | `/demo` | 7-step guided walkthrough |

---

## 🛑 Stopping Services

### Stop Frontend
Press `Ctrl+C` in frontend terminal

### Stop Backend
Press `Ctrl+C` in backend terminal

### Stop Both at Once
In project root: `pkill -f "python main.py" && pkill -f "npm run dev"`

---

## 🔄 Development Workflow

### Make Frontend Changes
1. Edit files in `frontend/src/`
2. Vite automatically reloads browser
3. No restart needed

### Make Backend Changes
1. Edit files in `backend/`
2. Restart backend: `Ctrl+C` then `python main.py`
3. Frontend auto-reconnects

### Add New Page
1. Create `frontend/src/pages/MyPage.tsx`
2. Add route in `frontend/src/App.tsx`
3. Update header navigation in `frontend/src/components/Header.tsx`

### Add New API Endpoint
1. Add function in `backend/main.py`
2. Create Pydantic models for request/response
3. Use in frontend via `optimizationAPI` client

---

## 📊 Expected Performance

| Task | Time |
|------|------|
| Optimization solve | 0.00025s |
| API round-trip | <10ms |
| Frontend page load | 2-3s |
| Component placement | <1s |

---

## 💡 Tips

- **Material Dimensions:** Keep reasonable (100-2000mm)
- **Component Count:** 1-10 for quick demo
- **Damage Regions:** Optional, helps show solver flexibility
- **Environmental:** Try different transport distances to see impact change
- **Demo:** Perfect for showing judges the full workflow

---

## 🎓 Learning Resources

- Frontend patterns: See `src/pages/Home.tsx` and `src/pages/Studio.tsx`
- Backend structure: See `backend/main.py` and `backend/optimizer.py`
- State management: See `src/stores/projectStore.ts`
- Type definitions: See `src/types/index.ts`

---

## ✨ Next Steps

1. Run locally following steps above
2. Add a material and optimize
3. Try the demo
4. Play with environmental calculator
5. For production, see DEPLOYMENT.md

---

**Questions?** See FINAL_SUMMARY.md for complete documentation.

**Ready to deploy?** See DEPLOYMENT.md for Vercel/Render setup.

---

**Happy designing! 🌱**
