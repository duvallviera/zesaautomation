// 📧 Simple Email Service - Immediate Fallback for Testing
// This service provides immediate functionality while EmailJS is being set up

interface SimpleEmailMessage {
  to: string;
  from: string;
  subject: string;
  message: string;
  customer_name?: string;
  inquiry_type?: string;
  company?: string;
  phone?: string;
  website?: string;
  urgency?: string;
  budget?: string;
  timeline?: string;
}

interface SimpleEmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
}

class SimpleEmailService {
  // 📧 Send contact form notification
  async sendContactFormNotification(formData: any): Promise<SimpleEmailResponse> {
    try {
      console.log('📧 SIMPLE EMAIL SERVICE - Contact form notification:', {
        to: 'seza.studio.website@gmail.com',
        from: formData.email,
        subject: `🌟 New Contact Form: ${formData.subject}`,
        customer: `${formData.firstName} ${formData.lastName}`,
        inquiryType: formData.inquiryType,
        urgency: formData.urgency
      });

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        success: true,
        message: 'Contact form notification logged successfully! (EmailJS setup required for actual sending)',
        messageId: `simple_${Date.now()}`
      };

    } catch (error) {
      console.error('❌ Simple email service error:', error);
      return {
        success: false,
        message: 'Failed to process contact form notification.'
      };
    }
  }

  // 📧 Send professional reply
  async sendProfessionalReply(formData: any, template: string): Promise<SimpleEmailResponse> {
    try {
      console.log('📧 SIMPLE EMAIL SERVICE - Professional reply:', {
        to: formData.email,
        from: 'seza.studio.website@gmail.com',
        subject: `Re: ${formData.subject} - Thank You for Contacting SEZA Team`,
        template: template,
        customer: `${formData.firstName} ${formData.lastName}`,
        inquiryType: formData.inquiryType
      });

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        success: true,
        message: 'Professional reply logged successfully! (EmailJS setup required for actual sending)',
        messageId: `simple_${Date.now()}`
      };

    } catch (error) {
      console.error('❌ Simple email service error:', error);
      return {
        success: false,
        message: 'Failed to process professional reply.'
      };
    }
  }
}

export const simpleEmailService = new SimpleEmailService();
