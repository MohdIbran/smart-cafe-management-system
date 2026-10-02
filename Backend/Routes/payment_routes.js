const express = require("express");
const paymentRouter = express.Router();
const {paymentFunction,updatePayment,getAllPayments} = require("../Controller/Payment_controller");
const {protect,Onlyadmin}=require("../middleware/auth.user")
const customerProtect = require("../middleware/customer_auth")
paymentRouter.post("/payment/:id",customerProtect,paymentFunction);
paymentRouter.put("/updatepayment/:id",protect,Onlyadmin,updatePayment)
paymentRouter.get(
  "/getpayments",
  protect,
  Onlyadmin,
  getAllPayments
);


module.exports = paymentRouter;