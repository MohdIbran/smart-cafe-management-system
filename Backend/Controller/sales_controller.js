const paymentModel = require("../models/billing_payment_model");
const orderModel = require("../models/order_models")

async function getTotalSales(req,res) {
    try {
        const data = await paymentModel.find();
        let successPayment = [];
        let totalAmount = 0;
        for(let i=0; i<data.length; i++){
            if(data[i].paymentStatus === "success"){
                successPayment.push(data[i])
        }
}

for(let i = 0; i<successPayment.length; i++){
    totalAmount = totalAmount + successPayment[i].totalAmount;

     }
res.status(200).json({
    message : "this is a totalrevenue",
    totalRevenue : totalAmount,

})



        
    } catch (error) {
        res.status(500).json({
            message : "this is a server error",
            error:error.message
        })
        
    }
    
}
async function getTotalOrders(req,res) {
    try {
        const order = await orderModel.find();
        if(order.length === 0){
            return res.status(404).json({
            message:"Orders not found",
            
        })

        }
        res.status(200).json({
            message:"total orders",
            totalOrder:order.length
        })
        
    } catch (error) {
        res.status(500).json({
            message:"this is a server error",
            error:error.message,

        })
        
    }
    
}
async function getSucessfullOrder(req,res) {
    try {
        const order = await orderModel.find();
        if(order.length === 0){
            return res.status(404).json({
                message:"the order not found",
            })
        }
        const successOrder = []
        for(let i = 0; i<order.length; i++){
            if(order[i].orderStatus === "served"){
                successOrder.push(order[i])


            }

        }
        res.status(200).json({
            message:'the order is successfull fetch',
            successOrder,
        })
        
        
    } catch (error) {
        res.status(500).json({
            message:"this is a server error",
            error:error.message,
        })
        
    }
    
}
async function getCancelOrder(req,res) {
    try {
        const order = await orderModel.find();
        if(order.length === 0){
            return res.status(404).json({
                message:"the order not found",
            })
        }
        const cancelOrder = []
        for(let i = 0; i<order.length; i++){
            if(order[i].orderStatus === "cancelled"){
                cancelOrder.push(order[i])


            }

        }
        res.status(200).json({
            message:'Cancelled orders fetched successfully',
            cancelOrder,
        })
        
        
    } catch (error) {
        res.status(500).json({
            message:"this is a server error",
            error:error.message,
        })
        
    }
    
}
async function getPaymentMethodReport(req, res) {
    try {
        const orders = await paymentModel.find();

        if (orders.length === 0) {
            return res.status(404).json({
                message: "No payment found"
            });
        }

        let cash = 0;
        let upi = 0;
        let card = 0;

        for (let i = 0; i < orders.length; i++) {

            if (orders[i].paymentMethod === "cash") {
                cash++;
            }

            if (orders[i].paymentMethod === "upi") {
                upi++;
            }

            if (orders[i].paymentMethod === "card") {
                card++;
            }
        }

        return res.status(200).json({
            message: "Payment method report",
            cash: cash,
            upi: upi,
            card: card
        });

    } catch (error) {

        return res.status(500).json({
            message: "This is a server error",
            error: error.message
        });
    }
}
module.exports = {
    getTotalSales,
    getTotalOrders,
    getSucessfullOrder,
    getCancelOrder,
    getPaymentMethodReport
}