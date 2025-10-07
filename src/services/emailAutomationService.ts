import { automationService } from './automationService';

export interface EmailInquiry {
  id: string;
  from: string;
  fromName: string;
  subject: string;
  content: string;
  receivedAt: Date;
  status: 'new' | 'processing' | 'responded' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'booking' | 'pricing' | 'portfolio' | 'general' | 'complaint';
  sentiment: 'positive' | 'neutral' | 'negative';
  responseSent?: Date;
  responseContent?: string;
  aiGenerated: boolean;
}

export interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  subject: string;
  content: string;
  enabled: boolean;
  priority: number;
  conditions: {
    keywords: string[];
    sentiment: string[];
    category: string[];
  };
}

export interface AutomationSettings {
  enabled: boolean;
  autoRespond: boolean;
  responseDelay: number;
  maxResponsesPerDay: number;
  workingHours: {
    start: string;
    end: string;
    timezone: string;
  };
  aiSettings: {
    model: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3';
    temperature: number;
    maxTokens: number;
    tone: 'professional' | 'friendly' | 'casual' | 'formal';
  };
  filters: {
    minLength: number;
    excludeSpam: boolean;
    requireKeywords: boolean;
  };
}

class EmailAutomationService {
  private static instance: EmailAutomationService;
  private inquiries: EmailInquiry[] = [];
  private templates: EmailTemplate[] = [];
  private settings: AutomationSettings;
  private isRunning = false;
  private dailyResponseCount = 0;
  private lastResetDate = new Date().toDateString();

  private constructor() {
    this.settings = {
      enabled: true,
      autoRespond: true,
      responseDelay: 5,
      maxResponsesPerDay: 50,
      workingHours: {
        start: '09:00',
        end: '17:00',
        timezone: 'America/New_York'
      },
      aiSettings: {
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 500,
        tone: 'professional'
      },
      filters: {
        minLength: 10,
        excludeSpam: true,
        requireKeywords: false
      }
    };
    
    this.initializeTemplates();
    this.startAutomation();
  }

  public static getInstance(): EmailAutomationService {
    if (!EmailAutomationService.instance) {
      EmailAutomationService.instance = new EmailAutomationService();
    }
    return EmailAutomationService.instance;
  }

  // Initialize default templates
  private initializeTemplates() {
    this.templates = [
      {
        id: 'booking',
        name: 'Booking Inquiry Response',
        category: 'booking',
        subject: 'Thank you for your photography inquiry - ZESA Photography',
        content: `Hi {{fromName}}!

Thank you for reaching out to ZESA Photography! We're thrilled that you're interested in our {{serviceType}} services.

Based on your inquiry, here's what we can offer:

📸 **Our Services:**
• Portrait Photography
• Documentary Sessions
• Movement & Dance Photography
• Motion Photography

📅 **Availability:**
We typically book 2-4 weeks in advance. I'd be happy to check our calendar for your preferred dates.

💰 **Investment:**
Our sessions start at $350 and include:
• Professional photography session
• High-resolution edited images
• Online gallery for viewing and downloading
• Print release for personal use

🎯 **Next Steps:**
1. Let me know your preferred date and time
2. Share any specific ideas or inspiration you have
3. We'll confirm the details and send you a booking link

I'm excited to learn more about your vision and how we can bring it to life!

Best regards,
Mateo Serna Zapata
ZESA Photography
📧 info@mateoseza.com
📱 +1-555-ZESA-PHOTO

P.S. You can view our latest work at mateoseza.com/portfolio`,
        enabled: true,
        priority: 1,
        conditions: {
          keywords: ['booking', 'session', 'photography', 'hire', 'available'],
          sentiment: ['positive', 'neutral'],
          category: ['booking']
        }
      },
      {
        id: 'pricing',
        name: 'Pricing Inquiry Response',
        category: 'pricing',
        subject: 'Photography Pricing Information - ZESA Photography',
        content: `Hi {{fromName}}!

Thank you for your interest in our photography services! I'd be happy to share our pricing information with you.

💰 **Investment Options:**

**Portrait Sessions** - Starting at $350
• 1-2 hour session
• 50+ edited high-resolution images
• Online gallery
• Print release

**Documentary Sessions** - Starting at $450
• 2-3 hour session
• 75+ edited high-resolution images
• Online gallery
• Print release

**Movement/Dance Sessions** - Starting at $400
• 1.5-2 hour session
• 60+ edited high-resolution images
• Online gallery
• Print release

**What's Included:**
• Professional photography
• Post-processing and editing
• Online gallery for viewing
• High-resolution downloads
• Print release for personal use

**Additional Options:**
• Rush editing (24-48 hours): +$100
• Additional locations: +$50 each
• Extended session time: +$75/hour

I'd love to discuss your specific needs and create a custom package that works for you!

Best regards,
Mateo Serna Zapata
ZESA Photography`,
        enabled: true,
        priority: 2,
        conditions: {
          keywords: ['price', 'cost', 'rate', 'pricing', 'how much'],
          sentiment: ['positive', 'neutral'],
          category: ['pricing']
        }
      },
      {
        id: 'portfolio',
        name: 'Portfolio Inquiry Response',
        category: 'portfolio',
        subject: 'Thank you for your kind words! - ZESA Photography',
        content: `Hi {{fromName}}!

Your message absolutely made my day! Thank you so much for taking the time to reach out and share your thoughts about our work.

It means the world to us when people connect with our photography style. We believe in capturing authentic moments and telling real stories through our lens.

🎨 **Our Specialties:**
• **Portrait Photography** - Authentic, natural portraits
• **Documentary Photography** - Real moments, real emotions
• **Movement Photography** - Dynamic, artistic captures
• **Motion Photography** - Cinematic storytelling

📸 **View Our Work:**
• Website: mateoseza.com
• Instagram: @mateoseza.photo
• Portfolio: mateoseza.com/portfolio

If you're interested in working together, I'd love to hear about your vision! Whether it's a personal session, family photos, or something completely unique, we're here to bring your story to life.

What type of session are you most interested in?

With gratitude,
Mateo Serna Zapata
ZESA Photography
"Human First & Foremost"`,
        enabled: true,
        priority: 3,
        conditions: {
          keywords: ['love', 'beautiful', 'amazing', 'stunning', 'portfolio', 'work'],
          sentiment: ['positive'],
          category: ['portfolio']
        }
      }
    ];
  }

  // Start automation system
  private startAutomation() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('Email Automation Service started');
    
    // Check for new inquiries every 30 seconds
    setInterval(() => {
      this.processInquiries();
    }, 30000);

    // Reset daily counter at midnight
    setInterval(() => {
      const today = new Date().toDateString();
      if (today !== this.lastResetDate) {
        this.dailyResponseCount = 0;
        this.lastResetDate = today;
      }
    }, 60000);
  }

  // Process incoming inquiries
  private async processInquiries() {
    if (!this.settings.enabled || !this.settings.autoRespond) return;
    
    const newInquiries = this.inquiries.filter(inquiry => inquiry.status === 'new');
    
    for (const inquiry of newInquiries) {
      try {
        // Check if we can respond (daily limit, working hours, etc.)
        if (!this.canRespond(inquiry)) continue;

        // Find best template
        const template = this.findBestTemplate(inquiry);
        if (!template) continue;

        // Generate and send response
        await this.sendResponse(inquiry, template);
        
        // Update daily counter
        this.dailyResponseCount++;
        
      } catch (error) {
        console.error('Error processing inquiry:', error);
        this.updateInquiryStatus(inquiry.id, 'failed');
      }
    }
  }

  // Check if we can respond to an inquiry
  private canRespond(inquiry: EmailInquiry): boolean {
    // Check daily limit
    if (this.dailyResponseCount >= this.settings.maxResponsesPerDay) {
      console.log('Daily response limit reached');
      return false;
    }

    // Check working hours
    if (!this.isWithinWorkingHours()) {
      console.log('Outside working hours');
      return false;
    }

    // Check filters
    if (inquiry.content.length < this.settings.filters.minLength) {
      console.log('Inquiry too short');
      return false;
    }

    if (this.settings.filters.excludeSpam && this.isSpam(inquiry)) {
      console.log('Inquiry flagged as spam');
      return false;
    }

    return true;
  }

  // Check if current time is within working hours
  private isWithinWorkingHours(): boolean {
    const now = new Date();
    const currentTime = now.toLocaleTimeString('en-US', { 
      hour12: false, 
      timeZone: this.settings.workingHours.timezone 
    });
    
    return currentTime >= this.settings.workingHours.start && 
           currentTime <= this.settings.workingHours.end;
  }

  // Simple spam detection
  private isSpam(inquiry: EmailInquiry): boolean {
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations'];
    const content = inquiry.content.toLowerCase();
    
    return spamKeywords.some(keyword => content.includes(keyword));
  }

  // Find best template for inquiry
  private findBestTemplate(inquiry: EmailInquiry): EmailTemplate | null {
    const suitableTemplates = this.templates.filter(template => 
      template.enabled && 
      template.conditions.category.includes(inquiry.category) &&
      template.conditions.sentiment.includes(inquiry.sentiment)
    );

    // Sort by priority and return the best match
    return suitableTemplates.sort((a, b) => a.priority - b.priority)[0] || null;
  }

  // Send response to inquiry
  private async sendResponse(inquiry: EmailInquiry, template: EmailTemplate) {
    try {
      // Update status to processing
      this.updateInquiryStatus(inquiry.id, 'processing');

      // Personalize template
      const personalizedContent = this.personalizeTemplate(template.content, inquiry);
      const personalizedSubject = this.personalizeTemplate(template.subject, inquiry);

      // Add delay if configured
      if (this.settings.responseDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, this.settings.responseDelay * 60 * 1000));
      }

      // Send email using automation service
      const result = await automationService.executeEmailWorkflow({
        to: inquiry.from,
        subject: personalizedSubject,
        content: personalizedContent,
        context: {
          inquiry: inquiry,
          template: template
        }
      });

      if (result.success) {
        // Update inquiry status
        this.updateInquiryStatus(inquiry.id, 'responded');
        this.updateInquiryResponse(inquiry.id, personalizedContent);
        
        console.log(`Response sent successfully to ${inquiry.from}`);
      } else {
        throw new Error(result.error || 'Failed to send response');
      }
    } catch (error) {
      console.error('Error sending response:', error);
      this.updateInquiryStatus(inquiry.id, 'failed');
      throw error;
    }
  }

  // Personalize template content
  private personalizeTemplate(template: string, inquiry: EmailInquiry): string {
    let personalized = template;
    
    // Replace template variables
    personalized = personalized.replace(/\{\{fromName\}\}/g, inquiry.fromName);
    personalized = personalized.replace(/\{\{from\}\}/g, inquiry.from);
    personalized = personalized.replace(/\{\{subject\}\}/g, inquiry.subject);
    personalized = personalized.replace(/\{\{content\}\}/g, inquiry.content);
    
    // Add service type detection
    const serviceType = this.detectServiceType(inquiry.content);
    personalized = personalized.replace(/\{\{serviceType\}\}/g, serviceType);
    
    return personalized;
  }

  // Detect service type from inquiry content
  private detectServiceType(content: string): string {
    const contentLower = content.toLowerCase();
    
    if (contentLower.includes('portrait') || contentLower.includes('headshot')) {
      return 'Portrait Photography';
    } else if (contentLower.includes('documentary') || contentLower.includes('family')) {
      return 'Documentary Photography';
    } else if (contentLower.includes('movement') || contentLower.includes('dance')) {
      return 'Movement Photography';
    } else if (contentLower.includes('motion') || contentLower.includes('video')) {
      return 'Motion Photography';
    } else {
      return 'Photography';
    }
  }

  // Update inquiry status
  private updateInquiryStatus(inquiryId: string, status: 'processing' | 'responded' | 'failed') {
    const inquiry = this.inquiries.find(i => i.id === inquiryId);
    if (inquiry) {
      inquiry.status = status;
      if (status === 'responded') {
        inquiry.responseSent = new Date();
      }
    }
  }

  // Update inquiry response content
  private updateInquiryResponse(inquiryId: string, responseContent: string) {
    const inquiry = this.inquiries.find(i => i.id === inquiryId);
    if (inquiry) {
      inquiry.responseContent = responseContent;
    }
  }

  // Public methods
  public addInquiry(inquiry: Omit<EmailInquiry, 'id' | 'receivedAt' | 'status' | 'aiGenerated'>): string {
    const newInquiry: EmailInquiry = {
      ...inquiry,
      id: `inquiry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      receivedAt: new Date(),
      status: 'new',
      aiGenerated: false
    };
    
    this.inquiries.push(newInquiry);
    console.log(`New inquiry added: ${newInquiry.id}`);
    
    return newInquiry.id;
  }

  public getInquiries(): EmailInquiry[] {
    return this.inquiries;
  }

  public getTemplates(): EmailTemplate[] {
    return this.templates;
  }

  public getSettings(): AutomationSettings {
    return this.settings;
  }

  public updateSettings(newSettings: Partial<AutomationSettings>) {
    this.settings = { ...this.settings, ...newSettings };
  }

  public getStatistics() {
    const total = this.inquiries.length;
    const responded = this.inquiries.filter(i => i.status === 'responded').length;
    const pending = this.inquiries.filter(i => i.status === 'new' || i.status === 'processing').length;
    const failed = this.inquiries.filter(i => i.status === 'failed').length;
    
    return {
      total,
      responded,
      pending,
      failed,
      successRate: total > 0 ? (responded / total) * 100 : 0,
      dailyResponses: this.dailyResponseCount,
      dailyLimit: this.settings.maxResponsesPerDay
    };
  }

  public testAutomation(inquiryId: string): Promise<{ success: boolean; message: string }> {
    return new Promise(async (resolve) => {
      try {
        const inquiry = this.inquiries.find(i => i.id === inquiryId);
        if (!inquiry) {
          resolve({ success: false, message: 'Inquiry not found' });
          return;
        }

        const template = this.findBestTemplate(inquiry);
        if (!template) {
          resolve({ success: false, message: 'No suitable template found' });
          return;
        }

        const personalizedContent = this.personalizeTemplate(template.content, inquiry);
        const personalizedSubject = this.personalizeTemplate(template.subject, inquiry);

        console.log('Test response generated:', {
          to: inquiry.from,
          subject: personalizedSubject,
          content: personalizedContent
        });

        resolve({ success: true, message: 'Test response generated successfully' });
      } catch (error) {
        resolve({ success: false, message: error instanceof Error ? error.message : 'Unknown error' });
      }
    });
  }
}

export const emailAutomationService = EmailAutomationService.getInstance();
