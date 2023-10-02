const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schemas/userSchema');
require("dotenv").config();

// User registration
router.post('/register', async (req, res) => {
    try {
      const { fullName, username, password, role } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({ fullName, username, password: hashedPassword, role });
      await user.save();
      res.status(201).send('User registered successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // User login
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(401).send('Invalid credentials');
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).send('Invalid credentials');
  
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.secretKEY);
      res.send({ token });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  


module.exports = router;
