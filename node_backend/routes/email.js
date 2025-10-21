import express from 'express';
import Contact from '../models/Contact.js';
import { body, validationResult } from 'express-validator';
import { authMiddleware } from '../middleware/auth.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// @route   POST /api/email/send
// @desc    Send email
// @access  Private
router.post('/send', [
  authMiddleware,
  body('to').isEmail().withMessage('Valid email address is required'),
  body('subject').notEmpty().trim().withMessage('Subject is required'),
  body('text').optional().trim(),
  body('html').optional().trim()
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { to, subject, text, html, replyTo } = req.body;

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'ZESA AI Assistant <noreply@sezateamengineers.com>',
      to,
      subject,
      text,
      html,
      replyTo: replyTo || process.env.EMAIL_USER
    };

    const info = await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Email sent successfully',
      data: {
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected
      }
    });

  } catch (error) {
    console.error('Send email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/email/contact-form
// @desc    Handle contact form submission
// @access  Public
router.post('/contact-form', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email address is required'),
  body('subject').trim().isLength({ min: 5, max: 200 }).withMessage('Subject must be between 5 and 200 characters'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone number is required'),
  body('company').optional().trim().isLength({ max: 100 }).withMessage('Company name cannot exceed 100 characters'),
  body('service').optional().isIn(['photography', 'videography', 'wedding', 'corporate', 'event', 'portrait', 'commercial', 'other']).withMessage('Invalid service type')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      name,
      email,
      phone,
      company,
      subject,
      message,
      service = 'other',
      budget = 'not-specified',
      preferredDate
    } = req.body;

    // Create contact record
    const contact = new Contact({
      name,
      email,
      phone,
      company,
      subject,
      message,
      service,
      budget,
      preferredDate: preferredDate ? new Date(preferredDate) : null,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await contact.save();

    // Send notification email to admin
    const transporter = createTransporter();
    
    const adminEmailOptions = {
      from: process.env.EMAIL_FROM || 'ZESA AI Assistant <noreply@sezateamengineers.com>',
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            ${preferredDate ? `<p><strong>Preferred Date:</strong> ${new Date(preferredDate).toLocaleDateString()}</p>` : ''}
          </div>
          <p style="margin-top: 20px; color: #666;">
            <small>Submitted on ${new Date().toLocaleString()}</small>
          </p>
        </div>
      `
    };

    // Send auto-reply to customer
    const customerEmailOptions = {
      from: process.env.EMAIL_FROM || 'ZESA AI Assistant <noreply@sezateamengineers.com>',
      to: email,
      subject: 'Thank you for contacting SEZA Team!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for reaching out!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for contacting SEZA Team. We have received your message and will get back to you within 24 hours.</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Message Details:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Service Interest:</strong> ${service}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p>We look forward to working with you!</p>
          <p>Best regards,<br>SEZA Team</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            SEZA Team - Consciousness-Driven Photography & Automation<br>
            Email: duvallviera@gmail.com | Phone: (305) 370-9228<br>
            Website: www.sezateamengineers.com
          </p>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminEmailOptions),
      transporter.sendMail(customerEmailOptions)
    ]);

    // Update contact record
    contact.emailSent = true;
    contact.emailSentAt = new Date();
    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        contactId: contact._id,
        status: contact.status
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process contact form',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/email/contacts
// @desc    Get all contacts
// @access  Private
router.get('/contacts', authMiddleware, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      priority,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const contacts = await Contact.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('assignedTo', 'name email')
      .select('-password');

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/email/contacts/:id
// @desc    Get contact by ID
// @access  Private
router.get('/contacts/:id', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('notes.author', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: { contact }
    });

  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   PUT /api/email/contacts/:id/status
// @desc    Update contact status
// @access  Private
router.put('/contacts/:id/status', [
  authMiddleware,
  body('status').isIn(['new', 'contacted', 'qualified', 'proposal_sent', 'negotiating', 'closed_won', 'closed_lost']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { status } = req.body;
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    await contact.updateStatus(status, req.user.userId);

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: { contact }
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
