import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  service: {
    type: String,
    enum: [
      'photography',
      'videography', 
      'wedding',
      'corporate',
      'event',
      'portrait',
      'commercial',
      'other'
    ],
    default: 'other'
  },
  budget: {
    type: String,
    enum: ['under-1000', '1000-5000', '5000-10000', '10000-25000', '25000+', 'not-specified'],
    default: 'not-specified'
  },
  preferredDate: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'proposal_sent', 'negotiating', 'closed_won', 'closed_lost'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  source: {
    type: String,
    enum: ['website', 'social_media', 'referral', 'advertisement', 'direct', 'other'],
    default: 'website'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  notes: [{
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'Note cannot exceed 500 characters']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  followUpDate: {
    type: Date,
    default: null
  },
  lastContactDate: {
    type: Date,
    default: null
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  emailSentAt: {
    type: Date,
    default: null
  },
  responseReceived: {
    type: Boolean,
    default: false
  },
  responseReceivedAt: {
    type: Date,
    default: null
  },
  ipAddress: {
    type: String,
    default: null
  },
  userAgent: {
    type: String,
    default: null
  },
  location: {
    city: String,
    state: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ priority: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ assignedTo: 1 });
contactSchema.index({ followUpDate: 1 });

// Virtual for contact's full details
contactSchema.virtual('fullDetails').get(function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    company: this.company,
    subject: this.subject,
    message: this.message,
    service: this.service,
    budget: this.budget,
    preferredDate: this.preferredDate,
    status: this.status,
    priority: this.priority,
    source: this.source,
    tags: this.tags,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
});

// Method to update status
contactSchema.methods.updateStatus = function(newStatus, userId) {
  this.status = newStatus;
  if (userId) {
    this.notes.push({
      content: `Status changed to ${newStatus}`,
      author: userId
    });
  }
  return this.save();
};

// Method to add note
contactSchema.methods.addNote = function(content, authorId) {
  this.notes.push({
    content,
    author: authorId
  });
  return this.save();
};

// Method to set follow-up
contactSchema.methods.setFollowUp = function(date, userId) {
  this.followUpDate = date;
  if (userId) {
    this.notes.push({
      content: `Follow-up scheduled for ${date.toDateString()}`,
      author: userId
    });
  }
  return this.save();
};

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
