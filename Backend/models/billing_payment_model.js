const mongoose = require("mongoose");
const BillingSchema = mongoose.Schema({
order :{
    type : mongoose.Types.ObjectId,
    ref:"Order",
    required:true,
},
subtotal:{
      type : Number,
      required:true,
},
tax:{
    type:Number,
    required:true,
},
discount:{
    type :Number,
    required:true,
},
totalAmount:{
    type:Number,
    required:true,
},
paymentMethod:{
   type :String,
   enum :["upi","cash","card"]     
    },
paymentStatus:{
        type:String,
        enum :["pending","success","failed",]
    },
},{
    timestamps: true

})
const paymentModel = new mongoose.model("Payment",BillingSchema)
module.exports = paymentModel;
