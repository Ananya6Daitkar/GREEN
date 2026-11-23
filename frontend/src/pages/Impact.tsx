import { useState } from 'react'
import { EnvironmentalInput, EnvironmentalResult } from '@/types'
import { TrendingDown } from 'lucide-react'

const DEFAULT_INPUT: EnvironmentalInput = {
  transportDistance: 50,
  transportEmissionFactor: 0.12,
  materialMass: 5,
  processingEnergy: 0.8,
  electricityEmissionFactor: 0.233,
  newMaterialEmissionFactor: 0.5,
  disposalEmissionFactor: 0.1,
}

export const Impact = () => {
  const [inputs, setInputs] = useState<EnvironmentalInput>(DEFAULT_INPUT)
  const [result, setResult] = useState<EnvironmentalResult | null>(null)

  const calculateImpact = () => {
    // Scenario A: New material + disposal
    const newMaterialEmissions = inputs.materialMass * inputs.newMaterialEmissionFactor
    const disposalEmissions = inputs.materialMass * inputs.disposalEmissionFactor
    const scenarioA = {
      name: 'New Material',
      newMaterialEmissions,
      disposalEmissions,
      total: newMaterialEmissions + disposalEmissions,
    }

    // Scenario B: Reclaimed material
    const reclaimedTransportEmissions = inputs.materialMass * inputs.transportDistance * inputs.transportEmissionFactor
    const processingEmissions = inputs.processingEnergy * inputs.electricityEmissionFactor
    const cuttingWasteEmissions = inputs.materialMass * 0.05 * inputs.newMaterialEmissionFactor // 5% waste
    const scenarioB = {
      name: 'Reclaimed Material',
      reclaimedTransportEmissions,
      processingEmissions,
      cuttingWasteEmissions,
      total: reclaimedTransportEmissions + processingEmissions + cuttingWasteEmissions,
    }

    const difference = scenarioA.total - scenarioB.total
    const percentageImprovement = ((difference / scenarioA.total) * 100)

    setResult({
      scenarioA,
      scenarioB,
      difference,
      percentageImprovement,
    })
  }

  const handleInputChange = (key: keyof EnvironmentalInput, value: number) => {
    const newInputs = { ...inputs, [key]: value }
    setInputs(newInputs)
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="font-serif text-4xl font-bold text-forest mb-2">Environmental Intelligence</h1>
        <p className="text-charcoal/70 mb-12 text-lg">
          Compare the impact of reuse vs. new material with adjustable assumptions.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-ivory/30 border border-gray-200 rounded-lg p-6">
              <h3 className="font-serif font-bold text-lg text-forest mb-6">Assumptions (editable)</h3>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-charcoal/70 mb-2 block">
                    Transport distance (km)
                  </label>
                  <input
                    type="number"
                    value={inputs.transportDistance}
                    onChange={(e) => handleInputChange('transportDistance', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-charcoal/70 mb-2 block">
                    Transport emission factor (kg CO2e/km/kg)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={inputs.transportEmissionFactor}
                    onChange={(e) => handleInputChange('transportEmissionFactor', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-charcoal/70 mb-2 block">
                    Material mass (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.materialMass}
                    onChange={(e) => handleInputChange('materialMass', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-charcoal/70 mb-2 block">
                    Processing energy (kWh)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.processingEnergy}
                    onChange={(e) => handleInputChange('processingEnergy', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-charcoal/70 mb-2 block">
                    Electricity emission factor (kg CO2e/kWh)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={inputs.electricityEmissionFactor}
                    onChange={(e) => handleInputChange('electricityEmissionFactor', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-charcoal/70 mb-2 block">
                    New material factor (kg CO2e/kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.newMaterialEmissionFactor}
                    onChange={(e) => handleInputChange('newMaterialEmissionFactor', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>

                <button
                  onClick={calculateImpact}
                  className="w-full btn-primary py-3 font-bold"
                >
                  Calculate Impact
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {result ? (
              <div className="space-y-6">
                {/* Improvement Badge */}
                {result.percentageImprovement > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingDown className="w-6 h-6 text-green-600" />
                      <span className="font-bold text-green-700">↓ {result.percentageImprovement.toFixed(1)}% reduction</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Reclaimed material is environmentally better under these assumptions.
                    </p>
                  </div>
                )}

                {/* Scenario Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Scenario A */}
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-orange-200 rounded-lg p-6">
                    <h4 className="font-bold text-lg text-charcoal mb-4">{result.scenarioA.name}</h4>
                    <div className="space-y-3 mb-6 pb-6 border-b border-orange-200/50">
                      <div className="flex justify-between text-sm">
                        <span className="text-charcoal/70">New material</span>
                        <span className="font-mono font-bold text-charcoal">
                          {result.scenarioA.newMaterialEmissions.toFixed(2)} kg CO2e
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-charcoal/70">Disposal</span>
                        <span className="font-mono font-bold text-charcoal">
                          {result.scenarioA.disposalEmissions.toFixed(2)} kg CO2e
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-orange-700">
                      {result.scenarioA.total.toFixed(2)} kg CO2e
                    </div>
                  </div>

                  {/* Scenario B */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-bold text-lg text-charcoal mb-4">{result.scenarioB.name}</h4>
                    <div className="space-y-3 mb-6 pb-6 border-b border-green-200/50">
                      <div className="flex justify-between text-sm">
                        <span className="text-charcoal/70">Transport</span>
                        <span className="font-mono font-bold text-charcoal">
                          {result.scenarioB.reclaimedTransportEmissions.toFixed(2)} kg CO2e
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-charcoal/70">Processing</span>
                        <span className="font-mono font-bold text-charcoal">
                          {result.scenarioB.processingEmissions.toFixed(2)} kg CO2e
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-charcoal/70">Cutting waste</span>
                        <span className="font-mono font-bold text-charcoal">
                          {result.scenarioB.cuttingWasteEmissions.toFixed(2)} kg CO2e
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-green-700">
                      {result.scenarioB.total.toFixed(2)} kg CO2e
                    </div>
                  </div>
                </div>

                {/* Difference */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-sm text-charcoal/70 mb-2">Absolute difference</p>
                  <div className="text-3xl font-bold text-forest">
                    ↓ {result.difference.toFixed(2)} kg CO2e
                  </div>
                  <p className="text-xs text-charcoal/60 mt-4">
                    Scenario estimate — not a certified lifecycle assessment. All assumptions are illustrative.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <p className="text-charcoal/70 mb-4">Adjust assumptions and calculate impact</p>
                <p className="text-sm text-charcoal/50">Results will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
