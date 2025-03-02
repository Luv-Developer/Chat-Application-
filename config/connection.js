const mongoose = require("mongoose")
const connection = mongoose.connect("mongodb://0.0.0.0/Chat-Application-2").then(()=>{
    console.log("Database Connected")
})
module.exports = connection