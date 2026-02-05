import React, { useState } from 'react';

const TensionFramework = () => {
  const [activeTension, setActiveTension] = useState(null);
  
  const tensions = [
    {
      id: 1,
      left: "Commerce",
      right: "Creativity",
      description: "The ongoing negotiation between market imperatives and creative autonomy. This tension examines how cultural producers balance commercial viability with artistic integrity.",
      example: "Organizations develop specific structures to manage this tension productively, creating spaces that protect creative processes while ensuring market relevance.",
      color: "#4285F4"
    },
    {
      id: 2,
      left: "Structure",
      right: "Agency",
      description: "Whether innovation emerges from institutional structures or creative agency. This tension connects to structuration theory and practice-based approaches.",
      example: "Cultural producers both reproduce and transform structures, working within institutional frameworks while introducing novel elements that gradually reshape those frameworks.",
      color: "#EA4335"
    },
    {
      id: 3,
      left: "Global",
      right: "Local",
      description: "The interplay between homogenizing global flows and heterogenizing local contexts. This tension traces theoretical development from cultural imperialism to glocalization perspectives.",
      example: "Innovation emerges at intersections of multiple geographical scales, with global influences adapted and transformed through local cultural lenses.",
      color: "#FBBC05"
    },
    {
      id: 4,
      left: "Tradition",
      right: "Innovation",
      description: "Cultural innovation's distinctive relationship with historical continuity. This tension challenges simplistic notions of innovation as pure novelty.",
      example: "Meaningful innovation often involves recombination and reinterpretation of existing cultural elements, creating dialogue between tradition and new expressions.",
      color: "#34A853"
    },
    {
      id: 5,
      left: "Aesthetic",
      right: "Instrumental",
      description: "Negotiations between intrinsic and instrumental conceptions of cultural value. This tension shows how stakeholders mobilize different value systems.",
      example: "Cultural policies and organizations navigate different value frameworks, recognizing both intrinsic artistic merit and broader social or economic impacts.",
      color: "#FF6D01"
    },
    {
      id: 6,
      left: "Individual",
      right: "Collective",
      description: "Whether innovation emerges from individual creativity or collective processes. This tension traces movement from romantic genius models to network creativity perspectives.",
      example: "Organizations develop arrangements that balance individual autonomy with collective coordination, recognizing that innovation emerges from their interaction.",
      color: "#46BDC6"
    }
  ];

  return (
    <div className="flex flex-col items-center p-4 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Theoretical Tensions Framework</h1>
      <h2 className="text-xl mb-8 text-gray-600 text-center">Productive Dialectics in Cultural Innovation Theory</h2>
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md w-full">
        <p className="text-gray-700">
          This framework maps the central conceptual tensions within cultural innovation theory not as obstacles to theoretical coherence but as <span className="font-bold">productive dialectics</span> that drive theoretical development in the field. These tensions create the dynamic space where cultural innovation emerges.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mb-8">
        {tensions.map(tension => (
          <div 
            key={tension.id}
            onClick={() => setActiveTension(activeTension === tension.id ? null : tension.id)}
            className={`
              relative cursor-pointer shadow-md rounded-lg p-4 transition-all duration-300
              ${activeTension === tension.id ? 'transform scale-105' : 'hover:scale-102'}
            `}
            style={{
              background: `linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.7)), linear-gradient(to right, white, ${tension.color})`,
              borderLeft: `5px solid ${tension.color}`
            }}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="font-bold text-gray-700">{tension.left}</div>
              <div className="flex items-center">
                <div className="h-0.5 w-16 mx-2 bg-gray-400"></div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{backgroundColor: tension.color}}>
                  {tension.id}
                </div>
                <div className="h-0.5 w-16 mx-2 bg-gray-400"></div>
              </div>
              <div className="font-bold text-gray-700">{tension.right}</div>
            </div>
            
            {activeTension === tension.id && (
              <div className="pt-2 animation-fade-in">
                <p className="text-gray-700 mb-3">{tension.description}</p>
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-gray-600 text-sm"><span className="font-semibold">Example:</span> {tension.example}</p>
                </div>
              </div>
            )}
            
            {activeTension !== tension.id && (
              <div className="text-center text-gray-500 text-sm italic">Click for details</div>
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-white p-5 rounded-lg shadow-md w-full">
        <h3 className="text-lg font-bold mb-3 text-gray-800">Key Framework Implications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-l-4 border-blue-500 pl-3">
            <p className="font-semibold text-gray-700">Theoretical Sophistication</p>
            <p className="text-gray-600 text-sm">Moves beyond simplistic synthesis attempts to recognize productive contradictions</p>
          </div>
          <div className="border-l-4 border-red-500 pl-3">
            <p className="font-semibold text-gray-700">Methodological Guidance</p>
            <p className="text-gray-600 text-sm">Suggests research approaches like comparative configuration analysis and multi-stakeholder studies</p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-3">
            <p className="font-semibold text-gray-700">Context Sensitivity</p>
            <p className="text-gray-600 text-sm">Recognizes that optimal configurations vary across organizations, sectors, and cultural contexts</p>
          </div>
          <div className="border-l-4 border-green-500 pl-3">
            <p className="font-semibold text-gray-700">Integration Model</p>
            <p className="text-gray-600 text-sm">Shows how CIRF can incorporate these tensions as constitutive elements rather than problems to resolve</p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-gray-700">
            <span className="font-bold">Resilience emerges from effectively navigating these tensions</span> rather than resolving them. The framework proposes that cultural innovation contributes to economic resilience precisely through developing capabilities for productively managing these dialectics rather than eliminating them.
          </p>
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-sm mt-8">
        Click on each tension to explore its details
      </div>
    </div>
  );
};

export default TensionFramework;
