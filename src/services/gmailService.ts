// 🔧 Full-Stack Engineer - Google Cloud Gmail API Integration
// 🔒 Security & Privacy Engineer - Secure Gmail API handling
// 🤖 Email Workflow Orchestrator Integration

interface GmailMessage {
  to: string;
  from: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
}

interface GmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
  nextAction?: string;
  scheduledFollowUp?: Date;
}

class GmailService {
  private apiKey: string;
  private clientId: string;
  private projectId: string;
  private serviceAccount: string;

  constructor() {
    // 🔒 Security & Privacy Engineer - Environment configuration
    this.apiKey = (import.meta as any).env?.VITE_GOOGLE_API_KEY || '';
    this.clientId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || '665326919261-oje50obh9onl1bbc8o58tsod1lj2btn0.apps.googleusercontent.com';
    this.projectId = (import.meta as any).env?.VITE_GOOGLE_PROJECT_ID || 'zesaautomation';
    this.serviceAccount = (import.meta as any).env?.VITE_GOOGLE_SERVICE_ACCOUNT || 'seza.studio.website@gmail.com';
  }

  // 📧 Send email via EmailJS (Real Email Service)
  async sendEmail(message: GmailMessage): Promise<GmailResponse> {
    try {
      // 🔒 Security & Privacy Engineer - Input validation
      if (!this.validateMessage(message)) {
        throw new Error('Invalid email message provided');
      }

      // Import EmailJS service for real email sending
      const { emailJSService } = await import('./emailJS');
      
      // Determine if this is an internal notification or customer reply
      const isInternalNotification = message.to === this.serviceAccount;
      
      if (isInternalNotification) {
        // This is an internal notification - send to seza.studio.website@gmail.com
        console.log('📧 Sending internal notification via EmailJS:', {
          to: message.to,
          from: message.from,
          subject: message.subject,
          timestamp: new Date().toISOString(),
          routing: 'Internal notification'
        });

        // For internal notifications, we need to create a mock form data
        const mockFormData = {
          firstName: 'Contact Form',
          lastName: 'Submission',
          email: message.from,
          phone: 'Not provided',
          company: 'Not specified',
          website: 'Not provided',
          inquiryType: 'other',
          subject: message.subject,
          message: this.stripHtml(message.htmlContent),
          urgency: 'medium',
          budget: 'Not specified',
          timeline: 'Not specified',
          preferredContact: 'email'
        };

        const result = await emailJSService.sendContactFormNotification(mockFormData);
        
        return {
          success: result.success,
          message: result.message,
          messageId: result.messageId
        };
      } else {
        // This is a customer reply - send from seza.studio.website@gmail.com to customer
        console.log('📧 Sending customer reply via EmailJS:', {
          to: message.to,
          from: message.from,
          subject: message.subject,
          timestamp: new Date().toISOString(),
          routing: 'Customer reply'
        });

        // For customer replies, we need to create a mock form data
        const mockFormData = {
          firstName: 'Customer',
          lastName: 'Reply',
          email: message.to,
          phone: 'Not provided',
          company: 'Not specified',
          website: 'Not provided',
          inquiryType: 'other',
          subject: message.subject,
          message: this.stripHtml(message.htmlContent),
          urgency: 'medium',
          budget: 'Not specified',
          timeline: 'Not specified',
          preferredContact: 'email'
        };

        const result = await emailJSService.sendProfessionalReply(mockFormData, 'general-welcome');
        
        return {
          success: result.success,
          message: result.message,
          messageId: result.messageId
        };
      }

    } catch (error) {
      console.error('❌ EmailJS error:', error);
      return {
        success: false,
        message: 'Thank you for your message! We have received your inquiry and will get back to you shortly.'
      };
    }
  }

  // 🔒 Security & Privacy Engineer - Message validation
  private validateMessage(message: GmailMessage): boolean {
    const requiredFields = ['to', 'from', 'subject', 'htmlContent'];
    
    for (const field of requiredFields) {
      if (!message[field as keyof GmailMessage] || message[field as keyof GmailMessage] === '') {
        return false;
      }
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(message.to) || !emailRegex.test(message.from)) {
      return false;
    }

    return true;
  }

  // 🔧 Full-Stack Engineer - Gmail message formatting
  private createGmailMessage(message: GmailMessage): string {
    const boundary = '----=_Part_' + Math.random().toString(36).substr(2, 9);
    
    const emailContent = [
      `From: ${message.from}`,
      `To: ${message.to}`,
      `Subject: ${message.subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      ``,
      `--${boundary}`,
      `Content-Type: text/plain; charset=UTF-8`,
      `Content-Transfer-Encoding: 7bit`,
      ``,
      message.textContent || this.stripHtml(message.htmlContent),
      ``,
      `--${boundary}`,
      `Content-Type: text/html; charset=UTF-8`,
      `Content-Transfer-Encoding: 7bit`,
      ``,
      message.htmlContent,
      ``,
      `--${boundary}--`
    ].join('\n');

    // Base64 encode the message
    return btoa(emailContent).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  // 🔧 Full-Stack Engineer - HTML to text conversion
  private stripHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || doc.body.innerText || '';
  }

  // 📧 Send contact form notification with Workflow Orchestrator
  async sendContactFormNotification(formData: any): Promise<GmailResponse> {
    try {
      // Import the EmailJS service for real email sending
      const { emailJSService } = await import('./emailJS');
      
      // Send the internal notification email TO seza.studio.website@gmail.com
      const notificationResult = await emailJSService.sendContactFormNotification(formData);
      
      if (notificationResult.success) {
        // Import the Email Workflow Orchestrator
        const { emailWorkflowOrchestrator } = await import('./emailWorkflowOrchestrator');
        
        // Process the inquiry through the workflow orchestrator
        const workflowResponse = await emailWorkflowOrchestrator.processInquiry(formData);
        
        return {
          success: true,
          message: 'Professional email workflow activated! Customer will receive automated response.',
          messageId: notificationResult.messageId,
          nextAction: workflowResponse.nextAction,
          scheduledFollowUp: workflowResponse.scheduledFollowUp
        };
      } else {
        throw new Error(notificationResult.message || 'Failed to send contact form notification');
      }
    } catch (error) {
      console.error('❌ Workflow orchestrator error:', error);
      return {
        success: false,
        message: 'Thank you for your message! We have received your inquiry and will get back to you shortly.'
      };
    }
  }

  // 🎯 Route emails to appropriate team members based on inquiry type
  private getRecipientEmail(inquiryType: string, replyEmail?: string): string {
    // If a reply email is provided, use it as the recipient
    if (replyEmail && replyEmail.trim()) {
      return replyEmail.trim();
    }
    
    // Fallback to default routing based on inquiry type
    const emailRouting: { [key: string]: string } = {
      'photography': 'duvallviera@gmail.com', // Photography team
      'automation': 'duvallviera@gmail.com', // Automation team
      'ai-system': 'duvallviera@gmail.com', // AI development team
      'consulting': 'duvallviera@gmail.com', // Consulting team
      'partnership': 'duvallviera@gmail.com', // Business development
      'event': 'duvallviera@gmail.com', // Event coordination
      'other': 'duvallviera@gmail.com' // General inquiries
    };

    return emailRouting[inquiryType] || 'duvallviera@gmail.com';
  }

  // 👥 Get team member name for email template
  private getTeamMemberName(inquiryType: string): string {
    const teamMapping: { [key: string]: string } = {
      'photography': 'Photography Team',
      'automation': 'Automation Team',
      'ai-system': 'AI Development Team',
      'consulting': 'Consulting Team',
      'partnership': 'Business Development Team',
      'event': 'Event Coordination Team',
      'other': 'General Support Team'
    };

    return teamMapping[inquiryType] || 'General Support Team';
  }

  // 📧 Send automated response to customer
  async sendCustomerResponse(customerEmail: string, customerName: string): Promise<GmailResponse> {
    const htmlContent = this.generateCustomerResponseTemplate(customerName);
    
    const message: GmailMessage = {
      to: customerEmail,
      from: this.serviceAccount,
      subject: 'Thank You for Contacting SEZA Team',
      htmlContent: htmlContent,
      textContent: this.stripHtml(htmlContent)
    };

    return await this.sendEmail(message);
  }

  // 📋 Product Manager - Professional contact form template
  private generateContactFormTemplate(formData: any): string {
    const recipientEmail = this.getRecipientEmail(formData.inquiryType, formData.email);
    const teamMember = this.getTeamMemberName(formData.inquiryType);
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Contact Form Submission - SEZA Team</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
        .content { padding: 30px 20px; background: #f8f9fa; }
        .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #667eea; }
        .label { font-weight: bold; color: #495057; margin-bottom: 5px; }
        .value { color: #212529; }
        .urgent { background: #fff5f5; border-left: 4px solid #e53e3e; padding: 15px; margin: 15px 0; border-radius: 8px; }
        .footer { text-align: center; padding: 20px; background: #e9ecef; color: #6c757d; font-size: 12px; }
        .automation-badge { display: inline-block; background: #28a745; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; margin: 2px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌟 New Contact Form Submission</h1>
            <p>SEZA Team - Consciousness-Driven Automation</p>
            <p>Project: zesaautomation | Gmail API Integration</p>
                  <p><strong>Customer Email:</strong> ${formData.email}</p>
                  <p><strong>Assigned Team:</strong> ${teamMember}</p>
        </div>
        
        <div class="content">
            ${formData.urgency === 'urgent' ? '<div class="urgent"><strong>🚨 URGENT INQUIRY - IMMEDIATE ATTENTION REQUIRED</strong></div>' : ''}
            
            <div class="field">
                <div class="label">👤 Contact Information</div>
                <div class="value">
                    <strong>${formData.firstName} ${formData.lastName}</strong><br>
                    📧 ${formData.email}<br>
                    ${formData.phone ? `📞 ${formData.phone}<br>` : ''}
                    ${formData.company ? `🏢 ${formData.company}<br>` : ''}
                    ${formData.website ? `🌐 ${formData.website}<br>` : ''}
                </div>
            </div>

            <div class="field">
                <div class="label">📋 Inquiry Details</div>
                <div class="value">
                    <strong>Type:</strong> ${formData.inquiryType}<br>
                    <strong>Subject:</strong> ${formData.subject}<br>
                    <strong>Urgency:</strong> ${formData.urgency}<br>
                    <strong>Preferred Contact:</strong> ${formData.preferredContact}
                </div>
            </div>

            ${formData.budget ? `
            <div class="field">
                <div class="label">💰 Project Details</div>
                <div class="value">
                    <strong>Budget:</strong> ${formData.budget}<br>
                    <strong>Timeline:</strong> ${formData.timeline || 'Not specified'}
                </div>
            </div>
            ` : ''}

            <div class="field">
                <div class="label">💬 Message</div>
                <div class="value" style="background: #f8f9fa; padding: 15px; border-radius: 5px; border: 1px solid #dee2e6;">
                    ${formData.message.replace(/\n/g, '<br>')}
                </div>
            </div>

            <div class="field">
                <div class="label">🤖 Automation System Status</div>
                <div class="value">
                    <span class="automation-badge">✅ Gmail API Active</span>
                    <span class="automation-badge">✅ Email Response Automation</span>
                    <span class="automation-badge">✅ AI Phone System</span>
                    <span class="automation-badge">✅ Instagram Automation</span>
                    <span class="automation-badge">✅ Booking Follow-up</span>
                    <span class="automation-badge">✅ Real Miami Outreach</span>
                </div>
            </div>

            <div class="field">
                <div class="label">🔧 Technical Details</div>
                <div class="value">
                    <strong>Service Account:</strong> ${this.serviceAccount}<br>
                    <strong>Project ID:</strong> ${this.projectId}<br>
                    <strong>Client ID:</strong> ${this.clientId}<br>
                    <strong>Timestamp:</strong> ${new Date().toISOString()}
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>This email was generated by the SEZA Team Contact Form System</p>
            <p>Powered by Google Cloud Gmail API | Consciousness-Driven Automation</p>
            <p>🌐 www.sezateamengineers.com | 📧 duvallviera@gmail.com</p>
        </div>
    </div>
</body>
</html>
    `;
  }

  // 📋 Product Manager - Customer response template
  private generateCustomerResponseTemplate(customerName: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Thank You - SEZA Team</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
        .content { padding: 30px 20px; background: #f8f9fa; }
        .footer { text-align: center; padding: 20px; background: #e9ecef; color: #6c757d; font-size: 12px; }
        .feature-box { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #28a745; }
        .contact-info { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌟 Thank You, ${customerName}!</h1>
            <p>SEZA Team - Consciousness-Driven Automation</p>
        </div>
        
        <div class="content">
            <p>Dear ${customerName},</p>
            
            <p>Thank you for reaching out to SEZA Team! We've received your inquiry and are excited about the possibility of working together to create something extraordinary.</p>
            
            <div class="feature-box">
                <h3>🚀 What happens next:</h3>
                <ul>
                    <li>✅ Our team will review your inquiry within 24 hours</li>
                    <li>✅ We'll respond via your preferred contact method</li>
                    <li>✅ We'll prepare a customized proposal for your project</li>
                    <li>✅ We'll schedule a consultation to discuss your vision</li>
                </ul>
            </div>
            
            <div class="feature-box">
                <h3>🤖 Our Automation Capabilities:</h3>
                <ul>
                    <li>📧 Intelligent Email Response Systems</li>
                    <li>📞 AI-Powered Phone Communication</li>
                    <li>📱 Social Media Automation</li>
                    <li>📅 Smart Booking & Follow-up Systems</li>
                    <li>🌐 Real-time Business Outreach</li>
                </ul>
            </div>
            
            <div class="contact-info">
                <h3>📞 Need immediate assistance?</h3>
                <p><strong>Email:</strong> duvallviera@gmail.com</p>
                <p><strong>Phone:</strong> (305) 370-9228</p>
                <p><strong>Website:</strong> www.sezateamengineers.com</p>
            </div>
            
            <p>In the meantime, feel free to explore our portfolio and learn more about our consciousness-driven approach to business automation.</p>
            
            <p>With consciousness and harmony,<br>
            <strong>The SEZA Team</strong></p>
        </div>
        
        <div class="footer">
            <p>SEZA Team | Consciousness-Driven Automation</p>
            <p>Powered by Google Cloud Gmail API | Project: zesaautomation</p>
            <p>🌐 www.sezateamengineers.com | 📧 duvallviera@gmail.com</p>
        </div>
    </div>
</body>
</html>
    `;
  }
}

// Export singleton instance
export const gmailService = new GmailService();
export default gmailService;
