const express = require('express');
const router = express.Router();
const {register,login,getme} = require("../Controller/auth.controller")
const {protect} = require("../middleware/auth.user")
router.post("/register",register)
router.post("/login",login)
router.get("/getme",protect,getme)
module.exports = router;
