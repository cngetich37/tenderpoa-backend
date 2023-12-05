const express = require("express");
// const validateToken = require("../middleware/validateTokenHandler");
const {
  getAllTenders,
  createTender,
  getTender,
  updateTender,
  deleteTender,
  getIntracomTenders,
  getSaavaTenders,
  getBenesseTenders,
  getBiddedTenders,
  getDueTenders,
  getClosedTenders,
} = require("../controllers/tenderController");
const router = express.Router();

// router.use(validateToken);
/**
 * @swagger
 * /api/tenders:
 *   get:
 *     summary: Get an example
 *     description: Retrieve an example from the server
 *   responses:
 *       200:
 *         description: Return all the tenders!
 */
router.route("/").get(getAllTenders);
router.route("/intracom").get(getIntracomTenders);
router.route("/saava").get(getSaavaTenders);
router.route("/benesse").get(getBenesseTenders);
router.route("/bidded").get(getBiddedTenders);
router.route("/due").get(getDueTenders);
router.route("/closed").get(getClosedTenders);
/**
 * @swagger
 * /api/tenders/:
 *   post:
 *     summary: Get an example
 *     description: Retrieve an example from the server
 *   responses:
 *       201:
 *         description: Tender successfully created!
 *       400:
 *         description: Validation error
 */
router.route("/").post(createTender);
/**
 * @swagger
 * /api/tenders/:id:
 *   get:
 *     summary: Get a tender with a specific id
 *     description: Query a tender with a specific id from the server
 *   responses:
 *     404:
 *     description: Tender not found
 */
router.route("/:id").get(getTender);
/**
 * @swagger
 * /api/tenders/:id:
 *   put:
 *     summary: Delete a tender with a specific id
 *     description: Query a tender with a specific id from the server
 *   responses:
 *       200:
 *         description: Updated successfully!
 *       403:
 *         description: User don't have permission to update other user's tender
 *       404:
 *         description: Tender not found
 */

router.route("/:id").put(updateTender);

/**
 * @swagger
 * /api/tenders/:id:
 *   delete:
 *     summary: Delete a tender with a specific id
 *     description: Query a tender with a specific id from the server
 *   responses:
 *       200:
 *         description: Deleted successfully!
 *       403:
 *         description: User don't have permission to delete other user's tender
 *       404:
 *         description: Tender not found
 */
router.route("/:id").delete(deleteTender);

module.exports = router;
