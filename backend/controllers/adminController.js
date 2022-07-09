const asyncHandler=require('express-async-handler');

const Admin= require('../models/adminModel')
const generateToken = require('../utilis/generateToken')
const validateLoginForm = require("../validation/login");





const authAdmin = asyncHandler(async (req,res)=>{
          const {email,password} = req.body;
          console.log("this is are",email,password);

          const { errors, isValid } = validateLoginForm(req.body);
          if (!isValid) {
            return res.status(400).json(errors);
          }

          // const admin = await Admin.findOne({email})
          const admin = await Admin.findOne({ email });

          if(admin){

                    let notMatch=await admin.matchPassword(password);

                    if(notMatch){
                              res.json({
                                        _id:admin._id,
                                        email:admin.email,
                                        password:admin.password,
                                        token:generateToken(admin._id)
                              })
                              

                    }else{
                              errors.password= "Incorrect Password";
                              res.status(400).json(errors);
                    }
          }else{
                    errors.email="Email NOt Found"
                    res.status(400).json(errors);

          }
})

module.exports = { authAdmin }
