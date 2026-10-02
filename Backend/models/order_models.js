const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    customer:{
        type : mongoose.Types.ObjectId,
        ref:"Customer",
        required: true
    },
    table:{
        type:mongoose.Types.ObjectId,
        ref:"table"

    }, 
    
    items:[{
        menuItem:{
             type : mongoose.Types.ObjectId,
        ref:"menu",

        },
       quantity: Number,
        price:Number,
        subtotal : Number,

    }],
    orderNumber:{
        type:String,
        required:true,
        unique:true,
    },
orderStatus:{
    type:String,
    enum:["pending",
      "confirmed",
      "preparing",
      "ready",
      "served",
      "cancelled"
    ],
    default:"pending",
         
},
billing:{
    subtotal:Number,
    tax:Number,
    discount:Number,
    totalAmount:Number,

},
payment:{
    paymentMethod : {
        type:String,
        enum :["cash","upi","card"]
    },
    paymentStatus:{
    type:String,
    enum:["pending","success","failed"],
    default:"pending",
    },

}
},{
    timestamps:true,
    
})
const orderModel = new mongoose.model("Order", orderSchema);
module.exports = orderModel;