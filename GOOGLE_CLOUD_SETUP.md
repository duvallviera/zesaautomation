# 🚀 Google Cloud Gmail API Setup - SEZA Team

## 🎯 **Super Orchestrator - Google Cloud Integration**

**Selected Team Members:**
- 🔧 **Full-Stack Engineer (34y)** - Google Cloud API integration
- 🔒 **Security & Privacy Engineer (30y)** - Google Cloud security configuration
- 🌐 **Next.js Architect (34y)** - Gmail API deployment optimization

## ✅ **Your Google Cloud Configuration**

### **Project Details:**
- **Project Name**: `zesaautomation`
- **Client ID**: `665326919261-oje50obh9onl1bbc8o58tsod1lj2btn0.apps.googleusercontent.com`
- **Service Account**: `seza.studio.website@gmail.com`
- **API**: `apikeys.googleapis.com`

## 🔧 **Environment Variables Setup**

Create a `.env` file in your project root with these variables:

```env
# Google Cloud Configuration
VITE_GOOGLE_API_KEY=your_gmail_api_key_here
VITE_GOOGLE_CLIENT_ID=665326919261-oje50obh9onl1bbc8o58tsod1lj2btn0.apps.googleusercontent.com
VITE_GOOGLE_PROJECT_ID=zesaautomation
VITE_GOOGLE_SERVICE_ACCOUNT=seza.studio.website@gmail.com

# Gmail API Configuration
VITE_GMAIL_API_URL=https://gmail.googleapis.com/gmail/v1/users/seza.studio.website@gmail.com/messages/send

# Production Configuration
VITE_APP_URL=https://your-domain.com
VITE_APP_NAME=SEZA Team Contact Form
```

## 🔑 **Gmail API Key Setup**

### **Step 1: Enable Gmail API**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: `zesaautomation`
3. Navigate to **APIs & Services** → **Library**
4. Search for "Gmail API"
5. Click **Enable**

### **Step 2: Create API Key**
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **API Key**
3. Copy the API key
4. Add it to your `.env` file as `VITE_GOOGLE_API_KEY`

### **Step 3: Configure OAuth Consent**
1. Go to **APIs & Services** → **OAuth consent screen**
2. Configure the consent screen:
   - **App name**: SEZA Team Contact Form
   - **User support email**: duvallviera@gmail.com
   - **Developer contact**: duvallviera@gmail.com
3. Add scopes:
   - `https://www.googleapis.com/auth/gmail.send`
   - `https://www.googleapis.com/auth/gmail.compose`

### **Step 4: Service Account Setup**
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Name: `seza-contact-form`
4. Description: `Service account for SEZA contact form`
5. Grant access to Gmail API

## 🚀 **Deployment Configuration**

### **Vercel Environment Variables**
Add these to your Vercel dashboard:

```env
VITE_GOOGLE_API_KEY=your_gmail_api_key
VITE_GOOGLE_CLIENT_ID=665326919261-oje50obh9onl1bbc8o58tsod1lj2btn0.apps.googleusercontent.com
VITE_GOOGLE_PROJECT_ID=zesaautomation
VITE_GOOGLE_SERVICE_ACCOUNT=seza.studio.website@gmail.com
```

### **Domain Configuration**
1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS settings
4. SSL certificate will be automatically provisioned

## 🔒 **Security Configuration**

### **API Key Restrictions**
1. In Google Cloud Console, go to **APIs & Services** → **Credentials**
2. Click on your API key
3. Set **Application restrictions**:
   - **HTTP referrers**: Add your domain(s)
   - **IP addresses**: Add Vercel IP ranges (optional)
4. Set **API restrictions**:
   - **Restrict key**: Select "Gmail API"

### **CORS Configuration**
The Gmail API handles CORS automatically, but ensure your domain is whitelisted in the OAuth consent screen.

## 📧 **Email Templates**

### **Contact Form Notification Template**
- **To**: duvallviera@gmail.com
- **From**: seza.studio.website@gmail.com
- **Subject**: 🌟 New Contact Form: [Subject]
- **Content**: Professional HTML template with form data

### **Customer Response Template**
- **To**: Customer email
- **From**: seza.studio.website@gmail.com
- **Subject**: Thank You for Contacting SEZA Team
- **Content**: Professional thank you message with next steps

## 🧪 **Testing**

### **Local Testing**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Test form submission
# Check browser console for API calls
# Verify emails are received
```

### **Production Testing**
1. Deploy to Vercel
2. Test form submission
3. Check email delivery
4. Verify automated responses
5. Test mobile responsiveness

## 📊 **Monitoring**

### **Google Cloud Monitoring**
1. Go to **Monitoring** → **Dashboards**
2. Create dashboard for Gmail API usage
3. Set up alerts for API quota limits
4. Monitor email delivery rates

### **Vercel Analytics**
1. Enable Vercel Analytics
2. Monitor form conversion rates
3. Track page performance
4. Monitor error rates

## 🔧 **Troubleshooting**

### **Common Issues**

#### **API Key Not Working**
- Verify API key is correct
- Check API restrictions
- Ensure Gmail API is enabled
- Verify project ID matches

#### **CORS Errors**
- Check domain whitelist in OAuth consent
- Verify HTTPS is enabled
- Check browser console for errors

#### **Email Not Sending**
- Verify service account permissions
- Check Gmail API quotas
- Verify email addresses are valid
- Check Google Cloud logs

### **Debug Commands**
```bash
# Check environment variables
console.log(import.meta.env.VITE_GOOGLE_API_KEY)

# Test API connection
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://gmail.googleapis.com/gmail/v1/users/seza.studio.website@gmail.com/profile"
```

## 🎯 **Go Live Checklist**

### **Pre-Deployment**
- [ ] Gmail API enabled in Google Cloud
- [ ] API key created and configured
- [ ] OAuth consent screen configured
- [ ] Service account permissions set
- [ ] Environment variables configured
- [ ] Form tested locally

### **Deployment**
- [ ] Vercel project created
- [ ] Environment variables added to Vercel
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Build successful

### **Post-Deployment**
- [ ] Form submission test
- [ ] Email delivery test
- [ ] Auto-response test
- [ ] Mobile responsiveness test
- [ ] Analytics tracking active
- [ ] Monitoring alerts configured

## 📞 **Support**

### **Google Cloud Support**
- [Google Cloud Documentation](https://cloud.google.com/gmail/api/docs)
- [Gmail API Reference](https://developers.google.com/gmail/api/reference)
- [Google Cloud Console](https://console.cloud.google.com/)

### **Vercel Support**
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Dashboard](https://vercel.com/dashboard)

---

**🌟 Ready to deploy with Google Cloud Gmail API integration!**

*SEZA Team - Consciousness-Driven Automation with Google Cloud*
