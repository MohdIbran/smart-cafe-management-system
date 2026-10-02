const express = require("express");
const {protect,Onlyadmin} = require("../middleware/auth.user")
const gemini_Controller = require("../Controller/gemini_controller")
const gemini_router = express.Router();
gemini_router.post("/ask_question",gemini_Controller);
module.exports = gemini_router;
