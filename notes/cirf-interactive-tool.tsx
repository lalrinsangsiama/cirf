import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

// Main CIRF Tool component
const CIRFTool = () => {
  // State management
  const [activeView, setActiveView] = useState('framework');
  const [assessmentData, setAssessmentData] = useState({
    absorptive: 3,
    adaptive: 2,
    transformative: 2,
    anticipatory: 1
  });
  const [contextData, setContextData] = useState({
    governanceLevel: 'local',
    industrialStructure: 'diverse',
    knowledgeEcology: 'mixed',
    culturalContext: 'traditional'
  });
  const [selectedMechanism, setSelectedMechanism] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('medium');
  const [implementationConfig, setImplementationConfig] = useState('network');
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  // Format radar chart data
  const formatRadarData = () => {
    return [
      { dimension: 'Absorptive Capacity', value: assessmentData.absorptive, fullMark: 5 },
      { dimension: 'Adaptive Capacity', value: assessmentData.adaptive, fullMark: 5 },
      { dimension: 'Transformative Capacity', value: assessmentData.transformative, fullMark: 5 },
      { dimension: 'Anticipatory Capacity', value: assessmentData.anticipatory, fullMark: 5 },
    ];
  };
  
  // Calculate recommendations when relevant state changes
  useEffect(() => {
    if (showRecommendations) {
      // This would contain logic to generate recommendations based on inputs
      console.log("Generating recommendations based on user inputs");
    }
  }, [showRecommendations, assessmentData, contextData, selectedMechanism, selectedTimeframe, implementationConfig]);
  
  // Handle capacity value changes
  const handleCapacityChange = (capacity, value) => {
    setAssessmentData({
      ...assessmentData,
      [capacity]: parseInt(value)
    });
  };
  
  // Handle context data changes
  const handleContextChange = (contextFactor, value) => {
    setContextData({
      ...contextData,
      [contextFactor]: value
    });
  };
  
  // Generate recommendations button handler
  const handleRecommendationsClick = () => {
    setShowRecommendations(true);
  };
  
  // Reset form handler
  const handleReset = () => {
    setAssessmentData({
      absorptive: 3,
      adaptive: 2,
      transformative: 2,
      anticipatory: 1
    });
    setContextData({
      governanceLevel: 'local',
      industrialStructure: 'diverse',
      knowledgeEcology: 'mixed',
      culturalContext: 'traditional'
    });
    setSelectedMechanism(null);
    setSelectedTimeframe('medium');
    setImplementationConfig('network');
    setShowRecommendations(false);
  };
  
  // Render navigation
  const renderNavigation = () => (
    <div className="bg-gray-800 py-3 px-6 rounded-t-lg">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-white">CIRF Interactive Tool</div>
        <div className="flex space-x-4">
          <button 
            className={`px-4 py-2 rounded-md ${activeView === 'framework' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}
            onClick={() => setActiveView('framework')}
          >
            Framework Overview
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${activeView === 'assessment' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}
            onClick={() => setActiveView('assessment')}
          >
            Assessment
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${activeView === 'results' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}
            onClick={() => setActiveView('results')}
          >
            Results & Recommendations
          </button>
        </div>
      </div>
    </div>
  );
  
  // Render framework overview
  const renderFrameworkOverview = () => (
    <div className="p-6 bg-white rounded-b-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Cultural Innovation Resilience Framework (CIRF)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Resilience Capacities</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li><span className="font-semibold">Absorptive Capacity:</span> Ability to withstand disruption without fundamental failure</li>
            <li><span className="font-semibold">Adaptive Capacity:</span> Ability to adjust configurations in response to change</li>
            <li><span className="font-semibold">Transformative Capacity:</span> Ability to create fundamentally new configurations</li>
            <li><span className="font-semibold">Anticipatory Capacity:</span> Ability to prepare for future disruptions</li>
          </ul>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Causal Mechanisms</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li><span className="font-semibold">Symbolic Knowledge:</span> Creating meaning, experiences, and identities</li>
            <li><span className="font-semibold">Network Development:</span> Building connections between diverse actors</li>
            <li><span className="font-semibold">Capital Conversion:</span> Transforming cultural capital into other forms</li>
            <li><span className="font-semibold">Institutional Innovation:</span> Developing new rules and governance</li>
          </ul>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Contextual Mediators</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li><span className="font-semibold">Governance Arrangements:</span> Decision-making authority and coordination</li>
            <li><span className="font-semibold">Industrial Structure:</span> Composition of economic activities</li>
            <li><span className="font-semibold">Knowledge Ecology:</span> Knowledge production and diffusion systems</li>
            <li><span className="font-semibold">Cultural Context:</span> Cultural values, norms, and identity</li>
          </ul>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Temporal Dynamics</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li><span className="font-semibold">Time Horizons:</span> Immediate, short-term, medium-term, long-term</li>
            <li><span className="font-semibold">Development Trajectories:</span> Path extension, upgrading, diversification, creation</li>
            <li><span className="font-semibold">Feedback Dynamics:</span> Learning cycles, capacity building, threshold effects</li>
            <li><span className="font-semibold">Phase Relationships:</span> Pre-disruption, acute disruption, reorganization</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Implementation Pathways</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border p-3 rounded bg-white">
            <h4 className="font-semibold">Policy-Led</h4>
            <p className="text-sm">Centered on formal policy instruments, requires strong institutional capacity</p>
          </div>
          <div className="border p-3 rounded bg-white">
            <h4 className="font-semibold">Market-Led</h4>
            <p className="text-sm">Operates through market mechanisms, requires strong entrepreneurial culture</p>
          </div>
          <div className="border p-3 rounded bg-white">
            <h4 className="font-semibold">Community-Led</h4>
            <p className="text-sm">Driven by community initiatives, requires strong social capital</p>
          </div>
          <div className="border p-3 rounded bg-white">
            <h4 className="font-semibold">Network-Led</h4>
            <p className="text-sm">Organized through collaborative networks, requires bridging organizations</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <button 
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
          onClick={() => setActiveView('assessment')}
        >
          Begin Assessment →
        </button>
      </div>
    </div>
  );
  
  // Render assessment form
  const renderAssessment = () => (
    <div className="p-6 bg-white rounded-b-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">CIRF Assessment</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">1. Resilience Capacity Assessment</h3>
          <p className="mb-4 text-sm">Rate your current resilience capacities from 1 (low) to 5 (high)</p>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Absorptive Capacity</label>
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={assessmentData.absorptive} 
                onChange={(e) => handleCapacityChange('absorptive', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Adaptive Capacity</label>
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={assessmentData.adaptive} 
                onChange={(e) => handleCapacityChange('adaptive', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Transformative Capacity</label>
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={assessmentData.transformative} 
                onChange={(e) => handleCapacityChange('transformative', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Anticipatory Capacity</label>
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={assessmentData.anticipatory} 
                onChange={(e) => handleCapacityChange('anticipatory', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4">2. Context Analysis</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Governance Level</label>
                <select 
                  className="block w-full p-2 border rounded"
                  value={contextData.governanceLevel}
                  onChange={(e) => handleContextChange('governanceLevel', e.target.value)}
                >
                  <option value="local">Local/Municipal</option>
                  <option value="regional">Regional/State</option>
                  <option value="national">National</option>
                  <option value="international">International</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Industrial Structure</label>
                <select 
                  className="block w-full p-2 border rounded"
                  value={contextData.industrialStructure}
                  onChange={(e) => handleContextChange('industrialStructure', e.target.value)}
                >
                  <option value="diverse">Diverse/Varied</option>
                  <option value="specialized">Specialized/Concentrated</option>
                  <option value="transitional">In Transition</option>
                  <option value="emerging">Emerging/Developing</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Knowledge Ecology</label>
                <select 
                  className="block w-full p-2 border rounded"
                  value={contextData.knowledgeEcology}
                  onChange={(e) => handleContextChange('knowledgeEcology', e.target.value)}
                >
                  <option value="analytical">Analytical (Science-Based)</option>
                  <option value="synthetic">Synthetic (Engineering-Based)</option>
                  <option value="symbolic">Symbolic (Arts-Based)</option>
                  <option value="mixed">Mixed/Hybrid</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Cultural Context</label>
                <select 
                  className="block w-full p-2 border rounded"
                  value={contextData.culturalContext}
                  onChange={(e) => handleContextChange('culturalContext', e.target.value)}
                >
                  <option value="traditional">Traditional/Heritage-Rich</option>
                  <option value="contemporary">Contemporary/Modern</option>
                  <option value="diverse">Culturally Diverse</option>
                  <option value="hybrid">Hybrid/Fusion</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="h-64 mb-8">
            <h3 className="font-bold text-lg mb-4">Current Resilience Profile</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formatRadarData()}>
                <PolarGrid />
                <PolarAngleAxis dataKey="dimension" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar name="Current" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">3. Strategic Approach</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Primary Causal Mechanism</label>
                <select 
                  className="block w-full p-2 border rounded"
                  value={selectedMechanism || ''}
                  onChange={(e) => setSelectedMechanism(e.target.value)}
                >
                  <option value="">Select a mechanism...</option>
                  <option value="symbolic">Symbolic Knowledge</option>
                  <option value="network">Network Development</option>
                  <option value="capital">Capital Conversion</option>
                  <option value="institutional">Institutional Innovation</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Primary Timeframe</label>
                <select 
                  className="block w-full p-2 border rounded"
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                >
                  <option value="immediate">Immediate (0-6 months)</option>
                  <option value="short">Short-term (6 months-2 years)</option>
                  <option value="medium">Medium-term (2-5 years)</option>
                  <option value="long">Long-term (5+ years)</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Implementation Configuration</label>
                <select 
                  className="block w-full p-2 border rounded"
                  value={implementationConfig}
                  onChange={(e) => setImplementationConfig(e.target.value)}
                >
                  <option value="policy">Policy-Led</option>
                  <option value="market">Market-Led</option>
                  <option value="community">Community-Led</option>
                  <option value="network">Network-Led</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex space-x-4">
            <button 
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex-grow"
              onClick={handleRecommendationsClick}
            >
              Generate Recommendations
            </button>
            <button 
              className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render results and recommendations
  const renderResults = () => (
    <div className="p-6 bg-white rounded-b-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">CIRF Recommendations & Action Plan</h2>
      
      {!showRecommendations ? (
        <div className="text-center p-10">
          <p className="mb-4">Please complete the assessment to generate recommendations.</p>
          <button 
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
            onClick={() => setActiveView('assessment')}
          >
            Go to Assessment
          </button>
        </div>
      ) : (
        <div>
          <div className="bg-blue-50 border border-blue-200 p-4 mb-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Assessment Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><span className="font-medium">Strongest Capacity:</span> {
                  Object.entries(assessmentData).reduce((a, b) => a[1] > b[1] ? a : b)[0].charAt(0).toUpperCase() + 
                  Object.entries(assessmentData).reduce((a, b) => a[1] > b[1] ? a : b)[0].slice(1)
                }</p>
                <p><span className="font-medium">Weakest Capacity:</span> {
                  Object.entries(assessmentData).reduce((a, b) => a[1] < b[1] ? a : b)[0].charAt(0).toUpperCase() + 
                  Object.entries(assessmentData).reduce((a, b) => a[1] < b[1] ? a : b)[0].slice(1)
                }</p>
                <p><span className="font-medium">Primary Mechanism:</span> {
                  selectedMechanism ? selectedMechanism.charAt(0).toUpperCase() + selectedMechanism.slice(1) : 'Not selected'
                }</p>
              </div>
              <div>
                <p><span className="font-medium">Timeframe:</span> {
                  selectedTimeframe.charAt(0).toUpperCase() + selectedTimeframe.slice(1)
                }-term</p>
                <p><span className="font-medium">Implementation:</span> {
                  implementationConfig.charAt(0).toUpperCase() + implementationConfig.slice(1)
                }-led</p>
                <p><span className="font-medium">Context:</span> {contextData.governanceLevel.charAt(0).toUpperCase() + 
                  contextData.governanceLevel.slice(1)} governance, {
                  contextData.industrialStructure} industry</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Priority Recommendations</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Focus on enhancing {
                  Object.entries(assessmentData).reduce((a, b) => a[1] < b[1] ? a : b)[0]
                } capacity through targeted interventions</li>
                <li>Leverage {selectedMechanism || 'appropriate'} mechanisms aligned with your {contextData.culturalContext} context</li>
                <li>Develop a {selectedTimeframe}-term strategy with clear milestones and metrics</li>
                <li>Implement a {implementationConfig}-led approach appropriate for your governance level</li>
                <li>Build on existing strengths in {
                  Object.entries(assessmentData).reduce((a, b) => a[1] > b[1] ? a : b)[0]
                } capacity</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Relevant Case Examples</h3>
              <p className="text-sm mb-2">Based on your inputs, these cases may provide useful insights:</p>
              <ul className="list-disc ml-6 space-y-2">
                {selectedMechanism === 'symbolic' && (
                  <>
                    <li>Matera European Capital of Culture (Italy)</li>
                    <li>Estonian Digital Cultural Heritage Platform</li>
                    <li>Fogo Island Arts-Led Renewal (Canada)</li>
                  </>
                )}
                {selectedMechanism === 'network' && (
                  <>
                    <li>Creative Villages Network (Switzerland)</li>
                    <li>Montreal Creative City Governance (Canada)</li>
                    <li>Netherlands Virtual Museum Innovation</li>
                  </>
                )}
                {selectedMechanism === 'capital' && (
                  <>
                    <li>South Korean Cultural Industry Development</li>
                    <li>Ruhr Region Cultural Transformation (Germany)</li>
                    <li>Assam Silk Village Revitalization (India)</li>
                  </>
                )}
                {selectedMechanism === 'institutional' && (
                  <>
                    <li>Basque Cultural Policy Innovation (Spain)</li>
                    <li>Christchurch Post-Earthquake Recovery (New Zealand)</li>
                    <li>Medellin Cultural Transformation (Colombia)</li>
                  </>
                )}
                {!selectedMechanism && (
                  <>
                    <li>Case examples will be suggested based on mechanism selection</li>
                    <li>Please select a primary causal mechanism</li>
                  </>
                )}
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-lg mb-2">Recommended Action Plan</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Immediate Actions (Next 30 Days)</h4>
                <ul className="list-disc ml-6">
                  <li>Conduct detailed assessment of cultural innovation assets</li>
                  <li>Map key stakeholders and potential partners</li>
                  <li>Review relevant case examples for applicable lessons</li>
                  <li>Identify resource requirements and potential sources</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium">Short-Term Actions (1-3 Months)</h4>
                <ul className="list-disc ml-6">
                  <li>Develop detailed intervention strategy focusing on {
                    Object.entries(assessmentData).reduce((a, b) => a[1] < b[1] ? a : b)[0]
                  } capacity</li>
                  <li>Establish governance structure appropriate for {implementationConfig}-led approach</li>
                  <li>Conduct initial pilot activities to test intervention approaches</li>
                  <li>Develop monitoring and evaluation framework with clear metrics</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium">Medium-Term Actions (3-12 Months)</h4>
                <ul className="list-disc ml-6">
                  <li>Implement core intervention activities across priority areas</li>
                  <li>Establish learning systems to capture implementation insights</li>
                  <li>Develop communication strategy to engage broader stakeholders</li>
                  <li>Conduct mid-term assessment and adapt approach as needed</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button 
              className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300"
              onClick={() => setActiveView('assessment')}
            >
              ← Revise Assessment
            </button>
            
            <button 
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
              onClick={() => window.print()}
            >
              Export Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
  // Main render
  return (
    <div className="max-w-6xl mx-auto my-8">
      {renderNavigation()}
      
      {activeView === 'framework' && renderFrameworkOverview()}
      {activeView === 'assessment' && renderAssessment()}
      {activeView === 'results' && renderResults()}
    </div>
  );
};

export default CIRFTool;