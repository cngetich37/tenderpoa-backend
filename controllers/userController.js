const asyncHandler = require("express-async-handler");
// @desc Register a user
// @route POST /api/users/signup
// @access public
const registerUser = asyncHandler(async (req, res) => {
  res.json({ message: "Register a user" });
});

// @desc Login a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login a user" });
});

// @desc Current user
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user information" });
});

module.exports = { registerUser, loginUser, currentUser };
