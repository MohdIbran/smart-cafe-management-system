const express = require("express");
const orderRouter = express.Router();
const customerProtect = require("../middleware/customer_auth");
const {createOrder,getOrder,getparticularOrder,updateOrder,getMyOrders} = require("../Controller/order_controller");
const {protect,Onlyadmin} = require("../middleware/auth.user")
    orderRouter.post("/createorder/:id",customerProtect,createOrder);
orderRouter.get("/getorder",protect,getOrder);
orderRouter.get("/getparticularorder/:id",protect,getparticularOrder);
orderRouter.put("/updateStatusOrder/:id",protect,Onlyadmin,updateOrder);
orderRouter.get("/getMyOrders",customerProtect,getMyOrders)
module.exports = orderRouter;