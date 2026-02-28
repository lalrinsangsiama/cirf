'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface DimensionInfo {
  name: string
  color: string
  description: string
  components: string[]
}

const dimensions: DimensionInfo[] = [
  {
    name: 'Resilience Capacities',
    color: '#1A78B8',
    description: 'The core capabilities that enable communities to respond to disruption',
    components: ['Absorptive Capacity', 'Adaptive Capacity', 'Transformative Capacity', 'Anticipatory Capacity'],
  },
  {
    name: 'Causal Mechanisms',
    color: '#19AB8B',
    description: 'The processes through which cultural innovation generates resilience',
    components: ['Symbolic Knowledge', 'Network Development', 'Capital Conversion', 'Institutional Innovation'],
  },
  {
    name: 'Contextual Mediators',
    color: '#8D62CE',
    description: 'Factors that shape how mechanisms operate in specific contexts',
    components: ['Governance Arrangements', 'Industrial Structure', 'Knowledge Ecology', 'Cultural Context'],
  },
  {
    name: 'Temporal Dynamics',
    color: '#F1B434',
    description: 'How resilience develops and evolves over time',
    components: ['Time Horizons', 'Development Trajectories', 'Feedback Dynamics', 'Phase Relationships'],
  },
  {
    name: 'Implementation Pathways',
    color: '#E05263',
    description: 'Strategic approaches for putting CIL into practice',
    components: ['Strategic Assessment', 'Intervention Design', 'Implementation Configurations', 'Evaluation Frameworks'],
  },
]

export function CILWheel() {
  const [selectedDimension, setSelectedDimension] = useState<DimensionInfo | null>(null)

  return (
    <div className="flex flex-col lg:flex-row items-center gap-12">
      {/* SVG Wheel */}
      <div className="flex-1 w-full max-w-[600px]">
        <svg viewBox="0 0 800 800" className="w-full h-auto">
          {/* Background */}
          <circle cx="400" cy="400" r="390" fill="#f8f9fa" stroke="#ddd" strokeWidth="1" />

          {/* Ring 5 - Implementation Pathways */}
          <circle
            cx="400"
            cy="400"
            r="390"
            fill="#E05263"
            opacity="0.9"
            className={cn('cursor-pointer transition-opacity', selectedDimension?.name === 'Implementation Pathways' && 'opacity-100')}
            onClick={() => setSelectedDimension(dimensions[4])}
          />
          <circle cx="400" cy="400" r="310" fill="#fff" />

          {/* Ring 4 - Temporal Dynamics */}
          <circle
            cx="400"
            cy="400"
            r="310"
            fill="#F1B434"
            opacity="0.9"
            className={cn('cursor-pointer transition-opacity', selectedDimension?.name === 'Temporal Dynamics' && 'opacity-100')}
            onClick={() => setSelectedDimension(dimensions[3])}
          />
          <circle cx="400" cy="400" r="240" fill="#fff" />

          {/* Ring 3 - Contextual Mediators */}
          <circle
            cx="400"
            cy="400"
            r="240"
            fill="#8D62CE"
            opacity="0.9"
            className={cn('cursor-pointer transition-opacity', selectedDimension?.name === 'Contextual Mediators' && 'opacity-100')}
            onClick={() => setSelectedDimension(dimensions[2])}
          />
          <circle cx="400" cy="400" r="180" fill="#fff" />

          {/* Ring 2 - Causal Mechanisms */}
          <circle
            cx="400"
            cy="400"
            r="180"
            fill="#19AB8B"
            opacity="0.9"
            className={cn('cursor-pointer transition-opacity', selectedDimension?.name === 'Causal Mechanisms' && 'opacity-100')}
            onClick={() => setSelectedDimension(dimensions[1])}
          />
          <circle cx="400" cy="400" r="120" fill="#fff" />

          {/* Ring 1 - Resilience Capacities */}
          <circle
            cx="400"
            cy="400"
            r="120"
            fill="#1A78B8"
            opacity="0.9"
            className={cn('cursor-pointer transition-opacity', selectedDimension?.name === 'Resilience Capacities' && 'opacity-100')}
            onClick={() => setSelectedDimension(dimensions[0])}
          />

          {/* Dividing lines */}
          <g stroke="#fff" strokeWidth="2">
            <line x1="400" y1="10" x2="400" y2="790" />
            <line x1="10" y1="400" x2="790" y2="400" />
          </g>

          {/* Center label */}
          <text x="400" y="400" textAnchor="middle" dominantBaseline="middle" fontSize="28" fontWeight="bold" fill="#0a0a0a">
            CIL
          </text>

          {/* Ring Labels */}
          {/* Ring 1 - Resilience Capacities */}
          <text x="340" y="340" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">Absorptive</text>
          <text x="460" y="340" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">Adaptive</text>
          <text x="340" y="470" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">Transformative</text>
          <text x="460" y="470" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">Anticipatory</text>

          {/* Ring 2 - Causal Mechanisms */}
          <text x="265" y="395" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Symbolic</text>
          <text x="265" y="407" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Knowledge</text>
          <text x="535" y="395" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Network</text>
          <text x="535" y="407" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Development</text>
          <text x="330" y="540" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Capital</text>
          <text x="330" y="552" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Conversion</text>
          <text x="470" y="540" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Institutional</text>
          <text x="470" y="552" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Innovation</text>

          {/* Ring 3 - Contextual Mediators */}
          <text x="205" y="325" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Governance</text>
          <text x="595" y="325" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Industrial</text>
          <text x="205" y="490" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Knowledge</text>
          <text x="595" y="490" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Cultural</text>

          {/* Ring 4 - Temporal Dynamics */}
          <text x="145" y="265" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Time</text>
          <text x="145" y="277" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Horizons</text>
          <text x="655" y="265" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Development</text>
          <text x="655" y="277" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Trajectories</text>
          <text x="145" y="545" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Feedback</text>
          <text x="145" y="557" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Dynamics</text>
          <text x="655" y="545" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Phase</text>
          <text x="655" y="557" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Relationships</text>

          {/* Ring 5 - Implementation Pathways */}
          <text x="95" y="205" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Strategic</text>
          <text x="95" y="217" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Assessment</text>
          <text x="705" y="205" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Intervention</text>
          <text x="705" y="217" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Design</text>
          <text x="95" y="605" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Implementation</text>
          <text x="95" y="617" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Configurations</text>
          <text x="705" y="605" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Evaluation</text>
          <text x="705" y="617" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Frameworks</text>
        </svg>
      </div>

      {/* Legend & Info Panel */}
      <div className="flex-1 max-w-[500px]">
        <h3 className="font-serif text-2xl mb-6">Framework Dimensions</h3>
        <p className="text-stone mb-8">
          Click on any ring to learn more about that dimension of the framework.
        </p>

        <div className="space-y-4">
          {dimensions.map((dim) => (
            <button
              key={dim.name}
              onClick={() => setSelectedDimension(dim)}
              className={cn(
                'w-full p-4 rounded-lg border text-left transition-all duration-300',
                selectedDimension?.name === dim.name
                  ? 'border-ink bg-sand'
                  : 'border-ink/10 hover:border-ink/30'
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: dim.color }}
                />
                <span className="font-medium">{dim.name}</span>
              </div>
              {selectedDimension?.name === dim.name && (
                <div className="mt-4 pt-4 border-t border-ink/10">
                  <p className="text-sm text-stone mb-4">{dim.description}</p>
                  <ul className="space-y-2">
                    {dim.components.map((comp) => (
                      <li key={comp} className="text-sm flex items-center gap-2">
                        <span className="text-gold">→</span>
                        {comp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
