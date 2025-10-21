# 📧 EmailJS Setup Guide

## Overview
EmailJS allows you to send emails directly from your frontend application without a backend server. This guide will help you set up EmailJS to send real emails from your contact form.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** as your email service
4. Connect your Gmail account (`seza.studio.website@gmail.com`)
5. Note down your **Service ID** (e.g., `service_seza_automation`)

## Step 3: Create Email Templates

### Template 1: Contact Form Notification
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template ID: `template_seza_contact`
4. Configure the template:

**Template Settings:**
- **Template Name**: SEZA Contact Form Notification
- **Subject**: `🌟 New Contact Form: {{subject}}`
- **From Name**: `{{customer_name}}`
- **From Email**: `{{from_email}}`
- **To Email**: `seza.studio.website@gmail.com`

**Template Content:**
```html
<h2>🌟 NEW CONTACT FORM SUBMISSION</h2>

<h3>👤 CUSTOMER DETAILS:</h3>
<p><strong>Name:</strong> {{customer_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Company:</strong> {{company}}</p>
<p><strong>Website:</strong> {{website}}</p>

<h3>📋 INQUIRY DETAILS:</h3>
<p><strong>Type:</strong> {{inquiry_type}}</p>
<p><strong>Subject:</strong> {{subject}}</p>
<p><strong>Urgency:</strong> {{urgency}}</p>
<p><strong>Budget:</strong> {{budget}}</p>
<p><strong>Timeline:</strong> {{timeline}}</p>

<h3>💬 MESSAGE:</h3>
<p>{{message}}</p>

<hr>
<p><em>This email was sent via the SEZA AI Assistant automation system.</em></p>
```

### Template 2: Professional Reply
1. Create another template
2. Use this template ID: `template_seza_reply`
3. Configure the template:

**Template Settings:**
- **Template Name**: SEZA Professional Reply
- **Subject**: `Re: {{subject}} - Thank You for Contacting SEZA Team`
- **From Name**: `SEZA Team`
- **From Email**: `seza.studio.website@gmail.com`
- **To Email**: `{{to_email}}`

**Template Content:**
```html
<p>Dear {{customer_name}},</p>

<p>Thank you for reaching out to SEZA Team! We've received your inquiry and our team is reviewing it to provide you with the best possible response.</p>

<h3>📋 WHAT HAPPENS NEXT?</h3>
<ul>
  <li><strong>Within 24-48 hours:</strong> Our team will review your inquiry</li>
  <li><strong>Personalized Response:</strong> Tailored response based on your specific needs</li>
  <li><strong>Next Steps:</strong> Clear guidance on how we can help you</li>
</ul>

<h3>🚀 SEZA TEAM SERVICES:</h3>
<ul>
  <li>📸 <strong>Photography:</strong> Professional photography services</li>
  <li>🤖 <strong>Automation:</strong> Business process automation</li>
  <li>🧠 <strong>AI Systems:</strong> Custom AI development</li>
  <li>💼 <strong>Consulting:</strong> Strategic business consulting</li>
  <li>🤝 <strong>Partnerships:</strong> Strategic business partnerships</li>
  <li>🎉 <strong>Events:</strong> Event management and coordination</li>
</ul>

<p>We're committed to providing exceptional service and finding the best solution for your needs.</p>

<p>Best regards,<br>
<strong>SEZA Team</strong><br>
📧 info@sezateamengineers.com<br>
📞 (305) 555-SEZA<br>
🌐 www.sezateamengineers.com</p>

<hr>
<p><em>This email was sent via our automated workflow system.</em></p>
```

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key**
3. Copy the public key (e.g., `user_xxxxxxxxxxxxxxxx`)

## Step 5: Configure Environment Variables

1. Create a `.env` file in your project root
2. Add your EmailJS public key:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 6: Update EmailJS Service Configuration

Update the EmailJS service configuration in `src/services/emailJS.ts`:

```typescript
// Replace these with your actual EmailJS values
this.serviceId = 'service_seza_automation'; // Your service ID
this.templateId = 'template_seza_contact'; // Your template ID
this.publicKey = 'your_public_key_here'; // Your public key
```

## Step 7: Test the Setup

1. Start your development server: `npm run dev`
2. Go to the contact form: `http://localhost:5000/contact-us`
3. Fill out and submit the form
4. Check your email (`seza.studio.website@gmail.com`) for the notification
5. Check the customer's email for the professional reply

## Troubleshooting

### Common Issues:

1. **"EmailJS not initialized" error**
   - Check that your public key is correct
   - Ensure the public key is in your `.env` file

2. **"Service not found" error**
   - Verify your service ID is correct
   - Make sure the service is active in EmailJS dashboard

3. **"Template not found" error**
   - Verify your template IDs are correct
   - Make sure templates are published in EmailJS dashboard

4. **Emails not being sent**
   - Check browser console for errors
   - Verify Gmail account connection in EmailJS
   - Check spam folder

### EmailJS Limits:
- **Free Plan**: 200 emails/month
- **Paid Plans**: Start at $15/month for 1,000 emails

## Security Notes

- Never expose your private keys in client-side code
- Use environment variables for sensitive configuration
- EmailJS handles authentication securely
- All emails are sent through EmailJS servers

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/
- SEZA Team Support: info@sezateamengineers.com

---

**Next Steps:**
1. Set up EmailJS account and services
2. Configure templates
3. Add environment variables
4. Test email sending
5. Deploy to production

Once configured, your contact form will send real emails to both you and your customers!
