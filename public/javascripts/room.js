let btn = document.getElementById("generateButton")
let display = document.getElementById("roomIdDisplay")
let data = "ABCDEFGHIJKLMNOP123456789"
btn.addEventListener("click",()=>{
    let room = ""
    for(let i = 0;i<=5;i++){
        room = room + data.charAt(Math.floor(Math.random() * data.length))
    }
    display.innerText = room
})