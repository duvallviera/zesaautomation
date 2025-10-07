import { AIResponse, ChatMessage } from '../types';

// Mock AI Integration Service for Development
export class AutomationService {
  private static instance: AutomationService;
  private apiKey: string;
  private baseUrl: string;
  private isDevelopment: boolean;

  private constructor() {
    this.apiKey = (import.meta as any).env?.VITE_OPENAI_API_KEY || '';
    this.baseUrl = 'https://api.openai.com/v1';
    this.isDevelopment = (import.meta as any).env?.DEV || !this.apiKey;
  }

  public static getInstance(): AutomationService {
    if (!AutomationService.instance) {
      AutomationService.instance = new AutomationService();
    }
    return AutomationService.instance;
  }

  // Email Response Generation
  async generateEmailResponse(inquiry: string, context: any): Promise<string> {
    try {
      if (this.isDevelopment) {
        return this.getMockEmailResponse(inquiry);
      }
      
      const prompt = this.buildEmailPrompt(inquiry, context);
      const response = await this.callOpenAI(prompt);
      return response;
    } catch (error) {
      console.error('Email generation error:', error);
      return this.getFallbackEmailResponse(inquiry);
    }
  }

  // Instagram Comment Response
  async generateInstagramReply(comment: string, postContext: any): Promise<string> {
    try {
      if (this.isDevelopment) {
        return this.getMockInstagramReply(comment);
      }
      
      const prompt = this.buildInstagramPrompt(comment, postContext);
      const response = await this.callOpenAI(prompt);
      return response;
    } catch (error) {
      console.error('Instagram reply generation error:', error);
      return this.getFallbackInstagramReply(comment);
    }
  }

  // Booking Follow-up Message
  async generateBookingFollowUp(bookingData: any): Promise<string> {
    try {
      if (this.isDevelopment) {
        return this.getMockBookingFollowUp(bookingData);
      }
      
      const prompt = this.buildBookingPrompt(bookingData);
      const response = await this.callOpenAI(prompt);
      return response;
    } catch (error) {
      console.error('Booking follow-up generation error:', error);
      return this.getFallbackBookingMessage(bookingData);
    }
  }

  // Sentiment Analysis
  async analyzeSentiment(text: string): Promise<{ sentiment: 'positive' | 'negative' | 'neutral'; score: number }> {
    try {
      if (this.isDevelopment) {
        return this.getMockSentimentAnalysis(text);
      }
      
      const prompt = `Analyze the sentiment of this text and return only a JSON object with "sentiment" (positive/negative/neutral) and "score" (0-1): "${text}"`;
      const response = await this.callOpenAI(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      return { sentiment: 'neutral', score: 0.5 };
    }
  }

  // Intent Detection
  async detectIntent(text: string): Promise<{ intent: string; confidence: number }> {
    try {
      if (this.isDevelopment) {
        return this.getMockIntentDetection(text);
      }
      
      const prompt = `Detect the intent of this message and return only a JSON object with "intent" and "confidence" (0-1). Intent should be one of: booking, pricing, portfolio, contact, general: "${text}"`;
      const response = await this.callOpenAI(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Intent detection error:', error);
      return { intent: 'general', confidence: 0.5 };
    }
  }

  // Content Generation for Social Media
  async generateSocialMediaContent(portfolioItem: any, platform: string): Promise<string> {
    try {
      if (this.isDevelopment) {
        return this.getMockSocialMediaContent(portfolioItem, platform);
      }
      
      const prompt = this.buildSocialMediaPrompt(portfolioItem, platform);
      const response = await this.callOpenAI(prompt);
      return response;
    } catch (error) {
      console.error('Social media content generation error:', error);
      return this.getFallbackSocialContent(portfolioItem, platform);
    }
  }

  // Private helper methods
  private async callOpenAI(prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are ZESA AI Assistant, a professional photography business assistant. Always respond in a professional, friendly, and helpful manner. Keep responses concise and relevant.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  }

  // Mock responses for development
  private getMockEmailResponse(inquiry: string): string {
    const responses = [
      `Thank you for your inquiry about our photography services! We're excited to learn more about your photography needs and would love to discuss how we can help bring your vision to life.

Our specialties include portrait, documentary, movement, and motion photography, all with a "Human First & Foremost" approach.

Please feel free to reach out to us directly at info@mateoseza.com or call us to discuss your project in more detail.

Best regards,
ZESA Photography Team`,

      `Hi there! Thank you for reaching out about our photography services. We're thrilled that you're interested in working with us!

We specialize in creating authentic, human-centered photography that tells your unique story. Whether you're looking for portraits, documentary work, or something more dynamic, we're here to help.

Let's schedule a consultation to discuss your vision and how we can make it a reality.

Warm regards,
Mateo Serna Zapata
ZESA Photography`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private getMockInstagramReply(comment: string): string {
    const positiveReplies = [
      "Thank you so much! 🙏✨",
      "Appreciate the love! 💕",
      "So glad you like it! 😊",
      "Thank you for the kind words! 🙌",
      "Means a lot! 💖",
      "You're amazing! 🌟",
      "Thank you for the support! 🎉"
    ];
    
    const questionReplies = [
      "Great question! Feel free to DM us for more details! 💬",
      "Thanks for asking! Check out our website for more info! 📸",
      "Love the curiosity! Drop us a message for details! ✨"
    ];
    
    if (comment.toLowerCase().includes('?')) {
      return questionReplies[Math.floor(Math.random() * questionReplies.length)];
    }
    
    return positiveReplies[Math.floor(Math.random() * positiveReplies.length)];
  }

  private getMockBookingFollowUp(bookingData: any): string {
    return `Hi ${bookingData.clientName || 'there'}!

We're thrilled to confirm your photography session with us! We can't wait to create something beautiful together.

A few quick tips to help you prepare:
- Bring any props or outfits you'd like to include
- Arrive 10 minutes early to settle in
- Feel free to bring inspiration photos

We'll be in touch 24 hours before your session with final details.

Looking forward to working with you!

Best,
ZESA Photography Team`;
  }

  private getMockSentimentAnalysis(text: string): Promise<{ sentiment: 'positive' | 'negative' | 'neutral'; score: number }> {
    const positiveWords = ['love', 'amazing', 'beautiful', 'great', 'wonderful', 'fantastic', 'perfect', 'excellent'];
    const negativeWords = ['hate', 'terrible', 'awful', 'bad', 'horrible', 'disappointed', 'angry', 'frustrated'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) {
      return Promise.resolve({ sentiment: 'positive', score: 0.8 });
    } else if (negativeCount > positiveCount) {
      return Promise.resolve({ sentiment: 'negative', score: 0.2 });
    } else {
      return Promise.resolve({ sentiment: 'neutral', score: 0.5 });
    }
  }

  private getMockIntentDetection(text: string): Promise<{ intent: string; confidence: number }> {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('book') || lowerText.includes('schedule') || lowerText.includes('appointment')) {
      return Promise.resolve({ intent: 'booking', confidence: 0.9 });
    } else if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('rate')) {
      return Promise.resolve({ intent: 'pricing', confidence: 0.9 });
    } else if (lowerText.includes('portfolio') || lowerText.includes('gallery') || lowerText.includes('work')) {
      return Promise.resolve({ intent: 'portfolio', confidence: 0.9 });
    } else if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('phone')) {
      return Promise.resolve({ intent: 'contact', confidence: 0.9 });
    } else {
      return Promise.resolve({ intent: 'general', confidence: 0.7 });
    }
  }

  private getMockSocialMediaContent(portfolioItem: any, platform: string): string {
    const content = `✨ New work from our latest ${portfolioItem.category} session ✨

${portfolioItem.description}

#Photography #${portfolioItem.category} #ZESAPhotography #HumanFirst`;

    return content;
  }

  private buildEmailPrompt(inquiry: string, context: any): string {
    return `Generate a professional email response for a photography business inquiry. 

Inquiry: "${inquiry}"

Context:
- Business: ZESA Photography (Mateo Serna Zapata)
- Specialties: Portrait, Documentary, Movement, Motion photography
- Brand: "Human First & Foremost"
- Tone: Professional but warm

Generate a response that:
1. Acknowledges the inquiry
2. Provides relevant information
3. Offers next steps
4. Maintains professional tone
5. Includes a call-to-action

Keep it under 200 words.`;
  }

  private buildInstagramPrompt(comment: string, postContext: any): string {
    return `Generate an engaging Instagram reply for a photography business.

Comment: "${comment}"
Post: ${postContext.description || 'Photography post'}

Guidelines:
- Keep it friendly and authentic
- Use appropriate emojis (1-2 max)
- Be conversational but professional
- Show appreciation for the comment
- Keep it under 50 words
- Match the energy of the comment

Generate a reply that feels personal and engaging.`;
  }

  private buildBookingPrompt(bookingData: any): string {
    return `Generate a booking follow-up message for a photography business.

Booking Details:
- Service: ${bookingData.serviceType || 'Photography session'}
- Date: ${bookingData.date || 'TBD'}
- Client: ${bookingData.clientName || 'Client'}
- Location: ${bookingData.location || 'TBD'}

Generate a message that:
1. Confirms the booking
2. Provides preparation tips
3. Shares excitement about the session
4. Includes contact information
5. Sets expectations

Keep it warm, professional, and under 150 words.`;
  }

  private buildSocialMediaPrompt(portfolioItem: any, platform: string): string {
    return `Generate social media content for a photography business.

Portfolio Item:
- Title: ${portfolioItem.title}
- Description: ${portfolioItem.description}
- Category: ${portfolioItem.category}

Platform: ${platform}

Generate content that:
1. Highlights the photography work
2. Engages the audience
3. Uses appropriate hashtags (3-5 max)
4. Matches platform style
5. Includes a call-to-action

Keep it engaging and platform-appropriate.`;
  }

  // Fallback responses when AI fails
  private getFallbackEmailResponse(inquiry: string): string {
    return `Thank you for your inquiry about our photography services. We're excited to learn more about your photography needs and would love to discuss how we can help bring your vision to life.

Our specialties include portrait, documentary, movement, and motion photography, all with a "Human First & Foremost" approach.

Please feel free to reach out to us directly at info@mateoseza.com or call us to discuss your project in more detail.

Best regards,
ZESA Photography Team`;
  }

  private getFallbackInstagramReply(comment: string): string {
    const positiveReplies = [
      "Thank you so much! 🙏✨",
      "Appreciate the love! 💕",
      "So glad you like it! 😊",
      "Thank you for the kind words! 🙌",
      "Means a lot! 💖"
    ];
    return positiveReplies[Math.floor(Math.random() * positiveReplies.length)];
  }

  private getFallbackBookingMessage(bookingData: any): string {
    return `Hi ${bookingData.clientName || 'there'}!

We're thrilled to confirm your photography session with us! We can't wait to create something beautiful together.

A few quick tips to help you prepare:
- Bring any props or outfits you'd like to include
- Arrive 10 minutes early to settle in
- Feel free to bring inspiration photos

We'll be in touch 24 hours before your session with final details.

Looking forward to working with you!

Best,
ZESA Photography Team`;
  }

  private getFallbackSocialContent(portfolioItem: any, platform: string): string {
    return `✨ New work from our latest ${portfolioItem.category} session ✨

${portfolioItem.description}

#Photography #${portfolioItem.category} #ZESAPhotography #HumanFirst`;
  }

  // Workflow execution methods
  async executeEmailWorkflow(emailData: any): Promise<{ success: boolean; response?: string; error?: string }> {
    try {
      const response = await this.generateEmailResponse(emailData.content, emailData.context);
      
      // Simulate sending email
      await this.simulateEmailSend(emailData.to, response);
      
      return { success: true, response };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async executeInstagramWorkflow(commentData: any): Promise<{ success: boolean; response?: string; error?: string }> {
    try {
      const response = await this.generateInstagramReply(commentData.content, commentData.postContext);
      
      // Simulate posting reply
      await this.simulateInstagramReply(commentData.postId, response);
      
      return { success: true, response };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async executeBookingWorkflow(bookingData: any): Promise<{ success: boolean; response?: string; error?: string }> {
    try {
      const response = await this.generateBookingFollowUp(bookingData);
      
      // Simulate sending follow-up
      await this.simulateBookingFollowUp(bookingData.clientEmail, response);
      
      return { success: true, response };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Simulation methods (replace with real API calls)
  private async simulateEmailSend(to: string, content: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Email sent to ${to}: ${content.substring(0, 100)}...`);
  }

  private async simulateInstagramReply(postId: string, reply: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`Instagram reply posted to ${postId}: ${reply}`);
  }

  private async simulateBookingFollowUp(email: string, message: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    console.log(`Booking follow-up sent to ${email}: ${message.substring(0, 100)}...`);
  }

  // Mock data methods for development
  async getWorkflows(): Promise<any[]> {
    return [
      {
        id: '1',
        name: 'Email Response Automation',
        description: 'Automatically respond to client inquiries with personalized messages',
        status: 'active',
        steps: [],
        lastRun: new Date(),
        nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000),
        successRate: 98.5,
        totalRuns: 1247,
        consciousnessLevel: 94,
        harmonyIndex: 87,
        quantumProcessing: 156
      },
      {
        id: '2',
        name: 'Instagram Comment Replies',
        description: 'Automatically reply to Instagram comments with engaging responses',
        status: 'active',
        steps: [],
        lastRun: new Date(),
        nextRun: new Date(Date.now() + 2 * 60 * 60 * 1000),
        successRate: 97.2,
        totalRuns: 892,
        consciousnessLevel: 92,
        harmonyIndex: 89,
        quantumProcessing: 142
      },
      {
        id: '3',
        name: 'Booking Follow-up System',
        description: 'Send follow-up messages after booking sessions',
        status: 'active',
        steps: [],
        lastRun: new Date(),
        nextRun: new Date(Date.now() + 6 * 60 * 60 * 1000),
        successRate: 99.1,
        totalRuns: 634,
        consciousnessLevel: 89,
        harmonyIndex: 87,
        quantumProcessing: 201
      }
    ];
  }

  async getAnalytics(): Promise<any> {
    return {
      totalWorkflows: 24,
      activeWorkflows: 18,
      totalAutomations: 2847,
      successRate: 98.5,
      consciousnessLevel: 94,
      harmonyIndex: 87,
      quantumProcessing: 156
    };
  }

  async createWorkflow(workflowData: any): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: Date.now().toString(),
      ...workflowData,
      status: 'active',
      successRate: 0,
      totalRuns: 0,
      consciousnessLevel: 85,
      harmonyIndex: 80,
      quantumProcessing: 100
    };
  }

  async updateWorkflow(id: string, workflowData: any): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      id,
      ...workflowData,
      updatedAt: new Date()
    };
  }
}

export const automationService = AutomationService.getInstance();