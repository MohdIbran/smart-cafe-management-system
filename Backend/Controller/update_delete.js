const menuModel = require("../models/menu_Item");
//const { findOneAndDelete } = require("../models/user.model");
async function updateItem(req,res) {
    try {
        const id = req.params.id;
        const udItem = req.body;
        if(!id){
           return res.status(400).json({
            message : "this id item not exist",
           })
        }
const data = await menuModel.findByIdAndUpdate(id,udItem,{new : true});
if (!data) {
    return res.status(404).json({
        message: "Item not found"
    });
}
res.status(200).json({
    message : "the value is updatedted",
    data : data
})



        
    } catch (error) {
        res.status(500).json({
            message : "the updation not successfully",
            error : error.message,
        })
        
    }
    
}
async function deleteItem(req,res){
    try {
           const item = req.params.id;
    const delItem = await menuModel.findByIdAndDelete(item);
    if(!delItem){
        return res.status(404).json({
            message:"the  delete item not found",
        })
      
    }
      res.status(200).json({
            message : "the item is sucessfully delete",
        })

        
    } catch (error) {
        res.status(500).json({
            message : "the dete controller not used",
            error : error.message,
        })
    }
 }
 module.exports={
    updateItem,
    deleteItem,
 }