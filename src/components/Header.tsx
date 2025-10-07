import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  MessageCircle, 
  Image, 
  Calendar, 
  Workflow, 
  Crown, 
  BarChart3, 
  Settings, 
  Bell, 
  Mail, 
  Instagram,
  Menu,
  X,
  Sparkles,
  Brain,
  Heart,
  Zap,
  Building2,
  PhoneCall,
  Globe,
  ChevronLeft,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home, category: 'main' },
    { name: 'AI Chat', href: '/chat', icon: MessageCircle, category: 'ai' },
    { name: 'Portfolio', href: '/portfolio', icon: Image, category: 'main' },
    { name: 'Booking', href: '/booking', icon: Calendar, category: 'main' },
    { name: 'Automation', href: '/automation', icon: Workflow, category: 'automation' },
    { name: 'Master Workflow', href: '/master-workflow', icon: Crown, category: 'automation' },
    { name: 'Workflow Builder', href: '/workflow-builder', icon: Settings, category: 'automation' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, category: 'analytics' },
    { name: 'Booking Follow-up', href: '/booking-followup', icon: Bell, category: 'automation' },
    { name: 'Email Automation', href: '/email-automation', icon: Mail, category: 'automation' },
    { name: 'Instagram Automation', href: '/instagram-automation', icon: Instagram, category: 'automation' },
    { name: 'Miami Outreach', href: '/miami-outreach', icon: Building2, category: 'automation' },
    { name: 'AI Phone System', href: '/ai-phone-system', icon: PhoneCall, category: 'automation' },
    { name: 'Real Miami Data', href: '/real-miami-outreach', icon: Globe, category: 'automation' },
    { name: 'Email Workflow', href: '/email-workflow-dashboard', icon: Settings, category: 'automation' },
    { name: 'Contact Us', href: '/contact-us', icon: MessageSquare, category: 'main' },
  ];

  // Debug: Log navigation items
  console.log('Navigation items:', navigation.map(item => item.name));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai': return Brain;
      case 'automation': return Zap;
      case 'analytics': return BarChart3;
      default: return Sparkles;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ai': return 'consciousness';
      case 'automation': return 'primary';
      case 'analytics': return 'harmony';
      default: return 'quantum';
    }
  };

  const scrollNavigation = (direction: 'left' | 'right') => {
    const scrollContainer = document.getElementById('navigation-scroll') || document.getElementById('mobile-navigation-scroll');
    if (scrollContainer) {
      const scrollAmount = 300; // Adjust scroll distance
      const newPosition = direction === 'left' 
        ? scrollContainer.scrollLeft - scrollAmount
        : scrollContainer.scrollLeft + scrollAmount;
      
      scrollContainer.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    const scrollContainer = document.getElementById('navigation-scroll') || document.getElementById('mobile-navigation-scroll');
    if (scrollContainer) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setScrollPosition(scrollLeft);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-consciousness-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-harmony-400 to-quantum-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold gradient-text">ZESA AI</span>
              <span className="text-xs text-gray-500 -mt-1">Consciousness Assistant</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigation.slice(0, 6).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              const categoryColor = getCategoryColor(item.category);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group relative flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover-lift ${
                    isActive
                      ? `bg-${categoryColor}-50 text-${categoryColor}-700 border border-${categoryColor}-200 shadow-md`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
                  }`}
                >
                  <Icon size={18} className={isActive ? `text-${categoryColor}-600` : ''} />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-${categoryColor}-500 rounded-full`}></div>
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-3 text-gray-400 hover:text-gray-600 transition-all duration-300 hover:bg-gray-100 rounded-xl group">
              <Bell size={22} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            </button>
            
            {/* AI Status Indicator */}
            <div className="hidden md:flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-consciousness-50 to-primary-50 rounded-xl border border-consciousness-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-consciousness-700">AI Active</span>
            </div>
            
            {/* User Avatar */}
            <div className="relative group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-consciousness-400 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-semibold text-base">Z</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 text-gray-400 hover:text-gray-600 transition-colors rounded-xl hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        
        {/* Scrolling Navigation Bar */}
        <div className="hidden lg:block border-t border-gray-200/50 bg-white/90 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-700">All Pages ({navigation.length})</h3>
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <span>Use arrows to navigate</span>
                <div className="flex items-center space-x-1">
                  <ChevronLeft className="w-4 h-4" />
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="relative">
              {/* Left Arrow */}
              <button
                onClick={() => scrollNavigation('left')}
                disabled={!canScrollLeft}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                  canScrollLeft
                    ? 'bg-white shadow-md hover:shadow-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                <ChevronLeft size={16} />
              </button>

              {/* Right Arrow */}
              <button
                onClick={() => scrollNavigation('right')}
                disabled={!canScrollRight}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                  canScrollRight
                    ? 'bg-white shadow-md hover:shadow-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                <ChevronRight size={16} />
              </button>

              <div 
                id="navigation-scroll"
                className="overflow-x-auto scrollbar-hide mx-10"
                onScroll={handleScroll}
              >
                <div className="flex space-x-3 pb-3" style={{ width: 'max-content' }}>
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    const categoryColor = getCategoryColor(item.category);
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group relative flex items-center space-x-3 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                          isActive
                            ? `bg-${categoryColor}-100 text-${categoryColor}-700 border border-${categoryColor}-200 shadow-md`
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent hover:shadow-sm'
                        }`}
                      >
                        <Icon size={16} className={isActive ? `text-${categoryColor}-600` : ''} />
                        <span>{item.name}</span>
                        {isActive && (
                          <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-${categoryColor}-500 rounded-full`}></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
              
              {/* Enhanced Scroll indicators */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/50 py-6 animate-slide-up">
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-700 mb-4">All Pages ({navigation.length})</h3>
              <div className="relative">
                {/* Mobile Left Arrow */}
                <button
                  onClick={() => scrollNavigation('left')}
                  disabled={!canScrollLeft}
                  className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    canScrollLeft
                      ? 'bg-white shadow-md hover:shadow-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Mobile Right Arrow */}
                <button
                  onClick={() => scrollNavigation('right')}
                  disabled={!canScrollRight}
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    canScrollRight
                      ? 'bg-white shadow-md hover:shadow-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <ChevronRight size={16} />
                </button>

                <div 
                  id="mobile-navigation-scroll"
                  className="overflow-x-auto scrollbar-hide mx-10"
                  onScroll={handleScroll}
                >
                  <div className="flex space-x-3 pb-3" style={{ width: 'max-content' }}>
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    const categoryColor = getCategoryColor(item.category);
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                          isActive
                              ? `bg-${categoryColor}-100 text-${categoryColor}-700 border border-${categoryColor}-200 shadow-md`
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent'
                        }`}
                      >
                          <Icon size={16} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                  </div>
                </div>
              </div>
            </div>
            
            <nav className="grid grid-cols-2 gap-3">
              {navigation.slice(0, 8).map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                const categoryColor = getCategoryColor(item.category);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? `bg-${categoryColor}-50 text-${categoryColor}-700 border border-${categoryColor}-200 shadow-sm`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;