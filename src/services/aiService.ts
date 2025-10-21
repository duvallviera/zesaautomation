import { AIResponse, ChatMessage } from '../types';

// Mock AI service - replace with actual OpenAI/Claude integration
export class AIService {
  private static instance: AIService;
  private apiKey: string;

  private constructor() {
    this.apiKey = (import.meta as any).env?.VITE_OPENAI_API_KEY || '';
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateResponse(messages: ChatMessage[]): Promise<AIResponse> {
    try {
      // For now, return a mock response
      // In production, this would call OpenAI GPT-4 or Claude API
      const lastMessage = messages[messages.length - 1];
      const response = this.generateMockResponse(lastMessage.content);
      
      return {
        content: response.content,
        intent: response.intent,
        confidence: response.confidence,
        suggestions: response.suggestions,
        actions: response.actions,
        metadata: {
          model: 'gpt-4',
          tokens: 150,
          responseTime: 800
        }
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  private generateMockResponse(userInput: string): AIResponse {
    const input = userInput.toLowerCase();
    
    // Intent detection
    if (input.includes('portfolio') || input.includes('photos') || input.includes('gallery')) {
      return {
        content: "I'd be happy to show you our portfolio! We specialize in portrait, documentary, movement, and motion photography. You can explore our work by category or browse all collections. Would you like to see a specific type of photography?",
        intent: 'portfolio_inquiry',
        confidence: 0.95,
        suggestions: ['View Portrait Gallery', 'See Documentary Work', 'Browse All Photos'],
        actions: [
          {
            type: 'navigate',
            payload: { path: '/portfolio' },
            label: 'Explore Portfolio'
          }
        ]
      };
    }
    
    if (input.includes('booking') || input.includes('schedule') || input.includes('appointment')) {
      return {
        content: "Great! I can help you book a photography session. We offer portrait sessions, event photography, commercial work, and documentary projects. What type of session are you interested in? I can check availability and provide pricing information.",
        intent: 'booking_inquiry',
        confidence: 0.92,
        suggestions: ['Book Portrait Session', 'Event Photography', 'Get Pricing Info'],
        actions: [
          {
            type: 'navigate',
            payload: { path: '/booking' },
            label: 'Start Booking'
          }
        ]
      };
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('pricing')) {
      return {
        content: "Our pricing varies based on the type of session and requirements. Portrait sessions start at $200, event photography from $500, and commercial work from $800. I can provide a detailed quote based on your specific needs. What type of photography service are you looking for?",
        intent: 'pricing_inquiry',
        confidence: 0.90,
        suggestions: ['Portrait Pricing', 'Event Pricing', 'Commercial Pricing'],
        actions: [
          {
            type: 'get_quote',
            payload: { service: 'pricing' },
            label: 'Get Quote'
          }
        ]
      };
    }
    
    if (input.includes('contact') || input.includes('phone') || input.includes('email')) {
      return {
        content: "You can reach us at info@mateoseza.com or call us directly. I can also help you schedule a consultation call to discuss your photography needs in detail. Would you like me to help you get in touch?",
        intent: 'contact_inquiry',
        confidence: 0.88,
        suggestions: ['Send Email', 'Schedule Call', 'Visit Website'],
        actions: [
          {
            type: 'contact',
            payload: { method: 'email' },
            label: 'Contact Us'
          }
        ]
      };
    }
    
    if (input.includes('about') || input.includes('who') || input.includes('background')) {
      return {
        content: "Mateo Serna Zapata is a professional photographer with a focus on 'Human First & Foremost' approach. We specialize in capturing authentic moments and creating meaningful visual stories. Our work spans portrait, documentary, movement, and motion photography.",
        intent: 'about_inquiry',
        confidence: 0.85,
        suggestions: ['View Portfolio', 'Read More About Us', 'See Our Process'],
        actions: [
          {
            type: 'navigate',
            payload: { path: '/about' },
            label: 'Learn More'
          }
        ]
      };
    }
    
    // Default response
    return {
      content: "Thank you for your question! I'm here to help with all aspects of our photography services. I can assist with portfolio exploration, booking sessions, pricing information, or answer any other questions you might have. What would you like to know more about?",
      intent: 'general_inquiry',
      confidence: 0.75,
      suggestions: ['View Portfolio', 'Book Session', 'Get Pricing', 'Contact Us'],
      actions: [
        {
          type: 'navigate',
          payload: { path: '/portfolio' },
          label: 'Explore Services'
        }
      ]
    };
  }

  async analyzeImage(imageUrl: string): Promise<any> {
    // Mock image analysis - replace with actual AI vision API
    return {
      dominantColors: ['#2c3e50', '#ecf0f1', '#e74c3c'],
      mood: 'contemplative',
      style: 'documentary',
      composition: 'rule-of-thirds',
      tags: ['portrait', 'urban', 'black-white'],
      confidence: 0.92
    };
  }

  async generatePortfolioRecommendations(userPreferences: any): Promise<any[]> {
    // Mock recommendations - replace with actual ML model
    return [
      {
        id: '1',
        title: 'Urban Portrait Series',
        reason: 'Matches your interest in urban photography',
        confidence: 0.95
      },
      {
        id: '2',
        title: 'Wedding Day Moments',
        reason: 'Similar style to your previous views',
        confidence: 0.88
      }
    ];
  }
}

export const aiService = AIService.getInstance();
