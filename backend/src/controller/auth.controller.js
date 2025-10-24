
import { hashPassword } from "../utils/hashPassword.js";
import User from "../model/user.model.js";



// =================== signup ======================================
export const signup = async (req, res) => {
  const { userName, email, password } = req.body;

  try { 
    
    // check all fields
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
      
    // check if email already exist
      const user = await User.findOne(email);
        
      if(user){
        res.status(400).json({message: "Email already exists"})
      }
        
    // check password lenght
    if (password.lenght < 8){
      res.status(400).json({message: "password must be at least 8 charcters"})
    }

    // hash password
      const hashedPassword = hashPassword(password); 

    // Create new user 

    // save user 

    // send token 
       
  } catch (error) {}  
};

// ======================= login =======================================
export const login = (req, res) => {
  res.send("signup");
};

// ======================= logout =========================================
export const logout = (req, res) => {
  res.send("signup");
};

