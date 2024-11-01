require("dotenv").config()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler")
const User = require('../model/userModel');


exports.register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
      }
    
      // Check if user exists
      const userExists = await User.findOne({ email })
    
      if (userExists) {
        res.status(400)
        throw new Error('User already exists')
      }

    const salt=await bcrypt.genSalt(10);
    const hashedPass=await bcrypt.hash(password,salt);

    console.log(hashedPass)

    const user=new User({
        name:name,
        email:email,
        password:hashedPass
    })
    user.save()
    if(user){
        return res.status(200).json({
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        });
    }
})

exports.login = asyncHandler(async (req, res) => {
    const {email,password}=req.body;
    const user=await User.findOne({email})
    if(user && await bcrypt.compare(password,user.password)){
        return res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid credentials");
    }
})

exports.getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
  })

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }