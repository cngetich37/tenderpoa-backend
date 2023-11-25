const express = require("express");
const validateToken = require("../middleware/validateTokenHandler")
const {
  getAllTenders,
  createTender,
  getTender,
  updateTender,
  deleteTender,
} = require("../controllers/tenderController");
const router = express.Router();

router.use(validateToken);
router.route("/").get(getAllTenders).post(createTender);
router.route("/:id").get(getTender).put(updateTender).delete(deleteTender);

module.exports = router;
