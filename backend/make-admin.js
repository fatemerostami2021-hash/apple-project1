import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const userSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.model('User', userSchema, 'users');

async function makeAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const result = await User.updateOne(
      { email: 'fatimarostami963369@gmail.com' },
      { $set: { role: 'admin' } }
    );
    
    if (result.modifiedCount > 0) {
      console.log('✅ کاربر به ادمین تبدیل شد');
    } else {
      console.log('⚠️ کاربری با این ایمیل پیدا نشد یا قبلاً ادمین است');
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
  }
}

makeAdmin();
