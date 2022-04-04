const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id, { password: 0 });
      next();
    } catch (error) {
      res.status(401);
      res.json({ error: "Unauthorized" });
    }
  } else {
    res.status(401);
    return res.json({ error: "Unauthorized" });
  }
});

// authorise admin

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    next();
  };
};
