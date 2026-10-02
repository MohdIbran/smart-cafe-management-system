const Jwt = require("jsonwebtoken");
const customerModel = require("../models/customer_models");

async function customerProtect(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Customer authentication required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = Jwt.verify(token, process.env.JWT_CODE);

        const customer = await customerModel.findById(decoded.id);

        if (!customer) {
            return res.status(401).json({
                message: "Customer not found"
            });
        }

        req.customer = customer;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid customer token"
        });
    }
}

module.exports = customerProtect;