import express from 'express';
const router = express.Router();

console.log('Auth router loaded ✅');

router.get('/signup', (req, res) => {
  console.log('Signup route hit!');
  res.send('Signup route working!');
});

router.get('/login', (req, res) => {
  console.log('Login route hit!');
  res.send('Login route working!');
});

router.get('/logout', (req, res) => {
  console.log('Logout route hit!');
  res.send('Logout route working!');
});

export default router;
