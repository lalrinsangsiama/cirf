import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const IntegratedEvaluationFramework = () => {
  const [activeTab, setActiveTab] = useState('structure');
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (key) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderExpandableSection = (title, content, key) => {
    return (
      <div className="mb-3 border rounded-lg overflow-hidden">
        <button 
          onClick={() => toggleExpand(key)}
          className="w-full p-3 bg-blue-50 text-left font-medium flex justify-between items-center border-b"
        >
          {title}
          <ChevronDown 
            className={`transition-transform ${expandedItems[key] ? 'rotate-180' : ''}`} 
            size={20} 
          />
        </button>
        {expandedItems[key] && (
          <div className="p-3 bg-white">
            {content}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Integrated Evaluation Framework for Cultural Innovation</h1>
      
      <div className="flex justify-center mb-8">
        <div className="p-4 bg-blue-100 rounded-lg text-center max-w-2xl">
          <p className="text-sm text-gray-700">
            A comprehensive approach for measuring and evaluating cultural innovation across multiple dimensions, 
            levels, and value types using diverse methodological approaches.
          </p>
        </div>
      </div>
      
      <div className="flex mb-6 border-b">
        <button 
          className={`px-4 py-2 ${activeTab === 'structure' ? 'bg-blue-100 border-b-2 border-blue-500' : 'bg-gray-50'}`}
          onClick={() => setActiveTab('structure')}
        >
          Framework Structure
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'application' ? 'bg-blue-100 border-b-2 border-blue-500' : 'bg-gray-50'}`}
          onClick={() => setActiveTab('application')}
        >
          Application & Users
        </button>
      </div>
      
      {activeTab === 'structure' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {renderExpandableSection(
              "Multiple Evaluation Dimensions",
              <div>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="text-sm">
                    <span className="font-semibold">Symbolic Innovation:</span> Aesthetic and meaning innovations, artistic merit, symbolic transformation
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Process Innovation:</span> New approaches to cultural production, collaborative processes, organizational practices
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Experience Innovation:</span> New audience engagement approaches, interaction, experience quality
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Business Model Innovation:</span> New value creation/capture, revenue models, financial sustainability
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Ecosystem Innovation:</span> Broader field transformations, spillovers, ecosystem development
                  </li>
                </ul>
              </div>,
              'dimensions'
            )}
            
            {renderExpandableSection(
              "Multi-Level Assessment Structure",
              <div>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="text-sm">
                    <span className="font-semibold">Project Level:</span> Specific innovation initiatives, milestones, outcomes
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Organization Level:</span> Innovation portfolio, capability development, strategic alignment
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Sector Level:</span> Patterns within specific cultural domains, comparative performance
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Cross-Sector Level:</span> Innovation impacts across domains, spillovers, interdisciplinary connections
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Societal Level:</span> Broader contributions, cultural participation, sustainable development
                  </li>
                </ul>
              </div>,
              'levels'
            )}
          </div>
          
          <div>
            {renderExpandableSection(
              "Integrated Value Assessment",
              <div>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="text-sm">
                    <span className="font-semibold">Intrinsic Value:</span> Inherent cultural/aesthetic qualities, audience experience, critical reception
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Instrumental Value:</span> Economic and social objectives, impact metrics, policy goals
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Institutional Value:</span> Organizational development, capability building, strategic positioning
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Network Value:</span> Ecosystem relationships, partnerships, collaboration
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Platform Value:</span> Future value creation capacity, infrastructure, enabling capabilities
                  </li>
                </ul>
              </div>,
              'value'
            )}
            
            {renderExpandableSection(
              "Mixed Methods Approach",
              <div>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="text-sm">
                    <span className="font-semibold">Quantitative Methods:</span> Standardized metrics, indicators, statistical analysis
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Qualitative Methods:</span> Case studies, critical analysis, ethnographic approaches
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Economic Methods:</span> Impact analysis, contingent valuation, ROI calculation
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Participatory Methods:</span> Co-created evaluation, developmental evaluation, stakeholder engagement
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Visual Methods:</span> Value chain visualization, network mapping, indicator dashboards
                  </li>
                </ul>
              </div>,
              'methods'
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'application' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Framework Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Policy & Funding Bodies</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>Government cultural departments</li>
                  <li>Arts councils & funding agencies</li>
                  <li>Cultural development organizations</li>
                  <li>International organizations (UNESCO, EU)</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Cultural Organizations</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>Cultural institutions & museums</li>
                  <li>Performing arts organizations</li>
                  <li>Media & digital content producers</li>
                  <li>Creative industries businesses</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Researchers & Intermediaries</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>Cultural policy researchers</li>
                  <li>Innovation consultants</li>
                  <li>Cultural sector networks</li>
                  <li>Educational institutions</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Practical Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Strategic Planning & Decision Making</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>Cultural strategy development</li>
                  <li>Innovation portfolio management</li>
                  <li>Resource allocation optimization</li>
                  <li>Investment prioritization</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Accountability & Reporting</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>Comprehensive impact reporting</li>
                  <li>Stakeholder communication</li>
                  <li>Funding justification</li>
                  <li>Transparent governance</li>
                </ul>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Program Improvement</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>Program design enhancement</li>
                  <li>Adaptive management</li>
                  <li>Continuous improvement</li>
                  <li>Learning and development</li>
                </ul>
              </div>
              
              <div className="bg-teal-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Field Development</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>Knowledge sharing and benchmarking</li>
                  <li>Field-level learning</li>
                  <li>Cross-sectoral collaboration</li>
                  <li>Ecosystem strengthening</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Implementation Process</h2>
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-12 w-1 bg-gray-300"></div>
              <div className="space-y-6 relative">
                {[
                  {
                    title: "Framework Customization",
                    content: "Adapt framework components to specific organizational context, sector, and evaluation needs"
                  },
                  {
                    title: "Indicator Selection & Development",
                    content: "Choose appropriate metrics and develop data collection instruments across framework dimensions"
                  },
                  {
                    title: "Data Collection Implementation",
                    content: "Deploy mixed methods data collection across levels and dimensions using appropriate tools"
                  },
                  {
                    title: "Integrated Analysis",
                    content: "Synthesize findings across dimensions using analytical methods appropriate to data types"
                  },
                  {
                    title: "Strategic Application",
                    content: "Apply insights to decision-making, planning, reporting, and improvement processes"
                  }
                ].map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 relative">
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold relative z-10">
                        {index + 1}
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{step.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegratedEvaluationFramework;
