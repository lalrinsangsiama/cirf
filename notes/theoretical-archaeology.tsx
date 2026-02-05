import React, { useState } from 'react';

const TheoreticalArchaeology = () => {
  const [activeTradition, setActiveTradition] = useState(null);
  const [activeLayer, setActiveLayer] = useState('surface');
  
  const traditions = [
    {
      id: 1,
      name: "Critical Theory Tradition",
      subtitle: "Frankfurt School",
      color: "#E53935",
      description: "Analyzes cultural industries as instruments of social control and examines the commodification of culture",
      surface: {
        title: "Surface Claims",
        content: "Cultural industries produce standardized products that pacify mass audiences and reinforce dominant ideologies. Authentic cultural expression is undermined by commercial imperatives and industrial production methods."
      },
      middle: {
        title: "Methodological Approaches",
        content: "Dialectical critique, ideological analysis, aesthetic theory, and comparative historical analysis of cultural forms and their social functions."
      },
      deep: {
        title: "Deep Assumptions",
        content: [
          {
            type: "Ontological",
            assumptions: "Reality is characterized by fundamental contradictions that are obscured by ideological structures. Culture is a site of struggle between authentic expression and instrumental rationality."
          },
          {
            type: "Epistemological",
            assumptions: "Knowledge emerges through critical reflection that unveils hidden power structures. Negative dialectics that reveal what is suppressed by dominant rationality."
          },
          {
            type: "Normative",
            assumptions: "Authentic/inauthentic dichotomy, negativity principle (critical negation as path to truth), and emancipatory telos (critique should serve human liberation)."
          }
        ]
      },
      strengths: "Powerful systemic critique of cultural commodification and attention to power dynamics in cultural production.",
      limitations: "Can be overly deterministic and elitist in its cultural hierarchies, with limited recognition of audience agency."
    },
    {
      id: 2,
      name: "Production of Culture Tradition",
      subtitle: "Organizational Sociology",
      color: "#FB8C00",
      description: "Examines how cultural symbols are shaped by the systems within which they are created, distributed, and evaluated",
      surface: {
        title: "Surface Claims",
        content: "Cultural production is structured by organizational arrangements, market forces, technological systems, and regulatory frameworks. Cultural innovation emerges from specific configurations of these systems rather than from individual genius."
      },
      middle: {
        title: "Methodological Approaches",
        content: "Organizational analysis, network analysis, industry studies, and comparative institutional analysis focusing on systems of production rather than textual content."
      },
      deep: {
        title: "Deep Assumptions",
        content: [
          {
            type: "Ontological",
            assumptions: "Culture is socially constructed through organized production systems. Cultural products reflect the organizational arrangements that produce them."
          },
          {
            type: "Epistemological",
            assumptions: "Social scientific empiricism that prioritizes observable organizational structures and processes over interpretive meaning-making."
          },
          {
            type: "Normative",
            assumptions: "Methodological neutrality that avoids explicit value judgments about cultural content, focusing instead on production processes."
          }
        ]
      },
      strengths: "Strong explanatory power for organizational dynamics and institutional structures in cultural sectors.",
      limitations: "Weak on symbolic dimensions and meaning, sometimes reducing culture to its production context."
    },
    {
      id: 3,
      name: "Cultural Economics Tradition",
      subtitle: "Economic Analysis of Culture",
      color: "#43A047",
      description: "Applies economic analysis to understand cultural production, distribution, and consumption",
      surface: {
        title: "Surface Claims",
        content: "Cultural goods have distinctive economic properties that require specialized analysis. Market failures in cultural sectors justify specific policy interventions to enhance social welfare and cultural diversity."
      },
      middle: {
        title: "Methodological Approaches",
        content: "Economic modeling, statistical analysis, welfare economics, market structure analysis, and contingent valuation methods for non-market cultural value."
      },
      deep: {
        title: "Deep Assumptions",
        content: [
          {
            type: "Ontological",
            assumptions: "Culture has dual constitution as both economic good and cultural expression. Cultural value exists alongside but distinct from economic value."
          },
          {
            type: "Epistemological",
            assumptions: "Methodological individualism that sees cultural phenomena as aggregations of individual choices, with rational choice as primary explanatory framework."
          },
          {
            type: "Normative",
            assumptions: "Efficiency principle that seeks optimal resource allocation, but modified by recognition of non-market cultural values."
          }
        ]
      },
      strengths: "Sophisticated on value pluralism and provides rigorous frameworks for understanding cultural markets.",
      limitations: "Often struggles to fully account for non-market values and power dynamics in cultural production."
    },
    {
      id: 4,
      name: "Creative Industries Paradigm",
      subtitle: "Policy-Oriented Approach",
      color: "#3949AB",
      description: "Positions creativity as an economic driver within knowledge economies",
      surface: {
        title: "Surface Claims",
        content: "Creative industries generate economic value through intellectual property and symbolic content production. They represent key growth sectors in post-industrial economies and drive innovation across broader economic systems."
      },
      middle: {
        title: "Methodological Approaches",
        content: "Economic impact analysis, industry mapping, cluster analysis, policy evaluation, and creative class metrics focusing on economic contributions."
      },
      deep: {
        title: "Deep Assumptions",
        content: [
          {
            type: "Ontological",
            assumptions: "Post-industrial premise that positions knowledge and creativity as primary economic resources in contemporary capitalism."
          },
          {
            type: "Epistemological",
            assumptions: "Instrumental knowledge orientation that values quantification of creative sector impacts and contributions to economic growth."
          },
          {
            type: "Normative",
            assumptions: "Economic legitimation that justifies cultural activities primarily through their economic contributions rather than intrinsic cultural value."
          }
        ]
      },
      strengths: "Effective for policy advocacy and recognizes economic dimension of cultural production.",
      limitations: "Risks subordinating cultural objectives to economic imperatives and narrowing value to market metrics."
    },
    {
      id: 5,
      name: "Cultural Studies Tradition",
      subtitle: "Critical Humanities Approach",
      color: "#8E24AA",
      description: "Analyzes how cultural practices relate to power structures and identity formation",
      surface: {
        title: "Surface Claims",
        content: "Culture is a site of struggle over meaning and representation that shapes social identities and power relations. Cultural practices involve active meaning-making rather than passive consumption."
      },
      middle: {
        title: "Methodological Approaches",
        content: "Textual analysis, ethnography, discourse analysis, semiotics, and reception studies focusing on meaning and representation."
      },
      deep: {
        title: "Deep Assumptions",
        content: [
          {
            type: "Ontological",
            assumptions: "Constructivist foundation that sees reality as socially and culturally constructed through systems of representation and meaning."
          },
          {
            type: "Epistemological",
            assumptions: "Interpretive approach that prioritizes thick description and analysis of meaning systems over causal explanation."
          },
          {
            type: "Normative",
            assumptions: "Counter-hegemonic orientation that values cultural expressions challenging dominant power structures and advancing marginalized perspectives."
          }
        ]
      },
      strengths: "Rich analysis of meaning, identity, and power in cultural practices and audience engagement.",
      limitations: "Sometimes underplays economic and institutional dimensions of cultural production."
    },
    {
      id: 6,
      name: "Network Paradigm",
      subtitle: "Distributed Innovation Approach",
      color: "#00ACC1",
      description: "Examines cultural innovation through network structures and relationships",
      surface: {
        title: "Surface Claims",
        content: "Cultural innovation emerges from interactions within networks of creators, intermediaries, and users. Value is created through these network relationships rather than solely through individual production."
      },
      middle: {
        title: "Methodological Approaches",
        content: "Network analysis, digital methods, platform studies, and diffusion analysis focusing on relationships rather than individual agents or products."
      },
      deep: {
        title: "Deep Assumptions",
        content: [
          {
            type: "Ontological",
            assumptions: "Relational ontology that sees social reality as constituted through networked relationships rather than discrete entities."
          },
          {
            type: "Epistemological",
            assumptions: "Distributed knowledge perspective that values collective intelligence and emergent learning over individual expertise."
          },
          {
            type: "Normative",
            assumptions: "Openness ideal that values accessible, participatory cultural creation and sharing over closed, proprietary approaches."
          }
        ]
      },
      strengths: "Innovative on connectivity and digital cultural dynamics in contemporary production and distribution.",
      limitations: "Can neglect power asymmetries within networks and institutional constraints on network formation."
    },
    {
      id: 7,
      name: "Sustainability Framework",
      subtitle: "Long-term Systems Approach",
      color: "#00897B",
      description: "Addresses cultural innovation within broader ecological and social systems",
      surface: {
        title: "Surface Claims",
        content: "Cultural development must balance current needs with future capabilities. Sustainable cultural innovation integrates economic, social, environmental, and cultural dimensions."
      },
      middle: {
        title: "Methodological Approaches",
        content: "Systems analysis, resilience assessment, long-term impact evaluation, and intergenerational equity metrics focusing on durability and regeneration."
      },
      deep: {
        title: "Deep Assumptions",
        content: [
          {
            type: "Ontological",
            assumptions: "Systems integration that sees cultural, social, economic, and ecological domains as inherently interconnected rather than separate."
          },
          {
            type: "Epistemological",
            assumptions: "Transdisciplinary knowledge that values integration across diverse knowledge domains and timeframes."
          },
          {
            type: "Normative",
            assumptions: "Intergenerational perspective that explicitly values future capabilities and options alongside present needs."
          }
        ]
      },
      strengths: "Holistic integration of cultural innovation within broader social and ecological systems.",
      limitations: "Challenging to operationalize and measure, with potential tensions between different sustainability dimensions."
    }
  ];

  const renderDeepAssumptions = (assumptions) => {
    return assumptions.map((item, index) => (
      <div key={index} className="mb-3">
        <span className="font-semibold text-gray-800">{item.type}: </span>
        <span className="text-gray-700">{item.assumptions}</span>
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-gray-800 text-center">Theoretical Archaeology</h1>
      <h2 className="text-xl mb-6 text-gray-600 text-center">Excavating Assumptions in Cultural Innovation Theory</h2>
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md w-full">
        <p className="text-gray-700">
          This theoretical archaeology excavates the foundational assumptions embedded within major traditions of cultural innovation theory. While these assumptions often remain implicit, they fundamentally shape how each tradition conceptualizes, analyzes, and evaluates cultural innovation.
        </p>
      </div>
      
      {/* Layer selection */}
      {activeTradition && (
        <div className="w-full mb-4 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button 
              type="button" 
              className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 ${activeLayer === 'surface' ? 'bg-gray-100' : ''}`}
              onClick={() => setActiveLayer('surface')}
            >
              Surface Level
            </button>
            <button 
              type="button" 
              className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 ${activeLayer === 'middle' ? 'bg-gray-100' : ''}`}
              onClick={() => setActiveLayer('middle')}
            >
              Middle Level
            </button>
            <button 
              type="button" 
              className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100 ${activeLayer === 'deep' ? 'bg-gray-100' : ''}`}
              onClick={() => setActiveLayer('deep')}
            >
              Deep Level
            </button>
          </div>
        </div>
      )}
      
      {/* Tradition details - archaeological view */}
      {activeTradition && (
        <div 
          className="w-full bg-white rounded-lg shadow-md p-5 mb-6 relative transition-all duration-300"
          style={{ borderLeft: `5px solid ${traditions.find(t => t.id === activeTradition).color}` }}
        >
          <div className="absolute top-0 right-0 p-2">
            <button 
              onClick={() => setActiveTradition(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              {traditions.find(t => t.id === activeTradition).name}
            </h3>
            <p className="text-gray-600">{traditions.find(t => t.id === activeTradition).subtitle}</p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700">{traditions.find(t => t.id === activeTradition).description}</p>
          </div>
          
          {/* Layer display */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
            <div className="flex items-center mb-2">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: traditions.find(t => t.id === activeTradition).color }}
              ></div>
              <h4 className="font-bold text-gray-800">
                {activeLayer === 'surface' ? traditions.find(t => t.id === activeTradition).surface.title : 
                 activeLayer === 'middle' ? traditions.find(t => t.id === activeTradition).middle.title :
                 'Fundamental Assumptions'}
              </h4>
            </div>
            
            <div className="pl-6 border-l-2" style={{ borderColor: traditions.find(t => t.id === activeTradition).color }}>
              {activeLayer === 'surface' && 
                <p className="text-gray-700">{traditions.find(t => t.id === activeTradition).surface.content}</p>
              }
              
              {activeLayer === 'middle' && 
                <p className="text-gray-700">{traditions.find(t => t.id === activeTradition).middle.content}</p>
              }
              
              {activeLayer === 'deep' && 
                <div className="text-gray-700">
                  {renderDeepAssumptions(traditions.find(t => t.id === activeTradition).deep.content)}
                </div>
              }
            </div>
          </div>
          
          {/* Strengths and limitations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-3 rounded-md border border-green-100">
              <h5 className="font-semibold text-green-800 mb-1">Strengths</h5>
              <p className="text-green-700 text-sm">{traditions.find(t => t.id === activeTradition).strengths}</p>
            </div>
            
            <div className="bg-orange-50 p-3 rounded-md border border-orange-100">
              <h5 className="font-semibold text-orange-800 mb-1">Limitations</h5>
              <p className="text-orange-700 text-sm">{traditions.find(t => t.id === activeTradition).limitations}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Traditions grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {traditions.map((tradition) => (
          <div 
            key={tradition.id}
            className={`relative bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer ${activeTradition === tradition.id ? 'ring-2' : ''}`}
            style={{ borderTop: `3px solid ${tradition.color}`, 
                     ringColor: tradition.color }}
            onClick={() => {
              setActiveTradition(tradition.id);
              setActiveLayer('surface');
            }}
          >
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: tradition.color }}></div>
              <h3 className="font-bold text-gray-800 text-md">{tradition.name}</h3>
            </div>
            <p className="text-gray-500 text-sm mb-2">{tradition.subtitle}</p>
            <p className="text-gray-600 text-sm line-clamp-3">{tradition.description}</p>
            
            <div className="absolute bottom-3 right-3 text-xs text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
              Excavate
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-white p-5 rounded-lg shadow-md w-full">
        <h3 className="text-lg font-bold mb-3 text-gray-800">Key Framework Implications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-l-4 border-blue-500 pl-3">
            <p className="font-semibold text-gray-700">Convergent Assumptions</p>
            <p className="text-gray-600 text-sm">Areas where traditions increasingly align: context dependence, value complexity, system interconnectedness</p>
          </div>
          <div className="border-l-4 border-red-500 pl-3">
            <p className="font-semibold text-gray-700">Persistent Tensions</p>
            <p className="text-gray-600 text-sm">Fundamental differences that remain: individual vs. system focus, material vs. symbolic emphasis, market vs. non-market mechanisms</p>
          </div>
          <div className="border-l-4 border-green-500 pl-3">
            <p className="font-semibold text-gray-700">Methodological Framework</p>
            <p className="text-gray-600 text-sm">Five principles for CIRF development: assumption transparency, multi-paradigmatic integration, contextual specification, value pluralism, reflexive application</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-3">
            <p className="font-semibold text-gray-700">Academic Positioning</p>
            <p className="text-gray-600 text-sm">CIRF's contribution lies not in establishing a new grand theory but in developing an integrative approach acknowledging diverse theoretical foundations</p>
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-sm mt-8">
        Click on a theoretical tradition to excavate its underlying assumptions at different levels
      </div>
    </div>
  );
};

export default TheoreticalArchaeology;
