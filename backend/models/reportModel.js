const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    sender: { type: "String", unique: true, require: true },
    receiver: { type: "String", unique: true, required: true },
    count: { type: "number", required: true },
  },
  { timestaps: true }
);

exports.reports = mongoose.model("reports", reportSchema);
