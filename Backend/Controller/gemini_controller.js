const tableModel = require("../models/table_models");
const generateAIResponse = require("../services/ai_service");
const {
    getTotalCustomers,
    getTotalOrders,
    getStatusOrder,
    getPaymentMethod,
    getTotalRevenue,
    getSalesAnalysis
} = require("../services/admin_dashboard");

async function gemini_Controller(req,res) {
    try {
        const question = req.body.question;
        if(!question){
            return res.status(400).json({
                message:"the question is not founded",
            })
        }
const TotalCustomers = await getTotalCustomers();
const TotalOrders = await getTotalOrders();
const TotalStatus = await getStatusOrder();
const PaymentMethod = await getPaymentMethod();
const TotalRevenue = await getTotalRevenue();
const salesAnalysis = await getSalesAnalysis();
const table = await tableModel.find();

let OccupiedTable = 0;
let AvailableTable = 0;

for (let i = 0; i < table.length; i++) {
    if (table[i].status === true) {
        OccupiedTable++;
    } else {
        AvailableTable++;
    }
}
const prompt = `
You are an AI assistant for a cafe admin.

Admin Question:
${question}

Cafe Data:
Customers: ${JSON.stringify(TotalCustomers)}
Orders: ${JSON.stringify(TotalOrders)}
Order Status: ${JSON.stringify(TotalStatus)}
Payment Methods: ${JSON.stringify(PaymentMethod)}
Revenue: ${JSON.stringify(TotalRevenue)}
Sales Analysis: ${JSON.stringify(salesAnalysis)}
Occupied Tables: ${OccupiedTable}
Available Tables: ${AvailableTable}

Answer the admin's question using the cafe data above.
Keep the answer short, clear and simple.
`;
const answer = await generateAIResponse(prompt);
res.status(200).json({
    question,
    answer
});
        
    } catch (error) {
        res.status(500).json({
            message:"this is a server error",
            error : error.message
        })
        
    }
    
}
module.exports = gemini_Controller;