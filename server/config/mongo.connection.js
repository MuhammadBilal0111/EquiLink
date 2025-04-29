const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const connection = ()=>{
    mongoose.connect(process.env.MONGODB_CONN_STRING)
    .then(()=>{console.log("MongoDB connection Successful")})
    .catch((err)=>console.log("ERROR", err))
}

module.exports=connection;
