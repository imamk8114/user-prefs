const userService = require('../service/userService');
const { validationResult } = require('express-validator');

// Controller function for authenticating a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate the request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Authenticate the user using the service
    const authtoken = await userService.authenticateUser(email, password);

    // Set the JWT token in an HttpOnly cookie
    res.cookie('auth-token', authtoken, { httpOnly: true });

    res.json({ success: true, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};
