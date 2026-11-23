import { OptimizationResult } from '@/types'

interface Props {
  result: OptimizationResult
}

export const CuttingLayoutCanvas = ({ result }: Props) => {
  if (result.layouts.length === 0) {
    return (
      <div className="text-center text-charcoal/50">
        <p className="text-sm">No layouts generated</p>
      </div>
    )
  }

  const layout = result.layouts[0]
  const material = layout.material

  // SVG dimensions
  const scale = 0.3 // pixels per mm
  const width = material.width * scale
  const height = material.height * scale
  const padding = 20

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <svg
        width={width + padding * 2}
        height={height + padding * 2}
        viewBox={`0 0 ${width + padding * 2} ${height + padding * 2}`}
        className="bg-white rounded"
      >
        {/* Material outline */}
        <rect
          x={padding}
          y={padding}
          width={width}
          height={height}
          fill="#F6EEDF"
          stroke="#193F36"
          strokeWidth={2}
        />

        {/* Damage regions */}
        {material.damageRegions.map((damage, i) => (
          <rect
            key={`damage-${i}`}
            x={padding + damage.x * scale}
            y={padding + damage.y * scale}
            width={damage.width * scale}
            height={damage.height * scale}
            fill="#E99A60"
            opacity={0.5}
            stroke="#E99A60"
            strokeWidth={1}
            strokeDasharray="4"
          />
        ))}

        {/* Components */}
        {layout.placedComponents.map((comp, i) => (
          <g key={`comp-${i}`}>
            <rect
              x={padding + comp.x * scale}
              y={padding + comp.y * scale}
              width={comp.width * scale}
              height={comp.height * scale}
              fill="#DCEB8A"
              stroke="#193F36"
              strokeWidth={1.5}
            />
            <text
              x={padding + (comp.x + comp.width / 2) * scale}
              y={padding + (comp.y + comp.height / 2) * scale}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fill="#193F36"
              fontWeight="bold"
              pointerEvents="none"
            >
              {comp.componentId}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-4 text-sm text-charcoal/70">
        <span className="font-mono">
          {layout.utilization.toFixed(1)}% utilization
        </span>
      </div>
    </div>
  )
}
