const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");




// @route   POST api/users/register
// @desc    Register user
// @access  Public


exports.register = asyncHandler(async(req,res,next) => {
    const { title, first_name, last_name,gender,email,date_of_birth,mobile_number,address,password} = req.body;


    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(404);
        throw new Error("Email already exists");
    }

    const user = await User.create({
        title, first_name, last_name, gender, email, date_of_birth, mobile_number, address, password
    });

    if(user){
        const {first_name, last_name, gender, email, date_of_birth, mobile_number, address, password} = user;
        res.json({
            _id:user._id,
            first_name, last_name, gender, email, date_of_birth, mobile_number, address, password
        })
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
    next();


});