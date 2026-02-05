import React, { useState } from 'react';
import { ChevronDown, Home, BarChart2, Compass, BookOpen, Activity, Settings, Users, Search, PlusCircle, Filter, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const CIRFPlatform = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('overview');
  
  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'assessment':
        return <AssessmentEngine />;
      case 'planning':
        return <StrategicPlanning />;
      case 'knowledge':
        return <KnowledgeEcosystem />;
      case 'monitoring':
        return <MonitoringEvaluation />;
      default:
        return <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} />;
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar Navigation */}
      <div className="w-16 md:w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-center md:justify-start">
          <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          <h1 className="hidden md:block ml-2 font-bold text-lg">CIRF Platform</h1>
        </div>
        
        <nav className="flex-1 pt-4">
          <NavItem 
            icon={<Home size={18} />} 
            label="Dashboard" 
            active={activeSection === 'dashboard'} 
            onClick={() => setActiveSection('dashboard')} 
          />
          <NavItem 
            icon={<BarChart2 size={18} />} 
            label="Assessment Engine" 
            active={activeSection === 'assessment'} 
            onClick={() => setActiveSection('assessment')} 
          />
          <NavItem 
            icon={<Compass size={18} />} 
            label="Strategic Planning" 
            active={activeSection === 'planning'} 
            onClick={() => setActiveSection('planning')} 
          />
          <NavItem 
            icon={<BookOpen size={18} />} 
            label="Knowledge Ecosystem" 
            active={activeSection === 'knowledge'} 
            onClick={() => setActiveSection('knowledge')} 
          />
          <NavItem 
            icon={<Activity size={18} />} 
            label="Monitoring & Evaluation" 
            active={activeSection === 'monitoring'} 
            onClick={() => setActiveSection('monitoring')} 
          />
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <NavItem 
            icon={<Settings size={18} />} 
            label="Settings" 
            active={false} 
            onClick={() => {}} 
          />
          <div className="mt-4 flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
              JD
            </div>
            <div className="hidden md:block ml-2">
              <p className="text-sm font-medium">Jane Doe</p>
              <p className="text-xs text-gray-500">Professional Plan</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6">
          <h2 className="text-lg font-medium">{getSectionTitle(activeSection)}</h2>
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
              <PlusCircle size={16} className="mr-2" />
              New Project
            </button>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <div 
    className={`flex items-center px-4 py-3 cursor-pointer ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
    onClick={onClick}
  >
    <div className={`${active ? 'text-blue-600' : 'text-gray-500'}`}>
      {icon}
    </div>
    <span className="hidden md:block ml-3 text-sm font-medium">{label}</span>
    {active && <div className="hidden md:block w-1 absolute right-0 h-8 bg-blue-600 rounded-l-md"></div>}
  </div>
);

const getSectionTitle = (section) => {
  switch(section) {
    case 'dashboard': return 'Dashboard';
    case 'assessment': return 'Resilience Assessment Engine';
    case 'planning': return 'Strategic Planning System';
    case 'knowledge': return 'Knowledge Ecosystem';
    case 'monitoring': return 'Monitoring & Evaluation';
    default: return 'Dashboard';
  }
};

// Dashboard Component
const Dashboard = ({ activeTab, setActiveTab }) => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Welcome back, Jane</h3>
          <p className="text-gray-600 mt-1">Here's the current state of your resilience projects</p>
        </div>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Projects</option>
            <option>Urban Redevelopment</option>
            <option>Cultural District</option>
            <option>Heritage Tourism</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
            <option>Last Year</option>
            <option>All Time</option>
          </select>
        </div>
      </div>
      
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard 
          title="Resilience Score" 
          value="72/100" 
          trend="+4" 
          trendDirection="up" 
          description="Overall resilience capacity" 
          color="blue"
        />
        <KPICard 
          title="Active Projects" 
          value="5" 
          trend="+1" 
          trendDirection="up" 
          description="Across 3 regions" 
          color="green"
        />
        <KPICard 
          title="Risk Exposure" 
          value="Medium" 
          trend="-2" 
          trendDirection="down" 
          description="Improved from High" 
          color="amber"
        />
        <KPICard 
          title="Innovation Index" 
          value="68/100" 
          trend="+7" 
          trendDirection="up" 
          description="Cultural innovation metrics" 
          color="purple"
        />
      </div>
      
      {/* Dashboard Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>Overview</TabButton>
          <TabButton active={activeTab === 'projects'} onClick={() => setActiveTab('projects')}>Projects</TabButton>
          <TabButton active={activeTab === 'performance'} onClick={() => setActiveTab('performance')}>Performance</TabButton>
          <TabButton active={activeTab === 'reports'} onClick={() => setActiveTab('reports')}>Reports</TabButton>
        </div>
      </div>
      
      {/* Resilience Capacities Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-5 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Resilience Capacities</h3>
            <button className="text-sm text-blue-600 flex items-center">
              View Details
              <ChevronDown size={14} className="ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            <CapacityBar label="Absorptive Capacity" value={80} color="blue" />
            <CapacityBar label="Adaptive Capacity" value={65} color="green" />
            <CapacityBar label="Transformative Capacity" value={45} color="amber" />
            <CapacityBar label="Anticipatory Capacity" value={70} color="purple" />
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <a href="#" className="text-sm text-blue-600 font-medium">Run new assessment →</a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Active Mechanisms</h3>
            <button className="text-sm text-blue-600 flex items-center">
              View All
              <ChevronDown size={14} className="ml-1" />
            </button>
          </div>
          
          <div className="space-y-3">
            <MechanismItem 
              name="Symbolic Knowledge Mechanisms" 
              status="active" 
              projects={3}
            />
            <MechanismItem 
              name="Network Development Mechanisms" 
              status="active" 
              projects={4}
            />
            <MechanismItem 
              name="Capital Conversion Mechanisms" 
              status="pending" 
              projects={2}
            />
            <MechanismItem 
              name="Institutional Innovation Mechanisms" 
              status="inactive" 
              projects={1}
            />
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <a href="#" className="text-sm text-blue-600 font-medium">Activate new mechanism →</a>
          </div>
        </div>
      </div>
      
      {/* Recent Activity & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Recent Activity</h3>
            <button className="text-sm text-gray-500">See all</button>
          </div>
          
          <div className="space-y-4">
            <ActivityItem 
              type="assessment"
              title="Cultural District Assessment Completed"
              time="2 hours ago"
              user="Jane Doe"
            />
            <ActivityItem 
              type="planning"
              title="Strategic Plan Updated: Heritage Tourism"
              time="Yesterday"
              user="Mark Johnson"
            />
            <ActivityItem 
              type="monitoring"
              title="Quarterly Metrics Updated"
              time="3 days ago"
              user="Sarah Williams"
            />
            <ActivityItem 
              type="knowledge"
              title="New Case Study: Barcelona Post-COVID"
              time="1 week ago"
              user="System"
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Recommendations</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Filter size={14} className="mr-1" />
              Filter
            </div>
          </div>
          
          <div className="space-y-4">
            <RecommendationItem
              title="Enhance Transformative Capacity"
              description="Your transformative capacity scores are 25% below benchmark. Consider activating institutional innovation mechanisms."
              priority="high"
            />
            <RecommendationItem
              title="Network Development Opportunity"
              description="Analysis suggests potential for stronger creative-sector connections in the Heritage Tourism project."
              priority="medium"
            />
            <RecommendationItem
              title="Review Case Studies"
              description="5 new case studies match your context profile and may offer relevant insights."
              priority="low"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const KPICard = ({ title, value, trend, trendDirection, description, color }) => {
  const getColorClasses = () => {
    switch(color) {
      case 'blue': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'green': return 'bg-green-50 text-green-700 border-green-200';
      case 'amber': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'purple': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  const getTrendClasses = () => {
    return trendDirection === 'up' 
      ? 'text-green-600 bg-green-50' 
      : 'text-red-600 bg-red-50';
  };
  
  return (
    <div className={`border rounded-lg p-4 ${getColorClasses()}`}>
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium opacity-80">{title}</p>
        <div className={`px-2 py-1 rounded text-xs font-medium flex items-center ${getTrendClasses()}`}>
          {trendDirection === 'up' ? '↑' : '↓'} {trend}
        </div>
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-xs mt-1 opacity-70">{description}</p>
    </div>
  );
};

const TabButton = ({ children, active, onClick }) => (
  <button
    className={`py-3 font-medium text-sm relative ${
      active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
    }`}
    onClick={onClick}
  >
    {children}
    {active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
  </button>
);

const CapacityBar = ({ label, value, color }) => {
  const getColorClass = () => {
    switch(color) {
      case 'blue': return 'bg-blue-500';
      case 'green': return 'bg-green-500';
      case 'amber': return 'bg-amber-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-600">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${getColorClass()}`} style={{width: `${value}%`}}></div>
      </div>
    </div>
  );
};

const MechanismItem = ({ name, status, projects }) => {
  const getStatusClasses = () => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-500' : status === 'pending' ? 'bg-amber-500' : 'bg-gray-400'}`}></div>
        <span className="ml-2 text-sm">{name}</span>
      </div>
      <div className="flex items-center">
        <span className={`text-xs px-2 py-1 rounded ${getStatusClasses()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        <span className="ml-2 text-xs text-gray-500">{projects} projects</span>
      </div>
    </div>
  );
};

const ActivityItem = ({ type, title, time, user }) => {
  const getTypeIcon = () => {
    switch(type) {
      case 'assessment': return <BarChart2 size={16} className="text-blue-500" />;
      case 'planning': return <Compass size={16} className="text-green-500" />;
      case 'monitoring': return <Activity size={16} className="text-amber-500" />;
      case 'knowledge': return <BookOpen size={16} className="text-purple-500" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };
  
  return (
    <div className="flex">
      <div className="mr-3 mt-1">
        {getTypeIcon()}
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{time} • {user}</p>
      </div>
    </div>
  );
};

const RecommendationItem = ({ title, description, priority }) => {
  const getPriorityClasses = () => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-md p-3">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-sm">{title}</h4>
        <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityClasses()}`}>
          {priority}
        </span>
      </div>
      <p className="text-xs text-gray-600">{description}</p>
      <div className="mt-2 flex justify-end">
        <button className="text-xs text-blue-600">View Details</button>
      </div>
    </div>
  );
};

// Assessment Engine Component
const AssessmentEngine = () => {
  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold">Resilience Assessment Engine</h3>
            <p className="text-gray-600 mt-1">Evaluate your cultural innovation and resilience capacities</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
            Start New Assessment
          </button>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <div className="flex">
            <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
            <p>Assessment recommendations are based on your specific context and historical data. For best results, complete all sections and provide detailed information.</p>
          </div>
        </div>
      </div>
      
      {/* Assessment Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <AssessmentCard 
          title="Quick Scan Assessment" 
          description="A rapid evaluation of your key resilience capacities. Takes approximately 15-20 minutes."
          time="15-20 min"
          questions="25"
          lastCompleted="2 weeks ago"
          recommended={false}
        />
        
        <AssessmentCard 
          title="Comprehensive Assessment" 
          description="In-depth analysis of all resilience dimensions and cultural innovation capabilities."
          time="45-60 min"
          questions="75"
          lastCompleted="Never"
          recommended={true}
        />
        
        <AssessmentCard 
          title="Targeted Assessment" 
          description="Focus on specific resilience capacities or cultural innovation dimensions."
          time="Varies"
          questions="Custom"
          lastCompleted="1 month ago"
          recommended={false}
        />
      </div>
      
      {/* Recent Assessments */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="font-bold">Recent Assessments</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          <AssessmentListItem 
            title="Cultural District Project"
            type="Quick Scan"
            date="May 18, 2025"
            score={72}
            change="+4"
          />
          
          <AssessmentListItem 
            title="Heritage Tourism Initiative"
            type="Targeted: Adaptive Capacity"
            date="Apr 25, 2025"
            score={68}
            change="+2"
          />
          
          <AssessmentListItem 
            title="Creative Industries Policy"
            type="Comprehensive"
            date="Mar 10, 2025"
            score={65}
            change="-2"
          />
          
          <AssessmentListItem 
            title="Urban Redevelopment Program"
            type="Quick Scan"
            date="Feb 15, 2025"
            score={59}
            change="+7"
          />
        </div>
        
        <div className="px-5 py-3 bg-gray-50 text-center">
          <button className="text-sm text-blue-600 font-medium">View All Assessments</button>
        </div>
      </div>
      
      {/* Assessment Dimensions */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-bold">Assessment Dimensions</h3>
          <button className="text-sm text-gray-500 flex items-center">
            <Filter size={14} className="mr-1" />
            Filter
          </button>
        </div>
        
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <AssessmentDimension 
            title="Resilience Capacities" 
            description="Evaluate absorptive, adaptive, transformative, and anticipatory capacities"
            items={[
              { name: "Absorptive Capacity", status: "completed" },
              { name: "Adaptive Capacity", status: "completed" },
              { name: "Transformative Capacity", status: "pending" },
              { name: "Anticipatory Capacity", status: "not-started" }
            ]}
          />
          
          <AssessmentDimension 
            title="Causal Mechanisms" 
            description="Assess which mechanisms are active in your context"
            items={[
              { name: "Symbolic Knowledge Mechanisms", status: "completed" },
              { name: "Network Development Mechanisms", status: "completed" },
              { name: "Capital Conversion Mechanisms", status: "not-started" },
              { name: "Institutional Innovation Mechanisms", status: "not-started" }
            ]}
          />
          
          <AssessmentDimension 
            title="Contextual Mediators" 
            description="Analyze how your specific context shapes resilience"
            items={[
              { name: "Governance Arrangements", status: "completed" },
              { name: "Industrial Structure", status: "pending" },
              { name: "Knowledge Ecology", status: "not-started" },
              { name: "Cultural Context", status: "completed" }
            ]}
          />
          
          <AssessmentDimension 
            title="Temporal Dynamics" 
            description="Understand time horizons and developmental trajectories"
            items={[
              { name: "Time Horizons", status: "pending" },
              { name: "Development Trajectories", status: "not-started" },
              { name: "Feedback Dynamics", status: "not-started" },
              { name: "Phase Relationships", status: "not-started" }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

const AssessmentCard = ({ title, description, time, questions, lastCompleted, recommended }) => (
  <div className={`border ${recommended ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'} rounded-lg p-5 shadow-sm relative`}>
    {recommended && (
      <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs rounded-full px-3 py-1 font-medium">
        Recommended
      </div>
    )}
    <h3 className="font-bold mb-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    
    <div className="flex space-x-4 text-xs text-gray-500 mb-3">
      <div className="flex items-center">
        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path strokeWidth="2" d="M12 6v6l4 2" />
        </svg>
        {time}
      </div>
      <div className="flex items-center">
        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeWidth="2" d="M8 10h8M8 14h4" />
          <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="2" />
        </svg>
        {questions} questions
      </div>
    </div>
    
    <p className="text-xs text-gray-500 mb-4">Last completed: {lastCompleted}</p>
    
    <button className={`w-full py-2 text-sm font-medium rounded-md ${recommended ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
      {recommended ? 'Start Assessment' : 'Begin'}
    </button>
  </div>
);

const AssessmentListItem = ({ title, type, date, score, change }) => {
  const changeValue = parseInt(change);
  
  return (
    <div className="px-5 py-3 flex items-center">
      <div className="flex-grow">
        <h4 className="font-medium text-sm">{title}</h4>
        <div className="flex text-xs text-gray-500 mt-1">
          <span>{type}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="text-center mr-6">
          <div className="text-lg font-bold">{score}</div>
          <div className="text-xs text-gray-500">Score</div>
        </div>
        
        <div className={`flex items-center text-sm font-medium ${changeValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {changeValue >= 0 ? '↑' : '↓'} {Math.abs(changeValue)}
        </div>
      </div>
      
      <button className="ml-6 text-sm text-blue-600">View</button>
    </div>
  );
};

const AssessmentDimension = ({ title, description, items }) => {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'pending':
        return <div className="w-4 h-4 rounded-full border-2 border-amber-500"></div>;
      case 'not-started':
        return <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>;
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="font-bold text-sm mb-1">{title}</h3>
      <p className="text-xs text-gray-600 mb-3">{description}</p>
      
      <div className="space-y-2 mb-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="mr-2">
              {getStatusIcon(item.status)}
            </div>
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-2 text-sm text-blue-600 py-1.5 border border-blue-200 rounded-md bg-blue-50 font-medium">
        Continue Assessment
      </button>
    </div>
  );
};

// Strategic Planning System Component
const StrategicPlanning = () => {
  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold">Strategic Planning System</h3>
            <p className="text-gray-600 mt-1">Design targeted interventions to enhance resilience through cultural innovation</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
            Create New Plan
          </button>
        </div>
      </div>
      
      {/* Active Plans */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-bold">Active Strategic Plans</h3>
          <div className="flex items-center">
            <div className="relative mr-2">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search plans..." 
                className="pl-9 pr-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button className="text-sm text-gray-500 flex items-center">
              <Filter size={14} className="mr-1" />
              Filter
            </button>
          </div>
        </div>
        
        <div>
          <StrategicPlanItem 
            title="Cultural District Resilience Enhancement"
            description="A comprehensive strategy to strengthen the downtown cultural district's contribution to urban economic resilience."
            status="In Progress"
            progress={65}
            implementation="Network-Led"
            timeframe="Medium-Term"
            keyFocus="Adaptive Capacity"
          />
          
          <StrategicPlanItem 
            title="Heritage Tourism Development"
            description="Leveraging cultural heritage assets to enhance regional economic resilience through tourism diversification."
            status="Active"
            progress={40}
            implementation="Community-Led"
            timeframe="Long-Term"
            keyFocus="Transformative Capacity"
          />
          
          <StrategicPlanItem 
            title="Creative Workforce Resilience"
            description="Enhancing the adaptive capacity of the creative workforce through skill development and network building."
            status="Planning"
            progress={15}
            implementation="Policy-Led"
            timeframe="Short-Term"
            keyFocus="Absorptive Capacity"
          />
        </div>
      </div>
      
      {/* Mechanism Activation Planner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow col-span-2">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="font-bold">Mechanism Activation Planner</h3>
          </div>
          
          <div className="p-5">
            <p className="text-sm text-gray-600 mb-4">Plan and track the activation of specific causal mechanisms to enhance resilience capacities.</p>
            
            <div className="space-y-4">
              <MechanismActivationItem 
                title="Symbolic Knowledge Mechanisms"
                description="Enhance meaning-making capabilities through cultural narrative development."
                status="Active"
                projects={3}
                capacityImpact="Absorptive: +15%, Adaptive: +8%"
                implementationStage="Implementation"
              />
              
              <MechanismActivationItem 
                title="Network Development Mechanisms"
                description="Build stronger connections between cultural and non-cultural sectors."
                status="Active"
                projects={4}
                capacityImpact="Adaptive: +12%, Transformative: +7%"
                implementationStage="Scaling"
              />
              
              <MechanismActivationItem 
                title="Capital Conversion Mechanisms"
                description="Transform cultural assets into economic value through strategic programs."
                status="Planning"
                projects={2}
                capacityImpact="Absorptive: +6%, Transformative: +10%"
                implementationStage="Design"
              />
              
              <MechanismActivationItem 
                title="Institutional Innovation Mechanisms"
                description="Develop new governance arrangements supporting cultural innovation."
                status="Inactive"
                projects={1}
                capacityImpact="Transformative: +15%, Anticipatory: +9%"
                implementationStage="Research"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="font-bold">Implementation Pathways</h3>
          </div>
          
          <div className="p-5">
            <p className="text-sm text-gray-600 mb-4">Select the optimal implementation approach based on your context.</p>
            
            <div className="space-y-3">
              <ImplementationPathwayItem 
                title="Policy-Led Implementation"
                description="Primarily driven by formal policy instruments."
                contextFit="Medium"
                recommended={false}
              />
              
              <ImplementationPathwayItem 
                title="Market-Led Implementation"
                description="Operating through market mechanisms and incentives."
                contextFit="Low"
                recommended={false}
              />
              
              <ImplementationPathwayItem 
                title="Network-Led Implementation"
                description="Organized through collaborative partnerships."
                contextFit="High"
                recommended={true}
              />
              
              <ImplementationPathwayItem 
                title="Community-Led Implementation"
                description="Driven by community initiatives and leadership."
                contextFit="Medium-High"
                recommended={false}
              />
            </div>
            
            <div className="mt-4">
              <button className="w-full py-2 text-sm font-medium bg-blue-600 text-white rounded-md">
                Configure Implementation
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Multi-Horizon Planning */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="font-bold">Multi-Horizon Planning</h3>
        </div>
        
        <div className="p-5">
          <p className="text-sm text-gray-600 mb-4">Coordinate interventions across different time horizons to balance immediate needs with longer-term transformation.</p>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <TimeHorizonCard 
              title="Immediate Horizon"
              timeframe="0-6 months"
              focus="Absorptive Capacity"
              description="Quick interventions to enhance immediate resilience against current challenges."
              actions={[
                "Cultural event programming",
                "Digital skills workshops",
                "Creative sector emergency funding"
              ]}
              color="blue"
            />
            
            <TimeHorizonCard 
              title="Medium-Term Horizon"
              timeframe="6 months-2 years"
              focus="Adaptive Capacity"
              description="Initiatives that enhance ability to adjust to changing conditions."
              actions={[
                "Cultural district development",
                "Cross-sector innovation labs",
                "Workforce adaptation programs"
              ]}
              color="green"
            />
            
            <TimeHorizonCard 
              title="Long-Term Horizon"
              timeframe="2+ years"
              focus="Transformative Capacity"
              description="Strategic initiatives aimed at fundamental system reconfiguration."
              actions={[
                "Cultural policy redesign",
                "New governance structures",
                "Identity transformation programs"
              ]}
              color="purple"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StrategicPlanItem = ({ title, description, status, progress, implementation, timeframe, keyFocus }) => {
  const getStatusColor = () => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="px-5 py-4 border-b border-gray-200">
      <div className="flex items-start">
        <div className="flex-grow">
          <div className="flex items-center">
            <h4 className="font-medium">{title}</h4>
            <span className={`ml-3 text-xs px-2 py-0.5 rounded-full ${getStatusColor()}`}>
              {status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1 mb-3">{description}</p>
          
          <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
            <div className="bg-gray-100 px-2 py-1 rounded">
              <span className="font-medium">Implementation:</span> {implementation}
            </div>
            <div className="bg-gray-100 px-2 py-1 rounded">
              <span className="font-medium">Timeframe:</span> {timeframe}
            </div>
            <div className="bg-gray-100 px-2 py-1 rounded">
              <span className="font-medium">Key Focus:</span> {keyFocus}
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{width: `${progress}%`}}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{progress}% Complete</span>
            <span>Updated 3 days ago</span>
          </div>
        </div>
        
        <div className="ml-4 flex-shrink-0">
          <button className="text-sm text-blue-600 font-medium">View Plan</button>
        </div>
      </div>
    </div>
  );
};

const MechanismActivationItem = ({ title, description, status, projects, capacityImpact, implementationStage }) => {
  const getStatusColor = () => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Planning': return 'bg-amber-100 text-amber-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{title}</h4>
        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor()}`}>
          {status}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      
      <div className="grid grid-cols-2 gap-3 text-xs mb-3">
        <div>
          <p className="text-gray-500">Projects:</p>
          <p className="font-medium">{projects} active</p>
        </div>
        <div>
          <p className="text-gray-500">Implementation Stage:</p>
          <p className="font-medium">{implementationStage}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500">Capacity Impact:</p>
          <p className="font-medium">{capacityImpact}</p>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button className="text-xs text-blue-600">View Details</button>
        <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded">Activate</button>
      </div>
    </div>
  );
};

const ImplementationPathwayItem = ({ title, description, contextFit, recommended }) => {
  const getContextFitColor = () => {
    switch(contextFit) {
      case 'High': return 'text-green-600';
      case 'Medium-High': return 'text-green-500';
      case 'Medium': return 'text-amber-500';
      case 'Low': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };
  
  return (
    <div className={`border ${recommended ? 'border-blue-300 bg-blue-50' : 'border-gray-200'} rounded-lg p-3 relative`}>
      {recommended && (
        <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
          Best Fit
        </div>
      )}
      
      <h4 className="font-medium text-sm">{title}</h4>
      <p className="text-xs text-gray-600 mb-2">{description}</p>
      
      <div className="flex justify-between items-center">
        <div className="text-xs">
          <span className="text-gray-500">Context Fit:</span>
          <span className={`ml-1 font-medium ${getContextFitColor()}`}>{contextFit}</span>
        </div>
        <button className="text-xs text-blue-600">Details</button>
      </div>
    </div>
  );
};

const TimeHorizonCard = ({ title, timeframe, focus, description, actions, color }) => {
  const getColorClasses = () => {
    switch(color) {
      case 'blue': return 'border-blue-200 bg-blue-50';
      case 'green': return 'border-green-200 bg-green-50';
      case 'purple': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };
  
  return (
    <div className={`border rounded-lg p-4 flex-1 ${getColorClasses()}`}>
      <h4 className="font-medium">{title}</h4>
      <div className="flex space-x-2 text-xs mt-1 mb-2">
        <span className="font-medium">{timeframe}</span>
        <span>•</span>
        <span>Focus: {focus}</span>
      </div>
      
      <p className="text-xs text-gray-600 mb-3">{description}</p>
      
      <h5 className="text-xs font-medium mb-2">Key Actions:</h5>
      <ul className="text-xs space-y-1 mb-3">
        {actions.map((action, index) => (
          <li key={index} className="flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5"></div>
            {action}
          </li>
        ))}
      </ul>
      
      <button className="w-full text-xs py-1.5 bg-white border border-gray-200 rounded text-blue-600 font-medium">
        Plan Actions
      </button>
    </div>
  );
};

// Knowledge Ecosystem Component
const KnowledgeEcosystem = () => {
  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold">Knowledge Ecosystem</h3>
            <p className="text-gray-600 mt-1">Access and contribute to collective knowledge on cultural innovation and resilience</p>
          </div>
          <div className="flex space-x-2">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium">
              Contribute
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
              Find Resources
            </button>
          </div>
        </div>
      </div>
      
      {/* Featured Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="font-bold">Featured Case Studies</h3>
          </div>
          
          <div className="p-5">
            <div className="grid grid-cols-1 gap-4">
              <FeaturedCaseStudy 
                title="Barcelona's Post-COVID Cultural Resilience Strategy"
                imageUrl="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                description="How Barcelona mobilized cultural assets to enhance economic resilience following pandemic disruption."
                tags={["Urban", "Post-Pandemic", "Policy-Led", "Transformative"]}
                date="May 10, 2025"
                readTime="12 min"
                relevance="92% match to your context"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CaseStudyCard 
                  title="Manchester's Creative Enterprise Zone"
                  description="Building resilience through cultural district development in a post-industrial context."
                  tags={["Urban", "Post-Industrial", "Network-Led"]}
                  date="April 15, 2025"
                  readTime="8 min"
                  relevance="85% match"
                />
                
                <CaseStudyCard 
                  title="Rural Scotland Digital Cultural Hub"
                  description="Digital innovation enhancing rural community resilience through cultural initiatives."
                  tags={["Rural", "Digital", "Community-Led"]}
                  date="March 22, 2025"
                  readTime="10 min"
                  relevance="78% match"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="font-bold">Method Repository</h3>
          </div>
          
          <div className="p-5">
            <p className="text-sm text-gray-600 mb-4">Practical tools and methodologies for implementing the CIRF framework.</p>
            
            <div className="space-y-3">
              <MethodItem 
                title="Capacity Radar Assessment"
                type="Assessment"
                description="Tool for mapping resilience capacities across multiple dimensions."
                rating={4.8}
                downloads={523}
              />
              
              <MethodItem 
                title="Mechanism Activation Workshop"
                type="Planning"
                description="Collaborative workshop format for activating causal mechanisms."
                rating={4.6}
                downloads={412}
              />
              
              <MethodItem 
                title="Cultural Innovation Inventory"
                type="Assessment"
                description="Method for cataloging cultural innovation assets and activities."
                rating={4.5}
                downloads={389}
              />
              
              <MethodItem 
                title="Multi-Horizon Planning Canvas"
                type="Planning"
                description="Visual tool for planning across different time horizons."
                rating={4.7}
                downloads={476}
              />
            </div>
            
            <div className="mt-4 text-center">
              <button className="text-sm text-blue-600 font-medium">Browse All Methods</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expert Network */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-bold">Expert Network</h3>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Find experts..." 
              className="pl-9 pr-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="p-5">
          <p className="text-sm text-gray-600 mb-4">Connect with specialists across relevant domains who can provide guidance on specific aspects of your resilience strategy.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ExpertCard 
              name="Dr. Maria Rodriguez"
              title="Cultural Policy Specialist"
              organization="Urban Resilience Institute"
              expertise={["Policy Design", "Urban Cultural Planning", "Governance Innovation"]}
              availability="Available for consultation"
              rating={4.9}
              projects={24}
            />
            
            <ExpertCard 
              name="James Chen"
              title="Creative Economy Researcher"
              organization="Global Innovation Lab"
              expertise={["Cultural Economics", "Digital Transformation", "Network Analysis"]}
              availability="Limited availability"
              rating={4.7}
              projects={19}
            />
            
            <ExpertCard 
              name="Aisha Mbeki"
              title="Community Resilience Practitioner"
              organization="Cultural Resilience Network"
              expertise={["Community-Led Approaches", "Cultural Asset Mapping", "Participatory Methods"]}
              availability="Available for consultation"
              rating={4.8}
              projects={31}
            />
          </div>
          
          <div className="mt-4 text-center">
            <button className="text-sm text-blue-600 font-medium">View All Experts</button>
          </div>
        </div>
      </div>
      
      {/* Learning Pathways */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="font-bold">Learning Pathways</h3>
        </div>
        
        <div className="p-5">
          <p className="text-sm text-gray-600 mb-4">Structured learning journeys to build your knowledge and capabilities around cultural innovation and resilience.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LearningPathwayCard 
              title="Cultural Innovation Foundations"
              description="Master the key concepts and frameworks for understanding cultural innovation and its relationship to economic resilience."
              modules={5}
              duration="4 weeks"
              prerequisites="None"
              progress={40}
              status="In Progress"
            />
            
            <LearningPathwayCard 
              title="Strategic Planning for Resilience"
              description="Learn how to design and implement effective strategic plans for enhancing resilience through cultural innovation."
              modules={6}
              duration="6 weeks"
              prerequisites="Foundations Pathway"
              progress={0}
              status="Not Started"
            />
            
            <LearningPathwayCard 
              title="Assessment & Evaluation Methods"
              description="Develop expertise in measuring and evaluating cultural innovation's contribution to economic resilience."
              modules={4}
              duration="4 weeks"
              prerequisites="Foundations Pathway"
              progress={0}
              status="Not Started"
            />
            
            <LearningPathwayCard 
              title="Implementation & Scaling"
              description="Advanced techniques for implementing and scaling cultural innovation initiatives for resilience enhancement."
              modules={7}
              duration="8 weeks"
              prerequisites="All previous pathways"
              progress={0}
              status="Locked"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedCaseStudy = ({ title, imageUrl, description, tags, date, readTime, relevance }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    <div className="h-48 bg-gray-200 relative">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-full object-cover"
      />
      <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded">
        Featured
      </div>
    </div>
    
    <div className="p-4">
      <h4 className="font-bold text-lg">{title}</h4>
      <p className="text-sm text-gray-600 mt-1 mb-3">{description}</p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {tags.map((tag, index) => (
          <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>{readTime} read</span>
        </div>
        <div className="text-xs text-green-600 font-medium">
          {relevance}
        </div>
      </div>
      
      <button className="w-full mt-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-md">
        Read Case Study
      </button>
    </div>
  </div>
);

const CaseStudyCard = ({ title, description, tags, date, readTime, relevance }) => (
  <div className="border border-gray-200 rounded-lg p-4">
    <h4 className="font-bold">{title}</h4>
    <p className="text-sm text-gray-600 mt-1 mb-3">{description}</p>
    
    <div className="flex flex-wrap gap-1 mb-3">
      {tags.map((tag, index) => (
        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
          {tag}
        </span>
      ))}
    </div>
    
    <div className="flex justify-between items-center">
      <div className="text-xs text-gray-500">
        <span>{date}</span>
        <span className="mx-2">•</span>
        <span>{readTime} read</span>
      </div>
      <div className="text-xs text-green-600 font-medium">
        {relevance}
      </div>
    </div>
    
    <button className="w-full mt-3 py-1.5 text-sm font-medium border border-blue-600 text-blue-600 rounded-md">
      View
    </button>
  </div>
);

const MethodItem = ({ title, type, description, rating, downloads }) => (
  <div className="border border-gray-200 rounded-lg p-3">
    <div className="flex justify-between items-start mb-1">
      <h4 className="font-medium text-sm">{title}</h4>
      <span className="bg-gray-100 text-gray-700 text-xs px-1.5 py-0.5 rounded">
        {type}
      </span>
    </div>
    
    <p className="text-xs text-gray-600 mb-2">{description}</p>
    
    <div className="flex justify-between items-center">
      <div className="flex items-center text-xs">
        <div className="flex items-center text-amber-500 mr-2">
          ★ {rating}
        </div>
        <div className="text-gray-500">
          {downloads} downloads
        </div>
      </div>
      <button className="text-xs text-blue-600">Download</button>
    </div>
  </div>
);

const ExpertCard = ({ name, title, organization, expertise, availability, rating, projects }) => (
  <div className="border border-gray-200 rounded-lg p-4">
    <div className="flex items-start mb-3">
      <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0"></div>
      <div className="ml-3">
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xs text-gray-500">{organization}</p>
      </div>
    </div>
    
    <div className="mb-3">
      <p className="text-xs font-medium mb-1">Expertise:</p>
      <div className="flex flex-wrap gap-1">
        {expertise.map((skill, index) => (
          <span key={index} className="bg-gray-100 text-gray-700 text-xs px-1.5 py-0.5 rounded">
            {skill}
          </span>
        ))}
      </div>
    </div>
    
    <div className="flex justify-between items-center text-xs mb-3">
      <div className="text-green-600">
        {availability}
      </div>
      <div className="flex items-center">
        <div className="flex items-center text-amber-500 mr-2">
          ★ {rating}
        </div>
        <div className="text-gray-500">
          {projects} projects
        </div>
      </div>
    </div>
    
    <button className="w-full py-1.5 text-sm font-medium border border-blue-600 text-blue-600 rounded-md">
      Contact
    </button>
  </div>
);

const LearningPathwayCard = ({ title, description, modules, duration, prerequisites, progress, status }) => {
  const getStatusClasses = () => {
    switch(status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Locked': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold">{title}</h4>
        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusClasses()}`}>
          {status}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      
      <div className="grid grid-cols-3 gap-2 text-xs mb-3">
        <div>
          <p className="text-gray-500">Modules:</p>
          <p className="font-medium">{modules}</p>
        </div>
        <div>
          <p className="text-gray-500">Duration:</p>
          <p className="font-medium">{duration}</p>
        </div>
        <div>
          <p className="text-gray-500">Prerequisites:</p>
          <p className="font-medium">{prerequisites}</p>
        </div>
      </div>
      
      {progress > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{width: `${progress}%`}}></div>
          </div>
        </div>
      )}
      
      <button 
        className={`w-full py-1.5 text-sm font-medium rounded-md ${
          status === 'Locked' 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : status === 'In Progress' 
              ? 'bg-blue-600 text-white' 
              : 'border border-blue-600 text-blue-600'
        }`}
        disabled={status === 'Locked'}
      >
        {status === 'In Progress' ? 'Continue Learning' : status === 'Completed' ? 'Review Materials' : status === 'Locked' ? 'Unavailable' : 'Start Learning'}
      </button>
    </div>
  );
};

// Monitoring & Evaluation Component
const MonitoringEvaluation = () => {
  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold">Monitoring & Evaluation</h3>
            <p className="text-gray-600 mt-1">Track and assess the impact of your cultural innovation initiatives on resilience</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
            Create New Report
          </button>
        </div>
      </div>
      
      {/* Performance Dashboard */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-bold">Performance Dashboard</h3>
          <div className="flex items-center space-x-2">
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
              <option>Last Quarter</option>
              <option>Last 6 months</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
            <button className="text-sm text-gray-500">
              Export
            </button>
          </div>
        </div>
        
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard 
              title="Overall Resilience Score"
              value={72}
              change={+4}
              goal={85}
              trend="up"
            />
            
            <MetricCard 
              title="Cultural Innovation Index"
              value={68}
              change={+7}
              goal={75}
              trend="up"
            />
            
            <MetricCard 
              title="Active Mechanisms"
              value={3}
              change={+1}
              goal={4}
              trend="up"
            />
            
            <MetricCard 
              title="Implementation Progress"
              value={42}
              change={+12}
              goal={100}
              trend="up"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Resilience Capacity Trends</h4>
              <div className="aspect-[4/3] bg-gray-100 rounded flex items-center justify-center">
                <p className="text-sm text-gray-500">Capacity Trend Chart</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Implementation Progress by Project</h4>
              <div className="aspect-[4/3] bg-gray-100 rounded flex items-center justify-center">
                <p className="text-sm text-gray-500">Project Progress Chart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Impact Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow col-span-2">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="font-bold">Impact Tracking</h3>
          </div>
          
          <div className="p-5">
            <p className="text-sm text-gray-600 mb-4">Monitor how your initiatives are enhancing resilience capacities over time.</p>
            
            <div className="space-y-4">
              <ImpactTrackingItem 
                capacity="Absorptive Capacity"
                description="Ability to withstand disruptions without fundamental failure"
                currentScore={80}
                baselineScore={65}
                trend="Improving"
                contributingMechanisms={["Symbolic Knowledge", "Capital Conversion"]}
                keyIndicators={[
                  { name: "Economic diversity index", value: 0.72, change: "+0.08" },
                  { name: "Cultural participation rate", value: "38%", change: "+12%" },
                  { name: "Brand resilience score", value: 76, change: "+14" }
                ]}
              />
              
              <ImpactTrackingItem 
                capacity="Adaptive Capacity"
                description="Ability to adjust in response to changing conditions"
                currentScore={65}
                baselineScore={52}
                trend="Improving"
                contributingMechanisms={["Network Development", "Symbolic Knowledge"]}
                keyIndicators={[
                  { name: "Innovation collaboration index", value: 0.68, change: "+0.15" },
                  { name: "New ventures formation", value: 12, change: "+5" },
                  { name: "Knowledge transfer events", value: 24, change: "+10" }
                ]}
              />
              
              <ImpactTrackingItem 
                capacity="Transformative Capacity"
                description="Ability to create fundamental system reconfiguration"
                currentScore={45}
                baselineScore={40}
                trend="Stable"
                contributingMechanisms={["Capital Conversion"]}
                keyIndicators={[
                  { name: "Structural change indicator", value: 0.32, change: "+0.05" },
                  { name: "Institutional innovation rate", value: "18%", change: "+3%" },
                  { name: "Vision alignment score", value: 62, change: "+4" }
                ]}
              />
              
              <ImpactTrackingItem 
                capacity="Anticipatory Capacity"
                description="Ability to prepare for future disruptions"
                currentScore={70}
                baselineScore={55}
                trend="Improving"
                contributingMechanisms={["Symbolic Knowledge", "Network Development"]}
                keyIndicators={[
                  { name: "Future literacy score", value: 0.78, change: "+0.18" },
                  { name: "Early warning system strength", value: "72%", change: "+22%" },
                  { name: "Scenario planning frequency", value: 3.2, change: "+1.2" }
                ]}
              />
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="px-5 py-4 border-b border-gray-200">
              <h3 className="font-bold">Mechanism Verification</h3>
            </div>
            
            <div className="p-5">
              <p className="text-sm text-gray-600 mb-4">Confirm which causal mechanisms are actually contributing to resilience outcomes.</p>
              
              <div className="space-y-3">
                <MechanismVerificationItem 
                  name="Symbolic Knowledge Mechanisms"
                  evidenceStrength="Strong"
                  contribution="Primary driver of absorptive and anticipatory capacity enhancement."
                />
                
                <MechanismVerificationItem 
                  name="Network Development Mechanisms"
                  evidenceStrength="Moderate"
                  contribution="Supporting adaptive capacity enhancement through new collaborations."
                />
                
                <MechanismVerificationItem 
                  name="Capital Conversion Mechanisms"
                  evidenceStrength="Limited"
                  contribution="Initial evidence of supporting transformative capacity."
                />
                
                <MechanismVerificationItem 
                  name="Institutional Innovation Mechanisms"
                  evidenceStrength="Insufficient Data"
                  contribution="Not yet active enough to verify contribution."
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <div className="px-5 py-4 border-b border-gray-200">
              <h3 className="font-bold">Contextual Learning</h3>
            </div>
            
            <div className="p-5">
              <p className="text-sm text-gray-600 mb-4">Document how contextual factors are shaping resilience outcomes.</p>
              
              <div className="space-y-3">
                <ContextualLearningItem 
                  factor="Governance Arrangements"
                  insight="Network governance model enhancing mechanism effectiveness by 35%."
                  source="Comparative analysis"
                />
                
                <ContextualLearningItem 
                  factor="Industrial Structure"
                  insight="Related variety in creative sectors amplifying network effects."
                  source="Economic analysis"
                />
                
                <ContextualLearningItem 
                  factor="Knowledge Ecology"
                  insight="Strong symbolic knowledge base supporting rapid adaptation."
                  source="Knowledge mapping"
                />
                
                <ContextualLearningItem 
                  factor="Cultural Context"
                  insight="High cultural participation enhancing collective meaning-making."
                  source="Community survey"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Evaluation Reports */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-bold">Evaluation Reports</h3>
          <div className="flex space-x-2">
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
              <option>All Projects</option>
              <option>Cultural District</option>
              <option>Heritage Tourism</option>
              <option>Creative Workforce</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
              <option>All Types</option>
              <option>Progress Report</option>
              <option>Impact Evaluation</option>
              <option>Learning Brief</option>
            </select>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          <EvaluationReportItem 
            title="Cultural District Quarterly Impact Assessment"
            type="Impact Evaluation"
            project="Cultural District"
            date="May 15, 2025"
            author="Jane Doe"
            insights={[
              "Symbolic knowledge mechanisms driving 65% of observed resilience gains",
              "Network development accelerating beyond projections",
              "Transformative capacity remains below target"
            ]}
          />
          
          <EvaluationReportItem 
            title="Heritage Tourism Initiative Progress Review"
            type="Progress Report"
            project="Heritage Tourism"
            date="Apr 28, 2025"
            author="Mark Johnson"
            insights={[
              "Implementation at 42% completion against 50% target",
              "Strong community engagement enhancing impact",
              "Contextual factors requiring strategy adaptation"
            ]}
          />
          
          <EvaluationReportItem 
            title="Mechanism Effectiveness Analysis"
            type="Learning Brief"
            project="All Projects"
            date="Apr 10, 2025"
            author="Research Team"
            insights={[
              "Network mechanisms most effective in high-participation contexts",
              "Symbolic mechanisms create rapid initial impacts",
              "Institutional mechanisms require longer timeframes to verify"
            ]}
          />
          
          <EvaluationReportItem 
            title="Creative Workforce Resilience Baseline Assessment"
            type="Impact Evaluation"
            project="Creative Workforce"
            date="Mar 22, 2025"
            author="Sarah Williams"
            insights={[
              "Workforce adaptive capacity baseline established at 52%",
              "Significant variation between subsectors identified",
              "Skills development opportunities prioritized for intervention"
            ]}
          />
        </div>
        
        <div className="px-5 py-3 bg-gray-50 text-center">
          <button className="text-sm text-blue-600 font-medium">View All Reports</button>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, change, goal, trend }) => (
  <div className="border border-gray-200 rounded-lg p-4">
    <h4 className="text-sm font-medium text-gray-600 mb-2">{title}</h4>
    <div className="flex items-end justify-between mb-1">
      <div className="text-2xl font-bold">{value}</div>
      <div className={`flex items-center text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {trend === 'up' ? '↑' : '↓'} {Math.abs(change)}
      </div>
    </div>
    
    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
      <div 
        className={`h-1.5 rounded-full ${trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`} 
        style={{width: `${(value / goal) * 100}%`}}
      ></div>
    </div>
    <div className="text-xs text-gray-500">
      Goal: {goal}
    </div>
  </div>
);

const ImpactTrackingItem = ({ capacity, description, currentScore, baselineScore, trend, contributingMechanisms, keyIndicators }) => {
  const getTrendColor = () => {
    switch(trend) {
      case 'Improving': return 'text-green-600';
      case 'Stable': return 'text-amber-500';
      case 'Declining': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };
  
  const improvement = currentScore - baselineScore;
  const improvementPercentage = ((improvement / baselineScore) * 100).toFixed(1);
  
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium">{capacity}</h4>
          <p className="text-xs text-gray-600 mt-0.5">{description}</p>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium ${getTrendColor()}`}>
          {trend}
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span>Current Score</span>
          <span>{improvement > 0 ? '+' : ''}{improvement} points ({improvement > 0 ? '+' : ''}{improvementPercentage}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 flex">
          <div className="bg-gray-400 h-2 rounded-l-full" style={{width: `${baselineScore}%`}}></div>
          <div className="bg-blue-500 h-2 rounded-r-full" style={{width: `${improvement}%`}}></div>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span>Baseline: {baselineScore}</span>
          <span>Current: {currentScore}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        <div>
          <p className="text-gray-500 mb-1">Contributing Mechanisms:</p>
          <div className="flex flex-wrap gap-1">
            {contributingMechanisms.map((mechanism, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                {mechanism}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-gray-500 mb-1">Key Indicators:</p>
          <div className="space-y-1">
            {keyIndicators.map((indicator, index) => (
              <div key={index} className="flex justify-between">
                <span>{indicator.name}:</span>
                <span className="font-medium">{indicator.value} <span className={indicator.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>({indicator.change})</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="text-xs text-blue-600">View Detailed Analysis</button>
      </div>
    </div>
  );
};

const MechanismVerificationItem = ({ name, evidenceStrength, contribution }) => {
  const getEvidenceColor = () => {
    switch(evidenceStrength) {
      case 'Strong': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-blue-100 text-blue-800';
      case 'Limited': return 'bg-amber-100 text-amber-800';
      case 'Insufficient Data': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <div className="flex justify-between items-start mb-1">
        <h4 className="text-sm font-medium">{name}</h4>
        <span className={`text-xs px-1.5 py-0.5 rounded ${getEvidenceColor()}`}>
          {evidenceStrength}
        </span>
      </div>
      
      <p className="text-xs text-gray-600 mb-2">{contribution}</p>
      
      <button className="text-xs text-blue-600">View Evidence</button>
    </div>
  );
};

const ContextualLearningItem = ({ factor, insight, source }) => (
  <div className="border border-gray-200 rounded-lg p-3">
    <h4 className="text-sm font-medium mb-1">{factor}</h4>
    <p className="text-xs text-gray-600 mb-1">{insight}</p>
    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-500">Source: {source}</span>
      <button className="text-xs text-blue-600">Details</button>
    </div>
  </div>
);

const EvaluationReportItem = ({ title, type, project, date, author, insights }) => (
  <div className="px-5 py-4">
    <div className="flex justify-between items-start mb-2">
      <div>
        <h4 className="font-medium">{title}</h4>
        <div className="flex text-xs text-gray-500 mt-1">
          <span>{type}</span>
          <span className="mx-2">•</span>
          <span>{project}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>By {author}</span>
        </div>
      </div>
      <button className="text-sm text-blue-600">View Report</button>
    </div>
    
    <div className="mt-3">
      <p className="text-xs font-medium text-gray-600 mb-1">Key Insights:</p>
      <ul className="text-xs text-gray-600 space-y-1 pl-4 list-disc">
        {insights.map((insight, index) => (
          <li key={index}>{insight}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default CIRFPlatform;
