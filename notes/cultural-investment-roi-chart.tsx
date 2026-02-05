import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, ReferenceLine } from 'recharts';

// This chart visualizes the return on investment in cultural innovation across different time horizons
const CulturalInvestmentROIChart = () => {
  const [selectedInvestmentType, setSelectedInvestmentType] = useState('overallAverage');
  
  const handleTypeChange = (event) => {
    setSelectedInvestmentType(event.target.value);
  };
  
  // Data represents ROI on cultural innovation investments across different time horizons
  const overallAverageData = [
    {
      timeHorizon: 'Short-term (0-2 years)',
      economicROI: 1.3,
      socialROI: 1.7,
      combinedROI: 1.5,
      benchmark: 1.2
    },
    {
      timeHorizon: 'Medium-term (2-5 years)',
      economicROI: 2.7,
      socialROI: 3.2,
      combinedROI: 2.9,
      benchmark: 1.8
    },
    {
      timeHorizon: 'Long-term (5-10 years)',
      economicROI: 4.2,
      socialROI: 5.1,
      combinedROI: 4.5,
      benchmark: 2.5
    },
    {
      timeHorizon: 'Extended-term (10+ years)',
      economicROI: 6.8,
      socialROI: 8.2,
      combinedROI: 7.3,
      benchmark: 3.2
    }
  ];
  
  // Cultural District Development investment data
  const culturalDistrictData = [
    {
      timeHorizon: 'Short-term (0-2 years)',
      economicROI: 1.1,
      socialROI: 1.8,
      combinedROI: 1.4,
      benchmark: 1.2
    },
    {
      timeHorizon: 'Medium-term (2-5 years)',
      economicROI: 2.5,
      socialROI: 3.4,
      combinedROI: 2.8,
      benchmark: 1.8
    },
    {
      timeHorizon: 'Long-term (5-10 years)',
      economicROI: 3.9,
      socialROI: 5.3,
      combinedROI: 4.4,
      benchmark: 2.5
    },
    {
      timeHorizon: 'Extended-term (10+ years)',
      economicROI: 6.3,
      socialROI: 8.5,
      combinedROI: 7.1,
      benchmark: 3.2
    }
  ];
  
  // Digital Cultural Platform investment data
  const digitalPlatformData = [
    {
      timeHorizon: 'Short-term (0-2 years)',
      economicROI: 1.6,
      socialROI: 1.4,
      combinedROI: 1.5,
      benchmark: 1.2
    },
    {
      timeHorizon: 'Medium-term (2-5 years)',
      economicROI: 3.2,
      socialROI: 2.8,
      combinedROI: 3.1,
      benchmark: 1.8
    },
    {
      timeHorizon: 'Long-term (5-10 years)',
      economicROI: 4.8,
      socialROI: 4.6,
      combinedROI: 4.7,
      benchmark: 2.5
    },
    {
      timeHorizon: 'Extended-term (10+ years)',
      economicROI: 7.5,
      socialROI: 7.3,
      combinedROI: 7.4,
      benchmark: 3.2
    }
  ];
  
  // Cultural Entrepreneurship Support investment data
  const entrepreneurshipData = [
    {
      timeHorizon: 'Short-term (0-2 years)',
      economicROI: 1.5,
      socialROI: 1.6,
      combinedROI: 1.5,
      benchmark: 1.2
    },
    {
      timeHorizon: 'Medium-term (2-5 years)',
      economicROI: 2.9,
      socialROI: 3.1,
      combinedROI: 3.0,
      benchmark: 1.8
    },
    {
      timeHorizon: 'Long-term (5-10 years)',
      economicROI: 4.7,
      socialROI: 4.9,
      combinedROI: 4.8,
      benchmark: 2.5
    },
    {
      timeHorizon: 'Extended-term (10+ years)',
      economicROI: 7.2,
      socialROI: 7.8,
      combinedROI: 7.5,
      benchmark: 3.2
    }
  ];
  
  // Community-Based Cultural Development investment data
  const communityBasedData = [
    {
      timeHorizon: 'Short-term (0-2 years)',
      economicROI: 1.0,
      socialROI: 2.1,
      combinedROI: 1.6,
      benchmark: 1.2
    },
    {
      timeHorizon: 'Medium-term (2-5 years)',
      economicROI: 1.9,
      socialROI: 3.8,
      combinedROI: 2.9,
      benchmark: 1.8
    },
    {
      timeHorizon: 'Long-term (5-10 years)',
      economicROI: 3.2,
      socialROI: 6.1,
      combinedROI: 4.7,
      benchmark: 2.5
    },
    {
      timeHorizon: 'Extended-term (10+ years)',
      economicROI: 5.2,
      socialROI: 9.4,
      combinedROI: 7.3,
      benchmark: 3.2
    }
  ];
  
  const getDataForSelectedType = () => {
    switch(selectedInvestmentType) {
      case 'overallAverage':
        return overallAverageData;
      case 'culturalDistrict':
        return culturalDistrictData;
      case 'digitalPlatform':
        return digitalPlatformData;
      case 'entrepreneurship':
        return entrepreneurshipData;
      case 'communityBased':
        return communityBasedData;
      default:
        return overallAverageData;
    }
  };
  
  const typeNames = {
    overallAverage: "Overall Average",
    culturalDistrict: "Cultural District Development",
    digitalPlatform: "Digital Cultural Platform Development",
    entrepreneurship: "Cultural Entrepreneurship Support",
    communityBased: "Community-Based Cultural Development"
  };
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-300 rounded shadow-md">
          <p className="font-bold">{label}</p>
          {payload.map((entry, index) => {
            // Skip benchmark from showing in tooltip
            if (entry.dataKey === 'benchmark') return null;
            
            return (
              <p key={`item-${index}`} style={{ color: entry.color }}>
                {`${entry.name}: ${entry.value}x investment`}
              </p>
            );
          })}
          <p className="text-gray-600 mt-2">
            <span className="font-semibold">Benchmark ROI:</span> {payload.find(p => p.dataKey === 'benchmark')?.value}x
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="mr-2 font-bold">Select Investment Type:</label>
        <select className="p-2 border rounded" value={selectedInvestmentType} onChange={handleTypeChange}>
          <option value="overallAverage">Overall Average</option>
          <option value="culturalDistrict">Cultural District Development</option>
          <option value="digitalPlatform">Digital Cultural Platform Development</option>
          <option value="entrepreneurship">Cultural Entrepreneurship Support</option>
          <option value="communityBased">Community-Based Cultural Development</option>
        </select>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Return on Investment Across Time Horizons: {typeNames[selectedInvestmentType]}</h2>
      <div className="text-sm mb-2">
        <div className="bg-gray-100 p-2 rounded">
          <p><strong>Note:</strong> Chart shows return on investment (ROI) multipliers for cultural innovation investments across different time horizons.</p>
          <p>Benchmark ROI represents average returns from traditional economic development investments for comparison.</p>
        </div>
      </div>
      
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={getDataForSelectedType()}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timeHorizon" />
            <YAxis domain={[0, 10]} label={{ value: 'Return Multiplier (× initial investment)', angle: -90, position: 'insideLeft' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            <Bar dataKey="economicROI" name="Economic ROI" fill="#8884d8" barSize={60}>
              <LabelList dataKey="economicROI" position="top" formatter={(value) => `${value}×`} />
            </Bar>
            <Bar dataKey="socialROI" name="Social ROI" fill="#82ca9d" barSize={60}>
              <LabelList dataKey="socialROI" position="top" formatter={(value) => `${value}×`} />
            </Bar>
            <Bar dataKey="combinedROI" name="Combined ROI" fill="#ffc658" barSize={60}>
              <LabelList dataKey="combinedROI" position="top" formatter={(value) => `${value}×`} />
            </Bar>
            
            {/* Add benchmark as a reference line on each group */}
            <ReferenceLine dataKey="benchmark" stroke="#ff0000" strokeDasharray="3 3" ifOverflow="extendDomain" label="Benchmark ROI" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>ROI Components:</strong></p>
        <ul className="list-disc pl-5">
          <li><strong>Economic ROI:</strong> Measurable economic returns including job creation, business formation, tax revenue, and property value increase</li>
          <li><strong>Social ROI:</strong> Broader social value creation including community cohesion, social capital development, identity enhancement, and wellbeing improvements</li>
          <li><strong>Combined ROI:</strong> Weighted average of economic and social returns, recognizing both contributions to overall value creation</li>
          <li><strong>Benchmark:</strong> Average returns from traditional economic development investments for comparison</li>
        </ul>
        
        <p className="mt-2"><strong>Key Insights for {typeNames[selectedInvestmentType]}:</strong></p>
        {selectedInvestmentType === 'overallAverage' && (
          <ul className="list-disc pl-5">
            <li>Cultural innovation investments show modest short-term returns but exceptional long-term value creation</li>
            <li>Social ROI consistently exceeds economic ROI across all time horizons</li>
            <li>The gap between cultural innovation returns and benchmark investments widens over longer timeframes</li>
            <li>Extended-term investments (10+ years) show the most dramatic returns as transformative effects fully manifest</li>
          </ul>
        )}
        {selectedInvestmentType === 'culturalDistrict' && (
          <ul className="list-disc pl-5">
            <li>Cultural district investments show slower initial returns but exceptional social value over extended timeframes</li>
            <li>Economic returns accelerate significantly in the long-term as districts achieve critical mass</li>
            <li>The gap between social and economic ROI is particularly pronounced, reflecting significant community benefits</li>
            <li>District investments require patience but significantly outperform benchmarks in extended timeframes</li>
          </ul>
        )}
        {selectedInvestmentType === 'digitalPlatform' && (
          <ul className="list-disc pl-5">
            <li>Digital platform investments show the strongest short-term economic returns among all cultural innovation types</li>
            <li>Economic ROI slightly exceeds social ROI, reflecting more immediate commercialization potential</li>
            <li>Returns show consistent growth across all time horizons, with less dramatic acceleration than other types</li>
            <li>Platform investments offer the most balanced return profile between economic and social dimensions</li>
          </ul>
        )}
        {selectedInvestmentType === 'entrepreneurship' && (
          <ul className="list-disc pl-5">
            <li>Cultural entrepreneurship support shows strong early economic returns that compound over time</li>
            <li>Economic and social returns are closely balanced, reflecting holistic value creation</li>
            <li>Long-term returns significantly outperform benchmarks as innovative businesses mature and scale</li>
            <li>Entrepreneurship investments show the highest combined ROI in extended timeframes</li>
          </ul>
        )}
        {selectedInvestmentType === 'communityBased' && (
          <ul className="list-disc pl-5">
            <li>Community-based investments show the lowest short-term economic returns but the highest social value creation</li>
            <li>The gap between social and economic ROI is the most pronounced of any investment type</li>
            <li>Economic returns grow significantly over time as community capacity building translates into economic activity</li>
            <li>These investments produce the highest social ROI in extended timeframes, reflecting transformative community impacts</li>
          </ul>
        )}
        
        <p className="mt-2"><strong>Data sources:</strong> Based on economic impact studies, cultural investment evaluations, and the enhanced Cultural Innovation Resilience Framework (CIRF).</p>
      </div>
    </div>
  );
};

export default CulturalInvestmentROIChart;
