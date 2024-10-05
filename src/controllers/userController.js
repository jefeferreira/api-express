import User from '../models/user.js';
import { generateToken } from '../utils/auth.js';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ $or: [{ username }, { email }] });

    if (userExists) {
      const message =
        userExists.username === username
          ? 'User already exists'
          : 'Email already exists';
      return res.status(400).json({ message });
    }

    const user = await User.create({ username, email, password });

    const token = generateToken(user._id);

    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(400).json({ message: 'Invalid user data' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordMatch = await user.matchPassword(password);

      if (isPasswordMatch) {
        const token = generateToken(user._id);

        return res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token,
        });
      }
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.log('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
