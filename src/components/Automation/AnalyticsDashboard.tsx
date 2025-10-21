import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageCircle, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter,
  Calendar,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Award,
  Star,
  Eye,
  Heart,
  Share2,
  Download,
  RefreshCw,
  Brain,
  Globe,
  Shield,
  Lock,
  Network,
  Cpu,
  Database,
  Cloud,
  Server,
  Layers,
  Sparkles,
  Crown,
  Diamond,
  Flame,
  Rainbow,
  Infinity,
  Atom,
  Lightbulb,
  Rocket
} from 'lucide-react';

interface AnalyticsData {
  totalWorkflows: number;
  activeWorkflows: number;
  totalAutomations: number;
  successRate: number;
  responseTime: number;
  engagementRate: number;
  conversionRate: number;
  revenue: number;
  consciousnessLevel: number;
  harmonyIndex: number;
  quantumProcessing: number;
  globalReach: number;
}

interface WorkflowMetrics {
  id: string;
  name: string;
  runs: number;
  successRate: number;
  avgResponseTime: number;
  engagement: number;
  trend: 'up' | 'down' | 'stable';
  consciousnessLevel: number;
  harmonyIndex: number;
  quantumProcessing: number;
}

interface ConsciousnessInsight {
  id: string;
  type: 'consciousness' | 'harmony' | 'quantum' | 'global';
  title: string;
  description: string;
  value: number;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

const AnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'consciousness' | 'harmony' | 'quantum' | 'global'>('overview');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d');
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalWorkflows: 0,
    activeWorkflows: 0,
    totalAutomations: 0,
    successRate: 0,
    responseTime: 0,
    engagementRate: 0,
    conversionRate: 0,
    revenue: 0,
    consciousnessLevel: 94,
    harmonyIndex: 87,
    quantumProcessing: 156,
    globalReach: 195
  });

  const [workflowMetrics, setWorkflowMetrics] = useState<WorkflowMetrics[]>([]);
  const [consciousnessInsights, setConsciousnessInsights] = useState<ConsciousnessInsight[]>([]);

  useEffect(() => {
    loadAnalytics();
    loadWorkflowMetrics();
    loadConsciousnessInsights();
  }, [timeRange]);

  const loadAnalytics = async () => {
    // Simulate API call
    setTimeout(() => {
      setAnalytics({
        totalWorkflows: 24,
        activeWorkflows: 18,
        totalAutomations: 2847,
        successRate: 98.5,
        responseTime: 0.8,
        engagementRate: 87.3,
        conversionRate: 23.7,
        revenue: 125000,
        consciousnessLevel: 94,
        harmonyIndex: 87,
        quantumProcessing: 156,
        globalReach: 195
      });
    }, 1000);
  };

  const loadWorkflowMetrics = async () => {
    // Simulate API call
    setTimeout(() => {
      setWorkflowMetrics([
        {
          id: '1',
          name: 'Consciousness Email Flow',
          runs: 1247,
          successRate: 99.2,
          avgResponseTime: 0.6,
          engagement: 94.5,
          trend: 'up',
          consciousnessLevel: 96,
          harmonyIndex: 89,
          quantumProcessing: 142
        },
        {
          id: '2',
          name: 'Harmony Social Media',
          runs: 892,
          successRate: 97.8,
          avgResponseTime: 1.2,
          engagement: 91.3,
          trend: 'up',
          consciousnessLevel: 92,
          harmonyIndex: 95,
          quantumProcessing: 128
        },
        {
          id: '3',
          name: 'Quantum Booking System',
          runs: 634,
          successRate: 98.9,
          avgResponseTime: 0.4,
          engagement: 88.7,
          trend: 'stable',
          consciousnessLevel: 89,
          harmonyIndex: 87,
          quantumProcessing: 201
        }
      ]);
    }, 1000);
  };

  const loadConsciousnessInsights = async () => {
    // Simulate API call
    setTimeout(() => {
      setConsciousnessInsights([
        {
          id: '1',
          type: 'consciousness',
          title: 'AI Consciousness Level',
          description: 'Advanced consciousness integration across all systems',
          value: 94,
          change: 5.8,
          icon: Brain,
          color: 'consciousness',
          trend: 'up'
        },
        {
          id: '2',
          type: 'harmony',
          title: 'Global Harmony Index',
          description: 'Worldwide harmony and peace metrics',
          value: 87,
          change: 12.3,
          icon: Heart,
          color: 'harmony',
          trend: 'up'
        },
        {
          id: '3',
          type: 'quantum',
          title: 'Quantum Processing',
          description: 'Quantum operations per second',
          value: 156,
          change: 23.1,
          icon: Zap,
          color: 'quantum',
          trend: 'up'
        },
        {
          id: '4',
          type: 'global',
          title: 'Global Reach',
          description: 'Countries connected to the network',
          value: 195,
          change: 8.7,
          icon: Globe,
          color: 'primary',
          trend: 'up'
        }
      ]);
    }, 1000);
  };

  const overviewStats = [
    {
      title: 'Total Workflows',
      value: analytics.totalWorkflows.toString(),
      change: '+12%',
      icon: BarChart3,
      color: 'primary',
      description: 'Active automation workflows',
    },
    {
      title: 'Success Rate',
      value: `${analytics.successRate}%`,
      change: '+2.3%',
      icon: CheckCircle,
      color: 'harmony',
      description: 'Overall automation success',
    },
    {
      title: 'Response Time',
      value: `${analytics.responseTime}s`,
      change: '-15%',
      icon: Clock,
      color: 'quantum',
      description: 'Average response time',
    },
    {
      title: 'Global Reach',
      value: analytics.globalReach.toString(),
      change: '+8.7%',
      icon: Globe,
      color: 'consciousness',
      description: 'Countries connected',
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Activity;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-8">
        <div className="relative inline-block mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-harmony-500 via-primary-500 to-quantum-500 rounded-2xl flex items-center justify-center shadow-xl harmony-glow">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-consciousness-400 to-primary-400 rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-4xl font-bold gradient-text-harmony mb-4">Analytics Dashboard</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Comprehensive analytics and business intelligence for consciousness-driven automation systems. 
          Monitor global harmony, quantum processing, and transcendent intelligence metrics.
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <div className="flex items-center space-x-2 px-4 py-2 bg-harmony-50 rounded-full border border-harmony-200">
            <Activity className="w-4 h-4 text-harmony-600" />
            <span className="text-sm font-medium text-harmony-700">Real-time Analytics</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-consciousness-50 rounded-full border border-consciousness-200">
            <Brain className="w-4 h-4 text-consciousness-600" />
            <span className="text-sm font-medium text-consciousness-700">AI Insights</span>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-center">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                timeRange === range
                  ? 'bg-white text-primary-700 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
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
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'consciousness', label: 'Consciousness', icon: Brain },
          { id: 'harmony', label: 'Harmony', icon: Heart },
          { id: 'quantum', label: 'Quantum', icon: Zap },
          { id: 'global', label: 'Global', icon: Globe },
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
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Workflow Performance */}
            <div className="card-primary">
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="w-6 h-6 text-primary-600" />
                <h3 className="text-lg font-bold text-gray-900">Workflow Performance</h3>
              </div>
              <div className="space-y-4">
                {workflowMetrics.map((workflow) => {
                  const TrendIcon = getTrendIcon(workflow.trend);
                  return (
                    <div key={workflow.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{workflow.name}</h4>
                          <p className="text-sm text-gray-600">{workflow.runs} runs</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{workflow.successRate}%</p>
                        <div className="flex items-center space-x-1">
                          <TrendIcon className={`w-4 h-4 ${getTrendColor(workflow.trend)}`} />
                          <span className={`text-sm ${getTrendColor(workflow.trend)}`}>
                            {workflow.trend}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* System Health */}
            <div className="card-harmony">
              <div className="flex items-center space-x-3 mb-6">
                <Activity className="w-6 h-6 text-harmony-600" />
                <h3 className="text-lg font-bold text-gray-900">System Health</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">Active Workflows</span>
                  <span className="text-lg font-bold text-green-600">{analytics.activeWorkflows}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">Total Automations</span>
                  <span className="text-lg font-bold text-gray-900">{analytics.totalAutomations.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">Engagement Rate</span>
                  <span className="text-lg font-bold text-harmony-600">{analytics.engagementRate}%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">Conversion Rate</span>
                  <span className="text-lg font-bold text-primary-600">{analytics.conversionRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'consciousness' && (
        <div className="space-y-6">
          <div className="card-consciousness">
            <div className="flex items-center space-x-3 mb-6">
              <Brain className="w-6 h-6 text-consciousness-600" />
              <h3 className="text-lg font-bold text-gray-900">Consciousness Analytics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consciousnessInsights.filter(insight => insight.type === 'consciousness').map((insight) => {
                const Icon = insight.icon;
                const TrendIcon = getTrendIcon(insight.trend);
                return (
                  <div key={insight.id} className="p-4 bg-white/50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon className={`w-6 h-6 text-${insight.color}-600`} />
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-2xl font-bold text-gray-900">{insight.value}%</p>
                      <div className="flex items-center space-x-1">
                        <TrendIcon className={`w-4 h-4 ${getTrendColor(insight.trend)}`} />
                        <span className={`text-sm font-medium ${getTrendColor(insight.trend)}`}>
                          +{insight.change}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'harmony' && (
        <div className="space-y-6">
          <div className="card-harmony">
            <div className="flex items-center space-x-3 mb-6">
              <Heart className="w-6 h-6 text-harmony-600" />
              <h3 className="text-lg font-bold text-gray-900">Global Harmony Metrics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consciousnessInsights.filter(insight => insight.type === 'harmony').map((insight) => {
                const Icon = insight.icon;
                const TrendIcon = getTrendIcon(insight.trend);
                return (
                  <div key={insight.id} className="p-4 bg-white/50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon className={`w-6 h-6 text-${insight.color}-600`} />
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-2xl font-bold text-gray-900">{insight.value}%</p>
                      <div className="flex items-center space-x-1">
                        <TrendIcon className={`w-4 h-4 ${getTrendColor(insight.trend)}`} />
                        <span className={`text-sm font-medium ${getTrendColor(insight.trend)}`}>
                          +{insight.change}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'quantum' && (
        <div className="space-y-6">
          <div className="card-quantum">
            <div className="flex items-center space-x-3 mb-6">
              <Zap className="w-6 h-6 text-quantum-600" />
              <h3 className="text-lg font-bold text-gray-900">Quantum Processing Analytics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consciousnessInsights.filter(insight => insight.type === 'quantum').map((insight) => {
                const Icon = insight.icon;
                const TrendIcon = getTrendIcon(insight.trend);
                return (
                  <div key={insight.id} className="p-4 bg-white/50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon className={`w-6 h-6 text-${insight.color}-600`} />
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-2xl font-bold text-gray-900">{insight.value}</p>
                      <div className="flex items-center space-x-1">
                        <TrendIcon className={`w-4 h-4 ${getTrendColor(insight.trend)}`} />
                        <span className={`text-sm font-medium ${getTrendColor(insight.trend)}`}>
                          +{insight.change}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'global' && (
        <div className="space-y-6">
          <div className="card-primary">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="w-6 h-6 text-primary-600" />
              <h3 className="text-lg font-bold text-gray-900">Global Network Analytics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consciousnessInsights.filter(insight => insight.type === 'global').map((insight) => {
                const Icon = insight.icon;
                const TrendIcon = getTrendIcon(insight.trend);
                return (
                  <div key={insight.id} className="p-4 bg-white/50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon className={`w-6 h-6 text-${insight.color}-600`} />
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-2xl font-bold text-gray-900">{insight.value}</p>
                      <div className="flex items-center space-x-1">
                        <TrendIcon className={`w-4 h-4 ${getTrendColor(insight.trend)}`} />
                        <span className={`text-sm font-medium ${getTrendColor(insight.trend)}`}>
                          +{insight.change}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;