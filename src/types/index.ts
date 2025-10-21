// Chat Types
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  metadata?: {
    intent?: string;
    confidence?: number;
    suggestions?: string[];
  };
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  context?: {
    userPreferences?: UserPreferences;
    currentPage?: string;
    sessionData?: Record<string, any>;
  };
}

// Portfolio Types
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'portrait' | 'documentary' | 'movement' | 'motion';
  tags: string[];
  metadata: {
    location?: string;
    date?: Date;
    equipment?: string[];
    settings?: {
      aperture?: string;
      shutterSpeed?: string;
      iso?: number;
      focalLength?: string;
    };
  };
  aiAnalysis?: {
    dominantColors: string[];
    mood: string;
    style: string;
    composition: string;
    similarItems: string[];
  };
}

export interface PortfolioFilter {
  category?: string;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  mood?: string;
  style?: string;
}

// Booking Types
export interface BookingRequest {
  id: string;
  clientName: string;
  email: string;
  phone?: string;
  serviceType: ServiceType;
  preferredDate: Date;
  location?: string;
  message?: string;
  budget?: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  duration: number; // in hours
  category: 'portrait' | 'event' | 'commercial' | 'documentary';
  requirements?: string[];
  deliverables?: string[];
}

export interface AvailabilitySlot {
  date: Date;
  timeSlots: {
    start: string;
    end: string;
    available: boolean;
  }[];
}

// AI Service Types
export interface AIResponse {
  content: string;
  intent: string;
  confidence: number;
  suggestions?: string[];
  actions?: AIAction[];
  metadata?: Record<string, any>;
}

export interface AIAction {
  type: 'navigate' | 'book' | 'show_portfolio' | 'get_quote' | 'contact';
  payload: Record<string, any>;
  label: string;
}

export interface UserPreferences {
  language: 'en' | 'es';
  preferredCategories: string[];
  budgetRange?: {
    min: number;
    max: number;
  };
  location?: string;
  communicationStyle: 'formal' | 'casual';
}

// Automation Types (Phase 2)
export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  triggers: WorkflowTrigger[];
  actions: WorkflowAction[];
  status: 'active' | 'inactive' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowTrigger {
  type: 'webhook' | 'schedule' | 'event' | 'condition';
  config: Record<string, any>;
}

export interface WorkflowAction {
  type: 'send_email' | 'update_crm' | 'generate_content' | 'notify' | 'integrate_api';
  config: Record<string, any>;
  order: number;
}

// Analytics Types
export interface AnalyticsData {
  totalSessions: number;
  averageSessionDuration: number;
  popularCategories: Array<{
    category: string;
    views: number;
  }>;
  conversionRate: number;
  topQueries: Array<{
    query: string;
    count: number;
  }>;
  userSatisfaction: number;
}

// Error Types
export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}
