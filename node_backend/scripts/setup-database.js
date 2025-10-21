import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zesa_ai_assistant';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const setupDatabase = async () => {
  try {
    await connectDB();

    console.log('🔧 Setting up database...');

    // Create default admin user if it doesn't exist
    const adminExists = await User.findOne({ email: 'admin@sezateamengineers.com' });
    if (!adminExists) {
      const adminUser = new User({
        name: 'SEZA Admin',
        email: 'admin@sezateamengineers.com',
        password: 'admin123456', // Change this in production
        role: 'admin',
        isActive: true
      });

      await adminUser.save();
      console.log('✅ Default admin user created');
      console.log('📧 Email: admin@sezateamengineers.com');
      console.log('🔑 Password: admin123456');
      console.log('⚠️  Please change the password after first login!');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create default AI agent user
    const aiAgentExists = await User.findOne({ email: 'ai@sezateamengineers.com' });
    if (!aiAgentExists) {
      const aiAgent = new User({
        name: 'ZESA AI Assistant',
        email: 'ai@sezateamengineers.com',
        password: 'ai123456', // Change this in production
        role: 'ai_agent',
        isActive: true,
        aiProfile: {
          personality: 'professional',
          expertise: ['photography', 'automation', 'business', 'customer_service'],
          responseStyle: 'conversational'
        }
      });

      await aiAgent.save();
      console.log('✅ Default AI agent user created');
      console.log('📧 Email: ai@sezateamengineers.com');
      console.log('🔑 Password: ai123456');
    } else {
      console.log('ℹ️  AI agent user already exists');
    }

    console.log('✅ Database setup completed successfully!');
    console.log('');
    console.log('🚀 You can now start the backend server:');
    console.log('   npm run dev');
    console.log('');
    console.log('📊 Health check: http://localhost:5051/health');
    console.log('📚 API Documentation: http://localhost:5051/api');

  } catch (error) {
    console.error('❌ Database setup error:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

// Run setup
setupDatabase();
