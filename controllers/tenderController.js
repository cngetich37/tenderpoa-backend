const asyncHandler = require("express-async-handler");
const Tender = require("../models/tenderModel");
// @desc Get All Tenders
// @route GET /api/tenders
// @access public
const getAllTenders = asyncHandler(async (req, res) => {
  const tenders = await Tender.find();
  res.status(200).json(tenders);
});

// @desc Create Tender
// @route POST /api/tenders
// @access public

const createTender = asyncHandler(async (req, res) => {
  console.log("The request body is ", req.body);
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
    tenderValue,
    dollarRate,
    company,
    tenderFile,
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
    !tenderValue ||
    !dollarRate ||
    !company ||
    !tenderFile ||
    !tenderStatus
  ) {
    res.status(400);
    throw new Error("All fields are mandatory!!!");
  }
  const tender = await Tender.create({
    tenderNo,
    tenderDescription,
    client,
    siteVisitDate,
    timeExtension,
    bidSecurity,
    bidSourceInsurance,
    closingDateTime,
    location,
    tenderValue,
    dollarRate,
    company,
    tenderFile,
    tenderStatus,
  });
  res.status(201).json(tender);
});

// @desc Get a  Tender
// @route GET /api/tenders/:id
// @access public
const getTender = asyncHandler(async (req, res) => {
  const tender = await Tender.findById(req.params.id);
  if (!tender) {
    res.status(404);
    throw new Error("Tender Not Found!");
  }
  res.status(200).json(tender);
});

// @desc Update a  Tender
// @route PUT /api/tenders/:id
// @access public
const updateTender = asyncHandler(async (req, res) => {
  const tender = await Tender.findById(req.params.id);
  if (!tender) {
    res.status(404);
    throw new Error("Tender Not Found!");
  }
  const updateTender = await Tender.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateTender);
});

// @desc Delete a  Tender
// @route DELETE /api/tenders/:id
// @access public
const deleteTender = asyncHandler(async (req, res) => {
  const tender = await Tender.findById(req.params.id);
  if (!tender) {
    res.status(404);
    throw new Error("Tender Not Found!");
  }
  await Tender.deleteOne(tender);
  res.status(200).json(tender);
});
module.exports = {
  getAllTenders,
  createTender,
  getTender,
  updateTender,
  deleteTender,
};
