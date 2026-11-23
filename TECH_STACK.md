# MATERRA Technology Stack

## Frontend (React + TypeScript)

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework with hooks |
| **TypeScript** | Type-safe development |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS** | Utility-first styling |
| **React Router** | Client-side navigation |
| **Zustand** | Lightweight state management |
| **Framer Motion** | Smooth animations |
| **Lucide React** | Icon library |
| **Recharts** | Data visualization |
| **Axios** | HTTP client for API calls |

## Backend (Python + FastAPI)

| Technology | Purpose |
|-----------|---------|
| **FastAPI** | Modern async web framework |
| **Python 3** | Server runtime |
| **Uvicorn** | ASGI application server |
| **Pydantic** | Data validation & serialization |
| **Python-multipart** | File upload handling |
| **CORS Middleware** | Cross-origin requests |

## Optimization Engine

| Algorithm | Purpose |
|-----------|---------|
| **Greedy Bin-Packing** | Rectangle placement algorithm |
| **Grid Search** | Position finding (20mm grid) |
| **Rectangular Geometry** | Component/damage region handling |
| **Bottom-Left Heuristic** | Efficient packing strategy |

## Data & Storage

| Solution | Purpose |
|-----------|---------|
| **Browser localStorage** | Local project persistence |
| **JSON serialization** | Data format |
| **Versioned storage** | Project compatibility |

## Deployment

| Platform | Purpose |
|-----------|---------|
| **Vercel** | Frontend hosting (recommended) |
| **Render** | Backend hosting (recommended) |
| **GitHub** | Version control & CI/CD |

## Development Tools

| Tool | Purpose |
|-----------|---------|
| **npm** | Node package manager |
| **venv** | Python virtual environment |
| **git** | Version control |

## Key Libraries

```json
{
  "frontend": {
    "react": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "tailwindcss": "^3.4.0",
    "framer-motion": "^10.16.0",
    "zustand": "^4.4.0",
    "axios": "^1.6.0"
  },
  "backend": {
    "fastapi": "latest",
    "uvicorn": "latest",
    "pydantic": "^2.0.0"
  }
}
```

## Architecture Decisions

### Why These Technologies?

1. **React + TypeScript**
   - Type safety and developer experience
   - Large ecosystem for UI components
   - Excellent state management options

2. **FastAPI**
   - Async-first design for performance
   - Automatic API documentation
   - Built-in data validation with Pydantic

3. **Tailwind CSS**
   - Rapid UI development
   - Consistent design system
   - Small production bundle

4. **Zustand**
   - Minimal boilerplate
   - Works well with React hooks
   - Easy localStorage integration

5. **Greedy Algorithm**
   - Fast computation (< 1ms)
   - Deterministic results
   - Transparent logic for judges

## Performance Metrics

- **Backend**: 0.00025s optimization time
- **Frontend**: 124.70 KB JS (gzipped)
- **CSS**: 4.68 KB (gzipped)
- **API Latency**: <10ms
- **Build Time**: ~4s

## Why Not...

| Skipped | Reason |
|---------|--------|
| PostgreSQL | MVP scope: localStorage sufficient |
| Docker | Deployment to Vercel/Render easier |
| GraphQL | REST API simpler for hackathon |
| Redux | Zustand + hooks sufficient |
| Three.js | SVG fallback sufficient |
| OR-Tools | Greedy algorithm transparent & fast |
| Authentication | Public hackathon demo |

## Production Upgrades

Future versions could add:
- PostgreSQL + Supabase for persistence
- Stripe for payments
- Twilio for notifications
- SendGrid for email
- Advanced solver (OR-Tools, SCIP)
- Real 3D preview (Three.js)
- Real-time collaboration (Socket.io)
