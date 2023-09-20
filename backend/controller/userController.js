const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

// Controller for user creation
const createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    // Check whether the user with this email exists already
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Sorry, a user with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = await User.create({
      name,
      password: hashedPassword,
      email,
      _id: email // setting _id to the email or can use a UUID as well
    });

    const data = {
      user: {
        _id: user._id
      }
    }

    const authtoken = jwt.sign(data, config.JWT_SECRET);
    res.cookie('auth-token', authtoken, { httpOnly: true });

    res.json({ authtoken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

// Controller for getting a user by ID
const getUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
  }
};

const updateUserColor = async (req, res) => {
    try {
      const userId = req.user._id;
      const { color } = req.body; 
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { color: color },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ message: 'Color preference updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
};

module.exports = {
  createUser, getUser, updateUserColor
};
