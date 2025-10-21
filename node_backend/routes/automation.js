import express from 'express';
import Automation from '../models/Automation.js';
import { authMiddleware } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// @route   GET /api/automation
// @desc    Get all automations
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      type,
      status,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const automations = await Automation.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');

    const total = await Automation.countDocuments(filter);

    res.json({
      success: true,
      data: {
        automations,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });

  } catch (error) {
    console.error('Get automations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/automation/:id
// @desc    Get automation by ID
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const automation = await Automation.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');

    if (!automation) {
      return res.status(404).json({
        success: false,
        message: 'Automation not found'
      });
    }

    res.json({
      success: true,
      data: { automation }
    });

  } catch (error) {
    console.error('Get automation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/automation
// @desc    Create new automation
// @access  Private
router.post('/', [
  authMiddleware,
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('type').isIn(['email_response', 'phone_system', 'instagram_reply', 'booking_followup', 'miami_outreach', 'workflow_orchestration', 'analytics_dashboard', 'custom']).withMessage('Invalid automation type'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('configuration').isObject().withMessage('Configuration is required')
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

    const automation = new Automation({
      ...req.body,
      createdBy: req.user.userId
    });

    await automation.save();

    res.status(201).json({
      success: true,
      message: 'Automation created successfully',
      data: { automation }
    });

  } catch (error) {
    console.error('Create automation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   PUT /api/automation/:id
// @desc    Update automation
// @access  Private
router.put('/:id', [
  authMiddleware,
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('status').optional().isIn(['active', 'inactive', 'paused', 'error']).withMessage('Invalid status')
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

    const automation = await Automation.findById(req.params.id);

    if (!automation) {
      return res.status(404).json({
        success: false,
        message: 'Automation not found'
      });
    }

    // Check if user can update this automation
    if (automation.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const allowedUpdates = ['name', 'description', 'configuration', 'status', 'schedule', 'assignedTo', 'tags'];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const updatedAutomation = await Automation.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email')
     .populate('assignedTo', 'name email');

    res.json({
      success: true,
      message: 'Automation updated successfully',
      data: { automation: updatedAutomation }
    });

  } catch (error) {
    console.error('Update automation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/automation/:id/execute
// @desc    Execute automation
// @access  Private
router.post('/:id/execute', authMiddleware, async (req, res) => {
  try {
    const automation = await Automation.findById(req.params.id);

    if (!automation) {
      return res.status(404).json({
        success: false,
        message: 'Automation not found'
      });
    }

    if (automation.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Automation is not active'
      });
    }

    const result = await automation.execute(req.body.triggerData || {});

    res.json({
      success: result.success,
      message: result.success ? 'Automation executed successfully' : 'Automation execution failed',
      data: result
    });

  } catch (error) {
    console.error('Execute automation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   DELETE /api/automation/:id
// @desc    Delete automation
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const automation = await Automation.findById(req.params.id);

    if (!automation) {
      return res.status(404).json({
        success: false,
        message: 'Automation not found'
      });
    }

    // Check if user can delete this automation
    if (automation.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await Automation.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Automation deleted successfully'
    });

  } catch (error) {
    console.error('Delete automation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
