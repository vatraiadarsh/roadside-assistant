const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils");

exports.register = asyncHandler(async (req, res) => {
  const {
    title,
    first_name,
    last_name,
    gender,
    email,
    date_of_birth,
    mobile_number,
    address,
    password,
  } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(404);
    return res.json({ error: "User already exists" });
  }

  const user = await User.create({
    title,
    first_name,
    last_name,
    gender,
    email,
    date_of_birth,
    mobile_number,
    address,
    password,
  });

  if (user) {
    const {
      title,
      first_name,
      last_name,
      gender,
      email,
      date_of_birth,
      mobile_number,
      address,
      password,
    } = user;
    res.json({
      _id: user._id,
      title,
      first_name,
      last_name,
      gender,
      email,
      date_of_birth,
      mobile_number,
      address,
      password,
    });
  } else {
    res.status(400);
    return res.json({ error: "Invalid user data" });
  }
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      title: user.title,
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender,
      email: user.email,
      date_of_birth: user.date_of_birth,
      mobile_number: user.mobile_number,
      address: user.address,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    return res.json({ error: "Invalid email or password" });
  }
});

exports.profile = asyncHandler(async (req, res) => {
    console.log("REq user",req.user);
    const user = await User.findById(req.user.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      return res.json({ error: "User not found" });
    }
});
