const express = require("express");
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

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token",resetPassword);

module.exports = router;
