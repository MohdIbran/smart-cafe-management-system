const express = require("express");

const customerRouter = express.Router();

const {createCustomer, customerLogin ,getCustomer ,getparticularCustomer ,updateCustomer ,deleteCustomer, getAllCustomers} = require("../Controller/customer_controller")
const {protect,Onlyadmin} = require("../middleware/auth.user");
const customerProtect = require("../middleware/customer_auth")
const customerAI = require("../Controller/customer_ai_controller");
customerRouter.post("/createcustomer",createCustomer)
customerRouter.post("/customerlogin",customerLogin);
customerRouter.get("/getcustomer",protect,Onlyadmin,getCustomer)

customerRouter.get("/getparticular/:id",protect,Onlyadmin,getparticularCustomer);

customerRouter.put("/updatecustomer/:id",protect,Onlyadmin,updateCustomer);

customerRouter.delete("/deletecustomer/:id",protect,Onlyadmin,deleteCustomer)
customerRouter.get(
  "/getcustomers",
  protect,
  Onlyadmin,
  getAllCustomers
);
customerRouter.post(
    "/customer/ask_question",
    customerProtect,
    customerAI
);

module.exports = customerRouter;