const orderModel = require("../models/order_models");
const menuModel = require("../models/menu_Item")
const tableModel = require("../models/table_models");

async function createOrder(req,res) {
    try {
       
        const tableid = req.params.id;
        const  items = req.body.items;
        if(!items || items.length === 0 || !tableid){
            return res.status(404).json({
                message:"the item and id not found",
            })

        }
       const data = await tableModel.findById(tableid);
       if(!data){
        return res.status(400).json({
            message:"the table not found"

        })
       }
       if(data.status === true){
        return res.status(401).json({
            message : "the table is already booked"
        })

       }
       const orderItems = [];
       let subtotal = 0;
        for(let i=0; i < items.length; i++){
            const item = items[i];
             const finditem = await  menuModel.findById(item.menuItem)
              if(!finditem){
        return res.status(404).json({
            message : "the item not found",
        })
       }
       if(!item.quantity || item.quantity <= 0){
        return res.status(400).json({
            message:"invalid quantity",
        })
         

       }
       const currentprice = finditem.price * item.quantity;
         subtotal += currentprice;

      
    orderItems.push({
        menuItem: item.menuItem,
    quantity: item.quantity,
    price: finditem.price,
    subtotal: currentprice


       })
        }
       const discountAmount = ( (subtotal * 10)/100) 
const afterDiscount = (subtotal - discountAmount)
const tax = ((afterDiscount * 5)/100)
const payableAmount = (afterDiscount + tax)
      
      
       



const order = await orderModel.create({
    orderNumber: "ORD-" + Date.now(),
    items:orderItems,
    table:tableid,
    customer : req.customer._id,
    billing : {
        subtotal : subtotal,
        discount: discountAmount,
        tax: tax,
        totalAmount: payableAmount
        
    }
})
   data.status = true;
await data.save();



res.status(200).json({
    message : "the order is successfully created and table is occupied",
    order,
   })

     
    } catch (error) {
        res.status(500).json({
            message:"this is a server error",
            error : error.message,
        })
        
    }
    
}
async function getOrder(req,res) {
    console.log("GET ORDER API HIT");

    try {
        
   const allorder = await orderModel
    .find()
    .populate("table")
    .populate("items.menuItem");
    console.log("POPULATED TABLE:", allorder[0]?.table);
    if(allorder.length === 0 ){
        return res.status(400).json({
            message : "the order not found",
        })

    }
    res.status(200).json({
        message : "all the order is successfully fatch",
        allorder,

    })
    
    } catch (error) {
        res.status(500).json({
            message:"this is a server error",
            error : error.message
        })
        
    }
    
}
    async function getparticularOrder(req,res) {

    try {
        const orderId = req.params.id;
        if(!orderId){
            return res.status(404).json({
                message : "the is not found"
            })
        }
        const order = await orderModel.findById(orderId);
        if(!order){
            return res.status(404).json({
                message:"the order does not exist",
            })

        } 
        res.status(200).json({
            message :"The order is successfully fetched",
            order,
        })
        } catch (error) {
            res.status(500).json({
                message:"this is a server error",
            })
            
        }
        
    }
async function updateOrder(req, res) {
    try {
        const orderId = req.params.id;

        if (!orderId) {
            return res.status(404).json({
                message: "The id is not here",
            });
        }

        const decoder = await orderModel.findById(orderId);

        if (!decoder) {
            return res.status(404).json({
                message: "The order does not exist",
            });
        }

        let orderstatus = decoder.orderStatus;
        if(orderstatus === "cancelled"){
            return res.status(409).json({
                message : "the order is cancelled",
            })
        }

        if (orderstatus === "pending") {
            orderstatus = "confirmed";
        }
        else if (orderstatus === "confirmed") {
            orderstatus = "preparing";
        }
        else if (orderstatus === "preparing") {
            orderstatus = "ready";
        }
        else if (orderstatus === "ready") {
            orderstatus = "served";
        }
        else {
            return res.status(400).json({
                message: "Order status cannot be updated",
                orderstatus
            });
        }

        decoder.orderStatus = orderstatus;

        await decoder.save();

        return res.status(200).json({
            message: "Order status updated successfully",
            orderstatus
        });

    } catch (error) {
        return res.status(500).json({
            message: "This is a server error",
            error: error.message
        });
    }
}
async function getMyOrders(req, res) {
    try {
        const orders = await orderModel
            .find({ customer: req.customer._id })
            .populate("items.menuItem")
            .populate("table");

        res.status(200).json({
            message: "Customer orders fetched successfully",
            orders
        });

    } catch (error) {
        res.status(500).json({
            message: "This is a server error",
            error: error.message
        });
    }
}
module.exports = {
    createOrder,
    getOrder,
    getparticularOrder,
    updateOrder,
    getMyOrders
}
