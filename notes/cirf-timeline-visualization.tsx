import React, { useState } from 'react';

const TimelineVisualizer = () => {
  const [selectedView, setSelectedView] = useState('gantt');
  const [selectedContext, setSelectedContext] = useState('urban');
  
  // Define the contexts and their specific phases/activities
  const contexts = {
    urban: {
      title: "Urban Redevelopment Through Cultural Innovation",
      description: "Transforming post-industrial urban areas through cultural innovation strategies",
      phases: [
        {
          name: "Pre-disruption Phase",
          duration: "1-3 months",
          activities: [
            { name: "Cultural Asset Mapping", start: 0, duration: 3, category: "assessment" },
            { name: "Stakeholder Engagement", start: 1, duration: 2, category: "networks" },
            { name: "Initial Capacity Assessment", start: 2, duration: 2, category: "assessment" }
          ],
          outcomes: "Baseline understanding of existing cultural assets and community needs"
        },
        {
          name: "Acute Disruption Response",
          duration: "3-6 months", 
          activities: [
            { name: "Meaning-Making Initiatives", start: 3, duration: 3, category: "symbolic" },
            { name: "Emergency Creative Response", start: 3, duration: 4, category: "adaptive" },
            { name: "Temporary Space Activation", start: 5, duration: 3, category: "symbolic" }
          ],
          outcomes: "Maintained social cohesion through disruption period"
        },
        {
          name: "Reorganization Phase",
          duration: "6-18 months",
          activities: [
            { name: "Cultural Incubator Development", start: 7, duration: 8, category: "networks" },
            { name: "Heritage Reimagining Programs", start: 9, duration: 10, category: "symbolic" },
            { name: "Cross-Sector Innovation Labs", start: 11, duration: 8, category: "networks" },
            { name: "Skill Development Programs", start: 8, duration: 12, category: "adaptive" }
          ],
          outcomes: "New cultural-economic configurations adapted to changed conditions"
        },
        {
          name: "Stabilization Phase",
          duration: "18-36 months",
          activities: [
            { name: "Cultural District Formalization", start: 19, duration: 12, category: "institutional" },
            { name: "Investment Attraction Program", start: 19, duration: 10, category: "institutional" },
            { name: "New Narrative Development", start: 21, duration: 8, category: "symbolic" },
            { name: "Long-term Policy Integration", start: 24, duration: 12, category: "institutional" }
          ],
          outcomes: "Established new economic identity with cultural innovation at core"
        },
        {
          name: "Transformation Phase",
          duration: "36-60 months",
          activities: [
            { name: "Cultural Innovation Hub Expansion", start: 36, duration: 18, category: "networks" },
            { name: "International Positioning Strategy", start: 42, duration: 12, category: "symbolic" },
            { name: "Cross-City Innovation Networks", start: 48, duration: 12, category: "networks" },
            { name: "Evaluation & Next Horizon Planning", start: 54, duration: 6, category: "assessment" }
          ],
          outcomes: "Fundamentally transformed urban economy with enhanced resilience capacities"
        }
      ]
    },
    rural: {
      title: "Rural Economic Transition Through Cultural Innovation",
      description: "Enhancing resilience in rural communities facing agricultural restructuring",
      phases: [
        {
          name: "Pre-disruption Phase",
          duration: "1-3 months",
          activities: [
            { name: "Traditional Knowledge Inventory", start: 0, duration: 3, category: "assessment" },
            { name: "Community Vision Workshop", start: 1, duration: 2, category: "symbolic" },
            { name: "Landscape & Heritage Mapping", start: 0, duration: 3, category: "assessment" }
          ],
          outcomes: "Documentation of cultural assets with economic potential"
        },
        {
          name: "Acute Disruption Response",
          duration: "3-6 months", 
          activities: [
            { name: "Mutual Aid Cultural Networks", start: 3, duration: 3, category: "networks" },
            { name: "Local Market Development", start: 4, duration: 4, category: "adaptive" },
            { name: "Cultural Identity Reinforcement", start: 3, duration: 5, category: "symbolic" }
          ],
          outcomes: "Maintained community cohesion during economic transition"
        },
        {
          name: "Reorganization Phase",
          duration: "6-18 months",
          activities: [
            { name: "Craft-Agriculture Integration", start: 6, duration: 12, category: "adaptive" },
            { name: "Heritage Tourism Development", start: 8, duration: 10, category: "symbolic" },
            { name: "Digital Content Creation Program", start: 10, duration: 8, category: "adaptive" },
            { name: "Cooperative Structure Formation", start: 7, duration: 5, category: "institutional" }
          ],
          outcomes: "New economic activities building on cultural strengths"
        },
        {
          name: "Stabilization Phase",
          duration: "18-36 months",
          activities: [
            { name: "Rural Creative Hub Establishment", start: 18, duration: 12, category: "networks" },
            { name: "Regional Brand Development", start: 20, duration: 10, category: "symbolic" },
            { name: "Multi-channel Distribution", start: 24, duration: 12, category: "adaptive" },
            { name: "Skill Transfer Programming", start: 24, duration: 18, category: "adaptive" }
          ],
          outcomes: "Stable diversified economy integrating cultural and agricultural elements"
        },
        {
          name: "Transformation Phase",
          duration: "36-60 months",
          activities: [
            { name: "Rural Innovation Network", start: 36, duration: 24, category: "networks" },
            { name: "Cultural Tourism Destination", start: 42, duration: 18, category: "symbolic" },
            { name: "Education & Research Partnerships", start: 48, duration: 12, category: "institutional" },
            { name: "Next Generation Integration", start: 36, duration: 24, category: "adaptive" }
          ],
          outcomes: "Resilient rural economy with balanced traditions and innovation"
        }
      ]
    },
    postDisaster: {
      title: "Post-Disaster Recovery Through Cultural Innovation",
      description: "Rebuilding community and economy after major disruption",
      phases: [
        {
          name: "Immediate Response Phase",
          duration: "0-2 months",
          activities: [
            { name: "Cultural First Aid", start: 0, duration: 2, category: "symbolic" },
            { name: "Community Story Collection", start: 0, duration: 2, category: "symbolic" },
            { name: "Resource & Asset Assessment", start: 0, duration: 1, category: "assessment" }
          ],
          outcomes: "Preserved essential cultural resources and initiated meaning-making"
        },
        {
          name: "Acute Recovery Phase",
          duration: "2-6 months", 
          activities: [
            { name: "Temporary Creative Spaces", start: 2, duration: 4, category: "adaptive" },
            { name: "Community Expression Events", start: 3, duration: 3, category: "symbolic" },
            { name: "Digital Archive Creation", start: 2, duration: 4, category: "symbolic" },
            { name: "Rapid Skill Deployment", start: 2, duration: 2, category: "adaptive" }
          ],
          outcomes: "Reestablished cultural engagement during early recovery"
        },
        {
          name: "Reorganization Phase",
          duration: "6-18 months",
          activities: [
            { name: "Cultural Space Redesign", start: 6, duration: 12, category: "adaptive" },
            { name: "Community Memory Projects", start: 8, duration: 10, category: "symbolic" },
            { name: "Creative Economy Restart", start: 6, duration: 6, category: "networks" },
            { name: "Cultural Recovery Planning", start: 9, duration: 9, category: "institutional" }
          ],
          outcomes: "New cultural infrastructure adapted to post-disaster reality"
        },
        {
          name: "Stabilization Phase",
          duration: "18-36 months",
          activities: [
            { name: "Permanent Cultural Facility", start: 18, duration: 18, category: "institutional" },
            { name: "New Identity Narratives", start: 24, duration: 12, category: "symbolic" },
            { name: "Cultural Tourism Renewal", start: 24, duration: 12, category: "adaptive" },
            { name: "Cross-community Networks", start: 18, duration: 18, category: "networks" }
          ],
          outcomes: "Rebuilt cultural economy integrated with recovery vision"
        },
        {
          name: "Transformation Phase",
          duration: "36-60 months",
          activities: [
            { name: "Resilience Knowledge Center", start: 36, duration: 24, category: "institutional" },
            { name: "Innovation District Development", start: 42, duration: 18, category: "networks" },
            { name: "Cultural Legacy Programming", start: 36, duration: 24, category: "symbolic" },
            { name: "Future Scenario Planning", start: 54, duration: 6, category: "assessment" }
          ],
          outcomes: "Transformed community with enhanced cultural and economic resilience"
        }
      ]
    }
  };

  // Define color coding for activity categories
  const categoryColors = {
    symbolic: "#8884d8",
    networks: "#82ca9d",
    institutional: "#ffc658",
    adaptive: "#ff8042",
    assessment: "#6c757d"
  };

  const categoryLabels = {
    symbolic: "Symbolic Knowledge Mechanisms",
    networks: "Network Development Mechanisms",
    institutional: "Institutional Innovation Mechanisms",
    adaptive: "Adaptive Capacity Enhancement",
    assessment: "Assessment & Learning"
  };

  // Get the currently selected context data
  const currentContext = contexts[selectedContext];
  
  // Calculate the maximum timeline extent for scaling
  const getMaxDuration = () => {
    let max = 0;
    currentContext.phases.forEach(phase => {
      phase.activities.forEach(activity => {
        const end = activity.start + activity.duration;
        if (end > max) max = end;
      });
    });
    return max;
  };
  
  const maxDuration = getMaxDuration();
  
  // Render a Gantt chart view
  const renderGanttChart = () => {
    const barHeight = 30;
    const barGap = 10;
    const timelineWidth = 900;
    const leftLabelWidth = 250;
    const topMargin = 50;
    
    const timeScale = (time) => (time / maxDuration) * timelineWidth;
    
    // Flatten all activities with their phase info
    const allActivities = [];
    currentContext.phases.forEach((phase, phaseIndex) => {
      phase.activities.forEach((activity) => {
        allActivities.push({
          ...activity,
          phase: phase.name,
          phaseIndex
        });
      });
    });
    
    // Sort activities by start time
    allActivities.sort((a, b) => a.start - b.start);
    
    return (
      <div className="gantt-container overflow-auto mt-4" style={{maxWidth: '100%'}}>
        <svg width={timelineWidth + leftLabelWidth + 50} height={allActivities.length * (barHeight + barGap) + topMargin + 50}>
          {/* Timeline axis */}
          <line 
            x1={leftLabelWidth} 
            y1={topMargin - 20} 
            x2={leftLabelWidth + timelineWidth} 
            y2={topMargin - 20} 
            stroke="#000" 
            strokeWidth="2"
          />
          
          {/* Time markers */}
          {Array.from({length: Math.ceil(maxDuration/12) + 1}, (_, i) => i * 12).map(month => (
            <g key={`marker-${month}`}>
              <line 
                x1={leftLabelWidth + timeScale(month)} 
                y1={topMargin - 25} 
                x2={leftLabelWidth + timeScale(month)} 
                y2={topMargin - 15} 
                stroke="#000" 
                strokeWidth="2"
              />
              <text 
                x={leftLabelWidth + timeScale(month)} 
                y={topMargin - 30} 
                textAnchor="middle" 
                fontSize="12"
              >
                {month} {month === 0 ? 'Start' : 'months'}
              </text>
            </g>
          ))}
          
          {/* Phase backgrounds */}
          {currentContext.phases.map((phase, i) => {
            const phaseActivities = allActivities.filter(a => a.phase === phase.name);
            if (phaseActivities.length === 0) return null;
            
            const minStart = Math.min(...phaseActivities.map(a => a.start));
            const maxEnd = Math.max(...phaseActivities.map(a => a.start + a.duration));
            const firstActivityIndex = allActivities.findIndex(a => a.phase === phase.name);
            const lastActivityIndex = allActivities.length - 1 - [...allActivities].reverse().findIndex(a => a.phase === phase.name);
            
            const top = firstActivityIndex * (barHeight + barGap) + topMargin - barGap/2;
            const height = (lastActivityIndex - firstActivityIndex + 1) * (barHeight + barGap) + barGap/2;
            
            return (
              <g key={`phase-${i}`}>
                <rect 
                  x={leftLabelWidth + timeScale(minStart)} 
                  y={top}
                  width={timeScale(maxEnd - minStart)}
                  height={height}
                  fill={`rgba(200, 200, 200, 0.3)`}
                  stroke="#ddd"
                />
                <text 
                  x={leftLabelWidth + timeScale(minStart) + 5} 
                  y={top - 5}
                  fontSize="14"
                  fontWeight="bold"
                >
                  {phase.name} ({phase.duration})
                </text>
              </g>
            );
          })}
          
          {/* Activity bars */}
          {allActivities.map((activity, i) => (
            <g key={`activity-${i}`}>
              <rect 
                x={leftLabelWidth + timeScale(activity.start)} 
                y={i * (barHeight + barGap) + topMargin}
                width={timeScale(activity.duration)}
                height={barHeight}
                rx={4}
                ry={4}
                fill={categoryColors[activity.category]}
                stroke="#fff"
                strokeWidth={1}
              />
              <text 
                x={leftLabelWidth - 10} 
                y={i * (barHeight + barGap) + topMargin + barHeight/2 + 5}
                textAnchor="end"
                fontSize="14"
                fontWeight="500"
              >
                {activity.name}
              </text>
              <text 
                x={leftLabelWidth + timeScale(activity.start) + timeScale(activity.duration)/2} 
                y={i * (barHeight + barGap) + topMargin + barHeight/2 + 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight="500"
                fill="#fff"
              >
                {activity.duration}m
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  };
  
  // Render a phase-based timeline view
  const renderPhasedTimeline = () => {
    const phaseHeight = 160;
    const phaseGap = 40;
    const timelineWidth = 900;
    const leftMargin = 150;
    
    return (
      <div className="timeline-container overflow-auto mt-4" style={{maxWidth: '100%'}}>
        <svg width={timelineWidth + leftMargin + 50} height={currentContext.phases.length * (phaseHeight + phaseGap) + 50}>
          {/* Central timeline */}
          <line 
            x1={leftMargin} 
            y1={20} 
            x2={leftMargin} 
            y2={currentContext.phases.length * (phaseHeight + phaseGap) + 20} 
            stroke="#666" 
            strokeWidth="4"
            strokeDasharray="5,5"
          />
          
          {/* Phases */}
          {currentContext.phases.map((phase, i) => {
            const timeScale = timelineWidth / phase.activities.length;
            const yPos = i * (phaseHeight + phaseGap) + 50;
            
            return (
              <g key={`phase-${i}`}>
                {/* Phase background */}
                <rect 
                  x={leftMargin + 20} 
                  y={yPos - 20}
                  width={timelineWidth - 20}
                  height={phaseHeight}
                  fill={`rgba(240, 240, 245, 0.7)`}
                  stroke="#ddd"
                  rx={10}
                  ry={10}
                />
                
                {/* Phase marker */}
                <circle 
                  cx={leftMargin} 
                  cy={yPos} 
                  r={15}
                  fill="#333"
                />
                <text 
                  x={leftMargin} 
                  y={yPos + 5}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="14"
                  fontWeight="bold"
                >
                  {i+1}
                </text>
                
                {/* Phase label */}
                <text 
                  x={leftMargin - 20} 
                  y={yPos}
                  textAnchor="end"
                  fontSize="16"
                  fontWeight="bold"
                >
                  {phase.name}
                </text>
                <text 
                  x={leftMargin - 20} 
                  y={yPos + 20}
                  textAnchor="end"
                  fontSize="14"
                >
                  {phase.duration}
                </text>
                
                {/* Activities */}
                <g transform={`translate(${leftMargin + 30}, ${yPos - 10})`}>
                  {phase.activities.map((activity, j) => (
                    <g key={`activity-${i}-${j}`} transform={`translate(${j * timeScale}, 0)`}>
                      <rect 
                        x={0} 
                        y={0}
                        width={timeScale - 10}
                        height={80}
                        rx={5}
                        ry={5}
                        fill={categoryColors[activity.category]}
                        opacity={0.9}
                      />
                      <text 
                        x={timeScale/2 - 5} 
                        y={20}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="bold"
                        fill="#fff"
                      >
                        {activity.name}
                      </text>
                      <text 
                        x={timeScale/2 - 5} 
                        y={40}
                        textAnchor="middle"
                        fontSize="12"
                        fill="#fff"
                      >
                        {activity.start}-{activity.start + activity.duration} months
                      </text>
                    </g>
                  ))}
                </g>
                
                {/* Outcomes */}
                <rect 
                  x={leftMargin + 30} 
                  y={yPos + 80}
                  width={timelineWidth - 40}
                  height={40}
                  rx={5}
                  ry={5}
                  fill="#f8f9fa"
                  stroke="#ddd"
                />
                <text 
                  x={leftMargin + timelineWidth/2} 
                  y={yPos + 100}
                  textAnchor="middle"
                  fontSize="14"
                  fontStyle="italic"
                >
                  Outcome: {phase.outcomes}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };
  
  return (
    <div className="timeline-visualizer p-3">
      <h2 className="mb-3">{currentContext.title}</h2>
      <p className="mb-4">{currentContext.description}</p>
      
      <div className="controls mb-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Context:</label>
            <select 
              className="form-select" 
              value={selectedContext}
              onChange={(e) => setSelectedContext(e.target.value)}
            >
              <option value="urban">Urban Redevelopment</option>
              <option value="rural">Rural Economic Transition</option>
              <option value="postDisaster">Post-Disaster Recovery</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Visualization Type:</label>
            <select 
              className="form-select"
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
            >
              <option value="gantt">Gantt Chart</option>
              <option value="phased">Phased Timeline</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="legend mb-3">
        <div className="d-flex flex-wrap gap-3">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <div key={key} className="d-flex align-items-center">
              <div 
                style={{
                  width: 20, 
                  height: 20, 
                  backgroundColor: categoryColors[key],
                  borderRadius: '4px',
                  marginRight: '8px'
                }}
              ></div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {selectedView === 'gantt' ? renderGanttChart() : renderPhasedTimeline()}
      
      <div className="mt-4">
        <h5>Key Implementation Insights:</h5>
        <ul className="mt-2">
          <li>Cultural innovation initiatives typically unfold across 5 distinct phases, from pre-disruption preparation to long-term transformation</li>
          <li>Different types of mechanisms (symbolic, network, institutional, adaptive) are activated at different phases of implementation</li>
          <li>Early phases emphasize meaning-making and immediate adaptive responses, while later phases focus on institutional embedding and transformation</li>
          <li>Full implementation cycles often span 3-5 years for transformative resilience outcomes to emerge</li>
          <li>Context-specific adaptation of timelines is essential - urban, rural, and post-disaster contexts require different implementation sequences</li>
        </ul>
      </div>
    </div>
  );
};

// Add Bootstrap CSS for styling
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
document.head.appendChild(styleLink);

export default TimelineVisualizer;
