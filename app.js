const express = require("express")
const app = express()
const PORT = 3000
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const path = require("path")
const http = require("http")
const server = http.createServer(app)
const {Server} = require("socket.io")
const { mongo } = require("mongoose")
const io = new Server(server)
const usermodel = require("./models/user")
const connection = require("./config/connection")
const cookieParser = require("cookie-parser")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")
app.use(cookieParser())
io.on("connection",(socket)=>{
    console.log("User Connected ",socket.id)
})
app.get("/",(req,res)=>{
    res.render("homepage")
})
app.get("/account",(req,res)=>{
    res.render("account")
})
app.post("/account",async(req,res)=>{
    const {username,email,phone} = req.body // this is called as destructuring
    let user = await usermodel.findOne({email})
    if(!user){
    let user = await usermodel.create({
        username:username,
        email:email,
        phone:phone
    }) 
    if(user){
    let token = jwt.sign({email},"hehe")
    res.cookie("token",token)
    res.redirect("/")
    }
    else{
        res.redirect("/account")
    }
}
else{
    res.send("alert('Email Already Exist')")
    res.redirect("/account")
}
})
function checkaccount(req,res,next){
    if(req.cookies.token == ""){
        res.redirect("/account")
    }
    else{
        let data = jwt.verify(req.cookies.token,"hehe")
        req.user = data
        next()
    }
}
app.get("/room",checkaccount,async(req,res)=>{
    let user = await usermodel.findOne({email:req.user.email})
    let charactor = "ABCDEFGHIJKLMNOP123456789"
    let room = ""
    for(let i = 0;i<=5;i++){
        room = room + charactor.charAt(Math.floor(Math.random() * charactor.length))
    }
    res.render("room",{room})
})
app.get("/join",(req,res)=>{
    res.render("join")
})
app.post("/chat",checkaccount,async(req,res)=>{
    let user = await usermodel.findOne({email:req.user.email})  
    console.log(user)
})
app.get("/:room",checkaccount,async(req,res)=>{
    let user = await usermodel.findOne({email:req.user.email})
    console.log(req.params.room)
    res.render("meeting",{user})
})
server.listen(PORT,()=>{
    console.log(`App is listening at ${PORT}`)
})