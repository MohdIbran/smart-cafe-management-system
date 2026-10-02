const mongoose = require('mongoose');
const tableSchema = new mongoose.Schema({
    tableNumber : {
        type : Number,
        required:true,
        unique : true,
        default:5,
    },
    capacity:{
        type:Number,
        required:true,
    },
    status:{
        type:Boolean,
        default:false,

    }
})
const tableModel = new mongoose.model("table",tableSchema);
module.exports = tableModel;