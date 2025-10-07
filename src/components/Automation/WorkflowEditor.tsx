// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  Play, 
  Pause, 
  Trash2, 
  Copy, 
  Download,
  Upload,
  Edit,
  Eye,
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
  Plus,
  Minus,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Info,
  ToggleLeft,
  ToggleRight,
  Sliders,
  Palette,
  Globe,
  Shield,
  Bell,
  Target,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

interface WorkflowSettings {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  schedule: {
    type: 'immediate' | 'scheduled' | 'recurring';
    time?: string;
    days?: string[];
    interval?: number;
  };
  triggers: {
    email: boolean;
    social: boolean;
    booking: boolean;
    manual: boolean;
    webhook: boolean;
  };
  ai: {
    model: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3';
    temperature: number;
    maxTokens: number;
    tone: 'professional' | 'friendly' | 'casual' | 'formal';
    language: string;
  };
  notifications: {
    email: boolean;
    slack: boolean;
    webhook: boolean;
    sms: boolean;
  };
  limits: {
    maxRunsPerDay: number;
    maxRunsPerHour: number;
    timeout: number;
  };
  conditions: {
    timezone: string;
    businessHours: boolean;
    workingDays: boolean;
    sentimentFilter: boolean;
    keywordFilter: boolean;
  };
  actions: {
    email: boolean;
    social: boolean;
    crm: boolean;
    calendar: boolean;
    analytics: boolean;
  };
  advanced: {
    retryAttempts: number;
    retryDelay: number;
    errorHandling: 'stop' | 'continue' | 'fallback';
    logging: boolean;
    debugging: boolean;
  };
}

interface WorkflowEditorProps {
  workflowId?: string;
  onSave: (workflow: WorkflowSettings) => void;
  onCancel: () => void;
}

const WorkflowEditor: React.FC<WorkflowEditorProps> = ({ workflowId, onSave, onCancel }) => {
  const [workflow, setWorkflow] = useState<WorkflowSettings>({
    id: workflowId || Date.now().toString(),
    name: 'New Workflow',
    description: 'Automated workflow for business processes',
    enabled: true,
    schedule: {
      type: 'immediate',
      time: '09:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      interval: 60
    },
    triggers: {
      email: true,
      social: false,
      booking: false,
      manual: false,
      webhook: false
    },
    ai: {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 500,
      tone: 'professional',
      language: 'en'
    },
    notifications: {
      email: true,
      slack: false,
      webhook: false,
      sms: false
    },
    limits: {
      maxRunsPerDay: 100,
      maxRunsPerHour: 10,
      timeout: 30
    },
    conditions: {
      timezone: 'UTC',
      businessHours: true,
      workingDays: true,
      sentimentFilter: false,
      keywordFilter: false
    },
    actions: {
      email: true,
      social: false,
      crm: false,
      calendar: false,
      analytics: true
    },
    advanced: {
      retryAttempts: 3,
      retryDelay: 5,
      errorHandling: 'fallback',
      logging: true,
      debugging: false
    }
  });

  const [activeTab, setActiveTab] = useState<'general' | 'triggers' | 'ai' | 'notifications' | 'limits' | 'conditions' | 'actions' | 'advanced'>('general');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['general', 'triggers']));

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'triggers', name: 'Triggers', icon: Zap },
    { id: 'ai', name: 'AI Settings', icon: Brain },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'limits', name: 'Limits', icon: Shield },
    { id: 'conditions', name: 'Conditions', icon: Filter },
    { id: 'actions', name: 'Actions', icon: Target },
    { id: 'advanced', name: 'Advanced', icon: Sliders }
  ];

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const updateWorkflow = (updates: Partial<WorkflowSettings>) => {
    setWorkflow(prev => ({ ...prev, ...updates }));
  };

  const updateNestedSetting = (path: string, value: any) => {
    const keys = path.split('.');
    const updates = { ...workflow };
    let current = updates;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setWorkflow(updates);
  };

  const renderToggle = (path: string, label: string, description?: string) => {
    const value = path.split('.').reduce((obj, key) => obj?.[key], workflow);
    return (
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h4 className="font-medium text-gray-900">{label}</h4>
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
        <button
          onClick={() => updateNestedSetting(path, !value)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            value ? 'bg-primary-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              value ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    );
  };

  const renderInput = (path: string, label: string, type: string = 'text', options?: any) => {
    const value = path.split('.').reduce((obj, key) => obj?.[key], workflow);
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {type === 'select' ? (
          <select
            value={value}
            onChange={(e) => updateNestedSetting(path, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {options?.map((option: any) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => updateNestedSetting(path, type === 'number' ? Number(e.target.value) : e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            {...options}
          />
        )}
      </div>
    );
  };

  const renderSlider = (path: string, label: string, min: number, max: number, step: number = 1) => {
    const value = path.split('.').reduce((obj, key) => obj?.[key], workflow);
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}: {value}
        </label>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => updateNestedSetting(path, Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    );
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput('name', 'Workflow Name')}
        {renderInput('description', 'Description', 'textarea')}
      </div>
      
      {renderToggle('enabled', 'Enable Workflow', 'Turn this workflow on or off')}
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Schedule Settings</h3>
        {renderInput('schedule.type', 'Schedule Type', 'select', [
          { value: 'immediate', label: 'Run Immediately' },
          { value: 'scheduled', label: 'Scheduled Time' },
          { value: 'recurring', label: 'Recurring' }
        ])}
        
        {workflow.schedule.type === 'scheduled' && (
          renderInput('schedule.time', 'Scheduled Time', 'time')
        )}
        
        {workflow.schedule.type === 'recurring' && (
          <div className="space-y-4">
            {renderInput('schedule.interval', 'Interval (minutes)', 'number')}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Active Days</label>
              <div className="grid grid-cols-7 gap-2">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                  <label key={day} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={workflow.schedule.days?.includes(day)}
                      onChange={(e) => {
                        const days = workflow.schedule.days || [];
                        if (e.target.checked) {
                          updateNestedSetting('schedule.days', [...days, day]);
                        } else {
                          updateNestedSetting('schedule.days', days.filter(d => d !== day));
                        }
                      }}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{day.slice(0, 3)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderTriggerSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderToggle('triggers.email', 'Email Triggers', 'Trigger on new emails')}
        {renderToggle('triggers.social', 'Social Media Triggers', 'Trigger on social media activity')}
        {renderToggle('triggers.booking', 'Booking Triggers', 'Trigger on new bookings')}
        {renderToggle('triggers.manual', 'Manual Triggers', 'Allow manual execution')}
        {renderToggle('triggers.webhook', 'Webhook Triggers', 'Trigger via webhook')}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Trigger Conditions</h3>
        {renderInput('conditions.timezone', 'Timezone', 'select', [
          { value: 'UTC', label: 'UTC' },
          { value: 'America/New_York', label: 'Eastern Time' },
          { value: 'America/Chicago', label: 'Central Time' },
          { value: 'America/Denver', label: 'Mountain Time' },
          { value: 'America/Los_Angeles', label: 'Pacific Time' },
          { value: 'Europe/London', label: 'London' },
          { value: 'Europe/Paris', label: 'Paris' },
          { value: 'Asia/Tokyo', label: 'Tokyo' }
        ])}
        
        {renderToggle('conditions.businessHours', 'Business Hours Only', 'Only run during business hours')}
        {renderToggle('conditions.workingDays', 'Working Days Only', 'Only run on working days')}
        {renderToggle('conditions.sentimentFilter', 'Sentiment Filter', 'Filter by message sentiment')}
        {renderToggle('conditions.keywordFilter', 'Keyword Filter', 'Filter by specific keywords')}
      </div>
    </div>
  );

  const renderAISettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput('ai.model', 'AI Model', 'select', [
          { value: 'gpt-4', label: 'GPT-4 (Most Advanced)' },
          { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo (Fast)' },
          { value: 'claude-3', label: 'Claude 3 (Creative)' }
        ])}
        
        {renderInput('ai.tone', 'Response Tone', 'select', [
          { value: 'professional', label: 'Professional' },
          { value: 'friendly', label: 'Friendly' },
          { value: 'casual', label: 'Casual' },
          { value: 'formal', label: 'Formal' }
        ])}
        
        {renderInput('ai.language', 'Language', 'select', [
          { value: 'en', label: 'English' },
          { value: 'es', label: 'Spanish' },
          { value: 'fr', label: 'French' },
          { value: 'de', label: 'German' },
          { value: 'it', label: 'Italian' },
          { value: 'pt', label: 'Portuguese' }
        ])}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">AI Parameters</h3>
        {renderSlider('ai.temperature', 'Creativity Level', 0, 1, 0.1)}
        {renderSlider('ai.maxTokens', 'Max Response Length', 100, 2000, 50)}
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderToggle('notifications.email', 'Email Notifications', 'Send email notifications')}
        {renderToggle('notifications.slack', 'Slack Notifications', 'Send Slack notifications')}
        {renderToggle('notifications.webhook', 'Webhook Notifications', 'Send webhook notifications')}
        {renderToggle('notifications.sms', 'SMS Notifications', 'Send SMS notifications')}
      </div>
    </div>
  );

  const renderLimitSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderSlider('limits.maxRunsPerDay', 'Max Runs Per Day', 1, 1000, 1)}
        {renderSlider('limits.maxRunsPerHour', 'Max Runs Per Hour', 1, 100, 1)}
        {renderSlider('limits.timeout', 'Timeout (seconds)', 5, 300, 5)}
      </div>
    </div>
  );

  const renderConditionSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput('conditions.timezone', 'Timezone', 'select', [
          { value: 'UTC', label: 'UTC' },
          { value: 'America/New_York', label: 'Eastern Time' },
          { value: 'America/Chicago', label: 'Central Time' },
          { value: 'America/Denver', label: 'Mountain Time' },
          { value: 'America/Los_Angeles', label: 'Pacific Time' },
          { value: 'Europe/London', label: 'London' },
          { value: 'Europe/Paris', label: 'Paris' },
          { value: 'Asia/Tokyo', label: 'Tokyo' }
        ])}
      </div>
      
      <div className="space-y-4">
        {renderToggle('conditions.businessHours', 'Business Hours Only', 'Only run during business hours')}
        {renderToggle('conditions.workingDays', 'Working Days Only', 'Only run on working days')}
        {renderToggle('conditions.sentimentFilter', 'Sentiment Filter', 'Filter by message sentiment')}
        {renderToggle('conditions.keywordFilter', 'Keyword Filter', 'Filter by specific keywords')}
      </div>
    </div>
  );

  const renderActionSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderToggle('actions.email', 'Email Actions', 'Send emails automatically')}
        {renderToggle('actions.social', 'Social Media Actions', 'Post to social media')}
        {renderToggle('actions.crm', 'CRM Actions', 'Update CRM records')}
        {renderToggle('actions.calendar', 'Calendar Actions', 'Create calendar events')}
        {renderToggle('actions.analytics', 'Analytics Actions', 'Track analytics data')}
      </div>
    </div>
  );

  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderSlider('advanced.retryAttempts', 'Retry Attempts', 0, 10, 1)}
        {renderSlider('advanced.retryDelay', 'Retry Delay (seconds)', 1, 60, 1)}
        
        {renderInput('advanced.errorHandling', 'Error Handling', 'select', [
          { value: 'stop', label: 'Stop on Error' },
          { value: 'continue', label: 'Continue on Error' },
          { value: 'fallback', label: 'Use Fallback' }
        ])}
      </div>
      
      <div className="space-y-4">
        {renderToggle('advanced.logging', 'Enable Logging', 'Log all workflow activities')}
        {renderToggle('advanced.debugging', 'Debug Mode', 'Enable detailed debugging')}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'triggers': return renderTriggerSettings();
      case 'ai': return renderAISettings();
      case 'notifications': return renderNotificationSettings();
      case 'limits': return renderLimitSettings();
      case 'conditions': return renderConditionSettings();
      case 'actions': return renderActionSettings();
      case 'advanced': return renderAdvancedSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Workflow Settings</h2>
            <p className="text-gray-600">Configure your automation workflow</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onSave(workflow)}
              className="btn-primary flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowEditor;
