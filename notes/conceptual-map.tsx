import React, { useState } from 'react';

const ConceptualMap = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedRelationship, setSelectedRelationship] = useState(null);
  
  // Define node types
  const innovationTypes = [
    {
      id: "aesthetic",
      label: "Aesthetic Innovation",
      color: "#E7715C",
      description: "Innovation in visual, auditory, or other sensory elements that change how cultural offerings look, sound, or feel.",
      examples: ["Design innovation", "Visual arts experimentation", "Musical innovation", "Sensory experience creation"]
    },
    {
      id: "symbolic",
      label: "Symbolic Innovation",
      color: "#5C9EE7",
      description: "Innovation in meanings, narratives, or interpretive frameworks that change how cultural offerings are understood.",
      examples: ["Narrative innovation", "Identity reimagining", "Meaning reframing", "Symbolic recombination"]
    },
    {
      id: "process",
      label: "Process Innovation",
      color: "#7ABD67",
      description: "Innovation in methods, practices, or production approaches that change how cultural offerings are created.",
      examples: ["Collaborative creation methods", "Digital production techniques", "Co-creation approaches", "Distributed production models"]
    },
    {
      id: "business",
      label: "Business Model Innovation",
      color: "#AF7ED5",
      description: "Innovation in value creation, capture, or delivery approaches that change how cultural offerings generate sustainable resources.",
      examples: ["Platform-based models", "Subscription approaches", "Community-supported frameworks", "Hybrid value models"]
    },
    {
      id: "social",
      label: "Social Innovation",
      color: "#E9B649",
      description: "Innovation in social relationships, community engagement, or collaborative structures that change how cultural offerings connect people.",
      examples: ["Participatory frameworks", "Community knowledge networks", "Cultural democracy approaches", "Collective creation structures"]
    }
  ];
  
  const resilienceDimensions = [
    {
      id: "absorptive",
      label: "Absorptive Capacity",
      color: "#1A78B8",
      description: "The ability to withstand initial disruption impacts without fundamental failure.",
      examples: ["Diversity enhancement", "Identity resources", "Experience value creation", "Meaning preservation"]
    },
    {
      id: "adaptive",
      label: "Adaptive Capacity",
      color: "#19AB8B",
      description: "The ability to adjust configurations in response to changing conditions.",
      examples: ["Recombinant innovation", "Creative problem-solving", "Experimental practices", "Symbolic reframing"]
    },
    {
      id: "transformative",
      label: "Transformative Capacity",
      color: "#8D62CE",
      description: "The ability to fundamentally reconfigure when existing patterns become unviable.",
      examples: ["Radical reimagining", "Identity transition support", "Prefigurative practice", "Value pluralism"]
    },
    {
      id: "anticipatory",
      label: "Anticipatory Capacity",
      color: "#F1B434",
      description: "The ability to prepare for future disruptions before they occur.",
      examples: ["Future sensing", "Scenario development", "Imagination expansion", "Flexible planning"]
    }
  ];
  
  // Define relationships between innovation types and resilience dimensions
  const relationships = [
    {
      source: "aesthetic",
      target: "absorptive",
      strength: 2, // 1-3 scale, 3 being strongest
      description: "Aesthetic innovation enhances absorptive capacity by maintaining distinctive value during disruption through sensory experiences that remain attractive despite economic contraction."
    },
    {
      source: "aesthetic",
      target: "adaptive",
      strength: 3,
      description: "Aesthetic innovation strongly contributes to adaptive capacity by providing flexible sensory languages that can be rapidly reconfigured to address changing conditions and consumer preferences."
    },
    {
      source: "aesthetic",
      target: "transformative",
      strength: 2,
      description: "Aesthetic innovation supports transformative capacity by creating new sensory possibilities that expand the imaginable space for fundamental reconfiguration during major transitions."
    },
    {
      source: "aesthetic",
      target: "anticipatory",
      strength: 1,
      description: "Aesthetic innovation has a moderate contribution to anticipatory capacity through creating speculative designs and sensory experiences that help envision possible futures."
    },
    {
      source: "symbolic",
      target: "absorptive",
      strength: 3,
      description: "Symbolic innovation strongly enhances absorptive capacity by developing meaning frameworks that maintain coherence during disruption, helping stakeholders make sense of turbulent conditions."
    },
    {
      source: "symbolic",
      target: "adaptive",
      strength: 2,
      description: "Symbolic innovation contributes to adaptive capacity by enabling reframing of challenges as opportunities and creating narratives that support change processes."
    },
    {
      source: "symbolic",
      target: "transformative",
      strength: 3,
      description: "Symbolic innovation strongly enhances transformative capacity by developing new narratives and identity frameworks that enable reimagining fundamental economic configurations."
    },
    {
      source: "symbolic",
      target: "anticipatory",
      strength: 3,
      description: "Symbolic innovation significantly enhances anticipatory capacity through scenario development, future narratives, and conceptual models that help envision and prepare for potential futures."
    },
    {
      source: "process",
      target: "absorptive",
      strength: 2,
      description: "Process innovation contributes to absorptive capacity by creating more flexible production approaches that can maintain function despite resource constraints or disrupted supply chains."
    },
    {
      source: "process",
      target: "adaptive",
      strength: 3,
      description: "Process innovation strongly enhances adaptive capacity by developing agile methods, iterative approaches, and flexible production systems that enable rapid reconfiguration."
    },
    {
      source: "process",
      target: "transformative",
      strength: 2,
      description: "Process innovation supports transformative capacity by creating experimental production approaches that can develop and test fundamentally new economic configurations."
    },
    {
      source: "process",
      target: "anticipatory",
      strength: 2,
      description: "Process innovation enhances anticipatory capacity through developing prototyping methods, simulation approaches, and iterative testing that support preparation for potential futures."
    },
    {
      source: "business",
      target: "absorptive",
      strength: 3,
      description: "Business model innovation strongly contributes to absorptive capacity by developing diverse revenue streams, flexible pricing, and resource strategies that maintain viability during disruption."
    },
    {
      source: "business",
      target: "adaptive",
      strength: 2,
      description: "Business model innovation enhances adaptive capacity by creating flexible value capture approaches and reconfigurable delivery systems that can respond to changing market conditions."
    },
    {
      source: "business",
      target: "transformative",
      strength: 3,
      description: "Business model innovation significantly enhances transformative capacity by developing fundamentally new approaches to value creation, capture, and distribution during major economic transitions."
    },
    {
      source: "business",
      target: "anticipatory",
      strength: 2,
      description: "Business model innovation supports anticipatory capacity through developing scenario-based business planning, option-creating approaches, and future-oriented value propositions."
    },
    {
      source: "social",
      target: "absorptive",
      strength: 3,
      description: "Social innovation strongly enhances absorptive capacity by creating community support systems, resource sharing networks, and collective coping mechanisms that maintain function during disruption."
    },
    {
      source: "social",
      target: "adaptive",
      strength: 3,
      description: "Social innovation significantly contributes to adaptive capacity through developing collaborative problem-solving networks, knowledge sharing systems, and collective learning processes."
    },
    {
      source: "social",
      target: "transformative",
      strength: 2,
      description: "Social innovation supports transformative capacity by creating prefigurative social structures, experimental communities, and collaborative governance that model new economic possibilities."
    },
    {
      source: "social",
      target: "anticipatory",
      strength: 2,
      description: "Social innovation enhances anticipatory capacity through developing collective intelligence systems, distributed monitoring networks, and participatory foresight that prepare for emerging challenges."
    }
  ];
  
  // Calculate node positions
  const calculatePositions = () => {
    const width = 900;
    const height = 600;
    const innovationXStart = 150;
    const resilienceXStart = width - 150;
    const centerY = height / 2;
    
    const innovationPositions = {};
    const resiliencePositions = {};
    
    // Position innovation types on left
    innovationTypes.forEach((type, index) => {
      const y = centerY - (innovationTypes.length * 80) / 2 + index * 80;
      innovationPositions[type.id] = { x: innovationXStart, y };
    });
    
    // Position resilience dimensions on right
    resilienceDimensions.forEach((dimension, index) => {
      const y = centerY - (resilienceDimensions.length * 100) / 2 + index * 100;
      resiliencePositions[dimension.id] = { x: resilienceXStart, y };
    });
    
    return { innovationPositions, resiliencePositions };
  };
  
  const { innovationPositions, resiliencePositions } = calculatePositions();
  
  const handleNodeClick = (type, id) => {
    setSelectedNode({ type, id });
    setSelectedRelationship(null);
  };
  
  const handleRelationshipClick = (relationship) => {
    setSelectedRelationship(relationship);
    setSelectedNode(null);
  };
  
  // Get all relationships for a specific node
  const getRelationshipsForNode = (type, id) => {
    if (type === 'innovation') {
      return relationships.filter(rel => rel.source === id);
    } else {
      return relationships.filter(rel => rel.target === id);
    }
  };
  
  // Find a specific node by type and id
  const findNode = (type, id) => {
    if (type === 'innovation') {
      return innovationTypes.find(node => node.id === id);
    } else {
      return resilienceDimensions.find(node => node.id === id);
    }
  };
  
  // Render the selected information panel
  const renderInfoPanel = () => {
    if (selectedNode) {
      const node = findNode(
        selectedNode.type === 'innovation' ? 'innovation' : 'resilience', 
        selectedNode.id
      );
      
      const nodeRelationships = getRelationshipsForNode(
        selectedNode.type === 'innovation' ? 'innovation' : 'resilience',
        selectedNode.id
      );
      
      return (
        <div className="info-panel bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-2" style={{ color: node.color }}>{node.label}</h3>
          <p className="text-gray-700 mb-4">{node.description}</p>
          
          <div className="mb-4">
            <h4 className="font-bold mb-1">Key Elements:</h4>
            <ul className="list-disc pl-6">
              {node.examples.map((example, i) => (
                <li key={i} className="text-gray-700">{example}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-1">
              {selectedNode.type === 'innovation' 
                ? 'Contributions to Resilience Capacities:' 
                : 'Supported by Cultural Innovation Types:'}
            </h4>
            <ul className="mt-2">
              {nodeRelationships.map((rel, i) => {
                const relatedNode = selectedNode.type === 'innovation'
                  ? resilienceDimensions.find(n => n.id === rel.target)
                  : innovationTypes.find(n => n.id === rel.source);
                
                return (
                  <li 
                    key={i} 
                    className="mb-2 p-2 rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => handleRelationshipClick(rel)}
                  >
                    <div className="flex items-center mb-1">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: relatedNode.color }}
                      ></div>
                      <span className="font-semibold">{relatedNode.label}</span>
                      <div className="ml-2 flex">
                        {Array.from({ length: rel.strength }).map((_, i) => (
                          <div 
                            key={i} 
                            className="w-2 h-2 bg-gray-400 rounded-full ml-1"
                          ></div>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }
    
    if (selectedRelationship) {
      const sourceNode = innovationTypes.find(n => n.id === selectedRelationship.source);
      const targetNode = resilienceDimensions.find(n => n.id === selectedRelationship.target);
      
      return (
        <div className="info-panel bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-2">Relationship</h3>
          <div className="flex items-center mb-4">
            <div 
              className="px-3 py-1 rounded-full text-white text-sm font-semibold mr-2"
              style={{ backgroundColor: sourceNode.color }}
            >
              {sourceNode.label}
            </div>
            <svg width="20" height="10">
              <line x1="0" y1="5" x2="20" y2="5" stroke="#666" strokeWidth="2" />
              <polygon points="15,2 20,5 15,8" fill="#666" />
            </svg>
            <div 
              className="px-3 py-1 rounded-full text-white text-sm font-semibold ml-2"
              style={{ backgroundColor: targetNode.color }}
            >
              {targetNode.label}
            </div>
          </div>
          
          <div className="mb-2">
            <span className="font-semibold">Strength: </span>
            <div className="inline-flex ml-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-4 h-4 mx-1 rounded-full ${
                    i < selectedRelationship.strength ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>
          
          <p className="text-gray-700">{selectedRelationship.description}</p>
        </div>
      );
    }
    
    return (
      <div className="info-panel bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold mb-2">Cultural Innovation & Resilience Relationships</h3>
        <p className="text-gray-700">
          This conceptual map visualizes the relationships between different types of cultural innovation 
          and the four resilience capacities in the CIRF framework. Click on any node or connection to 
          explore specific relationships and contributions.
        </p>
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-sm">
            <span className="font-semibold">Connection strength indicators:</span>
            <span className="ml-2 inline-flex items-center">
              <span className="mr-1">Strong</span>
              <div className="w-3 h-3 bg-gray-700 rounded-full mx-1"></div>
              <div className="w-3 h-3 bg-gray-700 rounded-full mx-1"></div>
              <div className="w-3 h-3 bg-gray-700 rounded-full mx-1"></div>
            </span>
            <span className="ml-4 inline-flex items-center">
              <span className="mr-1">Medium</span>
              <div className="w-3 h-3 bg-gray-700 rounded-full mx-1"></div>
              <div className="w-3 h-3 bg-gray-700 rounded-full mx-1"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full mx-1"></div>
            </span>
            <span className="ml-4 inline-flex items-center">
              <span className="mr-1">Moderate</span>
              <div className="w-3 h-3 bg-gray-700 rounded-full mx-1"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full mx-1"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full mx-1"></div>
            </span>
          </p>
        </div>
      </div>
    );
  };
  
  // Draw the relationship lines
  const renderRelationships = () => {
    return relationships.map((rel, index) => {
      const sourcePos = innovationPositions[rel.source];
      const targetPos = resiliencePositions[rel.target];
      
      // Calculate control points for curved lines
      const midX = (sourcePos.x + targetPos.x) / 2;
      
      // Adjust curvature based on relationship index
      const curveOffset = 20 * (index % 3 - 1);
      
      const pathData = `M ${sourcePos.x} ${sourcePos.y} C ${midX + curveOffset} ${sourcePos.y}, ${midX + curveOffset} ${targetPos.y}, ${targetPos.x} ${targetPos.y}`;
      
      const isHighlighted = selectedNode 
        ? (selectedNode.type === 'innovation' && selectedNode.id === rel.source) ||
          (selectedNode.type === 'resilience' && selectedNode.id === rel.target)
        : selectedRelationship === rel;
      
      // Style based on strength
      let strokeWidth = 1 + rel.strength;
      let strokeOpacity = isHighlighted ? 1 : 0.4;
      
      const sourceNode = innovationTypes.find(n => n.id === rel.source);
      
      return (
        <g 
          key={`${rel.source}-${rel.target}`} 
          onClick={() => handleRelationshipClick(rel)}
          style={{ cursor: 'pointer' }}
        >
          <path 
            d={pathData} 
            stroke={sourceNode.color}
            strokeWidth={strokeWidth} 
            fill="none" 
            opacity={strokeOpacity}
          />
          
          {/* Strength indicators */}
          {isHighlighted && Array.from({ length: rel.strength }).map((_, i) => {
            const t = 0.6 + (i * 0.1); // Position along the path
            const pointX = sourcePos.x * (1-t) + targetPos.x * t;
            const pointY = sourcePos.y * (1-t) + targetPos.y * t;
            
            return (
              <circle 
                key={i} 
                cx={pointX} 
                cy={pointY} 
                r={3} 
                fill={sourceNode.color} 
              />
            );
          })}
        </g>
      );
    });
  };
  
  // Render innovation type nodes
  const renderInnovationNodes = () => {
    return innovationTypes.map(type => {
      const pos = innovationPositions[type.id];
      const isSelected = selectedNode && selectedNode.type === 'innovation' && selectedNode.id === type.id;
      
      return (
        <g 
          key={type.id}
          onClick={() => handleNodeClick('innovation', type.id)}
          style={{ cursor: 'pointer' }}
        >
          <circle 
            cx={pos.x} 
            cy={pos.y} 
            r={40} 
            fill={type.color} 
            opacity={isSelected || !selectedNode ? 1 : 0.5}
            stroke={isSelected ? "#333" : "none"}
            strokeWidth={isSelected ? 2 : 0}
          />
          <text 
            x={pos.x} 
            y={pos.y} 
            textAnchor="middle" 
            dominantBaseline="middle" 
            fill="white"
            fontWeight="bold"
            fontSize="12px"
          >
            {type.label.split(' ').map((word, i, arr) => (
              <tspan
                key={i}
                x={pos.x}
                dy={i === 0 ? '-0.5em' : '1.2em'}
                textAnchor="middle"
              >
                {word}
              </tspan>
            ))}
          </text>
        </g>
      );
    });
  };
  
  // Render resilience dimension nodes
  const renderResilienceNodes = () => {
    return resilienceDimensions.map(dimension => {
      const pos = resiliencePositions[dimension.id];
      const isSelected = selectedNode && selectedNode.type === 'resilience' && selectedNode.id === dimension.id;
      
      return (
        <g 
          key={dimension.id}
          onClick={() => handleNodeClick('resilience', dimension.id)}
          style={{ cursor: 'pointer' }}
        >
          <circle 
            cx={pos.x} 
            cy={pos.y} 
            r={45} 
            fill={dimension.color} 
            opacity={isSelected || !selectedNode ? 1 : 0.5}
            stroke={isSelected ? "#333" : "none"}
            strokeWidth={isSelected ? 2 : 0}
          />
          <text 
            x={pos.x} 
            y={pos.y} 
            textAnchor="middle" 
            dominantBaseline="middle" 
            fill="white"
            fontWeight="bold"
            fontSize="12px"
          >
            {dimension.label.split(' ').map((word, i, arr) => (
              <tspan
                key={i}
                x={pos.x}
                dy={i === 0 ? '-0.5em' : '1.2em'}
                textAnchor="middle"
              >
                {word}
              </tspan>
            ))}
          </text>
        </g>
      );
    });
  };
  
  return (
    <div className="conceptual-map p-4">
      <h2 className="text-2xl font-bold mb-2 text-center">Cultural Innovation & Resilience Capacity Relationships</h2>
      <p className="text-center text-gray-600 mb-6">
        Exploring how different types of cultural innovation contribute to various resilience capacities
      </p>
      
      {renderInfoPanel()}
      
      <div className="map-container bg-white rounded-lg shadow-lg p-4 overflow-hidden">
        <svg width="900" height="600" viewBox="0 0 900 600">
          {/* Column labels */}
          <text x="150" y="40" textAnchor="middle" fontWeight="bold" fontSize="16">Cultural Innovation Types</text>
          <text x="750" y="40" textAnchor="middle" fontWeight="bold" fontSize="16">Resilience Capacities</text>
          
          {/* Draw relationships first so they appear behind nodes */}
          {renderRelationships()}
          
          {/* Draw nodes on top of relationships */}
          {renderInnovationNodes()}
          {renderResilienceNodes()}
        </svg>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          This conceptual map visualizes the relationships between different types of cultural innovation and the 
          resilience capacities they enhance. The strength of each relationship is indicated by line thickness and 
          the number of connection points, with thicker lines representing stronger relationships.
        </p>
      </div>
    </div>
  );
};

export default ConceptualMap;