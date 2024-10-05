import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js'; // Certifique-se de usar a extensão .js

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
