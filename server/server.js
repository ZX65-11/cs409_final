require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Passport 
require('./config/passport')(passport);

const app = express();

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(cors({ origin: process.env.CLIENT_URL })); 
app.use(express.json());

app.use(passport.initialize());

app.use('/auth', require('./routes/auth'));

// Validate JWT
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get('/api/current_user', verifyToken, async (req, res) => {
    const User = require('./models/User');
    const fullUser = await User.findById(req.user.id);
    res.json(fullUser);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));