import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';



const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// ------------------ Manual SignUp ------------------
console.log("SIGNUP API HIT");
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, password } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({ message: 'Please add all required fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        user,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// ------------------ Manual Login ------------------
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && user.password && (await bcrypt.compare(password, user.password))) {
    res.json({
      user,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
};

// forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetCode = code;
    user.resetCodeExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail({
      to: email,
      subject: "Password Reset Code",
      html: `<h2>Your reset code is: ${code}</h2>`,
    });

    res.status(200).json({ message: "Reset code sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// verify reset code
export const verifyResetCode = async (req, res) => {
  const { email, code } = req.body;

  const user = await User.findOne({
    email,
    resetCode: code,
    resetCodeExpiry: { $gt: Date.now() },
  });
  console.log("Email:", email);
  console.log("Code:", code);
  console.log("Current timestamp:", Date.now());


  if (!user) {
    return res.status(400).json({ message: "Invalid or expired code" });
  }

  res.json({ message: "Code verified" });
};

// reset password
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  user.resetCode = undefined;
  user.resetCodeExpiry = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
};


// ------------------ Google Login ------------------
const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      const [firstName, ...rest] = name.split(' ');
      const lastName = rest.join(' ') || '';
      user = await User.create({
        firstName,
        lastName,
        email,
        googleId: sub,
      });
    }

    res.json({
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Google login failed' });
  }
};

export { registerUser, loginUser, googleLogin };
