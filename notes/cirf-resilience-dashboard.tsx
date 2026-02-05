import React, { useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart
} from 'recharts';

const ResilienceDashboard = () => {
  // State for dashboard controls
  const [selectedContext, setSelectedContext] = useState('urban');
  const [selectedTimeframe, setSelectedTimeframe] = useState('current');
  const [selectedView, setSelectedView] = useState('overview');
  
  // Define the contexts and their corresponding data
  const contexts = {
    urban: {
      title: "Urban Cultural Innovation District",
      description: "Post-industrial neighborhood revitalization through cultural innovation",
      overviewData: [
        { dimension: "Absorptive Capacity", current: 72, previous: 50, target: 80 },
        { dimension: "Adaptive Capacity", current: 85, previous: 60, target: 90 },
        { dimension: "Transformative Capacity", current: 68, previous: 40, target: 85 },
        { dimension: "Anticipatory Capacity", current: 64, previous: 45, target: 75 }
      ],
      mechanismData: [
        { mechanism: "Symbolic Knowledge", current: 78, previous: 55, target: 85 },
        { mechanism: "Network Development", current: 82, previous: 65, target: 90 },
        { mechanism: "Capital Conversion", current: 64, previous: 40, target: 80 },
        { mechanism: "Institutional Innovation", current: 58, previous: 35, target: 75 }
      ],
      contextualData: [
        { factor: "Governance Capacity", current: 62, previous: 45, target: 80 },
        { factor: "Industrial Diversity", current: 74, previous: 60, target: 85 },
        { factor: "Knowledge Ecosystem", current: 81, previous: 70, target: 90 },
        { factor: "Cultural Identity", current: 85, previous: 75, target: 90 }
      ],
      temporalData: [
        { month: "Jan", absorptive: 50, adaptive: 60, transformative: 40, anticipatory: 45 },
        { month: "Feb", absorptive: 55, adaptive: 65, transformative: 45, anticipatory: 50 },
        { month: "Mar", absorptive: 60, adaptive: 70, transformative: 50, anticipatory: 50 },
        { month: "Apr", absorptive: 65, adaptive: 73, transformative: 55, anticipatory: 55 },
        { month: "May", absorptive: 70, adaptive: 78, transformative: 60, anticipatory: 58 },
        { month: "Jun", absorptive: 72, adaptive: 85, transformative: 68, anticipatory: 64 }
      ],
      keyMetrics: [
        { name: "New Cultural Enterprises", value: 37, change: "+12", target: 45, unit: "enterprises" },
        { name: "Cultural Employment", value: 2850, change: "+350", target: 3000, unit: "jobs" },
        { name: "Cross-sector Partnerships", value: 24, change: "+8", target: 30, unit: "partnerships" },
        { name: "Cultural Innovation Programs", value: 18, change: "+5", target: 25, unit: "programs" },
        { name: "Visitor Economy Value", value: 12.8, change: "+3.2", target: 15, unit: "million $" },
        { name: "Cultural Asset Value", value: 64, change: "+14", target: 75, unit: "million $" }
      ],
      qualitativeIndicators: [
        { category: "Symbolic Resources", status: "Strong", trend: "Improving", evidence: "New district narratives gaining traction in media and investment communities" },
        { category: "Network Structures", status: "Strong", trend: "Improving", evidence: "Cross-sector innovation platforms established with active participation" },
        { category: "Adaptive Practices", status: "Moderate", trend: "Improving", evidence: "Business model innovation increasing but lacks institutional support" },
        { category: "Governance Innovation", status: "Moderate", trend: "Stable", evidence: "New governance arrangements emerging but require formalization" }
      ]
    },
    rural: {
      title: "Rural Cultural Heritage Region",
      description: "Agricultural community leveraging cultural heritage for resilience",
      overviewData: [
        { dimension: "Absorptive Capacity", current: 68, previous: 55, target: 75 },
        { dimension: "Adaptive Capacity", current: 70, previous: 50, target: 80 },
        { dimension: "Transformative Capacity", current: 55, previous: 35, target: 70 },
        { dimension: "Anticipatory Capacity", current: 60, previous: 40, target: 75 }
      ],
      mechanismData: [
        { mechanism: "Symbolic Knowledge", current: 82, previous: 70, target: 85 },
        { mechanism: "Network Development", current: 65, previous: 45, target: 80 },
        { mechanism: "Capital Conversion", current: 58, previous: 40, target: 75 },
        { mechanism: "Institutional Innovation", current: 50, previous: 30, target: 70 }
      ],
      contextualData: [
        { factor: "Governance Capacity", current: 55, previous: 40, target: 70 },
        { factor: "Economic Diversity", current: 60, previous: 45, target: 75 },
        { factor: "Knowledge Ecosystem", current: 50, previous: 35, target: 70 },
        { factor: "Cultural Identity", current: 90, previous: 85, target: 95 }
      ],
      temporalData: [
        { month: "Jan", absorptive: 55, adaptive: 50, transformative: 35, anticipatory: 40 },
        { month: "Feb", absorptive: 58, adaptive: 55, transformative: 40, anticipatory: 45 },
        { month: "Mar", absorptive: 60, adaptive: 60, transformative: 45, anticipatory: 48 },
        { month: "Apr", absorptive: 64, adaptive: 63, transformative: 48, anticipatory: 52 },
        { month: "May", absorptive: 66, adaptive: 67, transformative: 52, anticipatory: 55 },
        { month: "Jun", absorptive: 68, adaptive: 70, transformative: 55, anticipatory: 60 }
      ],
      keyMetrics: [
        { name: "Cultural Heritage Enterprises", value: 22, change: "+6", target: 30, unit: "enterprises" },
        { name: "Cultural Employment", value: 850, change: "+120", target: 1000, unit: "jobs" },
        { name: "Cultural Tourism Visitors", value: 45000, change: "+12000", target: 60000, unit: "visitors" },
        { name: "Heritage-Based Products", value: 35, change: "+8", target: 50, unit: "products" },
        { name: "Digital Cultural Content", value: 28, change: "+12", target: 40, unit: "assets" },
        { name: "Cultural Skills Training", value: 215, change: "+65", target: 300, unit: "participants" }
      ],
      qualitativeIndicators: [
        { category: "Traditional Knowledge", status: "Strong", trend: "Stable", evidence: "Intergenerational knowledge transfer programs established" },
        { category: "Community Networks", status: "Moderate", trend: "Improving", evidence: "New cooperative structures forming around cultural production" },
        { category: "Market Adaptation", status: "Moderate", trend: "Improving", evidence: "Heritage-based products finding new market channels" },
        { category: "Governance Systems", status: "Developing", trend: "Improving", evidence: "Community leadership emerging for cultural development" }
      ]
    },
    postCrisis: {
      title: "Post-Pandemic Creative Economy",
      description: "Urban creative sector adapting to post-pandemic conditions",
      overviewData: [
        { dimension: "Absorptive Capacity", current: 60, previous: 30, target: 75 },
        { dimension: "Adaptive Capacity", current: 75, previous: 40, target: 85 },
        { dimension: "Transformative Capacity", current: 70, previous: 35, target: 80 },
        { dimension: "Anticipatory Capacity", current: 65, previous: 30, target: 75 }
      ],
      mechanismData: [
        { mechanism: "Symbolic Knowledge", current: 72, previous: 40, target: 80 },
        { mechanism: "Network Development", current: 68, previous: 35, target: 80 },
        { mechanism: "Capital Conversion", current: 60, previous: 30, target: 75 },
        { mechanism: "Institutional Innovation", current: 65, previous: 25, target: 80 }
      ],
      contextualData: [
        { factor: "Governance Capacity", current: 58, previous: 30, target: 75 },
        { factor: "Economic Diversity", current: 65, previous: 40, target: 80 },
        { factor: "Digital Ecosystem", current: 80, previous: 45, target: 90 },
        { factor: "Cultural Identity", current: 70, previous: 50, target: 80 }
      ],
      temporalData: [
        { month: "Jan", absorptive: 30, adaptive: 40, transformative: 35, anticipatory: 30 },
        { month: "Feb", absorptive: 35, adaptive: 45, transformative: 40, anticipatory: 35 },
        { month: "Mar", absorptive: 42, adaptive: 53, transformative: 48, anticipatory: 45 },
        { month: "Apr", absorptive: 50, adaptive: 60, transformative: 55, anticipatory: 50 },
        { month: "May", absorptive: 55, adaptive: 68, transformative: 65, anticipatory: 60 },
        { month: "Jun", absorptive: 60, adaptive: 75, transformative: 70, anticipatory: 65 }
      ],
      keyMetrics: [
        { name: "Digital Creative Enterprises", value: 42, change: "+18", target: 50, unit: "enterprises" },
        { name: "Hybrid Event Attendance", value: 28500, change: "+15000", target: 40000, unit: "attendees" },
        { name: "New Business Models", value: 24, change: "+14", target: 30, unit: "models" },
        { name: "Digital Market Reach", value: 65, change: "+35", target: 80, unit: "% increase" },
        { name: "Cultural Workforce Mobility", value: 45, change: "+20", target: 60, unit: "% digitally enabled" },
        { name: "Innovation Funding", value: 5.4, change: "+2.8", target: 8, unit: "million $" }
      ],
      qualitativeIndicators: [
        { category: "Digital Transformation", status: "Strong", trend: "Improving", evidence: "Rapid adoption of digital platforms and hybrid delivery models" },
        { category: "Collaborative Networks", status: "Moderate", trend: "Improving", evidence: "New cross-sector partnerships forming around shared challenges" },
        { category: "Business Model Innovation", status: "Strong", trend: "Improving", evidence: "Significant experimentation with new revenue streams and delivery channels" },
        { category: "Crisis Narratives", status: "Moderate", trend: "Improving", evidence: "Emerging narratives of resilience and renewal gaining traction" }
      ]
    }
  };
  
  // Get data for the currently selected context
  const currentContext = contexts[selectedContext];
  
  // Helper function to get the right data based on the selected timeframe
  const getTimeframeData = (item) => {
    if (selectedTimeframe === 'previous') return item.previous;
    if (selectedTimeframe === 'target') return item.target;
    return item.current;
  };
  
  // Format radar chart data based on selected timeframe
  const getRadarData = (dataArray) => {
    return dataArray.map(item => ({
      subject: item.dimension || item.mechanism || item.factor,
      [selectedTimeframe]: getTimeframeData(item),
      fullMark: 100
    }));
  };
  
  // Render the overview radar chart
  const renderOverviewRadar = () => {
    const data = getRadarData(currentContext.overviewData);
    
    return (
      <div className="chart-container mb-4">
        <h5 className="text-center mb-3">Resilience Capacity Assessment</h5>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name={selectedTimeframe === 'previous' ? 'Previous Assessment' : 
                          selectedTimeframe === 'target' ? 'Target Performance' : 
                          'Current Assessment'} 
                  dataKey={selectedTimeframe} 
                  stroke={selectedTimeframe === 'previous' ? "#8884d8" : 
                          selectedTimeframe === 'target' ? "#82ca9d" : 
                          "#ff7300"} 
                  fill={selectedTimeframe === 'previous' ? "#8884d8" : 
                        selectedTimeframe === 'target' ? "#82ca9d" : 
                        "#ff7300"} 
                  fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  // Render the mechanisms radar chart
  const renderMechanismsRadar = () => {
    const data = getRadarData(currentContext.mechanismData);
    
    return (
      <div className="chart-container mb-4">
        <h5 className="text-center mb-3">Causal Mechanism Assessment</h5>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name={selectedTimeframe === 'previous' ? 'Previous' : 
                          selectedTimeframe === 'target' ? 'Target' : 
                          'Current'} 
                  dataKey={selectedTimeframe} 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  // Render the contextual radar chart
  const renderContextualRadar = () => {
    const data = getRadarData(currentContext.contextualData);
    
    return (
      <div className="chart-container mb-4">
        <h5 className="text-center mb-3">Contextual Factors Assessment</h5>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name={selectedTimeframe === 'previous' ? 'Previous' : 
                          selectedTimeframe === 'target' ? 'Target' : 
                          'Current'} 
                  dataKey={selectedTimeframe} 
                  stroke="#82ca9d" 
                  fill="#82ca9d" 
                  fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  // Render temporal chart tracking changes over time
  const renderTemporalChart = () => {
    return (
      <div className="chart-container mb-4">
        <h5 className="text-center mb-3">Resilience Capacity Evolution</h5>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={currentContext.temporalData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="absorptive" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="adaptive" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="transformative" stackId="3" stroke="#ffc658" fill="#ffc658" />
            <Area type="monotone" dataKey="anticipatory" stackId="4" stroke="#ff8042" fill="#ff8042" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  // Render key metrics section
  const renderKeyMetrics = () => {
    return (
      <div className="key-metrics mb-4">
        <h5 className="mb-3">Key Performance Indicators</h5>
        <div className="row">
          {currentContext.keyMetrics.map((metric, i) => (
            <div key={i} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-title">{metric.name}</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">{metric.value}</h3>
                    <span className={`badge ${metric.change.startsWith('+') ? 'bg-success' : 'bg-danger'}`}>
                      {metric.change}
                    </span>
                  </div>
                  <p className="card-text text-muted">{metric.unit}</p>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" 
                         style={{ width: `${(metric.value / metric.target) * 100}%` }}
                         aria-valuenow={metric.value} aria-valuemin="0" aria-valuemax={metric.target}>
                      {Math.round((metric.value / metric.target) * 100)}%
                    </div>
                  </div>
                  <small className="text-muted">Target: {metric.target} {metric.unit}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render qualitative indicators table
  const renderQualitativeIndicators = () => {
    return (
      <div className="qualitative-indicators mb-4">
        <h5 className="mb-3">Qualitative Resilience Indicators</h5>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Category</th>
                <th>Status</th>
                <th>Trend</th>
                <th>Evidence</th>
              </tr>
            </thead>
            <tbody>
              {currentContext.qualitativeIndicators.map((indicator, i) => (
                <tr key={i}>
                  <td><strong>{indicator.category}</strong></td>
                  <td>
                    <span className={`badge ${
                      indicator.status === 'Strong' ? 'bg-success' : 
                      indicator.status === 'Moderate' ? 'bg-warning text-dark' : 
                      indicator.status === 'Developing' ? 'bg-info text-dark' : 
                      'bg-secondary'
                    }`}>
                      {indicator.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${
                      indicator.trend === 'Improving' ? 'bg-success' : 
                      indicator.trend === 'Stable' ? 'bg-info text-dark' : 
                      'bg-danger'
                    }`}>
                      {indicator.trend}
                    </span>
                  </td>
                  <td>{indicator.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  // Render comparative visualization
  const renderComparativeView = () => {
    // Prepare data for comparative view
    const dimensions = currentContext.overviewData.map(item => item.dimension);
    const comparativeData = dimensions.map(dimension => {
      const item = currentContext.overviewData.find(item => item.dimension === dimension);
      return {
        dimension,
        Previous: item.previous,
        Current: item.current,
        Target: item.target
      };
    });
    
    return (
      <div className="chart-container mb-4">
        <h5 className="text-center mb-3">Comparative Resilience Assessment</h5>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={comparativeData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="dimension" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Previous" fill="#8884d8" />
            <Bar dataKey="Current" fill="#ff7300" />
            <Bar dataKey="Target" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  // Render the appropriate view based on selection
  const renderSelectedView = () => {
    switch(selectedView) {
      case 'overview':
        return (
          <div className="row">
            <div className="col-lg-6">
              {renderOverviewRadar()}
            </div>
            <div className="col-lg-6">
              {renderTemporalChart()}
            </div>
            <div className="col-12">
              {renderKeyMetrics()}
            </div>
          </div>
        );
      case 'mechanisms':
        return (
          <div className="row">
            <div className="col-lg-6">
              {renderMechanismsRadar()}
            </div>
            <div className="col-lg-6">
              {renderContextualRadar()}
            </div>
            <div className="col-12">
              {renderQualitativeIndicators()}
            </div>
          </div>
        );
      case 'comparative':
        return (
          <div className="row">
            <div className="col-12">
              {renderComparativeView()}
            </div>
            <div className="col-12">
              {renderKeyMetrics()}
            </div>
            <div className="col-12">
              {renderQualitativeIndicators()}
            </div>
          </div>
        );
      default:
        return renderOverviewRadar();
    }
  };
  
  return (
    <div className="resilience-dashboard p-3">
      <div className="dashboard-header mb-4">
        <h2>{currentContext.title}</h2>
        <p className="text-muted">{currentContext.description}</p>
      </div>
      
      <div className="dashboard-controls mb-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Context:</label>
            <select 
              className="form-select" 
              value={selectedContext}
              onChange={(e) => setSelectedContext(e.target.value)}
            >
              <option value="urban">Urban Cultural District</option>
              <option value="rural">Rural Heritage Region</option>
              <option value="postCrisis">Post-Pandemic Creative Economy</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Timeframe:</label>
            <select 
              className="form-select"
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
            >
              <option value="current">Current Assessment</option>
              <option value="previous">Previous Assessment</option>
              <option value="target">Target Performance</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Dashboard View:</label>
            <select 
              className="form-select"
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
            >
              <option value="overview">Overview Dashboard</option>
              <option value="mechanisms">Mechanisms & Context</option>
              <option value="comparative">Comparative Analysis</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        {renderSelectedView()}
      </div>
      
      <div className="dashboard-footer mt-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Resilience Assessment Insights</h5>
            <p className="card-text">
              This dashboard visualizes resilience indicators based on the Cultural Innovation Resilience Framework (CIRF),
              measuring multiple dimensions of resilience across different contexts. Key observations:
            </p>
            <ul>
              <li>The strongest resilience capacity in this context is <strong>Adaptive Capacity</strong>, showing significant improvement from previous assessment</li>
              <li>The most effective causal mechanism is <strong>Network Development</strong>, which has reached 82% of target performance</li>
              <li>The contextual factor requiring most attention is <strong>Institutional Innovation</strong>, currently at only 58% of target performance</li>
              <li>Temporal trends show consistent improvement across all resilience capacities, with <strong>Adaptive Capacity</strong> showing the steepest improvement</li>
            </ul>
            <p className="card-text">
              Based on these indicators, recommended focus areas for continued resilience enhancement include strengthening institutional innovation mechanisms
              and developing more robust anticipatory capacity. The strong performance in adaptive capacity provides a foundation for these improvements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add Bootstrap CSS for styling
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
document.head.appendChild(styleLink);

export default ResilienceDashboard;