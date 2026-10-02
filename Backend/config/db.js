const mongoose = require('mongoose');

    async function connectDB(params) {
        try {
            mongoose.connect(process.env.DB_URL)
            
        } catch (error) {
            console.log("the mongo not connect");
            
            
        }
        
    }
    module.exports = connectDB;
