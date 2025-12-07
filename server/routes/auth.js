const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' , session: false}),
  (req, res) => {
    // jwt
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role }, // Payload
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 前端: http://localhost:3000/login-success
    res.redirect(`${process.env.CLIENT_URL}/login-success?token=${token}`);
  }
);

module.exports = router;