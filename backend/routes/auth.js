const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchUser'); 
const authController = require('../controller/authController');
const userController = require('../controller/userController');

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/create-user', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
],userController.createUser );

// ROUTE 2: Update the color for the user once the user is logged in
router.put('/update-color', fetchuser, userController.updateUserColor);

// ROUTE 3: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], authController.login);

// ROUTE 4: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.get('/get-user', fetchuser, userController.getUser);

module.exports = router