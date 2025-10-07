import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  MessageCircle,
  Zap,
  Settings,
  Play,
  Pause,
  Edit,
  Eye,
  Trash2,
  Copy,
  Filter,
  Search,
  Plus,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  BarChart3,
  Bell,
  Calendar,
  Tag,
  Globe,
  Shield,
  Target,
  Award,
  Activity,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

interface EmailInquiry {
  id: string;
  from: string;
  fromName: string;
  subject: string;
  content: string;
  receivedAt: Date;
  status: 'new' | 'processing' | 'responded' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'booking' | 'pricing' | 'portfolio' | 'general' | 'complaint';
  sentiment: 'positive' | 'neutral' | 'negative';
  responseSent?: Date;
  responseContent?: string;
  aiGenerated: boolean;
}

interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  subject: string;
  content: string;
  enabled: boolean;
  priority: number;
  conditions: {
    keywords: string[];
    sentiment: string[];
    category: string[];
  };
}

interface AutomationSettings {
  enabled: boolean;
  autoRespond: boolean;
  responseDelay: number; // minutes
  maxResponsesPerDay: number;
  workingHours: {
    start: string;
    end: string;
    timezone: string;
  };
  aiSettings: {
    model: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3';
    temperature: number;
    maxTokens: number;
    tone: 'professional' | 'friendly' | 'casual' | 'formal';
  };
  filters: {
    minLength: number;
    excludeSpam: boolean;
    requireKeywords: boolean;
  };
}

const EmailResponseAutomation: React.FC = () => {
  const [inquiries, setInquiries] = useState<EmailInquiry[]>([
    {
      id: '1',
      from: 'sarah.johnson@email.com',
      fromName: 'Sarah Johnson',
      subject: 'Photography Session Inquiry',
      content: 'Hi! I\'m interested in booking a portrait session for my engagement photos. Could you please send me information about your packages and availability?',
      receivedAt: new Date('2024-01-15T10:30:00'),
      status: 'new',
      priority: 'high',
      category: 'booking',
      sentiment: 'positive',
      aiGenerated: false
    },
    {
      id: '2',
      from: 'michael.chen@email.com',
      fromName: 'Michael Chen',
      subject: 'Pricing for Family Photography',
      content: 'Hello, I would like to know your rates for family photography sessions. We are a family of 4 and would prefer outdoor sessions.',
      receivedAt: new Date('2024-01-15T09:15:00'),
      status: 'responded',
      priority: 'medium',
      category: 'pricing',
      sentiment: 'neutral',
      responseSent: new Date('2024-01-15T09:20:00'),
      responseContent: 'Thank you for your inquiry about family photography...',
      aiGenerated: true
    },
    {
      id: '3',
      from: 'emma.rodriguez@email.com',
      fromName: 'Emma Rodriguez',
      subject: 'Love your portfolio!',
      content: 'Your photography is absolutely stunning! I love the movement and documentary style. Do you have any availability for a dance photography session?',
      receivedAt: new Date('2024-01-15T08:45:00'),
      status: 'processing',
      priority: 'high',
      category: 'portfolio',
      sentiment: 'positive',
      aiGenerated: false
    }
  ]);

  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: 'booking',
      name: 'Booking Inquiry Response',
      category: 'booking',
      subject: 'Thank you for your photography inquiry - ZESA Photography',
      content: `Hi {{fromName}}!

Thank you for reaching out to ZESA Photography! We're thrilled that you're interested in our {{serviceType}} services.

Based on your inquiry, here's what we can offer:

📸 **Our Services:**
• Portrait Photography
• Documentary Sessions
• Movement & Dance Photography
• Motion Photography

📅 **Availability:**
We typically book 2-4 weeks in advance. I'd be happy to check our calendar for your preferred dates.

💰 **Investment:**
Our sessions start at $350 and include:
• Professional photography session
• High-resolution edited images
• Online gallery for viewing and downloading
• Print release for personal use

🎯 **Next Steps:**
1. Let me know your preferred date and time
2. Share any specific ideas or inspiration you have
3. We'll confirm the details and send you a booking link

I'm excited to learn more about your vision and how we can bring it to life!

Best regards,
Mateo Serna Zapata
ZESA Photography
📧 info@mateoseza.com
📱 +1-555-ZESA-PHOTO

P.S. You can view our latest work at mateoseza.com/portfolio`,
      enabled: true,
      priority: 1,
      conditions: {
        keywords: ['booking', 'session', 'photography', 'hire', 'available'],
        sentiment: ['positive', 'neutral'],
        category: ['booking']
      }
    },
    {
      id: 'pricing',
      name: 'Pricing Inquiry Response',
      category: 'pricing',
      subject: 'Photography Pricing Information - ZESA Photography',
      content: `Hi {{fromName}}!

Thank you for your interest in our photography services! I'd be happy to share our pricing information with you.

💰 **Investment Options:**

**Portrait Sessions** - Starting at $350
• 1-2 hour session
• 50+ edited high-resolution images
• Online gallery
• Print release

**Documentary Sessions** - Starting at $450
• 2-3 hour session
• 75+ edited high-resolution images
• Online gallery
• Print release

**Movement/Dance Sessions** - Starting at $400
• 1.5-2 hour session
• 60+ edited high-resolution images
• Online gallery
• Print release

**What's Included:**
• Professional photography
• Post-processing and editing
• Online gallery for viewing
• High-resolution downloads
• Print release for personal use

**Additional Options:**
• Rush editing (24-48 hours): +$100
• Additional locations: +$50 each
• Extended session time: +$75/hour

I'd love to discuss your specific needs and create a custom package that works for you!

Best regards,
Mateo Serna Zapata
ZESA Photography`,
      enabled: true,
      priority: 2,
      conditions: {
        keywords: ['price', 'cost', 'rate', 'pricing', 'how much'],
        sentiment: ['positive', 'neutral'],
        category: ['pricing']
      }
    },
    {
      id: 'portfolio',
      name: 'Portfolio Inquiry Response',
      category: 'portfolio',
      subject: 'Thank you for your kind words! - ZESA Photography',
      content: `Hi {{fromName}}!

Your message absolutely made my day! Thank you so much for taking the time to reach out and share your thoughts about our work.

It means the world to us when people connect with our photography style. We believe in capturing authentic moments and telling real stories through our lens.

🎨 **Our Specialties:**
• **Portrait Photography** - Authentic, natural portraits
• **Documentary Photography** - Real moments, real emotions
• **Movement Photography** - Dynamic, artistic captures
• **Motion Photography** - Cinematic storytelling

📸 **View Our Work:**
• Website: mateoseza.com
• Instagram: @mateoseza.photo
• Portfolio: mateoseza.com/portfolio

If you're interested in working together, I'd love to hear about your vision! Whether it's a personal session, family photos, or something completely unique, we're here to bring your story to life.

What type of session are you most interested in?

With gratitude,
Mateo Serna Zapata
ZESA Photography
"Human First & Foremost"`,
      enabled: true,
      priority: 3,
      conditions: {
        keywords: ['love', 'beautiful', 'amazing', 'stunning', 'portfolio', 'work'],
        sentiment: ['positive'],
        category: ['portfolio']
      }
    }
  ]);

  const [automationSettings, setAutomationSettings] = useState<AutomationSettings>({
    enabled: true,
    autoRespond: true,
    responseDelay: 5,
    maxResponsesPerDay: 50,
    workingHours: {
      start: '09:00',
      end: '17:00',
      timezone: 'America/New_York'
    },
    aiSettings: {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 500,
      tone: 'professional'
    },
    filters: {
      minLength: 10,
      excludeSpam: true,
      requireKeywords: false
    }
  });

  const [activeTab, setActiveTab] = useState<'inquiries' | 'templates' | 'automation' | 'analytics'>('inquiries');
  const [selectedInquiry, setSelectedInquiry] = useState<EmailInquiry | null>(null);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Simulate real-time email processing
  useEffect(() => {
    const interval = setInterval(() => {
      setInquiries(prev => prev.map(inquiry => {
        if (inquiry.status === 'new' && automationSettings.enabled) {
          // Simulate AI processing
          const shouldRespond = Math.random() > 0.3; // 70% chance of auto-response
          if (shouldRespond) {
            return {
              ...inquiry,
              status: 'processing',
              aiGenerated: true
            };
          }
        }
        return inquiry;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [automationSettings.enabled]);

  const sendResponse = async (inquiry: EmailInquiry, template?: EmailTemplate) => {
    try {
      // Find appropriate template
      const selectedTemplate = template || findBestTemplate(inquiry);
      
      if (!selectedTemplate) {
        throw new Error('No suitable template found');
      }

      // Generate personalized response
      const personalizedContent = personalizeTemplate(selectedTemplate.content, inquiry);
      const personalizedSubject = personalizeTemplate(selectedTemplate.subject, inquiry);

      // Simulate sending email
      console.log(`Sending response to ${inquiry.from}:`, {
        subject: personalizedSubject,
        content: personalizedContent
      });

      // Update inquiry status
      setInquiries(prev => prev.map(i => 
        i.id === inquiry.id 
          ? { 
              ...i, 
              status: 'responded', 
              responseSent: new Date(),
              responseContent: personalizedContent
            }
          : i
      ));

      return { success: true, message: 'Response sent successfully!' };
    } catch (error) {
      console.error('Error sending response:', error);
      setInquiries(prev => prev.map(i => 
        i.id === inquiry.id 
          ? { ...i, status: 'failed' }
          : i
      ));
      return { success: false, message: 'Failed to send response' };
    }
  };

  const findBestTemplate = (inquiry: EmailInquiry): EmailTemplate | null => {
    // Find template that matches inquiry category and conditions
    return templates.find(template => 
      template.enabled && 
      template.conditions.category.includes(inquiry.category) &&
      template.conditions.sentiment.includes(inquiry.sentiment)
    ) || null;
  };

  const personalizeTemplate = (template: string, inquiry: EmailInquiry): string => {
    let personalized = template;
    
    // Replace template variables
    personalized = personalized.replace(/\{\{fromName\}\}/g, inquiry.fromName);
    personalized = personalized.replace(/\{\{from\}\}/g, inquiry.from);
    personalized = personalized.replace(/\{\{subject\}\}/g, inquiry.subject);
    personalized = personalized.replace(/\{\{content\}\}/g, inquiry.content);
    
    return personalized;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'responded': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <ThumbsUp className="w-4 h-4 text-green-600" />;
      case 'negative': return <ThumbsDown className="w-4 h-4 text-red-600" />;
      default: return <MessageCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.fromName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || inquiry.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || inquiry.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const renderInquiryCard = (inquiry: EmailInquiry) => (
    <div key={inquiry.id} className="card hover:shadow-lg transition-shadow cursor-pointer p-6" onClick={() => setSelectedInquiry(inquiry)}>
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <h3 className="font-semibold text-gray-900 text-lg">{inquiry.fromName}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
              {inquiry.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(inquiry.priority)}`}>
              {inquiry.priority}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-900 mb-2">{inquiry.subject}</p>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{inquiry.content}</p>
        </div>
        <div className="flex items-center space-x-3">
          {getSentimentIcon(inquiry.sentiment)}
          {inquiry.aiGenerated && <Zap className="w-5 h-5 text-purple-600" />}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{inquiry.receivedAt.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4" />
            <span className="capitalize">{inquiry.category}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {inquiry.status === 'new' && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                sendResponse(inquiry);
              }}
              className="p-3 text-gray-400 hover:text-primary-600 transition-colors"
              title="Send Response"
            >
              <Send className="w-5 h-5" />
            </button>
          )}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // View inquiry details
            }}
            className="p-3 text-gray-400 hover:text-gray-600 transition-colors"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderTemplateCard = (template: EmailTemplate) => (
    <div key={template.id} className="card hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <h3 className="font-semibold text-gray-900 text-lg">{template.name}</h3>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              {template.category}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full font-medium">
              Priority {template.priority}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3 font-medium">{template.subject}</p>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{template.content.substring(0, 150)}...</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setEditingTemplate(template);
              setShowTemplateEditor(true);
            }}
            className="p-3 text-gray-400 hover:text-primary-600 transition-colors"
            title="Edit Template"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            className={`p-3 transition-colors ${
              template.enabled 
                ? 'text-green-600 hover:text-green-700' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
            title={template.enabled ? 'Disable Template' : 'Enable Template'}
          >
            {template.enabled ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );

  const renderAutomationSettings = () => (
    <div className="space-y-8">
      <div className="card p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Automation Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 text-lg">Enable Automation</h4>
                <p className="text-sm text-gray-600 mt-1">Automatically respond to email inquiries</p>
              </div>
              <button
                onClick={() => setAutomationSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  automationSettings.enabled ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    automationSettings.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Response Delay (minutes)</label>
              <input
                type="number"
                min="0"
                max="60"
                value={automationSettings.responseDelay}
                onChange={(e) => setAutomationSettings(prev => ({ ...prev, responseDelay: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Max Responses Per Day</label>
              <input
                type="number"
                min="1"
                max="200"
                value={automationSettings.maxResponsesPerDay}
                onChange={(e) => setAutomationSettings(prev => ({ ...prev, maxResponsesPerDay: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">AI Model</label>
              <select
                value={automationSettings.aiSettings.model}
                onChange={(e) => setAutomationSettings(prev => ({ 
                  ...prev, 
                  aiSettings: { ...prev.aiSettings, model: e.target.value as any }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="gpt-4">GPT-4 (Most Advanced)</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Fast)</option>
                <option value="claude-3">Claude 3 (Creative)</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Response Tone</label>
              <select
                value={automationSettings.aiSettings.tone}
                onChange={(e) => setAutomationSettings(prev => ({ 
                  ...prev, 
                  aiSettings: { ...prev.aiSettings, tone: e.target.value as any }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Working Hours</label>
              <div className="flex space-x-3">
                <input
                  type="time"
                  value={automationSettings.workingHours.start}
                  onChange={(e) => setAutomationSettings(prev => ({ 
                    ...prev, 
                    workingHours: { ...prev.workingHours, start: e.target.value }
                  }))}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <span className="px-3 py-3 text-gray-500">to</span>
                <input
                  type="time"
                  value={automationSettings.workingHours.end}
                  onChange={(e) => setAutomationSettings(prev => ({ 
                    ...prev, 
                    workingHours: { ...prev.workingHours, end: e.target.value }
                  }))}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Automation Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-4 bg-white/50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">47</div>
            <div className="text-sm text-gray-600">Responses Sent Today</div>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">96.8%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-xl">
            <div className="text-3xl font-bold text-orange-600 mb-2">1.8s</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">89.2%</div>
            <div className="text-sm text-gray-600">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Auto Responses</p>
              <p className="text-2xl font-bold text-gray-900">1,156</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">96.8%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900">1.8s</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Auto-response sent to Sarah Johnson</p>
              <p className="text-xs text-gray-600">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">New inquiry from Emma Rodriguez</p>
              <p className="text-xs text-gray-600">5 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">AI processing inquiry from Michael Chen</p>
              <p className="text-xs text-gray-600">8 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-8">
        <div className="relative inline-block mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-quantum-500 via-primary-500 to-harmony-500 rounded-2xl flex items-center justify-center shadow-xl quantum-glow">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-consciousness-400 to-primary-400 rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-4xl font-bold gradient-text-quantum mb-4">Email Response Automation</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Automatically respond to client inquiries with personalized messages. 
          AI-powered email automation with consciousness-driven communication.
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
            automationSettings.enabled 
              ? 'bg-harmony-50 text-harmony-700 border-harmony-200' 
              : 'bg-gray-50 text-gray-600 border-gray-200'
          }`}>
            <div className={`w-2 h-2 rounded-full ${automationSettings.enabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-medium">
              {automationSettings.enabled ? 'Automation Active' : 'Automation Paused'}
            </span>
          </div>
          <button 
            onClick={() => {
              console.log('Testing email automation...');
            }}
            className="btn-quantum flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-quantum-500 to-primary-500 text-white rounded-lg hover:from-quantum-600 hover:to-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Play className="w-4 h-4" />
            <span>Test Automation</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-hide space-x-8 pb-2">
            {[
              { id: 'inquiries', label: 'Email Inquiries', icon: Mail },
              { id: 'templates', label: 'Response Templates', icon: MessageCircle },
              { id: 'automation', label: 'Automation', icon: Zap },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 bg-primary-50/50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* Scroll indicators */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search inquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Categories</option>
              <option value="booking">Booking</option>
              <option value="pricing">Pricing</option>
              <option value="portfolio">Portfolio</option>
              <option value="general">General</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="processing">Processing</option>
              <option value="responded">Responded</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Inquiries Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredInquiries.map(renderInquiryCard)}
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Response Templates</h2>
            <button 
              onClick={() => {
                setEditingTemplate(null);
                setShowTemplateEditor(true);
              }}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Template</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map(renderTemplateCard)}
          </div>
        </div>
      )}

      {activeTab === 'automation' && renderAutomationSettings()}

      {activeTab === 'analytics' && renderAnalytics()}
    </div>
  );
};

export default EmailResponseAutomation;
