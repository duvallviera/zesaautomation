import { automationService } from './automationService';

export interface InstagramComment {
  id: string;
  postId: string;
  postImage: string;
  postCaption: string;
  commenter: string;
  commenterHandle: string;
  commenterAvatar: string;
  comment: string;
  timestamp: Date;
  likes: number;
  status: 'new' | 'processing' | 'replied' | 'failed' | 'ignored';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  sentiment: 'positive' | 'neutral' | 'negative';
  category: 'compliment' | 'question' | 'booking' | 'pricing' | 'general' | 'spam';
  responseSent?: Date;
  responseContent?: string;
  aiGenerated: boolean;
  hashtags: string[];
  mentions: string[];
}

export interface InstagramTemplate {
  id: string;
  name: string;
  category: string;
  content: string;
  enabled: boolean;
  priority: number;
  conditions: {
    keywords: string[];
    sentiment: string[];
    category: string[];
    hashtags: string[];
  };
  emojis: string[];
  hashtags: string[];
}

export interface AutomationSettings {
  enabled: boolean;
  autoReply: boolean;
  responseDelay: number;
  maxRepliesPerDay: number;
  workingHours: {
    start: string;
    end: string;
    timezone: string;
  };
  aiSettings: {
    model: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3';
    temperature: number;
    maxTokens: number;
    tone: 'professional' | 'friendly' | 'casual' | 'playful';
    personality: 'warm' | 'enthusiastic' | 'professional' | 'artistic';
  };
  filters: {
    minLength: number;
    excludeSpam: boolean;
    requireEngagement: boolean;
    maxHashtags: number;
  };
  engagement: {
    likeComments: boolean;
    followBack: boolean;
    storyMentions: boolean;
    dmFollowUp: boolean;
  };
}

class InstagramAutomationService {
  private static instance: InstagramAutomationService;
  private comments: InstagramComment[] = [];
  private templates: InstagramTemplate[] = [];
  private settings: AutomationSettings;
  private isRunning = false;
  private dailyReplyCount = 0;
  private lastResetDate = new Date().toDateString();

  private constructor() {
    this.settings = {
      enabled: true,
      autoReply: true,
      responseDelay: 2,
      maxRepliesPerDay: 30,
      workingHours: {
        start: '09:00',
        end: '21:00',
        timezone: 'America/New_York'
      },
      aiSettings: {
        model: 'gpt-4',
        temperature: 0.8,
        maxTokens: 150,
        tone: 'friendly',
        personality: 'enthusiastic'
      },
      filters: {
        minLength: 5,
        excludeSpam: true,
        requireEngagement: false,
        maxHashtags: 5
      },
      engagement: {
        likeComments: true,
        followBack: false,
        storyMentions: true,
        dmFollowUp: false
      }
    };
    
    this.initializeTemplates();
    this.startAutomation();
  }

  public static getInstance(): InstagramAutomationService {
    if (!InstagramAutomationService.instance) {
      InstagramAutomationService.instance = new InstagramAutomationService();
    }
    return InstagramAutomationService.instance;
  }

  // Initialize default templates
  private initializeTemplates() {
    this.templates = [
      {
        id: 'compliment',
        name: 'Compliment Response',
        category: 'compliment',
        content: 'Thank you so much! 😊 Your kind words mean the world to me. I\'m so glad you love the work! ✨',
        enabled: true,
        priority: 1,
        conditions: {
          keywords: ['stunning', 'beautiful', 'amazing', 'incredible', 'love', 'gorgeous'],
          sentiment: ['positive'],
          category: ['compliment'],
          hashtags: []
        },
        emojis: ['😊', '✨', '❤️', '🙏'],
        hashtags: ['#ZESAPhotography', '#ThankYou']
      },
      {
        id: 'booking',
        name: 'Booking Inquiry Response',
        category: 'booking',
        content: 'I\'d love to work with you! 📸 Our sessions are all about capturing your authentic story. DM me and let\'s chat about your vision! ✨',
        enabled: true,
        priority: 2,
        conditions: {
          keywords: ['book', 'session', 'hire', 'available', 'when', 'schedule'],
          sentiment: ['positive', 'neutral'],
          category: ['booking'],
          hashtags: []
        },
        emojis: ['📸', '✨', '💫', '🎯'],
        hashtags: ['#ZESAPhotography', '#BookNow', '#PhotographySession']
      },
      {
        id: 'pricing',
        name: 'Pricing Inquiry Response',
        category: 'pricing',
        content: 'Great question! 💰 Our sessions start at $350 and include everything you need. DM me for a custom quote based on your vision! 📸✨',
        enabled: true,
        priority: 3,
        conditions: {
          keywords: ['price', 'cost', 'rate', 'how much', 'pricing'],
          sentiment: ['positive', 'neutral'],
          category: ['pricing'],
          hashtags: []
        },
        emojis: ['💰', '📸', '✨', '💫'],
        hashtags: ['#ZESAPhotography', '#Pricing', '#PhotographyInvestment']
      },
      {
        id: 'question',
        name: 'General Question Response',
        category: 'question',
        content: 'Great question! 🤔 I\'d love to help you out. DM me and I\'ll give you all the details! ✨',
        enabled: true,
        priority: 4,
        conditions: {
          keywords: ['how', 'what', 'where', 'when', 'why', 'question'],
          sentiment: ['positive', 'neutral'],
          category: ['question'],
          hashtags: []
        },
        emojis: ['🤔', '✨', '💡', '📝'],
        hashtags: ['#ZESAPhotography', '#Questions', '#Help']
      }
    ];
  }

  // Start automation system
  private startAutomation() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('Instagram Automation Service started');
    
    // Check for new comments every 30 seconds
    setInterval(() => {
      this.processComments();
    }, 30000);

    // Reset daily counter at midnight
    setInterval(() => {
      const today = new Date().toDateString();
      if (today !== this.lastResetDate) {
        this.dailyReplyCount = 0;
        this.lastResetDate = today;
      }
    }, 60000);
  }

  // Process incoming comments
  private async processComments() {
    if (!this.settings.enabled || !this.settings.autoReply) return;
    
    const newComments = this.comments.filter(comment => comment.status === 'new');
    
    for (const comment of newComments) {
      try {
        // Check if we can reply (daily limit, working hours, etc.)
        if (!this.canReply(comment)) continue;

        // Find best template
        const template = this.findBestTemplate(comment);
        if (!template) continue;

        // Generate and send reply
        await this.sendReply(comment, template);
        
        // Update daily counter
        this.dailyReplyCount++;
        
      } catch (error) {
        console.error('Error processing comment:', error);
        this.updateCommentStatus(comment.id, 'failed');
      }
    }
  }

  // Check if we can reply to a comment
  private canReply(comment: InstagramComment): boolean {
    // Check daily limit
    if (this.dailyReplyCount >= this.settings.maxRepliesPerDay) {
      console.log('Daily reply limit reached');
      return false;
    }

    // Check working hours
    if (!this.isWithinWorkingHours()) {
      console.log('Outside working hours');
      return false;
    }

    // Check filters
    if (comment.comment.length < this.settings.filters.minLength) {
      console.log('Comment too short');
      return false;
    }

    if (this.settings.filters.excludeSpam && this.isSpam(comment)) {
      console.log('Comment flagged as spam');
      return false;
    }

    if (this.settings.filters.maxHashtags > 0 && comment.hashtags.length > this.settings.filters.maxHashtags) {
      console.log('Too many hashtags');
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
  private isSpam(comment: InstagramComment): boolean {
    const spamKeywords = ['follow', 'like', 'dm', 'link', 'bio', 'promo'];
    const content = comment.comment.toLowerCase();
    
    return spamKeywords.some(keyword => content.includes(keyword)) ||
           comment.hashtags.length > 10 ||
           comment.mentions.length > 5;
  }

  // Find best template for comment
  private findBestTemplate(comment: InstagramComment): InstagramTemplate | null {
    const suitableTemplates = this.templates.filter(template => 
      template.enabled && 
      template.conditions.category.includes(comment.category) &&
      template.conditions.sentiment.includes(comment.sentiment)
    );

    // Sort by priority and return the best match
    return suitableTemplates.sort((a, b) => a.priority - b.priority)[0] || null;
  }

  // Send reply to comment
  private async sendReply(comment: InstagramComment, template: InstagramTemplate) {
    try {
      // Update status to processing
      this.updateCommentStatus(comment.id, 'processing');

      // Personalize template
      const personalizedContent = this.personalizeTemplate(template, comment);

      // Add delay if configured
      if (this.settings.responseDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, this.settings.responseDelay * 60 * 1000));
      }

      // Send Instagram reply using automation service
      const result = await automationService.executeInstagramWorkflow({
        postId: comment.postId,
        commentId: comment.id,
        reply: personalizedContent,
        context: {
          comment: comment,
          template: template
        }
      });

      if (result.success) {
        // Update comment status
        this.updateCommentStatus(comment.id, 'replied');
        this.updateCommentResponse(comment.id, personalizedContent);
        
        // Like comment if enabled
        if (this.settings.engagement.likeComments) {
          await this.likeComment(comment.id);
        }
        
        console.log(`Reply sent successfully to ${comment.commenterHandle}`);
      } else {
        throw new Error(result.error || 'Failed to send reply');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      this.updateCommentStatus(comment.id, 'failed');
      throw error;
    }
  }

  // Personalize template content
  private personalizeTemplate(template: InstagramTemplate, comment: InstagramComment): string {
    let personalized = template.content;
    
    // Replace template variables
    personalized = personalized.replace(/\{\{commenter\}\}/g, comment.commenter);
    personalized = personalized.replace(/\{\{commenterHandle\}\}/g, comment.commenterHandle);
    personalized = personalized.replace(/\{\{comment\}\}/g, comment.comment);
    
    // Add random emoji from template
    if (template.emojis && template.emojis.length > 0) {
      const randomEmoji = template.emojis[Math.floor(Math.random() * template.emojis.length)];
      personalized += ` ${randomEmoji}`;
    }
    
    // Add hashtags if configured
    if (template.hashtags && template.hashtags.length > 0) {
      const hashtags = template.hashtags.slice(0, 3).join(' ');
      personalized += ` ${hashtags}`;
    }
    
    return personalized;
  }

  // Like a comment
  private async likeComment(commentId: string) {
    try {
      // Simulate liking comment
      console.log(`Liked comment: ${commentId}`);
      return { success: true };
    } catch (error) {
      console.error('Error liking comment:', error);
      return { success: false };
    }
  }

  // Update comment status
  private updateCommentStatus(commentId: string, status: 'processing' | 'replied' | 'failed' | 'ignored') {
    const comment = this.comments.find(c => c.id === commentId);
    if (comment) {
      comment.status = status;
      if (status === 'replied') {
        comment.responseSent = new Date();
      }
    }
  }

  // Update comment response content
  private updateCommentResponse(commentId: string, responseContent: string) {
    const comment = this.comments.find(c => c.id === commentId);
    if (comment) {
      comment.responseContent = responseContent;
    }
  }

  // Public methods
  public addComment(comment: Omit<InstagramComment, 'id' | 'timestamp' | 'status' | 'aiGenerated'>): string {
    const newComment: InstagramComment = {
      ...comment,
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      status: 'new',
      aiGenerated: false
    };
    
    this.comments.push(newComment);
    console.log(`New comment added: ${newComment.id}`);
    
    return newComment.id;
  }

  public getComments(): InstagramComment[] {
    return this.comments;
  }

  public getTemplates(): InstagramTemplate[] {
    return this.templates;
  }

  public getSettings(): AutomationSettings {
    return this.settings;
  }

  public updateSettings(newSettings: Partial<AutomationSettings>) {
    this.settings = { ...this.settings, ...newSettings };
  }

  public getStatistics() {
    const total = this.comments.length;
    const replied = this.comments.filter(c => c.status === 'replied').length;
    const pending = this.comments.filter(c => c.status === 'new' || c.status === 'processing').length;
    const failed = this.comments.filter(c => c.status === 'failed').length;
    
    return {
      total,
      replied,
      pending,
      failed,
      successRate: total > 0 ? (replied / total) * 100 : 0,
      dailyReplies: this.dailyReplyCount,
      dailyLimit: this.settings.maxRepliesPerDay
    };
  }

  public testAutomation(commentId: string): Promise<{ success: boolean; message: string }> {
    return new Promise(async (resolve) => {
      try {
        const comment = this.comments.find(c => c.id === commentId);
        if (!comment) {
          resolve({ success: false, message: 'Comment not found' });
          return;
        }

        const template = this.findBestTemplate(comment);
        if (!template) {
          resolve({ success: false, message: 'No suitable template found' });
          return;
        }

        const personalizedContent = this.personalizeTemplate(template, comment);

        console.log('Test reply generated:', {
          to: comment.commenterHandle,
          content: personalizedContent,
          postId: comment.postId
        });

        resolve({ success: true, message: 'Test reply generated successfully' });
      } catch (error) {
        resolve({ success: false, message: error instanceof Error ? error.message : 'Unknown error' });
      }
    });
  }
}

export const instagramAutomationService = InstagramAutomationService.getInstance();
