// server/routes/favorites.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Job = require('../models/Job');

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) return res.sendStatus(401);

  const token = bearerHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// GET /favorites  —— 返回当前用户收藏的 job 列表
router.get('/', verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).populate('favorites');
  res.json(user.favorites || []);
});

// POST /favorites/:jobId  —— 收藏一个职位
router.post('/:jobId', verifyToken, async (req, res) => {
  const { jobId } = req.params;
  const user = await User.findById(req.user.id);

  if (!user.favorites.includes(jobId)) {
    user.favorites.push(jobId);
    await user.save();
  }
  res.json(user.favorites);
});

// DELETE /favorites/:jobId —— 取消收藏
router.post("/remove/:jobId", verifyToken, async (req, res) => {
  const { jobId } = req.params;
  const user = await User.findById(req.user.id);

  user.favorites = user.favorites.filter(
    (id) => id.toString() !== jobId
  );
  await user.save();

  res.json(user.favorites);
});


module.exports = router;
