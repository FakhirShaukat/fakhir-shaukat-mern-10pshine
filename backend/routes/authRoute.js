import  express from 'express';
import { registerUser, loginUser, googleLogin } from '../controllers/authController.js';


const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin); // for Google OAuth



export default router;