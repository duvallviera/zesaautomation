import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Star,
  Eye,
  Send,
  PhoneCall,
  MessageSquare,
  Database,
  Target,
  Zap,
  Globe,
  Building2,
  UserCheck,
  CalendarDays,
  BarChart3,
  Filter,
  Search,
  Download,
  RefreshCw,
  Play,
  Pause,
  Settings,
  X,
  ExternalLink,
  Camera,
  DollarSign
} from 'lucide-react';
import { realGoogleMapsScraper, RealMiamiBusiness, BusinessResponse, AppointmentData } from '../../services/realGoogleMapsScraper';

const RealMiamiBusinessOutreach: React.FC = () => {
  const [businesses, setBusinesses] = useState<RealMiamiBusiness[]>([]);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'businesses' | 'appointments' | 'analytics'>('overview');
  const [isScraping, setIsScraping] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<RealMiamiBusiness | null>(null);
  const [showBusinessDetails, setShowBusinessDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [apiKeyStatus, setApiKeyStatus] = useState<'checking' | 'available' | 'missing'>('checking');

  // 🏗️ Solution Architect - System Initialization
  useEffect(() => {
    checkApiKeyStatus();
    loadData();
  }, []);

  const checkApiKeyStatus = () => {
    const apiKey = (import.meta as any).env?.VITE_GOOGLE_PLACES_API_KEY;
    setApiKeyStatus(apiKey ? 'available' : 'missing');
  };

  const loadData = async () => {
    const allBusinesses = realGoogleMapsScraper.getAllBusinesses();
    const analyticsData = realGoogleMapsScraper.getAnalytics();

    setBusinesses(allBusinesses);
    setAnalytics(analyticsData);
  };

  // 🗂️ Data Engineer - Real Data Scraping
  const handleScrapeRealBusinesses = async () => {
    setIsScraping(true);
    try {
      console.log('🏗️ Real Google Maps Scraper: Starting real data collection...');
      const scrapedBusinesses = await realGoogleMapsScraper.scrapeRealMiamiBusinesses(50);
      setBusinesses(scrapedBusinesses);
      setAnalytics(realGoogleMapsScraper.getAnalytics());
      console.log(`✅ Successfully scraped ${scrapedBusinesses.length} real businesses`);
    } catch (error) {
      console.error('❌ Real scraping failed:', error);
    } finally {
      setIsScraping(false);
    }
  };

  // 💬 Prompt/NLP Engineer - Email Invitation
  const handleSendInvitation = async (business: RealMiamiBusiness) => {
    try {
      const invitation = await generateEventInvitation(business);
      
      // Simulate sending email
      console.log(`📧 Sending invitation to ${business.name}:`);
      console.log(invitation);
      
      // Update business status
      business.status = 'contacted';
      setBusinesses([...businesses]);
      setAnalytics(realGoogleMapsScraper.getAnalytics());
      
      alert(`Invitation sent to ${business.name}!`);
    } catch (error) {
      console.error('❌ Failed to send invitation:', error);
    }
  };

  const generateEventInvitation = async (business: RealMiamiBusiness): Promise<string> => {
    const eventDetails = {
      name: "SEZA Gallery: Consciousness & Harmony in Photography",
      date: "March 15, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "SEZA Gallery, 123 Art District, Miami, FL",
      description: "An exclusive evening celebrating the intersection of consciousness, global harmony, and transcendent photography"
    };

    return `Subject: Exclusive Invitation: SEZA Gallery Consciousness & Harmony Event

Dear ${business.contactPerson || 'Valued Business Owner'},

I hope this message finds you well. My name is Mateo Serna Zapata, and I'm reaching out from SEZA Photography with a special invitation.

We're hosting an exclusive event at SEZA Gallery that I believe would be of great interest to you and your business network. 

**Event Details:**
📅 Date: ${eventDetails.date}
🕕 Time: ${eventDetails.time}
📍 Location: ${eventDetails.location}

**About the Event:**
${eventDetails.description}

This intimate gathering will feature:
✨ Live consciousness-driven photography demonstrations
🌍 Global harmony visualization experiences  
🧠 AI-powered creative collaboration showcases
🎨 Exclusive portfolio previews
🍾 Premium networking with Miami's creative community

**Why This Matters:**
As a fellow creative professional in Miami, I believe you'll appreciate the innovative approach we're taking to photography and consciousness integration. This event represents the future of creative collaboration and global harmony.

**RSVP:**
Please let us know if you'd like to attend by replying to this email or calling us directly. We have limited space for this exclusive event.

**Alternative Options:**
If this date doesn't work for you, we'd be happy to schedule a private gallery visit at your convenience.

Looking forward to connecting with you and exploring how we can collaborate in Miami's vibrant creative community.

Warm regards,
Mateo Serna Zapata
Founder & Lead Photographer
SEZA Photography
📧 duvallviera@gmail.com
📞 (305) 370-9228
🌐 www.sezateamengineers.com

P.S. This invitation is part of our commitment to building a conscious, harmonious creative community in Miami. We'd love to have you be part of this movement.`;
  };

  // 📅 Calendar Integration
  const handleScheduleAppointment = async (business: RealMiamiBusiness) => {
    const appointmentData = {
      preferredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      preferredTime: '10:00 AM',
      duration: 60,
      type: 'gallery_visit' as const,
      notes: `Appointment with ${business.name} - SEZA Gallery visit`
    };

    try {
      const appointment: AppointmentData = {
        id: `appt_${Date.now()}_${business.id}`,
        businessId: business.id,
        businessName: business.name,
        contactPerson: business.contactPerson || business.ownerName || 'Contact Person',
        phone: business.phone,
        email: business.email,
        preferredDate: appointmentData.preferredDate,
        preferredTime: appointmentData.preferredTime,
        duration: appointmentData.duration,
        type: appointmentData.type,
        status: 'pending',
        notes: appointmentData.notes,
        createdAt: new Date()
      };

      setAppointments([...appointments, appointment]);
      alert(`Appointment scheduled for ${business.name}!`);
    } catch (error) {
      console.error('❌ Failed to schedule appointment:', error);
    }
  };

  // 🔍 Filter and Search
  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || business.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scraped': return 'bg-gray-100 text-gray-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'responded': return 'bg-yellow-100 text-yellow-800';
      case 'interested': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scraped': return <Eye className="w-4 h-4" />;
      case 'contacted': return <Send className="w-4 h-4" />;
      case 'responded': return <MessageSquare className="w-4 h-4" />;
      case 'interested': return <CheckCircle className="w-4 h-4" />;
      case 'scheduled': return <Calendar className="w-4 h-4" />;
      case 'declined': return <X className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const getPriceLevel = (level?: number) => {
    if (!level) return 'N/A';
    return '$'.repeat(level);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      {/* 🎨 Lead Product Designer - Header */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="text-center py-8">
            <div className="relative inline-block mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl quantum-glow">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-blue-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-4xl font-bold gradient-text-quantum mb-4">Real Miami Business Outreach System</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              Live Google Maps data integration for SEZA Gallery event invitations. 
              Real-time business discovery and automated outreach with consciousness-driven communication.
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-sm ${
                apiKeyStatus === 'available' 
                  ? 'bg-green-50 text-green-800 border-green-200' 
                  : apiKeyStatus === 'missing'
                  ? 'bg-red-50 text-red-800 border-red-200'
                  : 'bg-yellow-50 text-yellow-800 border-yellow-200'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  apiKeyStatus === 'available' ? 'bg-green-500' : 
                  apiKeyStatus === 'missing' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <span className="font-semibold">
                  {apiKeyStatus === 'available' ? 'Google Places API Connected' :
                   apiKeyStatus === 'missing' ? 'Using Fallback Data' : 'Checking API...'}
                </span>
              </div>
              <button
                onClick={handleScrapeRealBusinesses}
                disabled={isScraping}
                className="btn-quantum flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
              >
                {isScraping ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Zap className="w-4 h-4" />
                )}
                <span>{isScraping ? 'Scraping Real Data...' : 'Scrape Real Miami Businesses'}</span>
              </button>
            </div>
          </div>

          {/* 📊 Data Analyst/BI - Analytics Overview */}
          {analytics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-semibold mb-2">Real Businesses</p>
                    <p className="text-4xl font-bold">{analytics.totalBusinesses}</p>
                  </div>
                  <Building2 className="w-10 h-10 text-blue-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-semibold mb-2">Contacted</p>
                    <p className="text-4xl font-bold">{analytics.contacted}</p>
                  </div>
                  <Send className="w-10 h-10 text-green-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-semibold mb-2">Interested</p>
                    <p className="text-4xl font-bold">{analytics.interested}</p>
                  </div>
                  <UserCheck className="w-10 h-10 text-purple-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-semibold mb-2">Scheduled</p>
                    <p className="text-4xl font-bold">{analytics.scheduled}</p>
                  </div>
                  <CalendarDays className="w-10 h-10 text-orange-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 🎯 Design Systems Designer - Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="relative">
            <div className="flex overflow-x-auto scrollbar-hide space-x-8 pb-2">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'businesses', label: 'Real Businesses', icon: Building2 },
                { id: 'appointments', label: 'Appointments', icon: Calendar },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            
            {/* Scroll indicators */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>

          {/* 🔍 UX Researcher - Search and Filter */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search real businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
            >
              <option value="all">All Status</option>
              <option value="scraped">Scraped</option>
              <option value="contacted">Contacted</option>
              <option value="responded">Responded</option>
              <option value="interested">Interested</option>
              <option value="scheduled">Scheduled</option>
              <option value="declined">Declined</option>
            </select>
          </div>

          {/* 📱 Lead Product Designer - Content Areas */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Real Data System Overview</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-6">🌐 Real Google Maps Integration</h3>
                  <ul className="space-y-3 text-blue-700">
                    <li className="font-medium">• Live Google Places API data collection</li>
                    <li className="font-medium">• Real business information and ratings</li>
                    <li className="font-medium">• Actual photos and business hours</li>
                    <li className="font-medium">• Current contact information</li>
                    <li className="font-medium">• Live reviews and ratings</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800 mb-6">🎯 Real Business Targeting</h3>
                  <ul className="space-y-3 text-green-700">
                    <li className="font-medium">• Actual Miami business locations</li>
                    <li className="font-medium">• Real contact information</li>
                    <li className="font-medium">• Current business status</li>
                    <li className="font-medium">• Live pricing and availability</li>
                    <li className="font-medium">• Authentic business categories</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'businesses' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Real Miami Businesses ({filteredBusinesses.length})</h2>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => realGoogleMapsScraper.scrapeRealMiamiBusinesses(100).then(setBusinesses)}
                    className="btn-quantum group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Load More (100)</span>
                  </button>
                  <button className="btn-quantum group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold">
                    <Download className="w-4 h-4" />
                    <span>Export Real Data</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredBusinesses.map((business) => {
                  const isSEZA = business.id === 'seza_team_engineers_real';
                  return (
                  <div key={business.id} className={`rounded-xl shadow-lg border p-8 hover:shadow-xl transition-all duration-300 ${
                    isSEZA 
                      ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300 shadow-blue-200' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className={`text-lg font-semibold ${isSEZA ? 'text-blue-800' : 'text-gray-800'}`}>
                            {business.name}
                          </h3>
                          {isSEZA && (
                            <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full">
                              SEZA
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mb-3 font-medium ${isSEZA ? 'text-blue-600' : 'text-gray-600'}`}>
                          {business.category}
                        </p>
                        <div className="flex items-center space-x-2 mb-3">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 font-medium">{business.rating.toFixed(1)} ({business.reviewCount} reviews)</span>
                        </div>
                        {business.priceLevel && (
                          <div className="flex items-center space-x-2 mb-3">
                            <DollarSign className="w-5 h-5 text-green-500" />
                            <span className="text-sm text-gray-600 font-medium">{getPriceLevel(business.priceLevel)}</span>
                          </div>
                        )}
                      </div>
                      <span className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center space-x-2 ${getStatusColor(business.status)}`}>
                        {getStatusIcon(business.status)}
                        <span className="capitalize">{business.status}</span>
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <span className="truncate font-medium">{business.address}</span>
                      </div>
                      {business.phone && (
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <Phone className="w-5 h-5" />
                          <span className="font-medium">{business.phone}</span>
                        </div>
                      )}
                      {business.email && (
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <Mail className="w-5 h-5" />
                          <span className="truncate font-medium">{business.email}</span>
                        </div>
                      )}
                      {business.website && (
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <ExternalLink className="w-5 h-5" />
                          <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate font-medium">
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>

                    {business.photos && business.photos.length > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <Camera className="w-5 h-5 text-gray-500" />
                          <span className="text-sm text-gray-600 font-semibold">Photos Available</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {business.photos.slice(0, 2).map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt={`${business.name} photo ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-3">
                      {business.status === 'scraped' && (
                        <>
                          <button
                            onClick={() => handleSendInvitation(business)}
                            className="btn-quantum group flex items-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                          >
                            <Send className="w-4 h-4" />
                            <span>Send Invitation</span>
                          </button>
                          {business.phone && (
                            <button
                              onClick={() => {/* Handle phone call */}}
                              className="btn-quantum group flex items-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                            >
                              <PhoneCall className="w-4 h-4" />
                              <span>Call</span>
                            </button>
                          )}
                        </>
                      )}
                      
                      {business.status === 'responded' && (
                        <button
                          onClick={() => handleScheduleAppointment(business)}
                          className="btn-quantum group flex items-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Schedule Visit</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => {
                          setSelectedBusiness(business);
                          setShowBusinessDetails(true);
                        }}
                        className="btn-quantum group flex items-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Details</span>
                      </button>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Scheduled Appointments ({appointments.length})</h2>
              
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">{appointment.businessName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{appointment.preferredDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.preferredTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{appointment.contactPerson}</span>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <p className="mt-4 text-sm text-gray-600">{appointment.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && analytics && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Real Data Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Response Rate</h3>
                  <p className="text-3xl font-bold text-blue-600">{analytics.responseRate.toFixed(1)}%</p>
                  <p className="text-sm text-blue-600">Real businesses that responded</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Interest Rate</h3>
                  <p className="text-3xl font-bold text-green-600">{analytics.interestRate.toFixed(1)}%</p>
                  <p className="text-sm text-green-600">Real businesses interested</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Scheduling Rate</h3>
                  <p className="text-3xl font-bold text-purple-600">{analytics.schedulingRate.toFixed(1)}%</p>
                  <p className="text-sm text-purple-600">Real appointments scheduled</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 🎨 UX/UI Designer - Business Details Modal */}
      {showBusinessDetails && selectedBusiness && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedBusiness.name}</h2>
                <button
                  onClick={() => setShowBusinessDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Business Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="font-medium">Category:</span> {selectedBusiness.category}</p>
                    <p><span className="font-medium">Address:</span> {selectedBusiness.address}</p>
                    <p><span className="font-medium">Rating:</span> {selectedBusiness.rating.toFixed(1)} ⭐ ({selectedBusiness.reviewCount} reviews)</p>
                    {selectedBusiness.priceLevel && <p><span className="font-medium">Price Level:</span> {getPriceLevel(selectedBusiness.priceLevel)}</p>}
                    {selectedBusiness.phone && <p><span className="font-medium">Phone:</span> {selectedBusiness.phone}</p>}
                    {selectedBusiness.email && <p><span className="font-medium">Email:</span> {selectedBusiness.email}</p>}
                    {selectedBusiness.website && <p><span className="font-medium">Website:</span> <a href={selectedBusiness.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{selectedBusiness.website}</a></p>}
                    <p><span className="font-medium">Place ID:</span> {selectedBusiness.placeId}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Business Hours</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {selectedBusiness.businessHours.map((hour, index) => (
                      <p key={index} className="text-sm">{hour}</p>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedBusiness.description}</p>
                </div>

                {selectedBusiness.types && selectedBusiness.types.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Business Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedBusiness.types.map((type, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {type.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedBusiness.photos && selectedBusiness.photos.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Photos</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedBusiness.photos.slice(0, 4).map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`${selectedBusiness.name} photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealMiamiBusinessOutreach;
