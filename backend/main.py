from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import time
from optimizer import optimize_cutting_layout, Material, Component, Constraints

app = FastAPI(title="MATERRA Optimizer", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class DamageRegion(BaseModel):
    id: str
    x: float
    y: float
    width: float
    height: float
    severity: str
    description: Optional[str] = None

class MaterialInput(BaseModel):
    id: str
    width: float
    height: float
    thickness: float
    quantity: int
    condition: str
    damageRegions: List[DamageRegion] = []

class ComponentInput(BaseModel):
    id: str
    name: str
    quantity: int
    width: float
    height: float
    thickness: float

class ConstraintsInput(BaseModel):
    kerf: float
    edgeMargin: float
    allowRotation: bool

class OptimizeRequest(BaseModel):
    materials: List[MaterialInput]
    components: List[ComponentInput]
    constraints: ConstraintsInput

class PlacedComponent(BaseModel):
    componentId: str
    componentName: str
    quantity: int
    x: float
    y: float
    width: float
    height: float
    rotation: int
    materialId: str
    panelIndex: int

class CuttingLayout(BaseModel):
    id: str
    placedComponents: List[PlacedComponent]
    materialId: str
    panelIndex: int
    utilization: float
    remainingArea: float

class OptimizationResponse(BaseModel):
    status: str
    layouts: List[CuttingLayout]
    totalUtilization: float
    componentsPlaced: int
    componentsFeasible: int
    solverTime: float
    baselineUtilization: float
    infeasibilityReason: Optional[str] = None

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/optimize", response_model=OptimizationResponse)
async def optimize(request: OptimizeRequest):
    start_time = time.time()
    
    try:
        # Convert inputs to optimizer format
        materials = [
            Material(
                id=m.id,
                width=m.width,
                height=m.height,
                thickness=m.thickness,
                quantity=m.quantity,
                damageRegions=[
                    (d.x, d.y, d.width, d.height) for d in m.damageRegions
                ],
            )
            for m in request.materials
        ]
        
        components = [
            Component(
                id=c.id,
                name=c.name,
                quantity=c.quantity,
                width=c.width,
                height=c.height,
                thickness=c.thickness,
            )
            for c in request.components
        ]
        
        constraints = Constraints(
            kerf=request.constraints.kerf,
            edgeMargin=request.constraints.edgeMargin,
            allowRotation=request.constraints.allowRotation,
        )
        
        # Run optimization
        result = optimize_cutting_layout(materials, components, constraints)
        
        # Calculate baseline (greedy)
        baseline_utilization = calculate_baseline_utilization(
            materials, components, constraints
        )
        
        solver_time = time.time() - start_time
        
        # Build response
        layouts = []
        for layout in result["layouts"]:
            placed = []
            for comp in layout["components"]:
                placed.append(
                    PlacedComponent(
                        componentId=comp["componentId"],
                        componentName=comp["componentName"],
                        quantity=1,
                        x=comp["x"],
                        y=comp["y"],
                        width=comp["width"],
                        height=comp["height"],
                        rotation=comp["rotation"],
                        materialId=comp["materialId"],
                        panelIndex=layout["panelIndex"],
                    )
                )
            
            layout_obj = CuttingLayout(
                id=f"layout_{layout['panelIndex']}",
                placedComponents=placed,
                materialId=layout["materialId"],
                panelIndex=layout["panelIndex"],
                utilization=layout["utilization"],
                remainingArea=layout["remainingArea"],
            )
            layouts.append(layout_obj)
        
        return OptimizationResponse(
            status=result["status"],
            layouts=layouts,
            totalUtilization=result["totalUtilization"],
            componentsPlaced=result["componentsPlaced"],
            componentsFeasible=result["componentsFeasible"],
            solverTime=solver_time,
            baselineUtilization=baseline_utilization,
            infeasibilityReason=result.get("infeasibilityReason"),
        )
        
    except Exception as e:
        print(f"Optimization error: {e}")
        raise HTTPException(status_code=400, detail=str(e))

def calculate_baseline_utilization(materials, components, constraints):
    """Simple greedy baseline for comparison"""
    total_material_area = sum(m.width * m.height for m in materials)
    total_component_area = sum(
        c.quantity * c.width * c.height for c in components
    )
    
    # Account for kerf and margins (rough estimate)
    edge_loss = sum(
        (m.width + m.height) * constraints.edgeMargin * 2 for m in materials
    )
    
    if total_material_area <= edge_loss:
        return 0.0
    
    return (total_component_area / (total_material_area - edge_loss)) * 100

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
