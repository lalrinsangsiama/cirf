import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const NetworkVisualization = () => {
  const [networkType, setNetworkType] = useState('knowledge');
  const [highlightedNode, setHighlightedNode] = useState(null);
  const simulationRef = useRef(null);
  const svgRef = useRef(null);
  const nodesRef = useRef(null);
  const linksRef = useRef(null);
  
  // Define node types and colors
  const nodeTypes = {
    cultural: { label: "Cultural Organizations", color: "#ec4899" },
    education: { label: "Educational Institutions", color: "#8b5cf6" },
    business: { label: "Creative Businesses", color: "#3b82f6" },
    government: { label: "Government Bodies", color: "#10b981" },
    community: { label: "Community Groups", color: "#f59e0b" },
    individual: { label: "Creative Individuals", color: "#6366f1" }
  };

  // Define relationship types and colors/styles
  const relationshipTypes = {
    knowledge: { label: "Knowledge Exchange", color: "#8b5cf6", dashed: false },
    collaboration: { label: "Project Collaboration", color: "#3b82f6", dashed: false },
    funding: { label: "Funding/Resource Flow", color: "#10b981", dashed: false },
    mentorship: { label: "Mentorship/Support", color: "#f59e0b", dashed: true },
    policy: { label: "Policy Influence", color: "#ef4444", dashed: true }
  };

  // Data for each network type
  const networkData = {
    // Knowledge Network - who shares knowledge with whom
    knowledge: {
      nodes: [
        { id: "university", name: "University Research Center", type: "education", centralityValue: 0.85 },
        { id: "artscouncil", name: "Regional Arts Council", type: "government", centralityValue: 0.75 },
        { id: "museum", name: "City Museum", type: "cultural", centralityValue: 0.70 },
        { id: "lib", name: "Public Library", type: "cultural", centralityValue: 0.65 },
        { id: "innovation_hub", name: "Creative Innovation Hub", type: "business", centralityValue: 0.80 },
        { id: "theater", name: "Experimental Theater", type: "cultural", centralityValue: 0.60 },
        { id: "tech_startup", name: "Digital Media Startup", type: "business", centralityValue: 0.65 },
        { id: "community_arts", name: "Community Arts Center", type: "community", centralityValue: 0.55 },
        { id: "design_firm", name: "Design Consultancy", type: "business", centralityValue: 0.60 },
        { id: "artist_collective", name: "Artist Collective", type: "community", centralityValue: 0.50 },
        { id: "individual_artist", name: "Independent Artist", type: "individual", centralityValue: 0.40 },
        { id: "film_festival", name: "International Film Festival", type: "cultural", centralityValue: 0.55 },
        { id: "craft_guild", name: "Traditional Craft Guild", type: "community", centralityValue: 0.45 },
        { id: "tech_school", name: "Technical College", type: "education", centralityValue: 0.60 }
      ],
      links: [
        { source: "university", target: "innovation_hub", type: "knowledge", value: 5 },
        { source: "university", target: "artscouncil", type: "knowledge", value: 3 },
        { source: "university", target: "museum", type: "knowledge", value: 4 },
        { source: "university", target: "tech_startup", type: "knowledge", value: 4 },
        { source: "university", target: "tech_school", type: "knowledge", value: 5 },
        { source: "artscouncil", target: "museum", type: "knowledge", value: 4 },
        { source: "artscouncil", target: "theater", type: "knowledge", value: 3 },
        { source: "artscouncil", target: "community_arts", type: "knowledge", value: 4 },
        { source: "artscouncil", target: "film_festival", type: "knowledge", value: 3 },
        { source: "museum", target: "lib", type: "knowledge", value: 4 },
        { source: "museum", target: "artist_collective", type: "knowledge", value: 2 },
        { source: "lib", target: "community_arts", type: "knowledge", value: 3 },
        { source: "innovation_hub", target: "tech_startup", type: "knowledge", value: 5 },
        { source: "innovation_hub", target: "design_firm", type: "knowledge", value: 4 },
        { source: "theater", target: "film_festival", type: "knowledge", value: 3 },
        { source: "theater", target: "artist_collective", type: "knowledge", value: 3 },
        { source: "tech_startup", target: "design_firm", type: "knowledge", value: 4 },
        { source: "community_arts", target: "artist_collective", type: "knowledge", value: 4 },
        { source: "community_arts", target: "individual_artist", type: "knowledge", value: 3 },
        { source: "community_arts", target: "craft_guild", type: "knowledge", value: 3 },
        { source: "artist_collective", target: "individual_artist", type: "knowledge", value: 4 },
        { source: "craft_guild", target: "individual_artist", type: "knowledge", value: 3 },
        { source: "film_festival", target: "innovation_hub", type: "knowledge", value: 2 },
        { source: "tech_school", target: "tech_startup", type: "knowledge", value: 3 },
        { source: "tech_school", target: "design_firm", type: "knowledge", value: 3 },
        { source: "tech_school", target: "innovation_hub", type: "knowledge", value: 4 }
      ]
    },
    
    // Collaboration Network - who works with whom on projects
    collaboration: {
      nodes: [
        { id: "university", name: "University Research Center", type: "education", centralityValue: 0.65 },
        { id: "artscouncil", name: "Regional Arts Council", type: "government", centralityValue: 0.70 },
        { id: "museum", name: "City Museum", type: "cultural", centralityValue: 0.75 },
        { id: "lib", name: "Public Library", type: "cultural", centralityValue: 0.60 },
        { id: "innovation_hub", name: "Creative Innovation Hub", type: "business", centralityValue: 0.85 },
        { id: "theater", name: "Experimental Theater", type: "cultural", centralityValue: 0.60 },
        { id: "tech_startup", name: "Digital Media Startup", type: "business", centralityValue: 0.70 },
        { id: "community_arts", name: "Community Arts Center", type: "community", centralityValue: 0.65 },
        { id: "design_firm", name: "Design Consultancy", type: "business", centralityValue: 0.75 },
        { id: "artist_collective", name: "Artist Collective", type: "community", centralityValue: 0.50 },
        { id: "individual_artist", name: "Independent Artist", type: "individual", centralityValue: 0.40 },
        { id: "film_festival", name: "International Film Festival", type: "cultural", centralityValue: 0.60 },
        { id: "craft_guild", name: "Traditional Craft Guild", type: "community", centralityValue: 0.45 },
        { id: "tech_school", name: "Technical College", type: "education", centralityValue: 0.55 },
        { id: "tourism_board", name: "Regional Tourism Board", type: "government", centralityValue: 0.50 }
      ],
      links: [
        { source: "innovation_hub", target: "tech_startup", type: "collaboration", value: 5 },
        { source: "innovation_hub", target: "design_firm", type: "collaboration", value: 5 },
        { source: "innovation_hub", target: "university", type: "collaboration", value: 4 },
        { source: "museum", target: "university", type: "collaboration", value: 3 },
        { source: "museum", target: "artist_collective", type: "collaboration", value: 4 },
        { source: "museum", target: "tourism_board", type: "collaboration", value: 4 },
        { source: "artscouncil", target: "theater", type: "collaboration", value: 3 },
        { source: "artscouncil", target: "community_arts", type: "collaboration", value: 4 },
        { source: "artscouncil", target: "film_festival", type: "collaboration", value: 4 },
        { source: "theater", target: "artist_collective", type: "collaboration", value: 5 },
        { source: "theater", target: "film_festival", type: "collaboration", value: 3 },
        { source: "theater", target: "individual_artist", type: "collaboration", value: 3 },
        { source: "tech_startup", target: "design_firm", type: "collaboration", value: 5 },
        { source: "tech_startup", target: "tech_school", type: "collaboration", value: 3 },
        { source: "community_arts", target: "individual_artist", type: "collaboration", value: 4 },
        { source: "community_arts", target: "lib", type: "collaboration", value: 3 },
        { source: "community_arts", target: "craft_guild", type: "collaboration", value: 4 },
        { source: "design_firm", target: "museum", type: "collaboration", value: 3 },
        { source: "design_firm", target: "tourism_board", type: "collaboration", value: 3 },
        { source: "film_festival", target: "tourism_board", type: "collaboration", value: 5 },
        { source: "craft_guild", target: "tourism_board", type: "collaboration", value: 3 },
        { source: "lib", target: "individual_artist", type: "collaboration", value: 2 }
      ]
    },
    
    // Institutional Network - formal relationships between organizations
    institutional: {
      nodes: [
        { id: "university", name: "University Research Center", type: "education", centralityValue: 0.80 },
        { id: "artscouncil", name: "Regional Arts Council", type: "government", centralityValue: 0.90 },
        { id: "museum", name: "City Museum", type: "cultural", centralityValue: 0.70 },
        { id: "lib", name: "Public Library", type: "cultural", centralityValue: 0.65 },
        { id: "innovation_hub", name: "Creative Innovation Hub", type: "business", centralityValue: 0.75 },
        { id: "theater", name: "Experimental Theater", type: "cultural", centralityValue: 0.55 },
        { id: "tech_startup", name: "Digital Media Startup", type: "business", centralityValue: 0.50 },
        { id: "community_arts", name: "Community Arts Center", type: "community", centralityValue: 0.60 },
        { id: "design_firm", name: "Design Consultancy", type: "business", centralityValue: 0.45 },
        { id: "artist_collective", name: "Artist Collective", type: "community", centralityValue: 0.40 },
        { id: "film_festival", name: "International Film Festival", type: "cultural", centralityValue: 0.50 },
        { id: "craft_guild", name: "Traditional Craft Guild", type: "community", centralityValue: 0.35 },
        { id: "tech_school", name: "Technical College", type: "education", centralityValue: 0.65 },
        { id: "city_council", name: "City Council", type: "government", centralityValue: 0.85 },
        { id: "regional_dev", name: "Regional Development Agency", type: "government", centralityValue: 0.80 },
        { id: "heritage_trust", name: "Heritage Trust", type: "government", centralityValue: 0.60 }
      ],
      links: [
        { source: "artscouncil", target: "city_council", type: "policy", value: 5 },
        { source: "artscouncil", target: "regional_dev", type: "policy", value: 5 },
        { source: "artscouncil", target: "museum", type: "funding", value: 5 },
        { source: "artscouncil", target: "theater", type: "funding", value: 4 },
        { source: "artscouncil", target: "community_arts", type: "funding", value: 4 },
        { source: "artscouncil", target: "film_festival", type: "funding", value: 3 },
        { source: "city_council", target: "museum", type: "policy", value: 4 },
        { source: "city_council", target: "lib", type: "policy", value: 5 },
        { source: "city_council", target: "innovation_hub", type: "funding", value: 3 },
        { source: "regional_dev", target: "innovation_hub", type: "funding", value: 5 },
        { source: "regional_dev", target: "tech_startup", type: "funding", value: 3 },
        { source: "regional_dev", target: "university", type: "funding", value: 5 },
        { source: "regional_dev", target: "tech_school", type: "funding", value: 4 },
        { source: "heritage_trust", target: "museum", type: "policy", value: 4 },
        { source: "heritage_trust", target: "craft_guild", type: "funding", value: 3 },
        { source: "university", target: "tech_school", type: "policy", value: 4 },
        { source: "university", target: "innovation_hub", type: "policy", value: 3 },
        { source: "university", target: "tech_startup", type: "mentorship", value: 3 },
        { source: "innovation_hub", target: "tech_startup", type: "mentorship", value: 4 },
        { source: "innovation_hub", target: "design_firm", type: "mentorship", value: 3 },
        { source: "tech_school", target: "tech_startup", type: "mentorship", value: 3 },
        { source: "museum", target: "artist_collective", type: "mentorship", value: 2 },
        { source: "theater", target: "artist_collective", type: "mentorship", value: 3 },
        { source: "community_arts", target: "artist_collective", type: "mentorship", value: 4 }
      ]
    }
  };

  // Get network data based on selected type
  const getActiveNetworkData = () => {
    return networkData[networkType];
  };

  // Drag functionality for nodes
  const drag = (simulation) => {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
    
    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  // Initialize the visualization
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Stop previous simulation if it exists
    if (simulationRef.current) {
      simulationRef.current.stop();
    }
    
    const width = 800;
    const height = 600;
    
    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove();
    
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);
    
    // Create container for the network
    const g = svg.append("g");
    
    // Add zoom functionality
    const zoom = d3.zoom()
      .scaleExtent([0.25, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    
    svg.call(zoom);
    
    // Get current network data and create a deep copy to avoid issues
    const data = JSON.parse(JSON.stringify(getActiveNetworkData()));
    
    // Create force simulation
    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(d => 200 - d.value * 15))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(d => 15 + d.centralityValue * 15));
    
    simulationRef.current = simulation;
    
    // Create links
    const link = g.append("g")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", d => relationshipTypes[d.type].color)
      .attr("stroke-width", d => Math.sqrt(d.value))
      .attr("stroke-dasharray", d => relationshipTypes[d.type].dashed ? "5,5" : "0");
    
    linksRef.current = link;
    
    // Create nodes
    const node = g.append("g")
      .selectAll(".node")
      .data(data.nodes)
      .join("g")
      .attr("class", "node")
      .call(drag(simulation));
    
    nodesRef.current = node;
    
    // Node circles
    node.append("circle")
      .attr("r", d => 5 + d.centralityValue * 15)
      .attr("fill", d => nodeTypes[d.type].color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .on("mouseover", (event, d) => {
        setHighlightedNode(d.id);
      })
      .on("mouseout", () => {
        setHighlightedNode(null);
      });
    
    // Node labels
    node.append("text")
      .attr("dx", d => 8 + (d.centralityValue * 5))
      .attr("dy", ".35em")
      .attr("font-size", "10px")
      .text(d => d.name)
      .style("pointer-events", "none");
    
    // Update function for the simulation
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      
      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });
    
    // Cleanup on unmount or when dependencies change
    return () => {
      if (simulation) simulation.stop();
    };
  }, [networkType]); // Only recreate visualization when network type changes

  // Handle highlighting separately
  useEffect(() => {
    if (!nodesRef.current || !linksRef.current) return;
    
    const data = getActiveNetworkData();
    const node = nodesRef.current;
    const link = linksRef.current;
    
    if (highlightedNode) {
      // Filter to find connected links
      const connectedLinks = data.links.filter(l => {
        const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
        const targetId = typeof l.target === 'object' ? l.target.id : l.target;
        return sourceId === highlightedNode || targetId === highlightedNode;
      });
      
      // Gather connected node IDs
      const connectedNodes = new Set();
      connectedLinks.forEach(l => {
        const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
        const targetId = typeof l.target === 'object' ? l.target.id : l.target;
        connectedNodes.add(sourceId);
        connectedNodes.add(targetId);
      });
      
      // Apply opacity based on connection
      link.attr("opacity", l => {
        const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
        const targetId = typeof l.target === 'object' ? l.target.id : l.target;
        return (sourceId === highlightedNode || targetId === highlightedNode) ? 1 : 0.1;
      });
      
      node.attr("opacity", d => 
        d.id === highlightedNode || connectedNodes.has(d.id) ? 1 : 0.2
      );
    } else {
      // Reset all opacities when no node is highlighted
      link.attr("opacity", 1);
      node.attr("opacity", 1);
    }
  }, [highlightedNode, networkType]);

  // Get node or link details for the selected element
  const getDetailContent = () => {
    if (!highlightedNode) return null;
    
    const data = getActiveNetworkData();
    const node = data.nodes.find(n => n.id === highlightedNode);
    
    if (!node) return null;
    
    const links = data.links.filter(
      l => (typeof l.source === 'object' ? l.source.id : l.source) === highlightedNode || 
           (typeof l.target === 'object' ? l.target.id : l.target) === highlightedNode
    );
    
    const getRelatedNodeName = (id) => {
      const relatedNode = data.nodes.find(n => n.id === id);
      return relatedNode ? relatedNode.name : id;
    };
    
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900">{node.name}</h3>
        <p className="text-sm text-gray-600">Type: {nodeTypes[node.type].label}</p>
        <p className="text-sm text-gray-600">Centrality Value: {(node.centralityValue * 10).toFixed(1)}/10</p>
        
        <h4 className="text-md font-medium text-gray-800 mt-3 mb-1">Connections:</h4>
        <ul className="text-sm">
          {links.map((link, i) => {
            const isSource = (typeof link.source === 'object' ? link.source.id : link.source) === highlightedNode;
            const connectedNodeId = isSource 
              ? (typeof link.target === 'object' ? link.target.id : link.target)
              : (typeof link.source === 'object' ? link.source.id : link.source);
              
            return (
              <li key={i} className="mb-1">
                <span className="inline-block w-3 h-3 mr-1 rounded-full" style={{backgroundColor: relationshipTypes[link.type].color}}></span>
                <span className="font-medium">{relationshipTypes[link.type].label}</span>
                {isSource ? " to " : " from "}
                <span>{getRelatedNodeName(connectedNodeId)}</span>
                <span className="text-gray-500"> (Strength: {link.value}/5)</span>
              </li>
            );
          })}
        </ul>
        
        {networkType === 'knowledge' && (
          <div className="mt-3 text-sm text-gray-700">
            <p><strong>Role in Knowledge Network:</strong> {
              node.centralityValue > 0.75 ? "Key knowledge hub that disseminates information widely across the network" :
              node.centralityValue > 0.6 ? "Important knowledge intermediary connecting different sectors" :
              node.centralityValue > 0.45 ? "Active knowledge participant with specialized expertise" :
              "Knowledge recipient with focused connections"
            }</p>
          </div>
        )}
        
        {networkType === 'collaboration' && (
          <div className="mt-3 text-sm text-gray-700">
            <p><strong>Collaboration Pattern:</strong> {
              node.centralityValue > 0.75 ? "Central project coordinator connecting multiple stakeholders" :
              node.centralityValue > 0.6 ? "Active collaborator across several initiative types" :
              node.centralityValue > 0.45 ? "Specialized project partner with focused collaborations" :
              "Selective collaborator working on specific initiatives"
            }</p>
          </div>
        )}
        
        {networkType === 'institutional' && (
          <div className="mt-3 text-sm text-gray-700">
            <p><strong>Institutional Position:</strong> {
              node.centralityValue > 0.75 ? "Key institutional actor with significant influence on policy and resources" :
              node.centralityValue > 0.6 ? "Established institutional player with formal connections" :
              node.centralityValue > 0.45 ? "Connected organization with moderate institutional influence" :
              "Peripheral institutional actor with limited formal connections"
            }</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Cultural Innovation Network Visualization</h2>
        <p className="text-gray-600 mt-1">Explore relationship patterns within cultural innovation ecosystems</p>
      </div>
      
      {/* Network selection */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button 
          className={`px-3 py-1 rounded-full text-sm font-medium ${networkType === 'knowledge' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setNetworkType('knowledge')}
        >
          Knowledge Networks
        </button>
        <button 
          className={`px-3 py-1 rounded-full text-sm font-medium ${networkType === 'collaboration' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setNetworkType('collaboration')}
        >
          Collaboration Networks
        </button>
        <button 
          className={`px-3 py-1 rounded-full text-sm font-medium ${networkType === 'institutional' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setNetworkType('institutional')}
        >
          Institutional Networks
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Network visualization */}
        <div className="lg:col-span-3 bg-gray-50 rounded-lg p-2 shadow-md">
          <svg ref={svgRef} width="100%" height="500px" className="bg-white rounded"></svg>
          
          <div className="text-xs text-gray-500 mt-2">
            <p>Tip: Hover over nodes to highlight connections. Click and drag nodes to rearrange the network.</p>
          </div>
        </div>
        
        {/* Legend & details panel */}
        <div className="space-y-4">
          {/* Node legend */}
          <div className="p-3 bg-white rounded-lg shadow-md">
            <h3 className="font-medium text-gray-900 mb-2">Node Types</h3>
            {Object.entries(nodeTypes).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full" style={{backgroundColor: value.color}}></div>
                <span className="text-sm">{value.label}</span>
              </div>
            ))}
          </div>
          
          {/* Link legend */}
          <div className="p-3 bg-white rounded-lg shadow-md">
            <h3 className="font-medium text-gray-900 mb-2">Relationship Types</h3>
            {Object.entries(relationshipTypes).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 mb-1">
                <div className="w-5 h-1" style={{
                  backgroundColor: value.color,
                  borderTop: value.dashed ? '1px dashed ' + value.color : 'none'
                }}></div>
                <span className="text-sm">{value.label}</span>
              </div>
            ))}
            <div className="text-xs text-gray-500 mt-2">Node size indicates centrality in the network</div>
          </div>
          
          {/* Node details */}
          {highlightedNode && getDetailContent()}
          
          {/* Network description */}
          <div className="p-3 bg-white rounded-lg shadow-md">
            <h3 className="font-medium text-gray-900 mb-2">About This Network</h3>
            {networkType === 'knowledge' && (
              <p className="text-sm text-gray-600">This visualization shows how knowledge and ideas flow between different actors in the cultural innovation ecosystem. Larger nodes represent key knowledge hubs that create, process, and distribute information across the network.</p>
            )}
            {networkType === 'collaboration' && (
              <p className="text-sm text-gray-600">This visualization shows practical collaboration on projects and initiatives between organizations in the cultural innovation ecosystem. Link thickness represents collaboration intensity, while node size shows how central each actor is to collaborative activities.</p>
            )}
            {networkType === 'institutional' && (
              <p className="text-sm text-gray-600">This visualization shows formal institutional relationships including funding flows, policy influence, and mentorship connections. Different line styles represent different types of institutional relationships between actors.</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Network Analysis Insights</h3>
        
        {networkType === 'knowledge' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">The knowledge network reveals how information and ideas flow through the cultural innovation ecosystem. Key insights include:</p>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>The University Research Center and Creative Innovation Hub serve as central knowledge brokers connecting academic research with practical applications</li>
              <li>There are strong knowledge flows between cultural organizations and educational institutions, facilitating the translation of theoretical knowledge into cultural expressions</li>
              <li>Community Arts Center plays a crucial bridging role connecting grassroots practitioners with formal institutions</li>
              <li>Individual artists and small collectives primarily access knowledge through community organizations rather than direct connections to larger institutions</li>
            </ul>
            <p className="text-sm text-gray-600 mt-2">This knowledge structure enhances resilience by enabling rapid dissemination of innovations while maintaining diverse knowledge sources that contribute to adaptive capacity.</p>
          </div>
        )}
        
        {networkType === 'collaboration' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">The collaboration network shows actual working relationships on projects and initiatives. Key insights include:</p>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>The Creative Innovation Hub emerges as the central collaboration node, actively working with both creative businesses and cultural organizations</li>
              <li>The Regional Tourism Board has become an important collaboration partner, demonstrating how cultural innovations connect to broader economic activities</li>
              <li>Collaboration density is highest among creative businesses, suggesting stronger project integration in the commercial sector</li>
              <li>The Experimental Theater shows stronger collaborative ties than might be expected from its size, indicating its role in experimental cross-sector projects</li>
            </ul>
            <p className="text-sm text-gray-600 mt-2">This collaboration pattern enhances resilience through the diversification of partnerships and the creation of interdependent project networks that can rapidly reconfigure during disruptions.</p>
          </div>
        )}
        
        {networkType === 'institutional' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">The institutional network reveals formal relationships involving policy, funding and mentorship. Key insights include:</p>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Government bodies (Regional Arts Council, City Council, Regional Development Agency) form the institutional core with strongest policy connections</li>
              <li>Multiple funding streams diversify resource access across the ecosystem, enhancing financial resilience</li>
              <li>Mentorship relationships create informal support structures that complement formal institutional arrangements</li>
              <li>The University maintains significant institutional influence through both policy relationships and mentorship connections</li>
            </ul>
            <p className="text-sm text-gray-600 mt-2">This institutional configuration enhances resilience through governance diversity, multiple resource pathways, and complementary formal and informal support structures.</p>
          </div>
        )}
      </div>
      
      <div className="mt-6 bg-gray-50 p-3 rounded text-xs text-gray-500">
        <p className="font-medium mb-1">Framework Connection:</p>
        <p>This network visualization demonstrates key aspects of the Cultural Innovation Resilience Framework (CIRF), particularly:</p>
        <ul className="list-disc pl-4 space-y-1 mt-1">
          <li>Network Development Mechanisms that create connections enabling knowledge flow and resource sharing</li>
          <li>Institutional Innovation Mechanisms that establish governance arrangements supporting cultural innovation</li>
          <li>Multi-scalar integration showing how actors at different scales interact within innovation ecosystems</li>
          <li>Contextual factors like institutional thickness that condition how cultural innovation enhances resilience</li>
        </ul>
      </div>
    </div>
  );
};

export default NetworkVisualization;