const User = require('../models/user');
const bcrypt = require('bcryptjs');

const registerUser =async(req,res)=>{
    const {name,email,password,confirmPassword} = req.body;
   try{ const ifuserexists =await User.findOne({email:email});
    if(!ifuserexists){
       
        const hashedpassword= await bcrypt.hash(password,10);
        const newUser = await User.create({
            name:name,
            email:email,
            password:hashedpassword,
        })
        res.status(200).json(newUser);
    }}catch(err){
        res.status(500).json(err.message);
    }
}
module.exports={registerUser};