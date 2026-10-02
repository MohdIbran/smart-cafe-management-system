const express = require('express');
const menuRouter= express.Router();
const {protect,Onlyadmin} = require("../middleware/auth.user")
const {getmenuItem,createmenuItem}=require("../Controller/menu_controller")
const{updateItem,deleteItem}=require("../Controller/update_delete")
const upload = require("../middleware/uploads");
menuRouter.post(
    "/createmenu",
    (req, res, next) => {
        
        next();
    },
    upload.single("image"),
    (req, res, next) => {
               next();
    },
    createmenuItem
);
menuRouter.get("/getmenu",getmenuItem)
menuRouter.put("/updatemenu/:id",protect,Onlyadmin, updateItem);
menuRouter.delete("/deletemenu/:id",protect,Onlyadmin,deleteItem);

module.exports = menuRouter;