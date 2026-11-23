"""
MATERRA Cutting Layout Optimizer
Real greedy bin-packing implementation with damage-aware regeneration
"""

from dataclasses import dataclass
from typing import List, Tuple, Dict, Any
import time

@dataclass
class Material:
    id: str
    width: float
    height: float
    thickness: float
    quantity: int
    damageRegions: List[Tuple[float, float, float, float]] = None
    
    def __post_init__(self):
        if self.damageRegions is None:
            self.damageRegions = []

@dataclass
class Component:
    id: str
    name: str
    quantity: int
    width: float
    height: float
    thickness: float

@dataclass
class Constraints:
    kerf: float = 3.0
    edgeMargin: float = 10.0
    allowRotation: bool = True

def rectangles_overlap(r1: Tuple[float, float, float, float], r2: Tuple[float, float, float, float]) -> bool:
    """Check if two rectangles overlap. Each rect is (x, y, width, height)"""
    x1, y1, w1, h1 = r1
    x2, y2, w2, h2 = r2
    
    return not (x1 + w1 <= x2 or x2 + w2 <= x1 or y1 + h1 <= y2 or y2 + h2 <= y1)

def can_place_component(
    x: float,
    y: float,
    comp_width: float,
    comp_height: float,
    panel_width: float,
    panel_height: float,
    placed_rects: List[Tuple[float, float, float, float]],
    damage_regions: List[Tuple[float, float, float, float]],
    edge_margin: float,
) -> bool:
    """Check if component can be placed without overlap or violations"""
    
    # Check edge margins
    if x < edge_margin or y < edge_margin:
        return False
    if x + comp_width + edge_margin > panel_width:
        return False
    if y + comp_height + edge_margin > panel_height:
        return False
    
    comp_rect = (x, y, comp_width, comp_height)
    
    # Check overlap with other components
    for placed in placed_rects:
        if rectangles_overlap(comp_rect, placed):
            return False
    
    # Check overlap with damage regions
    for damage in damage_regions:
        if rectangles_overlap(comp_rect, damage):
            return False
    
    return True

def greedy_packing(
    material: Material,
    components: List[Component],
    constraints: Constraints,
) -> Dict[str, Any]:
    """Greedy bottom-left placement algorithm for rectangle packing"""
    
    placements = []
    placed_rects: List[Tuple[float, float, float, float]] = []
    placed_components = {comp.id: 0 for comp in components}
    
    # Try to place components greedily (sorted by area descending for better packing)
    sorted_components = sorted(
        [(c, i) for i, c in enumerate(components)],
        key=lambda x: x[0].width * x[0].height,
        reverse=True
    )
    
    for component, _ in sorted_components:
        for _ in range(component.quantity):
            placed = False
            
            # Grid search for placement (20mm grid)
            step = 20
            for y in range(int(constraints.edgeMargin), int(material.height - constraints.edgeMargin), step):
                if placed:
                    break
                for x in range(int(constraints.edgeMargin), int(material.width - constraints.edgeMargin), step):
                    # Try normal orientation
                    if can_place_component(
                        x, y,
                        component.width, component.height,
                        material.width, material.height,
                        placed_rects,
                        material.damageRegions,
                        constraints.edgeMargin,
                    ):
                        placements.append({
                            "componentId": component.id,
                            "componentName": component.name,
                            "x": x,
                            "y": y,
                            "width": component.width,
                            "height": component.height,
                            "rotation": 0,
                            "materialId": material.id,
                        })
                        placed_rects.append((x, y, component.width, component.height))
                        placed_components[component.id] += 1
                        placed = True
                        break
                    
                    # Try rotated orientation if allowed and different dimensions
                    if constraints.allowRotation and component.width != component.height:
                        if can_place_component(
                            x, y,
                            component.height, component.width,
                            material.width, material.height,
                            placed_rects,
                            material.damageRegions,
                            constraints.edgeMargin,
                        ):
                            placements.append({
                                "componentId": component.id,
                                "componentName": component.name,
                                "x": x,
                                "y": y,
                                "width": component.height,
                                "height": component.width,
                                "rotation": 90,
                                "materialId": material.id,
                            })
                            placed_rects.append((x, y, component.height, component.width))
                            placed_components[component.id] += 1
                            placed = True
                            break
    
    # Calculate utilization
    placed_area = sum(p["width"] * p["height"] for p in placements)
    available_area = material.width * material.height
    for _, _, w, h in material.damageRegions:
        available_area -= w * h
    
    utilization = (placed_area / available_area * 100) if available_area > 0 else 0
    remaining_area = available_area - placed_area
    
    return {
        "components": placements,
        "utilization": utilization,
        "remainingArea": remaining_area,
        "placed_count": sum(placed_components.values()),
    }

def optimize_cutting_layout(
    materials: List[Material],
    components: List[Component],
    constraints: Constraints,
) -> Dict[str, Any]:
    """Main optimization function"""
    
    layouts = []
    total_placed = 0
    total_target = sum(c.quantity for c in components)
    
    # Try packing on each material panel
    for panel_idx, material in enumerate(materials):
        for _ in range(material.quantity):
            result = greedy_packing(material, components, constraints)
            
            layouts.append({
                "panelIndex": panel_idx,
                "materialId": material.id,
                "components": result["components"],
                "utilization": result["utilization"],
                "remainingArea": result["remainingArea"],
            })
            
            total_placed += result["placed_count"]
            
            if total_placed >= total_target:
                break
        
        if total_placed >= total_target:
            break
    
    # Calculate overall metrics
    total_utilization = sum(l["utilization"] for l in layouts) / len(layouts) if layouts else 0
    
    is_feasible = total_placed >= total_target
    
    return {
        "status": "feasible" if is_feasible else "infeasible",
        "layouts": layouts,
        "totalUtilization": total_utilization,
        "componentsPlaced": total_placed,
        "componentsFeasible": total_target,
        "infeasibilityReason": "Insufficient material" if not is_feasible else None,
    }

def calculate_component_area(component: Component) -> float:
    """Calculate component area"""
    return component.width * component.height
