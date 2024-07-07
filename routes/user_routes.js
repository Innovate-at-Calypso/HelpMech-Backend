const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../Models/user_model')
authRoutes = express.Router();

authRoutes.post("/app/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ msg: "User with the same Email already exists!" });
      }
  
      const hashedPassword = await bcryptjs.hash(password, 8);
  
      let user = new User({
        email,
        password: hashedPassword,
        name,
      });
  
      user = await user.save();
      const token = jwt.sign({id : user._id},"PasswordKey");
       res.json({token,...user._doc});
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });


  authRoutes.post("/app/login",async (req,res)=>{
    try{
      const {email ,password}=req.body;
      const user = await User.findOne({email});
 
      if(!user){
        return res.status(400).json({msg: "User with this Email doesn't Exits !"});
      }
 
      const isMatch = await bcryptjs.compare(password,user.password);
 
      if(!isMatch){
        return res.status(400).json({msg : "Incorrect Password"});
      }
 
      const token = jwt.sign({id : user._id},"PasswordKey");
      res.json({token,...user._doc});
    }
    catch(e){
     res.status(500).json({ error : e.message});
    }
 });

 authRoutes.get('/tokenIsVaild',async (req,res)=>{
    try{
       const token = req.headers['authorization'];
       if(!token){
         return res.status(400).json({msg : "Error In Token"});
       }
       const verified = jwt.verify(token,"PasswordKey");
       if(!verified){
         return res.status(400).json({msg : "Error In Verified"})
       }
       const user = await User.findById(verified.id);
       if(!user) return res.status(400).json({msg : "Error In User"});
       res.json({token,...user._doc});
    }catch(e){
       res.status(500).json({error : "Invalid Token"})
    }
 });

module.exports = authRoutes;