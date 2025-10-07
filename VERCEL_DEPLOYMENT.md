# 🚀 Vercel Deployment Guide - SEZA Contact Form

## 🎯 **Super Orchestrator - Vercel Deployment**

**Selected Team Members:**
- 🔧 **Full-Stack Engineer (34y)** - Vercel deployment with Gmail API
- 🌐 **Next.js Architect (34y)** - Vercel optimization
- 🔒 **Security & Privacy Engineer (30y)** - Environment security

## ✅ **Your Google Cloud Configuration**

### **Project Details:**
- **Project Name**: `zesaautomation`
- **Client ID**: `665326919261-oje50obh9onl1bbc8o58tsod1lj2btn0.apps.googleusercontent.com`
- **Service Account**: `seza.studio.website@gmail.com`
- **Hosting**: Vercel subdomain

## 🚀 **Step-by-Step Deployment**

### **Step 1: Get Gmail API Key (5 minutes)**

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Select project: `zesaautomation`

2. **Enable Gmail API**
   - Navigate to **APIs & Services** → **Library**
   - Search for "Gmail API"
   - Click **Enable**

3. **Create API Key**
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **API Key**
   - Copy the generated API key
   - **IMPORTANT**: Save this key - you'll need it for Vercel

### **Step 2: Deploy to Vercel (10 minutes)**

1. **Go to Vercel**
   - Visit: https://vercel.com/
   - Sign up/Login with GitHub

2. **Import Project**
   - Click **New Project**
   - Import your GitHub repository
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Add Environment Variables**
   - In Vercel dashboard, go to **Settings** → **Environment Variables**
   - Add these variables:

```env
VITE_GOOGLE_API_KEY=your_gmail_api_key_here
VITE_GOOGLE_CLIENT_ID=665326919261-oje50obh9onl1bbc8o58tsod1lj2btn0.apps.googleusercontent.com
VITE_GOOGLE_PROJECT_ID=zesaautomation
VITE_GOOGLE_SERVICE_ACCOUNT=seza.studio.website@gmail.com
VITE_APP_URL=https://your-project-name.vercel.app
VITE_APP_NAME=SEZA Team Contact Form
```

4. **Deploy**
   - Click **Deploy**
   - Wait for build to complete
   - Your site will be live at: `https://your-project-name.vercel.app`

### **Step 3: Configure Gmail API Permissions**

1. **OAuth Consent Screen**
   - Go to **APIs & Services** → **OAuth consent screen**
   - Configure:
     - **App name**: SEZA Team Contact Form
     - **User support email**: duvallviera@gmail.com
     - **Developer contact**: duvallviera@gmail.com

2. **Add Scopes**
   - Click **Add or Remove Scopes**
   - Add these scopes:
     - `https://www.googleapis.com/auth/gmail.send`
     - `https://www.googleapis.com/auth/gmail.compose`

3. **Authorized Domains**
   - Add your Vercel domain: `your-project-name.vercel.app`
   - Add `localhost:3000` for testing

### **Step 4: Test Your Deployment**

1. **Visit Your Site**
   - Go to your Vercel URL
   - Navigate to `/contact-us`

2. **Test Form Submission**
   - Fill out the contact form
   - Submit the form
   - Check your email (duvallviera@gmail.com)

3. **Verify Automated Response**
   - Check the email you used in the form
   - You should receive an automated thank you email

## 🔧 **Commands to Run**

### **Local Testing**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Test form at http://localhost:5000/contact-us
```

### **Production Deployment**
```bash
# Build for production
npm run build

# Deploy to Vercel (if using Vercel CLI)
npx vercel --prod

# Or just push to GitHub (if connected to Vercel)
git add .
git commit -m "Deploy SEZA contact form to production"
git push origin main
```

## 📧 **Email Configuration**

### **Contact Form Notifications**
- **To**: duvallviera@gmail.com
- **From**: seza.studio.website@gmail.com
- **Subject**: 🌟 New Contact Form: [Subject]
- **Content**: Professional HTML template with all form data

### **Customer Auto-Response**
- **To**: Customer email
- **From**: seza.studio.website@gmail.com
- **Subject**: Thank You for Contacting SEZA Team
- **Content**: Professional thank you message with next steps

## 🔒 **Security Features**

### **Environment Variables**
- All sensitive data stored in Vercel environment variables
- API keys not exposed in client-side code
- Secure Gmail API integration

### **HTTPS & SSL**
- Automatic SSL certificate from Vercel
- HTTPS enforced for all traffic
- Secure form submissions

### **CORS & Headers**
- Proper CORS configuration
- Security headers configured
- XSS protection enabled

## 📊 **Monitoring & Analytics**

### **Vercel Analytics**
1. Enable Vercel Analytics in dashboard
2. Monitor form conversion rates
3. Track page performance
4. Monitor error rates

### **Google Cloud Monitoring**
1. Monitor Gmail API usage
2. Set up alerts for quota limits
3. Track email delivery rates

## 🧪 **Testing Checklist**

### **Pre-Deployment**
- [ ] Gmail API enabled in Google Cloud
- [ ] API key created and saved
- [ ] OAuth consent screen configured
- [ ] Form tested locally
- [ ] Environment variables ready

### **Deployment**
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] Build successful
- [ ] Site accessible via Vercel URL

### **Post-Deployment**
- [ ] Form submission test
- [ ] Email delivery test
- [ ] Auto-response test
- [ ] Mobile responsiveness test
- [ ] Analytics tracking active

## 🔧 **Troubleshooting**

### **Common Issues**

#### **Build Fails**
- Check environment variables are set
- Verify all dependencies are installed
- Check build logs in Vercel dashboard

#### **Form Not Sending Emails**
- Verify Gmail API key is correct
- Check Gmail API is enabled
- Verify service account permissions
- Check browser console for errors

#### **CORS Errors**
- Verify domain is whitelisted in OAuth consent
- Check HTTPS is enabled
- Verify API key restrictions

### **Debug Commands**
```bash
# Check environment variables
console.log(import.meta.env.VITE_GOOGLE_API_KEY)

# Test API connection
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://gmail.googleapis.com/gmail/v1/users/seza.studio.website@gmail.com/profile"
```

## 🎯 **Your Live URL**

Once deployed, your contact form will be available at:
**`https://your-project-name.vercel.app/contact-us`**

## 📞 **Support**

### **Vercel Support**
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Dashboard](https://vercel.com/dashboard)

### **Google Cloud Support**
- [Gmail API Documentation](https://developers.google.com/gmail/api)
- [Google Cloud Console](https://console.cloud.google.com/)

---

**🌟 Ready to deploy your SEZA contact form to production!**

*SEZA Team - Consciousness-Driven Automation with Vercel & Google Cloud*
