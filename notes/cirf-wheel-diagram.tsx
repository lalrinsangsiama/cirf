const CIRFWheelDiagram = () => {
  // Framework data
  const dimensions = [
    {
      name: "Resilience Capacities",
      color: "#1A78B8",
      components: [
        "Absorptive Capacity",
        "Adaptive Capacity",
        "Transformative Capacity",
        "Anticipatory Capacity"
      ]
    },
    {
      name: "Causal Mechanisms",
      color: "#19AB8B",
      components: [
        "Symbolic Knowledge Mechanisms",
        "Network Development Mechanisms",
        "Capital Conversion Mechanisms",
        "Institutional Innovation Mechanisms"
      ]
    },
    {
      name: "Contextual Mediators",
      color: "#8D62CE",
      components: [
        "Governance Arrangements",
        "Industrial Structure",
        "Knowledge Ecology",
        "Cultural Context"
      ]
    },
    {
      name: "Temporal Dynamics",
      color: "#F1B434",
      components: [
        "Time Horizons",
        "Development Trajectories",
        "Feedback Dynamics",
        "Phase Relationships"
      ]
    },
    {
      name: "Implementation Pathways",
      color: "#E05263",
      components: [
        "Strategic Assessment",
        "Intervention Design",
        "Implementation Configurations",
        "Evaluation Frameworks"
      ]
    }
  ];

  // Render a static SVG version of the wheel
  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Enhanced Cultural Innovation Resilience Framework (CIRF)</h2>
      
      <svg width="800" height="800" viewBox="0 0 800 800">
        {/* Background circle */}
        <circle cx="400" cy="400" r="390" fill="#f8f9fa" stroke="#ddd" strokeWidth="1" />
        
        {/* Rings */}
        <g>
          {/* Ring 5 - Implementation Pathways */}
          <circle cx="400" cy="400" r="390" fill="#E05263" opacity="0.9" />
          <circle cx="400" cy="400" r="310" fill="#fff" />
          <text x="400" y="350" textAnchor="middle" fontSize="14" fontWeight="bold">Implementation Pathways</text>
          
          {/* Ring 4 - Temporal Dynamics */}
          <circle cx="400" cy="400" r="310" fill="#F1B434" opacity="0.9" />
          <circle cx="400" cy="400" r="240" fill="#fff" />
          <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="bold">Temporal Dynamics</text>
          
          {/* Ring 3 - Contextual Mediators */}
          <circle cx="400" cy="400" r="240" fill="#8D62CE" opacity="0.9" />
          <circle cx="400" cy="400" r="180" fill="#fff" />
          <text x="400" y="220" textAnchor="middle" fontSize="14" fontWeight="bold">Contextual Mediators</text>
          
          {/* Ring 2 - Causal Mechanisms */}
          <circle cx="400" cy="400" r="180" fill="#19AB8B" opacity="0.9" />
          <circle cx="400" cy="400" r="120" fill="#fff" />
          <text x="400" y="150" textAnchor="middle" fontSize="14" fontWeight="bold">Causal Mechanisms</text>
          
          {/* Ring 1 - Resilience Capacities */}
          <circle cx="400" cy="400" r="120" fill="#1A78B8" opacity="0.9" />
          <text x="400" y="80" textAnchor="middle" fontSize="14" fontWeight="bold">Resilience Capacities</text>
        </g>
        
        {/* Dividing lines for each ring to create segments */}
        <g stroke="#fff" strokeWidth="2">
          {/* Vertical line through center */}
          <line x1="400" y1="10" x2="400" y2="790" />
          {/* Horizontal line through center */}
          <line x1="10" y1="400" x2="790" y2="400" />
        </g>
        
        {/* Center label */}
        <text x="400" y="400" textAnchor="middle" dominantBaseline="middle" fontSize="24" fontWeight="bold">CIRF</text>
        
        {/* Ring 1 Labels - Resilience Capacities */}
        <text x="360" y="340" textAnchor="end" fontSize="12" fill="#fff" fontWeight="bold">Absorptive</text>
        <text x="360" y="360" textAnchor="end" fontSize="12" fill="#fff" fontWeight="bold">Capacity</text>
        
        <text x="440" y="340" textAnchor="start" fontSize="12" fill="#fff" fontWeight="bold">Adaptive</text>
        <text x="440" y="360" textAnchor="start" fontSize="12" fill="#fff" fontWeight="bold">Capacity</text>
        
        <text x="380" y="460" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold">Transformative</text>
        <text x="380" y="480" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold">Capacity</text>
        
        <text x="420" y="460" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold">Anticipatory</text>
        <text x="420" y="480" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold">Capacity</text>
        
        {/* Ring 2 Labels - Causal Mechanisms */}
        <text x="280" y="380" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Symbolic</text>
        <text x="280" y="395" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Knowledge</text>
        <text x="280" y="410" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Mechanisms</text>
        
        <text x="520" y="380" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Network</text>
        <text x="520" y="395" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Development</text>
        <text x="520" y="410" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Mechanisms</text>
        
        <text x="330" y="520" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Capital</text>
        <text x="330" y="535" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Conversion</text>
        <text x="330" y="550" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Mechanisms</text>
        
        <text x="470" y="520" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Institutional</text>
        <text x="470" y="535" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Innovation</text>
        <text x="470" y="550" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Mechanisms</text>
        
        {/* Ring 3 Labels - Contextual Mediators */}
        <text x="210" y="320" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Governance</text>
        <text x="210" y="335" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Arrangements</text>
        
        <text x="590" y="320" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Industrial</text>
        <text x="590" y="335" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Structure</text>
        
        <text x="210" y="480" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Knowledge</text>
        <text x="210" y="495" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Ecology</text>
        
        <text x="590" y="480" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Cultural</text>
        <text x="590" y="495" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Context</text>
        
        {/* Ring 4 Labels - Temporal Dynamics */}
        <text x="150" y="260" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Time</text>
        <text x="150" y="275" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Horizons</text>
        
        <text x="650" y="260" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Development</text>
        <text x="650" y="275" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Trajectories</text>
        
        <text x="150" y="540" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Feedback</text>
        <text x="150" y="555" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Dynamics</text>
        
        <text x="650" y="540" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Phase</text>
        <text x="650" y="555" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Relationships</text>
        
        {/* Ring 5 Labels - Implementation Pathways */}
        <text x="100" y="200" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Strategic</text>
        <text x="100" y="215" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Assessment</text>
        
        <text x="700" y="200" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Intervention</text>
        <text x="700" y="215" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Design</text>
        
        <text x="100" y="600" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Implementation</text>
        <text x="100" y="615" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Configurations</text>
        
        <text x="700" y="600" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Evaluation</text>
        <text x="700" y="615" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">Frameworks</text>
      </svg>
      
      <div className="mt-6 text-center max-w-2xl">
        <p className="text-gray-700">
          The Enhanced CIRF visualizes the five interconnected dimensions that capture the complex relationships 
          between cultural innovation and economic resilience. The innermost ring represents different resilience 
          capacities that cultural innovation helps develop, surrounded by the causal mechanisms, contextual 
          mediators, temporal dynamics, and implementation pathways that complete the framework.
        </p>
      </div>
    </div>
  );
};

export default CIRFWheelDiagram;