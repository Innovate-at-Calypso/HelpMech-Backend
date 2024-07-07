const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const MechUser = require('../Models/mech_model')
mechRoutes = express.Router();

mechRoutes.post("/mech/signup", async (req, res) => {
    try {
      const { name, email, password ,isMech } = req.body;
      const existingUser = await MechUser.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ msg: "User with the same Email already exists!" });
      }
  
      const hashedPassword = await bcryptjs.hash(password, 8);
  
      let mechUser = new MechUser({
        email,
        password: hashedPassword,
        name,
        isShop : false,
        isMech,
        isEmail : false,
      });
  
      mechUser = await mechUser.save();
      const token = jwt.sign({id : mechUser._id},"PasswordKey");
       res.json({token,...mechUser._doc});
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });


  mechRoutes.post("/mech/login",async (req,res)=>{
    try{
      const {email ,password}=req.body;
      const user = await MechUser.findOne({email});
 
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

 mechRoutes.post('/mech/tokenIsVaild',async (req,res)=>{
    try{
       const token = req.body.token;
       if(!token){
         return res.status(400).json({msg : "Error In Token"});
       }
       const verified = jwt.verify(token,"PasswordKey");
       if(!verified){
         return res.status(400).json({msg : "Error In Verified"})
       }
       const user = await MechUser.findById(verified.id);
       if(!user) return res.status(400).json({msg : "Error In User"});
       res.json({token,...user._doc});
    }catch(e){
       res.status(500).json({error : "Invalid Token"})
    }
 });

  module.exports = mechRoutes;
