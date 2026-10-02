const tableModel = require("../models/table_models");
//admin
async function tablecreate(req,res) {
    try {
        //false → Available
        //true → Occupied/Booked
        const {tableNumber,capacity} = req.body;
        if(!tableNumber || !capacity){
            return res.status(400).json({
                message:"the table not exist",
            })

        }
        const existing = await tableModel.findOne({
            tableNumber : tableNumber,
        });
        if(existing){
            return res.status(409).json({
                message : "the table number is already exits",
            })

        }
        const table = await tableModel.create({
            tableNumber:tableNumber,
            capacity:capacity,

        })
        res.status(200).json({
            message : "the new table is created sucessfully",
            table,

        })

    } catch (error) {
        res.status(500).json({
            message : "the table controller error",
            error:error.message,
        })
    }
    
}
async function getTables(req,res) {
    try {
        const alltable = await tableModel.find();
        if(alltable.length === 0){
            return res.status(402).json({
                message : "the tables not found",
            })

        }
        res.status(200).json({
            message:"all the tables is cafe",
            alltable,
        })
        
    } catch (error) {
        res.status(500).json({
            message:"this is a server error",
            error:error.message,
        })
        
    }

    
}
async function getparticulartable(req,res) {
   try {
     const id = req.params.id;
     if(!id){
        return res.status(402).json({
            message:"the table id not found"
        })

     }
     const table = await tableModel.findById(id)
     if(!table){
        return res.status(403).json({
            message : 'The table not exist',
        })

     }
     res.status(200).json({
        message:"the table is sucessfullly get",
        table
     })
    
    
   } catch (error) {
    res.status(500).json({
        message : "this is a server error",
        error : error.message,
    })
    
   }
    
}
//admin
async function updateTable(req,res) {
    try {
        const id = req.params.id;
        const data = req.body;
        if(!id || Object.keys(data).length === 0){
            return res.status(400).json({
                message:"the id and data not found",
            })

        }
        const newtable = await tableModel.findByIdAndUpdate(id,data,{new:true})
        if(!newtable){
            return res.status(404).json({
                message: "table not exist so it can't updated"
            })

        }
        res.status(200).json({
            message:"the table aur sucessfully updated",
            newtable

        })

        
    } catch (error) {
        res.status(500).json({
            message : "this  is a server error",
            error:error.message

        })
    }
    
}
async function deleteTable(req,res) {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(404).json({
                message:"the id not found",
            })

        }
        const data = await tableModel.findByIdAndDelete(id)
        if(!data){
            return res.status(400).json({
                message : "the data not found so the table not remove",
            })

        }
        res.status(200).json({
            message : "the table is sucessfully removed",
            data
        })
    } catch (error) {
        res.status(500).json({
            message:"this is a server error",
        })
        
    }
    
}
module.exports = {
    tablecreate,
    getTables,
    getparticulartable,
    updateTable,
    deleteTable,
}