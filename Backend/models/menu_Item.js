const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({
name : {
        type : String,
        required : true,
},
description :{
    type : String,
        required : true,

},
price:{
    type:Number,
    required:true,
},
category : {
    type:String,
    required:true,
    enum :["burger","pizza","tea","coffee","dessert","others"],
},
isAvailable : {
    type : Boolean,
    required:true,
    default:true,
},
imageurl:{
    type : String,
    default:"",
}



})
const menuModel = mongoose.model("menu",menuSchema);
module.exports = menuModel;