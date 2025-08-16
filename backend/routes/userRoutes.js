import express from 'express';
import User from '../models/User.js'; // Adjust the path to your User model

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/').post(registerUser).get(getUsers); // No middleware
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(getUserProfile) // No middleware
  .put(updateUserProfile); // No middleware
router
  .route('/:id')
  .delete(deleteUser) // No middleware
  .get(getUserById) // No middleware
  .put(updateUser); // No middleware

//change user password
// import express from 'express';
// import bcrypt from 'bcryptjs';





export default router;
