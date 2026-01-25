import express from "express";
import { login, signup, googleLogin } from "../controllers/authController.js"; 
// Make sure googleLogin is exported from authController.js

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/google", googleLogin); // use the imported googleLogin function

export default router;
