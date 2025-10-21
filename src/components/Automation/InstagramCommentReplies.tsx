import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  MessageCircle, 
  Heart, 
  ThumbsUp, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
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
  Upload,
  Camera,
  Users,
  Hash,
  AtSign,
  Smile,
  Frown,
  Meh,
  Sparkles,
  Crown,
  Gem,
  Flame,
  Sun,
  Moon,
  Rainbow,
  Flower,
  Leaf,
  Bird,
  Trees,
  Mountain,
  Waves,
  Cloud,
  Snowflake,
  Droplets,
  Zap as Lightning
} from 'lucide-react';

interface InstagramComment {
  id: string;
  postId: string;
  postImage: string;
  postCaption: string;
  commenter: string;
  commenterHandle: string;
  commenterAvatar: string;
  comment: string;
  timestamp: Date;
  likes: number;
  status: 'new' | 'processing' | 'replied' | 'failed' | 'ignored';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  sentiment: 'positive' | 'neutral' | 'negative';
  category: 'compliment' | 'question' | 'booking' | 'pricing' | 'general' | 'spam';
  responseSent?: Date;
  responseContent?: string;
  aiGenerated: boolean;
  hashtags: string[];
  mentions: string[];
}

interface InstagramTemplate {
  id: string;
  name: string;
  category: string;
  content: string;
  enabled: boolean;
  priority: number;
  conditions: {
    keywords: string[];
    sentiment: string[];
    category: string[];
    hashtags: string[];
  };
  emojis: string[];
  hashtags: string[];
}

interface AutomationSettings {
  enabled: boolean;
  autoReply: boolean;
  responseDelay: number; // minutes
  maxRepliesPerDay: number;
  workingHours: {
    start: string;
    end: string;
    timezone: string;
  };
  aiSettings: {
    model: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3';
    temperature: number;
    maxTokens: number;
    tone: 'professional' | 'friendly' | 'casual' | 'playful';
    personality: 'warm' | 'enthusiastic' | 'professional' | 'artistic';
  };
  filters: {
    minLength: number;
    excludeSpam: boolean;
    requireEngagement: boolean;
    maxHashtags: number;
  };
  engagement: {
    likeComments: boolean;
    followBack: boolean;
    storyMentions: boolean;
    dmFollowUp: boolean;
  };
}

const InstagramCommentReplies: React.FC = () => {
  const [comments, setComments] = useState<InstagramComment[]>([
    {
      id: '1',
      postId: 'post_1',
      postImage: '/api/placeholder/400/400',
      postCaption: 'Capturing the magic of movement and emotion in this portrait session ✨ #ZESAPhotography #PortraitPhotography #Movement',
      commenter: 'Sarah Johnson',
      commenterHandle: '@sarah_j_photo',
      commenterAvatar: '/api/placeholder/40/40',
      comment: 'This is absolutely stunning! Your work is incredible. Do you do family sessions?',
      timestamp: new Date('2024-01-15T14:30:00'),
      likes: 12,
      status: 'new',
      priority: 'high',
      sentiment: 'positive',
      category: 'compliment',
      aiGenerated: false,
      hashtags: ['#photography', '#family'],
      mentions: []
    },
    {
      id: '2',
      postId: 'post_2',
      postImage: '/api/placeholder/400/400',
      postCaption: 'Behind the scenes of a documentary session - real moments, real emotions 📸 #DocumentaryPhotography #RealMoments',
      commenter: 'Mike Chen',
      commenterHandle: '@mike_chen_photo',
      commenterAvatar: '/api/placeholder/40/40',
      comment: 'Love the documentary style! What\'s your rate for a 2-hour session?',
      timestamp: new Date('2024-01-15T13:45:00'),
      likes: 8,
      status: 'replied',
      priority: 'medium',
      sentiment: 'positive',
      category: 'pricing',
      responseSent: new Date('2024-01-15T13:50:00'),
      responseContent: 'Thank you so much! 😊 Our 2-hour documentary sessions start at $450. I\'d love to chat about your vision! DM me for details 📸✨',
      aiGenerated: true,
      hashtags: ['#documentary', '#pricing'],
      mentions: []
    },
    {
      id: '3',
      postId: 'post_3',
      postImage: '/api/placeholder/400/400',
      postCaption: 'Dance photography that tells a story 💃 #DancePhotography #Movement #Art',
      commenter: 'Emma Rodriguez',
      commenterHandle: '@emma_dances',
      commenterAvatar: '/api/placeholder/40/40',
      comment: 'This is pure art! 🔥 When can I book a session?',
      timestamp: new Date('2024-01-15T12:20:00'),
      likes: 15,
      status: 'processing',
      priority: 'high',
      sentiment: 'positive',
      category: 'booking',
      aiGenerated: false,
      hashtags: ['#dance', '#booking'],
      mentions: []
    }
  ]);

  const [templates, setTemplates] = useState<InstagramTemplate[]>([
    {
      id: 'compliment',
      name: 'Compliment Response',
      category: 'compliment',
      content: 'Thank you so much! 😊 Your kind words mean the world to me. I\'m so glad you love the work! ✨',
      enabled: true,
      priority: 1,
      conditions: {
        keywords: ['stunning', 'beautiful', 'amazing', 'incredible', 'love', 'gorgeous'],
        sentiment: ['positive'],
        category: ['compliment'],
        hashtags: []
      },
      emojis: ['😊', '✨', '❤️', '🙏'],
      hashtags: ['#ZESAPhotography', '#ThankYou']
    },
    {
      id: 'booking',
      name: 'Booking Inquiry Response',
      category: 'booking',
      content: 'I\'d love to work with you! 📸 Our sessions are all about capturing your authentic story. DM me and let\'s chat about your vision! ✨',
      enabled: true,
      priority: 2,
      conditions: {
        keywords: ['book', 'session', 'hire', 'available', 'when', 'schedule'],
        sentiment: ['positive', 'neutral'],
        category: ['booking'],
        hashtags: []
      },
      emojis: ['📸', '✨', '💫', '🎯'],
      hashtags: ['#ZESAPhotography', '#BookNow', '#PhotographySession']
    },
    {
      id: 'pricing',
      name: 'Pricing Inquiry Response',
      category: 'pricing',
      content: 'Great question! 💰 Our sessions start at $350 and include everything you need. DM me for a custom quote based on your vision! 📸✨',
      enabled: true,
      priority: 3,
      conditions: {
        keywords: ['price', 'cost', 'rate', 'how much', 'pricing'],
        sentiment: ['positive', 'neutral'],
        category: ['pricing'],
        hashtags: []
      },
      emojis: ['💰', '📸', '✨', '💫'],
      hashtags: ['#ZESAPhotography', '#Pricing', '#PhotographyInvestment']
    },
    {
      id: 'question',
      name: 'General Question Response',
      category: 'question',
      content: 'Great question! 🤔 I\'d love to help you out. DM me and I\'ll give you all the details! ✨',
      enabled: true,
      priority: 4,
      conditions: {
        keywords: ['how', 'what', 'where', 'when', 'why', 'question'],
        sentiment: ['positive', 'neutral'],
        category: ['question'],
        hashtags: []
      },
      emojis: ['🤔', '✨', '💡', '📝'],
      hashtags: ['#ZESAPhotography', '#Questions', '#Help']
    }
  ]);

  const [automationSettings, setAutomationSettings] = useState<AutomationSettings>({
    enabled: true,
    autoReply: true,
    responseDelay: 2,
    maxRepliesPerDay: 30,
    workingHours: {
      start: '09:00',
      end: '21:00',
      timezone: 'America/New_York'
    },
    aiSettings: {
      model: 'gpt-4',
      temperature: 0.8,
      maxTokens: 150,
      tone: 'friendly',
      personality: 'enthusiastic'
    },
    filters: {
      minLength: 5,
      excludeSpam: true,
      requireEngagement: false,
      maxHashtags: 5
    },
    engagement: {
      likeComments: true,
      followBack: false,
      storyMentions: true,
      dmFollowUp: false
    }
  });

  const [activeTab, setActiveTab] = useState<'comments' | 'templates' | 'automation' | 'analytics'>('comments');
  const [selectedComment, setSelectedComment] = useState<InstagramComment | null>(null);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<InstagramTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Simulate real-time comment processing
  useEffect(() => {
    const interval = setInterval(() => {
      setComments(prev => prev.map(comment => {
        if (comment.status === 'new' && automationSettings.enabled) {
          // Simulate AI processing
          const shouldReply = Math.random() > 0.2; // 80% chance of auto-reply
          if (shouldReply) {
            return {
              ...comment,
              status: 'processing',
              aiGenerated: true
            };
          }
        }
        return comment;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [automationSettings.enabled]);

  const sendReply = async (comment: InstagramComment, template?: InstagramTemplate) => {
    try {
      // Find appropriate template
      const selectedTemplate = template || findBestTemplate(comment);
      
      if (!selectedTemplate) {
        throw new Error('No suitable template found');
      }

      // Generate personalized response
      const personalizedContent = personalizeTemplate(selectedTemplate.content, comment, selectedTemplate);

      // Simulate sending Instagram reply
      console.log(`Sending Instagram reply to ${comment.commenterHandle}:`, {
        content: personalizedContent,
        postId: comment.postId,
        commentId: comment.id
      });

      // Update comment status
      setComments(prev => prev.map(c => 
        c.id === comment.id 
          ? { 
              ...c, 
              status: 'replied', 
              responseSent: new Date(),
              responseContent: personalizedContent
            }
          : c
      ));

      return { success: true, message: 'Reply sent successfully!' };
    } catch (error) {
      console.error('Error sending reply:', error);
      setComments(prev => prev.map(c => 
        c.id === comment.id 
          ? { ...c, status: 'failed' }
          : c
      ));
      return { success: false, message: 'Failed to send reply' };
    }
  };

  const findBestTemplate = (comment: InstagramComment): InstagramTemplate | null => {
    // Find template that matches comment category and conditions
    return templates.find(template => 
      template.enabled && 
      template.conditions.category.includes(comment.category) &&
      template.conditions.sentiment.includes(comment.sentiment)
    ) || null;
  };

  const personalizeTemplate = (templateContent: string, comment: InstagramComment, template?: InstagramTemplate): string => {
    let personalized = templateContent;
    
    // Replace template variables
    personalized = personalized.replace(/\{\{commenter\}\}/g, comment.commenter);
    personalized = personalized.replace(/\{\{commenterHandle\}\}/g, comment.commenterHandle);
    personalized = personalized.replace(/\{\{comment\}\}/g, comment.comment);
    
    // Add random emoji from template if available
    if (template && template.emojis && template.emojis.length > 0) {
      const randomEmoji = template.emojis[Math.floor(Math.random() * template.emojis.length)];
      personalized += ` ${randomEmoji}`;
    }
    
    return personalized;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'ignored': return 'bg-gray-100 text-gray-800';
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
      case 'positive': return <Smile className="w-4 h-4 text-green-600" />;
      case 'negative': return <Frown className="w-4 h-4 text-red-600" />;
      default: return <Meh className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compliment': return <Heart className="w-4 h-4 text-pink-600" />;
      case 'booking': return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'pricing': return <Tag className="w-4 h-4 text-green-600" />;
      case 'question': return <MessageCircle className="w-4 h-4 text-purple-600" />;
      default: return <MessageCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.commenter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.commenterHandle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || comment.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || comment.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const renderCommentCard = (comment: InstagramComment) => (
    <div key={comment.id} className="card hover:shadow-lg transition-shadow cursor-pointer p-6" onClick={() => setSelectedComment(comment)}>
      <div className="flex items-start space-x-4 mb-6">
        <img 
          src={comment.commenterAvatar} 
          alt={comment.commenter}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-gray-900 text-lg">{comment.commenter}</h3>
            <span className="text-sm text-gray-600 font-medium">{comment.commenterHandle}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(comment.status)}`}>
              {comment.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(comment.priority)}`}>
              {comment.priority}
            </span>
          </div>
          <p className="text-sm text-gray-800 mb-3 font-medium leading-relaxed">{comment.comment}</p>
          <div className="flex items-center space-x-6 text-xs text-gray-600">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{comment.timestamp.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span className="font-medium">{comment.likes}</span>
            </div>
            <div className="flex items-center space-x-2">
              {getSentimentIcon(comment.sentiment)}
              <span className="capitalize font-medium">{comment.sentiment}</span>
            </div>
            <div className="flex items-center space-x-2">
              {getCategoryIcon(comment.category)}
              <span className="capitalize font-medium">{comment.category}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {comment.aiGenerated && <Zap className="w-5 h-5 text-purple-600" />}
        </div>
      </div>

      {comment.responseContent && (
        <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border-l-4 border-pink-500">
          <div className="flex items-center space-x-3 mb-3">
            <Instagram className="w-5 h-5 text-pink-600" />
            <span className="text-sm font-semibold text-gray-800">Your Reply:</span>
            <span className="text-xs text-gray-600 font-medium">{comment.responseSent?.toLocaleTimeString()}</span>
          </div>
          <p className="text-sm text-gray-700 font-medium leading-relaxed">{comment.responseContent}</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          {comment.hashtags.map(tag => (
            <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-3">
          {comment.status === 'new' && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                sendReply(comment);
              }}
              className="p-3 text-gray-500 hover:text-pink-600 transition-colors"
              title="Send Reply"
            >
              <Send className="w-5 h-5" />
            </button>
          )}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // View comment details
            }}
            className="p-3 text-gray-500 hover:text-gray-700 transition-colors"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderTemplateCard = (template: InstagramTemplate) => (
    <div key={template.id} className="card hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <h3 className="font-semibold text-gray-900 text-lg">{template.name}</h3>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-semibold">
              {template.category}
            </span>
            <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs rounded-full font-semibold">
              Priority {template.priority}
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-4 font-medium leading-relaxed">{template.content}</p>
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-xs text-gray-600 font-semibold">Emojis:</span>
            {template.emojis.map(emoji => (
              <span key={emoji} className="text-lg">{emoji}</span>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-gray-600 font-semibold">Hashtags:</span>
            {template.hashtags.map(hashtag => (
              <span key={hashtag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                {hashtag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setEditingTemplate(template);
              setShowTemplateEditor(true);
            }}
            className="p-3 text-gray-500 hover:text-pink-600 transition-colors"
            title="Edit Template"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            className={`p-3 transition-colors ${
              template.enabled 
                ? 'text-green-600 hover:text-green-700' 
                : 'text-gray-500 hover:text-gray-700'
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
                <h4 className="font-semibold text-gray-900 text-lg">Enable Automation</h4>
                <p className="text-sm text-gray-700 mt-1 font-medium">Automatically reply to Instagram comments</p>
              </div>
              <button
                onClick={() => setAutomationSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  automationSettings.enabled ? 'bg-pink-600' : 'bg-gray-200'
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
              <label className="block text-sm font-semibold text-gray-800">Response Delay (minutes)</label>
              <input
                type="number"
                min="0"
                max="60"
                value={automationSettings.responseDelay}
                onChange={(e) => setAutomationSettings(prev => ({ ...prev, responseDelay: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-medium"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800">Max Replies Per Day</label>
              <input
                type="number"
                min="1"
                max="100"
                value={automationSettings.maxRepliesPerDay}
                onChange={(e) => setAutomationSettings(prev => ({ ...prev, maxRepliesPerDay: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-medium"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800">AI Model</label>
              <select
                value={automationSettings.aiSettings.model}
                onChange={(e) => setAutomationSettings(prev => ({ 
                  ...prev, 
                  aiSettings: { ...prev.aiSettings, model: e.target.value as any }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-medium"
              >
                <option value="gpt-4">GPT-4 (Most Advanced)</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Fast)</option>
                <option value="claude-3">Claude 3 (Creative)</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800">Response Tone</label>
              <select
                value={automationSettings.aiSettings.tone}
                onChange={(e) => setAutomationSettings(prev => ({ 
                  ...prev, 
                  aiSettings: { ...prev.aiSettings, tone: e.target.value as any }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-medium"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="casual">Casual</option>
                <option value="playful">Playful</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800">Personality</label>
              <select
                value={automationSettings.aiSettings.personality}
                onChange={(e) => setAutomationSettings(prev => ({ 
                  ...prev, 
                  aiSettings: { ...prev.aiSettings, personality: e.target.value as any }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-medium"
              >
                <option value="warm">Warm</option>
                <option value="enthusiastic">Enthusiastic</option>
                <option value="professional">Professional</option>
                <option value="artistic">Artistic</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Engagement Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 text-lg">Like Comments</h4>
              <p className="text-sm text-gray-700 mt-1 font-medium">Automatically like comments</p>
            </div>
            <button
              onClick={() => setAutomationSettings(prev => ({ 
                ...prev, 
                engagement: { ...prev.engagement, likeComments: !prev.engagement.likeComments }
              }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                automationSettings.engagement.likeComments ? 'bg-pink-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  automationSettings.engagement.likeComments ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 text-lg">Story Mentions</h4>
              <p className="text-sm text-gray-700 mt-1 font-medium">Respond to story mentions</p>
            </div>
            <button
              onClick={() => setAutomationSettings(prev => ({ 
                ...prev, 
                engagement: { ...prev.engagement, storyMentions: !prev.engagement.storyMentions }
              }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                automationSettings.engagement.storyMentions ? 'bg-pink-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  automationSettings.engagement.storyMentions ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="card p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Automation Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-4 bg-white/50 rounded-xl">
            <div className="text-3xl font-bold text-pink-600 mb-2">23</div>
            <div className="text-sm text-gray-700 font-semibold">Replies Sent Today</div>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">94.2%</div>
            <div className="text-sm text-gray-700 font-semibold">Success Rate</div>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-xl">
            <div className="text-3xl font-bold text-orange-600 mb-2">1.2s</div>
            <div className="text-sm text-gray-700 font-semibold">Avg Response Time</div>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">87.5%</div>
            <div className="text-sm text-gray-700 font-semibold">Engagement Rate</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Total Comments</p>
              <p className="text-3xl font-bold text-gray-900">1,156</p>
            </div>
            <div className="w-14 h-14 bg-pink-100 rounded-lg flex items-center justify-center">
              <Instagram className="w-7 h-7 text-pink-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Auto Replies</p>
              <p className="text-3xl font-bold text-gray-900">1,089</p>
            </div>
            <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
              <Zap className="w-7 h-7 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900">94.2%</p>
            </div>
            <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Avg Response Time</p>
              <p className="text-3xl font-bold text-gray-900">1.2s</p>
            </div>
            <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-7 h-7 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="card p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Auto-reply sent to @sarah_j_photo</p>
              <p className="text-xs text-gray-600 font-medium">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <Instagram className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">New comment from @emma_dances</p>
              <p className="text-xs text-gray-600 font-medium">5 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">AI processing comment from @mike_chen_photo</p>
              <p className="text-xs text-gray-600 font-medium">8 minutes ago</p>
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
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl quantum-glow">
            <Instagram className="w-8 h-8 text-white" />
        </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-4xl font-bold gradient-text-quantum mb-4">Instagram Comment Replies</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
          Automatically reply to Instagram comments with engaging responses. 
          AI-powered social media automation with consciousness-driven engagement.
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
            automationSettings.enabled 
              ? 'bg-green-50 text-green-800 border-green-200' 
              : 'bg-gray-50 text-gray-700 border-gray-200'
          }`}>
            <div className={`w-2 h-2 rounded-full ${automationSettings.enabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-semibold">
              {automationSettings.enabled ? 'Automation Active' : 'Automation Paused'}
            </span>
          </div>
          <button 
            onClick={() => {
              console.log('Testing Instagram automation...');
            }}
            className="btn-quantum flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
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
            { id: 'comments', label: 'Comments', icon: MessageCircle },
            { id: 'templates', label: 'Response Templates', icon: Instagram },
            { id: 'automation', label: 'Automation', icon: Zap },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                      ? 'border-pink-500 text-pink-600 bg-pink-50/50'
                      : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300 hover:bg-gray-50'
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
      {activeTab === 'comments' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search comments..."
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
              <option value="compliment">Compliment</option>
              <option value="booking">Booking</option>
              <option value="pricing">Pricing</option>
              <option value="question">Question</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="processing">Processing</option>
              <option value="replied">Replied</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Comments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredComments.map(renderCommentCard)}
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

export default InstagramCommentReplies;
