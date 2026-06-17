const dotenv = require('dotenv');
dotenv.config();

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'fatemeh963';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
  
  next();
};

module.exports = authMiddleware;
