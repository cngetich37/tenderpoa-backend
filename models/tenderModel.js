const mongoose = require("mongoose");

// tenderNo: "",
// tenderDescription: "",
// client: "",
// siteVisitDate: new Date(),
// timeExtension: 5,
// bidSecurity: "",
// bidSourceInsurance: "",
// closingDateTime: new Date(),
// location: "",
// tenderValue: 10000,
// dollarRate: 151.55,
// company: "",
// tenderFile: null,
// tenderStatus: "Not Bidded",
const tenderSchema = mongoose.Schema(
  {
    tenderNo: {
      type: String,
      required: [true, "Please add the tender number"],
    },
    tenderDescription: {
      type: String,
      required: [true, "Please add the tender description"],
    },
    client: {
      type: String,
      required: [true, "Please add the client name"],
    },
    siteVisitDate: {
      type: Date,
      required: [true, "Please add the site visit date"],
    },
    timeExtension: {
      type: String,
      required: [true, "Please add the time extension"],
    },
    bidSecurity: {
      type: String,
      required: [true, "Please add the bid security"],
    },
    bidSourceInsurance: {
      type: String,
      required: [true, "Please add the bid source insurance"],
    },
    closingDateTime: {
      type: String,
      required: [true, "Please add the closing date and time"],
    },
    location: {
      type: String,
      required: [true, "Please add the location"],
    },
    tenderValue: {
      type: Number,
      required: [true, "Please add the tender value"],
    },
    dollarRate: {
      type: Number,
      required: [true, "Please add the dollar rate"],
    },
    company: {
      type: String,
      required: [true, "Please add the company name"],
    },
    tenderFile: {
      type: Buffer,
      required: [true, "Please add the tender document"],
    },
    tenderStatus: {
      type: String,
      required: [true, "Please add the status"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tender", tenderSchema);