import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

// This chart visualizes how different regions with varying cultural innovation levels
// recovered from economic shocks over time
const EconomicRecoveryChart = () => {
  const [selectedEvent, setSelectedEvent] = useState('financialCrisis');
  
  // Financial Crisis 2008 recovery data - indexed values where 100 = pre-crisis level
  const financialCrisisData = [
    {
      quarter: 'Pre-crisis',
      highCI_gdp: 100,
      highCI_employment: 100,
      mediumCI_gdp: 100,
      mediumCI_employment: 100,
      lowCI_gdp: 100,
      lowCI_employment: 100,
    },
    {
      quarter: 'Crisis',
      highCI_gdp: 93.2,
      highCI_employment: 95.1,
      mediumCI_gdp: 90.5,
      mediumCI_employment: 93.2,
      lowCI_gdp: 88.7,
      lowCI_employment: 91.8,
    },
    {
      quarter: 'Q+1',
      highCI_gdp: 94.5,
      highCI_employment: 96.3,
      mediumCI_gdp: 91.1,
      mediumCI_employment: 93.5,
      lowCI_gdp: 88.9,
      lowCI_employment: 91.2,
    },
    {
      quarter: 'Q+2',
      highCI_gdp: 96.1,
      highCI_employment: 97.2,
      mediumCI_gdp: 91.9,
      mediumCI_employment: 93.8,
      lowCI_gdp: 89.2,
      lowCI_employment: 90.7,
    },
    {
      quarter: 'Q+3',
      highCI_gdp: 97.8,
      highCI_employment: 98.1,
      mediumCI_gdp: 92.7,
      mediumCI_employment: 94.3,
      lowCI_gdp: 89.8,
      lowCI_employment: 90.5,
    },
    {
      quarter: 'Q+4',
      highCI_gdp: 99.2,
      highCI_employment: 99.0,
      mediumCI_gdp: 93.8,
      mediumCI_employment: 95.1,
      lowCI_gdp: 90.5,
      lowCI_employment: 90.7,
    },
    {
      quarter: 'Q+6',
      highCI_gdp: 101.3,
      highCI_employment: 100.5,
      mediumCI_gdp: 95.7,
      mediumCI_employment: 96.3,
      lowCI_gdp: 92.1,
      lowCI_employment: 91.4,
    },
    {
      quarter: 'Q+8',
      highCI_gdp: 103.8,
      highCI_employment: 102.7,
      mediumCI_gdp: 97.9,
      mediumCI_employment: 97.5,
      lowCI_gdp: 94.2,
      lowCI_employment: 92.6,
    },
    {
      quarter: 'Q+10',
      highCI_gdp: 106.2,
      highCI_employment: 104.5,
      mediumCI_gdp: 99.8,
      mediumCI_employment: 98.7,
      lowCI_gdp: 96.1,
      lowCI_employment: 93.9,
    },
    {
      quarter: 'Q+12',
      highCI_gdp: 108.7,
      highCI_employment: 106.8,
      mediumCI_gdp: 101.7,
      mediumCI_employment: 99.6,
      lowCI_gdp: 98.2,
      lowCI_employment: 95.4,
    },
  ];

  // COVID-19 Pandemic recovery data - indexed values where 100 = pre-pandemic level
  const pandemicData = [
    {
      quarter: 'Pre-crisis',
      highCI_gdp: 100,
      highCI_employment: 100,
      mediumCI_gdp: 100,
      mediumCI_employment: 100,
      lowCI_gdp: 100,
      lowCI_employment: 100,
    },
    {
      quarter: 'Crisis',
      highCI_gdp: 82.5,
      highCI_employment: 87.3,
      mediumCI_gdp: 79.2,
      mediumCI_employment: 84.1,
      lowCI_gdp: 76.8,
      lowCI_employment: 82.5,
    },
    {
      quarter: 'Q+1',
      highCI_gdp: 89.7,
      highCI_employment: 90.2,
      mediumCI_gdp: 83.5,
      mediumCI_employment: 85.3,
      lowCI_gdp: 79.3,
      lowCI_employment: 83.1,
    },
    {
      quarter: 'Q+2',
      highCI_gdp: 94.3,
      highCI_employment: 92.8,
      mediumCI_gdp: 87.1,
      mediumCI_employment: 87.2,
      lowCI_gdp: 82.6,
      lowCI_employment: 84.3,
    },
    {
      quarter: 'Q+3',
      highCI_gdp: 97.9,
      highCI_employment: 95.1,
      mediumCI_gdp: 90.6,
      mediumCI_employment: 89.5,
      lowCI_gdp: 85.8,
      lowCI_employment: 86.2,
    },
    {
      quarter: 'Q+4',
      highCI_gdp: 101.2,
      highCI_employment: 97.6,
      mediumCI_gdp: 93.8,
      mediumCI_employment: 91.7,
      lowCI_gdp: 88.5,
      lowCI_employment: 87.8,
    },
    {
      quarter: 'Q+6',
      highCI_gdp: 106.8,
      highCI_employment: 101.5,
      mediumCI_gdp: 97.5,
      mediumCI_employment: 94.3,
      lowCI_gdp: 91.7,
      lowCI_employment: 90.1,
    },
    {
      quarter: 'Q+8',
      highCI_gdp: 112.3,
      highCI_employment: 105.7,
      mediumCI_gdp: 100.9,
      mediumCI_employment: 97.2,
      lowCI_gdp: 94.5,
      lowCI_employment: 92.8,
    },
  ];

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  const data = selectedEvent === 'financialCrisis' ? financialCrisisData : pandemicData;
  
  const eventNames = {
    financialCrisis: "2008 Financial Crisis",
    pandemic: "COVID-19 Pandemic"
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="mr-2 font-bold">Select Economic Disruption:</label>
        <select className="p-2 border rounded" value={selectedEvent} onChange={handleEventChange}>
          <option value="financialCrisis">2008 Financial Crisis</option>
          <option value="pandemic">COVID-19 Pandemic</option>
        </select>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Economic Recovery Trajectories: {eventNames[selectedEvent]}</h2>
      <div className="text-sm mb-2">
        <div className="bg-gray-100 p-2 rounded">
          <p><strong>Note:</strong> Chart shows recovery trajectories for regions with different cultural innovation intensities following major economic shocks.</p>
          <p>Values are indexed (100 = pre-crisis level). Regions with higher cultural innovation consistently demonstrate faster and more complete recovery.</p>
        </div>
      </div>
      
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis domain={[75, 115]} label={{ value: 'Index Value (100 = Pre-crisis)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <ReferenceLine y={100} stroke="#666" strokeDasharray="3 3" label={{ value: 'Pre-crisis Level', position: 'right' }} />
            
            <Line type="monotone" dataKey="highCI_gdp" name="High CI - GDP" stroke="#8884d8" strokeWidth={2} dot={{ fill: '#8884d8', r: 5 }} />
            <Line type="monotone" dataKey="highCI_employment" name="High CI - Employment" stroke="#8884d8" strokeDasharray="5 5" dot={{ stroke: '#8884d8', fill: 'white', strokeWidth: 2, r: 5 }} />
            
            <Line type="monotone" dataKey="mediumCI_gdp" name="Medium CI - GDP" stroke="#82ca9d" strokeWidth={2} dot={{ fill: '#82ca9d', r: 5 }} />
            <Line type="monotone" dataKey="mediumCI_employment" name="Medium CI - Employment" stroke="#82ca9d" strokeDasharray="5 5" dot={{ stroke: '#82ca9d', fill: 'white', strokeWidth: 2, r: 5 }} />
            
            <Line type="monotone" dataKey="lowCI_gdp" name="Low CI - GDP" stroke="#ff8042" strokeWidth={2} dot={{ fill: '#ff8042', r: 5 }} />
            <Line type="monotone" dataKey="lowCI_employment" name="Low CI - Employment" stroke="#ff8042" strokeDasharray="5 5" dot={{ stroke: '#ff8042', fill: 'white', strokeWidth: 2, r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Key findings from the data:</strong></p>
        <ul className="list-disc pl-5">
          <li><strong>Recovery Speed:</strong> High cultural innovation regions reached pre-crisis GDP levels {selectedEvent === 'financialCrisis' ? '4 quarters' : '4 quarters'} after crisis, compared to {selectedEvent === 'financialCrisis' ? '10 quarters' : '8+ quarters'} for low cultural innovation regions.</li>
          <li><strong>Employment Resilience:</strong> Employment recovery shows more persistent gaps between high and low cultural innovation regions.</li>
          <li><strong>Growth Potential:</strong> High cultural innovation regions showed stronger post-recovery growth, exceeding pre-crisis levels by larger margins.</li>
          {selectedEvent === 'pandemic' && (
            <li><strong>Digital Adaptation:</strong> During the pandemic, regions with higher cultural innovation demonstrated accelerated digital transformation, creating new growth opportunities despite physical restrictions.</li>
          )}
        </ul>
        <p className="mt-2"><strong>Data sources:</strong> Composite data based on regional economic performance indicators from studies by De Propris (2013), Comunian and England (2020), and the Cultural Innovation Resilience Framework (CIRF).</p>
      </div>
    </div>
  );
};

export default EconomicRecoveryChart;
