const menuModel = require('../models/menu_Item');
//for get the item 
async function getmenuItem(req,res) {
try {
    const {isAvailable,category} = req.query;    
const filter = {};

//pizza
if(category) filter.category = category;
if(isAvailable) filter.isAvailable = isAvailable === "true";
const item = await menuModel.find(filter);
if(item.length === 0){
    res.status(404).json({
        message:"the item not found",
    })

}
res.status(200).json({
    message:"this is a item",
    data : item,
})
    
} catch (error) {
    res.status(401).json({
        message : "the item not found",
        error : error.message,
    })
}

}
//cretae the menu item
async function createmenuItem(req,res) {
    try {
         
const {name,description,price,category,isAvailable} = req.body;
           if(!name || !description || !price || !category )
    {
        return res.status(400).json({
            message :" The item detils not send",
        })
    }
    const item = await menuModel.create({
        name : name,
        description : description,
        price: price,
        category:category,
        isAvailable:isAvailable,
        imageurl: req.file ? `/uploads/${req.file.filename}` : "",

    })
       res.status(200).json(item)
    } catch (error) {
        console.log("CREATE MENU ERROR:", error);
res.status(500).json({
            message : "the catch error in controller",
            error : error.message,
        })
    }
    
}
module.exports = {
    getmenuItem,
    createmenuItem
}