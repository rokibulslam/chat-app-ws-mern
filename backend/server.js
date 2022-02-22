const express = require("express")
const { chats } = require("./data/data")
const connectDB = require("./Config/db")
connectDB()
const app = express()


app.get("/", (req, res) => {
    res.send("API is Running")
})
app.get("/chats", (req, res) => {
    res.send(chats)
})

// run server 
app.listen(5000, console.log("Server Running on PORT 5000"))