import { useState } from 'react'
import { Material } from '@/types'
import { X } from 'lucide-react'

interface Props {
  onAdd: (material: Material) => void
  onCancel: () => void
}

export const MaterialForm = ({ onAdd, onCancel }: Props) => {
  const [form, setForm] = useState({
    name: 'Reclaimed Panel',
    width: 1200,
    height: 600,
    thickness: 18,
    quantity: 1,
    condition: 'good' as const,
    source: 'Site Decommission',
    mass: 8.5,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const material: Material = {
      id: `mat_${Date.now()}`,
      name: form.name,
      width: form.width,
      height: form.height,
      thickness: form.thickness,
      quantity: form.quantity,
      condition: form.condition,
      source: form.source,
      damageRegions: [],
      verificationStatus: 'self-reported',
      lastUpdated: Date.now(),
      mass: form.mass,
    }

    onAdd(material)
  }

  return (
    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-96 overflow-y-auto relative">
      <button
        onClick={onCancel}
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded"
      >
        <X className="w-5 h-5" />
      </button>

      <h2 className="font-serif text-2xl font-bold text-forest mb-6">Add Material</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-bold text-charcoal/70 mb-2 block">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-bold text-charcoal/70 mb-1 block">Width (mm)</label>
            <input
              type="number"
              value={form.width}
              onChange={(e) => setForm({ ...form, width: parseFloat(e.target.value) })}
              className="w-full px-2 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-charcoal/70 mb-1 block">Height (mm)</label>
            <input
              type="number"
              value={form.height}
              onChange={(e) => setForm({ ...form, height: parseFloat(e.target.value) })}
              className="w-full px-2 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-charcoal/70 mb-1 block">Thickness (mm)</label>
            <input
              type="number"
              value={form.thickness}
              onChange={(e) => setForm({ ...form, thickness: parseFloat(e.target.value) })}
              className="w-full px-2 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-charcoal/70 mb-2 block">Condition</label>
          <select
            value={form.condition}
            onChange={(e) => setForm({ ...form, condition: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="damaged">Damaged</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-bold text-charcoal/70 mb-2 block">Source</label>
          <input
            type="text"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-charcoal/70 mb-2 block">Mass (kg)</label>
          <input
            type="number"
            step="0.1"
            value={form.mass}
            onChange={(e) => setForm({ ...form, mass: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full btn-primary py-3 font-bold"
        >
          Add Material
        </button>
      </form>
    </div>
  )
}
