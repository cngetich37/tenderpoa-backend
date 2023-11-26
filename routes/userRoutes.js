const express = require("express");
const nodemailer = require("nodemailer");
const {
  registerUser,
  loginUser,
  currentUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const validToken = require("../middleware/validateTokenHandler");
const router = express.Router();

/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Get an example
 *     description: Retrieve an example from the server
 *     responses:
 *       200:
 *         description: Return all the tenders!
 */
router.post("/signup", registerUser);
/**
 * @swagger
 * /api/tenders:
 *   get:
 *     summary: Get an example
 *     description: Retrieve an example from the server
 *     responses:
 *       200:
 *         description: Return all the tenders!
 */

router.post("/login", loginUser);
/**
 * @swagger
 * /api/tenders:
 *   get:
 *     summary: Get an example
 *     description: Retrieve an example from the server
 *     responses:
 *       200:
 *         description: Return all the tenders!
 */
router.get("/current", validToken, currentUser);

router.post("/forgotpassword", forgotPassword);
router.get("/reset-password/:token", validateToken, resetPassword);

router.post("/reset-password/:token", validateToken, );

module.exports = router;
