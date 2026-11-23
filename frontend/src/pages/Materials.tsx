import { useProjectStore } from '@/stores/projectStore'
import { Download, Eye } from 'lucide-react'

export const Materials = () => {
  const { currentProject } = useProjectStore()

  if (!currentProject || currentProject.materials.length === 0) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl font-bold text-forest mb-4">Material Library</h1>
          <p className="text-charcoal/70 text-lg">No materials yet. Add materials in the Studio.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="font-serif text-4xl font-bold text-forest mb-2">Material Library</h1>
        <p className="text-charcoal/70 mb-12">
          {currentProject.materials.length} material(s) in your project
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentProject.materials.map((material) => (
            <div key={material.id} className="bg-gradient-to-br from-white to-ivory/30 border border-gray-200 rounded-lg overflow-hidden">
              {/* Material Photo */}
              {material.photoUrl ? (
                <img
                  src={material.photoUrl}
                  alt={material.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-timber to-terracotta flex items-center justify-center text-white/60">
                  No photo
                </div>
              )}

              {/* Details */}
              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold text-forest mb-4">
                  {material.name || 'Material Passport'}
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <div className="text-xs font-bold text-charcoal/70 uppercase mb-1">Dimensions</div>
                    <div className="font-mono text-sm text-charcoal">
                      {material.width} × {material.height} × {material.thickness} mm
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-charcoal/70 uppercase mb-1">Quantity</div>
                    <div className="font-mono text-sm text-charcoal">{material.quantity}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-charcoal/70 uppercase mb-1">Condition</div>
                    <div className="font-mono text-sm text-charcoal capitalize">{material.condition}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-charcoal/70 uppercase mb-1">Source</div>
                    <div className="font-mono text-sm text-charcoal">{material.source || 'Unknown'}</div>
                  </div>
                </div>

                {/* Verification */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-sm font-bold uppercase text-green-700">
                      {material.verificationStatus}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal/60">
                    Structural suitability has not been certified. MATERRA supports nonstructural designs only.
                  </p>
                </div>

                {/* Damage Regions */}
                {material.damageRegions.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-charcoal/70 mb-2 uppercase">
                      {material.damageRegions.length} Damage region(s)
                    </h4>
                    <div className="space-y-2">
                      {material.damageRegions.map((damage) => (
                        <div key={damage.id} className="bg-red-50 rounded p-2 text-xs">
                          <span className="font-bold capitalize">{damage.severity}:</span> {damage.description || 'Marked region'}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 btn-secondary text-sm flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Passport
                  </button>
                  <button className="flex-1 btn-primary text-sm flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
