const express = require("express")
const { chats } = require("./data/data")
const connectDB = require("./Config/db")
const userRoutes = require('./Routes/userRoutes')

connectDB()
const app = express()

app.get("/", (req, res) => {
    res.send("API is Running")
})

app.use('/api/user', userRoutes)

// run server 
app.listen(5000, console.log("Server Running on PORT 5000"))