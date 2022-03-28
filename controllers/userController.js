const User = require("../models/userModel");




// @route   POST api/users/register
// @desc    Register user
// @access  Public
exports.register = async (req, res) => {
    res.json({ msg: "Register" });

};