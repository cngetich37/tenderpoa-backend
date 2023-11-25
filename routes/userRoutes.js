const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const validToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.get("/current", validToken, currentUser);

module.exports = router;
