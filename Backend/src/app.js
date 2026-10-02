const express = require("express");
const cors = require("cors");

const app = express();
app.use((req, res, next) => {
    console.log("REQUEST:", req.method, req.path);
    console.log("ORIGIN:", req.headers.origin);
    next();
});

app.use(cors());

app.use(express.json())
app.use("/uploads", express.static("uploads"));;
const router = require('../Routes/auth.routes');
const menuRouter = require("../Routes/menu.routes");
const tableRouter = require("../Routes/table_routes")
const orderRouter = require("../Routes/order_routes")
const customerRouter = require("../Routes/customer_routes")
const paymentRouter = require("../Routes/payment_routes")
const adminRouter = require("../Routes/admin_dashboard_routes")
const gemini_router = require("../Routes/gemini_routes")
app.use("/api/auth",router)
app.use('/api/auth',menuRouter)
app.use("/api/auth",tableRouter)
app.use("/api/auth",orderRouter)
app.use("/api/auth",customerRouter)
app.use("/api/auth",paymentRouter)
app.use("/api/auth",adminRouter)
app.use("/api/auth",gemini_router)
app.use((req,res)=>res.status(404).json({message : "The router not found"}))
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({
        message:"something went to wrong on the server",
    })
})
module.exports = app;