const bcrypt = require("bcryptjs");
const customerModel = require("../models/customer_models");
const Jwt = require("jsonwebtoken");
async function createCustomer(req,res) {
    try {
        const {name,email,password,phone,address} = req.body;
        if(!name || !email || !password || !phone || !address){
            return res.status(400).json({
                message : "customer details is missing",

            })
            

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await customerModel.create({
            name,
            email,
            phone,
            address,
            password: hashedPassword

        })
        res.status(200).json({
            mesaage : "the customer is successfully created",
            customer:data,
        })
    } catch (error) {
        res.status(500).json({
            message : "this is a server error",
            error : error.message
        })
        
    }
    
}

async function customerLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const customer = await customerModel.findOne({ email });

        if (!customer || !(await customer.comparePassword(password))) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = Jwt.sign(
            { id: customer._id },
            process.env.JWT_CODE,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Customer login successful",
            token,
            customer: {
                id: customer._id,
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                address: customer.address
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Customer login failed",
            error: error.message
        });
    }
}
async function getCustomer(req,res) {
    try {
        const data = await customerModel.find();
        if(data.length === 0){
            return res.status(404).json({
                message : "No customer founded",

            })
        }
        res.status(201).json({
            message : "the Customer data is successfully fetched",
            data
        })

        
    } catch (error) {
        res.status(500).json({
            message : "this is a server error",
            error : error.message
        })
        
        
    }
    
}
async function getparticularCustomer(req,res) {
    try {
        const customerId = req.params.id;
        if(!customerId){
            return res.status(404).json({
                message : "customer ID is required"
            })
        }
        const data = await customerModel.findById(customerId)
        if(!data){
            return res.status(404).json({
                message : "the customer not fetched"
            })

        }
        res.status(200).json({
            message : "the customer is successfully fetched",
            data
        })
        
    } catch (error) {
         res.status(500).json({
            message : "this is a server error",
            error : error.message
        })
        
        
    }
    
}
async function updateCustomer(req,res) {
    try {
        const customerId = req.params.id;
        const {name,email,phone,address} = req.body;
        if(!customerId){
             return res.status(404).json({
                message : "customer ID is required"

        })
    }
    const data = await customerModel.findByIdAndUpdate(customerId,
        {
        name,email,phone,address
},
    {new:true})

        
    
    if(!data){
        return res.status(404).json({
            message:"the customer not found",
        })

    }
    res.status(200).json({
         message: "Customer updated successfully",
            data
    })
}
    catch (error) {
        res.status(500).json({
            message : "this is a server error",
            error : error.message
        })
        
        
    }
    
}
async function deleteCustomer(req, res) {
    try {
        const customerId = req.params.id;

        if (!customerId) {
            return res.status(404).json({
                message: "Customer ID is required"
            });
        }

        const data = await customerModel.findByIdAndDelete(customerId);

        if (!data) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json({
            message: "Customer deleted successfully",
            data
        });

    } catch (error) {
        res.status(500).json({
            message: "This is a server error",
            error: error.message
        });
    }
}

async function getAllCustomers(req, res) {
  try {

    const customers = await customerModel.aggregate([

      // Customer ke orders find karo
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "customer",
          as: "orders"
        }
      },

      // Orders count + total spent
      {
        $addFields: {
          totalOrders: {
            $size: "$orders"
          },

          totalSpent: {
            $sum: "$orders.billing.totalAmount"
          },

          latestOrder: {
            $arrayElemAt: ["$orders", -1]
          }
        }
      },

      // Latest order ka table find karo
      {
        $lookup: {
          from: "tables",
          localField: "latestOrder.table",
          foreignField: "_id",
          as: "customerTable"
        }
      },

      // Table number
      {
        $addFields: {
          tableNumber: {
            $arrayElemAt: [
              "$customerTable.tableNumber",
              0
            ]
          }
        }
      },

      // Required fields
      {
        $project: {
          name: 1,
          email: 1,
          phone: 1,
          address: 1,
          totalOrders: 1,
          totalSpent: 1,
          tableNumber: 1
        }
      }

    ]);

    console.log("CUSTOMERS RESULT:", customers);

    res.status(200).json({
      message: "All customers",
      customers
    });

  } catch (error) {

    console.log("CUSTOMER ERROR:", error);

    res.status(500).json({
      message: "CUSTOMER API ERROR",
      error: error.message
    });
  }
}

module.exports = {
    createCustomer,
    customerLogin,
    getCustomer,
    getparticularCustomer,
    updateCustomer,
    deleteCustomer,
     getAllCustomers
}