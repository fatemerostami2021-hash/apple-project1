export default function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  // توکن ادمین ساده
  if (token === 'fatemeh963') {
    req.user = { role: 'admin', name: 'Fatemeh' };
    return next();
  }
  
  // اگر توکن وجود نداشت یا نامعتبر بود
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }
  
  return res.status(403).json({ error: 'Forbidden - Invalid token' });
}
