const express = require("express");
const tableRoute = express.Router();
const customerProtect = require("../middleware/customer_auth");
const {tablecreate,getTables,getparticulartable,updateTable,deleteTable} =  require("../Controller/table_controller");
const {protect,Onlyadmin} = require("../middleware/auth.user")
tableRoute.post("/tablecreate",protect,Onlyadmin,tablecreate);
tableRoute.get("/gettable",protect,getTables);
tableRoute.get("/customer/gettable", customerProtect, getTables);
tableRoute.get("/particulartable/:id",protect,getparticulartable)
tableRoute.put("/updatetable/:id",protect,Onlyadmin,updateTable)
tableRoute.delete("/deletetable/:id",protect,Onlyadmin,deleteTable)
module.exports = tableRoute;