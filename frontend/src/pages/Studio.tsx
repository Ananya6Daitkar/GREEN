import { useState, useEffect } from 'react'
import { Plus, ChevronDown, AlertCircle, CheckCircle, Zap } from 'lucide-react'
import { useProjectStore } from '@/stores/projectStore'
import { PRODUCT_TEMPLATES, getTemplate } from '@/data/templates'
import { Material } from '@/types'
import { optimizationAPI } from '@/api/client'
import { CuttingLayoutCanvas } from '@/components/CuttingLayoutCanvas'
import { MaterialForm } from '@/components/MaterialForm'

export const Studio = () => {
  const { currentProject, createProject, addMaterial, setOptimization } = useProjectStore()
  const [showMaterialForm, setShowMaterialForm] = useState(false)
  const [isOptimizing, isLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // If no project, create a default one
  useEffect(() => {
    if (!currentProject) {
      createProject('Untitled Design', PRODUCT_TEMPLATES[0])
    }
  }, [currentProject, createProject])

  const handleOptimize = async () => {
    if (!currentProject) return

    isLoading(true)
    setError(null)

    try {
      const request = {
        materials: currentProject.materials,
        components: currentProject.selectedTemplate.components,
        constraints: currentProject.constraints,
      }

      const result = await optimizationAPI.optimize(request)
      setOptimization(currentProject.id, result)
    } catch (err: any) {
      setError(err.message || 'Optimization failed')
      console.error(err)
    } finally {
      isLoading(false)
    }
  }

  const handleAddMaterial = (material: Material) => {
    if (currentProject) {
      addMaterial(currentProject.id, material)
    }
    setShowMaterialForm(false)
  }

  if (!currentProject) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-white to-ivory/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-forest">Studio</h1>
            <p className="text-sm text-charcoal/60">{currentProject.name}</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded font-semibold text-sm hover:bg-gray-50">
              Save
            </button>
            <button
              onClick={handleOptimize}
              disabled={isOptimizing || currentProject.materials.length === 0}
              className="bg-forest text-ivory px-6 py-2 rounded font-bold hover:bg-charcoal disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              {isOptimizing ? 'Optimizing...' : 'Run Optimization'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex gap-6 p-6 max-w-7xl mx-auto">
        {/* Left Sidebar - Material & Constraints */}
        <div className="w-80 space-y-6">
          {/* Material & Constraints Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="mb-6">
              <h3 className="font-serif font-bold text-lg text-forest mb-4">Material & Constraints</h3>

              {/* Selected Panel */}
              <div className="bg-gradient-to-br from-timber/10 to-terracotta/10 rounded-lg p-4 mb-4 border border-timber/20">
                <div className="text-sm font-mono text-charcoal/70 mb-2">Selected Panel</div>
                {currentProject.materials.length > 0 ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-charcoal/60">Size:</span>
                      <span className="font-bold text-charcoal">
                        {currentProject.materials[0].width} × {currentProject.materials[0].height} mm
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-charcoal/60">Thickness:</span>
                      <span className="font-bold text-charcoal">{currentProject.materials[0].thickness} mm</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-charcoal/50">No materials added yet</p>
                )}
              </div>

              {/* Add Material Button */}
              <button
                onClick={() => setShowMaterialForm(true)}
                className="w-full border-2 border-dashed border-forest text-forest py-3 rounded font-semibold hover:bg-forest/5 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Material
              </button>
            </div>

            {/* Materials List */}
            {currentProject.materials.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-charcoal/70 mb-3 uppercase">Materials</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {currentProject.materials.map((mat, i) => (
                    <div
                      key={mat.id}
                      className={`p-3 rounded border-2 cursor-pointer transition-colors ${
                        i === 0
                          ? 'bg-forest/5 border-forest'
                          : 'bg-white border-gray-200 hover:border-forest/30'
                      }`}
                    >
                      <div className="text-xs font-bold text-charcoal/70 uppercase">Panel {i + 1}</div>
                      <div className="text-sm text-charcoal mt-1">
                        {mat.width}×{mat.height}×{mat.thickness}mm
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Template */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-charcoal/70 mb-3 uppercase">Product Template</h4>
              <div className="bg-gradient-to-br from-timber/5 to-terracotta/5 p-4 rounded-lg border border-timber/20">
                <div className="font-semibold text-charcoal mb-1">{currentProject.selectedTemplate.name}</div>
                <div className="text-xs text-charcoal/60">{currentProject.selectedTemplate.description}</div>
                <div className="mt-3 text-sm">
                  <span className="font-mono text-charcoal/50">{currentProject.selectedTemplate.components.length}</span>
                  <span className="text-charcoal/50 ml-1">components</span>
                </div>
              </div>
            </div>

            {/* Optimization Settings */}
            <div>
              <h4 className="text-sm font-bold text-charcoal/70 mb-3 uppercase">Optimization Settings</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-charcoal/70 mb-2 block">Kerf (Saw Width)</label>
                  <input
                    type="number"
                    value={currentProject.constraints.kerf}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-charcoal/70 mb-2 block">Edge Margin</label>
                  <input
                    type="number"
                    value={currentProject.constraints.edgeMargin}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm font-bold text-charcoal">Allow 90° rotation</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Cutting Layout Canvas */}
        <div className="flex-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 h-96 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif font-bold text-lg text-forest">Cutting Layout</h3>
              <div className="text-xs text-charcoal/60">1000 mm</div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-ivory to-citron/10 rounded border-2 border-dashed border-timber/30 flex items-center justify-center">
              {currentProject.optimization ? (
                <CuttingLayoutCanvas result={currentProject.optimization} />
              ) : (
                <div className="text-center text-charcoal/50">
                  <p className="text-sm mb-2">Add materials and run optimization to see cutting layout</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right - Optimization Results */}
        <div className="w-80 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-serif font-bold text-lg text-forest mb-4">Optimization Result</h3>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            {currentProject.optimization ? (
              <div className="space-y-4">
                {/* Status */}
                <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                  {currentProject.optimization.status === 'feasible' ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-bold text-green-600">Feasible</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="font-bold text-red-600">Infeasible</span>
                    </>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-charcoal/60 mb-1">Material utilization</div>
                    <div className="text-2xl font-bold text-forest">
                      {currentProject.optimization.totalUtilization.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-charcoal/60 mb-1">Components placed</div>
                    <div className="text-2xl font-bold text-forest">
                      {currentProject.optimization.componentsPlaced}/
                      {currentProject.optimization.componentsFeasible}
                    </div>
                  </div>
                </div>

                {/* Performance */}
                <div className="bg-gray-50 rounded p-3">
                  <div className="text-xs text-charcoal/60 mb-1">Runtime</div>
                  <div className="text-sm font-mono text-charcoal">
                    {currentProject.optimization.solverTime.toFixed(2)} s
                  </div>
                </div>

                {/* Baseline Comparison */}
                <div className="bg-citron/10 rounded p-3 border border-citron/30">
                  <div className="text-xs text-charcoal/60 mb-1">Baseline (greedy)</div>
                  <div className="text-sm font-mono text-charcoal">
                    {currentProject.optimization.baselineUtilization.toFixed(1)}%
                  </div>
                </div>

                <button className="w-full bg-forest text-ivory py-3 rounded font-bold hover:bg-charcoal transition-colors mt-4">
                  ✓ Mark Damage
                </button>
              </div>
            ) : (
              <p className="text-sm text-charcoal/50 text-center py-8">
                Run optimization to see results
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Material Form Modal */}
      {showMaterialForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <MaterialForm
            onAdd={handleAddMaterial}
            onCancel={() => setShowMaterialForm(false)}
          />
        </div>
      )}
    </div>
  )
}
