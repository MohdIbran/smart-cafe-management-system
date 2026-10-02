const express = require("express");
const adminRouter = express.Router();
const admin = require("../Controller/admin_controller")
const {protect,Onlyadmin} = require("../middleware/auth.user")
adminRouter.get("/dashboard",protect,Onlyadmin,admin)
module.exports = adminRouter;