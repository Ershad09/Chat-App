import express from 'express';
import { login, logout, signup } from '../controller/auth.controller.js';
const router = express.Router();


// ============== auth Routes =============


router.get('/signup', signup );   // signup 

router.get('/login', login );     // login

router.get('/logout', logout );   // logout  

export default router;
