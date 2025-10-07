var I=Object.defineProperty;var N=(t,e,i)=>e in t?I(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var l=(t,e,i)=>(N(t,typeof e!="symbol"?e+"":e,i),i);import{_ as v}from"./index-386f1096.js";class c{constructor(e=0,i="Network Error"){this.status=e,this.text=i}}const R=()=>{if(!(typeof localStorage>"u"))return{get:t=>Promise.resolve(localStorage.getItem(t)),set:(t,e)=>Promise.resolve(localStorage.setItem(t,e)),remove:t=>Promise.resolve(localStorage.removeItem(t))}},n={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:R()},y=t=>t?typeof t=="string"?{publicKey:t}:t.toString()==="[object Object]"?t:{}:{},_=(t,e="https://api.emailjs.com")=>{if(!t)return;const i=y(t);n.publicKey=i.publicKey,n.blockHeadless=i.blockHeadless,n.storageProvider=i.storageProvider,n.blockList=i.blockList,n.limitRate=i.limitRate,n.origin=i.origin||e},b=async(t,e,i={})=>{const o=await fetch(n.origin+t,{method:"POST",headers:i,body:e}),s=await o.text(),r=new c(o.status,s);if(o.ok)return r;throw r},f=(t,e,i)=>{if(!t||typeof t!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!e||typeof e!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!i||typeof i!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},C=t=>{if(t&&t.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},S=t=>t.webdriver||!t.languages||t.languages.length===0,E=()=>new c(451,"Unavailable For Headless Browser"),k=(t,e)=>{if(!Array.isArray(t))throw"The BlockList list has to be an array";if(typeof e!="string")throw"The BlockList watchVariable has to be a string"},O=t=>{var e;return!((e=t.list)!=null&&e.length)||!t.watchVariable},L=(t,e)=>t instanceof FormData?t.get(e):t[e],w=(t,e)=>{if(O(t))return!1;k(t.list,t.watchVariable);const i=L(e,t.watchVariable);return typeof i!="string"?!1:t.list.includes(i)},T=()=>new c(403,"Forbidden"),z=(t,e)=>{if(typeof t!="number"||t<0)throw"The LimitRate throttle has to be a positive number";if(e&&typeof e!="string")throw"The LimitRate ID has to be a non-empty string"},j=async(t,e,i)=>{const o=Number(await i.get(t)||0);return e-Date.now()+o},A=async(t,e,i)=>{if(!e.throttle||!i)return!1;z(e.throttle,e.id);const o=e.id||t;return await j(o,e.throttle,i)>0?!0:(await i.set(o,Date.now().toString()),!1)},P=()=>new c(429,"Too Many Requests"),W=async(t,e,i,o)=>{const s=y(o),r=s.publicKey||n.publicKey,u=s.blockHeadless||n.blockHeadless,m=s.storageProvider||n.storageProvider,d={...n.blockList,...s.blockList},g={...n.limitRate,...s.limitRate};return u&&S(navigator)?Promise.reject(E()):(f(r,t,e),C(i),i&&w(d,i)?Promise.reject(T()):await A(location.pathname,g,m)?Promise.reject(P()):b("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:r,service_id:t,template_id:e,template_params:i}),{"Content-type":"application/json"}))},H=t=>{if(!t||t.nodeName!=="FORM")throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},M=t=>typeof t=="string"?document.querySelector(t):t,$=async(t,e,i,o)=>{const s=y(o),r=s.publicKey||n.publicKey,u=s.blockHeadless||n.blockHeadless,m=n.storageProvider||s.storageProvider,d={...n.blockList,...s.blockList},g={...n.limitRate,...s.limitRate};if(u&&S(navigator))return Promise.reject(E());const p=M(i);f(r,t,e),H(p);const a=new FormData(p);return w(d,a)?Promise.reject(T()):await A(location.pathname,g,m)?Promise.reject(P()):(a.append("lib_version","4.4.1"),a.append("service_id",t),a.append("template_id",e),a.append("user_id",r),b("/api/v1.0/email/send-form",a))},h={init:_,send:W,sendForm:$,EmailJSResponseStatus:c};class x{constructor(){l(this,"serviceId");l(this,"templateId");l(this,"publicKey");l(this,"isInitialized",!1);this.serviceId="service_seza_automation",this.templateId="template_seza_contact",this.publicKey={BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}.VITE_EMAILJS_PUBLIC_KEY||"YOUR_EMAILJS_PUBLIC_KEY",this.initializeEmailJS()}initializeEmailJS(){try{h.init(this.publicKey),this.isInitialized=!0,console.log("✅ EmailJS initialized successfully")}catch(e){console.error("❌ EmailJS initialization failed:",e),this.isInitialized=!1}}async sendContactFormNotification(e){try{if(!this.isInitialized||this.publicKey==="YOUR_EMAILJS_PUBLIC_KEY"){console.log("⚠️ EmailJS not configured - using fallback service");const{simpleEmailService:s}=await v(()=>import("./simpleEmailService-23d60475.js"),[]);return await s.sendContactFormNotification(e)}const i={to_email:"seza.studio.website@gmail.com",from_email:e.email,subject:`🌟 New Contact Form: ${e.subject}`,message:this.generateContactFormMessage(e),customer_name:`${e.firstName} ${e.lastName}`,inquiry_type:e.inquiryType,company:e.company||"Not specified",phone:e.phone||"Not provided",website:e.website||"Not provided",urgency:e.urgency,budget:e.budget||"Not specified",timeline:e.timeline||"Not specified"};console.log("📧 Sending contact form notification via EmailJS:",{to:i.to_email,from:i.from_email,subject:i.subject});const o=await h.send(this.serviceId,this.templateId,i);return console.log("✅ Contact form notification sent successfully:",o),{success:!0,message:"Contact form notification sent successfully!",messageId:o.text}}catch(i){return console.error("❌ Error sending contact form notification:",i),{success:!1,message:"Failed to send contact form notification. Please try again."}}}async sendProfessionalReply(e,i){try{if(!this.isInitialized||this.publicKey==="YOUR_EMAILJS_PUBLIC_KEY"){console.log("⚠️ EmailJS not configured - using fallback service");const{simpleEmailService:r}=await v(()=>import("./simpleEmailService-23d60475.js"),[]);return await r.sendProfessionalReply(e,i)}const o={to_email:e.email,from_email:"seza.studio.website@gmail.com",subject:`Re: ${e.subject} - Thank You for Contacting SEZA Team`,message:this.generateProfessionalReplyMessage(e,i),customer_name:`${e.firstName} ${e.lastName}`,inquiry_type:e.inquiryType,company:e.company||"Not specified",phone:e.phone||"Not provided",website:e.website||"Not provided",urgency:e.urgency,budget:e.budget||"Not specified",timeline:e.timeline||"Not specified"};console.log("📧 Sending professional reply via EmailJS:",{to:o.to_email,from:o.from_email,subject:o.subject,template:i});const s=await h.send(this.serviceId,"template_seza_reply",o);return console.log("✅ Professional reply sent successfully:",s),{success:!0,message:"Professional reply sent successfully!",messageId:s.text}}catch(o){return console.error("❌ Error sending professional reply:",o),{success:!1,message:"Failed to send professional reply. Please try again."}}}generateContactFormMessage(e){return`
🌟 NEW CONTACT FORM SUBMISSION

👤 CUSTOMER DETAILS:
Name: ${e.firstName} ${e.lastName}
Email: ${e.email}
Phone: ${e.phone||"Not provided"}
Company: ${e.company||"Not specified"}
Website: ${e.website||"Not provided"}

📋 INQUIRY DETAILS:
Type: ${e.inquiryType}
Subject: ${e.subject}
Urgency: ${e.urgency}
Preferred Contact: ${e.preferredContact}
Budget: ${e.budget||"Not specified"}
Timeline: ${e.timeline||"Not specified"}

💬 MESSAGE:
${e.message}

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
Consent to contact: ${e.consent?"Yes":"No"}
Newsletter subscription: ${e.newsletter?"Yes":"No"}

---
This email was sent via the SEZA AI Assistant automation system.
    `.trim()}generateProfessionalReplyMessage(e,i){const o=e.inquiryType,s=e.firstName,r={photography:`
Dear ${s},

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
      `,automation:`
Dear ${s},

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
      `,"ai-system":`
Dear ${s},

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
      `,consulting:`
Dear ${s},

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
      `,partnership:`
Dear ${s},

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
      `,event:`
Dear ${s},

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
      `,other:`
Dear ${s},

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
      `};return r[o]||r.other}}const U=new x;export{U as emailJSService};
//# sourceMappingURL=emailJS-4870174d.js.map
