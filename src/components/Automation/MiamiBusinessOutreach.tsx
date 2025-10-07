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
  X
} from 'lucide-react';
import { miamiBusinessScraper, MiamiBusiness, BusinessResponse, AppointmentData, EventInvitation } from '../../services/miamiBusinessScraper';

const MiamiBusinessOutreach: React.FC = () => {
  const [businesses, setBusinesses] = useState<MiamiBusiness[]>([]);
  const [invitations, setInvitations] = useState<EventInvitation[]>([]);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'businesses' | 'invitations' | 'appointments' | 'analytics'>('overview');
  const [isScraping, setIsScraping] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<MiamiBusiness | null>(null);
  const [showBusinessDetails, setShowBusinessDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // 🏗️ Solution Architect - System Initialization
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const allBusinesses = miamiBusinessScraper.getAllBusinesses();
    const allInvitations = miamiBusinessScraper.getAllInvitations();
    const allAppointments = miamiBusinessScraper.getAllAppointments();
    const analyticsData = miamiBusinessScraper.getAnalytics();

    setBusinesses(allBusinesses);
    setInvitations(allInvitations);
    setAppointments(allAppointments);
    setAnalytics(analyticsData);
  };

  // 🗂️ Data Engineer - Data Scraping
  const handleScrapeBusinesses = async () => {
    setIsScraping(true);
    try {
      console.log('🏗️ Solution Architect: Starting Miami business scraping...');
      const scrapedBusinesses = await miamiBusinessScraper.scrapeMiamiBusinesses(100);
      setBusinesses(scrapedBusinesses);
      setAnalytics(miamiBusinessScraper.getAnalytics());
      console.log(`✅ Successfully scraped ${scrapedBusinesses.length} businesses`);
    } catch (error) {
      console.error('❌ Scraping failed:', error);
    } finally {
      setIsScraping(false);
    }
  };

  // 💬 Prompt/NLP Engineer - Email Invitation
  const handleSendInvitation = async (business: MiamiBusiness) => {
    try {
      const invitation = await miamiBusinessScraper.generateEventInvitation(business);
      
      // Simulate sending email
      console.log(`📧 Sending invitation to ${business.name}:`);
      console.log(invitation);
      
      // Update business status
      business.status = 'contacted';
      setBusinesses([...businesses]);
      setAnalytics(miamiBusinessScraper.getAnalytics());
      
      alert(`Invitation sent to ${business.name}!`);
    } catch (error) {
      console.error('❌ Failed to send invitation:', error);
    }
  };

  // 🤖 AI Employee - Phone Calling
  const handleMakePhoneCall = async (business: MiamiBusiness) => {
    if (!business.phone) {
      alert('No phone number available for this business');
      return;
    }

    try {
      const callResult = await miamiBusinessScraper.initiateAIPhoneCall(business.id);
      console.log(`📞 AI Phone call completed:`, callResult);
      alert(`AI phone call completed for ${business.name}. Call ID: ${callResult.callId}`);
    } catch (error) {
      console.error('❌ Phone call failed:', error);
    }
  };

  // 📋 Product Manager - Response Processing
  const handleProcessResponse = async (business: MiamiBusiness, responseText: string) => {
    try {
      const response = await miamiBusinessScraper.processBusinessResponse(business.id, responseText);
      console.log(`📝 Response processed:`, response);
      
      // Reload data
      await loadData();
      alert(`Response processed for ${business.name}!`);
    } catch (error) {
      console.error('❌ Failed to process response:', error);
    }
  };

  // 📅 Calendar Integration
  const handleScheduleAppointment = async (business: MiamiBusiness) => {
    const appointmentData = {
      preferredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      preferredTime: '10:00 AM',
      duration: 60,
      type: 'gallery_visit' as const,
      notes: `Appointment with ${business.name} - SEZA Gallery visit`
    };

    try {
      const appointment = await miamiBusinessScraper.scheduleAppointment(business.id, appointmentData);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      {/* 🎨 Lead Product Designer - Header */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Miami Business Outreach System
              </h1>
              <p className="text-gray-600 text-lg">
                SEZA Gallery Event Invitation & Business Development Platform
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleScrapeBusinesses}
                disabled={isScraping}
                className="btn-link-orange group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isScraping ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Zap className="w-5 h-5" />
                )}
                <span>{isScraping ? 'Scraping...' : 'Scrape Miami Businesses'}</span>
              </button>
            </div>
          </div>

          {/* 📊 Data Analyst/BI - Analytics Overview */}
          {analytics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Businesses</p>
                    <p className="text-3xl font-bold">{analytics.totalBusinesses}</p>
                  </div>
                  <Building2 className="w-8 h-8 text-blue-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Contacted</p>
                    <p className="text-3xl font-bold">{analytics.contacted}</p>
                  </div>
                  <Send className="w-8 h-8 text-green-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Interested</p>
                    <p className="text-3xl font-bold">{analytics.interested}</p>
                  </div>
                  <UserCheck className="w-8 h-8 text-purple-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">Scheduled</p>
                    <p className="text-3xl font-bold">{analytics.scheduled}</p>
                  </div>
                  <CalendarDays className="w-8 h-8 text-orange-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 🎯 Design Systems Designer - Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex space-x-1 mb-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'businesses', label: 'Businesses', icon: Building2 },
              { id: 'invitations', label: 'Invitations', icon: Mail },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* 🔍 UX Researcher - Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">System Overview</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">🎯 Campaign Goals</h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Scrape 100+ Miami businesses from Google Maps</li>
                    <li>• Send personalized SEZA Gallery event invitations</li>
                    <li>• Process responses with AI-powered sentiment analysis</li>
                    <li>• Schedule gallery visits and appointments</li>
                    <li>• Make AI-powered phone calls for follow-ups</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">🤖 AI Features</h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• Intelligent response processing</li>
                    <li>• Automated phone calling system</li>
                    <li>• Calendar integration for appointments</li>
                    <li>• Professional email generation</li>
                    <li>• Real-time analytics and reporting</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'businesses' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Miami Businesses ({filteredBusinesses.length})</h2>
                <button className="btn-link-orange group flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBusinesses.map((business) => {
                  const isSEZA = business.id === 'seza_team_engineers_001';
                  return (
                  <div key={business.id} className={`rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-300 ${
                    isSEZA 
                      ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300 shadow-blue-200' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`text-lg font-semibold ${isSEZA ? 'text-blue-800' : 'text-gray-800'}`}>
                            {business.name}
                          </h3>
                          {isSEZA && (
                            <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full">
                              SEZA
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mb-2 ${isSEZA ? 'text-blue-600' : 'text-gray-600'}`}>
                          {business.category}
                        </p>
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{business.rating.toFixed(1)} ({business.reviewCount} reviews)</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(business.status)}`}>
                        {getStatusIcon(business.status)}
                        <span className="capitalize">{business.status}</span>
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{business.address}</span>
                      </div>
                      {business.phone && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{business.phone}</span>
                        </div>
                      )}
                      {business.email && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{business.email}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {business.status === 'scraped' && (
                        <>
                          <button
                            onClick={() => handleSendInvitation(business)}
                            className="btn-link-orange group flex items-center space-x-1 px-3 py-2 text-sm"
                          >
                            <Send className="w-4 h-4" />
                            <span>Send Invitation</span>
                          </button>
                          {business.phone && (
                            <button
                              onClick={() => handleMakePhoneCall(business)}
                              className="btn-link-orange group flex items-center space-x-1 px-3 py-2 text-sm"
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
                          className="btn-link-orange group flex items-center space-x-1 px-3 py-2 text-sm"
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
                        className="btn-link-orange group flex items-center space-x-1 px-3 py-2 text-sm"
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
              <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Response Rate</h3>
                  <p className="text-3xl font-bold text-blue-600">{analytics.responseRate.toFixed(1)}%</p>
                  <p className="text-sm text-blue-600">Businesses that responded</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Interest Rate</h3>
                  <p className="text-3xl font-bold text-green-600">{analytics.interestRate.toFixed(1)}%</p>
                  <p className="text-sm text-green-600">Businesses interested</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Scheduling Rate</h3>
                  <p className="text-3xl font-bold text-purple-600">{analytics.schedulingRate.toFixed(1)}%</p>
                  <p className="text-sm text-purple-600">Appointments scheduled</p>
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
                    {selectedBusiness.phone && <p><span className="font-medium">Phone:</span> {selectedBusiness.phone}</p>}
                    {selectedBusiness.email && <p><span className="font-medium">Email:</span> {selectedBusiness.email}</p>}
                    {selectedBusiness.website && <p><span className="font-medium">Website:</span> <a href={selectedBusiness.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{selectedBusiness.website}</a></p>}
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
                
                {selectedBusiness.responseData && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Response Data</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p><span className="font-medium">Response Type:</span> {selectedBusiness.responseData.responseType}</p>
                      <p><span className="font-medium">Response:</span> {selectedBusiness.responseData.responseText}</p>
                      <p><span className="font-medium">Follow-up Required:</span> {selectedBusiness.responseData.followUpRequired ? 'Yes' : 'No'}</p>
                      {selectedBusiness.responseData.notes && <p><span className="font-medium">Notes:</span> {selectedBusiness.responseData.notes}</p>}
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

export default MiamiBusinessOutreach;
