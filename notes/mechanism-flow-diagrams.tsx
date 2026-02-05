import React, { useState } from 'react';

const MechanismFlowDiagrams = () => {
  const [selectedMechanism, setSelectedMechanism] = useState('symbolic');

  const mechanisms = {
    symbolic: {
      title: "Symbolic Knowledge Mechanisms",
      description: "Pathways through which expertise in creating and manipulating meanings, aesthetics, and experiences enhances resilience capacities.",
      color: "#19AB8B",
      steps: [
        {
          title: "Cultural Innovation Input",
          examples: [
            "Aesthetic innovation in design practices",
            "Narrative development in storytelling",
            "Experience design in service offerings",
            "Identity-focused creative expressions"
          ]
        },
        {
          title: "Symbolic Knowledge Processes",
          examples: [
            "Meaning Generation: Creating frameworks for understanding events",
            "Aesthetic Communication: Developing compelling expressions",
            "Experience Design: Crafting engaging interactions",
            "Identity Construction: Building distinctive identities"
          ]
        },
        {
          title: "Resilience Outcomes",
          examples: [
            "Enhanced Absorptive Capacity through meaning preservation during disruption",
            "Strengthened Adaptive Capacity via symbolic reframing of challenges",
            "Improved Transformative Capacity through radical reimagining of possibilities",
            "Developed Anticipatory Capacity via scenario creation and future visioning"
          ]
        }
      ],
      caseStudy: "The use of symbolic knowledge mechanisms was demonstrated when Glasgow transformed its post-industrial identity through cultural reimagining. By developing new narratives about the city's creative future, aesthetic reframing of industrial heritage, and experience design in new cultural quarters, the city enhanced its absorptive capacity during economic transition and built transformative capacity for fundamental economic restructuring."
    },
    network: {
      title: "Network Development Mechanisms",
      description: "Pathways through which the creation and strengthening of relationships between diverse actors enhances collective adaptation capabilities.",
      color: "#1A78B8",
      steps: [
        {
          title: "Cultural Innovation Input",
          examples: [
            "Collaborative creative projects across sectors",
            "Cultural intermediary development",
            "Cross-disciplinary innovation initiatives",
            "Community co-creation practices"
          ]
        },
        {
          title: "Network Development Processes",
          examples: [
            "Bridging Connection: Establishing links between separate domains",
            "Community Formation: Developing shared identities for collective action",
            "Collaborative Infrastructure: Creating platforms for joint innovation",
            "Cultural Brokerage: Translating knowledge across different domains"
          ]
        },
        {
          title: "Resilience Outcomes",
          examples: [
            "Enhanced Absorptive Capacity through diversified resource access",
            "Strengthened Adaptive Capacity via collective problem-solving capabilities",
            "Improved Transformative Capacity through recombinant innovation across network",
            "Developed Anticipatory Capacity via enhanced sensing of emerging trends"
          ]
        }
      ],
      caseStudy: "Barcelona's design sector demonstrates network development mechanisms through its creation of intermediary organizations connecting designers, manufacturers, and international markets. These networks enhanced the sector's absorptive capacity during economic downturns by providing access to diverse resources, while also building adaptive capacity through collaborative problem-solving during the digital transition. The development of design clusters with strong internal and external connections created effective knowledge sharing that enhanced collective resilience."
    },
    capital: {
      title: "Capital Conversion Mechanisms",
      description: "Pathways through which processes transform cultural capital into other capital forms that enhance resilience.",
      color: "#8D62CE",
      steps: [
        {
          title: "Cultural Innovation Input",
          examples: [
            "Distinctive cultural assets development",
            "Creative reputation building",
            "Cultural intellectual property creation",
            "Symbolic distinction cultivation"
          ]
        },
        {
          title: "Capital Conversion Processes",
          examples: [
            "Reputation Leveraging: Converting symbolic recognition into market opportunities",
            "Attention Attraction: Generating visibility that creates differentiation",
            "Cultural Asset Mobilization: Activating cultural resources for new value",
            "Distinction Advantage: Creating symbolic barriers to competition"
          ]
        },
        {
          title: "Resilience Outcomes",
          examples: [
            "Enhanced Absorptive Capacity through maintaining value during disruption",
            "Strengthened Adaptive Capacity via resource diversification options",
            "Improved Transformative Capacity through alternative value creation pathways",
            "Developed Anticipatory Capacity via having multiple convertible resources"
          ]
        }
      ],
      caseStudy: "South Korea's strategic conversion of cultural capital into economic resilience illustrates capital conversion mechanisms. By transforming distinctive cultural assets in music, film, and digital content into international brand recognition, export revenue, and tourism attraction, the country enhanced its economic absorptive capacity during global financial crises. Cultural distinction provided competitive advantages that maintained value despite economic downturns, while generating alternative revenue streams that enhanced adaptive capacity."
    },
    institutional: {
      title: "Institutional Innovation Mechanisms",
      description: "Pathways through which the development and modification of formal and informal rules enhance economic resilience.",
      color: "#F1B434",
      steps: [
        {
          title: "Cultural Innovation Input",
          examples: [
            "Cultural governance experimentation",
            "Creative regulatory frameworks",
            "New organizational forms in cultural sectors",
            "Cross-sectoral policy innovation"
          ]
        },
        {
          title: "Institutional Innovation Processes",
          examples: [
            "Governance Experimentation: Testing new coordination approaches",
            "Regulatory Innovation: Developing new rule systems for activities",
            "Institutional Entrepreneurship: Creating new organizational forms",
            "Policy Learning: Generating knowledge about intervention effectiveness"
          ]
        },
        {
          title: "Resilience Outcomes",
          examples: [
            "Enhanced Absorptive Capacity through flexible institutional responses",
            "Strengthened Adaptive Capacity via rapid institutional reconfiguration",
            "Improved Transformative Capacity through fundamental rule system reinvention",
            "Developed Anticipatory Capacity via forward-looking institutional design"
          ]
        }
      ],
      caseStudy: "Montreal's institutional innovation in developing new governance arrangements for its creative sectors demonstrates this mechanism. By creating hybrid organizations connecting public, private, and non-profit sectors, developing new funding models for cultural enterprises, and establishing experimental regulatory frameworks for emerging creative practices, the city enhanced its adaptive capacity during media industry disruption. These institutional innovations enabled rapid reconfiguration to address changing conditions while supporting experimental practices that developed transformative capacity."
    }
  };

  const renderFlowDiagram = (mechanism) => {
    const data = mechanisms[mechanism];
    
    return (
      <div className="flow-diagram mt-8 mb-12">
        <div className="flow-title text-2xl font-bold mb-4 text-center" style={{ color: data.color }}>
          {data.title}
        </div>
        <div className="flow-description text-gray-700 mb-8 text-center max-w-3xl mx-auto">
          {data.description}
        </div>
        
        <div className="flow-container flex justify-between items-center max-w-5xl mx-auto">
          {data.steps.map((step, index) => (
            <div key={index} className="flow-step relative" style={{ width: '30%' }}>
              <div 
                className="step-box rounded-lg p-5 shadow-lg" 
                style={{ 
                  backgroundColor: index === 1 ? data.color : '#f8f8f8',
                  color: index === 1 ? 'white' : '#333',
                  minHeight: '300px'
                }}
              >
                <h3 className="step-title text-lg font-bold mb-3">{step.title}</h3>
                <ul className="step-examples list-disc pl-5">
                  {step.examples.map((example, i) => (
                    <li key={i} className="mb-2 text-sm">
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Arrow connecting to next step */}
              {index < data.steps.length - 1 && (
                <div className="arrow-container absolute" style={{ right: '-13%', top: '50%' }}>
                  <div className="arrow" style={{ color: data.color }}>
                    <svg width="40" height="20" viewBox="0 0 40 20">
                      <path 
                        d="M0 10 L30 10 L25 5 L30 10 L25 15" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="case-study bg-gray-100 p-6 rounded-lg mt-10 max-w-4xl mx-auto border-l-4" style={{ borderColor: data.color }}>
          <h4 className="font-bold mb-2">Case Study Example:</h4>
          <p className="text-gray-700">{data.caseStudy}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="mechanism-flow-diagrams p-6">
      <h1 className="text-3xl font-bold mb-2 text-center">Causal Mechanism Pathways</h1>
      <p className="text-center text-gray-600 mb-8">
        How cultural innovation enhances economic resilience through four distinct causal mechanisms
      </p>
      
      <div className="mechanism-selector flex justify-center space-x-4 mb-8">
        {Object.entries(mechanisms).map(([key, mechanism]) => (
          <button
            key={key}
            onClick={() => setSelectedMechanism(key)}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedMechanism === key 
                ? 'bg-opacity-100 text-white' 
                : 'bg-opacity-20 text-gray-700 hover:bg-opacity-40'
            }`}
            style={{ 
              backgroundColor: selectedMechanism === key 
                ? mechanism.color 
                : `${mechanism.color}33`  // Add transparency
            }}
          >
            {mechanism.title.replace(' Mechanisms', '')}
          </button>
        ))}
      </div>
      
      {renderFlowDiagram(selectedMechanism)}
      
      <div className="framework-note bg-gray-100 p-4 rounded-lg mt-8 max-w-3xl mx-auto">
        <p className="text-sm text-gray-600 italic">
          Note: These causal mechanism pathways illustrate how specific cultural innovation processes enhance different 
          resilience capacities. Each mechanism operates through distinctive processes but contributes to all four resilience 
          capacities—absorptive, adaptive, transformative, and anticipatory—with varying emphasis. The mechanisms function 
          within specific contexts that condition their effectiveness and operate across different time horizons from immediate 
          response to longer-term transformation.
        </p>
      </div>
    </div>
  );
};

export default MechanismFlowDiagrams;