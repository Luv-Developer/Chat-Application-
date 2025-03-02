const socket = io()
let data2 = document.getElementById("data")
let container = document.getElementById("container")
socket.emit("user-data",data2)
socket.on("message",(data)=>{
   // data2.innerText = data
    let p = document.createElement("p")
    p.innerText = data
    container.appendChild(p)
})
