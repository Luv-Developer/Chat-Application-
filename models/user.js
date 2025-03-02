const mongoose = require("mongoose")
const userschema = mongoose.Schema({
    username:String,
    email:String,
    phone:Number
})
const usermodel = mongoose.model("user",userschema)
module.exports = usermodel