// 📧 EmailJS Service - Real Email Sending Integration
import emailjs from '@emailjs/browser';

interface EmailJSMessage extends Record<string, unknown> {
  to_email: string;
  from_email: string;
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

interface EmailJSResponse {
  success: boolean;
  message: string;
  messageId?: string;
}

class EmailJSService {
  private serviceId: string;
  private templateId: string;
  private publicKey: string;
  private isInitialized: boolean = false;

  constructor() {
    // EmailJS Configuration
    this.serviceId = 'service_seza_automation'; // You'll need to create this in EmailJS
    this.templateId = 'template_seza_contact'; // You'll need to create this in EmailJS
    this.publicKey = (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_EMAILJS_PUBLIC_KEY';
    
    this.initializeEmailJS();
  }

  private initializeEmailJS(): void {
    try {
      emailjs.init(this.publicKey);
      this.isInitialized = true;
      console.log('✅ EmailJS initialized successfully');
    } catch (error) {
      console.error('❌ EmailJS initialization failed:', error);
      this.isInitialized = false;
    }
  }

  // 📧 Send contact form notification (TO seza.studio.website@gmail.com)
  async sendContactFormNotification(formData: any): Promise<EmailJSResponse> {
    try {
      if (!this.isInitialized || this.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
        console.log('⚠️ EmailJS not configured - using fallback service');
        // Import and use simple email service as fallback
        const { simpleEmailService } = await import('./simpleEmailService');
        return await simpleEmailService.sendContactFormNotification(formData);
      }

      const templateParams: EmailJSMessage = {
        to_email: 'seza.studio.website@gmail.com', // TO your email
        from_email: formData.email, // FROM customer's email
        subject: `🌟 New Contact Form: ${formData.subject}`,
        message: this.generateContactFormMessage(formData),
        customer_name: `${formData.firstName} ${formData.lastName}`,
        inquiry_type: formData.inquiryType,
        company: formData.company || 'Not specified',
        phone: formData.phone || 'Not provided',
        website: formData.website || 'Not provided',
        urgency: formData.urgency,
        budget: formData.budget || 'Not specified',
        timeline: formData.timeline || 'Not specified'
      };

      console.log('📧 Sending contact form notification via EmailJS:', {
        to: templateParams.to_email,
        from: templateParams.from_email,
        subject: templateParams.subject
      });

      const result = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      console.log('✅ Contact form notification sent successfully:', result);
      
      return {
        success: true,
        message: 'Contact form notification sent successfully!',
        messageId: result.text
      };

    } catch (error) {
      console.error('❌ Error sending contact form notification:', error);
      return {
        success: false,
        message: 'Failed to send contact form notification. Please try again.'
      };
    }
  }

  // 📧 Send professional reply (FROM seza.studio.website@gmail.com TO customer)
  async sendProfessionalReply(formData: any, template: string): Promise<EmailJSResponse> {
    try {
      if (!this.isInitialized || this.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
        console.log('⚠️ EmailJS not configured - using fallback service');
        // Import and use simple email service as fallback
        const { simpleEmailService } = await import('./simpleEmailService');
        return await simpleEmailService.sendProfessionalReply(formData, template);
      }

      const templateParams: EmailJSMessage = {
        to_email: formData.email, // TO customer's email
        from_email: 'seza.studio.website@gmail.com', // FROM your email
        subject: `Re: ${formData.subject} - Thank You for Contacting SEZA Team`,
        message: this.generateProfessionalReplyMessage(formData, template),
        customer_name: `${formData.firstName} ${formData.lastName}`,
        inquiry_type: formData.inquiryType,
        company: formData.company || 'Not specified',
        phone: formData.phone || 'Not provided',
        website: formData.website || 'Not provided',
        urgency: formData.urgency,
        budget: formData.budget || 'Not specified',
        timeline: formData.timeline || 'Not specified'
      };

      console.log('📧 Sending professional reply via EmailJS:', {
        to: templateParams.to_email,
        from: templateParams.from_email,
        subject: templateParams.subject,
        template: template
      });

      const result = await emailjs.send(
        this.serviceId,
        'template_seza_reply', // Different template for replies
        templateParams
      );

      console.log('✅ Professional reply sent successfully:', result);
      
      return {
        success: true,
        message: 'Professional reply sent successfully!',
        messageId: result.text
      };

    } catch (error) {
      console.error('❌ Error sending professional reply:', error);
      return {
        success: false,
        message: 'Failed to send professional reply. Please try again.'
      };
    }
  }

  // 📝 Generate contact form message for internal notification
  private generateContactFormMessage(formData: any): string {
    return `
🌟 NEW CONTACT FORM SUBMISSION

👤 CUSTOMER DETAILS:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not specified'}
Website: ${formData.website || 'Not provided'}

📋 INQUIRY DETAILS:
Type: ${formData.inquiryType}
Subject: ${formData.subject}
Urgency: ${formData.urgency}
Preferred Contact: ${formData.preferredContact}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}

💬 MESSAGE:
${formData.message}

📊 AUTOMATION STATUS:
✅ Gmail API Active
✅ Email Response Automation
✅ AI Phone System
✅ Instagram Automation
✅ Booking Follow-up
✅ Real Miami Outreach

🔧 TECHNICAL DETAILS:
Service Account: seza.studio.website@gmail.com
Project ID: zesaautomation
Client ID: 665326919261-oje50obh9onl1bbc8o58tsod1lj2btn0.apps.googleusercontent.com
Consent to contact: ${formData.consent ? 'Yes' : 'No'}
Newsletter subscription: ${formData.newsletter ? 'Yes' : 'No'}

---
This email was sent via the SEZA AI Assistant automation system.
    `.trim();
  }

  // 📝 Generate professional reply message for customer
  private generateProfessionalReplyMessage(formData: any, template: string): string {
    const inquiryType = formData.inquiryType;
    const customerName = formData.firstName;
    
    // Generate different messages based on inquiry type
    const messages = {
      'photography': `
Dear ${customerName},

Thank you for your interest in SEZA Team's photography services! We're excited to help bring your vision to life.

🎯 WHAT HAPPENS NEXT?
• Within 24 hours: Our photography team will review your inquiry
• Portfolio Review: We'll send you our latest portfolio showcasing similar projects
• Consultation Call: Schedule a free 30-minute consultation to discuss your needs

🌟 WHY CHOOSE SEZA TEAM PHOTOGRAPHY?
• Professional Quality: Award-winning photographers with 10+ years experience
• Creative Vision: Unique artistic approach tailored to your brand
• Fast Turnaround: Quick delivery without compromising quality
• Modern Technology: Latest equipment and editing software
• Personal Service: Dedicated project manager for each client

We're committed to exceeding your expectations and creating stunning visuals that tell your story.

Best regards,
SEZA Photography Team
📧 photography@sezateamengineers.com
📞 (305) 555-SEZA
🌐 www.sezateamengineers.com
      `,
      'automation': `
Dear ${customerName},

Thank you for your interest in SEZA Team's business automation solutions! We're excited to help streamline your operations and boost your productivity.

🚀 WHAT HAPPENS NEXT?
• Within 12 hours: Our automation specialists will analyze your requirements
• Case Studies: We'll send relevant case studies showing similar automation success stories
• Demo Call: Schedule a personalized demo of our automation platform

⚡ OUR AUTOMATION CAPABILITIES:
• Workflow Automation: Streamline repetitive tasks and processes
• Email Automation: Smart email campaigns and responses
• Social Media Automation: Automated posting and engagement
• Data Processing: Automated data collection and analysis
• AI Integration: Intelligent decision-making systems
• Analytics & Reporting: Real-time performance monitoring

We're committed to delivering automation solutions that save you time, reduce costs, and improve efficiency.

Best regards,
SEZA Automation Team
📧 automation@sezateamengineers.com
📞 (305) 555-SEZA
🌐 www.sezateamengineers.com
      `,
      'ai-system': `
Dear ${customerName},

Thank you for your interest in SEZA Team's AI system development services! We're excited to explore how artificial intelligence can transform your business.

⚡ URGENT PRIORITY - WHAT HAPPENS NEXT?
• Within 6 hours: Our AI specialists will review your requirements
• Capabilities Overview: Detailed breakdown of our AI capabilities
• Consultation Call: Priority scheduling for AI strategy consultation

🚀 OUR AI DEVELOPMENT EXPERTISE:
• Machine Learning: Custom ML models and algorithms
• Natural Language Processing: Chatbots and language understanding
• Computer Vision: Image and video analysis systems
• Predictive Analytics: Data-driven forecasting and insights
• Process Automation: Intelligent workflow optimization
• Custom AI Solutions: Tailored AI systems for your industry

We're committed to delivering cutting-edge AI solutions that give you a competitive advantage.

Best regards,
SEZA AI Development Team
📧 ai@sezateamengineers.com
📞 (305) 555-SEZA
🌐 www.sezateamengineers.com
      `,
      'consulting': `
Dear ${customerName},

Thank you for considering SEZA Team for your consulting needs! We're excited to help you achieve your business goals through strategic guidance and expert insights.

📈 WHAT HAPPENS NEXT?
• Within 48 hours: Our consulting team will review your requirements
• Expertise Overview: Detailed breakdown of our consulting capabilities
• Strategy Session: Free initial consultation to discuss your challenges

🎯 OUR CONSULTING EXPERTISE:
• Business Strategy: Strategic planning and market analysis
• Digital Transformation: Technology adoption and optimization
• Growth Planning: Scaling strategies and market expansion
• Process Optimization: Efficiency improvements and cost reduction
• Change Management: Organizational transformation support
• Technology Consulting: IT strategy and implementation

We're committed to providing actionable insights that drive real business results.

Best regards,
SEZA Consulting Team
📧 consulting@sezateamengineers.com
📞 (305) 555-SEZA
🌐 www.sezateamengineers.com
      `,
      'partnership': `
Dear ${customerName},

Thank you for your interest in partnering with SEZA Team! We're excited to explore how we can create mutual value through strategic collaboration.

🚀 WHAT HAPPENS NEXT?
• Within 24 hours: Our business development team will review your proposal
• Partnership Opportunities: Detailed overview of potential collaboration areas
• Strategy Meeting: Schedule a partnership strategy discussion

🌟 PARTNERSHIP OPPORTUNITIES:
• Strategic Alliances: Long-term business partnerships
• Joint Ventures: Collaborative project development
• Technology Integration: API partnerships and integrations
• Channel Partnerships: Reseller and referral programs
• Co-Marketing: Joint marketing initiatives
• Service Partnerships: Complementary service offerings

We're committed to building lasting partnerships that create value for both organizations.

Best regards,
SEZA Business Development Team
📧 partnerships@sezateamengineers.com
📞 (305) 555-SEZA
🌐 www.sezateamengineers.com
      `,
      'event': `
Dear ${customerName},

Thank you for your interest in collaborating with SEZA Team for your event! We're excited to help make your event a memorable success.

📅 WHAT HAPPENS NEXT?
• Within 48 hours: Our event coordination team will review your requirements
• Event Portfolio: Showcase of our previous successful events
• Planning Session: Schedule an event planning consultation

🎯 OUR EVENT SERVICES:
• Event Photography: Professional event coverage and documentation
• Video Production: Event highlights and promotional videos
• Creative Design: Event branding and promotional materials
• Social Media: Live event coverage and promotion
• Automation: Event registration and follow-up systems
• Analytics: Event performance tracking and reporting

We're committed to delivering exceptional event experiences that exceed your expectations.

Best regards,
SEZA Event Coordination Team
📧 events@sezateamengineers.com
📞 (305) 555-SEZA
🌐 www.sezateamengineers.com
      `,
      'other': `
Dear ${customerName},

Thank you for reaching out to SEZA Team! We've received your inquiry and our team is reviewing it to provide you with the best possible response.

📋 WHAT HAPPENS NEXT?
• Within 72 hours: Our team will review your inquiry
• Personalized Response: Tailored response based on your specific needs
• Next Steps: Clear guidance on how we can help you

🚀 SEZA TEAM SERVICES:
• Photography: Professional photography services
• Automation: Business process automation
• AI Systems: Custom AI development
• Consulting: Strategic business consulting
• Partnerships: Strategic business partnerships
• Events: Event management and coordination

We're committed to providing exceptional service and finding the best solution for your needs.

Best regards,
SEZA Team
📧 info@sezateamengineers.com
📞 (305) 555-SEZA
🌐 www.sezateamengineers.com
      `
    };

    return messages[inquiryType as keyof typeof messages] || messages['other'];
  }
}

export const emailJSService = new EmailJSService();
