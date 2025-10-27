import express from 'express';
import { login, logout, signup } from '../controller/auth.controller.js';
const router = express.Router();


// ============== auth Routes =============


router.post('/signup', signup );   // signup 

router.post('/login', login );     // login

router.post('/logout', logout );   // logout

export default router;
