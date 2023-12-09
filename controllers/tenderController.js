const asyncHandler = require("express-async-handler");
const Tender = require("../models/tenderModel");

// @desc Get All Tenders
// @route GET /api/tenders
// @access private
const getAllTenders = asyncHandler(async (req, res) => {
  // const tenders = await Tender.find({ user_id: req.user.id });
  const tenders = await Tender.find({
    tenderStatus: { $regex: /^Open$/i },
  });
  res.status(200).json(tenders);
});

// @desc Create Tender
// @route POST /api/tenders
// @access private

const createTender = asyncHandler(async (req, res) => {
  const {
    tenderNo,
    tenderDescription,
    client,
    siteVisitDate,
    timeExtension,
    bidSecurity,
    bidSourceInsurance,
    closingDateTime,
    location,
    tenderValueDollars,
    dollarRate,
    tenderValueKsh,
    company,
    tenderStatus,
  } = req.body;
  if (
    !tenderNo ||
    !tenderDescription ||
    !client ||
    !siteVisitDate ||
    !timeExtension ||
    !bidSecurity ||
    !bidSourceInsurance ||
    !closingDateTime ||
    !location ||
    !tenderValueDollars ||
    !dollarRate ||
    !tenderValueKsh ||
    !company ||
    !tenderStatus
  ) {
    res.status(400);
    throw new Error("All fields are mandatory! ");
  }
  const tenderAvailable = await Tender.findOne({ tenderNo });
  if (tenderAvailable) {
    res.status(400);
    throw new Error("Tender already exists!");
  }
  try {
    await Tender.create({
      tenderNo,
      tenderDescription,
      client,
      siteVisitDate,
      timeExtension,
      bidSecurity,
      bidSourceInsurance,
      closingDateTime,
      location,
      tenderValueDollars,
      dollarRate,
      tenderValueKsh,
      company,
      tenderStatus,
    });
    res.status(201).json({ message: "Tender added successfully" });
  } catch (error) {
    console.error("Error adding tender:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @desc Update Due Tenders
// @route PUT /api/tenders/updateDueTenders
// @access private

const updateDueTenders = asyncHandler(async (req, res) => {
  const today = new Date();
  const dueTenders = await Tender.find({
    closingDateTime: { $lte: today },
    tenderStatus: "Open",
  });
  // Check if any due tenders are found
  if (dueTenders.length > 0) {
    // Iterate through due tenders and update the tenderStatus
    for (const tender of dueTenders) {
      await Tender.findByIdAndUpdate(
        tender._id,
        { tenderStatus: "Due" },
        { new: true }
      );
    }
    // Optionally, you can send a response indicating successful update
    res.status(200).json({ message: "Tender statuses updated successfully." });
  } else {
    // No due tenders found
    res.status(404).json({ message: "No due tenders found." });
  }
});

// @desc Update Due Tenders
// @route PUT /api/tenders/closed-tenders
// @access private

const closedTenders = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const closedTender = await Tender.find({
    closingDateTime: { $lt: today },
    tenderStatus: "Due",
  });

  // Check if any due tenders are found
  if (closedTender.length > 0) {
    // Iterate through due tenders and update the tenderStatus
    for (const tender of closedTender) {
      await Tender.findByIdAndUpdate(
        tender._id,
        { tenderStatus: "Closed" },
        { new: true }
      );
    }
    // Optionally, you can send a response indicating successful update
    res.status(200).json({ message: "Tender statuses updated successfully." });
  } else {
    // No due tenders found
    res.status(404).json({ message: "No new Closed tenders found!" });
  }
});

// @desc Get Bidded Tenders
// @route GET /api/tenders/bidded
// @access private
const getBiddedTenders = asyncHandler(async (req, res) => {
  // const tenders = await Tender.find({ user_id: req.user.id });
  const tenders = await Tender.find({ tenderStatus: { $regex: /^Bidded$/i } });
  if (tenders.length === 0) {
    res.status(404);
    throw new Error("No Bidded tenders found");
  }
  res.status(200).json(tenders);
});
// @desc Get Closed Tenders
// @route GET /api/tenders/closed
// @access private
const getClosedTenders = asyncHandler(async (req, res) => {
  // const tenders = await Tender.find({ user_id: req.user.id });
  const tenders = await Tender.find({ tenderStatus: { $regex: /^Closed$/i } });
  if (tenders.length === 0) {
    res.status(404);
    throw new Error("No Closed tenders found");
  }
  res.status(200).json(tenders);
});
// @desc Get Due Tenders
// @route GET /api/tenders/due
// @access private
const getDueTenders = asyncHandler(async (req, res) => {
  // const tenders = await Tender.find({ user_id: req.user.id });
  const tenders = await Tender.find({ tenderStatus: { $regex: /^Due$/i } });
  if (tenders.length === 0) {
    res.status(404);
    throw new Error("No Due tenders found");
  }
  res.status(200).json(tenders);
});

// @desc Get a Intracom tenders
// @route GET /api/tenders/intracom
// @access private
const getIntracomTenders = asyncHandler(async (req, res) => {
  try {
    const tenders = await Tender.find({
      company: { $regex: /Intracom Africa Ltd/i },
      tenderStatus: { $regex: /^Open$/i },
    });

    if (tenders.length === 0) {
      res.status(404).json({ message: "No Intracom tenders found" });
    } else {
      res.status(200).json(tenders);
    }
  } catch (error) {
    console.error("Error fetching Intracom tenders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @desc Get a Saava tenders
// @route GET /api/tenders/saava
// @access private
const getSaavaTenders = asyncHandler(async (req, res) => {
  try {
    const tenders = await Tender.find({
      company: { $regex: /Saava Eng. Ltd/i },
      tenderStatus: { $regex: /^Open$/i },
    });

    if (tenders.length === 0) {
      res.status(404).json({ message: "No Saava tenders found" });
    } else {
      res.status(200).json(tenders);
    }
  } catch (error) {
    console.error("Error fetching Saava tenders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @desc Get a Benesse tenders
// @route GET /api/tenders/benesse
// @access private
const getBenesseTenders = asyncHandler(async (req, res) => {
  try {
    const tenders = await Tender.find({
      company: { $regex: /Benesse EA. Ltd/i },
      tenderStatus: { $regex: /^Open$/i },
    });

    if (tenders.length === 0) {
      res.status(404).json({ message: "No Benesse tenders found" });
    } else {
      res.status(200).json(tenders);
    }
  } catch (error) {
    console.error("Error fetching Benesse tenders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @desc Update a  Tender
// @route PUT /api/tenders/:id
// @access private
const updateTender = asyncHandler(async (req, res) => {
  const tender = await Tender.findById(req.params.id);
  if (!tender) {
    res.status(404);
    throw new Error("Tender Not Found!");
  }
  // if (tender.user_id.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error("User don't have permission to update other user's tender");
  // }
  await Tender.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "Bidded successfully!" });
});

// @desc Delete a  Tender
// @route DELETE /api/tenders/:id
// @access private
const deleteTender = asyncHandler(async (req, res) => {
  const tender = await Tender.findById(req.params.id);
  if (!tender) {
    res.status(404);
    throw new Error("Tender Not Found!");
  }
  // if (tender.user_id.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error("User don't have permission to delete other user's tender");
  // }
  await Tender.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Tender Deleted successfully!" });
});

module.exports = {
  getAllTenders,
  createTender,
  updateTender,
  deleteTender,
  getIntracomTenders,
  getSaavaTenders,
  getBenesseTenders,
  getBiddedTenders,
  getDueTenders,
  getClosedTenders,
  updateDueTenders,
  closedTenders,
};
