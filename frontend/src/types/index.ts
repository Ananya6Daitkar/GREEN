export interface Material {
  id: string;
  name: string;
  width: number;
  height: number;
  thickness: number;
  quantity: number;
  condition: 'excellent' | 'good' | 'fair' | 'damaged';
  source?: string;
  photoUrl?: string;
  damageRegions: DamageRegion[];
  verificationStatus: 'self-reported' | 'photo-supported' | 'manually-reviewed';
  lastUpdated: number;
  mass?: number;
}

export interface DamageRegion {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  severity: 'minor' | 'moderate' | 'severe';
  description?: string;
}

export interface ProductTemplate {
  id: string;
  name: string;
  description: string;
  components: ComponentSpec[];
  estimatedMass?: number;
}

export interface ComponentSpec {
  id: string;
  name: string;
  quantity: number;
  width: number;
  height: number;
  thickness: number;
}

export interface PlacedComponent {
  componentId: string;
  quantity: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: 0 | 90;
  materialId: string;
  panelIndex: number;
}

export interface CuttingLayout {
  id: string;
  placedComponents: PlacedComponent[];
  material: Material;
  panelIndex: number;
  utilization: number;
  remainingArea: number;
}

export interface OptimizationResult {
  status: 'feasible' | 'infeasible';
  layouts: CuttingLayout[];
  totalUtilization: number;
  componentsPlaced: number;
  componentsFeasible: number;
  solverTime: number;
  baselineUtilization: number;
  infeasibilityReason?: string;
}

export interface DesignProject {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  materials: Material[];
  selectedTemplate: ProductTemplate;
  optimization?: OptimizationResult;
  constraints: {
    kerf: number;
    edgeMargin: number;
    allowRotation: boolean;
  };
}

export interface EnvironmentalInput {
  transportDistance: number;
  transportEmissionFactor: number;
  materialMass: number;
  processingEnergy: number;
  electricityEmissionFactor: number;
  newMaterialEmissionFactor: number;
  disposalEmissionFactor: number;
}

export interface EnvironmentalResult {
  scenarioA: {
    name: string;
    newMaterialEmissions: number;
    disposalEmissions: number;
    total: number;
  };
  scenarioB: {
    name: string;
    reclaimedTransportEmissions: number;
    processingEmissions: number;
    cuttingWasteEmissions: number;
    total: number;
  };
  difference: number;
  percentageImprovement?: number;
}
