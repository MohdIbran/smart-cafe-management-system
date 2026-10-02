const paymentModel = require("../models/billing_payment_model")
const orderModel = require("../models/order_models")
const CustomerModel = require("../models/customer_models")
//find the total number of customer
async function getTotalCustomers() {
    const totalCustomers = await CustomerModel.countDocuments();

    return totalCustomers;
}
//find the total number of order
    async function getTotalOrders() {
        const getsOrder = await orderModel.countDocuments()

        return getsOrder;
    }
async function getStatusOrder() {
    const totalOrders = await orderModel.aggregate([{
        $group:{
        _id : "$orderStatus",
        status:{
            $sum : 1,
        }
        

        
    }
    }
        
            
    
])
return totalOrders;
    
}
//what type of payment are procdure mein find all the count-
 async function getPaymentMethod() {
    const payment = await paymentModel.aggregate([{
        $match:{
            paymentStatus : "success",
        }
    },
    {
        $group:{
            _id:"$paymentMethod",
            method : {
                $sum:1,
            }

        }

    }

    ])
return payment;
    
 }
async function getTotalRevenue() {

    const payments = await paymentModel.aggregate([{

        $match:{
            paymentStatus : "success"

        }
    },
    {
        $group:{
            _id:null,
            totalRevenue:{
                $sum : "$totalAmount"
            }
        }
    }

    ])
    return payments[0]?.totalRevenue || 0;
   
}
async function getSalesAnalysis() {
    const sales = await orderModel.aggregate([
        {
            $match:{
                orderStatus:{$ne : "cancelled"} 
            }
        },{
            $unwind:"$items"
        },
        {
            $group:{
                _id:"$items.menuItem",
                totalquantity:{
                    $sum:"$items.quantity"
                },
                subtotal:{
                    $sum:"$items.subtotal",
                }
            }
        },{
        $lookup:{
            from:"menus",
            localField:"_id",
            foreignField:"_id",
            as:"items"

        }
    },{
        $unwind:"$items"
    },
     {
            $project: {
                _id: 0,
                menuName: "$items.name",
                totalquantity: 1,
                subtotal: 1
            }
        }
    ])
    return sales;
    
}
module.exports = {
    getTotalCustomers,
    getTotalOrders,
    getStatusOrder,
    getPaymentMethod,
    getTotalRevenue,
    getSalesAnalysis

}