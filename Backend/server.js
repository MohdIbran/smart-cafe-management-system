const dns = require("node:dns");
 dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config()
const app = require('./src/app')
const connectDB = require("./config/db")
connectDB()
const port = process.env.PORT;
console.log("APP OBJECT LOADED:", typeof app);
const server = app.listen(port,()=>{
    console.log(`the server is running is ${port}`);
    console.log("PORT FROM ENV:", process.env.PORT);
    console.log("connectdb");
    
    
})