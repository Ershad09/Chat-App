import jwt, { decode } from 'jsonwebtoken';
import User from '../model/user.model.js';


export const protect = async (req,res,next)=>{
  try {

    // get token from cookies
    const token = req.cookies.token;

    if(!token){
      return res.status(401).json({message: "Unauthorized - No token provided"});
    }
      
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded){
      return res.status(401).json({message: "Unauthorized - Invalid Token"});
    }

    // find user 
    const user = await User.findById(decode.userId).select('-password');

    if(!user){
       return res.status(401).json({message: "Unauthorized - Invalid Token"});
    }

    req.user = user;


    next();
  } catch (error) {
    console.error(error); 
    return res.status(401).json({ message: "server error" });
  }
}