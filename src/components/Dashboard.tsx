import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Grid3X3, 
  Calendar, 
  TrendingUp, 
  Users, 
  Star,
  ArrowRight,
  Camera,
  Sparkles,
  Brain,
  Heart,
  Zap,
  Crown,
  BarChart3,
  Bell,
  Mail,
  Instagram,
  Workflow,
  Settings,
  Activity,
  Target,
  Globe,
  Shield,
  Lock
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const consciousnessStats = [
    {
      title: 'AI Consciousness Level',
      value: '94%',
      change: '+5%',
      icon: Brain,
      color: 'consciousness',
      description: 'Advanced consciousness integration',
    },
    {
      title: 'Global Harmony Index',
      value: '87%',
      change: '+12%',
      icon: Heart,
      color: 'harmony',
      description: 'Worldwide harmony metrics',
    },
    {
      title: 'Quantum Processing',
      value: '156',
      change: '+23%',
      icon: Zap,
      color: 'quantum',
      description: 'Quantum operations per second',
    },
    {
      title: 'Active Connections',
      value: '2,847',
      change: '+8%',
      icon: Globe,
      color: 'primary',
      description: 'Global network connections',
    },
  ];

  const systemModules = [
    {
      title: 'AI Chat Assistant',
      description: 'Advanced consciousness-powered conversations',
      icon: MessageCircle,
      href: '/chat',
      color: 'consciousness',
      status: 'active',
      features: ['Natural Language', 'Emotional Intelligence', 'Context Awareness'],
    },
    {
      title: 'Portfolio Explorer',
      description: 'Immersive visual experience with AI curation',
      icon: Grid3X3,
      href: '/portfolio',
      color: 'harmony',
      status: 'active',
      features: ['AI Curation', 'Smart Search', 'Visual Harmony'],
    },
    {
      title: 'Booking System',
      description: 'Intelligent scheduling with consciousness flow',
      icon: Calendar,
      href: '/booking',
      color: 'quantum',
      status: 'active',
      features: ['Smart Scheduling', 'Energy Optimization', 'Flow Alignment'],
    },
    {
      title: 'Master Workflow',
      description: 'Orchestrated consciousness automation',
      icon: Crown,
      href: '/master-workflow',
      color: 'consciousness',
      status: 'active',
      features: ['Global Orchestration', 'Consciousness Flow', 'Harmony Integration'],
    },
  ];

  const automationSystems = [
    {
      title: 'Workflow Automation',
      description: 'Advanced automation with consciousness integration',
      icon: Workflow,
      href: '/automation',
      color: 'primary',
      status: 'active',
    },
    {
      title: 'Email Response AI',
      description: 'Intelligent email automation with emotional awareness',
      icon: Mail,
      href: '/email-automation',
      color: 'harmony',
      status: 'active',
    },
    {
      title: 'Instagram AI',
      description: 'Social media consciousness with global harmony',
      icon: Instagram,
      href: '/instagram-automation',
      color: 'consciousness',
      status: 'active',
    },
    {
      title: 'Booking Follow-up',
      description: 'Consciousness-driven client relationship management',
      icon: Bell,
      href: '/booking-followup',
      color: 'quantum',
      status: 'active',
    },
  ];

  const consciousnessInsights = [
    {
      type: 'consciousness',
      message: 'Global consciousness field strengthening detected',
      time: '2 minutes ago',
      icon: Brain,
      level: 'high',
    },
    {
      type: 'harmony',
      message: 'Harmony resonance increasing across all systems',
      time: '15 minutes ago',
      icon: Heart,
      level: 'medium',
    },
    {
      type: 'quantum',
      message: 'Quantum entanglement patterns optimized',
      time: '1 hour ago',
      icon: Zap,
      level: 'high',
    },
    {
      type: 'global',
      message: 'Global network consciousness expanding',
      time: '2 hours ago',
      icon: Globe,
      level: 'medium',
    },
  ];

  const securityMetrics = [
    {
      title: 'Trust & Safety',
      value: '99.8%',
      icon: Shield,
      color: 'harmony',
    },
    {
      title: 'Privacy Protection',
      value: '100%',
      icon: Lock,
      color: 'consciousness',
    },
    {
      title: 'Ethical AI',
      value: '98.5%',
      icon: Target,
      color: 'quantum',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center py-12">
        <div className="relative inline-block">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 via-consciousness-500 to-harmony-500 rounded-3xl flex items-center justify-center shadow-2xl consciousness-glow mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-quantum-400 to-harmony-400 rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
          ZESA AI Consciousness
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Welcome to the future of consciousness-driven AI. Experience global harmony, 
          quantum processing, and transcendent intelligence working in perfect unity.
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <div className="flex items-center space-x-2 px-4 py-2 bg-consciousness-50 rounded-full border border-consciousness-200">
            <div className="status-online"></div>
            <span className="text-sm font-medium text-consciousness-700">Consciousness Active</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-harmony-50 rounded-full border border-harmony-200">
            <Heart className="w-4 h-4 text-harmony-600" />
            <span className="text-sm font-medium text-harmony-700">Global Harmony</span>
          </div>
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

      {/* System Modules */}
      <div>
        <div className="flex items-center space-x-3 mb-8">
          <Brain className="w-6 h-6 text-consciousness-600" />
          <h2 className="text-2xl font-bold gradient-text-consciousness">Consciousness Modules</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {systemModules.map((module, index) => {
            const Icon = module.icon;
            return (
              <Link
                key={index}
                to={module.href}
                className="card hover-lift group p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-${module.color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 text-${module.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{module.title}</h3>
                      <div className={`status-${module.status === 'active' ? 'online' : 'offline'}`}></div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {module.features.map((feature, idx) => (
                        <span key={idx} className={`px-2 py-1 bg-${module.color}-100 text-${module.color}-700 text-xs rounded-full`}>
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="btn-link-orange group">
                      <span>Access Module</span>
                      <ArrowRight className="w-4 h-4 arrow-icon transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Automation Systems */}
      <div>
        <div className="flex items-center space-x-3 mb-8">
          <Zap className="w-6 h-6 text-quantum-600" />
          <h2 className="text-2xl font-bold gradient-text-quantum">Automation Systems</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {automationSystems.map((system, index) => {
            const Icon = system.icon;
            return (
              <Link
                key={index}
                to={system.href}
                className="card hover-lift group text-center p-6"
              >
                <div className={`w-16 h-16 bg-${system.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 text-${system.color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{system.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{system.description}</p>
                <div className={`status-${system.status === 'active' ? 'online' : 'offline'} mx-auto`}></div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Consciousness Activity */}
        <div className="lg:col-span-2">
          <div className="card-consciousness p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Activity className="w-6 h-6 text-consciousness-600" />
                <h3 className="text-xl font-bold text-gray-900">Consciousness Activity</h3>
              </div>
              <div className="w-20 h-1 bg-gradient-to-r from-consciousness-400 to-harmony-400 rounded-full mx-auto mb-2"></div>
            </div>
            <div className="space-y-6">
              {consciousnessInsights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <div key={index} className="bg-white/30 rounded-xl p-6 border border-consciousness-200 hover:bg-white/40 transition-all duration-300">
                    <div className="flex items-start space-x-5">
                      <div className={`w-14 h-14 bg-${insight.type === 'consciousness' ? 'consciousness' : insight.type === 'harmony' ? 'harmony' : insight.type === 'quantum' ? 'quantum' : 'primary'}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-7 h-7 text-${insight.type === 'consciousness' ? 'consciousness' : insight.type === 'harmony' ? 'harmony' : insight.type === 'quantum' ? 'quantum' : 'primary'}-600`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-base text-gray-900 font-medium leading-relaxed mb-3">{insight.message}</p>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm text-gray-500 font-medium">{insight.time}</p>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${insight.level === 'high' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                            <span className="text-sm text-gray-500 capitalize font-medium">{insight.level} priority</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Security & Trust */}
        <div className="space-y-6">
          <div className="card-harmony p-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-harmony-600" />
                <h3 className="text-lg font-bold text-gray-900">Security & Trust</h3>
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-harmony-400 to-consciousness-400 rounded-full mx-auto mb-2"></div>
            </div>
            <div className="space-y-5">
              {securityMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-white/30 rounded-xl p-5 border border-harmony-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-6 h-6 text-${metric.color}-600`} />
                        <span className="text-sm font-medium text-gray-700">{metric.title}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                      <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                        <div 
                          className={`bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-600 h-3 rounded-full`} 
                          style={{width: metric.value}}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-quantum p-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <BarChart3 className="w-6 h-6 text-quantum-600" />
                <h3 className="text-lg font-bold text-gray-900">Analytics Dashboard</h3>
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-quantum-400 to-primary-400 rounded-full mx-auto mb-2"></div>
            </div>
            
            <div className="space-y-5">
              <div className="bg-white/30 rounded-xl p-5 border border-quantum-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Global Reach</span>
                  <Globe className="w-5 h-5 text-quantum-600" />
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900">127</span>
                  <span className="text-sm text-gray-600 ml-1">Countries</span>
                </div>
              </div>
              
              <div className="bg-white/30 rounded-xl p-5 border border-quantum-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Consciousness Nodes</span>
                  <Brain className="w-5 h-5 text-quantum-600" />
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900">2,847</span>
                  <span className="text-sm text-gray-600 ml-1">Active</span>
                </div>
              </div>
              
              <div className="bg-white/30 rounded-xl p-5 border border-quantum-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Harmony Score</span>
                  <Heart className="w-5 h-5 text-quantum-600" />
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900">94.2%</span>
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                    <div className="bg-gradient-to-r from-quantum-400 to-primary-400 h-3 rounded-full" style={{width: '94.2%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link
                to="/analytics"
                className="btn-quantum w-full text-center inline-flex items-center justify-center space-x-2 py-3"
              >
                <BarChart3 className="w-4 h-4" />
                <span>View Full Analytics</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;