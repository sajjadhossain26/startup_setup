import express from 'express';
import { loggedInUser, login, register } from '../controllers/userController.js';


const router = express.Router();

// route rest api
router.post('/login', login);
router.post('/register', register);
router.get('/me', loggedInUser);


export default router