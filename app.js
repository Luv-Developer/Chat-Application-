const express = require("express")
const app = express()
const PORT = 3000
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const path = require("path")
const http = require("http")
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")
io.on("connection",(socket)=>{
    console.log("User Connected ",socket.id)
})
app.get("/",(req,res)=>{
    res.render("homepage")
})
server.listen(PORT,()=>{
    console.log(`App is listening at ${PORT}`)
})