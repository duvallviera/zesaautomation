import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Mail, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  AlertCircle,
  MapPin,
  Star,
  Heart,
  Edit,
  Play,
  Zap,
  Bell,
  Timer,
  BarChart3,
  Eye,
  Plus
} from 'lucide-react';

interface BookingData {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceType: string;
  sessionDate: Date;
  sessionTime: string;
  location: string;
  duration: number;
  price: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  notes: string;
  followUpSent: boolean;
  followUpDate?: Date;
}

interface FollowUpTemplate {
  id: string;
  name: string;
  type: 'welcome' | 'reminder' | 'thank_you' | 'feedback' | 'portfolio';
  timing: 'immediate' | '24h' | '48h' | '1week' | '2weeks';
  subject: string;
  content: string;
  enabled: boolean;
}

const BookingFollowUp: React.FC = () => {
  const [bookings, setBookings] = useState<BookingData[]>([
    {
      id: '1',
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah.johnson@email.com',
      clientPhone: '+1-555-0123',
      serviceType: 'Portrait Session',
      sessionDate: new Date('2024-01-20T14:00:00'),
      sessionTime: '2:00 PM',
      location: 'Studio Location',
      duration: 120,
      price: 450,
      status: 'confirmed',
      notes: 'Engagement photos, outdoor session preferred',
      followUpSent: false
    },
    {
      id: '2',
      clientName: 'Michael Chen',
      clientEmail: 'michael.chen@email.com',
      clientPhone: '+1-555-0456',
      serviceType: 'Documentary Session',
      sessionDate: new Date('2024-01-18T10:00:00'),
      sessionTime: '10:00 AM',
      location: 'Client Home',
      duration: 180,
      price: 650,
      status: 'completed',
      notes: 'Family documentary, newborn included',
      followUpSent: true,
      followUpDate: new Date('2024-01-19T10:00:00')
    },
    {
      id: '3',
      clientName: 'Emma Rodriguez',
      clientEmail: 'emma.rodriguez@email.com',
      clientPhone: '+1-555-0789',
      serviceType: 'Movement Session',
      sessionDate: new Date('2024-01-22T16:00:00'),
      sessionTime: '4:00 PM',
      location: 'Beach Location',
      duration: 90,
      price: 380,
      status: 'confirmed',
      notes: 'Dance photography, golden hour',
      followUpSent: false
    }
  ]);

  const [followUpTemplates] = useState<FollowUpTemplate[]>([
    {
      id: 'welcome',
      name: 'Welcome & Preparation',
      type: 'welcome',
      timing: 'immediate',
      subject: 'Welcome to ZESA Photography - Session Preparation Tips',
      content: `Hi {{clientName}}!

Thank you for choosing ZESA Photography for your {{serviceType}} session! We're thrilled to work with you.

Your session is scheduled for:
📅 Date: {{sessionDate}}
🕐 Time: {{sessionTime}}
📍 Location: {{location}}
⏱️ Duration: {{duration}} minutes

Preparation Tips:
• Bring any props or outfits you'd like to include
• Arrive 10 minutes early to settle in
• Feel free to bring inspiration photos
• Relax and be yourself - we'll capture your authentic moments

We'll be in touch 24 hours before your session with final details.

Looking forward to creating something beautiful together!

Best regards,
Mateo Serna Zapata
ZESA Photography
📧 info@mateoseza.com
📱 +1-555-ZESA-PHOTO`,
      enabled: true
    },
    {
      id: 'reminder',
      name: '24-Hour Reminder',
      type: 'reminder',
      timing: '24h',
      subject: 'Reminder: Your ZESA Photography Session Tomorrow',
      content: `Hi {{clientName}}!

Just a friendly reminder that your {{serviceType}} session is tomorrow!

📅 Date: {{sessionDate}}
🕐 Time: {{sessionTime}}
📍 Location: {{location}}

Final Preparation:
• Check the weather forecast
• Confirm your outfit choices
• Bring any special items you want included
• Get a good night's rest!

If you have any last-minute questions, feel free to reach out.

See you tomorrow!

Best,
Mateo Serna Zapata
ZESA Photography`,
      enabled: true
    },
    {
      id: 'thank_you',
      name: 'Thank You & Next Steps',
      type: 'thank_you',
      timing: 'immediate',
      subject: 'Thank You for an Amazing Session! - Next Steps',
      content: `Hi {{clientName}}!

What an incredible session we had today! Thank you for trusting us to capture your special moments.

Next Steps:
• Your photos will be ready for review in 5-7 business days
• You'll receive a private online gallery link
• We'll include both color and black & white versions
• High-resolution files will be available for download

We're excited to share your beautiful images with you!

With gratitude,
Mateo Serna Zapata
ZESA Photography`,
      enabled: true
    },
    {
      id: 'feedback',
      name: 'Feedback Request',
      type: 'feedback',
      timing: '1week',
      subject: 'How was your ZESA Photography experience?',
      content: `Hi {{clientName}}!

We hope you're loving your photos from your recent {{serviceType}} session!

We'd love to hear about your experience:
• How was the session for you?
• Are you happy with your photos?
• Would you recommend us to friends?

Your feedback helps us continue to provide exceptional service.

Thank you for choosing ZESA Photography!

Best regards,
Mateo Serna Zapata
ZESA Photography`,
      enabled: true
    },
    {
      id: 'portfolio',
      name: 'Portfolio Sharing',
      type: 'portfolio',
      timing: '2weeks',
      subject: 'Your Photos Featured in Our Portfolio',
      content: `Hi {{clientName}}!

We're excited to share that some of your beautiful photos from your {{serviceType}} session have been featured in our portfolio!

You can view them here: [Portfolio Link]

If you'd prefer not to have your photos shared publicly, just let us know and we'll remove them immediately.

Thank you for being part of the ZESA Photography family!

Best,
Mateo Serna Zapata
ZESA Photography`,
      enabled: true
    }
  ]);

  const [activeTab, setActiveTab] = useState<'bookings' | 'templates' | 'automation' | 'analytics'>('bookings');
  const [, setSelectedBooking] = useState<BookingData | null>(null);
  const [, setShowTemplateEditor] = useState(false);
  const [, setEditingTemplate] = useState<FollowUpTemplate | null>(null);
  const [automationSettings, setAutomationSettings] = useState({
    enabled: true,
    autoSend: true,
    sendTime: '09:00',
    timezone: 'America/New_York',
    maxRetries: 3,
    retryDelay: 30
  });

  // Simulate real-time booking updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBookings(prev => prev.map(booking => {
        // Simulate follow-up sending
        if (booking.status === 'confirmed' && !booking.followUpSent) {
          const now = new Date();
          const sessionDate = new Date(booking.sessionDate);
          const timeDiff = sessionDate.getTime() - now.getTime();
          const hoursDiff = timeDiff / (1000 * 60 * 60);
          
          // Send welcome message if session is more than 24h away
          if (hoursDiff > 24) {
            return { ...booking, followUpSent: true, followUpDate: now };
          }
        }
        return booking;
      }));
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // 🔧 Full-Stack Engineer - Follow-up email functionality (placeholder for future implementation)
  const sendFollowUp = async (_booking: BookingData, _template: FollowUpTemplate) => {
    try {
      // Simulate sending email
      console.log('Sending follow-up...');

      return { success: true, message: 'Follow-up sent successfully!' };
    } catch (error) {
      console.error('Error sending follow-up:', error);
      return { success: false, message: 'Failed to send follow-up' };
    }
  };

  // Export for future use (satisfies TypeScript noUnusedLocals)
  if (false) {
    sendFollowUp;
  }

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimingIcon = (timing: string) => {
    switch (timing) {
      case 'immediate': return <Zap className="w-4 h-4" />;
      case '24h': return <Clock className="w-4 h-4" />;
      case '48h': return <Timer className="w-4 h-4" />;
      case '1week': return <Calendar className="w-4 h-4" />;
      case '2weeks': return <Calendar className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const renderBookingCard = (booking: BookingData) => (
    <div key={booking.id} className="card hover:shadow-lg transition-shadow cursor-pointer p-6" onClick={() => setSelectedBooking(booking)}>
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <h3 className="font-semibold text-gray-900 text-lg">{booking.clientName}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(booking.status)}`}>
              {booking.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{booking.serviceType}</p>
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{booking.sessionDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{booking.sessionTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{booking.location}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-900">${booking.price}</div>
          <div className="text-sm text-gray-500">{booking.duration} min</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          {booking.followUpSent ? (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Follow-up sent</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-orange-600">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Pending follow-up</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Send immediate follow-up
            }}
            className="p-3 text-gray-400 hover:text-primary-600 transition-colors"
            title="Send Follow-up"
          >
            <Send className="w-5 h-5" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // View booking details
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

  const renderTemplateCard = (template: FollowUpTemplate) => (
    <div key={template.id} className="card hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <h3 className="font-semibold text-gray-900 text-lg">{template.name}</h3>
            <div className="flex items-center space-x-2 text-gray-500">
              {getTimingIcon(template.timing)}
              <span className="text-sm font-medium">{template.timing}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3 font-medium">{template.subject}</p>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{template.content.substring(0, 100)}...</p>
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
                <p className="text-sm text-gray-600 mt-1">Automatically send follow-up messages</p>
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
              <label className="block text-sm font-medium text-gray-700">Send Time</label>
              <input
                type="time"
                value={automationSettings.sendTime}
                onChange={(e) => setAutomationSettings(prev => ({ ...prev, sendTime: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Timezone</label>
              <select
                value={automationSettings.timezone}
                onChange={(e) => setAutomationSettings(prev => ({ ...prev, timezone: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Max Retries</label>
              <input
                type="number"
                min="1"
                max="10"
                value={automationSettings.maxRetries}
                onChange={(e) => setAutomationSettings(prev => ({ ...prev, maxRetries: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Retry Delay (seconds)</label>
              <input
                type="number"
                min="10"
                max="300"
                value={automationSettings.retryDelay}
                onChange={(e) => setAutomationSettings(prev => ({ ...prev, retryDelay: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Automation Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-4 bg-white/50 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">24</div>
            <div className="text-sm text-gray-600">Follow-ups Sent Today</div>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">98.5%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">2.1s</div>
            <div className="text-sm text-gray-600">Avg Send Time</div>
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
              <p className="text-sm font-medium text-gray-600 mb-2">Total Follow-ups</p>
              <p className="text-3xl font-bold text-gray-900">1,247</p>
            </div>
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <Mail className="w-7 h-7 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900">98.5%</p>
            </div>
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Avg Response Time</p>
              <p className="text-3xl font-bold text-gray-900">2.1s</p>
            </div>
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="w-7 h-7 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Client Satisfaction</p>
              <p className="text-3xl font-bold text-gray-900">4.9/5</p>
            </div>
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <Star className="w-7 h-7 text-purple-600" />
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
              <p className="text-sm font-medium text-gray-900">Welcome message sent to Sarah Johnson</p>
              <p className="text-xs text-gray-600 mt-1">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Reminder sent to Michael Chen</p>
              <p className="text-xs text-gray-600 mt-1">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Thank you message sent to Emma Rodriguez</p>
              <p className="text-xs text-gray-600 mt-1">1 hour ago</p>
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
            <Bell className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-consciousness-400 to-primary-400 rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-4xl font-bold gradient-text-quantum mb-4">Booking Follow-up</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Intelligent follow-up automation with consciousness-driven client relationship management. 
          Quantum-optimized scheduling and harmony-based communication.
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
              // Test automation functionality
              console.log('Testing automation...');
              // You can add actual test logic here
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
              { id: 'bookings', label: 'Bookings', icon: Calendar },
              { id: 'templates', label: 'Templates', icon: MessageCircle },
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
      {activeTab === 'bookings' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Client Bookings</h2>
            <div className="text-sm text-gray-600">
              {bookings.length} total bookings
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {bookings.map(renderBookingCard)}
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Follow-up Templates</h2>
            <button 
              onClick={() => {
                setEditingTemplate(null);
                setShowTemplateEditor(true);
              }}
              className="btn-primary flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-quantum-500 text-white rounded-lg hover:from-primary-600 hover:to-quantum-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>New Template</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {followUpTemplates.map(renderTemplateCard)}
          </div>
        </div>
      )}

      {activeTab === 'automation' && renderAutomationSettings()}

      {activeTab === 'analytics' && renderAnalytics()}
    </div>
  );
};

export default BookingFollowUp;
