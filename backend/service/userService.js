const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config'); 

exports.authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw new Error('Invalid password');
    }

    const data = {
      user: {
        _id: user._id
      }
    };

    const authtoken = jwt.sign(data, JWT_SECRET);

    return authtoken;
  } catch (error) {
    throw error;
  }
};
