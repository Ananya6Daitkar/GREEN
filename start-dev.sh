#!/bin/bash

# Start MATERRA Development Servers

echo "🌱 MATERRA Development Environment"
echo "======================================"
echo ""

# Start backend
echo "Starting backend on http://localhost:8000..."
cd backend
source venv/bin/activate
python main.py &
BACKEND_PID=$!

sleep 2

# Start frontend
echo "Starting frontend on http://localhost:3000..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✓ Backend running (PID: $BACKEND_PID)"
echo "✓ Frontend running (PID: $FRONTEND_PID)"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop"

wait
