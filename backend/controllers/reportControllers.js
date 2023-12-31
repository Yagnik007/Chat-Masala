const report = require("../models/reportModel");
const Report = report.reports;
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

exports.getReports = asyncHandler(async (req, res) => {
  try {
    const { email, sender, receiver } = req.body;
    const report = await Report.find({ sender, receiver });
    const user = await User.find({ email });
    res.json({ report, user });
    // console.log(res.json({ report, user }));
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
