import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Settings, 
  Play, 
  Pause, 
  Save, 
  Download,
  Upload,
  Copy,
  Edit,
  CheckCircle,
  AlertCircle,
  Clock,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Calendar,
  Zap,
  Brain,
  Filter,
  Send,
  User,
  Tag,
  Timer,
  Repeat,
  GitBranch,
  Merge,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'delay';
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  config: Record<string, any>;
  position: { x: number; y: number };
  connections: string[];
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  nodes: WorkflowNode[];
  status: 'draft' | 'active' | 'paused' | 'error';
  lastRun?: Date;
  nextRun?: Date;
  successRate: number;
  totalRuns: number;
}

const WorkflowBuilder: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [draggedNode, setDraggedNode] = useState<WorkflowNode | null>(null);
  const [showNodeLibrary, setShowNodeLibrary] = useState(false);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Node templates
  const nodeTemplates = [
    {
      type: 'trigger',
      name: 'Email Received',
      description: 'Trigger when new email arrives',
      icon: Mail,
      config: { email: '', keywords: [], delay: 0 }
    },
    {
      type: 'trigger',
      name: 'Instagram Comment',
      description: 'Trigger when someone comments',
      icon: Instagram,
      config: { account: '', keywords: [], sentiment: 'all' }
    },
    {
      type: 'trigger',
      name: 'Booking Created',
      description: 'Trigger when booking is made',
      icon: Calendar,
      config: { source: 'all', status: 'confirmed' }
    },
    {
      type: 'action',
      name: 'Send Email',
      description: 'Send automated email response',
      icon: Send,
      config: { template: '', delay: 0, cc: '' }
    },
    {
      type: 'action',
      name: 'Post Reply',
      description: 'Post reply to social media',
      icon: MessageCircle,
      config: { platform: 'instagram', template: '', delay: 0 }
    },
    {
      type: 'action',
      name: 'Generate AI Response',
      description: 'Generate response using AI',
      icon: Brain,
      config: { model: 'gpt-4', tone: 'professional', language: 'en' }
    },
    {
      type: 'condition',
      name: 'Check Sentiment',
      description: 'Check message sentiment',
      icon: Filter,
      config: { sentiment: 'positive', threshold: 0.7 }
    },
    {
      type: 'condition',
      name: 'Check Keywords',
      description: 'Check for specific keywords',
      icon: Tag,
      config: { keywords: [], match: 'any' }
    },
    {
      type: 'delay',
      name: 'Wait',
      description: 'Wait for specified time',
      icon: Timer,
      config: { duration: 300, unit: 'seconds' }
    }
  ];

  const createNewWorkflow = () => {
    const newWorkflow: Workflow = {
      id: Date.now().toString(),
      name: 'New Workflow',
      description: 'Automated workflow',
      nodes: [],
      status: 'draft',
      successRate: 0,
      totalRuns: 0
    };
    setWorkflows(prev => [...prev, newWorkflow]);
    setSelectedWorkflow(newWorkflow);
  };

  const addNodeToWorkflow = (template: any) => {
    if (!selectedWorkflow) return;

    const newNode: WorkflowNode = {
      id: Date.now().toString(),
      type: template.type,
      name: template.name,
      description: template.description,
      icon: template.icon,
      config: { ...template.config },
      position: { x: 100 + (selectedWorkflow.nodes.length * 200), y: 100 },
      connections: []
    };

    setSelectedWorkflow(prev => prev ? {
      ...prev,
      nodes: [...prev.nodes, newNode]
    } : null);
  };

  const updateNodeConfig = (nodeId: string, config: Record<string, any>) => {
    if (!selectedWorkflow) return;

    setSelectedWorkflow(prev => prev ? {
      ...prev,
      nodes: prev.nodes.map(node => 
        node.id === nodeId ? { ...node, config: { ...node.config, ...config } } : node
      )
    } : null);
  };

  const deleteNode = (nodeId: string) => {
    if (!selectedWorkflow) return;

    setSelectedWorkflow(prev => prev ? {
      ...prev,
      nodes: prev.nodes.filter(node => node.id !== nodeId)
    } : null);
  };

  const connectNodes = (fromId: string, toId: string) => {
    if (!selectedWorkflow) return;

    setSelectedWorkflow(prev => prev ? {
      ...prev,
      nodes: prev.nodes.map(node => 
        node.id === fromId 
          ? { ...node, connections: [...node.connections, toId] }
          : node
      )
    } : null);
  };

  const saveWorkflow = () => {
    if (!selectedWorkflow) return;

    setWorkflows(prev => prev.map(workflow => 
      workflow.id === selectedWorkflow.id ? selectedWorkflow : workflow
    ));
  };

  const runWorkflow = () => {
    if (!selectedWorkflow) return;

    // Simulate workflow execution
    setSelectedWorkflow(prev => prev ? {
      ...prev,
      status: 'active',
      lastRun: new Date(),
      totalRuns: prev.totalRuns + 1,
      successRate: Math.min(100, prev.successRate + Math.random() * 10)
    } : null);
  };

  const renderNode = (node: WorkflowNode) => {
    const Icon = node.icon;
    return (
      <div
        key={node.id}
        className={`absolute w-48 p-4 bg-white rounded-lg shadow-lg border-2 cursor-move ${
          node.type === 'trigger' ? 'border-blue-500' :
          node.type === 'action' ? 'border-green-500' :
          node.type === 'condition' ? 'border-yellow-500' :
          'border-purple-500'
        }`}
        style={{ left: node.position.x, top: node.position.y }}
        onClick={() => setSelectedNode(node)}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon className={`w-5 h-5 ${
              node.type === 'trigger' ? 'text-blue-600' :
              node.type === 'action' ? 'text-green-600' :
              node.type === 'condition' ? 'text-yellow-600' :
              'text-purple-600'
            }`} />
            <span className="font-medium text-gray-900">{node.name}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteNode(node.id);
            }}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-gray-600">{node.description}</p>
        <div className="mt-2 flex space-x-1">
          {node.connections.map(connectionId => (
            <div key={connectionId} className="w-2 h-2 bg-green-500 rounded-full"></div>
          ))}
        </div>
      </div>
    );
  };

  const renderNodeLibrary = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Node Library</h3>
      <div className="space-y-2">
        {nodeTemplates.map((template, index) => {
          const Icon = template.icon;
          return (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
              onClick={() => addNodeToWorkflow(template)}
            >
              <Icon className={`w-5 h-5 ${
                template.type === 'trigger' ? 'text-blue-600' :
                template.type === 'action' ? 'text-green-600' :
                template.type === 'condition' ? 'text-yellow-600' :
                'text-purple-600'
              }`} />
              <div>
                <p className="font-medium text-gray-900">{template.name}</p>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderNodeConfig = () => {
    if (!selectedNode) return null;

    const Icon = selectedNode.icon;
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">{selectedNode.name}</h3>
          </div>
          <button
            onClick={() => setSelectedNode(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={selectedNode.name}
              onChange={(e) => {
                setSelectedNode(prev => prev ? { ...prev, name: e.target.value } : null);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={selectedNode.description}
              onChange={(e) => {
                setSelectedNode(prev => prev ? { ...prev, description: e.target.value } : null);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={3}
            />
          </div>

          {/* Dynamic config fields based on node type */}
          {selectedNode.type === 'trigger' && selectedNode.name === 'Email Received' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={selectedNode.config.email || ''}
                  onChange={(e) => updateNodeConfig(selectedNode.id, { email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                <input
                  type="text"
                  value={selectedNode.config.keywords?.join(', ') || ''}
                  onChange={(e) => updateNodeConfig(selectedNode.id, { keywords: e.target.value.split(', ') })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="photography, booking, quote"
                />
              </div>
            </>
          )}

          {selectedNode.type === 'action' && selectedNode.name === 'Generate AI Response' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">AI Model</label>
                <select
                  value={selectedNode.config.model || 'gpt-4'}
                  onChange={(e) => updateNodeConfig(selectedNode.id, { model: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="claude-3">Claude 3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                <select
                  value={selectedNode.config.tone || 'professional'}
                  onChange={(e) => updateNodeConfig(selectedNode.id, { tone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                </select>
              </div>
            </>
          )}

          {selectedNode.type === 'delay' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={selectedNode.config.duration || 300}
                  onChange={(e) => updateNodeConfig(selectedNode.id, { duration: parseInt(e.target.value) })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <select
                  value={selectedNode.config.unit || 'seconds'}
                  onChange={(e) => updateNodeConfig(selectedNode.id, { unit: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="seconds">Seconds</option>
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Workflow Builder</h1>
            <p className="text-gray-600">Create and manage automated workflows</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={createNewWorkflow}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Workflow</span>
            </button>
            <button
              onClick={() => setShowNodeLibrary(!showNodeLibrary)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Library</span>
            </button>
            {selectedWorkflow && (
              <>
                <button
                  onClick={saveWorkflow}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={runWorkflow}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Run</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 p-4 space-y-4">
          {/* Workflow List */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Workflows</h3>
            <div className="space-y-2">
              {workflows.map((workflow) => (
                <div
                  key={workflow.id}
                  onClick={() => setSelectedWorkflow(workflow)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedWorkflow?.id === workflow.id
                      ? 'bg-primary-100 border border-primary-300'
                      : 'bg-white border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{workflow.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      workflow.status === 'active' ? 'bg-green-100 text-green-800' :
                      workflow.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      workflow.status === 'error' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {workflow.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{workflow.description}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>{workflow.nodes.length} nodes</span>
                    <span>{workflow.successRate}% success</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Node Library */}
          {showNodeLibrary && renderNodeLibrary()}

          {/* Node Configuration */}
          {selectedNode && renderNodeConfig()}
        </div>

        {/* Canvas */}
        <div className="flex-1 relative bg-gray-100 overflow-hidden">
          <div
            ref={canvasRef}
            className="w-full h-full relative"
            style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          >
            {selectedWorkflow?.nodes.map(renderNode)}
            
            {/* Connection lines */}
            {selectedWorkflow?.nodes.map(node => 
              node.connections.map(connectionId => {
                const targetNode = selectedWorkflow.nodes.find(n => n.id === connectionId);
                if (!targetNode) return null;
                
                return (
                  <svg
                    key={`${node.id}-${connectionId}`}
                    className="absolute inset-0 pointer-events-none"
                    style={{ zIndex: 1 }}
                  >
                    <line
                      x1={node.position.x + 96}
                      y1={node.position.y + 50}
                      x2={targetNode.position.x + 96}
                      y2={targetNode.position.y + 50}
                      stroke="#10b981"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                  </svg>
                );
              })
            )}
          </div>

          {/* Canvas Controls */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button className="p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50">
              <ZoomIn className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50">
              <ZoomOut className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50">
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
