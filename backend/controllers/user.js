const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser =async(req,res)=>{
    const {name,email,password,confirmPassword} = req.body;
   try{ const ifuserexists =await User.findOne({email:email});
    if(!ifuserexists){
       if(password!==confirmPassword){
        res.status(500).json("Passwords dont match")
       }
        const hashedpassword= await bcrypt.hash(password,10);
        const newUser = await User.create({
            name:name,
            email:email,
            password:hashedpassword,
        })
        res.status(200).json(newUser);
    }else{
        res.status(500).json("user with this email already exists");
    }}catch(err){
        res.status(500).json(err.message);
    }
}

const login = async(req,res)=>{
    const {email,password} = req.body;
    try{
    const user = await User.findOne({email:email});
    if(user){
        const validated = await bcrypt.compare(password,user.password)
        if(validated){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{
                    expiresIn:"30d",
            });
            const {password, ...others} = user._doc;

            res.status(200).json({others,token});
        }else{
            res.status(500).json("wrong pasword");
        }
    }else{
        res.status(500).json("Enter right credentials");
    }}catch(err){
        res.status(500).json(err.message);
    }
}
module.exports={registerUser,login};