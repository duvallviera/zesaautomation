import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/portfolio
// @desc    Get portfolio items
// @access  Public
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Portfolio routes ready',
      data: { message: 'Portfolio system will be implemented' }
    });
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
