import { useState } from 'react'
import { ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react'

type DemoStep = 1 | 2 | 3 | 4 | 5 | 6 | 7

export const Demo = () => {
  const [currentStep, setCurrentStep] = useState<DemoStep>(1)

  const steps = [
    {
      number: 1,
      title: 'Discover',
      description: 'Inspect reclaimed timber stock and material properties',
      icon: '🔍',
    },
    {
      number: 2,
      title: 'Trust',
      description: 'Review the material passport with verification status',
      icon: '✓',
    },
    {
      number: 3,
      title: 'Design',
      description: 'Generate an optimized cutting layout for your product',
      icon: '📐',
    },
    {
      number: 4,
      title: 'Disrupt',
      description: 'Mark a region as damaged on the material',
      icon: '⚠️',
    },
    {
      number: 5,
      title: 'Regenerate',
      description: 'Watch the solver adapt the layout around the damage',
      icon: '♻️',
    },
    {
      number: 6,
      title: 'Evaluate',
      description: 'Compare environmental impact scenarios',
      icon: '📊',
    },
    {
      number: 7,
      title: 'Reveal',
      description: 'Export the complete design evidence report',
      icon: '📄',
    },
  ]

  const currentData = steps[currentStep - 1]

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest to-charcoal text-ivory">
      {/* Progress Indicators */}
      <div className="border-b border-ivory/10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            {steps.map((step, i) => (
              <div key={step.number} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(step.number as DemoStep)}
                  className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-colors ${
                    step.number <= currentStep
                      ? 'bg-ivory text-forest'
                      : 'bg-ivory/20 text-ivory hover:bg-ivory/30'
                  }`}
                >
                  {step.number}
                </button>
                {i < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-colors ${
                      step.number < currentStep ? 'bg-ivory' : 'bg-ivory/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Left: Content */}
          <div className="lg:col-span-2">
            <div className="text-6xl mb-6">{currentData.icon}</div>
            <h1 className="font-serif text-5xl font-bold mb-4">{currentData.title}</h1>
            <p className="text-xl text-ivory/80 mb-8 leading-relaxed">
              {currentData.description}
            </p>

            {/* Step-specific content */}
            {currentStep === 1 && (
              <div className="bg-ivory/10 rounded-lg p-8 border border-ivory/20 backdrop-blur">
                <h3 className="font-serif text-2xl font-bold mb-4">Sample Material</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-ivory/70">Dimensions:</span>
                    <span className="font-mono font-bold">1200 × 600 × 18 mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/70">Source:</span>
                    <span className="font-mono font-bold">Site Decommission</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/70">Condition:</span>
                    <span className="font-mono font-bold">Good - Minor wear</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/70">Mass:</span>
                    <span className="font-mono font-bold">8.5 kg</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-ivory/10 rounded-lg p-8 border border-ivory/20 backdrop-blur">
                <h3 className="font-serif text-2xl font-bold mb-4">Material Passport #P-001</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-400 rounded-full" />
                    <span>PHOTO-SUPPORTED verification</span>
                  </div>
                  <p className="text-sm text-ivory/70">
                    This material has been verified through photo documentation. Structural suitability has not been certified.
                    MATERRA MVP supports nonstructural designs only.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-ivory/10 rounded-lg p-8 border border-ivory/20 backdrop-blur">
                <h3 className="font-serif text-2xl font-bold mb-4">Desktop Organizer Design</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-ivory/70">Components:</span>
                    <span className="font-bold">6/6 placed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/70">Material Utilization:</span>
                    <span className="font-bold">82.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/70">Solver Runtime:</span>
                    <span className="font-mono">0.23 s</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="bg-red-500/20 rounded-lg p-8 border border-red-400/50 backdrop-blur">
                <h3 className="font-serif text-2xl font-bold mb-4">Damage Marked</h3>
                <p className="text-ivory/80 mb-4">
                  A damaged region has been marked on the material. This area is now excluded from component placement.
                </p>
                <div className="bg-red-600/40 rounded px-4 py-3 text-sm">
                  Rectangular damage: 300×250 mm at position 200,100
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="bg-green-500/20 rounded-lg p-8 border border-green-400/50 backdrop-blur">
                <h3 className="font-serif text-2xl font-bold mb-4">Layout Regenerated</h3>
                <div className="space-y-4">
                  <p className="text-ivory/80">
                    The solver has recomputed the layout, avoiding the damaged region.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-ivory/70">Components still placed:</span>
                      <span className="font-bold">6/6</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ivory/70">New utilization:</span>
                      <span className="font-bold">71.2% (↓ 11.2%)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="bg-cyan-500/20 rounded-lg p-8 border border-cyan-400/50 backdrop-blur">
                <h3 className="font-serif text-2xl font-bold mb-4">Environmental Comparison</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-ivory/70">New material:</span>
                    <span className="font-bold">42.8 kg CO2e</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">Reclaimed material:</span>
                    <span className="font-bold">23.1 kg CO2e</span>
                  </div>
                  <div className="border-t border-ivory/20 pt-4 mt-4 flex justify-between">
                    <span className="text-ivory/70">Improvement:</span>
                    <span className="font-bold">↓ 46.0%</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="bg-indigo-500/20 rounded-lg p-8 border border-indigo-400/50 backdrop-blur">
                <h3 className="font-serif text-2xl font-bold mb-4">Export Evidence Report</h3>
                <p className="text-ivory/80 mb-4">
                  A complete report has been generated with all project details, optimization results, and environmental assumptions.
                </p>
                <button className="bg-ivory text-forest px-6 py-3 rounded font-bold hover:bg-citron transition-colors">
                  Download Report.pdf
                </button>
              </div>
            )}
          </div>

          {/* Right: Preview */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 rounded-lg p-8 border border-ivory/20 backdrop-blur sticky top-20">
              <h3 className="font-serif text-lg font-bold mb-6">3D Product Preview</h3>
              <div className="bg-gradient-to-br from-ivory/20 to-timber/20 rounded-lg aspect-square flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-6xl mb-3">📦</div>
                  <p className="text-sm text-ivory/60">Desktop Organizer</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <input type="radio" id="rotate" name="view" defaultChecked className="w-4 h-4" />
                  <label htmlFor="rotate">Rotate</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" id="zoom" name="view" className="w-4 h-4" />
                  <label htmlFor="zoom">Zoom</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" id="exploded" name="view" className="w-4 h-4" />
                  <label htmlFor="exploded">Exploded</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-6">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1) as DemoStep)}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 bg-ivory/10 hover:bg-ivory/20 disabled:opacity-50 disabled:cursor-not-allowed rounded font-semibold transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={() => setCurrentStep(1)}
            className="flex items-center gap-2 px-6 py-3 bg-ivory/10 hover:bg-ivory/20 rounded font-semibold transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>

          <button
            onClick={() => setCurrentStep(Math.min(7, currentStep + 1) as DemoStep)}
            disabled={currentStep === 7}
            className="flex items-center gap-2 px-6 py-3 bg-ivory hover:bg-citron text-forest rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
