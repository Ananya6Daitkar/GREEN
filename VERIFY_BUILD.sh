#!/bin/bash

# MATERRA Build Verification Script
# Run this to verify everything is set up correctly

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║          MATERRA BUILD VERIFICATION SCRIPT                    ║"
echo "║  Checking all components are ready for hackathon judging      ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASSED=0
FAILED=0

# Test function
test_command() {
    local name=$1
    local cmd=$2
    
    echo -n "Testing $name... "
    
    if eval "$cmd" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ PASS${NC}"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC}"
        ((FAILED++))
    fi
}

echo "═══════════════════════════════════════════════════════════════"
echo "ENVIRONMENT CHECKS"
echo "═══════════════════════════════════════════════════════════════"

test_command "Node.js installed" "node --version"
test_command "npm installed" "npm --version"
test_command "Python 3 installed" "python3 --version"
test_command "Git installed" "git --version"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "FRONTEND CHECKS"
echo "═══════════════════════════════════════════════════════════════"

test_command "Frontend dependencies" "cd frontend && npm list react > /dev/null 2>&1"
test_command "TypeScript compiled" "cd frontend && npx tsc --noEmit"
test_command "Build succeeds" "cd frontend && npm run build"
test_command "Dist folder exists" "[ -d frontend/dist ]"
test_command "HTML built" "[ -f frontend/dist/index.html ]"
test_command "JS bundle exists" "[ -f frontend/dist/assets/index-* ]"
test_command "CSS bundle exists" "ls frontend/dist/assets/*css 2>/dev/null"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "BACKEND CHECKS"
echo "═══════════════════════════════════════════════════════════════"

test_command "Backend dependencies" "cd backend && python3 -c 'import fastapi; import uvicorn; import pydantic'"
test_command "Optimizer imports" "cd backend && python3 -c 'from optimizer import optimize_cutting_layout'"
test_command "Main imports" "cd backend && python3 -c 'from main import app'"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "FILE STRUCTURE CHECKS"
echo "═══════════════════════════════════════════════════════════════"

test_command "Frontend src exists" "[ -d frontend/src ]"
test_command "Backend main exists" "[ -f backend/main.py ]"
test_command "Backend optimizer exists" "[ -f backend/optimizer.py ]"
test_command "README exists" "[ -f README.md ]"
test_command "QUICKSTART exists" "[ -f QUICKSTART.md ]"
test_command "DEPLOYMENT guide exists" "[ -f DEPLOYMENT.md ]"
test_command "STATUS exists" "[ -f STATUS.txt ]"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "DOCUMENTATION CHECKS"
echo "═══════════════════════════════════════════════════════════════"

test_command "README.md readable" "[ -s README.md ] && grep -q 'MATERRA' README.md"
test_command "QUICKSTART.md complete" "[ -s QUICKSTART.md ] && grep -q 'npm run dev' QUICKSTART.md"
test_command "DEPLOYMENT.md complete" "[ -s DEPLOYMENT.md ] && grep -q 'Vercel' DEPLOYMENT.md"
test_command "TEST_REPORT.md exists" "[ -s TEST_REPORT.md ]"
test_command "FINAL_SUMMARY.md exists" "[ -s FINAL_SUMMARY.md ]"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "CODE QUALITY CHECKS"
echo "═══════════════════════════════════════════════════════════════"

# Check for common issues
echo -n "No console.log() in production code... "
if ! grep -r "console.log" frontend/src --exclude-dir=node_modules 2>/dev/null | grep -v "TODO\|FIXME"; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠ WARNING${NC}"
fi

echo -n "No TODO comments in main files... "
if ! grep -r "TODO\|FIXME" backend/*.py frontend/src/*.tsx 2>/dev/null; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠ WARNING${NC}"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "RUNTIME CHECKS"
echo "═══════════════════════════════════════════════════════════════"

echo "Starting backend for 3 seconds..."
cd backend
source venv/bin/activate 2>/dev/null || python3 -m venv venv && source venv/bin/activate
python main.py > /tmp/backend_test.log 2>&1 &
BACKEND_PID=$!
sleep 2

echo -n "Backend health check... "
if curl -s http://localhost:8000/health | grep -q "healthy"; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ FAIL${NC}"
    ((FAILED++))
fi

echo -n "API optimization endpoint... "
if curl -s -X POST http://localhost:8000/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "materials": [{"id": "m1", "width": 1200, "height": 600, "thickness": 18, "quantity": 1, "condition": "good", "damageRegions": []}],
    "components": [{"id": "c1", "name": "Base", "quantity": 1, "width": 400, "height": 300, "thickness": 18}],
    "constraints": {"kerf": 3, "edgeMargin": 10, "allowRotation": true}
  }' | grep -q '"status"'; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ FAIL${NC}"
    ((FAILED++))
fi

echo "Stopping backend..."
kill $BACKEND_PID 2>/dev/null
sleep 1

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "SUMMARY"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo -e "Tests Passed:  ${GREEN}$PASSED${NC}"
echo -e "Tests Failed:  ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ ALL CHECKS PASSED${NC}"
    echo ""
    echo "MATERRA is ready for deployment!"
    echo ""
    echo "Quick Start:"
    echo "  Terminal 1: cd backend && source venv/bin/activate && python main.py"
    echo "  Terminal 2: cd frontend && npm run dev"
    echo "  Then: Open http://localhost:3000"
    echo ""
    exit 0
else
    echo -e "${RED}✗ SOME CHECKS FAILED${NC}"
    echo ""
    echo "Please review the failures above and run setup again:"
    echo "  cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
    echo "  cd frontend && npm install"
    echo ""
    exit 1
fi
