import React, { useState } from 'react';

const HistoricalInflectionPoints = () => {
  const [activePoint, setActivePoint] = useState(null);
  const [showFullDetails, setShowFullDetails] = useState({});

  const inflectionPoints = [
    {
      id: 1,
      period: "Post-War Industrial Consolidation",
      years: "1940s-1950s",
      context: "This period was characterized by mass consumer markets, industrial standardization, and the consolidation of cultural production into large corporations. The post-war economic boom created new consumption patterns while raising concerns about cultural homogenization.",
      keyDevelopment: "Conceptualizing cultural production as an industrial process",
      innovations: [
        {
          name: "Culture Industry Thesis",
          authors: "Adorno & Horkheimer",
          description: "Critiqued mass production of culture as standardized and formulaic, warning that industrialized cultural production threatened authentic cultural expression and critical thought."
        },
        {
          name: "Mass Society Theory",
          authors: "Various theorists",
          description: "Examined how mass media and mass production shaped cultural consumption, expressing concern about passive audiences and cultural homogenization."
        }
      ],
      color: "#8C52FF",
      position: 0
    },
    {
      id: 2,
      period: "Counter-Cultural Movements and Fragmentation",
      years: "1960s-1970s",
      context: "This era saw the rise of youth movements, market segmentation strategies, and identity politics. Social upheaval challenged dominant cultural narratives while new subcultures emerged as sites of cultural innovation.",
      keyDevelopment: "Recognition of innovation emerging from margin/center dynamics",
      innovations: [
        {
          name: "Subcultural Theory",
          authors: "Hebdige, Hall, Jefferson",
          description: "Analyzed how subordinate groups created distinctive cultural expressions that challenged dominant meanings, positioning subcultures as sites of symbolic resistance and innovation."
        },
        {
          name: "Production of Culture Perspective",
          authors: "Peterson, Hirsch",
          description: "Focused on how cultural products are shaped by the systems in which they are created, distributed, and evaluated, examining organizational structures behind cultural production."
        }
      ],
      color: "#E6723D",
      position: 1
    },
    {
      id: 3,
      period: "Post-Fordist Economic Restructuring",
      years: "1980s",
      context: "This period was marked by deindustrialization, service economy growth, and flexible specialization. Economic restructuring created new roles for cultural production as manufacturing declined in many advanced economies.",
      keyDevelopment: "Reconceptualizing cultural sectors as economic drivers",
      innovations: [
        {
          name: "Cultural Economics Advancement",
          authors: "Throsby, Towse",
          description: "Developed frameworks for understanding cultural value creation and the distinctive economics of cultural goods and services, advancing policy frameworks for cultural development."
        },
        {
          name: "Policy Economization of Culture",
          authors: "Myerscough, Various Policy Bodies",
          description: "Reframed cultural activities in economic terms, highlighting employment, tourism, and regeneration impacts. This period saw the emergence of 'economic impact studies' for cultural activities."
        }
      ],
      color: "#42A5F5",
      position: 2
    },
    {
      id: 4,
      period: "Digital Revolution and Network Paradigm",
      years: "1990s-2000s",
      context: "This era experienced Internet distribution growth, digitization of content, and disintermediation of cultural industries. New technologies transformed production, distribution, and consumption of cultural goods.",
      keyDevelopment: "Shift to network-based understanding of cultural innovation",
      innovations: [
        {
          name: "Creative Industries Framework",
          authors: "DCMS, Caves, Howkins",
          description: "Repositioned cultural activities around creativity, intellectual property, and digital potential, representing a policy shift toward seeing creativity as an economic resource."
        },
        {
          name: "Prosumption Models",
          authors: "Jenkins, Bruns, Leadbeater",
          description: "Analyzed how digital technologies blur boundaries between producers and consumers, introducing concepts like 'produsage,' 'co-creation,' and 'participatory culture.'"
        }
      ],
      color: "#26C6DA",
      position: 3
    },
    {
      id: 5,
      period: "Global Financial Crisis and Resilience Turn",
      years: "2008-2015",
      context: "This period experienced economic crisis, austerity policies, and cultural funding reductions. Economic instability prompted new questions about sustainable cultural development and resilience.",
      keyDevelopment: "Focus on cultural innovation's relationship to economic resilience",
      innovations: [
        {
          name: "Cultural Economy Resilience Studies",
          authors: "Pratt, Comunian, De Propris",
          description: "Examined how cultural and creative sectors respond to economic shocks, identifying distinctive resilience characteristics in cultural production networks."
        },
        {
          name: "Commons-Based Approaches",
          authors: "Ostrom, Benkler, Various Theorists",
          description: "Explored alternative production and governance models based on commons principles, shared resources, and collaborative production rather than purely market-based approaches."
        }
      ],
      color: "#66BB6A",
      position: 4
    },
    {
      id: 6,
      period: "Digital Platform Consolidation and Global Tensions",
      years: "2015-Present",
      context: "The current era is characterized by platform dominance, algorithmic governance, and cultural sovereignty concerns. Digital platforms have created new gatekeeping mechanisms while prompting questions about sustainability and equity.",
      keyDevelopment: "Focus on governance, sovereignty, and sustainability",
      innovations: [
        {
          name: "Platform Studies",
          authors: "Van Dijck, Poell, Srnicek",
          description: "Analyzes how digital platforms reshape cultural production, distribution, and consumption through data extraction, algorithmic curation, and network effects."
        },
        {
          name: "Sustainable Cultural Development Frameworks",
          authors: "UNESCO, Various Theorists",
          description: "Integrates cultural, social, economic, and environmental dimensions into holistic development approaches, focusing on long-term sustainability rather than short-term growth."
        }
      ],
      color: "#EC407A",
      position: 5
    }
  ];

  const toggleDetails = (id, innovation) => {
    if (innovation) {
      setShowFullDetails(prev => ({
        ...prev,
        [id + innovation]: !prev[id + innovation]
      }));
    }
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-gray-800 text-center">Historical Inflection Points</h1>
      <h2 className="text-xl mb-6 text-gray-600 text-center">Cultural Innovation Theory in Historical Context</h2>
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md w-full">
        <p className="text-gray-700">
          This analysis examines how pivotal historical developments have catalyzed transformations in cultural innovation theory. Rather than viewing theoretical evolution as an autonomous process, this framework demonstrates how theory responds to changing socioeconomic conditions and historical contexts.
        </p>
      </div>
      
      {/* Timeline visualization */}
      <div className="relative w-full h-24 mb-6">
        <div className="absolute w-full h-1 bg-gray-300 top-1/2 transform -translate-y-1/2"></div>
        
        {inflectionPoints.map((point) => (
          <div 
            key={point.id}
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
            style={{ left: `${(point.position * 20) + 10}%` }}
            onClick={() => setActivePoint(activePoint === point.id ? null : point.id)}
          >
            <div 
              className={`w-6 h-6 rounded-full z-10 transition-all duration-300 ${activePoint === point.id ? 'scale-125' : 'hover:scale-110'}`} 
              style={{ backgroundColor: point.color }}
            ></div>
            <div className={`absolute mt-2 text-xs font-semibold rotate-45 origin-top-left ${point.position % 2 === 0 ? '-mt-12 -rotate-45' : ''}`}>
              {point.years}
            </div>
          </div>
        ))}
      </div>
      
      {/* Selected period details */}
      {activePoint && (
        <div 
          className="w-full bg-white rounded-lg shadow-md p-5 mb-6 animate-fadeIn transition-all"
          style={{ borderLeft: `5px solid ${inflectionPoints.find(p => p.id === activePoint).color}` }}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {inflectionPoints.find(p => p.id === activePoint).period}
              </h3>
              <p className="text-gray-500">{inflectionPoints.find(p => p.id === activePoint).years}</p>
            </div>
            <button 
              onClick={() => setActivePoint(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-1">Historical Context</h4>
            <p className="text-gray-600">{inflectionPoints.find(p => p.id === activePoint).context}</p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-1">Key Development</h4>
            <p className="text-gray-600">{inflectionPoints.find(p => p.id === activePoint).keyDevelopment}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Theoretical Innovations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inflectionPoints.find(p => p.id === activePoint).innovations.map((innovation, idx) => (
                <div 
                  key={idx} 
                  className="bg-gray-50 p-3 rounded-md border border-gray-200 cursor-pointer"
                  onClick={() => toggleDetails(activePoint, innovation.name)}
                >
                  <div className="flex justify-between items-center">
                    <h5 className="font-semibold text-gray-700">{innovation.name}</h5>
                    <span className="text-xs text-gray-500">{innovation.authors}</span>
                  </div>
                  
                  <p className={`mt-2 text-gray-600 text-sm ${showFullDetails[activePoint + innovation.name] ? '' : 'line-clamp-2'}`}>
                    {innovation.description}
                  </p>
                  
                  {innovation.description.length > 100 && (
                    <button 
                      className="text-blue-500 text-xs mt-1 hover:text-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDetails(activePoint, innovation.name);
                      }}
                    >
                      {showFullDetails[activePoint + innovation.name] ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Period selection buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {inflectionPoints.map((point) => (
          <button
            key={point.id}
            className={`p-3 rounded-md text-left transition-all ${activePoint === point.id ? 'shadow-md' : 'shadow hover:shadow-md'}`}
            style={{ 
              backgroundColor: activePoint === point.id ? point.color + '20' : 'white',
              borderLeft: `3px solid ${point.color}`
            }}
            onClick={() => setActivePoint(activePoint === point.id ? null : point.id)}
          >
            <h3 className="font-semibold">{point.period}</h3>
            <p className="text-sm text-gray-500">{point.years}</p>
          </button>
        ))}
      </div>
      
      <div className="mt-8 bg-white p-5 rounded-lg shadow-md w-full">
        <h3 className="text-lg font-bold mb-3 text-gray-800">Key Insights for Cultural Innovation Resilience Framework</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-l-4 border-purple-500 pl-3">
            <p className="font-semibold text-gray-700">Theory-Practice Dialectic</p>
            <p className="text-gray-600 text-sm">Frameworks both emerge from and shape empirical conditions in an ongoing dialectical relationship</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-3">
            <p className="font-semibold text-gray-700">Crisis as Catalyst</p>
            <p className="text-gray-600 text-sm">Major theoretical developments often emerge from periods of disruption that challenge existing frameworks</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-3">
            <p className="font-semibold text-gray-700">Shifting Organizational Forms</p>
            <p className="text-gray-600 text-sm">Different historical periods produce distinctive organizational arrangements for cultural production</p>
          </div>
          <div className="border-l-4 border-pink-500 pl-3">
            <p className="font-semibold text-gray-700">Technology-Theory Relationship</p>
            <p className="text-gray-600 text-sm">Technological transformations consistently catalyze theoretical reconsiderations of cultural innovation</p>
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-sm mt-8">
        Click on timeline points or period buttons to explore historical contexts and their theoretical developments
      </div>
    </div>
  );
};

export default HistoricalInflectionPoints;
