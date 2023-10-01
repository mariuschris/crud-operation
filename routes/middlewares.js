require("dotenv").config();
const jwt = require("jsonwebtoken");

// Authorization middleware
function authenticateUser(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied. No token provided');
    
    try {
      const decoded = jwt.verify(token, process.env.secretKEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).send('Invalid token');
    }
  }
  
  // Admin authorization middleware
  function isAdmin(req, res, next) {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).send('Action not allowed');
    }
  }
  
  module.exports = {authenticateUser, isAdmin}
