import React, { useState } from 'react';
import { ChevronDown, Check, Zap, Truck, Leaf, DollarSign, Users } from 'lucide-react';

const BambamEvaluationFramework = () => {
  const [activeTab, setActiveTab] = useState('dimensions');
  const [expandedItems, setExpandedItems] = useState({
    symbolic: true,
    process: false,
    experience: false,
    business: false,
    ecosystem: false
  });

  const toggleExpand = (key) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderExpandableSection = (title, content, key, icon) => {
    return (
      <div className="mb-4 border rounded-lg overflow-hidden shadow-sm">
        <button 
          onClick={() => toggleExpand(key)}
          className="w-full p-3 bg-blue-50 text-left font-medium flex justify-between items-center"
        >
          <div className="flex items-center">
            <span className="mr-3 text-blue-600">{icon}</span>
            {title}
          </div>
          <ChevronDown 
            className={`transition-transform ${expandedItems[key] ? 'rotate-180' : ''}`} 
            size={20} 
          />
        </button>
        {expandedItems[key] && (
          <div className="p-4 bg-white">
            {content}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-2">Bambam Karts</h1>
      <h2 className="text-lg text-gray-700 font-medium text-center mb-6">Cultural Innovation Evaluation Framework Application</h2>
      
      <div className="flex mb-6 overflow-x-auto">
        <button 
          className={`px-4 py-2 whitespace-nowrap ${activeTab === 'dimensions' ? 'bg-blue-100 border-b-2 border-blue-500 font-medium' : 'bg-gray-50'}`}
          onClick={() => setActiveTab('dimensions')}
        >
          Evaluation Dimensions
        </button>
        <button 
          className={`px-4 py-2 whitespace-nowrap ${activeTab === 'levels' ? 'bg-blue-100 border-b-2 border-blue-500 font-medium' : 'bg-gray-50'}`}
          onClick={() => setActiveTab('levels')}
        >
          Assessment Levels
        </button>
        <button 
          className={`px-4 py-2 whitespace-nowrap ${activeTab === 'values' ? 'bg-blue-100 border-b-2 border-blue-500 font-medium' : 'bg-gray-50'}`}
          onClick={() => setActiveTab('values')}
        >
          Value Assessment
        </button>
        <button 
          className={`px-4 py-2 whitespace-nowrap ${activeTab === 'methods' ? 'bg-blue-100 border-b-2 border-blue-500 font-medium' : 'bg-gray-50'}`}
          onClick={() => setActiveTab('methods')}
        >
          Evaluation Methods
        </button>
      </div>
      
      {activeTab === 'dimensions' && (
        <div>
          <p className="mb-4 text-gray-700 bg-blue-50 p-3 rounded">
            The framework evaluates Bambam Karts across five key innovation dimensions, identifying both metrics and evaluation questions for each dimension.
          </p>
          
          {renderExpandableSection(
            "Symbolic Innovation Dimension",
            <div>
              <p className="mb-2 text-sm text-gray-600">Evaluates how Bambam Karts transform cultural meaning and aesthetic qualities of the traditional Tawlailir.</p>
              
              <div className="mb-3">
                <h4 className="font-medium text-blue-700">Key Metrics:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Cultural authenticity rating by traditional artisans and cultural experts</li>
                  <li>Degree of recognition of Tawlailir design elements in Bambam Karts</li>
                  <li>Community perception surveys on cultural representation</li>
                  <li>Documentation of design evolution from traditional to contemporary forms</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-700">Evaluation Questions:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>How effectively does the Bambam Kart incorporate and transform traditional Tawlailir design elements?</li>
                  <li>To what extent does the Bambam Kart preserve the symbolic meaning of the traditional cart while adding contemporary value?</li>
                  <li>How do different demographic groups perceive the cultural authenticity of the innovation?</li>
                  <li>How does the design balance traditional aesthetics with modern functionality?</li>
                </ul>
              </div>
            </div>,
            'symbolic',
            <Zap size={20} />
          )}
          
          {renderExpandableSection(
            "Process Innovation Dimension",
            <div>
              <p className="mb-2 text-sm text-gray-600">Assesses how the production and development processes for Bambam Karts create new approaches to cultural production.</p>
              
              <div className="mb-3">
                <h4 className="font-medium text-blue-700">Key Metrics:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Integration of traditional craftsmanship with modern manufacturing techniques</li>
                  <li>Number of local artisans and technicians involved in production</li>
                  <li>Production efficiency compared to traditional methods</li>
                  <li>Community participation in design and production processes</li>
                  <li>Knowledge transfer effectiveness between traditional craftspeople and modern engineers</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-700">Evaluation Questions:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>How effectively does the production process combine traditional bamboo crafting with modern electric vehicle technology?</li>
                  <li>To what extent does the manufacturing approach preserve traditional skills while creating new capabilities?</li>
                  <li>How sustainable and scalable is the production process across different village contexts?</li>
                  <li>What new collaborative patterns have emerged between traditional artisans and technical specialists?</li>
                </ul>
              </div>
            </div>,
            'process',
            <Truck size={20} />
          )}
          
          {renderExpandableSection(
            "Experience Innovation Dimension",
            <div>
              <p className="mb-2 text-sm text-gray-600">Evaluates how Bambam Karts create new user experiences and engagement with transportation in rural communities.</p>
              
              <div className="mb-3">
                <h4 className="font-medium text-blue-700">Key Metrics:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>User satisfaction ratings across different user types (farmers, traders, community members)</li>
                  <li>Adaptation rate of the five prototype variants in different contexts</li>
                  <li>Journey time reduction for typical rural transportation tasks</li>
                  <li>Physical effort reduction compared to traditional methods</li>
                  <li>Frequency of use and range of applications by early adopters</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-700">Evaluation Questions:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>How does the Bambam Kart transform the daily transportation experience for rural users?</li>
                  <li>What new usage patterns have emerged that weren't anticipated in the design phase?</li>
                  <li>How do different demographic groups (by age, gender, occupation) experience and utilize the karts?</li>
                  <li>How does the motorized experience compare to traditional transportation methods in terms of user satisfaction?</li>
                </ul>
              </div>
            </div>,
            'experience',
            <Users size={20} />
          )}
          
          {renderExpandableSection(
            "Business Model Innovation Dimension",
            <div>
              <p className="mb-2 text-sm text-gray-600">Assesses how Bambam Karts create new value capture approaches and economic opportunities.</p>
              
              <div className="mb-3">
                <h4 className="font-medium text-blue-700">Key Metrics:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Cost comparison with alternative transportation methods (auto-rickshaws, pickup trucks)</li>
                  <li>Economic return for users (increased market access, reduced transportation costs)</li>
                  <li>New business opportunities created (manufacturing, maintenance, parts supply)</li>
                  <li>Potential revenue streams from different ownership/usage models</li>
                  <li>Financial sustainability of production and maintenance systems</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-700">Evaluation Questions:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>What new economic value does the Bambam Kart create for rural communities?</li>
                  <li>How viable are different business models for manufacturing, distribution, and maintenance?</li>
                  <li>What new entrepreneurial opportunities have emerged from the Bambam Kart ecosystem?</li>
                  <li>How can the economic benefits be equitably distributed across the community?</li>
                </ul>
              </div>
            </div>,
            'business',
            <DollarSign size={20} />
          )}
          
          {renderExpandableSection(
            "Ecosystem Innovation Dimension",
            <div>
              <p className="mb-2 text-sm text-gray-600">Evaluates how Bambam Karts transform broader systems and create spillover effects in rural Mizoram.</p>
              
              <div className="mb-3">
                <h4 className="font-medium text-blue-700">Key Metrics:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Changes in market access patterns for rural communities</li>
                  <li>Impact on local bamboo cultivation and supply chains</li>
                  <li>Emergence of support services (maintenance networks, charging stations)</li>
                  <li>Environmental impact compared to traditional transportation</li>
                  <li>Influence on policy frameworks for rural transportation</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-700">Evaluation Questions:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>How does the Bambam Kart ecosystem influence other sectors like agriculture, retail, and healthcare?</li>
                  <li>What new relationships have formed between rural villages and urban markets?</li>
                  <li>How has the innovation affected resource usage patterns (bamboo harvesting, energy consumption)?</li>
                  <li>What policy changes might be needed to support and scale the innovation?</li>
                </ul>
              </div>
            </div>,
            'ecosystem',
            <Leaf size={20} />
          )}
        </div>
      )}
      
      {activeTab === 'levels' && (
        <div>
          <p className="mb-4 text-gray-700 bg-blue-50 p-3 rounded">
            The framework assesses Bambam Karts across multiple levels from specific projects to broader societal impacts, enabling comprehensive evaluation.
          </p>
          
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-green-50 p-3 font-medium">
                Project Level Assessment
              </div>
              <div className="p-4">
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><span className="font-medium">Unit of Analysis:</span> Individual Bambam Kart prototypes (E-Kart, Modular add-ons, Split Kart-Trailer, Mini-Kart, Electric Wheelbarrow)</li>
                  <li><span className="font-medium">Key Metrics:</span> Performance specifications, durability in field testing, user feedback on specific designs, technical issues encountered, adaptability to different terrains</li>
                  <li><span className="font-medium">Evaluation Method:</span> Prototype testing in the five selected villages, technical performance tracking, user interviews about specific prototype features</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-blue-50 p-3 font-medium">
                Organization Level Assessment
              </div>
              <div className="p-4">
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><span className="font-medium">Unit of Analysis:</span> The Bambam Karts project as a whole, including design, production, distribution, and support systems</li>
                  <li><span className="font-medium">Key Metrics:</span> Production capacity, skills development among team members, manufacturing efficiency, organizational learning, strategic alignment with mission and vision</li>
                  <li><span className="font-medium">Evaluation Method:</span> Project management assessment, capability development tracking, strategic review of project goals against outcomes</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-purple-50 p-3 font-medium">
                Sector Level Assessment
              </div>
              <div className="p-4">
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><span className="font-medium">Unit of Analysis:</span> Rural transportation sector in Mizoram and impacts of Bambam Karts on this sector</li>
                  <li><span className="font-medium">Key Metrics:</span> Market share relative to competing transportation options (auto-rickshaws, pickup trucks), sector-wide performance standards, influence on transportation patterns</li>
                  <li><span className="font-medium">Evaluation Method:</span> Sectoral analysis, comparative studies with other transportation options, transportation pattern mapping in pilot villages</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-yellow-50 p-3 font-medium">
                Cross-Sector Level Assessment
              </div>
              <div className="p-4">
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><span className="font-medium">Unit of Analysis:</span> Interaction between Bambam Karts and other sectors (agriculture, retail, healthcare, education)</li>
                  <li><span className="font-medium">Key Metrics:</span> Agricultural market access improvements, changes in healthcare utilization, educational opportunity access, retail supply chain efficiencies</li>
                  <li><span className="font-medium">Evaluation Method:</span> Cross-sectoral impact studies, value chain analysis, before-and-after comparisons of inter-sector interactions</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-red-50 p-3 font-medium">
                Societal Level Assessment
              </div>
              <div className="p-4">
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><span className="font-medium">Unit of Analysis:</span> Broader societal impacts of Bambam Karts on rural Mizoram communities</li>
                  <li><span className="font-medium">Key Metrics:</span> Economic development indicators, cultural preservation measures, environmental sustainability impact, community empowerment and resilience</li>
                  <li><span className="font-medium">Evaluation Method:</span> Longitudinal community studies, cultural impact assessment, environmental impact assessment, participatory rural appraisal</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'values' && (
        <div>
          <p className="mb-4 text-gray-700 bg-blue-50 p-3 rounded">
            The framework evaluates Bambam Karts across five value dimensions, recognizing that cultural innovations create multiple forms of value beyond economic returns.
          </p>
          
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-pink-50 p-3 font-medium">
                Intrinsic Value Assessment
              </div>
              <div className="p-4">
                <p className="text-sm mb-2">Evaluates the inherent cultural and aesthetic qualities of Bambam Karts</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><span className="font-medium">Key Metrics:</span> Cultural authenticity ratings, aesthetic quality assessments, preservation of traditional design elements</li>
                  <li><span className="font-medium">Evaluation Questions:</span> How effectively does the Bambam Kart embody Mizo cultural values? What aesthetic qualities make it distinctive and meaningful to users?</li>
                  <li><span className="font-medium">Assessment Methods:</span> Expert cultural assessments, user experience surveys, cultural significance mapping</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-green-50 p-3 font-medium">
                Instrumental Value Assessment
              </div>
              <div className="p-4">
                <p className="text-sm mb-2">Evaluates how Bambam Karts contribute to specific economic and social objectives</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><span className="font-medium">Key Metrics:</span> Time saved in transportation, cost reduction compared to alternatives, income improvements for users, job creation</li>
                  <li><span className="font-medium">Evaluation Questions:</span> How does the Bambam Kart improve economic outcomes for users? What quantifiable benefits does it deliver to communities?</li>
                  <li><span className="font-medium">Assessment Methods:</span> Economic impact analysis, cost-benefit analysis, comparative transportation studies</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-blue-50 p-3 font-medium">
                Institutional Value Assessment
              </div>
              <div className="p-4">
                <p className="text-sm mb-2">Evaluates how Bambam Karts contribute to organizational development and capability building</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><span className="font-medium">Key Metrics:</span> New skills developed in the community, organizational capacity growth, knowledge retention and transfer</li>
                  <li><span className="font-medium">Evaluation Questions:</span> How does the Bambam Kart project build lasting capabilities in the community? What new institutions or organizational forms have emerged?</li>
                  <li><span className="font-medium">Assessment Methods:</span> Capability assessment, organizational development tracking, skills inventory analysis</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-purple-50 p-3 font-medium">
                Network Value Assessment
              </div>
              <div className="p-4">
                <p className="text-sm mb-2">Evaluates how Bambam Karts contribute to ecosystem relationships and connections</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><span className="font-medium">Key Metrics:</span> New partnerships formed, supply chain relationships established, community connections strengthened</li>
                  <li><span className="font-medium">Evaluation Questions:</span> How does the Bambam Kart create new connections between people, organizations, and resources? What new networks have formed around the innovation?</li>
                  <li><span className="font-medium">Assessment Methods:</span> Network analysis, partnership mapping, value chain relationship assessment</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-yellow-50 p-3 font-medium">
                Platform Value Assessment
              </div>
              <div className="p-4">
                <p className="text-sm mb-2">Evaluates how Bambam Karts create foundations for future value creation</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><span className="font-medium">Key Metrics:</span> New innovation opportunities created, adaptability to future needs, enabling infrastructure development</li>
                  <li><span className="font-medium">Evaluation Questions:</span> How does the Bambam Kart enable future innovations and value creation? What new possibilities does it open for the community?</li>
                  <li><span className="font-medium">Assessment Methods:</span> Option value analysis, future scenario planning, innovation ecosystem mapping</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'methods' && (
        <div>
          <p className="mb-4 text-gray-700 bg-blue-50 p-3 rounded">
            The framework employs multiple methodological approaches to evaluate Bambam Karts, recognizing that different aspects require different assessment techniques.
          </p>
          
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-teal-50 p-3 font-medium">
                Quantitative Methods
              </div>
              <div className="p-4">
                <p className="text-sm mb-2">Structured approaches to measure specific metrics and outcomes</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><span className="font-medium">Transportation Efficiency Metrics:</span> Journey time reduction, load capacity utilization, frequency of trips, distance covered</li>
                  <li><span className="font-medium">Economic Impact Measures:</span> Cost savings compared to alternatives, income improvements, market access expansion</li>
                  <li><span className="font-medium">Adoption Tracking:</span> Usage rates across different user groups, adaptation patterns for different prototypes</li>
                  <li><span className="font-medium">Data Collection Tools:</span> Structured surveys, usage logs, performance testing, market data analysis</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-indigo-50 p-3 font-medium">
                Qualitative Methods
              </div>
              <div className="p-4">
                <p className="text-sm mb-2">In-depth approaches to understand meaning, context, and experience</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><span className="font-medium">User Experience Studies:</span> In-depth interviews with different user groups, observation of usage patterns, user journey mapping</li>
                  <li><span className="font-medium">Cultural Impact Assessment:</span> Cultural expert interviews, community focus groups, ethnographic studies of transportation practices</li>
                  <li><span className="font-medium">Innovation Process Analysis:</span> Case studies of development process, historical comparison with traditional practices</li>
                  <li><span className="font-medium">Data Collection Tools:</span> Semi-structured interviews, focus groups, observational studies, cultural mapping exercises</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-green-50 p-3 font-medium">
                Economic Methods
              </div>
              <div className="p-4">
                <p className="text-sm mb-2">Specialized approaches to assess economic and financial dimensions</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><span className="font-medium">Cost-Benefit Analysis:</span> Comparing costs of development and implementation against measurable benefits</li>
                  <li><span className="font-medium">Value Chain Analysis:</span> Mapping how Bambam Karts affect agricultural and retail value chains</li>
                  <li><span className="font-medium">Non-Market Valuation:</span> Assessing cultural value and environmental benefits using contingent valuation</li>
                  <li><span className="font-medium">Data Collection Tools:</span> Economic surveys, market analysis, willingness-to-pay studies</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-orange-50 p-3 font-medium">
                Participatory Methods
              </div>
              <div className="p-4">
                <p className="text-sm mb-2">Collaborative approaches that engage stakeholders directly in evaluation</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><span className="font-medium">Co-Creation Workshops:</span> Collaborative design and evaluation sessions with community members</li>
                  <li><span className="font-medium">Participatory Rural Appraisal:</span> Community-led assessment of transportation needs and innovation impacts</li>
                  <li><span className="font-medium">User Innovation Tracking:</span> Documentation of user-led adaptations and modifications to the karts</li>
                  <li><span className="font-medium">Data Collection Tools:</span> Community mapping exercises, collaborative impact journaling, storytelling circles</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-red-50 p-3 font-medium">
                Visual Methods
              </div>
              <div className="p-4">
                <p className="text-sm mb-2">Visual approaches to represent complex relationships and findings</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><span className="font-medium">Journey Mapping:</span> Visual representation of how Bambam Karts change transportation experiences</li>
                  <li><span className="font-medium">Network Visualization:</span> Mapping relationships between different stakeholders in the Bambam ecosystem</li>
                  <li><span className="font-medium">Impact Dashboards:</span> Visual displays of key performance indicators across multiple value dimensions</li>
                  <li><span className="font-medium">Data Collection Tools:</span> Photographic documentation, video ethnography, participatory mapping</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BambamEvaluationFramework;
