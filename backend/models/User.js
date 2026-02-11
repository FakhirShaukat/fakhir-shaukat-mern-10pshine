import  mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional for Google login
  googleId: { type: String }, // for Google OAuth users
  resetCode: { type: String }, // for password reset
  resetCodeExpiry: { type: Date }, // for password reset
}, { timestamps: true });

export default mongoose.model('User', userSchema);
