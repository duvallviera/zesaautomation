// import React from 'react' // Removed unused import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from './components/Header'
import ChatInterface from './components/Chat/ChatInterface'
import PortfolioExplorer from './components/Portfolio/PortfolioExplorer'
import BookingAssistant from './components/Booking/BookingAssistant'
import WorkflowAutomation from './components/Automation/WorkflowAutomation'
import MasterWorkflowSystem from './components/Automation/MasterWorkflowSystem'
import WorkflowBuilder from './components/Automation/WorkflowBuilder'
import AnalyticsDashboard from './components/Automation/AnalyticsDashboard'
import BookingFollowUp from './components/Automation/BookingFollowUp'
import EmailResponseAutomation from './components/Automation/EmailResponseAutomation'
import InstagramCommentReplies from './components/Automation/InstagramCommentReplies'
import MiamiBusinessOutreach from './components/Automation/MiamiBusinessOutreach'
import AIEmployeePhoneSystem from './components/Automation/AIEmployeePhoneSystem'
import RealMiamiBusinessOutreach from './components/Automation/RealMiamiBusinessOutreach'
import ContactUs from './components/ContactUs'
import EmailWorkflowDashboard from './components/Automation/EmailWorkflowDashboard'
import Dashboard from './components/Dashboard'
import './App.css'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen animated-bg relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/20 to-consciousness-400/20 rounded-full blur-3xl float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-harmony-400/20 to-quantum-400/20 rounded-full blur-3xl float" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-consciousness-400/10 to-primary-400/10 rounded-full blur-3xl float" style={{animationDelay: '4s'}}></div>
          </div>
          
          {/* Main Content */}
          <div className="relative z-10">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/chat" element={<ChatInterface />} />
                <Route path="/portfolio" element={<PortfolioExplorer />} />
                <Route path="/booking" element={<BookingAssistant />} />
                <Route path="/automation" element={<WorkflowAutomation />} />
                <Route path="/master-workflow" element={<MasterWorkflowSystem />} />
                <Route path="/workflow-builder" element={<WorkflowBuilder />} />
                <Route path="/analytics" element={<AnalyticsDashboard />} />
                <Route path="/booking-followup" element={<BookingFollowUp />} />
                <Route path="/email-automation" element={<EmailResponseAutomation />} />
                <Route path="/instagram-automation" element={<InstagramCommentReplies />} />
                <Route path="/miami-outreach" element={<MiamiBusinessOutreach />} />
                <Route path="/ai-phone-system" element={<AIEmployeePhoneSystem />} />
                <Route path="/real-miami-outreach" element={<RealMiamiBusinessOutreach />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/email-workflow-dashboard" element={<EmailWorkflowDashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
