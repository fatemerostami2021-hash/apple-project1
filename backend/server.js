const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

// CORS تنظیمات - قبول همه origins (برای توسعه)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
  credentials: true,
}));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Atlas connected');
  } catch (error) {
    console.error('❌ MongoDB error:', error.message);
    process.exit(1);
  }
};

connectDB();

// ========== Routes ==========
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Article routes
const articleRoutes = require('./routes/articles');
app.use('/api/articles', articleRoutes);

// Like routes
const likeRoutes = require('./routes/like');
app.use('/api/articles', likeRoutes);

// Views routes
const viewsRoutes = require('./routes/views');
app.use('/api/articles', viewsRoutes);

// Comment routes
const commentRoutes = require('./routes/comments');
app.use('/api/comments', commentRoutes);

// Admin routes
const authMiddleware = require('./middleware/auth');
const adminRoutes = require('./routes/admin');
app.use('/api/admin', authMiddleware, adminRoutes);

// Upload routes
const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);

// Serve static files from uploads
app.use('/uploads', express.static('public/uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
