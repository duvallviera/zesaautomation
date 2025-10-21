import mongoose from 'mongoose';

const automationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Automation name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  type: {
    type: String,
    required: [true, 'Automation type is required'],
    enum: [
      'email_response',
      'phone_system',
      'instagram_reply',
      'booking_followup',
      'miami_outreach',
      'workflow_orchestration',
      'analytics_dashboard',
      'custom'
    ]
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'paused', 'error'],
    default: 'inactive'
  },
  configuration: {
    triggers: [{
      type: {
        type: String,
        enum: ['email_received', 'form_submitted', 'phone_call', 'social_mention', 'booking_created', 'time_based'],
        required: true
      },
      conditions: mongoose.Schema.Types.Mixed,
      schedule: {
        type: String,
        match: [/^(\d{1,2}):(\d{2})$/, 'Schedule must be in HH:MM format']
      }
    }],
    actions: [{
      type: {
        type: String,
        enum: ['send_email', 'make_call', 'post_social', 'create_task', 'update_status', 'send_notification'],
        required: true
      },
      parameters: mongoose.Schema.Types.Mixed,
      delay: {
        type: Number,
        default: 0,
        min: 0
      }
    }],
    filters: {
      keywords: [String],
      emailDomains: [String],
      timeRange: {
        start: String,
        end: String
      },
      priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent']
      }
    }
  },
  performance: {
    totalExecutions: {
      type: Number,
      default: 0
    },
    successfulExecutions: {
      type: Number,
      default: 0
    },
    failedExecutions: {
      type: Number,
      default: 0
    },
    lastExecuted: {
      type: Date,
      default: null
    },
    averageExecutionTime: {
      type: Number,
      default: 0
    },
    successRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },
  schedule: {
    enabled: {
      type: Boolean,
      default: false
    },
    frequency: {
      type: String,
      enum: ['once', 'hourly', 'daily', 'weekly', 'monthly', 'custom'],
      default: 'once'
    },
    cronExpression: {
      type: String,
      default: null
    },
    timezone: {
      type: String,
      default: 'America/New_York'
    },
    nextRun: {
      type: Date,
      default: null
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  isTemplate: {
    type: Boolean,
    default: false
  },
  templateCategory: {
    type: String,
    enum: ['photography', 'business', 'marketing', 'customer_service', 'general'],
    default: 'general'
  },
  version: {
    type: Number,
    default: 1
  },
  previousVersions: [{
    configuration: mongoose.Schema.Types.Mixed,
    createdAt: {
      type: Date,
      default: Date.now
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  logs: [{
    level: {
      type: String,
      enum: ['info', 'warning', 'error', 'debug'],
      required: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    details: mongoose.Schema.Types.Mixed,
    timestamp: {
      type: Date,
      default: Date.now
    },
    executionId: String
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
automationSchema.index({ type: 1 });
automationSchema.index({ status: 1 });
automationSchema.index({ createdBy: 1 });
automationSchema.index({ assignedTo: 1 });
automationSchema.index({ 'schedule.nextRun': 1 });
automationSchema.index({ isTemplate: 1, templateCategory: 1 });

// Virtual for automation summary
automationSchema.virtual('summary').get(function() {
  return {
    id: this._id,
    name: this.name,
    type: this.type,
    status: this.status,
    successRate: this.performance.successRate,
    totalExecutions: this.performance.totalExecutions,
    lastExecuted: this.performance.lastExecuted,
    nextRun: this.schedule.nextRun
  };
});

// Method to execute automation
automationSchema.methods.execute = async function(triggerData) {
  const executionId = new mongoose.Types.ObjectId().toString();
  const startTime = Date.now();
  
  try {
    this.logs.push({
      level: 'info',
      message: 'Automation execution started',
      executionId,
      details: { triggerData }
    });

    // Update execution count
    this.performance.totalExecutions += 1;
    this.performance.lastExecuted = new Date();
    
    // Execute actions based on configuration
    for (const action of this.configuration.actions) {
      await this.executeAction(action, triggerData);
    }

    // Update success metrics
    this.performance.successfulExecutions += 1;
    const executionTime = Date.now() - startTime;
    this.performance.averageExecutionTime = 
      (this.performance.averageExecutionTime + executionTime) / 2;
    
    this.performance.successRate = 
      (this.performance.successfulExecutions / this.performance.totalExecutions) * 100;

    this.logs.push({
      level: 'info',
      message: 'Automation execution completed successfully',
      executionId,
      details: { executionTime }
    });

    await this.save();
    return { success: true, executionId, executionTime };

  } catch (error) {
    this.performance.failedExecutions += 1;
    this.performance.successRate = 
      (this.performance.successfulExecutions / this.performance.totalExecutions) * 100;

    this.logs.push({
      level: 'error',
      message: 'Automation execution failed',
      executionId,
      details: { error: error.message }
    });

    await this.save();
    return { success: false, executionId, error: error.message };
  }
};

// Method to execute individual action
automationSchema.methods.executeAction = async function(action, triggerData) {
  // This would be implemented based on the specific action type
  // For now, we'll log the action
  this.logs.push({
    level: 'info',
    message: `Executing action: ${action.type}`,
    details: { action, triggerData }
  });
};

// Method to update status
automationSchema.methods.updateStatus = function(newStatus) {
  this.status = newStatus;
  this.logs.push({
    level: 'info',
    message: `Status updated to ${newStatus}`,
    details: { previousStatus: this.status }
  });
  return this.save();
};

// Method to add log entry
automationSchema.methods.addLog = function(level, message, details = {}) {
  this.logs.push({
    level,
    message,
    details,
    timestamp: new Date()
  });
  return this.save();
};

const Automation = mongoose.model('Automation', automationSchema);

export default Automation;
