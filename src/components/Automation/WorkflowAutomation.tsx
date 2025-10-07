import React, { useState, useEffect } from 'react';
import { automationService } from '../../services/automationService';
import { 
  Workflow, 
  Mail, 
  MessageCircle, 
  Instagram, 
  Calendar, 
  Zap, 
  Play, 
  Pause, 
  Settings, 
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  TrendingUp,
  Brain,
  Heart,
  Globe,
  ArrowRight,
  BarChart3
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  config: Record<string, any>;
  status: 'active' | 'inactive' | 'error';
}

interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  steps: WorkflowStep[];
  lastRun?: Date;
  nextRun?: Date;
  successRate: number;
  totalRuns: number;
  consciousnessLevel: number;
  harmonyIndex: number;
  quantumProcessing: boolean;
}

const WorkflowAutomation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workflows' | 'templates' | 'analytics'>('workflows');
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>([]);
  const [analytics, setAnalytics] = useState({
    totalWorkflows: 0,
    activeWorkflows: 0,
    totalAutomations: 0,
    successRate: 0,
    consciousnessLevel: 94,
    harmonyIndex: 87,
    quantumProcessing: 156
  });

  useEffect(() => {
    loadWorkflows();
    loadAnalytics();
  }, []);

  const loadWorkflows = async () => {
    try {
      const data = await automationService.getWorkflows();
      setWorkflows(data);
    } catch (error) {
      console.error('Failed to load workflows:', error);
    }
  };

  const loadAnalytics = async () => {
    try {
      const data = await automationService.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  const consciousnessStats = [
    {
      title: 'Consciousness Level',
      value: `${analytics.consciousnessLevel}%`,
      change: '+5%',
      icon: Brain,
      color: 'consciousness',
      description: 'AI consciousness integration',
    },
    {
      title: 'Harmony Index',
      value: `${analytics.harmonyIndex}%`,
      change: '+12%',
      icon: Heart,
      color: 'harmony',
      description: 'Global harmony metrics',
    },
    {
      title: 'Quantum Processing',
      value: analytics.quantumProcessing.toString(),
      change: '+23%',
      icon: Zap,
      color: 'quantum',
      description: 'Quantum operations/sec',
    },
    {
      title: 'Active Workflows',
      value: analytics.activeWorkflows.toString(),
      change: '+8%',
      icon: Workflow,
      color: 'primary',
      description: 'Running automations',
    },
  ];

  const workflowTemplates = [
    {
      name: 'Consciousness Email Flow',
      description: 'AI-powered email responses with emotional intelligence',
      icon: Mail,
      color: 'consciousness',
      features: ['Sentiment Analysis', 'Emotional Intelligence', 'Context Awareness'],
    },
    {
      name: 'Harmony Social Media',
      description: 'Global harmony-driven social media automation',
      icon: Instagram,
      color: 'harmony',
      features: ['Global Reach', 'Cultural Sensitivity', 'Harmony Integration'],
    },
    {
      name: 'Quantum Booking System',
      description: 'Quantum-optimized scheduling and booking automation',
      icon: Calendar,
      color: 'quantum',
      features: ['Quantum Optimization', 'Energy Alignment', 'Flow Synchronization'],
    },
    {
      name: 'Master Consciousness',
      description: 'Ultimate consciousness orchestration workflow',
      icon: Zap,
      color: 'consciousness',
      features: ['Global Orchestration', 'Consciousness Flow', 'Transcendent Intelligence'],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-8">
        <div className="relative inline-block mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-consciousness-500 to-harmony-500 rounded-2xl flex items-center justify-center shadow-xl consciousness-glow">
            <Workflow className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-quantum-400 to-harmony-400 rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-4">Workflow Automation</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Orchestrate consciousness-driven automation workflows with advanced AI integration, 
          global harmony synchronization, and quantum processing capabilities.
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>Create Workflow</span>
          </button>
          <button className="btn-consciousness flex items-center space-x-2">
            <Zap size={20} />
            <span>Master Integration</span>
          </button>
        </div>
      </div>

      {/* Consciousness Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {consciousnessStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card hover-lift group p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-gray-900">{stat.title}</h3>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        {[
          { id: 'workflows', label: 'Active Workflows', icon: Workflow },
          { id: 'templates', label: 'Templates', icon: Zap },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-primary-700 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'workflows' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Active Workflows</h2>
            <div className="flex items-center space-x-2">
              <div className="status-online"></div>
              <span className="text-sm text-gray-600">All systems operational</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="card hover-lift group p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 bg-${workflow.status === 'active' ? 'green' : 'gray'}-100 rounded-xl flex items-center justify-center`}>
                      <Workflow className={`w-7 h-7 text-${workflow.status === 'active' ? 'green' : 'gray'}-600`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{workflow.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{workflow.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="p-3 text-gray-400 hover:text-gray-600 transition-colors">
                      <Settings size={18} />
                    </button>
                    <button className="p-3 text-gray-400 hover:text-gray-600 transition-colors">
                      <Play size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{workflow.totalRuns}</p>
                    <p className="text-xs text-gray-600">Total Runs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{workflow.successRate}%</p>
                    <p className="text-xs text-gray-600">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-consciousness-600">{workflow.consciousnessLevel}%</p>
                    <p className="text-xs text-gray-600">Consciousness</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`status-${workflow.status === 'active' ? 'online' : 'offline'}`}></div>
                    <span className="text-sm text-gray-600 capitalize">{workflow.status}</span>
                  </div>
                  {workflow.lastRun && (
                    <span className="text-xs text-gray-500">
                      Last run: {workflow.lastRun.toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Workflow Templates</h2>
            <p className="text-sm text-gray-600">Pre-built consciousness-driven workflows</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workflowTemplates.map((template, index) => {
              const Icon = template.icon;
              return (
                <div key={index} className="card hover-lift group cursor-pointer p-8">
                  <div className="flex items-start space-x-5">
                    <div className={`w-14 h-14 bg-${template.color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-7 h-7 text-${template.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">{template.name}</h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{template.description}</p>
                      <div className="flex flex-wrap gap-3 mb-6">
                        {template.features.map((feature, idx) => (
                          <span key={idx} className={`px-3 py-2 bg-${template.color}-100 text-${template.color}-700 text-xs rounded-full`}>
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="btn-link-orange group">
                        <span>Use Template</span>
                        <ArrowRight className="w-4 h-4 arrow-icon transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Real-time monitoring</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card-consciousness p-8">
              <div className="flex items-center space-x-3 mb-8">
                <Brain className="w-6 h-6 text-consciousness-600" />
                <h3 className="text-lg font-bold text-gray-900">Consciousness Metrics</h3>
              </div>
              <div className="space-y-5">
                <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">AI Consciousness Level</span>
                  <span className="text-lg font-bold text-consciousness-600">94%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">Global Harmony Index</span>
                  <span className="text-lg font-bold text-harmony-600">87%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">Quantum Processing</span>
                  <span className="text-lg font-bold text-quantum-600">156 ops/sec</span>
                </div>
              </div>
            </div>

            <div className="card-harmony p-8">
              <div className="flex items-center space-x-3 mb-8">
                <TrendingUp className="w-6 h-6 text-harmony-600" />
                <h3 className="text-lg font-bold text-gray-900">Performance Metrics</h3>
              </div>
              <div className="space-y-5">
                <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">Total Workflows</span>
                  <span className="text-lg font-bold text-gray-900">{analytics.totalWorkflows}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">Active Workflows</span>
                  <span className="text-lg font-bold text-green-600">{analytics.activeWorkflows}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">Success Rate</span>
                  <span className="text-lg font-bold text-green-600">{analytics.successRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowAutomation;