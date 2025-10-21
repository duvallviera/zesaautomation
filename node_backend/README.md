# 🚀 SeZa AI Backend

Node.js backend server for the SeZa AI Assistant with MongoDB integration, authentication, and automation features.

## ✨ Features

- **🔐 Authentication & Authorization** - JWT-based auth with role management
- **📧 Email System** - Contact form handling with automated responses
- **🤖 Automation Engine** - AI-powered workflow automation
- **👥 User Management** - Complete user system with profiles
- **📊 Analytics Ready** - Built-in analytics and monitoring
- **🔒 Security** - Helmet, CORS, rate limiting, and validation
- **📱 API Ready** - RESTful API for frontend integration

## 🛠️ Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **Nodemailer** - Email service
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Input validation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Navigate to backend directory**
   ```bash
   cd node_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Setup database**
   ```bash
   npm run setup-db
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=5051
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/zesa_ai_assistant

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=ZESA AI Assistant <noreply@sezateamengineers.com>

# Security Configuration
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### MongoDB Setup

#### Local MongoDB
```bash
# Install MongoDB locally
# Start MongoDB service
# Default connection: mongodb://localhost:27017/zesa_ai_assistant
```

#### MongoDB Atlas (Cloud)
```bash
# Create cluster at https://cloud.mongodb.com
# Get connection string
# Update MONGODB_URI in .env
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/change-password` - Change password

### Email & Contacts
- `POST /api/email/contact-form` - Submit contact form
- `GET /api/email/contacts` - Get all contacts
- `GET /api/email/contacts/:id` - Get contact by ID
- `PUT /api/email/contacts/:id/status` - Update contact status
- `POST /api/email/send` - Send email

### Automation
- `GET /api/automation` - Get all automations
- `GET /api/automation/:id` - Get automation by ID
- `POST /api/automation` - Create automation
- `PUT /api/automation/:id` - Update automation
- `POST /api/automation/:id/execute` - Execute automation
- `DELETE /api/automation/:id` - Delete automation

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin)

### Health Check
- `GET /health` - Server health status

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run setup-db     # Setup database with default data
npm run setup        # Install dependencies and setup database
npm test             # Run tests
npm run lint         # Run ESLint
```

### Project Structure

```
node_backend/
├── models/              # Database models
│   ├── User.js
│   ├── Contact.js
│   └── Automation.js
├── routes/               # API routes
│   ├── auth.js
│   ├── users.js
│   ├── email.js
│   ├── automation.js
│   ├── booking.js
│   ├── portfolio.js
│   └── analytics.js
├── middleware/           # Custom middleware
│   ├── auth.js
│   ├── errorHandler.js
│   └── notFound.js
├── scripts/              # Database scripts
│   └── setup-database.js
├── server.js             # Main server file
├── package.json
└── README.md
```

## 🔒 Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin protection
- **Rate Limiting** - Request throttling
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Express validator
- **Password Hashing** - bcryptjs
- **Environment Variables** - Secure configuration

## 📊 Database Models

### User Model
- Authentication and profile management
- Role-based access control
- AI profile configuration
- Preferences and settings

### Contact Model
- Contact form submissions
- Lead management
- Status tracking
- Notes and follow-ups

### Automation Model
- Workflow automation rules
- Trigger and action configuration
- Performance metrics
- Execution logs

## 🚀 Deployment

### Production Setup

1. **Environment Configuration**
   ```bash
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=strong_secret_key
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

3. **Process Management (PM2)**
   ```bash
   npm install -g pm2
   pm2 start server.js --name zesa-backend
   pm2 startup
   pm2 save
   ```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5051
CMD ["npm", "start"]
```

## 📈 Monitoring

- **Health Check**: `GET /health`
- **Logs**: Console and file logging
- **Metrics**: Performance tracking
- **Error Handling**: Comprehensive error management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

- **Email**: duvallviera@gmail.com
- **Phone**: (305) 370-9228
- **Website**: www.sezateamengineers.com

---

**🌟 Built with consciousness and powered by technology**

*SEZA Team - Transforming business through consciousness and automation*
