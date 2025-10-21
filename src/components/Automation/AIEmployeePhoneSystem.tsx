import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  User, 
  Clock, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  Headphones,
  Zap,
  Brain,
  Heart,
  Star,
  Calendar,
  Mail,
  Building2,
  Target,
  TrendingUp
} from 'lucide-react';

interface CallSession {
  id: string;
  businessId: string;
  businessName: string;
  phoneNumber: string;
  contactPerson: string;
  status: 'dialing' | 'ringing' | 'connected' | 'on_hold' | 'transferred' | 'completed' | 'failed';
  startTime: Date;
  endTime?: Date;
  duration: number;
  transcript: string[];
  aiResponses: string[];
  humanIntervention: boolean;
  outcome: 'interested' | 'not_interested' | 'callback_requested' | 'transferred' | 'no_answer' | 'busy';
  notes: string;
  followUpRequired: boolean;
  nextAction?: string;
}

interface AIEmployee {
  id: string;
  name: string;
  voice: string;
  personality: string;
  specialization: string;
  active: boolean;
  currentCall?: string;
  totalCalls: number;
  successRate: number;
  averageCallDuration: number;
}

const AIEmployeePhoneSystem: React.FC = () => {
  const [aiEmployees, setAiEmployees] = useState<AIEmployee[]>([
    {
      id: 'ai_sarah',
      name: 'Sarah Chen',
      voice: 'Professional Female',
      personality: 'Warm, Professional, Persuasive',
      specialization: 'Event Invitations & Gallery Visits',
      active: true,
      totalCalls: 0,
      successRate: 0,
      averageCallDuration: 0
    },
    {
      id: 'ai_marcus',
      name: 'Marcus Rodriguez',
      voice: 'Professional Male',
      personality: 'Confident, Friendly, Results-Oriented',
      specialization: 'Business Development & Partnerships',
      active: true,
      totalCalls: 0,
      successRate: 0,
      averageCallDuration: 0
    },
    {
      id: 'ai_elena',
      name: 'Elena Vasquez',
      voice: 'Professional Female',
      personality: 'Empathetic, Knowledgeable, Patient',
      specialization: 'Follow-up Calls & Relationship Building',
      active: true,
      totalCalls: 0,
      successRate: 0,
      averageCallDuration: 0
    }
  ]);

  const [activeCalls, setActiveCalls] = useState<CallSession[]>([]);
  const [callHistory, setCallHistory] = useState<CallSession[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<AIEmployee | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [currentCall, setCurrentCall] = useState<CallSession | null>(null);
  const [callVolume, setCallVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // 🤖 AI Orchestration Lead - System Initialization
  useEffect(() => {
    loadCallHistory();
  }, []);

  const loadCallHistory = () => {
    // Simulate loading call history
    const mockHistory: CallSession[] = [
      {
        id: 'call_001',
        businessId: 'biz_001',
        businessName: 'Elite Photography Studio',
        phoneNumber: '(305) 555-0123',
        contactPerson: 'Maria Garcia',
        status: 'completed',
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        endTime: new Date(Date.now() - 2 * 60 * 60 * 1000 + 4 * 60 * 1000),
        duration: 240,
        transcript: [
          'AI: Hello, this is Sarah from SEZA Photography. I\'m calling to invite you to our exclusive consciousness and harmony photography event.',
          'Business: That sounds interesting. When is it?',
          'AI: The event is on March 15th at 6 PM at our SEZA Gallery in the Art District. It\'s a unique opportunity to experience consciousness-driven photography.',
          'Business: I\'d love to learn more. Can you send me details?',
          'AI: Absolutely! I\'ll have our event coordinator send you the complete information. Thank you for your interest!'
        ],
        aiResponses: [
          'Event invitation delivered',
          'Interest confirmed',
          'Follow-up information requested'
        ],
        humanIntervention: false,
        outcome: 'interested',
        notes: 'Very interested in the event. Requested detailed information.',
        followUpRequired: true,
        nextAction: 'Send detailed event information via email'
      }
    ];
    setCallHistory(mockHistory);
  };

  // 📞 AI Employee - Phone Calling
  const initiateCall = async (businessId: string, businessName: string, phoneNumber: string, contactPerson: string) => {
    if (!selectedEmployee) {
      alert('Please select an AI employee first');
      return;
    }

    const callSession: CallSession = {
      id: `call_${Date.now()}`,
      businessId,
      businessName,
      phoneNumber,
      contactPerson,
      status: 'dialing',
      startTime: new Date(),
      duration: 0,
      transcript: [],
      aiResponses: [],
      humanIntervention: false,
      outcome: 'not_interested',
      notes: '',
      followUpRequired: false
    };

    setActiveCalls(prev => [...prev, callSession]);
    setCurrentCall(callSession);
    setIsCalling(true);

    // Simulate call progression
    setTimeout(() => {
      updateCallStatus(callSession.id, 'ringing');
    }, 1000);

    setTimeout(() => {
      updateCallStatus(callSession.id, 'connected');
      simulateAIConversation(callSession);
    }, 3000);
  };

  const updateCallStatus = (callId: string, status: CallSession['status']) => {
    setActiveCalls(prev => prev.map(call => 
      call.id === callId ? { ...call, status } : call
    ));
    
    if (currentCall?.id === callId) {
      setCurrentCall(prev => prev ? { ...prev, status } : null);
    }
  };

  const simulateAIConversation = (callSession: CallSession) => {
    const conversationSteps = [
      {
        ai: "Hello, this is Sarah from SEZA Photography. I'm calling to invite you to our exclusive consciousness and harmony photography event.",
        business: "That sounds interesting. Tell me more about it.",
        delay: 2000
      },
      {
        ai: "The event is on March 15th at 6 PM at our SEZA Gallery in the Art District. It's a unique opportunity to experience consciousness-driven photography and network with Miami's creative community.",
        business: "I'd love to learn more. Can you send me details?",
        delay: 3000
      },
      {
        ai: "Absolutely! I'll have our event coordinator send you the complete information. Would you also be interested in scheduling a private gallery visit?",
        business: "Yes, that would be great. I'm available next week.",
        delay: 2500
      },
      {
        ai: "Perfect! I'll transfer you to our scheduling coordinator to set that up. Thank you for your interest in SEZA Photography!",
        business: "Thank you, Sarah. Looking forward to it!",
        delay: 2000
      }
    ];

    let stepIndex = 0;
    const processStep = () => {
      if (stepIndex < conversationSteps.length) {
        const step = conversationSteps[stepIndex];
        
        // Add AI message to transcript
        addToTranscript(callSession.id, `AI: ${step.ai}`);
        
        setTimeout(() => {
          // Add business response to transcript
          addToTranscript(callSession.id, `Business: ${step.business}`);
          stepIndex++;
          
          if (stepIndex < conversationSteps.length) {
            setTimeout(processStep, step.delay);
          } else {
            // End call
            endCall(callSession.id, 'interested');
          }
        }, step.delay);
      }
    };

    processStep();
  };

  const addToTranscript = (callId: string, message: string) => {
    setActiveCalls(prev => prev.map(call => 
      call.id === callId 
        ? { ...call, transcript: [...call.transcript, message] }
        : call
    ));
    
    if (currentCall?.id === callId) {
      setCurrentCall(prev => prev ? { ...prev, transcript: [...prev.transcript, message] } : null);
    }
  };

  const endCall = (callId: string, outcome: CallSession['outcome']) => {
    const call = activeCalls.find(c => c.id === callId);
    if (!call) return;

    const completedCall: CallSession = {
      ...call,
      status: 'completed',
      endTime: new Date(),
      duration: Math.floor((Date.now() - call.startTime.getTime()) / 1000),
      outcome,
      followUpRequired: outcome === 'interested' || outcome === 'callback_requested'
    };

    setCallHistory(prev => [completedCall, ...prev]);
    setActiveCalls(prev => prev.filter(c => c.id !== callId));
    
    if (currentCall?.id === callId) {
      setCurrentCall(null);
      setIsCalling(false);
    }

    // Update AI employee stats
    updateEmployeeStats(completedCall);
  };

  const updateEmployeeStats = (call: CallSession) => {
    setAiEmployees(prev => prev.map(employee => {
      if (employee.id === selectedEmployee?.id) {
        const newTotalCalls = employee.totalCalls + 1;
        const newSuccessRate = call.outcome === 'interested' || call.outcome === 'transferred' 
          ? ((employee.successRate * employee.totalCalls) + 1) / newTotalCalls * 100
          : (employee.successRate * employee.totalCalls) / newTotalCalls * 100;
        
        return {
          ...employee,
          totalCalls: newTotalCalls,
          successRate: newSuccessRate,
          averageCallDuration: ((employee.averageCallDuration * employee.totalCalls) + call.duration) / newTotalCalls
        };
      }
      return employee;
    }));
  };

  const transferToHuman = (callId: string) => {
    updateCallStatus(callId, 'transferred');
    setTimeout(() => {
      endCall(callId, 'transferred');
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'dialing': return 'bg-blue-100 text-blue-800';
      case 'ringing': return 'bg-yellow-100 text-yellow-800';
      case 'connected': return 'bg-green-100 text-green-800';
      case 'on_hold': return 'bg-orange-100 text-orange-800';
      case 'transferred': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'interested': return 'bg-green-100 text-green-800';
      case 'not_interested': return 'bg-red-100 text-red-800';
      case 'callback_requested': return 'bg-yellow-100 text-yellow-800';
      case 'transferred': return 'bg-purple-100 text-purple-800';
      case 'no_answer': return 'bg-gray-100 text-gray-800';
      case 'busy': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 🎨 Lead Product Designer - Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="text-center py-8">
            <div className="relative inline-block mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl quantum-glow">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-4xl font-bold gradient-text-quantum mb-4">AI Employee Phone System</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              Intelligent AI employees for professional business outreach calls. 
              Consciousness-driven communication with advanced voice synthesis and natural conversation flow.
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="btn-quantum flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* 📊 Data Analyst/BI - System Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-semibold mb-2">Active AI Employees</p>
                  <p className="text-4xl font-bold">{aiEmployees.filter(e => e.active).length}</p>
                </div>
                <Brain className="w-10 h-10 text-blue-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-semibold mb-2">Active Calls</p>
                  <p className="text-4xl font-bold">{activeCalls.length}</p>
                </div>
                <PhoneCall className="w-10 h-10 text-green-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-semibold mb-2">Total Calls Today</p>
                  <p className="text-4xl font-bold">{callHistory.length}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-purple-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-semibold mb-2">Success Rate</p>
                  <p className="text-4xl font-bold">
                    {aiEmployees.length > 0 
                      ? (aiEmployees.reduce((acc, emp) => acc + emp.successRate, 0) / aiEmployees.length).toFixed(1)
                      : 0}%
                  </p>
                </div>
                <Target className="w-10 h-10 text-orange-200" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 🤖 AI Employee Roster */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">AI Employee Roster</h2>
              
              <div className="space-y-6">
                {aiEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      selectedEmployee?.id === employee.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg">{employee.name}</h3>
                          <p className="text-sm text-gray-600 font-medium">{employee.voice}</p>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full ${employee.active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <p className="font-medium text-gray-700"><span className="font-semibold">Personality:</span> {employee.personality}</p>
                      <p className="font-medium text-gray-700"><span className="font-semibold">Specialization:</span> {employee.specialization}</p>
                      <div className="grid grid-cols-2 gap-3 pt-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 font-semibold">Total Calls</p>
                          <p className="font-bold text-lg">{employee.totalCalls}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 font-semibold">Success Rate</p>
                          <p className="font-bold text-lg">{employee.successRate.toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 📞 Active Call Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Call Interface</h2>
              
              {currentCall ? (
                <div className="space-y-8">
                  {/* Call Status */}
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <Phone className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{currentCall.businessName}</h3>
                        <p className="text-sm text-gray-600 font-medium">{currentCall.contactPerson} • {currentCall.phoneNumber}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(currentCall.status)}`}>
                      {currentCall.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  {/* Call Controls */}
                  <div className="flex items-center justify-center space-x-6">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-6 rounded-full transition-all duration-300 ${
                        isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'
                      } text-white shadow-lg hover:shadow-xl`}
                    >
                      {isMuted ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                    </button>
                    
                    <button
                      onClick={() => transferToHuman(currentCall.id)}
                      className="p-6 rounded-full bg-purple-500 hover:bg-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <User className="w-8 h-8" />
                    </button>
                    
                    <button
                      onClick={() => endCall(currentCall.id, 'not_interested')}
                      className="p-6 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <PhoneOff className="w-8 h-8" />
                    </button>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center space-x-6">
                    <Volume2 className="w-6 h-6 text-gray-600" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={callVolume}
                      onChange={(e) => setCallVolume(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600 font-semibold">{callVolume}%</span>
                  </div>

                  {/* Live Transcript */}
                  <div className="bg-gray-50 rounded-xl p-6 max-h-64 overflow-y-auto">
                    <h4 className="font-semibold text-gray-800 mb-4 text-lg">Live Transcript</h4>
                    <div className="space-y-3">
                      {currentCall.transcript.map((message, index) => (
                        <div key={index} className={`p-4 rounded-lg ${
                          message.startsWith('AI:') 
                            ? 'bg-blue-100 text-blue-800 ml-4' 
                            : 'bg-gray-100 text-gray-800 mr-4'
                        }`}>
                          <p className="text-sm font-medium">{message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <PhoneCall className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-600 mb-3">No Active Call</h3>
                  <p className="text-gray-500 text-lg">Select an AI employee and initiate a call to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 📊 Call History */}
        <div className="mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Call History</h2>
            
            <div className="space-y-6">
              {callHistory.map((call) => (
                <div key={call.id} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{call.businessName}</h3>
                        <p className="text-sm text-gray-600 font-medium">{call.contactPerson} • {call.phoneNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getOutcomeColor(call.outcome)}`}>
                        {call.outcome.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600 font-semibold">
                        {Math.floor(call.duration / 60)}:{(call.duration % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  
                  {call.transcript.length > 0 && (
                    <div className="mt-4 p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3 text-lg">Call Summary</h4>
                      <p className="text-sm text-gray-600 font-medium">{call.notes}</p>
                      {call.followUpRequired && (
                        <div className="mt-3 flex items-center space-x-3 text-orange-600">
                          <AlertCircle className="w-5 h-5" />
                          <span className="text-sm font-semibold">Follow-up required: {call.nextAction}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIEmployeePhoneSystem;
