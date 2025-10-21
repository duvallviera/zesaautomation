import { automationService } from './automationService';

export interface BookingData {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceType: string;
  sessionDate: Date;
  sessionTime: string;
  location: string;
  duration: number;
  price: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  notes: string;
  followUpSent: boolean;
  followUpDate?: Date;
}

export interface FollowUpTemplate {
  id: string;
  name: string;
  type: 'welcome' | 'reminder' | 'thank_you' | 'feedback' | 'portfolio';
  timing: 'immediate' | '24h' | '48h' | '1week' | '2weeks';
  subject: string;
  content: string;
  enabled: boolean;
}

export interface FollowUpSchedule {
  bookingId: string;
  templateId: string;
  scheduledTime: Date;
  status: 'pending' | 'sent' | 'failed' | 'cancelled';
  attempts: number;
  lastAttempt?: Date;
  errorMessage?: string;
}

class BookingFollowUpService {
  private static instance: BookingFollowUpService;
  private schedules: FollowUpSchedule[] = [];
  private isRunning = false;

  private constructor() {
    this.startScheduler();
  }

  public static getInstance(): BookingFollowUpService {
    if (!BookingFollowUpService.instance) {
      BookingFollowUpService.instance = new BookingFollowUpService();
    }
    return BookingFollowUpService.instance;
  }

  // Start the automated scheduler
  private startScheduler() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('Booking Follow-up Scheduler started');
    
    // Check for scheduled follow-ups every minute
    setInterval(() => {
      this.processScheduledFollowUps();
    }, 60000);
  }

  // Process scheduled follow-ups
  private async processScheduledFollowUps() {
    const now = new Date();
    const pendingSchedules = this.schedules.filter(
      schedule => schedule.status === 'pending' && schedule.scheduledTime <= now
    );

    for (const schedule of pendingSchedules) {
      try {
        await this.sendFollowUp(schedule);
      } catch (error) {
        console.error('Error processing follow-up schedule:', error);
        this.handleScheduleError(schedule, error instanceof Error ? error.message : 'Unknown error');
      }
    }
  }

  // Send a follow-up message
  private async sendFollowUp(schedule: FollowUpSchedule) {
    try {
      // Get booking data (in real implementation, this would come from database)
      const booking = await this.getBookingData(schedule.bookingId);
      const template = await this.getTemplateData(schedule.templateId);

      if (!booking || !template) {
        throw new Error('Booking or template not found');
      }

      // Generate personalized content
      const personalizedContent = this.personalizeTemplate(template.content, booking);
      const personalizedSubject = this.personalizeTemplate(template.subject, booking);

      // Send the follow-up
      const result = await automationService.executeEmailWorkflow({
        to: booking.clientEmail,
        subject: personalizedSubject,
        content: personalizedContent,
        context: {
          booking: booking,
          template: template
        }
      });

      if (result.success) {
        // Update schedule status
        this.updateScheduleStatus(schedule.bookingId, 'sent');
        
        // Update booking status
        await this.updateBookingFollowUpStatus(schedule.bookingId, true);
        
        console.log(`Follow-up sent successfully to ${booking.clientEmail}`);
      } else {
        throw new Error(result.error || 'Failed to send follow-up');
      }
    } catch (error) {
      throw error;
    }
  }

  // Handle schedule errors
  private handleScheduleError(schedule: FollowUpSchedule, errorMessage: string) {
    schedule.attempts += 1;
    schedule.lastAttempt = new Date();
    schedule.errorMessage = errorMessage;

    if (schedule.attempts >= 3) {
      schedule.status = 'failed';
      console.error(`Follow-up failed after 3 attempts for booking ${schedule.bookingId}`);
    } else {
      // Retry in 30 minutes
      schedule.scheduledTime = new Date(Date.now() + 30 * 60 * 1000);
      console.log(`Retrying follow-up for booking ${schedule.bookingId} in 30 minutes`);
    }
  }

  // Update schedule status
  private updateScheduleStatus(scheduleId: string, status: 'sent' | 'failed' | 'cancelled') {
    const schedule = this.schedules.find(s => s.bookingId === scheduleId);
    if (schedule) {
      schedule.status = status;
    }
  }

  // Personalize template content
  private personalizeTemplate(template: string, booking: BookingData): string {
    let personalized = template;
    
    // Replace template variables
    personalized = personalized.replace(/\{\{clientName\}\}/g, booking.clientName);
    personalized = personalized.replace(/\{\{serviceType\}\}/g, booking.serviceType);
    personalized = personalized.replace(/\{\{sessionDate\}\}/g, booking.sessionDate.toLocaleDateString());
    personalized = personalized.replace(/\{\{sessionTime\}\}/g, booking.sessionTime);
    personalized = personalized.replace(/\{\{location\}\}/g, booking.location);
    personalized = personalized.replace(/\{\{duration\}\}/g, booking.duration.toString());
    personalized = personalized.replace(/\{\{price\}\}/g, `$${booking.price}`);
    personalized = personalized.replace(/\{\{clientEmail\}\}/g, booking.clientEmail);
    personalized = personalized.replace(/\{\{clientPhone\}\}/g, booking.clientPhone);
    
    return personalized;
  }

  // Schedule a follow-up
  public scheduleFollowUp(bookingId: string, templateId: string, timing: string): string {
    const scheduleId = `schedule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Calculate scheduled time based on timing
    const scheduledTime = this.calculateScheduledTime(timing);
    
    const schedule: FollowUpSchedule = {
      bookingId,
      templateId,
      scheduledTime,
      status: 'pending',
      attempts: 0
    };

    this.schedules.push(schedule);
    console.log(`Follow-up scheduled for booking ${bookingId} at ${scheduledTime}`);
    
    return scheduleId;
  }

  // Calculate scheduled time based on timing
  private calculateScheduledTime(timing: string): Date {
    const now = new Date();
    
    switch (timing) {
      case 'immediate':
        return new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes from now
      case '24h':
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
      case '48h':
        return new Date(now.getTime() + 48 * 60 * 60 * 1000);
      case '1week':
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      case '2weeks':
        return new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }
  }

  // Get booking data (mock implementation)
  private async getBookingData(bookingId: string): Promise<BookingData | null> {
    // In real implementation, this would fetch from database
    const mockBookings: BookingData[] = [
      {
        id: '1',
        clientName: 'Sarah Johnson',
        clientEmail: 'sarah.johnson@email.com',
        clientPhone: '+1-555-0123',
        serviceType: 'Portrait Session',
        sessionDate: new Date('2024-01-20T14:00:00'),
        sessionTime: '2:00 PM',
        location: 'Studio Location',
        duration: 120,
        price: 450,
        status: 'confirmed',
        notes: 'Engagement photos, outdoor session preferred',
        followUpSent: false
      }
    ];
    
    return mockBookings.find(booking => booking.id === bookingId) || null;
  }

  // Get template data (mock implementation)
  private async getTemplateData(templateId: string): Promise<FollowUpTemplate | null> {
    const mockTemplates: FollowUpTemplate[] = [
      {
        id: 'welcome',
        name: 'Welcome & Preparation',
        type: 'welcome',
        timing: 'immediate',
        subject: 'Welcome to ZESA Photography - Session Preparation Tips',
        content: `Hi {{clientName}}!

Thank you for choosing ZESA Photography for your {{serviceType}} session! We're thrilled to work with you.

Your session is scheduled for:
📅 Date: {{sessionDate}}
🕐 Time: {{sessionTime}}
📍 Location: {{location}}
⏱️ Duration: {{duration}} minutes

Preparation Tips:
• Bring any props or outfits you'd like to include
• Arrive 10 minutes early to settle in
• Feel free to bring inspiration photos
• Relax and be yourself - we'll capture your authentic moments

We'll be in touch 24 hours before your session with final details.

Looking forward to creating something beautiful together!

Best regards,
Mateo Serna Zapata
ZESA Photography
📧 info@mateoseza.com
📱 +1-555-ZESA-PHOTO`,
        enabled: true
      }
    ];
    
    return mockTemplates.find(template => template.id === templateId) || null;
  }

  // Update booking follow-up status
  private async updateBookingFollowUpStatus(bookingId: string, followUpSent: boolean) {
    // In real implementation, this would update the database
    console.log(`Updated booking ${bookingId} follow-up status: ${followUpSent}`);
  }

  // Get all schedules
  public getSchedules(): FollowUpSchedule[] {
    return this.schedules;
  }

  // Get schedules for a specific booking
  public getSchedulesForBooking(bookingId: string): FollowUpSchedule[] {
    return this.schedules.filter(schedule => schedule.bookingId === bookingId);
  }

  // Cancel a schedule
  public cancelSchedule(scheduleId: string): boolean {
    const schedule = this.schedules.find(s => s.bookingId === scheduleId);
    if (schedule && schedule.status === 'pending') {
      schedule.status = 'cancelled';
      return true;
    }
    return false;
  }

  // Get automation statistics
  public getStatistics() {
    const total = this.schedules.length;
    const sent = this.schedules.filter(s => s.status === 'sent').length;
    const pending = this.schedules.filter(s => s.status === 'pending').length;
    const failed = this.schedules.filter(s => s.status === 'failed').length;
    
    return {
      total,
      sent,
      pending,
      failed,
      successRate: total > 0 ? (sent / total) * 100 : 0
    };
  }

  // Test automation
  public async testAutomation(bookingId: string, templateId: string): Promise<{ success: boolean; message: string }> {
    try {
      const booking = await this.getBookingData(bookingId);
      const template = await this.getTemplateData(templateId);

      if (!booking || !template) {
        return { success: false, message: 'Booking or template not found' };
      }

      const personalizedContent = this.personalizeTemplate(template.content, booking);
      const personalizedSubject = this.personalizeTemplate(template.subject, booking);

      console.log('Test follow-up content:', {
        to: booking.clientEmail,
        subject: personalizedSubject,
        content: personalizedContent
      });

      return { success: true, message: 'Test follow-up generated successfully' };
    } catch (error) {
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}

export const bookingFollowUpService = BookingFollowUpService.getInstance();
