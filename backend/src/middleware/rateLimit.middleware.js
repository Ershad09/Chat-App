// rateLimit.middleware.js
import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 5, 
  message: { message: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});