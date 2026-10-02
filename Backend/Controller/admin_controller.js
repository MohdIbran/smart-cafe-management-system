const tableModel = require("../models/table_models");

const {
    getTotalCustomers,
    getTotalOrders,
    getStatusOrder,
    getPaymentMethod,
    getTotalRevenue,
    getSalesAnalysis
} = require("../services/admin_dashboard");


async function admin(req, res) {

    try {

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


        res.status(200).json({

            TotalCustomers,
            TotalOrders,
            TotalStatus,
            PaymentMethod,
            TotalRevenue,
            OccupiedTable,
            AvailableTable,
            salesAnalysis

        });


    } catch (error) {

        console.log("DASHBOARD ERROR:", error);

        res.status(500).json({

            message: "This is a server error",
            error: error.message

        });

    }
}


module.exports = admin;

