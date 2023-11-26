const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
// @desc Register a user
// @route POST /api/users/signup
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists!");
  }
  const hashPassword = await bcrypt.hash(confirmPassword, 10);
  console.log("Hashed Password:", hashPassword);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
    confirmPassword: hashPassword,
  });
  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("Invalid user details");
  }
  res.json({ message: "Register a user" });
});

// @desc Login a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  // compare password with hashedPassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30mins" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

// @desc Current user
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

const forgotPassword = asyncHandler(async (req, res) => {
  const userEmail = req.body.email;
  const resetToken = "xyz";
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Tenderpoa Password Reset",
    text: `Click the following link to reset your password:http://tenderpoa.vercel.app/forgotpassword/${resetToken}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to send reset email" });
    } else {
      console.log("Email sent:" + info.response);
      res
        .status(200)
        .json({ success: true, message: "Reset email sent successfully " });
    }
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const resetToken = req.params.token;

  // Validate the token (you should implement this logic using your preferred method)

  // Render a form for the user to reset their password
  res.render("reset-password", { token: resetToken });
});

const resetPostPassword = asyncHandler(async (req, res) => {
  const resetToken = req.params.token;
  const newPassword = req.body.newPassword;

  // Validate the token again (you should implement this logic)

  // Update the user's password in your database
  // ...

  // Redirect or send a response indicating success
  res.redirect("/");
});
module.exports = {
  registerUser,
  loginUser,
  currentUser,
  forgotPassword,
  resetPassword,
};
