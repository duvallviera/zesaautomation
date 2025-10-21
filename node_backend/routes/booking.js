import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/booking
// @desc    Get all bookings
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Booking routes ready',
      data: { message: 'Booking system will be implemented' }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
