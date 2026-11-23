import { useProjectStore } from '@/stores/projectStore'
import { formatDistanceToNow } from 'date-fns'
import { Trash2, Copy, Eye } from 'lucide-react'

export const Designs = () => {
  const { projects, deleteProject, loadProject } = useProjectStore()

  if (projects.length === 0) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl font-bold text-forest mb-4">Design Explorer</h1>
          <p className="text-charcoal/70 text-lg">No designs yet. Create one in the Studio.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="font-serif text-4xl font-bold text-forest mb-2">Design Explorer</h1>
        <p className="text-charcoal/70 mb-12">{projects.length} design(s) in your project</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Preview Placeholder */}
              <div className="h-40 bg-gradient-to-br from-timber/20 to-terracotta/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📐</div>
                  <p className="text-sm text-charcoal/60">
                    {project.selectedTemplate.name}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-forest mb-2">
                  {project.name}
                </h3>
                <p className="text-sm text-charcoal/60 mb-4">
                  Created {formatDistanceToNow(project.createdAt, { addSuffix: true })}
                </p>

                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-charcoal/70 font-bold uppercase mb-1">Materials</div>
                      <div className="font-mono text-charcoal">{project.materials.length}</div>
                    </div>
                    <div>
                      <div className="text-xs text-charcoal/70 font-bold uppercase mb-1">Status</div>
                      <div className="font-mono text-charcoal">
                        {project.optimization?.status === 'feasible' ? '✓ Feasible' : 'Draft'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => loadProject(project.id)}
                    className="flex-1 btn-primary text-sm flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Open
                  </button>
                  <button className="btn-icon">
                    <Copy className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="btn-icon text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-5 h-5" />
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
