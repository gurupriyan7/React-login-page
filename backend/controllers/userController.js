
const asyncHandler= require('express-async-handler')
const User=require('../models/userModel');
const generateToken = require('../utilis/generateToken');

const validateRegisterForm = require("../validation/register");
const validateLoginForm = require("../validation/login");


const registerUser=asyncHandler(async(req,res)=>{
          const {name,email,password} = req.body;
          console.log("ooo",name,email,password);
          const { errors, isValid } = await validateRegisterForm(req.body);
          if (!isValid) {
            return res.status(400).json(errors);
          }
const userExists=await User.findOne({email})

          if(userExists){
                    res.status(400);
                    errors.email = "This is Email is already Exist";
          }

          const user = await User.create({
                    name,
                    email,
                    password,
                  })
          
          if(user){
                    res.status(201).json({
                              _id:user._id,
                              name:user.name,
                              email:user.email,
                              token:generateToken(user._id)


                    })
          }else{
                    res.status(400)
                    throw new Error("Error Occures!")
          }
         
})

const authUser =asyncHandler(async (req,res)=>{
          const {email,password}=req.body;
          console.log('got it',email,password);
          
          const { errors, isValid } = validateLoginForm(req.body);
          if (!isValid) {
            return res.status(400).json(errors);
          }

          const user= await User.findOne({email});
                              
          if(user){
                    
                    let notMatch = await user.matchPassword(password);
                    

                    if(notMatch){

                              console.log('body is:',req.body);
                              res.json({
                                        _id:user._id,
                                        name:user.name,
                                        email:user.email,
                                        token:generateToken(user._id)
                              })
                    }else{
                              res.status(400);
                              console.log("Invalid Password");
                              errors.password="Invalid Password";
                    }
          }else{
                    res.status(400);
                    errors.email="Invalid Email! ";
          }
})
// get-all_users
const getAllUsers = asyncHandler(async (req, res) => {
  console.log('user got it');
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
   
  }
});

// Delete-User
const deleteUser =asyncHandler(async(req,res,next)=>{
  try{
    const user = await User.findById(req.query.id)
    await user.remove();
    res.json({})
  }catch(err){
    res.json(err)
  }
})
// Get the details of user
const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

// UPdate user
const updateUser = asyncHandler(async (req, res) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
    const user = await User.findByIdAndUpdate(req.params.userId, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.json(error);
  }
});
module.exports={registerUser,authUser,getAllUsers,deleteUser,getUser,updateUser}