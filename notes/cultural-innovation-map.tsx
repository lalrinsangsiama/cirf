import React, { useState } from 'react';

const CulturalInnovationMap = () => {
  const [activeLayer, setActiveLayer] = useState('assets');
  const [activeRegion, setActiveRegion] = useState(null);
  
  // Toggle active region when clicked
  const handleRegionClick = (region) => {
    setActiveRegion(activeRegion === region ? null : region);
  };
  
  // Layer control buttons
  const renderLayerControls = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      <button 
        className={`px-3 py-1 rounded-full text-sm font-medium ${activeLayer === 'assets' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => setActiveLayer('assets')}
      >
        Cultural Assets
      </button>
      <button 
        className={`px-3 py-1 rounded-full text-sm font-medium ${activeLayer === 'networks' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => setActiveLayer('networks')}
      >
        Innovation Networks
      </button>
      <button 
        className={`px-3 py-1 rounded-full text-sm font-medium ${activeLayer === 'resilience' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => setActiveLayer('resilience')}
      >
        Resilience Capacities
      </button>
      <button 
        className={`px-3 py-1 rounded-full text-sm font-medium ${activeLayer === 'mechanisms' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => setActiveLayer('mechanisms')}
      >
        Innovation Mechanisms
      </button>
    </div>
  );
  
  // Map legend based on active layer
  const renderLegend = () => {
    if (activeLayer === 'assets') {
      return (
        <div className="p-3 bg-white rounded-lg shadow-md">
          <h3 className="font-medium text-gray-900 mb-2">Cultural Assets</h3>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-sm">Heritage Sites</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-sm">Creative Studios</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-sm">Performance Venues</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            <span className="text-sm">Innovation Hubs</span>
          </div>
        </div>
      );
    }
    else if (activeLayer === 'networks') {
      return (
        <div className="p-3 bg-white rounded-lg shadow-md">
          <h3 className="font-medium text-gray-900 mb-2">Innovation Networks</h3>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1 w-6 bg-blue-500"></div>
            <span className="text-sm">Knowledge Flows</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1 w-6 bg-green-500"></div>
            <span className="text-sm">Resource Sharing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1 w-6 bg-purple-500"></div>
            <span className="text-sm">Collaborative Projects</span>
          </div>
          <div className="text-xs text-gray-500 mt-2">Line thickness indicates connection strength</div>
        </div>
      );
    }
    else if (activeLayer === 'resilience') {
      return (
        <div className="p-3 bg-white rounded-lg shadow-md">
          <h3 className="font-medium text-gray-900 mb-2">Resilience Capacities</h3>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 bg-amber-400"></div>
            <span className="text-sm">Absorptive Capacity</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 bg-emerald-400"></div>
            <span className="text-sm">Adaptive Capacity</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 bg-blue-400"></div>
            <span className="text-sm">Transformative Capacity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-violet-400"></div>
            <span className="text-sm">Anticipatory Capacity</span>
          </div>
        </div>
      );
    }
    else if (activeLayer === 'mechanisms') {
      return (
        <div className="p-3 bg-white rounded-lg shadow-md">
          <h3 className="font-medium text-gray-900 mb-2">Innovation Mechanisms</h3>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 bg-pink-400 rounded-sm"></div>
            <span className="text-sm">Symbolic Knowledge</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 bg-cyan-400 rounded-sm"></div>
            <span className="text-sm">Network Development</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 bg-amber-400 rounded-sm"></div>
            <span className="text-sm">Capital Conversion</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-lime-400 rounded-sm"></div>
            <span className="text-sm">Institutional Innovation</span>
          </div>
        </div>
      );
    }
  };

  // Main SVG map component
  const renderMap = () => {
    return (
      <div className="relative bg-gray-100 rounded-lg w-full h-96 overflow-hidden">
        {/* Simplified map with regions */}
        <svg width="100%" height="100%" viewBox="0 0 800 600">
          {/* Base map with regions */}
          <g>
            {/* Urban Core */}
            <path 
              d="M350,250 C350,200 400,150 450,150 C500,150 550,200 550,250 C550,300 500,350 450,350 C400,350 350,300 350,250 Z" 
              fill={activeRegion === 'urban' ? '#d1d5db' : '#e5e7eb'} 
              stroke="#6b7280" 
              strokeWidth="2"
              onClick={() => handleRegionClick('urban')} 
              style={{cursor: 'pointer'}}
            />
            
            {/* Cultural Quarter */}
            <path 
              d="M450,150 C480,150 510,140 520,120 C530,100 530,80 510,60 C490,40 460,40 430,60 C400,80 400,100 410,120 C420,140 430,150 450,150 Z" 
              fill={activeRegion === 'cultural' ? '#d1d5db' : '#e5e7eb'} 
              stroke="#6b7280" 
              strokeWidth="2"
              onClick={() => handleRegionClick('cultural')} 
              style={{cursor: 'pointer'}}
            />
            
            {/* Industrial Zone */}
            <path 
              d="M350,250 C320,230 300,200 280,180 C260,160 240,150 210,150 C180,150 150,170 130,200 C110,230 110,270 130,300 C150,330 180,350 210,350 C240,350 260,340 280,320 C300,300 320,270 350,250 Z" 
              fill={activeRegion === 'industrial' ? '#d1d5db' : '#e5e7eb'} 
              stroke="#6b7280" 
              strokeWidth="2"
              onClick={() => handleRegionClick('industrial')} 
              style={{cursor: 'pointer'}}
            />
            
            {/* Suburban Area */}
            <path 
              d="M550,250 C580,230 600,200 620,180 C640,160 660,150 690,150 C720,150 750,170 770,200 C790,230 790,270 770,300 C750,330 720,350 690,350 C660,350 640,340 620,320 C600,300 580,270 550,250 Z" 
              fill={activeRegion === 'suburban' ? '#d1d5db' : '#e5e7eb'} 
              stroke="#6b7280" 
              strokeWidth="2" 
              onClick={() => handleRegionClick('suburban')} 
              style={{cursor: 'pointer'}}
            />
            
            {/* Rural Periphery */}
            <path 
              d="M450,350 C480,370 500,400 520,430 C540,460 550,490 550,520 C550,550 530,570 500,570 C470,570 430,570 400,570 C370,570 350,550 350,520 C350,490 360,460 380,430 C400,400 430,370 450,350 Z" 
              fill={activeRegion === 'rural' ? '#d1d5db' : '#e5e7eb'} 
              stroke="#6b7280" 
              strokeWidth="2" 
              onClick={() => handleRegionClick('rural')} 
              style={{cursor: 'pointer'}}
            />
            
            {/* Region labels */}
            <text x="450" y="250" textAnchor="middle" fill="#4b5563" fontSize="10" fontWeight="bold">Urban Core</text>
            <text x="450" y="100" textAnchor="middle" fill="#4b5563" fontSize="10" fontWeight="bold">Cultural Quarter</text>
            <text x="200" y="250" textAnchor="middle" fill="#4b5563" fontSize="10" fontWeight="bold">Industrial Zone</text>
            <text x="700" y="250" textAnchor="middle" fill="#4b5563" fontSize="10" fontWeight="bold">Suburban Area</text>
            <text x="450" y="500" textAnchor="middle" fill="#4b5563" fontSize="10" fontWeight="bold">Rural Periphery</text>
          </g>
          
          {/* Conditional overlays based on selected layer */}
          {activeLayer === 'assets' && (
            <g>
              {/* Urban Core assets */}
              <circle cx="420" cy="240" r="8" fill="#3b82f6" />
              <circle cx="460" cy="260" r="8" fill="#3b82f6" />
              <circle cx="440" cy="230" r="8" fill="#ef4444" />
              <circle cx="470" cy="230" r="8" fill="#10b981" />
              <circle cx="450" cy="270" r="8" fill="#8b5cf6" />
              
              {/* Cultural Quarter assets */}
              <circle cx="450" cy="90" r="8" fill="#ef4444" />
              <circle cx="430" cy="100" r="8" fill="#ef4444" />
              <circle cx="470" cy="100" r="8" fill="#10b981" />
              <circle cx="480" cy="80" r="8" fill="#10b981" />
              <circle cx="440" cy="70" r="8" fill="#8b5cf6" />
              
              {/* Industrial Zone assets */}
              <circle cx="200" cy="220" r="8" fill="#3b82f6" />
              <circle cx="220" cy="270" r="8" fill="#3b82f6" />
              <circle cx="180" cy="250" r="8" fill="#8b5cf6" />
              
              {/* Suburban assets */}
              <circle cx="680" cy="230" r="8" fill="#10b981" />
              <circle cx="710" cy="260" r="8" fill="#3b82f6" />
              <circle cx="690" cy="280" r="8" fill="#ef4444" />
              
              {/* Rural assets */}
              <circle cx="420" cy="480" r="8" fill="#ef4444" />
              <circle cx="460" cy="490" r="8" fill="#10b981" />
            </g>
          )}
          
          {activeLayer === 'networks' && (
            <g>
              {/* Knowledge flows */}
              <line x1="450" y1="100" x2="450" y2="250" stroke="#3b82f6" strokeWidth="3" />
              <line x1="450" y1="250" x2="200" y2="250" stroke="#3b82f6" strokeWidth="2" />
              <line x1="450" y1="250" x2="700" y2="250" stroke="#3b82f6" strokeWidth="1" />
              <line x1="450" y1="250" x2="450" y2="480" stroke="#3b82f6" strokeWidth="1" />
              
              {/* Resource sharing */}
              <line x1="440" y1="90" x2="200" y2="220" stroke="#10b981" strokeWidth="2" />
              <line x1="450" y1="250" x2="200" y2="250" stroke="#10b981" strokeWidth="2" />
              <line x1="460" y1="90" x2="700" y2="250" stroke="#10b981" strokeWidth="1" />
              
              {/* Collaborative projects */}
              <line x1="450" y1="100" x2="450" y2="250" stroke="#8b5cf6" strokeWidth="3" />
              <line x1="430" y1="100" x2="200" y2="240" stroke="#8b5cf6" strokeWidth="1" />
              <line x1="450" y1="250" x2="450" y2="480" stroke="#8b5cf6" strokeWidth="1" />
            </g>
          )}
          
          {activeLayer === 'resilience' && (
            <g>
              {/* Urban Core - Mixed strong capacities */}
              <rect x="400" y="200" width="100" height="100" fill="#10b981" fillOpacity="0.6" />
              <rect x="400" y="200" width="50" height="50" fill="#60a5fa" fillOpacity="0.6" />
              <rect x="450" y="250" width="50" height="50" fill="#a78bfa" fillOpacity="0.6" />
              
              {/* Cultural Quarter - Strong transformative */}
              <path 
                d="M450,150 C480,150 510,140 520,120 C530,100 530,80 510,60 C490,40 460,40 430,60 C400,80 400,100 410,120 C420,140 430,150 450,150 Z" 
                fill="#60a5fa" 
                fillOpacity="0.7" 
              />
              
              {/* Industrial Zone - Strong absorptive */}
              <path 
                d="M350,250 C320,230 300,200 280,180 C260,160 240,150 210,150 C180,150 150,170 130,200 C110,230 110,270 130,300 C150,330 180,350 210,350 C240,350 260,340 280,320 C300,300 320,270 350,250 Z" 
                fill="#fbbf24" 
                fillOpacity="0.7" 
              />
              
              {/* Suburban Area - Moderate adaptive */}
              <path 
                d="M550,250 C580,230 600,200 620,180 C640,160 660,150 690,150 C720,150 750,170 770,200 C790,230 790,270 770,300 C750,330 720,350 690,350 C660,350 640,340 620,320 C600,300 580,270 550,250 Z" 
                fill="#10b981" 
                fillOpacity="0.4" 
              />
              
              {/* Rural Periphery - Mixed weak */}
              <path 
                d="M450,350 C480,370 500,400 520,430 C540,460 550,490 550,520 C550,550 530,570 500,570 C470,570 430,570 400,570 C370,570 350,550 350,520 C350,490 360,460 380,430 C400,400 430,370 450,350 Z" 
                fill="#fbbf24" 
                fillOpacity="0.3" 
              />
              <path 
                d="M450,350 C480,370 500,400 520,430 C540,460 550,490 550,520 C550,550 530,570 500,570 C470,570 430,570 400,570 C370,570 350,550 350,520 C350,490 360,460 380,430 C400,400 430,370 450,350 Z" 
                fill="#10b981" 
                fillOpacity="0.2" 
              />
            </g>
          )}
          
          {activeLayer === 'mechanisms' && (
            <g>
              {/* Urban Core - All mechanisms present */}
              <rect x="400" y="200" width="50" height="50" fill="#f472b6" fillOpacity="0.6" />
              <rect x="450" y="200" width="50" height="50" fill="#22d3ee" fillOpacity="0.6" />
              <rect x="400" y="250" width="50" height="50" fill="#fbbf24" fillOpacity="0.6" />
              <rect x="450" y="250" width="50" height="50" fill="#a3e635" fillOpacity="0.6" />
              
              {/* Cultural Quarter - Symbolic knowledge dominant */}
              <path 
                d="M450,150 C480,150 510,140 520,120 C530,100 530,80 510,60 C490,40 460,40 430,60 C400,80 400,100 410,120 C420,140 430,150 450,150 Z" 
                fill="#f472b6" 
                fillOpacity="0.8" 
              />
              
              {/* Industrial Zone - Capital conversion & institutional */}
              <path 
                d="M350,250 C320,230 300,200 280,180 C260,160 240,150 210,150 C180,150 150,170 130,200 C110,230 110,270 130,300 C150,330 180,350 210,350 C240,350 260,340 280,320 C300,300 320,270 350,250 Z" 
                fill="#fbbf24" 
                fillOpacity="0.5" 
              />
              <path 
                d="M350,250 C320,230 300,200 280,180 C260,160 240,150 210,150 C180,150 150,170 130,200 C110,230 110,270 130,300 C150,330 180,350 210,350 C240,350 260,340 280,320 C300,300 320,270 350,250 Z" 
                fill="#a3e635" 
                fillOpacity="0.3" 
              />
              
              {/* Suburban Area - Network development */}
              <path 
                d="M550,250 C580,230 600,200 620,180 C640,160 660,150 690,150 C720,150 750,170 770,200 C790,230 790,270 770,300 C750,330 720,350 690,350 C660,350 640,340 620,320 C600,300 580,270 550,250 Z" 
                fill="#22d3ee" 
                fillOpacity="0.6" 
              />
              
              {/* Rural Periphery - Mixed weak mechanisms */}
              <path 
                d="M450,350 C480,370 500,400 520,430 C540,460 550,490 550,520 C550,550 530,570 500,570 C470,570 430,570 400,570 C370,570 350,550 350,520 C350,490 360,460 380,430 C400,400 430,370 450,350 Z" 
                fill="#f472b6" 
                fillOpacity="0.3" 
              />
              <path 
                d="M450,350 C480,370 500,400 520,430 C540,460 550,490 550,520 C550,550 530,570 500,570 C470,570 430,570 400,570 C370,570 350,550 350,520 C350,490 360,460 380,430 C400,400 430,370 450,350 Z" 
                fill="#fbbf24" 
                fillOpacity="0.2" 
              />
            </g>
          )}
        </svg>
        
        {/* Legend overlay */}
        <div className="absolute top-4 right-4">
          {renderLegend()}
        </div>
      </div>
    );
  };
  
  // Regional details panel
  const renderRegionalDetails = () => {
    if (!activeRegion) return null;
    
    const regionDetails = {
      urban: {
        name: "Urban Core",
        profile: "Dense concentration of cultural institutions, creative businesses, and innovation hubs with strong cross-sector linkages.",
        strengths: "High density of creative professionals, strong institutional infrastructure, diverse funding sources.",
        challenges: "High operating costs, gentrification pressures, competitive environment.",
        resilience: "Strong overall resilience with balanced capacities across all dimensions."
      },
      cultural: {
        name: "Cultural Quarter",
        profile: "Specialized district with concentration of cultural heritage sites, performance venues, and artistic production.",
        strengths: "Strong symbolic capital, international recognition, distinctive identity.",
        challenges: "Tourism dependency, seasonal fluctuations, limited industrial linkages.",
        resilience: "Strong transformative capacity but weaker absorptive resilience."
      },
      industrial: {
        name: "Industrial Zone",
        profile: "Former manufacturing area with emerging creative production spaces and design-intensive businesses.",
        strengths: "Affordable space, industrial heritage, potential for innovation recombination.",
        challenges: "Legacy infrastructure constraints, limited cultural consumption, negative perceptions.",
        resilience: "Strong absorptive capacity but limited transformative or anticipatory capacity."
      },
      suburban: {
        name: "Suburban Area",
        profile: "Residential districts with emerging cultural consumption nodes and distributed creative professionals.",
        strengths: "Growing audience base, community engagement, digital connectivity.",
        challenges: "Limited cultural infrastructure, car dependency, fragmented creative networks.",
        resilience: "Moderate adaptive capacity but weak in other dimensions."
      },
      rural: {
        name: "Rural Periphery",
        profile: "Agricultural landscape with heritage assets, craft traditions, and emerging creative tourism.",
        strengths: "Distinctive cultural traditions, authenticity, quality of life advantages.",
        challenges: "Limited scale, connectivity barriers, workforce constraints.",
        resilience: "Low overall resilience capacity with some strengths in symbolic knowledge mechanisms."
      }
    };
    
    const details = regionDetails[activeRegion];
    
    return (
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900">{details.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{details.profile}</p>
        
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-green-50 p-3 rounded">
            <h4 className="text-sm font-medium text-green-800">Strengths</h4>
            <p className="text-xs text-green-700 mt-1">{details.strengths}</p>
          </div>
          
          <div className="bg-amber-50 p-3 rounded">
            <h4 className="text-sm font-medium text-amber-800">Challenges</h4>
            <p className="text-xs text-amber-700 mt-1">{details.challenges}</p>
          </div>
          
          <div className="bg-blue-50 p-3 rounded">
            <h4 className="text-sm font-medium text-blue-800">Resilience Profile</h4>
            <p className="text-xs text-blue-700 mt-1">{details.resilience}</p>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Cultural Innovation Mapping</h2>
        <p className="text-gray-600 mt-1">Interactive visualization of cultural innovation patterns across different regional contexts</p>
      </div>
      
      {renderLayerControls()}
      {renderMap()}
      {renderRegionalDetails()}
      
      <div className="mt-6 bg-gray-50 p-3 rounded text-xs text-gray-500">
        <p className="font-medium mb-1">How to use this visualization:</p>
        <ol className="list-decimal pl-4 space-y-1">
          <li>Toggle between different mapping layers using the buttons above the map</li>
          <li>Click on specific regions to view detailed information about their cultural innovation profile</li>
          <li>Use this visualization to identify spatial patterns in cultural innovation and resilience capacity</li>
          <li>Compare different regions to understand contextual variation in innovation mechanisms</li>
        </ol>
      </div>
    </div>
  );
};

export default CulturalInnovationMap;
