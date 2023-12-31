const express = require("express");
const cont = require("../controllers/reportControllers");
const routerr = express.Router();

routerr.post("/getreports", cont.getReports);

module.exports = routerr;
