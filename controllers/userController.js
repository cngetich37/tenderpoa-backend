const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/userModel");




const transporter = nodemailer.createTransport({
  service: "gmail",
  host: `smtp.gmail.com`,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
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
      { expiresIn: "30m" }
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

// @desc Forgot Password
// @route POST /api/users/forgotpassword
//@access public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("Email is required!");
  }
  // Check if the email exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Generate JWT token for password reset
  const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h", // Set the token expiration time (1 hour)
  });

  // Create a password reset link with the token
  const resetPasswordLink = `http://tenderpoa.vercel.app/forgotpassword/${token}`;

  // Send email with the password reset link
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "TenderPoa Password Reset",
    html: `Click the following link to reset your password: <a href="${resetPasswordLink}">${resetPasswordLink}</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "Error sending email!" });
    }
    console.log("Email sent: " + info.response);
    res.status(200).json({ message: "Password reset email sent successfully" });
  });
});
module.exports = {
  registerUser,
  loginUser,
  currentUser,
  forgotPassword,
};
