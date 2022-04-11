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
      avatar,
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
      avatar,
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
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    return res.json({ error: "Invalid email or password" });
  }
});

exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    return res.json({ error: "User not found" });
  }
});

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user) {
    user.title = req.body.title || user.title;
    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.gender = req.body.gender || user.gender;
    user.email = req.body.email || user.email;
    user.date_of_birth = req.body.date_of_birth || user.date_of_birth;
    user.mobile_number = req.body.mobile_number || user.mobile_number;
    user.address = req.body.address || user.address;
    user.avatar = req.body.avatar || user.avatar;
  }


  const updatedUser = await user.save();
  console.log(updatedUser);
  res.json({
    _id: updatedUser._id,
    title: updatedUser.title,
    first_name: updatedUser.first_name,
    last_name: updatedUser.last_name,
    gender: updatedUser.gender,
    email: updatedUser.email,
    date_of_birth: updatedUser.date_of_birth,
    mobile_number: updatedUser.mobile_number,
    address: updatedUser.address,
    role: updatedUser.role,
    avatar: updatedUser.avatar,
    token: generateToken(updatedUser._id),
  });
  next();
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

exports.makeProfessional = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.role = "professional";
  }

  const updatedUser = await user.save();
  res.json(updatedUser);
});