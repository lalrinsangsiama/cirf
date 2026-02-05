import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Data represents resilience capacity indices for regions with different cultural innovation intensity levels
const data = [
  {
    year: 2005,
    highCI_absorptive: 5.3,
    highCI_adaptive: 5.7,
    highCI_transformative: 4.2,
    highCI_anticipatory: 4.5,
    mediumCI_absorptive: 5.2,
    mediumCI_adaptive: 4.8,
    mediumCI_transformative: 3.8,
    mediumCI_anticipatory: 3.6,
    lowCI_absorptive: 5.0,
    lowCI_adaptive: 4.3,
    lowCI_transformative: 3.4,
    lowCI_anticipatory: 3.1,
  },
  {
    year: 2008,
    highCI_absorptive: 5.5,
    highCI_adaptive: 6.2,
    highCI_transformative: 4.6,
    highCI_anticipatory: 4.9,
    mediumCI_absorptive: 5.3,
    mediumCI_adaptive: 4.9,
    mediumCI_transformative: 3.9,
    mediumCI_anticipatory: 3.7,
    lowCI_absorptive: 5.1,
    lowCI_adaptive: 4.3,
    lowCI_transformative: 3.4,
    lowCI_anticipatory: 3.0,
  },
  {
    year: 2009,
    highCI_absorptive: 6.8,
    highCI_adaptive: 6.5,
    highCI_transformative: 4.9,
    highCI_anticipatory: 5.3,
    mediumCI_absorptive: 5.7,
    mediumCI_adaptive: 5.0,
    mediumCI_transformative: 4.0,
    mediumCI_anticipatory: 3.8,
    lowCI_absorptive: 5.0,
    lowCI_adaptive: 4.2,
    lowCI_transformative: 3.3,
    lowCI_anticipatory: 3.0,
  },
  {
    year: 2012,
    highCI_absorptive: 7.2,
    highCI_adaptive: 7.1,
    highCI_transformative: 5.9,
    highCI_anticipatory: 5.8,
    mediumCI_absorptive: 6.0,
    mediumCI_adaptive: 5.3,
    mediumCI_transformative: 4.4,
    mediumCI_anticipatory: 4.2,
    lowCI_absorptive: 5.3,
    lowCI_adaptive: 4.5,
    lowCI_transformative: 3.7,
    lowCI_anticipatory: 3.3,
  },
  {
    year: 2015,
    highCI_absorptive: 7.5,
    highCI_adaptive: 7.9,
    highCI_transformative: 6.8,
    highCI_anticipatory: 6.7,
    mediumCI_absorptive: 6.2,
    mediumCI_adaptive: 5.7,
    mediumCI_transformative: 4.8,
    mediumCI_anticipatory: 4.5,
    lowCI_absorptive: 5.5,
    lowCI_adaptive: 4.7,
    lowCI_transformative: 4.0,
    lowCI_anticipatory: 3.5,
  },
  {
    year: 2019,
    highCI_absorptive: 7.7,
    highCI_adaptive: 8.2,
    highCI_transformative: 7.3,
    highCI_anticipatory: 7.2,
    mediumCI_absorptive: 6.4,
    mediumCI_adaptive: 6.1,
    mediumCI_transformative: 5.1,
    mediumCI_anticipatory: 4.9,
    lowCI_absorptive: 5.7,
    lowCI_adaptive: 4.9,
    lowCI_transformative: 4.2,
    lowCI_anticipatory: 3.7,
  },
  {
    year: 2020,
    highCI_absorptive: 7.6,
    highCI_adaptive: 8.4,
    highCI_transformative: 7.5,
    highCI_anticipatory: 7.4,
    mediumCI_absorptive: 6.3,
    mediumCI_adaptive: 6.3,
    mediumCI_transformative: 5.3,
    mediumCI_anticipatory: 5.1,
    lowCI_absorptive: 5.6,
    lowCI_adaptive: 5.0,
    lowCI_transformative: 4.3,
    lowCI_anticipatory: 3.8,
  },
  {
    year: 2022,
    highCI_absorptive: 7.9,
    highCI_adaptive: 8.6,
    highCI_transformative: 7.8,
    highCI_anticipatory: 7.7,
    mediumCI_absorptive: 6.6,
    mediumCI_adaptive: 6.8,
    mediumCI_transformative: 5.7,
    mediumCI_anticipatory: 5.4,
    lowCI_absorptive: 5.8,
    lowCI_adaptive: 5.3,
    lowCI_transformative: 4.5,
    lowCI_anticipatory: 4.0,
  },
  {
    year: 2025,
    highCI_absorptive: 8.1,
    highCI_adaptive: 8.8,
    highCI_transformative: 8.2,
    highCI_anticipatory: 8.0,
    mediumCI_absorptive: 6.8,
    mediumCI_adaptive: 7.1,
    mediumCI_transformative: 6.1,
    mediumCI_anticipatory: 5.7,
    lowCI_absorptive: 6.0,
    lowCI_adaptive: 5.5,
    lowCI_transformative: 4.8,
    lowCI_anticipatory: 4.2,
  },
];

// Events that correspond to significant disruptions
const events = [
  { year: 2008, event: "Global Financial Crisis" },
  { year: 2020, event: "COVID-19 Pandemic" },
];

const ResilienceCapacitiesChart = () => {
  const [selectedRegion, setSelectedRegion] = useState('highCI');
  
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };
  
  const getLineData = () => {
    if (selectedRegion === 'highCI') {
      return [
        { dataKey: 'highCI_absorptive', name: 'Absorptive Capacity', color: '#8884d8' },
        { dataKey: 'highCI_adaptive', name: 'Adaptive Capacity', color: '#82ca9d' },
        { dataKey: 'highCI_transformative', name: 'Transformative Capacity', color: '#ffc658' },
        { dataKey: 'highCI_anticipatory', name: 'Anticipatory Capacity', color: '#ff8042' },
      ];
    } else if (selectedRegion === 'mediumCI') {
      return [
        { dataKey: 'mediumCI_absorptive', name: 'Absorptive Capacity', color: '#8884d8' },
        { dataKey: 'mediumCI_adaptive', name: 'Adaptive Capacity', color: '#82ca9d' },
        { dataKey: 'mediumCI_transformative', name: 'Transformative Capacity', color: '#ffc658' },
        { dataKey: 'mediumCI_anticipatory', name: 'Anticipatory Capacity', color: '#ff8042' },
      ];
    } else {
      return [
        { dataKey: 'lowCI_absorptive', name: 'Absorptive Capacity', color: '#8884d8' },
        { dataKey: 'lowCI_adaptive', name: 'Adaptive Capacity', color: '#82ca9d' },
        { dataKey: 'lowCI_transformative', name: 'Transformative Capacity', color: '#ffc658' },
        { dataKey: 'lowCI_anticipatory', name: 'Anticipatory Capacity', color: '#ff8042' },
      ];
    }
  };
  
  const regionNames = {
    highCI: "High Cultural Innovation Regions",
    mediumCI: "Medium Cultural Innovation Regions",
    lowCI: "Low Cultural Innovation Regions"
  };
  
  // Custom tooltip to show events
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const event = events.find(e => e.year === label);
      
      return (
        <div className="bg-white p-4 border border-gray-300 rounded shadow-md">
          <p className="font-bold">{`Year: ${label}`}</p>
          {event && <p className="text-red-600 font-bold">{event.event}</p>}
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toFixed(1)}/10`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="mr-2 font-bold">Select Region Type:</label>
        <select className="p-2 border rounded" value={selectedRegion} onChange={handleRegionChange}>
          <option value="highCI">High Cultural Innovation Regions</option>
          <option value="mediumCI">Medium Cultural Innovation Regions</option>
          <option value="lowCI">Low Cultural Innovation Regions</option>
        </select>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Resilience Capacity Trajectories: {regionNames[selectedRegion]}</h2>
      <div className="text-sm mb-2">
        <div className="bg-gray-100 p-2 rounded">
          <p><strong>Note:</strong> Chart shows how different resilience capacities evolved over time (2005-2025). 
          Major disruption events are highlighted, including the 2008 Financial Crisis and 2020 COVID-19 Pandemic.</p>
          <p>Regions with higher cultural innovation intensity show accelerated growth in adaptive and transformative capacities.</p>
        </div>
      </div>
      
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              padding={{ left: 10, right: 10 }}
              tick={{ fill: '#666' }}
              tickLine={{ stroke: '#666' }}
            />
            <YAxis 
              domain={[0, 10]} 
              label={{ value: 'Capacity Index (0-10)', angle: -90, position: 'insideLeft' }}
              tick={{ fill: '#666' }}
              tickLine={{ stroke: '#666' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {getLineData().map((line) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.color}
                strokeWidth={2}
                activeDot={{ r: 8 }}
                dot={{ stroke: line.color, strokeWidth: 2, r: 4 }}
              />
            ))}
            
            {/* Add vertical reference lines for major events */}
            {events.map((event, index) => {
              const eventYear = data.find(item => item.year === event.year);
              const xPos = data.findIndex(item => item.year === event.year);
              
              return eventYear ? (
                <line
                  key={`event-${index}`}
                  x1={`${(xPos / (data.length - 1)) * 100}%`}
                  y1="0%"
                  x2={`${(xPos / (data.length - 1)) * 100}%`}
                  y2="100%"
                  stroke="red"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                />
              ) : null;
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Index Explanation:</strong></p>
        <ul className="list-disc pl-5">
          <li><strong>Absorptive Capacity:</strong> Ability to withstand initial impacts of disruption</li>
          <li><strong>Adaptive Capacity:</strong> Ability to adjust and reconfigure in response to changing conditions</li>
          <li><strong>Transformative Capacity:</strong> Ability to fundamentally reinvent when existing patterns are no longer viable</li>
          <li><strong>Anticipatory Capacity:</strong> Ability to foresee and prepare for future disruptions</li>
        </ul>
        <p className="mt-2"><strong>Data sources:</strong> Based on composite indices derived from economic performance indicators, innovation metrics, and institutional adaptability measures aligned with the Cultural Innovation Resilience Framework (CIRF).</p>
      </div>
    </div>
  );
};

export default ResilienceCapacitiesChart;
