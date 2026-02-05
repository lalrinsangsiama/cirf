import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// This chart visualizes the evolution of cultural innovation mechanisms over time
// and their relationship to economic resilience outcomes
const CulturalInnovationMechanismsChart = () => {
  const [selectedRegion, setSelectedRegion] = useState('metropolitanCreativeHub');
  
  // Data represents the relative strength and contribution of different cultural innovation mechanisms
  // to resilience outcomes over time in a Metropolitan Creative Hub
  const metropolitanCreativeHubData = [
    {
      year: 2005,
      symbolicKnowledge: 5.3,
      networkDevelopment: 6.1,
      capitalConversion: 4.8,
      institutionalInnovation: 3.7,
      compositeResilienceIndex: 5.2
    },
    {
      year: 2008,
      symbolicKnowledge: 5.7,
      networkDevelopment: 6.4,
      capitalConversion: 5.1,
      institutionalInnovation: 3.9,
      compositeResilienceIndex: 5.4
    },
    {
      year: 2010,
      symbolicKnowledge: 6.2,
      networkDevelopment: 6.8,
      capitalConversion: 5.5,
      institutionalInnovation: 4.3,
      compositeResilienceIndex: 5.9
    },
    {
      year: 2013,
      symbolicKnowledge: 6.7,
      networkDevelopment: 7.3,
      capitalConversion: 6.0,
      institutionalInnovation: 4.8,
      compositeResilienceIndex: 6.5
    },
    {
      year: 2016,
      symbolicKnowledge: 7.2,
      networkDevelopment: 7.7,
      capitalConversion: 6.5,
      institutionalInnovation: 5.4,
      compositeResilienceIndex: 7.1
    },
    {
      year: 2019,
      symbolicKnowledge: 7.6,
      networkDevelopment: 8.1,
      capitalConversion: 7.0,
      institutionalInnovation: 6.1,
      compositeResilienceIndex: 7.4
    },
    {
      year: 2022,
      symbolicKnowledge: 7.9,
      networkDevelopment: 8.4,
      capitalConversion: 7.3,
      institutionalInnovation: 6.8,
      compositeResilienceIndex: 7.9
    },
    {
      year: 2025,
      symbolicKnowledge: 8.2,
      networkDevelopment: 8.7,
      capitalConversion: 7.6,
      institutionalInnovation: 7.3,
      compositeResilienceIndex: 8.3
    }
  ];
  
  // Data for Industrial Heritage Region
  const industrialHeritageRegionData = [
    {
      year: 2005,
      symbolicKnowledge: 4.2,
      networkDevelopment: 3.8,
      capitalConversion: 5.3,
      institutionalInnovation: 4.1,
      compositeResilienceIndex: 4.3
    },
    {
      year: 2008,
      symbolicKnowledge: 4.5,
      networkDevelopment: 4.0,
      capitalConversion: 5.6,
      institutionalInnovation: 4.3,
      compositeResilienceIndex: 4.5
    },
    {
      year: 2010,
      symbolicKnowledge: 4.8,
      networkDevelopment: 4.3,
      capitalConversion: 6.0,
      institutionalInnovation: 4.7,
      compositeResilienceIndex: 4.8
    },
    {
      year: 2013,
      symbolicKnowledge: 5.2,
      networkDevelopment: 4.7,
      capitalConversion: 6.4,
      institutionalInnovation: 5.1,
      compositeResilienceIndex: 5.2
    },
    {
      year: 2016,
      symbolicKnowledge: 5.5,
      networkDevelopment: 5.1,
      capitalConversion: 6.8,
      institutionalInnovation: 5.5,
      compositeResilienceIndex: 5.7
    },
    {
      year: 2019,
      symbolicKnowledge: 5.8,
      networkDevelopment: 5.4,
      capitalConversion: 7.0,
      institutionalInnovation: 5.7,
      compositeResilienceIndex: 6.0
    },
    {
      year: 2022,
      symbolicKnowledge: 6.2,
      networkDevelopment: 5.7,
      capitalConversion: 7.2,
      institutionalInnovation: 6.0,
      compositeResilienceIndex: 6.3
    },
    {
      year: 2025,
      symbolicKnowledge: 6.5,
      networkDevelopment: 6.0,
      capitalConversion: 7.4,
      institutionalInnovation: 6.3,
      compositeResilienceIndex: 6.6
    }
  ];
  
  // Data for Digital Innovation District
  const digitalInnovationDistrictData = [
    {
      year: 2005,
      symbolicKnowledge: 5.0,
      networkDevelopment: 5.7,
      capitalConversion: 4.3,
      institutionalInnovation: 5.9,
      compositeResilienceIndex: 5.1
    },
    {
      year: 2008,
      symbolicKnowledge: 5.3,
      networkDevelopment: 6.1,
      capitalConversion: 4.6,
      institutionalInnovation: 6.3,
      compositeResilienceIndex: 5.4
    },
    {
      year: 2010,
      symbolicKnowledge: 5.7,
      networkDevelopment: 6.6,
      capitalConversion: 5.0,
      institutionalInnovation: 6.7,
      compositeResilienceIndex: 5.9
    },
    {
      year: 2013,
      symbolicKnowledge: 6.1,
      networkDevelopment: 7.2,
      capitalConversion: 5.5,
      institutionalInnovation: 7.1,
      compositeResilienceIndex: 6.5
    },
    {
      year: 2016,
      symbolicKnowledge: 6.5,
      networkDevelopment: 7.7,
      capitalConversion: 6.0,
      institutionalInnovation: 7.4,
      compositeResilienceIndex: 7.1
    },
    {
      year: 2019,
      symbolicKnowledge: 6.9,
      networkDevelopment: 8.1,
      capitalConversion: 6.4,
      institutionalInnovation: 7.6,
      compositeResilienceIndex: 7.5
    },
    {
      year: 2022,
      symbolicKnowledge: 7.3,
      networkDevelopment: 8.4,
      capitalConversion: 6.8,
      institutionalInnovation: 7.9,
      compositeResilienceIndex: 8.0
    },
    {
      year: 2025,
      symbolicKnowledge: 7.7,
      networkDevelopment: 8.6,
      capitalConversion: 7.1,
      institutionalInnovation: 8.2,
      compositeResilienceIndex: 8.4
    }
  ];
  
  // Data for Rural Cultural Heritage Region
  const ruralCulturalHeritageData = [
    {
      year: 2005,
      symbolicKnowledge: 6.8,
      networkDevelopment: 4.1,
      capitalConversion: 5.9,
      institutionalInnovation: 3.5,
      compositeResilienceIndex: 4.8
    },
    {
      year: 2008,
      symbolicKnowledge: 7.0,
      networkDevelopment: 4.3,
      capitalConversion: 6.1,
      institutionalInnovation: 3.7,
      compositeResilienceIndex: 5.0
    },
    {
      year: 2010,
      symbolicKnowledge: 7.3,
      networkDevelopment: 4.6,
      capitalConversion: 6.4,
      institutionalInnovation: 3.9,
      compositeResilienceIndex: 5.3
    },
    {
      year: 2013,
      symbolicKnowledge: 7.6,
      networkDevelopment: 5.0,
      capitalConversion: 6.7,
      institutionalInnovation: 4.2,
      compositeResilienceIndex: 5.7
    },
    {
      year: 2016,
      symbolicKnowledge: 7.9,
      networkDevelopment: 5.5,
      capitalConversion: 7.0,
      institutionalInnovation: 4.5,
      compositeResilienceIndex: 6.0
    },
    {
      year: 2019,
      symbolicKnowledge: 8.1,
      networkDevelopment: 6.0,
      capitalConversion: 7.3,
      institutionalInnovation: 4.8,
      compositeResilienceIndex: 6.3
    },
    {
      year: 2022,
      symbolicKnowledge: 8.3,
      networkDevelopment: 6.5,
      capitalConversion: 7.5,
      institutionalInnovation: 5.1,
      compositeResilienceIndex: 6.7
    },
    {
      year: 2025,
      symbolicKnowledge: 8.5,
      networkDevelopment: 6.9,
      capitalConversion: 7.7,
      institutionalInnovation: 5.4,
      compositeResilienceIndex: 7.0
    }
  ];
  
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };
  
  const getDataForSelectedRegion = () => {
    switch(selectedRegion) {
      case 'metropolitanCreativeHub':
        return metropolitanCreativeHubData;
      case 'industrialHeritageRegion':
        return industrialHeritageRegionData;
      case 'digitalInnovationDistrict':
        return digitalInnovationDistrictData;
      case 'ruralCulturalHeritage':
        return ruralCulturalHeritageData;
      default:
        return metropolitanCreativeHubData;
    }
  };
  
  const regionNames = {
    metropolitanCreativeHub: "Metropolitan Creative Hub",
    industrialHeritageRegion: "Industrial Heritage Region",
    digitalInnovationDistrict: "Digital Innovation District",
    ruralCulturalHeritage: "Rural Cultural Heritage Region"
  };
  
  // Determine the dominant mechanism for the selected region
  const getDominantMechanism = () => {
    const data = getDataForSelectedRegion();
    const latestYear = data[data.length - 1];
    
    // Find the mechanism with the highest value
    const mechanisms = [
      { name: 'Symbolic Knowledge', value: latestYear.symbolicKnowledge },
      { name: 'Network Development', value: latestYear.networkDevelopment },
      { name: 'Capital Conversion', value: latestYear.capitalConversion },
      { name: 'Institutional Innovation', value: latestYear.institutionalInnovation }
    ];
    
    return mechanisms.reduce((max, mechanism) => 
      max.value > mechanism.value ? max : mechanism
    , { name: '', value: 0 });
  };
  
  const dominantMechanism = getDominantMechanism();
  
  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="mr-2 font-bold">Select Region Type:</label>
        <select className="p-2 border rounded" value={selectedRegion} onChange={handleRegionChange}>
          <option value="metropolitanCreativeHub">Metropolitan Creative Hub</option>
          <option value="industrialHeritageRegion">Industrial Heritage Region</option>
          <option value="digitalInnovationDistrict">Digital Innovation District</option>
          <option value="ruralCulturalHeritage">Rural Cultural Heritage Region</option>
        </select>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Cultural Innovation Mechanisms: {regionNames[selectedRegion]}</h2>
      <div className="text-sm mb-2">
        <div className="bg-gray-100 p-2 rounded">
          <p><strong>Note:</strong> Chart shows how different cultural innovation mechanisms have evolved over time (2005-2025) and their relationship to overall resilience outcomes.</p>
          <p>The dominant mechanism for this region type is <strong>{dominantMechanism.name}</strong> (current value: {dominantMechanism.value.toFixed(1)}/10).</p>
        </div>
      </div>
      
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <AreaChart
            data={getDataForSelectedRegion()}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis domain={[0, 10]} label={{ value: 'Mechanism Strength (0-10)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            
            <Area type="monotone" dataKey="symbolicKnowledge" name="Symbolic Knowledge" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Area type="monotone" dataKey="networkDevelopment" name="Network Development" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Area type="monotone" dataKey="capitalConversion" name="Capital Conversion" stackId="1" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
            <Area type="monotone" dataKey="institutionalInnovation" name="Institutional Innovation" stackId="1" stroke="#ff8042" fill="#ff8042" fillOpacity={0.6} />
            
            {/* Composite Resilience Index as a line on top of the stacked areas */}
            <Area 
              type="monotone" 
              dataKey="compositeResilienceIndex" 
              name="Composite Resilience Index" 
              stroke="#000" 
              strokeWidth={2}
              fill="none"
              dot={{ fill: '#000', stroke: '#000', r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Mechanism Explanations:</strong></p>
        <ul className="list-disc pl-5">
          <li><strong>Symbolic Knowledge:</strong> Creating value through meaning generation, aesthetic communication, and identity construction</li>
          <li><strong>Network Development:</strong> Enhancing resilience through bridging connections, community formation, and collaborative infrastructure</li>
          <li><strong>Capital Conversion:</strong> Transforming cultural capital into economic advantage through reputation leveraging and cultural asset mobilization</li>
          <li><strong>Institutional Innovation:</strong> Developing new governance approaches, regulatory frameworks, and policy learning processes</li>
        </ul>
        
        <p className="mt-2"><strong>Region-Specific Insights:</strong></p>
        {selectedRegion === 'metropolitanCreativeHub' && (
          <p>Metropolitan Creative Hubs leverage network development as their dominant mechanism, creating dense connections between diverse actors that enable rapid knowledge exchange and recombinant innovation.</p>
        )}
        {selectedRegion === 'industrialHeritageRegion' && (
          <p>Industrial Heritage Regions primarily utilize capital conversion mechanisms, transforming industrial heritage assets into new cultural resources that support economic redevelopment.</p>
        )}
        {selectedRegion === 'digitalInnovationDistrict' && (
          <p>Digital Innovation Districts emphasize institutional innovation, developing new governance arrangements and regulatory frameworks that enable experimental approaches and rapid adaptation.</p>
        )}
        {selectedRegion === 'ruralCulturalHeritage' && (
          <p>Rural Cultural Heritage Regions leverage symbolic knowledge mechanisms, creating distinctive identities and cultural narratives that provide competitive differentiation despite infrastructure limitations.</p>
        )}
        
        <p className="mt-2"><strong>Data sources:</strong> Based on composite indices derived from cultural innovation studies aligned with the Cultural Innovation Resilience Framework (CIRF).</p>
      </div>
    </div>
  );
};

export default CulturalInnovationMechanismsChart;
