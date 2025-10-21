// 🤖 Email Workflow Dashboard - Professional Email Management System
import React, { useState, useEffect } from 'react';
import {
  Mail,
  Clock,
  Users,
  TrendingUp,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  Calendar,
  AlertCircle,
  CheckCircle,
  Zap,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { emailWorkflowOrchestrator } from '../../services/emailWorkflowOrchestrator';

interface WorkflowStats {
  totalWorkflows: number;
  pendingInquiries: number;
  respondedInquiries: number;
  workflowsByType: Record<string, number>;
}

const EmailWorkflowDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [workflowStats, setWorkflowStats] = useState<WorkflowStats | null>(null);
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [pendingInquiries, setPendingInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWorkflowData();
  }, []);

  const loadWorkflowData = async () => {
    setIsLoading(true);
    try {
      // Load workflow statistics
      const stats = emailWorkflowOrchestrator.getWorkflowStats();
      setWorkflowStats(stats);

      // Load workflows
      const allWorkflows = emailWorkflowOrchestrator.getAllWorkflows();
      setWorkflows(allWorkflows);

      // Load pending inquiries
      const inquiries = emailWorkflowOrchestrator.getPendingInquiries();
      setPendingInquiries(inquiries);
    } catch (error) {
      console.error('Error loading workflow data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInquiryTypeIcon = (type: string) => {
    const icons: Record<string, any> = {
      'photography': '📸',
      'automation': '🤖',
      'ai-system': '🧠',
      'consulting': '💼',
      'partnership': '🤝',
      'event': '🎉',
      'other': '📧'
    };
    return icons[type] || '📧';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'low': 'bg-gray-100 text-gray-800',
      'medium': 'bg-blue-100 text-blue-800',
      'high': 'bg-orange-100 text-orange-800',
      'urgent': 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'new': 'bg-yellow-100 text-yellow-800',
      'responded': 'bg-green-100 text-green-800',
      'follow-up': 'bg-blue-100 text-blue-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                🤖 Email Workflow Orchestrator
              </h1>
              <p className="text-xl text-gray-600">
                Professional Email Management & Automation System
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadWorkflowData}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {workflowStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Workflows</p>
                  <p className="text-3xl font-bold text-gray-900">{workflowStats.totalWorkflows}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Inquiries</p>
                  <p className="text-3xl font-bold text-orange-600">{workflowStats.pendingInquiries}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Responded</p>
                  <p className="text-3xl font-bold text-green-600">{workflowStats.respondedInquiries}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Response Rate</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {workflowStats.pendingInquiries > 0 
                      ? Math.round((workflowStats.respondedInquiries / workflowStats.pendingInquiries) * 100)
                      : 100}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'workflows', name: 'Workflows', icon: Settings },
                { id: 'inquiries', name: 'Inquiries', icon: Mail },
                { id: 'analytics', name: 'Analytics', icon: Activity }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Workflow Overview</h3>
                
                {/* Workflow Types Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Inquiry Types Distribution</h4>
                    <div className="space-y-3">
                      {workflowStats && Object.entries(workflowStats.workflowsByType).map(([type, count]) => (
                        <div key={type} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{getInquiryTypeIcon(type)}</span>
                            <span className="font-medium text-gray-700 capitalize">{type.replace('-', ' ')}</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-600">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h4>
                    <div className="space-y-3">
                      {pendingInquiries.slice(0, 5).map((inquiry) => (
                        <div key={inquiry.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{getInquiryTypeIcon(inquiry.inquiryType)}</span>
                            <div>
                              <p className="font-medium text-gray-900">{inquiry.firstName} {inquiry.lastName}</p>
                              <p className="text-sm text-gray-500">{inquiry.subject}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                            {inquiry.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Workflows Tab */}
            {activeTab === 'workflows' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Email Workflows</h3>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Add Workflow</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {workflows.map((workflow) => (
                    <div key={workflow.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{getInquiryTypeIcon(workflow.inquiryType)}</span>
                          <h4 className="font-semibold text-gray-900">{workflow.name}</h4>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(workflow.priority)}`}>
                          {workflow.priority}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Team Member:</span>
                          <span className="font-medium">{workflow.teamMember}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Department:</span>
                          <span className="font-medium">{workflow.department}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Follow-ups:</span>
                          <span className="font-medium">{workflow.followUpSchedule.length}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Auto Response:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            workflow.autoResponse ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {workflow.autoResponse ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-4">
                        <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                          <Eye className="w-3 h-3" />
                          <span className="text-xs">View</span>
                        </button>
                        <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                          <Edit className="w-3 h-3" />
                          <span className="text-xs">Edit</span>
                        </button>
                        <button className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                          <Trash2 className="w-3 h-3" />
                          <span className="text-xs">Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inquiries Tab */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Customer Inquiries</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search inquiries..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">All Status</option>
                      <option value="new">New</option>
                      <option value="responded">Responded</option>
                      <option value="follow-up">Follow-up</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subject
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Priority
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Submitted
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {pendingInquiries.map((inquiry) => (
                          <tr key={inquiry.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span className="text-sm font-medium text-blue-600">
                                      {inquiry.firstName[0]}{inquiry.lastName[0]}
                                    </span>
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {inquiry.firstName} {inquiry.lastName}
                                  </div>
                                  <div className="text-sm text-gray-500">{inquiry.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{getInquiryTypeIcon(inquiry.inquiryType)}</span>
                                <span className="text-sm text-gray-900 capitalize">
                                  {inquiry.inquiryType.replace('-', ' ')}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 max-w-xs truncate">
                                {inquiry.subject}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                                {inquiry.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(inquiry.urgency)}`}>
                                {inquiry.urgency}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(inquiry.submittedAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="text-green-600 hover:text-green-900">
                                  <Mail className="w-4 h-4" />
                                </button>
                                <button className="text-gray-600 hover:text-gray-900">
                                  <Edit className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Workflow Analytics</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Response Times</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Average Response Time</span>
                        <span className="font-semibold text-gray-900">2.4 hours</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Fastest Response</span>
                        <span className="font-semibold text-green-600">15 minutes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Slowest Response</span>
                        <span className="font-semibold text-red-600">8 hours</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Conversion Rates</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Initial Response</span>
                        <span className="font-semibold text-blue-600">98%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Follow-up Engagement</span>
                        <span className="font-semibold text-green-600">76%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Project Conversion</span>
                        <span className="font-semibold text-purple-600">34%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailWorkflowDashboard;
