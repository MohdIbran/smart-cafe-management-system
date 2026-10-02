const menuModel = require("../models/menu_Item")
const orderModel = require("../models/order_models");
const generateAIResponse = require("../services/ai_service");

async function customerAI(req, res) {
    try {

        const question = req.body.question;

        if (!question) {
            return res.status(400).json({
                message: "Question is required"
            });
        }
         // Available menu items database se fetch karna
        const menu = await menuModel.find({
            isAvailable: true
        });
       const customer = req.customer;
        const orders = await orderModel.find({
    customer: customer._id
});
        

        const prompt = `Menu Data:

Customer Name: ${customer.name}
Customer Email: ${customer.email}

Customer Question:
${question}
Menu Data:
${JSON.stringify(menu)}
You are an AI assistant for a cafe customer.
Order Data:
Order Data:
${JSON.stringify(orders)}

Rules:
1. Answer using only the Menu Data and Order Data provided above.
2. If the customer asks about their order status, check Order Data and tell the orderStatus.
3. If the customer asks what they ordered, check the items in Order Data.
4. If the customer asks about their order amount, check billing.totalAmount.
5. Never guess or invent order details.
6. Never reveal information about other customers.
7. If Order Data is empty, say that the customer currently has no orders.
8. Keep the answer short, clear and simple.

Answer the customer's question now.

`;

        const answer = await generateAIResponse(prompt);

        res.status(200).json({
            question,
            answer
        });

    } catch (error) {
    console.error("CUSTOMER AI ERROR:", error);

    res.status(500).json({
        message: "This is a server error",
        error: error.message
    });
}
}

module.exports = customerAI;